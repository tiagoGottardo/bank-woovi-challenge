import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { graphql, commitMutation } from 'relay-runtime'
import { AuthContext } from '@/context/auth'
import { RelayEnvironment } from '@/relay/RelayEnvironment'
import { loginSchema } from '../utils/yupSchemas'

import { Formik } from 'formik'
import { Button } from '@/components/ui/button'
import Input from '@/components/Input'

const mutation = graphql`
  mutation loginMutation($input: AccountLoginInput!) {
    accountLoginMutation(input: $input) {
      token
    }
  }
`

const login = (input: Login, onCompleted: (response: any) => void, onError: (error: Error) => void) => {
  commitMutation(RelayEnvironment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  })
}

interface Login {
  email: string,
  password: string
}

const Login: React.FC = () => {
  const { logIn } = useContext(AuthContext)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (values: Login) => {
    login(
      values,
      (response) => {
        console.log(response.accountLoginMutation)
        logIn(response.accountLoginMutation?.token ?? '')
        navigate('/')
      },
      (_) => {
        setError("Email ou senha inválidos.")
      }
    )
  }

  return (
    <div className="h-screen w-full flex flex-col p-8 items-center  bg-woo-gray">
      <img src="/woopay-logo.png" className="h-16 m-8 mt-0" />
      <Formik
        validationSchema={loginSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="border rounded-md border-gray-300 w-5/12 flex flex-col pt-8 space-y-6 text-center bg-white">
            <p className="text-muted-foreground font-bold text-3xl">Login</p>
            {error && <div className="text-red-600 m-2 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <Input
                id="email"
                type="email"
                label="Email"
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                value={values.email}
              />
              <Input
                id="password"
                label="Senha"
                type="password"
                touched={touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                value={values.password}
              />
              <div className="text-center m-8 my-0">
                <Button type="submit" className="w-full bg-woo-green hover:bg-woo-green">
                  Entrar
                </Button>
              </div>
              <div className="text-sm my-8 h-12 items-center justify-center">
                É novo por aqui?
                <Link to='/register' className="ml-2 underline text-woo-green">Cadastre-se</Link>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Login
