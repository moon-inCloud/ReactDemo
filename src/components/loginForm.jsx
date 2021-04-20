import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    }

    doSubmit = async () => {
        try {
            const { data } = this.state;
            await auth.login(data.username, data.password);
            // localStorage.setItem('token', jwt);
            // this.props.history.push('/')
            const { state } = this.props.location;
            window.location =  state ? state.from.location : '/' ;     //强制刷新页面让登录后的登录和注册变为登录的账户名称和注销
        } catch (ex) {
            if(ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors })
            } 
        }
    }

    render() {
        if(auth.getCurrentUser()) return <Redirect to='/' />

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', 'text')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default LoginForm;