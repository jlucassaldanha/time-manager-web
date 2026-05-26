import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Time Manager",
  description: "Sistema de gestão de horas extras",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const isAuthenticated = cookieStore.has("jwt_token");

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {isAuthenticated && <NavigationBar />}
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          {children}
        </Box>
      </body>
    </html>
  );
}
