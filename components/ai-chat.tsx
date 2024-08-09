import { SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState, useEffect, ReactNode } from 'react';
import Cookies from "js-cookie";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { FC } from 'react';
import { Textarea } from "./ui/textarea";



interface Message {
  user: string;
  ai: string;
}

export default function AIChat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
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
                  <span className="bg-blue-100 text-gray-700 px-2 py-1 rounded-md inline-block">{message.user}</span>
                  <br/>
                  <ReactMarkdown
                    className="text-gray-700"
                    components={components}
                    remarkPlugins={remarkPlugins}
                  >
                    {message.ai}
                  </ReactMarkdown>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center p-4 border-t">
        <Textarea
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