import { NextResponse } from "next/server";
import axios from "axios";
import API_URL from '../../../components/config';

export async function POST(request: any) {
    const {username, email, password, company} = await request.json();

    try{
        const response = await axios.post(`${API_URL}/register`, {
            username,
            email,
            password,
            company
        });
        return NextResponse.json(response.data, {status: 200});
    } catch(error: any) {
        return NextResponse.json({detail: error.response?.data.detail || 'Something went wrong'}, {status: error.response?.status || 500});
    } 
}