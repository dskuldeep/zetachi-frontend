"use client";
import React, { useRef, useEffect } from 'react';
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
import AttachesTool from '@editorjs/attaches';
import Link from '@editorjs/link';
import ImageTool from '@editorjs/image';

interface ReadOnlyEditorProps {
  data: any;
}

const ReadOnlyEditor: React.FC<ReadOnlyEditorProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear the container before initializing the editor
      containerRef.current.innerHTML = '';

      // Initialize EditorJS instance in read-only mode
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
          attaches: AttachesTool,
          link: Link,
        },
        data,
        readOnly: true, // Set the editor to read-only mode
        onReady: () => {
          console.log('ReadOnlyEditorJS is ready!');
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
  }, [data]);

  return <div ref={containerRef} className="prose"></div>;
};

export default ReadOnlyEditor;
