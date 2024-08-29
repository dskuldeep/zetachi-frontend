import { useState, useEffect, useRef, SetStateAction, Key } from "react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { MenuItem } from "./types";
import { Trash, Pencil, Copy } from "lucide-react";
import { Input } from "./ui/input";
import Cookies from "js-cookie";
import API_URL from './config';

interface SubMenuProps {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  onRefresh: (item: MenuItem) => void;
  selectedDoc: MenuItem | null;
}

const SubMenu: React.FC<SubMenuProps> = ({ items, onSelect, onDelete, onRefresh, selectedDoc }) => {
  const [tooltipOpen, setTooltipOpen] = useState<Key | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [hoveredItem, setHoveredItem] = useState<Key | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [renameTitle, setRenameTitle] = useState<string | null>(null);

  useEffect(() => {

    if(selectedDoc !== null){
      handleSelect(selectedDoc)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setTooltipOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAction = (item: MenuItem, action: string) => {
    if (action === 'delete') {
      onDelete(item);
    } else if (action === 'rename'){
      handleRenameClick(item);

    } else {
      console.log(`${action} action on ${item.label}`);
    }
    setTooltipOpen(null);
  };

  const handleSelect = (item: MenuItem) => {
    if (typeof item.id === "string"|| item.id === null){
    setSelectedItem(item.id);
    onSelect(item);
    } else {
      console.log("Error in Sub Menu Selection (Id type mismatch)")
    }
  }

  const handleRenameClick = (item: MenuItem) => {
    if (typeof item.id === "string"|| item.id === null){
    setIsRenaming(item.id);
    setRenameTitle(item.label);
    } else {
      console.log("Error in Sub Menu Item rename (Id type mismatch)")
    }
  };

  const handleRenameChange = (e: { target: { value: SetStateAction<string | null>; }; }) => {
    setRenameTitle(e.target.value);
  };

  const handleRenameSubmit = async (item: MenuItem) => {
    try{
      {/* Call the backend */}
      const token = Cookies.get('access_token');
      if (!token){
        throw new Error('No access token found');
      }

      const response = await fetch(`${API_URL}/rename-document`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: item.id, title: renameTitle})
      });

      if (!response.ok) {
        throw new Error('Failed to rename document');
      }
      console.log('Document renamed successfully!');

    } catch (error) {
      console.error(error)
    } finally {
      setIsRenaming(null);
      setRenameTitle("");
      onRefresh(item);
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id as string}
            className="relative flex items-center group"
            onMouseEnter={() => setHoveredItem(item.id || null)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              href={item.href}
              className={`flex items-center gap-4 ${selectedItem === item.id ? "text-gray-800": "text-gray-400"}`}
              onClick={() => handleSelect(item)}
              prefetch={false}
            >
              <item.icon className="h-5 w-5" />
              {/*Here goes the logic for the Transition from Label to the Input Box*/}
              {isRenaming === item.id ? (
                <Input
                type = "text"
                value = {renameTitle ?? ''}
                onChange={handleRenameChange}
                onBlur={() => handleRenameSubmit(item)}
                className="border border-gray-300 rounded px-2 py-1"
                onClick={(e) => e.stopPropagation()}
                />
                ) : (
                <span>{item.label}</span>
                )}
              
            </Link>
            <div
              className={`absolute right-0 flex items-center space-x-1 transition-opacity duration-200 ease-in-out ${hoveredItem === item.id ? "opacity-100" : "opacity-0"}`}
            >
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="flex items-center justify-center p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTooltipOpen(prev => (item.id === undefined ? null : (prev === item.id ? null : item.id)));
                    }}
                  >
                    <div className="flex space-x-1">
                      <span className="block w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="block w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="block w-1 h-1 bg-gray-400 rounded-full" />
                    </div>
                  </div>
                </TooltipTrigger>
                {tooltipOpen === item.id && (
                  <TooltipContent
                    side="top"
                    align="center"
                    className="bg-white text-black border border-gray-300 rounded shadow-lg p-2"
                    ref={tooltipRef}
                    
                  >
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleAction(item, 'delete')}
                        className="flex items-center py-2 px-3 text-black rounded hover:bg-gray-100 focus:outline-none"
                      >
                        <Trash className="mr-2 h-5 w-5" />
                        Delete
                      </button>
                      <button
                        onClick={() => handleAction(item, 'rename')}
                        className="flex items-center py-2 px-3 text-black rounded hover:bg-gray-100 focus:outline-none"
                      >
                        <Pencil className="mr-2 h-5 w-5" />
                        Rename
                      </button>
                      <button
                        onClick={() => handleAction(item, 'duplicate')}
                        className="flex items-center py-2 px-3 text-black rounded hover:bg-gray-100 focus:outline-none"
                      >
                        <Copy className="mr-2 h-5 w-5" />
                        Duplicate
                      </button>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SubMenu;
