import React from 'react'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (
                localStorage.getItem("_Auth") ?
                    <Redirect
                        to={{ pathname: "/home" }}
                    /> :
                    <Component {...props} />
            )}
        />
    )
}