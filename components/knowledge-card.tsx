import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function KnowledgeCard (){
    return (
        <Card>
                <CardHeader>
                  <CardTitle>Knowledge Base</CardTitle>
                  <CardDescription>Browse and search the knowledge base for answers to your questions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input type="search" placeholder="Search knowledge base..." />
                  <div className="mt-4 space-y-2">
                    <div>
                      <h4 className="font-semibold">Getting Started</h4>
                      <p className="text-muted-foreground">Learn how to use the knowledge base.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Troubleshooting</h4>
                      <p className="text-muted-foreground">Common issues and how to resolve them.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">API Documentation</h4>
                      <p className="text-muted-foreground">Learn how to use our API.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
    )
}