import { SendIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"


export default function AIChat() {
    return  (
        <><div className="flex-1 flex flex-col overflow-auto p-4 space-y-2">
            <Card>
            <CardHeader>
                <CardTitle>Chat with AI</CardTitle>
                <CardDescription>
                    Get information or answers to your questions by chatting with our AI assistant.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex space-x-2">
                        <strong>You:</strong>
                        <span>What is the difference between a relational database and a NoSQL database?</span>
                    </div>
                    <div className="space-y-2">
                        <strong>AI Assistant:</strong>
                        <p>The main differences between relational databases and NoSQL databases are:</p>
                        <ul className="list-disc list-inside">
                            <li>
                                <strong>Data Model:</strong> Relational databases store data in tables with predefined schemas,
                                while NoSQL databases use flexible, schema-less data models like key-value, document,
                                column-family, or graph.
                            </li>
                            <li>
                                <strong>Scalability:</strong> NoSQL databases are generally more scalable, allowing for easier
                                horizontal scaling by adding more nodes to a cluster. Relational databases typically scale
                                vertically by adding more resources to a single server.
                            </li>
                            <li>
                                <strong>Consistency:</strong> Relational databases generally provide stronger consistency
                                guarantees, while NoSQL databases may offer eventual consistency.
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
        </div>
        <div className="flex items-center p-4 border-t">
                <Input type="text" placeholder="Type your message" className="flex-1" />
                <Button variant="ghost" size="icon">
                    <SendIcon className="w-6 h-6" />
                </Button>
            </div>
    </>

)}