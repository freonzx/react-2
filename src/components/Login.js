import React, { Component } from 'react'
import { register, login, isLogged } from '../services/loginService'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
        username: '',
        password: '',
        error: null,
        logged: false
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleAlert = () => {
        alert(this.state.error)
        this.setState({ error: null })
    }

    handleRegister = e => {
        e.preventDefault()
        const { username, password } = this.state
        try {
            register({ username, password })
            login({ username, password })
            this.setState({ logged: isLogged() })
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleLogin = e => {
        e.preventDefault()
        const { username, password } = this.state
        try {
            login({ username, password })
            this.setState({ logged: isLogged() })
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    render = () => {
        if (this.state.logged) return <Redirect to='/' />
        return (
            <form className='form-signin'>
                <div className='text-center mb-4'>
                    <h1 className='h3 mb-3 font-weight-normal'>
                        Login / Register
                    </h1>
                </div>

                <div className='form-label-group'>
                    <label htmlFor='inputEmail'>Username</label>
                    <input
                        name='username'
                        onChange={this.handleChange}
                        value={this.state.username}
                        className='form-control'
                        placeholder='Username'
                        required
                    />
                </div>

                <div className='form-label-group mt-2'>
                    <label htmlFor='inputPassword'>Password</label>
                    <input
                        name='password'
                        onChange={this.handleChange}
                        value={this.state.password}
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        required
                    />
                </div>

                <div>
                    <p className='text-danger'>
                        {this.state.error ? this.handleAlert() : null}
                    </p>
                </div>

                <div className='mt-5'>
                    <button
                        className='login btn btn-lg btn-primary btn-block'
                        type='submit'
                        onClick={this.handleLogin}
                    >
                        Login
                    </button>
                    <button
                        onClick={this.handleRegister}
                        className='register btn btn-lg btn-secondary btn-block'
                        type='submit'
                    >
                        Register
                    </button>
                </div>
            </form>
        )
    }
}

export default Login
