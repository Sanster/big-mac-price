import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import "./globals.css"

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
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
