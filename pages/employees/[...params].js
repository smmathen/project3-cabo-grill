import Server from "next/dist/server/base-server";
import Login from "../../components/Login";
import Serverui from "../../components/Serverui";

export default function employee({params}) {
    const [name, role] = params || [];
    return role == 'guest' ? <Login /> : <Serverui />

}

export function getServerSideProps({params: {params}}) {
    return {
        props: {
            params,
        },
    }
}