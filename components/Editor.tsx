import React, { useRef, useEffect, useState, useCallback } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import Raw from '@editorjs/raw';
import Attaches from '@editorjs/attaches';
import Link from '@editorjs/link';
import Cookies from 'js-cookie';
import { debounce } from 'lodash';

interface EditorProps {
  data: any;
  documentId: string;
}

const Editor: React.FC<EditorProps> = ({ data, documentId }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<EditorJS | null>(null);
  const [prevDocumentId, setPrevDocumentId] = useState<string | null>(null);
  const isInitialMount = useRef(true);  // Track initial mount

  const debouncedSaveChanges = useCallback(
    debounce(async (data: any, documentId: string) => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await fetch(`http://localhost:8000/save-document?document_id=${documentId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to save document');
        }
        console.log('Document saved successfully!');
      } catch (error) {
        console.error('Error saving document:', error);
      }
    }, 2000),
    []
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (containerRef.current) {
      // Clear the container before reinitializing the editor
      containerRef.current.innerHTML = '';

      // Initialize EditorJS instance
      editorInstanceRef.current = new EditorJS({
        holder: containerRef.current!,
        tools: {
          header: Header,
          list: List,
          paragraph: Paragraph,
          table: Table,
          embed: Embed,
          quote: Quote,
          code: Code,
          marker: Marker,
          checklist: CheckList,
          delimiter: Delimiter,
          raw: Raw,
          attaches: Attaches,
          link: Link,
        },
        data,
        onReady: () => {
          console.log('EditorJS is ready!');
        },
        onChange: async () => {
          if (editorInstanceRef.current) {
            const newData = await editorInstanceRef.current.save();
            debouncedSaveChanges(newData, documentId);
          }
        },
      });
    }

    return () => {
      if (editorInstanceRef.current) {
        // Manually clear the editor container
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
        editorInstanceRef.current = null;
      }
    };
  }, [documentId, data, debouncedSaveChanges]);

  useEffect(() => {
    if (prevDocumentId !== documentId) {
      // Update editor when the document changes
      setPrevDocumentId(documentId);

      if (editorInstanceRef.current) {
        editorInstanceRef.current.isReady.then(() => {
          editorInstanceRef.current?.render(data);
        }).catch((error) => {
          console.error('Failed to render editor with new data:', error);
        });
      }
    }
  }, [documentId, data, prevDocumentId]);

  return <div ref={containerRef} className="prose"></div>;
};

export default Editor;
