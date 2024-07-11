import React, { useState, useContext } from 'react'
import { commitMutation, graphql } from 'react-relay'
import { RelayEnvironment } from '../relay/RelayEnvironment'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const mutation = graphql`
  mutation loginMutation($input: AccountLoginInput!) {
    accountLoginMutation(input: $input) {
      token
    }
  }
`

const login = (input: { email: string, password: string }, onCompleted: (response: any) => void, onError: (error: Error) => void) => {
  commitMutation(RelayEnvironment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  })
}

const Login: React.FC = () => {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { logIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    login(
      { email, password },
      (response) => {
        logIn(response.accountLoginMutation?.token ?? '')
        navigate('/')
      },
      (error) => {
        setError(error.message)
      }
    )
  }

  return (
    <div>
      <h2 className="text-black">Login Pages</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <h1 className="text-red-400 text-2xl">{error}</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
