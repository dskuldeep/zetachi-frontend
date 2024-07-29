'use client'
import axios from "axios"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps, useState } from "react"
import { useRouter } from "next/navigation"

export function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  })
  const [error, setErrror] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async(e: any) =>{
    e.preventDefault();
    formData.password = formData.confirmPassword;
    if (formData.password !== formData.confirmPassword){
      setErrror('Passwords do not match');
      return;
    }

    try{
      const response = await axios.post('/api/register', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company
      });

      if (response.status === 200){
        setSuccess('Registration successful');
        router.push('/login');
      }
    } catch(err: any){
      setErrror(err.response.data.detail || 'Registration Failed');
    }
  }
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <img src="/logo-rect.png" alt="Zetachi Logo" width={128} height={64}/>
          <span className="sr-only">Zetachi</span>
        </Link>
        </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">Create your account to get started.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your Username" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" value={formData.confirmPassword} onChange={handleChange} required />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Enter your company" value={formData.company} onChange={handleChange} required />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <Button type="submit" className="w-full">
            Sign Up
          </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium underline underline-offset-4 hover:text-primary" prefetch={false}>
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
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
