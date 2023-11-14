import AuthProvider from '@/contexts/AuthContext'
import '../scss/globals.scss'
import Header from '@/components/Header'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopFiller from "@/components/TopFiller"

export const metadata = {
  title: 'Academic Web App',
  description: 'Academic Web App by Benevos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header/>
          <TopFiller/>
          <Navbar/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  )
}
