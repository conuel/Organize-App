import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn, signUp } from '../../store/actions/authActions';
import './signup.css'
import Form from './Form.js'
import FormButton from './FormButton'


class SignUp extends Component {
    state = {
        displayName: 'chinedu',
        email: 'chinedu@gmail.com',
        password: '12345678',
        confirmPassword: '12345678'
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }

    render() {
        const {auth, authError} = this.props
        if (auth.uid)  return <Redirect to = '/' />

        const {displayName, email, password, confirmPassword} = this.state

        console.log(authError)
        return (
            <div className = 'sign-up'>
                <p>Sign Up</p>

                <form onSubmit = {this.handleSubmit} className = 'sign-up-form'>
                    <Form
                    type = 'text'
                    name = 'displayName'
                    value = {displayName}
                    onChange = {this.handleChange}
                    label = 'Display Name'
                    required
                    />

                    <Form 
                    type = 'email'
                    name = 'email'
                    value = {email}
                    onChange = {this.handleChange}
                    label = 'Email'
                    required
                    />

                    <Form 
                    type = 'password'
                    name = 'password'
                    value = {password}
                    onChange = {this.handleChange}
                    label = 'Password'
                    required
                    />

                    <Form 
                    type = 'password'
                    name = 'confirmPassword'
                    value = {confirmPassword}
                    onChange = {this.handleChange}
                    label = ' Confirm Password'
                    required
                    />

                    <div className  = 'button-single'>
                        <FormButton type = 'submit'>
                            Sign Up
                        </FormButton>

                    </div>

                </form>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)























/*
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn, signUp } from '../../store/actions/authActions';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }

    render() {
        const {auth, authError} = this.props
        if (auth.uid)  return <Redirect to = '/' />

        return (
            <div className = 'container'>
                <form onSubmit = {this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3"></h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                                <input type="email" id = 'email' onChange = {this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                                <input type="password" id = 'password' onChange = {this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="firstName">First Name</label>
                                <input type="text" id = 'firstName' onChange = {this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Last Name</label>
                                <input type="text" id = 'lastName' onChange = {this.handleChange} />
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">
                                SignUp
                            </button>
                            <div className="red-text center">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                        </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)


*/