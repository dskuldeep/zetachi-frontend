"use client";
import { useParams } from 'next/navigation';
import { Dashboard } from '@/components/dashboard'; // Adjust import as needed

export default function DashboardPage() {
  const { document_id } = useParams(); // Extract the document_id from the URL

  return (
    <Dashboard initialDocumentId={document_id as string} />
  );
}