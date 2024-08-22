import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import AIChat from "./ai-chat";
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";

// Type definitions for conversation data
interface Conversation {
    conv_id: string;
    title: string;
    last_interaction: string;
}

interface ZetaAISheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ZetaAISheet({ isOpen, onClose }: ZetaAISheetProps) {
    // Set the state with an array of conversations of type `Conversation`
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const accessTokenCookie = Cookies.get("access_token");
                const response = await fetch('https://api.getzetachi.com/get-conversations-list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessTokenCookie}`,
                    },
                });

                // Expecting the data to have a `conversations` array
                const data: { conversations: Conversation[] } = await response.json();
                setConversations(data.conversations);
            } catch (error) {
                console.error(error);
            }
        };

        fetchConversations();
    }, []);

    const handleConversationSelect = (conv_id: string) => {
        setSelectedConversationId(conv_id);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent style={{ maxWidth: '60vw', maxHeight: '100vh' }}>
                <SheetHeader>
                    <SheetTitle>Zeta AI</SheetTitle>
                    <SheetDescription>
                        Ask Questions, Zeta is Smart and has the context of your Documents and Files.
                    </SheetDescription>
                </SheetHeader>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={25} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 8%)' }}>
                        {/* Chat history interface */}
                        <div className="conversation-list">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.conv_id}
                                    onClick={() => handleConversationSelect(conv.conv_id)}
                                    className="conversation-item cursor-pointer p-2 hover:bg-gray-200"
                                >
                                    <p>{conv.title}</p>
                                    <small>{new Date(conv.last_interaction).toLocaleString()}</small>
                                </div>
                            ))}
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={75} className="overflow-hidden max-h-[calc(100vh-8%)] w-full relative">
                        {/* Chat interface */}
                        <div className="flex flex-col h-full w-full">
                            <AIChat conversationId={selectedConversationId} />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </SheetContent>
        </Sheet>
    );
}
