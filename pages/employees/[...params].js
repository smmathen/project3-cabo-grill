import Server from "next/dist/server/base-server";
import { useRouter } from "next/router";
import Login from "../../components/Login";
import Serverui from "../../components/Serverui";

export default function employee({params}) {
    const [name, role] = params || [];
    if(role === 'guest') {
        return <Login/>
    } else if (role === 'Server') {
        return <Serverui/>
    } else if (role === 'Manager') {
        const router = useRouter();
        router.push("/manager");
    }

}

export function getServerSideProps({params: {params}}) {
    return {
        props: {
            params,
        },
    }
}