import { SVGProps, useState, useEffect } from 'react';
import { Button } from './ui/button';
import SubMenu from './SubMenu';
import dynamic from 'next/dynamic';
import { MenuItem, UserSubMenu } from './types';
import HomeView from './home-view';
import { SettingsModal } from './settings-modal';
import { NotificationModal } from './notification-modal';
import { Bell, Bot, Plus, Power, User } from 'lucide-react';
import { TooltipProvider } from './ui/tooltip';
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import ZetaAISheet from './zeta-ai-sheet';
import { SearchModal } from './search-modal';
import MessageModal from './message-modal-comingsoon';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import Cookies from 'js-cookie';
import { LoadingSpinner } from './LoadingSpinner';
import EditorHeader from './editor-header';


const Editor = dynamic(() => import('./Editor'), { ssr: false });

// Define your menu items
const menuItems: MenuItem[] = [
  {
    href: '#', icon: LayoutDashboardIcon, label: 'Dashboard', children: false,
    id: null
  },
  {
    href: '#', icon: FileIcon, label: 'Documents', children: false,
    id: null
  },
  {
    href: '#', icon: Bot, label: 'Zeta AI', children: false,
    id: null
  },
  {
    href: '#', icon: SearchIcon, label: 'Search', children: false,
    id: null
  },
  {
    href: '#', icon: Bell, label: 'Notifications', children: false,
    id: null
  },
  {
    href: '#', icon: MessagesSquareIcon, label: 'Messages', children: false,
    id: null
  },
  {
    href: '#', icon: SettingsIcon, label: 'Settings', children: false,
    id: null
  },
  // {
  //   href: '#', icon: MessagesSquareIcon, label: 'msgs', children: false,
  //   id: null
  // }
];

interface DashboardProps {
  initialDocumentId?: string;
}

export function Dashboard({ initialDocumentId }: DashboardProps) {
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [userSubMenu, setUserSubMenu] = useState<UserSubMenu>({});
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isZetaAIOpen, setIsZetaAIOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const documentIdFromUrl = initialDocumentId || '';
  const [username, setUsername] = useState('');

  const fetchUser = async() => {
    try {
      console.log("Fetching User Details");
      const token = Cookies.get('access_token');
      if (!token) {
        throw new Error('No access token found');
      }
      const response = await fetch('https://api.getzetachi.com/dashboard', {

        headers: {
          'Authorization': `Bearer ${token}`, // Use the 'Authorization' header with 'Bearer' scheme
          'Accept': '*/*'
        }
        
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user');
      }
  
      const user = await response.json();

      setUsername(user.username);
    } catch (e){
      console.log("Error in fetching user details", e)
    }

  }

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      console.log("Fetching Document List from the Backend")
      const token = Cookies.get('access_token'); // Get the access token from cookies
  
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch('https://api.getzetachi.com/list-documents', {
        headers: {
          'Authorization': `Bearer ${token}`, // Use the 'Authorization' header with 'Bearer' scheme
          'Accept': '*/*'
        }
      });
      // console.log(token)
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch documents');
      }
  
      const documents = await response.json();

      console.log("Setting user sub menu")
  
      const submenu: UserSubMenu = {
        Documents: {
          Documents: documents.map((doc: { id: string, title: string }) => ({
            href: `#${doc.id}`,
            icon: FileIcon,
            label: doc.title,
            fileName: doc.id,
            children: false,
            id: doc.id
          })),
        },
      };

      console.log(submenu)
  
      setUserSubMenu(submenu);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = Cookies.get('refresh_token'); // Get the refresh token from cookies
    
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }
    
      const response = await fetch('https://api.getzetachi.com/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
    
      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }
    
      const data = await response.json();
      const { access_token } = data;
      Cookies.set('access_token', access_token); // Update the access token in cookies
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Optionally handle token refresh failure (e.g., redirect to login)
      // window.location.href = '/login';
    }
  };

  
  useEffect(() => {
    fetchUser();
    fetchDocuments();

    if (documentIdFromUrl) {
      handleSelect({fileName: documentIdFromUrl} as MenuItem)
    }
    // Set up an interval to refresh the token every 5 minutes
    const refreshInterval = setInterval(() => {
      refreshAccessToken();
      console.log("Token Refreshed");
    }, 20 * 60 * 1000); // 20 minutes

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [documentIdFromUrl]);

  const deleteDocument = (item: MenuItem) => {
    const documentId = item.fileName;
    if (!documentId) {
      console.error('Document ID is undefined');
      return;
    }
    const deleteDoc = async (id: string) => {
      try{
        const token  = Cookies.get('access_token');
        if (!token){
          throw new Error('No access token found');
        }

        const response = await fetch(`https://api.getzetachi.com/delete-document?document_id=${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Use the 'Authorization' header with 'Bearer' scheme
            'Accept': '*/*'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        // Parse the JSON response
        const document = await response.json();
    
        // Check for application-specific errors
        if (document.error) {
          throw new Error(document.error);
        }
        console.log(document);
        fetchDocuments();


      } catch (error) {
        console.log('Error deleting document: ', error)
      }
    }
    deleteDoc(documentId)

  }

  const createDocument = async () => {
    try {
      const token = Cookies.get('access_token'); // Get the access token from cookies
  
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch('https://api.getzetachi.com/create-document', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Use the 'Authorization' header with 'Bearer' scheme
          'Accept': '*/*'
        }
      });
      if (!response.ok){
        throw new Error('Failed to create new document');
      }
      const data = await response.json();
      console.log('Document created successfully: ', data);
      fetchDocuments();

    } catch (error){
      console.log('Error creating Document: ', error)

    }
  };

  const refresh = async () => {
    fetchDocuments();
    fetchDocument(selectedDocument.id);
  };

  const fetchDocument = async (id: string) => {
    try {
      setLoading(true);
      const accessToken = Cookies.get('access_token');
      // Construct the API URL with query parameter
      const apiUrl = `https://api.getzetachi.com/fetch-document?document_id=${id}`;
  
      // Perform the fetch request with the access token included in headers
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON response
      const document = await response.json();
  
      // Check for application-specific errors
      if (document.error) {
        throw new Error(document.error);
      }
      // Update the state with the fetched document
      setSelectedDocument(document);
      setSelectedItem('Documents'); // Ensure the Documents tab is selected
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: MenuItem) => {
    const documentId = item.fileName;
    if (!documentId) {
      console.log('Document ID is null | undefined'); /*This Error is a side effect of the way the Submenu reverse selection is implemented*/
      return;
    }
  
    fetchDocument(documentId);
  };

  const handleMainMenuClick = (label: string) => {
    if (label === 'Dashboard') {
      setSelectedItem('Dashboard');
      // setSelectedDocument(null); // Reset document selection when dashboard is selected
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
                    <TooltipContent side = "right" className="border-2 border-solid border-gray-200 bg-gray-200 bg-opacity-90 rounded-md p-2 text-sm relative z-50"><p className='text-sm'>{item.label}</p></TooltipContent>
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
        <aside key={category} className="w-64 p-4 border-r flex flex-col">
        <div className="space-y-5 flex-1">
          <div key={category} className="space-y-4 flex-1">
            <h3 className="text-sm font-medium">{category}</h3>
            <div className='flex items-center justify-center'>
              <Button variant="secondary" className='w-full' onClick={() => createDocument()}>
                <Plus/>
              </Button>
            </div>
            <div className='h-[90vh] overflow-y-auto'> {/* Set a fixed height and overflow-y: auto */}
              <SubMenu
                items={userSubMenu[selectedItem][category]}
                onSelect={handleSelect} 
                onDelete={deleteDocument} 
                onRefresh={refresh}
                selectedDoc={selectedDocument}
              />
            </div>
          </div>
        </div>
      </aside>
      ))}
      {loading ? (<LoadingSpinner/>) : selectedItem === 'Dashboard' ? (
        <HomeView username={username} items={userSubMenu}/>
      ) : (
        selectedDocument ? (
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-auto p-4 space-y-4">
            <EditorHeader document_title={selectedDocument.title} document_bg={selectedDocument.title}/> 
            {/* Placeholder for the Bg Prop */}
            <Editor data={selectedDocument.content} documentId={selectedDocument.id} />
          </main>
        </div>) : null
        
      )}
      {/* {
        selectedItem === 'msgs' ? <HomeView /> : null
        
      } */}
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
  