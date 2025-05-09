"use client"
import HomePage from "@/components/HomePage"
import { useAccount } from "wagmi"
export default function Home() {
  const { isConnected } = useAccount()
  return (
    <main>
      {isConnected ? <HomePage /> : <div>Connect Your Account</div>}
    </main>
  )
}