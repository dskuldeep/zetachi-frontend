import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FileIcon, SearchIcon } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center">
            <SearchIcon className="w-6 h-6 text-muted-foreground mr-4" />
            <Input
              placeholder="Search for a file..."
              className="w-full border-none focus:ring-0 text-lg"
            />
          </div>
          <button onClick={onClose} className="text-muted-foreground">
          <Cross2Icon className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            <FileCategory title="Documents" files={documents} />
            <FileCategory title="Images" files={images} />
            <FileCategory title="Audio" files={audio} />
          </div>
        </div>
      </div>
    </div>
  );
}

const documents = [
  { name: "Annual Report 2023.pdf", type: "PDF Document", size: "5.2 MB" },
  { name: "Marketing Presentation.pptx", type: "PowerPoint Document", size: "12.4 MB" },
  { name: "Employee Handbook.docx", type: "Word Document", size: "3.8 MB" },
  { name: "Q4 Financial Report.xlsx", type: "Excel Spreadsheet", size: "7.1 MB" },
];

const images = [
  { name: "Company Logo.png", type: "PNG Image", size: "1.2 MB" },
  { name: "Product Shots.jpg", type: "JPEG Image", size: "4.5 MB" },
];

const audio = [
  { name: "Meeting Recording.mp3", type: "MP3 Audio", size: "12.8 MB" },
  { name: "Podcast Episode.wav", type: "WAV Audio", size: "24.2 MB" },
];

interface FileCategoryProps {
  title: string;
  files: { name: string; type: string; size: string }[];
}

function FileCategory({ title, files }: FileCategoryProps) {
  return (
    <div className="bg-gray-100 rounded-md p-4">
      <div className="font-medium mb-2">{title}</div>
      <div className="grid gap-4">
        {files.map((file, index) => (
          <div className="flex items-center gap-4" key={index}>
            <div className="flex-shrink-0">
              <FileIcon className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{file.name}</div>
              <div className="text-sm text-muted-foreground">{file.type}, {file.size}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
