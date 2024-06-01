import './styles.css';

import { Link } from "react-router-dom";
import { useLocalState } from '../../util/useLocalStorage';
import { parseJwt } from '../../util/parseJwt'

const Header=()=> {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const specialUser = jwt && (parseJwt(jwt).scope === "ROLE_ADMIN" || parseJwt(jwt).scope === "ROLE_PUBLICIST");

    function logout() {
        setJwt("");
        window.location.reload(false);
    }

    const LoginBtn=() => {
        if (jwt === "") {
            return(
                <div className="navbar-right">
                    <Link className="nav-item" to="/zaloguj">Zaloguj się</Link>
                </div>
            )
        }
        else {
            return(
                <div className="navbar-right">
                    <Link className="nav-item" onClick={() => logout("")}>Wyloguj się</Link>
                </div>
            )
        }
    }

    return (
        <header>
            <div className="container">
                <Link to='/'>
                    <img className="logo-img" src='/logo.png' alt='' />
                </Link>
            </div>
            <div className="nav-section">
                <div className="container">
                    <div className="navbar-left">
                        <Link to='/wiadomosci'>Wiadomości</Link>
                        <Link to='/dane-techniczne'>Dane techniczne</Link>
                        <Link to="/opinie">Opinie</Link>
                        <Link to="/raporty">Raporty spalania</Link>
                    </div>
                    <LoginBtn/>
                </div>
            </div>
            {specialUser && (
                <div className="subnav-section">
                    <div className='container'>
                        {parseJwt(jwt).scope === "ROLE_ADMIN" && <Link to='/admin'>Lista użytkowników</Link>}
                        {parseJwt(jwt).scope === "ROLE_PUBLICIST" && <Link to='/dodaj-artykul'>Dodaj artykuł</Link>}
                    </div>
                </div>
            )}
        </header>
    );
}
export default Header