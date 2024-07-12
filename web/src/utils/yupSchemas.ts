import * as yup from 'yup'

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const registerSchema = yup.object().shape({
  name: yup.string()
    .required("Digite seu nome completo.")
    .min(5, "Digite seu nome completo.")
    .matches(/^[A-Za-z]+(?:[\s'-][A-Za-z]+){1,}$/, "Digite seu nome completo."),
  email: yup.string()
    .required("Digite um email.")
    .email("Digite um email válido."),
  password: yup.string()
    .required("Digite uma senha")
    .min(8, "Sua senha precisa ter, no mínimo, 8 caracteres.")
    .max(20, "Sua senha precisa ter, no máximo, 20 caracteres.")
    .matches(/[A-Z]/, "Sua senha precisa conter uma letra maiúscula.")
    .matches(/[a-z]/, "Sua senha precisa conter uma letra minúscula.")
    .matches(/[0-9]/, "Sua senha precisa conter um número.")
    .matches(/[@#$%^&*()_+!~`\-=<>?[\]{}|;:,./]/, "Sua senha precisa conter um caractere especial."),
  confirmPassword: yup.string().
    required("Confirme sua senha.")
    .oneOf([yup.ref('password')], 'Senhas devem ser iguais.'),
  date_of_birth: yup.date().typeError("Digite uma data válida.")
    .required('A data de nascimento é necessária.')
    .max(eighteenYearsAgo, 'Você deve ter 18 anos ou mais.'),
  cpf: yup.string()
    .required("Digite seu CPF.")
    .length(11, "CPF inválido")
    // .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido.") // Remove true CPF validation to facilitate avaliation
    .transform((value) => value.replace(/[.-]/g, ''))
})

const loginSchema = yup.object().shape({
  email: yup.string()
    .required("Digite um email.")
    .email("Digite um email válido."),
  password: yup.string()
    .required("Digite uma senha")
    .min(8, "Sua senha precisa ter, no mínimo, 8 caracteres.")
    .max(20, "Sua senha precisa ter, no máximo, 20 caracteres.")
    .matches(/[A-Z]/, "Sua senha precisa conter uma letra maiúscula.")
    .matches(/[a-z]/, "Sua senha precisa conter uma letra minúscula.")
    .matches(/[0-9]/, "Sua senha precisa conter um número.")
    .matches(/[@#$%^&*()_+!~`\-=<>?[\]{}|;:,./]/, "Sua senha precisa conter um caractere especial."),
})

const accountKeySchema = yup.string()
  .min(8, "Account key must be at least 8 characters long.")
  .max(50, "Account key must be no longer than 50 characters.")
  .matches(/^[A-Za-z0-9_]+$/, "Account key must contain only letters, numbers, and underscores.")

export {
  accountKeySchema,
  loginSchema,
  registerSchema
}
