import {Inter} from "next/font/google";
import "../globals.css";
import {ThemeProvider} from "@/components/theme-provider";

const inter = Inter({subsets: ["latin"]});

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <ThemeProvider
      attribute={"class"}
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
    </body>
    </html>
  )
    ;
}
