import { BugIcon, LightbulbIcon, MessageCircleIcon, PuzzleIcon, SendIcon } from "lucide-react";
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
                      <h3 className="text-base font-semibold text-center">Ask Questions</h3>
                      <p className="text-sm text-muted-foreground text-center">Dive into deeper discussions with insightful questions.</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="group">
                  <CardContent className="p-4 flex flex-col gap-4 h-full">
                    <div className="flex flex-col items-center justify-center flex-grow">
                      <h3 className="text-base font-semibold text-center">Creative Prompts</h3>
                      <p className="text-sm text-muted-foreground text-center">Spark your imagination with creative prompts.</p>
                    </div>
                  </CardContent>
                </Card>
                <br/>
              </div>
              // This is the section that gets showed when there are no messages

              ):(messages.map((message, index) => (
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
              )))}
            </div>
            <br />
            <div className="flex items-center p-4 border-t">
            <Textarea
              placeholder="Type your message"
              className="flex-1"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <Button variant="ghost" size="icon" onClick={handleSendMessage} disabled={loading} className="ml-2">
              <SendIcon className="w-6 h-6" />
            </Button>

          </div>
            
          </CardContent>
        
      </div>
      
      </Card>
      </div>
    </>
  );
}