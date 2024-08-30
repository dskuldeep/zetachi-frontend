import Link from "next/link"
import { JSX, SVGProps } from "react"
import { Footer } from "./footer"
import { Database, Workflow, Shield, FileText, CheckCircle, Users, Settings, BarChart } from 'lucide-react'; // Import additional icons

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white shadow-md">
        <Link href="/" className="flex items-center" prefetch={false}>
          <img src="/logo-rect.png" alt="Zetachi Logo" className="h-10 w-auto md:h-16" />
        </Link>
        <nav className="ml-auto flex items-center gap-6">
          {/* <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Contact
          </Link> */}
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100"
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-10 items-center justify-center rounded-md bg-black text-white px-8 text-sm font-medium shadow transition-colors hover:bg-gray-700"
            prefetch={false}
          >
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-16 bg-gradient-to-r from-black to-gray-800 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">Zetachi - AI Driven Workflow Automation Platform</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl">
              Create and manage AI worflows using your own data, connect with multiple data sources, applications and automate complex workflows with LLM-based intelligence.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-md bg-white text-black px-8 text-sm font-medium shadow transition-colors hover:bg-gray-700 hover:text-white"
                prefetch={false}
              >
                Get Started
              </Link>
              <Link
                href="#learn-more"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white hover:text-black"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
        <section id="learn-more" className="w-full py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Why Zetachi?</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                Zetachi offers a unique blend of knowledge management and intelligent automation, making it the perfect tool for modern teams.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Database className="h-12 w-12 text-black" />
                <h3 className="mt-4 text-xl font-semibold">Connect Multiple Data Sources</h3>
                <p className="mt-2 text-gray-600">
                  Seamlessly integrate with various data sources to create a comprehensive knowledgebase.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Workflow className="h-12 w-12 text-black sm:h-16 sm:w-16" />
                <h3 className="mt-4 text-xl font-semibold sm:text-2xl">Automate Complex Workflows</h3>
                <p className="mt-2 text-gray-600">
                  Use LLM-based intelligence to automate tasks that traditional platforms can't handle.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-12 w-12 text-black" />
                <h3 className="mt-4 text-xl font-semibold">Secure and Reliable</h3>
                <p className="mt-2 text-gray-600">
                  Your data is protected with industry-leading security measures.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Transform Your Workflow</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              Zetachi empowers your team to work smarter, not harder. Experience the future of knowledge management and automation today.
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center p-4 border rounded-lg shadow">
                <FileText className="h-10 w-10 text-black" />
                <h3 className="text-xl font-semibold">Automated Reporting</h3>
                <p className="mt-2 text-gray-600">
                  Generate reports automatically from your data sources, saving time and reducing errors.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg shadow">
                <CheckCircle className="h-10 w-10 text-black" />
                <h3 className="text-xl font-semibold">Task Management</h3>
                <p className="mt-2 text-gray-600">
                  Streamline task assignments and track progress with integrated project management tools.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg shadow">
                <Database className="h-10 w-10 text-black" />
                <h3 className="text-xl font-semibold">Data Integration</h3>
                <p className="mt-2 text-gray-600">
                  Connect multiple data sources seamlessly to create a unified view of your operations.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg shadow">
                <Users className="h-10 w-10 text-black" />
                <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
                <p className="mt-2 text-gray-600">
                  Collaborate with your team in real-time, sharing insights and updates instantly.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg shadow">
                <Settings className="h-10 w-10 text-black" />
                <h3 className="text-xl font-semibold">Custom Workflows</h3>
                <p className="mt-2 text-gray-600">
                  Design custom workflows tailored to your business needs, enhancing efficiency and productivity.
                </p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg shadow">
                <BarChart className="h-10 w-10 text-black" />
                <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
                <p className="mt-2 text-gray-600">
                  Leverage AI to gain insights from your data, helping you make informed decisions faster.
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-md bg-black text-white px-8 text-sm font-medium shadow transition-colors hover:bg-gray-700"
                prefetch={false}
              >
                Sign Up Now
              </Link>
              <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100"
                prefetch={false}
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Visit Our Blog</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              Stay updated with the latest news, tips, and insights from Zetachi. Our blog covers a wide range of topics to help you get the most out of our platform.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="https://blog.getzetachi.com"
                className="inline-flex h-12 items-center justify-center rounded-md bg-black text-white px-8 text-sm font-medium shadow transition-colors hover:bg-gray-700"
                prefetch={false}
                target="_blank"
              >
                Visit Our Blog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
function CombineIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect width="8" height="8" x="2" y="2" rx="2" />
      <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1" />
      <polyline points="7 21 10 18 7 15" />
      <rect width="8" height="8" x="14" y="14" rx="2" />
    </svg>
  )
}


function FolderIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}


function InfoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SectionIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0" />
      <path d="M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0" />
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

