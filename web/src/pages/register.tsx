import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Formik } from 'formik'

import { registerSchema } from '../utils/yupSchemas'

import { graphql, commitMutation } from 'relay-runtime'
import { AuthContext } from '@/context/auth'
import { RelayEnvironment } from '@/relay/RelayEnvironment'

import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const mutation = graphql`
  mutation registerMutation($input: AccountRegisterInput!) {
    accountRegisterMutation(input: $input) {
      token
    }
  }
`

const register = (input: Register, onCompleted: (response: any) => void, onError: (error: Error) => void) => {
  commitMutation(RelayEnvironment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  })
}

interface Register {
  name: string,
  password: string
  confirmPassword?: string
  email: string,
  cpf: string,
  account_key?: string,
  date_of_birth: string,
}

const Register: React.FC = () => {
  const { logIn } = useContext(AuthContext)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = ({ cpf, account_key, confirmPassword, ...rest }: Register) => {
    const cpfParsed = cpf.replace(/[.-]/g, '')
    console.log({ cpf: cpfParsed, account_key: cpfParsed, confirmPassword, ...rest })
    register(
      {
        account_key: cpfParsed, cpf: cpfParsed, ...rest
      },
      (response) => {
        console.log(response.accountRegisterMutation)
        logIn(response.accountRegisterMutation?.token ?? '')
        navigate('/')
      },
      (error) => {
        setError(error.message)
      }
    )
  }

  return (
    <div className="h-full w-full flex flex-col p-8 items-center justify-center bg-bgwoo">
      <h1 className="text-3xl font-bold m-8 mt-0">woopay</h1>
      <Formik
        validationSchema={registerSchema}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          date_of_birth: "",
          cpf: ""
        }}
        onSubmit={handleRegister}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="border rounded-md border-gray-300 w-5/12 flex flex-col h-full pt-8 space-y-6 text-center bg-white">
            <p className="text-muted-foreground font-bold text-3xl">Crie sua conta</p>
            {error && <div className="text-red-600 m-2 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <Input
                id="name"
                type="text"
                label="Nome"
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                value={values.name}
              />
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
              <Input
                id="confirmPassword"
                label="Confirmar senha"
                type="password"
                touched={touched.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                value={values.confirmPassword as string}
              />
              <Input
                id="date_of_birth"
                type="text"
                label="Data de nascimento"
                mask="00/00/0000"
                touched={touched.date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.date_of_birth}
                value={values.date_of_birth}
              />
              <Input
                id="cpf"
                mask="000.000.000-00"
                type="text"
                label="CPF"
                touched={touched.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.cpf}
                value={values.cpf}
              />
              <div className="text-start m-8 my-0">
                <div className="flex my-6 justify-center items-center space-x-2">
                  <Checkbox id="terms" required className="selection:bg-woovi checked:bg-woovi" />
                  <Label htmlFor="terms">
                    Eu aceito os
                    <Link to='#' className="mx-1 underline text-woovi">Termos de Uso </Link>
                    e as
                    <Link to='#' className="mx-1 underline text-woovi">políticas de privacidade.</Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-woovi hover:bg-woovi">
                  Cadastrar
                </Button>
              </div>
              <div className="text-sm my-8 h-12 items-center justify-center">
                Já tem uma conta?
                <Link to='/login' className="ml-2 underline text-woovi">Entrar</Link>
              </div>
            </form>
          </div>
        )
        }
      </Formik>
    </div >
  )
}

export default Register
