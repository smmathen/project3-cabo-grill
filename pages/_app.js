
import Layout from "./Layout";
import styles from "../styles/globals.css";

export default function App({Component, pageProps}) {
    return (
        <Layout>
            <Component {...pageProps}/>
        </Layout>
    )
}
