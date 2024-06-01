import { useState } from "react"
import { Link } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage"
import axios from 'axios';
import { parseJwt } from "../util/parseJwt"

const Login=()=> {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const isBtnDisabled = !(username && password)

    function sendLoginRequest () {
        const reqBody = {
            "username": username,
            "password": password,
        }

        axios.post(`/api/auth/login`, reqBody, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            setJwt(response.headers.authorization);
            if (parseJwt(response.headers.authorization).scope === "ROLE_BANNED")
                alert("Twoje konto zostało zablokowane");
            window.location.href = "/";
        }).catch(() => {
            alert("Nieprawidłowe dane logowania");
        });
    }

    function onSubmit (event) {
        event.preventDefault();
        sendLoginRequest();
    };

    return(
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; Logowanie</span>
            </div>
            <div className="content-wrapper">
                <form className="form" onSubmit={onSubmit}>
                    <h1>
                        Zaloguj się
                    </h1>
                    <div className='small-text'>
                        Nie masz konta?&nbsp;
                        <span><Link to="/zarejestruj">Zarejestruj się</Link></span>
                    </div>
                    <div>
                        <input type="text" id="username" placeholder='Login' value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div>
                        <input type="password" id="password" placeholder='Hasło' value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div className='button-container'>
                        <button disabled={isBtnDisabled}>Zaloguj</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Login;