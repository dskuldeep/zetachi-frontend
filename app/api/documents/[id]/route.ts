// app/api/documents/[id]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { pathname } = new URL(request.url);
    const id = decodeURIComponent(pathname.split('/').pop() || '');
    const filename = id.concat('.json')
    const filePath = path.join(process.cwd(), 'documents', filename); // Use process.cwd() for the correct root directory
    console.log(filePath)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return NextResponse.json(JSON.parse(content));
    } else {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error reading document:', error);
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
  }
}
