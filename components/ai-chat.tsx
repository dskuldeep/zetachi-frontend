import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState, useEffect, FC, ReactNode } from 'react';
import Cookies from "js-cookie";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { Textarea } from "./ui/textarea";
import { LoadingSpinner } from "./LoadingSpinner";

interface Message {
    user: string;
    ai: string;
}

interface AIChatProps {
    conversationId: string | null;
}

export default function AIChat({ conversationId }: AIChatProps) {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (conversationId) {
            // Fetch conversation history
            const fetchConversationHistory = async () => {
                try {
                    const accessTokenCookie = Cookies.get("access_token");
                    const response = await fetch(`https://api.getzetachi.com/get-conversation?conv_id=${conversationId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessTokenCookie}`,
                        },
                    });
                    const data = await response.json();
                    setMessages(data.content.blocks.map((block: { author: string; message: any; }) => ({
                        user: block.author === 'User' ? block.message : '',
                        ai: block.author === 'AI' ? block.message : ''
                    })));
                } catch (error) {
                    console.error(error);
                }
            };

            fetchConversationHistory();
        } else {
            setMessages([]);
        }
    }, [conversationId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() !== '') {
            setInputValue('');
            setLoading(true);
            try {
                const accessTokenCookie = Cookies.get("access_token");
                const response = await fetch('https://api.getzetachi.com/start-conversation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessTokenCookie}`,
                    },
                    body: JSON.stringify({ "prompt": inputValue, "conv_id": conversationId }),
                });
                const data = await response.json();
                setMessages((prevMessages) => [...prevMessages, { user: inputValue, ai: data.message }]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && event.shiftKey) {
            // Insert a new line character in the textarea
            event.preventDefault();
            setInputValue((prevValue) => prevValue + '\n');
        } else if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleClearChat = () => {
        setMessages([]);  // Clear the chat UI
        setInputValue(''); // Clear the input box
        handleSendMessage();  // Start a new conversation
    };

    const remarkPlugins = [remarkBreaks, remarkGfm];

    const components: { [key: string]: FC<{ children: ReactNode }> } = {
        br: () => <br />,
        ul: (props) => (
            <ul className="list-disc pl-4">
                {props.children}
            </ul>
        ),
        ol: (props) => (
            <ol className="list-decimal pl-4">
                {props.children}
            </ol>
        ),
        li: (props) => (
            <li className="py-1">
                {props.children}
            </li>
        ),
        pre: (props) => (
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                <code>{props.children}</code>
            </pre>
        ),
        code: (props) => (
            <code className="bg-gray-100 p-1 rounded-md">
                {props.children}
            </code>
        ),
    };

    return (
        <>
            <div className="ml-4 mt-4 overflow-auto">
                <Card>
                    <div className="flex-1 flex flex-col overflow-auto p-4 space-y-2">
                        <CardHeader>
                            <CardTitle>Chat with AI</CardTitle>
                            <CardDescription>
                                Get information or answers to your questions by chatting with our AI assistant.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {messages.length === 0 ? (
                                    <div className="items-center justify-center mx-auto grid gap-6 grid-cols-3">
                                        <Card className="group">
                                            <CardContent className="p-4 flex flex-col gap-4 h-full">
                                                <div className="flex flex-col items-center justify-center flex-grow">
                                                    <h3 className="text-base font-semibold text-center">Query your data</h3>
                                                    <p className="text-sm text-muted-foreground text-center">Zeta AI answers your questions based on your documents.</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="group">
                                            <CardContent className="p-4 flex flex-col gap-4 h-full">
                                                <div className="flex flex-col items-center justify-center flex-grow">
                                                    <h3 className="text-base font-semibold text-center">Need Insights?</h3>
                                                    <p className="text-sm text-muted-foreground text-center">Zeta AI helps you gain insights from your documents.</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="group">
                                            <CardContent className="p-4 flex flex-col gap-4 h-full">
                                                <div className="flex flex-col items-center justify-center flex-grow">
                                                    <h3 className="text-base font-semibold text-center">Have a conversation</h3>
                                                    <p className="text-sm text-muted-foreground text-center">Chat with Zeta AI to get context-aware responses.</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ) : (
                                    messages.map((msg, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="text-blue-500">User: {msg.user}</div>
                                            <div className="text-gray-900">
                                                <ReactMarkdown components={components} remarkPlugins={remarkPlugins}>
                                                    {msg.ai}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>

            <div className="p-4 space-y-2 border-t border-gray-200">
                <Textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    rows={3}
                    className="resize-none"
                />
                <div className="flex justify-between items-center">
                    <Button onClick={handleSendMessage} disabled={loading}>
                        {loading ? <LoadingSpinner /> : <SendIcon />}
                    </Button>
                    <Button onClick={handleClearChat} className="ml-2">
                        Clear Chat
                    </Button>
                </div>
            </div>
        </>
    );
}
