import { NextResponse, NextRequest } from "next/server";
import axios from 'axios';
import API_URL from '../../../components/config';



export async function POST(request: NextRequest){
    const { refresh_token } = await request.json();

    try{
        const response = await axios.post(`${API_URL}/refresh`, {
            token: refresh_token,
        });
        const { access_token } = response.data.access_token;
        const res = NextResponse.json(response.data);
        res.cookies.set('access_token', access_token, { httpOnly: true, maxAge: 15 * 60});

        return res;
    } catch (error: any){
        return NextResponse.json({ detail: 'Invalid or expired refresh token' }, { status: 401 });
    }
}