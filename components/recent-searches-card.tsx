import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

export default function(){
    return (
        <Card>
                <CardHeader>
                  <CardTitle>Recent Searches</CardTitle>
                  <CardDescription>View your recent searches and access them quickly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Search term 1</span>
                      <span className="text-muted-foreground">2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search term 2</span>
                      <span className="text-muted-foreground">5 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search term 3</span>
                      <span className="text-muted-foreground">1 week ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
    )
}