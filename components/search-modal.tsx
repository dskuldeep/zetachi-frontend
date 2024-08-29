'use client'

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FileIcon, SearchIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import algoliasearch, { SearchIndex } from 'algoliasearch';
import { useRouter } from 'next/navigation';

const searchClient = algoliasearch('5ITMYI101K', '81729e4915c5f9ae357c2c73caa16f46');

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

interface SearchResult {
  objectId: string;
  title: string;
}

export function SearchModal({ isOpen, onClose, userEmail }: SearchModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const index: SearchIndex = searchClient.initIndex(userEmail);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const response = await index.search(searchQuery, {
        attributesToRetrieve: ['objectID', 'title'],
        hitsPerPage: 10,
      });

      const results = response.hits.map(hit => ({
        objectId: hit.objectID,
        title: (hit as any).title ?? "Untitled",
      }));

      setResults(results);
    } catch (error) {
      console.error('Error searching for files:', error);
      setResults([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search for a file</DialogTitle>
          <DialogDescription>
            Use the search bar below to find your files.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <SearchIcon className="w-6 h-6 text-muted-foreground mr-4" />
            <Input
              placeholder="Search for a file..."
              className="w-full border-none focus:ring-0 text-lg"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch();
              }}
            />
          </div>
          <div className="grid gap-4">
            {results.map((result, index) => (
              <FileResult 
                key={index} 
                objectId={result.objectId} 
                title={result.title} 
                onClick={() => router.push(`/dashboard/${result.objectId}`)} // Navigate on click
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface FileResultProps {
  objectId: string;
  title: string;
  onClick: () => void;
}

function FileResult({ objectId, title, onClick }: FileResultProps) {
  return (
    <div 
      className="bg-gray-100 rounded-md p-4 cursor-pointer" // Added cursor styling
      onClick={onClick}
    >
      <div className="font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">Object ID: {objectId}</div>
    </div>
  );
}
