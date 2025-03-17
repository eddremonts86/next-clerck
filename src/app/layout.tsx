import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

import { inter, geistSans, geistMono } from "@/constants/typography";

export const metadata: Metadata = {
    title: "Portfolio - Frontend Engineer",
    description:
        "Personal portfolio showcasing frontend engineering projects and skills",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html
                lang="en"
                suppressHydrationWarning
            >
                <body
                    className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
