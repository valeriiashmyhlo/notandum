import './globals.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Notandum',
    description: 'Annotation tool',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="text-gray-900 antialiased leading-tight">
            <body className="min-h-screen bg-gray-100">
                <main className="flex w-full min-h-screen flex-col items-center p-24">
                    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
                            Notandum
                        </p>
                    </div>
                    {children}
                </main>
            </body>
        </html>
    );
}
