"use client";
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e:any) =>{
    const {id, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };
  const handleSubmit = async(e: any) => {
    e.preventDefault();
    setError("");

    try{
      const response = await axios.post("/api/token", {
        username: formData.email,
        password: formData.password
      });

      if (response.status === 200){
        // localStorage.setItem("access_token", response.data.access_token);
        // localStorage.setItem("refresh_token", response.data.refresh_token);
        router.push("/dashboard")
      }
    } catch (err:any){
      setError(err.response?.data?.detail || "Sign in failed")
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
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">Enter your email and password to access your account.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-sm font-medium underline underline-offset-4 hover:text-primary"
                  prefetch={false}
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange}required />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
            Sign In
          </Button>
          </form>
         
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium underline underline-offset-4 hover:text-primary" prefetch={false}>
              Sign up
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
