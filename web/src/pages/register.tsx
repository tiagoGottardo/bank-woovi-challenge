import React from 'react'
import { Formik } from 'formik'

import { registerSchema } from '../utils/yupSchemas'

import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from 'react-router-dom'

const Register: React.FC = () => {

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
          dateOfBirth: "",
          cpf: ""
        }}
        onSubmit={(values) => {

          alert(JSON.stringify(values));
        }}
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
                value={values.confirmPassword}
              />
              <Input
                id="dateOfBirth"
                type="text"
                label="Data de nascimento"
                mask="00/00/0000"
                touched={touched.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.dateOfBirth}
                value={values.dateOfBirth}
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
      </Formik >
    </div >
  )
}

export default Register
