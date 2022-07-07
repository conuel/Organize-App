import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn, signUp } from '../../store/actions/authActions';
import './signin.css'
import Form from './Form.js'
import FormButton from './FormButton'
import { FaArrowRight } from 'react-icons/fa';



class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.props.signIn(this.state)
    };


    handleChange = event => {
        const {value, name} = event.target
        this.setState({[name]: value})
    }


    render() {
        return (
            <div className = 'sign-in'>
                <span> Sign In</span>

                <form onSubmit = {this.handleSubmit}>
                    <Form 
                        name = 'email'
                        type = 'email'
                        value = {this.state.email}
                        handleChange = {this.handleChange}
                        label = 'email'
                        required
                    />

                    <Form
                        name = 'password'
                        type = 'password'
                        value = {this.state.password}
                        handleChange = {this.handleChange}
                        label = 'password'
                        required
                    />

                    <div className = 'button-pair'>
                        <FormButton type = 'submit'>
                            Sign In 
                        </FormButton>
                    </div>

                    <div className = 'redirect'>
                        <p>Don't have an account?</p>
                        <span><FaArrowRight/></span>
                    </div>
                </form>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)


























/*
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    this.props.signIn(this.state)
    }

    render() {
        const {authError, auth} = this.props
        //if (auth.uid)  return <Redirect to = '/' />

        return (
            <div className = 'container'>
                <form onSubmit = {this.handleSubmit}className="white">
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
                            <button className="btn pink lighten-1 z-depth-0">
                                Login
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
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

*/