// Settings Modal component
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Toggle } from "@/components/ui/toggle"
import { SVGProps } from "react"

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose}: SettingsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
          <DialogDescription>Manage your account preferences and security settings.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change</Button>
            </div>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center gap-4">
              <Input id="password" type="password" defaultValue="********" />
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="notifications">Notifications</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="email-notifications" />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="push-notifications" />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="sms-notifications" />
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
            <div className="flex items-center gap-4">
              <Toggle id="two-factor" aria-label="Toggle two-factor authentication">
                <LockIcon className="mr-2 h-4 w-4" />
                Two-Factor Authentication
              </Toggle>
              <Button variant="outline">Set Up</Button>
            </div>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="delete-account">Delete Account</Label>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function LockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
