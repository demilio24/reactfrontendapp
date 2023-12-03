import type { Metadata } from 'next'
import './globals.css'
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// const bebas = Bebas_Neue({weight: "400", subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Emilio Arias',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-[arial]`}>{children}</body>
    </html>
  )
}
