import React from 'react'
import Input from '@/components/Input'
import { Formik } from 'formik'
import { registerSchema } from '../utils/yupSchemas'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


// const mutation = graphql`
//   mutation loginMutation($input: AccountLoginInput!) {
//     accountLoginMutation(input: $input) {
//       token
//     }
//   }
// `

// const login = (input: { email: string, password: string }, onCompleted: (response: any) => void, onError: (error: Error) => void) => {
//   commitMutation(RelayEnvironment, {
//     mutation,
//     variables: { input,
//     },
//     onCompleted,
//     onError,
//   })
// }

const Login: React.FC = () => {
  // const [email, setemail] = useState('')
  // const [password, setPassword] = useState('')
  // const [error, setError] = useState('')
  // const { logIn } = useContext(AuthContext)
  // const navigate = useNavigate()

  // const handleLogin = () => {
  //   login(
  //     { email, password },
  //     (response) => {
  //       logIn(response.accountLoginMutation?.token ?? '')
  //       navigate('/')
  //     },
  //     (error) => {
  //       setError(error.message)
  //     }
  //   )
  // }

  return (
    <div className="h-screen w-full flex flex-col p-8 items-center  bg-bgwoo">
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
          <div className="border rounded-md border-gray-300 w-5/12 flex flex-col pt-8 space-y-6 text-center bg-white">
            <p className="text-muted-foreground font-bold text-3xl">Login</p>
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
              <div className="text-start m-8 my-0">
                <Button type="submit" className="w-full bg-woovi hover:bg-woovi">
                  Entrar
                </Button>
              </div>
              <div className="text-sm my-8 h-12 items-center justify-center">
                É novo por aqui?
                <Link to='/register' className="ml-2 underline text-woovi">Cadastre-se</Link>
              </div>
            </form>
          </div>
        )
        }
      </Formik>
    </div>
  )
}

export default Login
