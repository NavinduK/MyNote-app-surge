import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('loading');

  const dispatch = useDispatch();
  const { validate } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    console.log(children.type.name);
    setTimeout(function () {
      if ('token' in localStorage)
        validate(JSON.parse(localStorage.getItem('token'))).then((res) => {
          if (children.type.name === "AdminDashboard" && res.data.accountType !== 'admin')
            setCurrentUser('login')
          else
            setCurrentUser(res.data)
          console.log(res.data);
        }).catch((err) => {
          setCurrentUser('login')
          console.log(err);
        })
      else {
        setCurrentUser('login')
      }
    }, 1000);
  }, []);

  return (
    currentUser === 'loading' ? <Spinner />
      : currentUser === 'login' ? <Navigate to="/login" />
        : children
  )
};

export default ProtectedRoute