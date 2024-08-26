// Notification Modal Component
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NotificationModal({isOpen, onClose}: NotificationModalProps){
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Notifications</DialogTitle>
                    <DialogDescription>Your Recent Notifications</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                    <div className="grid grid-cols-[25px_1fr] items-start gap-4">
                    <div className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                    <div className="grid gap-1">
                        <p className="text-sm font-medium">Your call has been confirmed.</p>
                        <p className="text-sm text-muted-foreground">5 min ago</p>
                    </div>
                    </div>
                    <div className="grid grid-cols-[25px_1fr] items-start gap-4">
                    <div className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                    <div className="grid gap-1">
                        <p className="text-sm font-medium">You have a new message!</p>
                        <p className="text-sm text-muted-foreground">1 min ago</p>
                    </div>
                    </div>
                    <div className="grid grid-cols-[25px_1fr] items-start gap-4">
                    <div className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                    <div className="grid gap-1">
                        <p className="text-sm font-medium">Your subscription is expiring soon!</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

