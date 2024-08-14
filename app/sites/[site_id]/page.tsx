"use client";
import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReadOnlyEditor = dynamic(() => import('@/components/ReadOnlyEditor'), { ssr: false });

export default function Site() {
  const { site_id } = useParams(); 
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const fetchDocument = async (id: string) => {
    try {
      const accessToken = Cookies.get('access_token');
      const apiUrl = `http://api.getzetachi.com/fetch-document?document_id=${id}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const document = await response.json();

      if (document.error) {
        throw new Error(document.error);
      }

      setSelectedDocument(document);

    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  useEffect(() => {
    if (!site_id) {
      console.log('Document ID is null | undefined');
      return;
    }
    fetchDocument(site_id as string);
  }, [site_id]);

  useEffect(() => {
    if(selectedDocument){
      console.log(selectedDocument.title);
    }
  });

  return (
    <>
      {selectedDocument ? (
        <div className="flex flex-col overflow-auto p-4 space-y-4">
          <div className='flex h-1/5 bg-gray-100 items-center justify-center'>
            <div className='w-1/2 p-5'>
              <div className="text-4xl mt-20 font-bold h-full">{selectedDocument.title}</div>
            </div>
          </div>
          <div>
            <ReadOnlyEditor data={selectedDocument.content} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
