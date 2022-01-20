import React, {useState} from 'react';
import classes from "./LoginForm.module.css";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {login} from "../../api/auth";
import {Link} from "react-router-dom";


const LoginForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const changeLoginInput = (login) => {
        dispatch({type: "LOGIN_CHANGE", payload: login});
    }

    const changePasswordInput = (password) => {
        dispatch({type: "PASSWORD_CHANGE", payload: password});
    }

    const changeJwtToken = (token) => {
        localStorage.setItem("authToken", token);
    }

    let loginState = useSelector(state => state.auth.login);
    let passwordState = useSelector(state => state.auth.password);

    let [error, setError] = useState("");

    function loginUser(e) {
        e.preventDefault();

        function onOK(response) {
            if (response.status === 200) {
                response.json().then((data) => {
                    changeJwtToken(data.token);
                    history.push("/main");
                });
            }
            else {
                response.text().then(text => setError(text));
            }
        }

        function onErr(error) {
            console.log(error);
        }

        const user = {
            username: loginState,
            password: passwordState
        }
        login(user, onOK, onErr);
        // history.push("/");
    }

    return (
        <div className={classes.login_form}>
            <div className={classes.auth_text}>
                <span>Authorize</span>
            </div>
            <div className={classes.input_block}>

                <div>
                    <div>
                        <InputText id="loginInput"
                                   className={classes.text_input}
                                   placeholder="Username"
                                   maxLength={12}
                                   value={loginState}
                                   onChange={(event) => {
                                       changeLoginInput(event.target.value);
                                   }}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <InputText
                            id="passwordInput"
                            className={classes.text_input}
                            placeholder="Password"
                            maxLength={30}
                            type="password"
                            value={passwordState}
                            onChange={(event) => changePasswordInput(event.target.value)}
                        />
                    </div>
                </div>

            </div>

            {error !== "" &&
            <div className={classes.error_div}>
                {error}
            </div>
            }

            <div className={classes.button_container}>
                <Button 
                    type="submit"
                    onClick={e => loginUser(e)}
                >
                    Login
                </Button>
            </div>

            <div className={classes.other_login_options}>
                <Link to="/register">
                    Not registered yet?
                </Link>
            </div>

        </div>
    );
};

export default LoginForm;