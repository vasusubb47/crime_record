
import { AppProps } from "next/app";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ Component, pageProps }: AppProps) => {
    return <>
        <Nav/>
        <Component {...pageProps} />
        <Footer/>
    </>
}

export default Layout;
