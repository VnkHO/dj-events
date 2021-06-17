import {useState, useEffect, useContext} from 'react'
import AuthContext from '@/context/AuthContext'

import Link from 'next/link'

import {FaUser} from 'react-icons/fa'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from '@/components/Layout'

import styles from '@/styles/AuthForm.module.css'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const {register, error} = useContext(AuthContext)

  useEffect(() => error && toast?.error(error), [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match')
      return
    }

    register({username, email, password})
    console.log('user', username)
  }

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>

        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event?.target?.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event?.target?.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event?.target?.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event?.target?.value)}
            />
          </div>

          <button type="submit" className="btn" style={{width: '100%'}}>
            Register
          </button>
        </form>

        <p>
          Already have an account ?{' '}
          <Link href="/account/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}
