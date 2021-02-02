import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './Auth';

export default function ProtectedRoute(props) {
  const [auth] = useAuth();
  return auth ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  )
}
