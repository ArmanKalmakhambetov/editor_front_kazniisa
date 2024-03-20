import "./globals.css";
import ReduxProvider from "@/store/provider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "@/components/header"
import Footer from "@/components/footer"
export const metadata = {
  title: "Editor js",
  description: "React KazNIISA Editor js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body>
          
          <main>{children}</main>
          
        </body>
      </ReduxProvider>
    </html>
  );
}
