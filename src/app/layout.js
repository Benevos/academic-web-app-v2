import AuthProvider from '@/contexts/AuthContext'
import '../scss/globals.scss'

import Footer from "@/components/Footer";


export const metadata = {
  title: 'Academic Web App',
  description: 'Academic Web App by Benevos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
     
          
          {children}
          <Footer/>
    
      </body>
    </html>
  )
}
