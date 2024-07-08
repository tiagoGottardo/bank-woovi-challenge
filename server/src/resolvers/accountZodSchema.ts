import { z } from 'zod'

const today = new Date();
const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));

function validateCpf(cpf: string): boolean {
  const cpfDigits = cpf.split('').map(Number);

  if (cpfDigits.length !== 11 || cpfDigits.some(isNaN)) {
    return false;
  }

  const calculateCheckDigit = (digits: number[], factor: number): number => {
    let sum = digits.reduce((acc, digit, index) => acc + digit * (factor - index), 0);
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstCheckDigit = calculateCheckDigit(cpfDigits.slice(0, 9), 10);
  const secondCheckDigit = calculateCheckDigit(cpfDigits.slice(0, 10), 11);

  return cpfDigits[9] === firstCheckDigit && cpfDigits[10] === secondCheckDigit;
}

const AccountSchema = z.object({
  name: z.string().min(5).regex(/^[A-Za-z]+(?:[\s'-][A-Za-z]+){1,}$/, {
    message: "Name must contain at least two words",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password must be no longer than 20 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@#$%^&*()_+!~`\-=<>?[\]{}|;:,./]/, { message: "Password must contain at least one special character." }),
  account_key: z.string().min(8).max(50).regex(/^[A-Za-z0-9_]+$/, {
    message: "Account key must contain only letters, numbers, and underscores.",
  }),
  date_of_birth: z.date().max(eighteenYearsAgo, {
    message: "You must be at least 18 years old.",
  }),
  cpf: z.string().length(11).regex(/^\d+$/, {
    message: "CPF must contain only digits.",
  }).refine(validateCpf, {
    message: "Invalid CPF number.",
  })
})

export default AccountSchema
