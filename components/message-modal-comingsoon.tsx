import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { DialogHeader } from "./ui/dialog";

interface MessageProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MessageModal({isOpen, onClose}: MessageProps){
    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Messages: Coming Soon</DialogTitle>
                    <DialogDescription>
                        Stay tuned for our upcoming feature, where you can 
                        seamlessly communicate with your team and clients using Zetachi.
                    </DialogDescription>
                </DialogHeader>
                
            </DialogContent>
        </Dialog>

    )
}