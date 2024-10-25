// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
//
import BootStrapClient from './components/BootStrapClient.js';

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
	    	    {children}
                <BootStrapClient />
            </body>
        </html>
    );
}
