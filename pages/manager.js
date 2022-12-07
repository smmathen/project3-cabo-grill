
import Link from "next/link";
import Router, { useRouter } from "next/router";
import ManBar from '../components/ManBar'
import InputStaff from '../components/InputStaff'
import Seo from '../components/Seo'



export default function manager() {
    const router = useRouter();
    return (
        <div>
            <Seo title="Home" />
            <ManBar/>
            Welcome Manager

        </div>
    )
}