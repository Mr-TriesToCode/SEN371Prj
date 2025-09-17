import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-retro',
});

export const metadata: Metadata = {
  title: 'CampusLearn',
  description: 'CampusLearn is an e-learning platform designed to provide students with additional learning resources and academic support, allowing them to create topics for help, interact with peer tutors through multimedia content and messaging, and access flexible learning opportunities outside the traditional classroom.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${pressStart2P.variable} font-retro antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
