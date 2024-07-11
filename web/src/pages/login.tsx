import React, { useState } from 'react'
import { commitMutation, graphql } from 'react-relay'
import environment, { setAuthToken } from '../relay/relayEnvironment'
import { useNavigate } from 'react-router-dom'

const mutation = graphql`
  mutation loginMutation($input: AccountLoginInput!) {
    accountLoginMutation(input: $input) {
      me {
        name
        date_of_birth
        cpf
      }
      success
      token
    }
  }
`;

const login = (input: { username: string; password: string }, onCompleted: (response: any) => void, onError: (error: Error) => void) => {
  commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  })
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    login(
      { username, password },
      (response) => {
        const token = response.login.token;
        setAuthToken(token);
        navigate('/');
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div>
      <h2 className="text-black">Login Pages</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login
