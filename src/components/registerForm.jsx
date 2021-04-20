import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { register } from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {}
    }

    schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }

    doSubmit = async () => {
        try {
            const response = await register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token'])
            // localStorage.setItem('token', response.headers['x-auth-token']);
            // this.props.history.push('/');
            window.location('/')
        } catch (error) {
            if(error.response && error.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = error.response.data;
                this.setState({ errors })
            }
        }
    }

    render() {
        return (
            <div>
                <h1>RegisterLogin</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
