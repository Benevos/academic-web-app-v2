import '../scss/globals.scss'

import Footer from "@/components/Footer/Footer";


export const metadata = {
  title: 'Calcula UAT',
  description: 'Academic Web App by Benevos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link
          rel="icon.png"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>         
            {children}

            <Footer/>

      </body>
    </html>
  )
}
