import React from 'react'
import { logout, isLogged } from '../services/loginService'
import { Redirect, withRouter } from 'react-router-dom'

const handleLogout = props => {
    logout()
    return props.history.push('/user/login')
}

const User = props => {
    console.log(props)
    if (!isLogged()) return <Redirect to='/' />
    return (
        <button className='btn' onClick={() => handleLogout(props)}>
            Logout
        </button>
    )
}

export default withRouter(User)
