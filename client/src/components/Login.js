import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { useThemeWithoutDefault } from "@mui/system";
import PropTypes from 'prop-types'
import { ThemeProvider, InputLabel, TextField,FormGroup } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alter">
                This field is required!
            </div>)
    };
};

const Login = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
    }
    return (
        <ThemeProvider theme = {props.theme}>

        <div className="col-md-12 container mt-2" >
            <div className=" ">
                <img src="//ssl.gstatic.com/accounts/ui/avatar-2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form
                    onSubmit={handleLogin}
                    // ref={c => {
                    //     this.form = c;
                    // }}
                >
                    <FormGroup color="primary">
                        <InputLabel htmlFor="username"  >Username</InputLabel>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </FormGroup>
                    <div className="form-group">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            type="text"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disable={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        // ref={c => {
                        //     this.checkBtn = c;
                        // }}
                    />
                </Form>
            </div>
        </div>
        </ThemeProvider>
    );
}

Login.propTypes = {}

export default Login


