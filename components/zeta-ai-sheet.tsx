import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import AIChat from "./ai-chat";
  
interface ZetaAISheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ZetaAISheet({isOpen, onClose}: ZetaAISheetProps){
    return (
        <Sheet open={isOpen} onOpenChange={onClose} >
            <SheetContent style={{ maxWidth: '60vw', maxHeight: '100vh' }}>
                <SheetHeader>
                <SheetTitle>Zeta AI</SheetTitle>
                <SheetDescription>
                    Ask Questions, Zeta is Smart and has the context of your Documents and Files.
                </SheetDescription>
                </SheetHeader>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={25} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 8%)' }}>
                        {/* Code to implement chat history interface */}
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={75} className="overflow-hidden max-h-[calc(100vh-8%)] w-full relative">
                        {/* Code to implement chat interface */}
                        <div className="flex flex-col h-full w-full">
                            <AIChat/>
                        </div>
                    </ResizablePanel>
                    </ResizablePanelGroup>
            </SheetContent>
        </Sheet>
    )

}