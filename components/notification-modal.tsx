import { useState, useEffect } from 'react';
import { messaging } from './firebaseConfig';
import { onMessage } from 'firebase/messaging';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const [notifications, setNotifications] = useState<{ message: string, time: string }[]>([]);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      const notification = {
        message: payload.notification?.body || 'New notification',
        time: new Date().toLocaleTimeString(),
      };
      setNotifications((prev) => [notification, ...prev]);
    });
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>Your Recent Notifications</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          {notifications.map((notification, index) => (
            <div key={index} className="grid grid-cols-[25px_1fr] items-start gap-4">
              <div className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
              <div className="grid gap-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-sm text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
