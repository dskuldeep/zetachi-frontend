import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('access_token')?.value;
    const refreshToken = req.cookies.get('refresh_token')?.value;

    const publicPaths = ['/login', '/register', '/test'];

    if (publicPaths.includes(pathname) || pathname.startsWith('/_next/')) {
        console.log("Accessed Public Path");
        return NextResponse.next();
    }

    if (!token && !refreshToken) {
        console.log("No Token or Refresh Token");
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const dashboardResponse = await fetch('http://localhost:8000/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token || ''}`, // Ensure token is included
            },
        });

        if (dashboardResponse.ok) {
            const data = await dashboardResponse.json(); // Parse the JSON response
            console.log("Valid Token - Dashboard Data:", data);
            return NextResponse.next();
        }

        if (dashboardResponse.status === 401 && refreshToken) {
            console.log("Token Invalid, Trying to Refresh");
            const refreshResponse = await fetch('http://localhost:8000/refresh', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${refreshToken || ''}`,
                },
                
            });

            if (refreshResponse.ok) {
                console.log("Token Refreshed");
                const data = await refreshResponse.json(); // Parse the JSON response
                const { access_token } = data;

                const res = NextResponse.next();
                res.cookies.set('access_token', access_token, { httpOnly: true, maxAge: 15 * 60 });
                return res;
            }

            console.log("Refresh Token Failed");
            return NextResponse.redirect(new URL('/login', req.url));
        }

        console.log("Token Validation Failed");
        return NextResponse.redirect(new URL('/login', req.url));

    } catch (error: any) {
        console.error("Middleware Error:", error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*']
};
