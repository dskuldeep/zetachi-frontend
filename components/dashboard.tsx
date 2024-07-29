import { SVGProps, useState, useEffect } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import SubMenu from './SubMenu';
import dynamic from 'next/dynamic';
import { MenuItem, UserSubMenu } from './types';
import HomeView from './home-view';
import { SettingsModal } from './settings-modal';
import { NotificationModal } from './notification-modal';
import { Bell, Bot, Power } from 'lucide-react';
import { TooltipProvider } from './ui/tooltip';
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import ZetaAISheet from './zeta-ai-sheet';
import { SearchModal } from './search-modal';
import MessageModal from './message-modal-comingsoon';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const Editor = dynamic(() => import('./Editor'), { ssr: false });

// Define your menu items
const menuItems: MenuItem[] = [
  { href: '#', icon: LayoutDashboardIcon, label: 'Dashboard', children: false },
  { href: '#', icon: FileIcon, label: 'Documents', children: false },
  { href: '#', icon: Bot, label: 'Zeta AI', children: false },
  { href: '#', icon: SearchIcon, label: 'Search', children: false },
  { href: '#', icon: Bell, label: 'Notifications', children: false },
  { href: '#', icon: MessagesSquareIcon, label: 'Messages', children: false },
  { href: '#', icon: SettingsIcon, label: 'Settings', children: false },
];

export function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [userSubMenu, setUserSubMenu] = useState<UserSubMenu>({});
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isZetaAIOpen, setIsZetaAIOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);


  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/documents');
        const documents = await response.json();

        if (documents.error) {
          throw new Error(documents.error);
        }

        const submenu: UserSubMenu = {
          Documents: {
            Documents: documents.map((doc: { id: string }) => ({
              href: `#${doc.id}`,
              icon: FileIcon,
              label: doc.id,
              fileName: doc.id,
              children: false,
            })),
          },
        };

        setUserSubMenu(submenu);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleSelect = (item: MenuItem) => {
    const documentId = item.fileName;

    if (!documentId) {
      console.error('Document ID is undefined');
      return;
    }
  
    const fetchDocument = async (id: string) => {
      try {
        const response = await fetch(`/api/documents/${id}`);
        const document = await response.json();
  
        if (document.error) {
          throw new Error(document.error);
        }
  
        setSelectedDocument(document);
        setSelectedItem('Documents'); // Ensure the Documents tab is selected
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
  
    fetchDocument(documentId);
  };

  const handleMainMenuClick = (label: string) => {
    if (label === 'Dashboard') {
      setSelectedItem('Dashboard');
      setSelectedDocument(null); // Reset document selection when dashboard is selected
    } else if (label === 'Documents') {
      setSelectedItem('Documents');
      // Optionally, you can clear or manage the document state here
    } else if (label === 'Settings'){
      setIsSettingModalOpen(true);
    } else if (label === 'Notifications'){
      setIsNotificationModalOpen(true);
    } else if (label === 'Zeta AI'){
      setIsZetaAIOpen(true);
    } else if (label === 'Search'){
      setIsSearchOpen(true);
    } else if (label === 'Messages'){
      setIsMessageOpen(true);
    } else {
      setSelectedItem(label);
    }
  };
  
  const closeSettingModal = () => setIsSettingModalOpen(false)
  const closeNotificationModal = () => setIsNotificationModalOpen(false)
  const closeZetaAI = () => setIsZetaAIOpen(false)
  const closeSearch = () => setIsSearchOpen(false)
  const closeMessage = () => setIsMessageOpen(false)

  return (
    <div className="flex h-screen">
      <aside className={`p-4 border-r ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="space-y-4">
          <div>
            <Button variant="ghost" size="icon" className = {`flex items-center gap-4 px-2.5 w-full text-left`} onClick={() => setIsCollapsed(!isCollapsed)}>
              <MenuIcon className="w-6 h-6" />
            </Button>
          </div>
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
                  <TooltipProvider key={item.label}>
                  <Tooltip >
                    <TooltipTrigger asChild>
                  <Button
                  variant="ghost"
                  className={`flex items-center gap-4 px-2.5 w-full text-left ${selectedItem === item.label ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => handleMainMenuClick(item.label)}
                >
                  <item.icon className="h-6 w-6" />
                  {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                  </TooltipTrigger>
                    <TooltipContent side = "right" className="border-2 border-solid border-gray-200 bg-gray-100 rounded-md p-2 text-sm"><p className='text-sm'>{item.label}</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
              )
            )}
          </nav>
          <div className="flex items-center justify-center py-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png" />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem> */}
              <DropdownMenuItem>Logout<Power style={{marginLeft: 35, scale: 0.7, color: '#gray' }}/></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
        </div>
          <SettingsModal isOpen={isSettingModalOpen} onClose={closeSettingModal}/>
          <NotificationModal isOpen={isNotificationModalOpen} onClose={closeNotificationModal}/>
          <ZetaAISheet isOpen={isZetaAIOpen} onClose={closeZetaAI}/>
          <SearchModal isOpen={isSearchOpen} onClose={closeSearch}/>
          <MessageModal isOpen={isMessageOpen} onClose={closeMessage}/>
        </div>
        
        
        {/*Company Logo Implementation */}
        {isCollapsed ? (
          <div className="absolute bottom-5">
            <img
              src="/logo.png" 
              alt="Square Logo"
              className="w-12 h-12" 
            />
          </div>
          ) : (
          <div className="absolute bottom-5">
              <img
                src="/logo-rect.png" 
                alt="Rectangular Logo"
                className="w-29 h-12" 
               />
           </div>)}
        
      </aside>
      {selectedItem !== 'Dashboard' && userSubMenu[selectedItem] && Object.keys(userSubMenu[selectedItem]).map((category) => (
        <aside key={category} className="w-64 p-4 border-r">
          <div className="space-y-5">
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-medium">{category}</h3>
              <SubMenu
                items={userSubMenu[selectedItem][category]}
                onSelect={handleSelect} 
                onDelete={() => { throw new Error('Function not implemented.'); }} 
              />
            </div>
          </div>
        </aside>
      ))}
      {selectedDocument ? (
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-auto p-4 space-y-4">
            <Editor data={selectedDocument.content} />
          </main>
        </div>
      ) : (
        selectedItem === 'Dashboard' ? <HomeView /> : null
      )}
    </div>
  );
}







// Define your icon components (FileIcon, LayoutDashboardIcon, LassoIcon, MailsIcon, MenuIcon, MessagesSquareIcon, SearchIcon, SettingsIcon) here as in your original setup or import them if they are in separate files.


function BarcodeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 5v14" />
        <path d="M8 5v14" />
        <path d="M12 5v14" />
        <path d="M17 5v14" />
        <path d="M21 5v14" />
      </svg>
    )
  }
  
  
  function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      </svg>
    )
  }
  
  
  function HandHelpingIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
        <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 13 6 6" />
      </svg>
    )
  }
  
  
  function LassoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 22a5 5 0 0 1-2-4" />
        <path d="M3.3 14A6.8 6.8 0 0 1 2 10c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8a12 12 0 0 1-5-1" />
        <path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    )
  }
  
  
  function LayoutDashboardIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    )
  }
  
  
  function MailsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="16" height="13" x="6" y="4" rx="2" />
        <path d="m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7" />
        <path d="M2 8v11c0 1.1.9 2 2 2h14" />
      </svg>
    )
  }
  
  
  function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }
  
  
  function MessagesSquareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
      </svg>
    )
  }
  
  
  function MoveUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6L12 2L16 6" />
        <path d="M12 2V22" />
      </svg>
    )
  }
  
  
  function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }
  
  
  function SendIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    )
  }
  
  
  export function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
  
  
  function ShareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" x2="12" y1="2" y2="15" />
      </svg>
    )
  }
  
  
  function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    )
  }
  
  
  function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }
  