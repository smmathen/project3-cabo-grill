import { useRouter } from "next/router";
import Seo from "../components/Seo";

const STORAGE_KEY = "@user";

export default function auth() {
    const router = useRouter();
    const s = localStorage.getItem(STORAGE_KEY);
    const userInfo = JSON.parse(s);
    if(userInfo === null) {
        router.push(`/employees/${"null"}/${"guest"}`);
    } else {
        router.push(`/employees/${userInfo["name"]}/${userInfo["role"]}`);
    }
    return (
        <>
            <Seo title="employee" />
            <div>redirecting</div>
        </>

    )
}