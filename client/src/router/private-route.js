import React from 'react'
import { Redirect, Route } from 'react-router'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (
                localStorage.getItem("_Auth") ?
                    <Component {...props} />
                    :
                    <Redirect
                        to={{ pathname: "/" }}
                    />
            )}
        />
    )
}