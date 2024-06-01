import { Navigate } from "react-router-dom";
import { parseJwt } from "./util/parseJwt";
import { useLocalState } from "./util/useLocalStorage"

const PrivateComponent = ({ children, roles=null }) => {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    if (jwt) {
        const parsedJwt = parseJwt(jwt);
        return roles === null || roles.includes(parsedJwt.scope) ? children : <Navigate to="/403"/>;
    }
    else
        return <Navigate to="/zaloguj"/>
}

export default PrivateComponent