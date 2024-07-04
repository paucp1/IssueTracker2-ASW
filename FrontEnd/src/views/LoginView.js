import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate } from 'react-router-dom';
import '../assets/css/loginStyle.css';
 

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%]{8,24}$/;

const apiUrl = 'https://issuetracker2-asw.herokuapp.com/users/api-token-auth/';

export const Login = ({ setIsLoggedIn }) => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
    userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData
            });

            const responseData = await response.json();

            if (response.ok) {
                setSuccess(true);
                setUser('');
                setPwd('');
                setErrMsg('');
                console.log("Usuario logeado correctamente");
                localStorage.setItem('token', responseData.token);
                setIsLoggedIn(true); // Update the login status
            } else {
                if (response.status === 400) {
                    setErrMsg('Username or password incorrect');
                } else {
                    setErrMsg('Login Failed');
                }
                errRef.current.focus();
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                errRef.current.focus();
            }
        }
    };

    if (success) {
        return (
            <section>
            <h1>Login completed!</h1>
            <p>
                <Link to="/" style={{ color: "black" }}>Click here to go to the main screen</Link>
            </p>
            </section>
        );
    }

    // Check if the user is already logged in and redirect to the home screen
    if (localStorage.getItem('token')) {
        return <Navigate to="/" replace />;
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                /> <br></br>
                <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p><br></br>

                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters and a number.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                <button disabled={!validName || !validPwd ? true : false}>Login</button>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to="/register">Sign In</Link>
                    </span>
                </p>
            </form>
        </section>
    );
};



