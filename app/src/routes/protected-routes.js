import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ auth, children, ...restProps }) {
    return (
        <Route
            {...restProps}
            render={() => {
                if (auth) {
                    return children;
                }
                
                if (!auth) {
                    return (
                        <Redirect
                            to={'/explore'}
                        />
                    );
                }
                
                return null;
            }}
        />
    )
}