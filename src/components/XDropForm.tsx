"use client";
import InputField from "@/ui/InputField";
import { useState, useEffect } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { XDropAbi, XDropAddress, XTokenAbi, XTokenAddress } from "@/constants";
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useConfig } from "wagmi";




export default function XDropForm() {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [amount, setAmount] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const account = useAccount();
  const { writeContractAsync } = useWriteContract()
  const config = useConfig()

  useEffect(() => {
    async function getXTokenOwner() {
      const response = await readContract(config, {
        abi: XTokenAbi,
        address: XTokenAddress as `0x${string}`,
        functionName: "owner",
      })
      setIsOwner(response === account.address)
    }
    getXTokenOwner()
  }, [account.address, config])




  async function getApprovedAmount(XDropAddress: string): Promise<number> {
    const response = await readContract(config, {
      abi: XTokenAbi,
      address: XTokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, XDropAddress as `0x${string}`],
    })
    return response as number
  }
  async function handleSubmit() {

    const approvedAmount = await getApprovedAmount(XDropAddress)

    if (approvedAmount < parseInt(amount)) {
      const approvalHash = await writeContractAsync({
        abi: XTokenAbi,
        address: XTokenAddress as `0x${string}`,
        functionName: "approve",
        args: [XDropAddress as `0x${string}`, BigInt(amount)],
      })
      const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: approvalHash,
      })
      console.log("Approval Confirmed", approvalReceipt)
    } else {
      writeContractAsync({
        address: XDropAddress as `0x${string}`,
        abi: XDropAbi,
        functionName: "transfer",
        args: [recipientAddress, amount],
      })
    }
  }



  async function handleMint() { 
    const response = await writeContract(config,{
      address: XTokenAddress as `0x${string}`,
      abi: XTokenAbi,
      functionName: "mint",
      args: [account.address as `0x${string}`, BigInt(mintAmount)],
    })
    console.log("Minting Confirmed", response)
  }


  return (
    <main>
      Hi from XDrop
      <InputField label="Recipient Address" placeholder="0x" value={recipientAddress} onChange={e => setRecipientAddress(e.target.value)} />
      <InputField label="Amount" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} />

      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Send Transaction</button>

      {isOwner && <div>
        <InputField label="Mint Amount" placeholder="0" value={mintAmount} onChange={e => setMintAmount(e.target.value)} />
        <button onClick={handleMint} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Mint</button>
      </div>
      }
    </main>
  )
}