import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    // Parse the request JSON
    const { username, password } = await request.json();

    try {
        // Convert JSON data to URL-encoded format
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        // Send a POST request with URL-encoded data
        const response = await axios.post("http://localhost:8000/token", params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Get tokens from the response
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;

        // Set cookies for tokens
        const res = NextResponse.json(response.data);
        res.cookies.set('access_token', access_token, { httpOnly: false, maxAge: 120 * 60 });
        res.cookies.set('refresh_token', refresh_token, { httpOnly: false, maxAge: 7 * 24 * 60 * 60 });

        console.log(res.cookies.get('refresh_token'))

        return res;
    } catch (error: any) {
        const status = error.response?.status || 500;
        const detail = error.response?.data?.detail || 'Login failed';
        return NextResponse.json({ detail }, { status });
    }
}
