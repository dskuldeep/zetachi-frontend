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
import Attaches from '@editorjs/attaches';
import Link from '@editorjs/link';
import CustomTableBlock from './CustomTableBlock';

interface EditorProps {
  data: any;
}

const Editor: React.FC<EditorProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorInstanceRef.current && containerRef.current) {
      editorInstanceRef.current = new EditorJS({
        holder: containerRef.current,
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
        data: data,
        onReady: () => {
          console.log('EditorJS is ready!');
        },
      });
    }
  }, [data, containerRef]);

  return <div ref={containerRef} className="prose"></div>;
};

export default Editor;
