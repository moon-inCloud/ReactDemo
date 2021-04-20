import React, { Component } from 'react';
import Input from './input';
import Select from './select'
import Joi from 'joi-browser';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validateProperty = ({ name, value }) => {
        // if (name === 'username') {
        //     if (value.trim() === '') {
        //         return 'Username is required'
        //     }
        // }

        // if (name === 'password') {
        //     if (value.trim() === '') {
        //         return 'Password is required'
        //     }
        // }

        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;

    }

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors

        // const errors = {};

        // if (this.state.data.username.trim() === '') {
        //     errors.username = 'Username is required'
        // }
        // if (this.state.data.password.trim() === '') {
        //     errors.username = 'Password is required'
        // }

        // return Object.keys(errors).length === 0 ? null : errors
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit()
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) {
            errors[input.name] = errorMessage
        } else {
            delete errors[input.name]
        }

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors })
    }

    renderButton(label) {
        return (
            <button className="btn btn-primary" disabled={this.validate()}>{label}</button>
        )
    }
    
    renderSelect(name, label, options) {
        const { data, errors } = this.state;

        return (
            <Select name={name} value={data[name]}  label={label} options={options} onChange={this.handleChange} error={errors[name]}/>
        )
    }

    renderInput(name, label,type) {
        const { data, errors } = this.state;
        return (
            <Input name={name} type={type} value={data[name]} label={label} error={errors[name]} onChange={this.handleChange} />
        )

    }
}

export default Form;
