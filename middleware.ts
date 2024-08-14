import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('access_token')?.value;
    const refreshToken = req.cookies.get('refresh_token')?.value;

    const publicPaths = ['/login', '/register', '/test'];

    if (publicPaths.includes(pathname) || pathname.startsWith('/_next/')) {
        return NextResponse.next();
    }

    if (!token && !refreshToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // const url = req.nextUrl.clone();
    // const hostname = req.headers.get('host');
    // const subdomain = hostname?.split('.')[0];

    // if (subdomain === 'blog') {
    //     url.pathname = `/blog${url.pathname}`;
    //     return NextResponse.rewrite(url);
    // }


    try {
        const dashboardResponse = await fetch('http://api.getzetachi.com/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
            },
        });

        if (dashboardResponse.ok) {
            return NextResponse.next();
        }

        if (dashboardResponse.status === 401 && refreshToken) {
            console.log("Token Invalid, Trying to Refresh");
            const refreshResponse = await fetch('http://api.getzetachi.com/refresh', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${refreshToken || ''}`,
                },
            });

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                const { access_token } = data;

                const res = NextResponse.next();
                res.cookies.set('access_token', access_token);
                return res;
            }

            console.log("Refresh Token Failed");
            return NextResponse.redirect(new URL('/login', req.url));
        }

        console.log("Token Validation Failed");
        return NextResponse.redirect(new URL('/login', req.url));

    } catch (error) {
        console.error("Middleware Error:", error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
