import Footer from "../footer";
import Navbar from "../navbar";
import style from "./layout.module.css"
import Head from "next/head"

export default function Layout({ children }: any) {
    return (
        <div className="content">
            <Head>
                <title>CollegeCo</title>
                <meta name="description" content="Sell on Colleges" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className={style.wrapper}>


                {children}


                <div className={style.push}>&nbsp;</div>
            </div>
            <Footer />
        </div>

    )
}