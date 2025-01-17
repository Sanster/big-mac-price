import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Global Price Calculator",
  description: "Big Mac Index based global price calculator",
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍔</text></svg>",
  openGraph: {
    title: "Global Price Calculator",
    description: "Big Mac Index based global price calculator",
    type: "website",
    images: [
      {
        url: "https://bigmacprice.com/big-mac-price.png",
        width: 1200,
        height: 630,
        alt: "Big Mac Price Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Price Calculator",
    description: "Big Mac Index based global price calculator",
    images: ["https://bigmacprice.com/big-mac-price.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <script
        defer
        src="/stats/script.js"
        data-website-id="ff8779f5-f30b-4ea7-8d0c-1a225573de89"
      ></script>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
