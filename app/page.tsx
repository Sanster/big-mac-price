"use client"

import { FaGithub } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { BigMacRecord, getBigMacData } from "./models"
import { PriceTable } from "@/components/price-table"
import MyProjects from "@/components/my-projects"

const Header = ({
  amount,
  setAmount,
}: {
  amount: string
  setAmount: (value: string) => void
}) => {
  return (
    <div className="h-[600px] flex flex-col justify-between max-sm:justify-center max-sm:h-full">
      <div className="flex flex-col gap-2 max-sm:items-center">
        <h1 className="leading-normal text-4xl font-bold text-left max-sm:text-center max-sm:text-2xl bg-[#f7f8f8] bg-clip-text text-transparent">
          <a
            href="https://github.com/TheEconomist/big-mac-data"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-8 text-yellow-500 transition-colors duration-300 group relative"
          >
            <span className="absolute -left-12 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              🍔
            </span>
            Big Mac Index
          </a>{" "}
          based <br className="max-sm:hidden" />
          Global Price Calculator
        </h1>

        <div className="text-base text-foreground/70">
          Your product price in USD
        </div>
        <div className="flex gap-2 mb-6 items-center">
          <Label htmlFor="price" className="text-lg">
            $
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="5.69"
            className="w-[140px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 max-sm:items-center">
        <div className="text-base text-foreground/70">My other projects</div>
        <MyProjects />
      </div>
    </div>
  )
}

export default function Home() {
  const [records, setRecords] = useState<BigMacRecord[]>([])
  const [amount, setAmount] = useState("5.69")

  useEffect(() => {
    getBigMacData().then(setRecords)
  }, [])

  return (
    <div className="container mx-auto min-h-screen">
      <div className="max-w-screen-2xl h-screen flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex flex-col items-center justify-center p-4 md:w-1/2">
          <Header amount={amount} setAmount={setAmount} />
        </div>

        <div className="flex h-full justify-center items-center md:w-1/2">
          <div className="w-full h-[600px] bg-background">
            <PriceTable data={records} amount={amount} />
          </div>
        </div>
      </div>

      <div className="fixed flex flex-col gap-4 bottom-8 right-8 bg-background">
        <a
          href="https://your-target-url.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="px-4 py-2 flex items-center gap-2 border rounded-md ">
            <FaGithub />
            Contribute Big Mac Price
          </div>
        </a>
      </div>
    </div>
  )
}
