import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";
import axios from 'axios';

const Register=()=> {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [errors, setErrors] = useState({
        usernameError: "",
        passwordError: "",
        password2Error: "",
        emailError: "",
        nameError: "",
        surnameError: "",
        otherError: "",
    })

    const isBtnDisabled = !(username && password && password2 && email);

    function clearErrors() {
        setErrors({
            username: "",
            password: "",
            password2: "",
            email: "",
            name: "",
            surname: "",
            other: "",
        })
    }

    function validate() {
        let errors = false;

        let usernameError = "";
        let passwordError = "";
        let password2Error = "";
        let emailError = "";
        let nameError = "";
        let surnameError = "";

        const format = /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/? ]/;

        clearErrors();

        if (username.length < 5 || username.length > 40) {
            usernameError = "Nazwa użytkownika musi zawierać od 5 do 40 znaków";
            errors = true;
        }
        if (format.test(username)) {
            usernameError = "Nazwa użytkownika nie może zawierać znaków specjalnych";
            errors = true;
        }

        if (password.length < 4) {
            passwordError = "Hasło nie może być krótsze niż 4 znaki";
            errors = true;
        }
        
        if (!(password2 === password)) {
            password2Error = "Pole powtórz hasło nie zgadza się z polem hasło";
            errors = true;
        }
        
        if (!email.includes("@") || email.length < 5) {
            emailError = "Nieprawidłowy adres email";
            errors = true;
        }
            
        if (name.length > 50) {
            nameError = "Imię nie może być dłuższe niż 50 znaków";
            errors = true;
        }
        
        if (surname.length > 50) {
            surnameError = "Nazwisko nie może być dłuższe niż 50 znaków";
            errors = true;
        }
        

        if (errors) {
            setErrors({usernameError, passwordError, password2Error, emailError, nameError, surnameError});
            return false;
        }
        else
            return true;
    }

    function sendRegisterRequest () {
        const reqBody = {
            username: username,
            password: password,
            name: name,
            surname: surname,
            email: email,
        }

        axios.post(`/api/auth/register`, reqBody, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            setJwt(response.headers.authorization);
            window.location.href = "/"
        }).catch((error) => {
            setErrors({otherError: error.response.data.error})
        });
    }

    function onSubmit (event) {
        event.preventDefault();
        if(!validate())
            return;
        sendRegisterRequest();
    };

    return(
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; Rejestracja</span>
            </div>
            <div className="content-wrapper">
                <form className="form" onSubmit={onSubmit}>
                    <h1>Załóż nowe konto</h1>
                    <div className="small-text">
                        *Pola obowiązkowe
                    </div>
                    {errors.otherError ? <div className="error">{errors.otherError}</div> : null}
                    {errors.usernameError ? <div className="error">{errors.usernameError}</div> : null}
                    <div>
                        <input type="text" id="username" placeholder="Login*" value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    {errors.nameError ? <div className="error">{errors.nameError}</div> : null}
                    <div>
                        <input type="text" id="name" placeholder="Imię" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>
                    {errors.surnameError ? <div className="error">{errors.surnameError}</div> : null}
                    <div>
                        <input type="text" id="surname" placeholder="Nazwisko" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                    </div>
                    {errors.emailError ? <div className="error">{errors.emailError}</div> : null}
                    <div>
                        <input type="email" id="email" placeholder="E-mail*" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    {errors.passwordError ? <div className="error">{errors.passwordError}</div> : null}
                    <div>
                        <input type="password" id="password" placeholder="Hasło*" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    {errors.password2Error ? <div className="error">{errors.password2Error}</div> : null}
                    <div>
                        <input type="password" id="password2" placeholder="Powtórz hasło*" value={password2} onChange={(event) => setPassword2(event.target.value)}/>
                    </div>
                    <div className='button-container'>
                        <button disabled={isBtnDisabled}>Załóż nowe konto</button>
                    </div>
                </form>
            </div>
        </main>
        
    )
}

export default Register