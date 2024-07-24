// app/api/documents/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Adjust this path as needed
const documentsDir = path.resolve('documents');

export async function GET() {
  try {
    const files = fs.readdirSync(documentsDir);
    const documents = files.map((file) => {
      const filePath = path.join(documentsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      return { id: file, ...JSON.parse(content) };
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error reading documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
