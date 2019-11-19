import React from 'react';
import {Route, Redirect} from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('token') && localStorage.getItem('token') !==  "null"
            ? <Component {...props} />
            : <Redirect to='/signUp' />
    )} />
);