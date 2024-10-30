// app/layout.js
"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import BootStrapClient from './components/BootStrapClient';
import ClientWrapper from './components/ClientWrapper';
import DataProvider from './components/DataProvider';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.0/simplex/bootstrap.min.css"
                    rel="stylesheet"
                />
            </head>
            <body>
                <BootStrapClient />
                <ClientWrapper>
                  <DataProvider>
                    {children}
                  </DataProvider>
                </ClientWrapper>
            </body>
        </html>
    );
}

