import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";

interface Message {
  user: string;
  ai: string;
}

export default function AIChat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setLoading(true);
      try {
        const accessTokenCookie = Cookies.get("access_token");
        const response = await fetch('http://localhost:8000/llm-query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessTokenCookie}`,
          },
          body: JSON.stringify({ "prompt": inputValue }),
        });
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, { user: inputValue, ai: data.message }]);
        setInputValue('');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (event: { key: string; preventDefault: () => void; }) =>{
    if (event.key === 'Enter'){
        event.preventDefault();
        handleSendMessage();
    }
  }

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto p-4 space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Chat with AI</CardTitle>
            <CardDescription>
              Get information or answers to your questions by chatting with our AI assistant.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-gray-500">{message.user}</span>
                  <span className="text-gray-800">{message.ai}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center p-4 border-t">
        <Input
          type="text"
          placeholder="Type your message"
          className="flex-1"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button variant="ghost" size="icon" onClick={handleSendMessage} disabled={loading}>
          <SendIcon className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
}