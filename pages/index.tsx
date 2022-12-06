import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import AuthLayoutComponent from '../components/layouts/auth-layout'
import ForgotPasswordLayoutComponent from '../components/modules/forgot-password-module/forgot-password-layout'
import LoginComponentLayout from '../components/modules/login-module/login-layout'
import styles from '../styles/Home.module.css';
import React from 'react';
import ThemeProvider from '../components/context/themeContext'

const Home: NextPage = () => {

  return (
    <>
      <LoginComponentLayout/>
    </>
  )
}

export default Home
