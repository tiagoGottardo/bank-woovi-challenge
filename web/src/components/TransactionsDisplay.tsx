import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"

import { RelayEnvironment } from '@/relay/RelayEnvironment'
import { graphql, commitMutation, fetchQuery, GraphQLTaggedNode } from 'relay-runtime'
import { Button } from "./ui/button"
import Input from "./Input"
import { Formik } from "formik"
import { valueSchema, transferSchema } from "@/utils/yupSchemas"
import { HomeQuery } from '@/pages/home'

const depositMutation = graphql`
  mutation TransactionsDisplaydepositMutation($input: DepositInput!) {
    depositMutation(input: $input) {
      transactionEdge {
        node {
          id
          amount_in_cents 
          sender_account {
            id
            name
          }
          receiver_account {
            id
            name
          }
          createdAt
        }
      }
    }
  }
`

const withdrawMutation = graphql`
  mutation TransactionsDisplaywithdrawMutation($input: WithdrawInput!) {
    withdrawMutation(input: $input) {
      transactionEdge {
        node { id
          amount_in_cents 
          sender_account {
            id
            name
          }
          receiver_account {
            id
            name
          } createdAt
        }
      }
    }
  }
`

const transferMutation = graphql`
  mutation TransactionsDisplaytransferMutation($input: TransferInput!) {
    transferMutation(input: $input) {
    transactionEdge {
        node {
          id
          amount_in_cents 
          sender_account {
            id
            name
          }
          receiver_account {
            id
            name
          }
          createdAt
        }
      }
    }
  }
`

interface Payload {
  value: number,
  account_key?: string
};

const TransactionsDisplay = () => {
  const [idempotencyKey, setIdempotencyKey] = useState('')
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);

  const createSubmitHandler = (
    mutation: GraphQLTaggedNode,
    setOpenMutation: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    return (payload: Payload, { setErrors }: any) => {
      const input = {
        idempotencyKey,
        receiver_account_key: payload?.account_key,
        amount_in_cents: payload.value * 100,
      }

      commitMutation(RelayEnvironment, {
        mutation,
        variables: {
          input,
        },
        onError: (error) => {
          console.log(error.message)
          switch (error.message) {
            case "Amount must be greater than 0.":
              setErrors({ value: "O valor precisa ser maior que 0." })
              break;
            case "Receiver account not found.":
              if (payload.account_key) {
                setErrors({ account_key: "Conta não encontrada." })
              }
              break;
            case "Transaction amount is greater than your balance.":
              setErrors({ value: "O valor da transação é maior que seu saldo." })
              break;
          }
        },
        onCompleted: () => {
          fetchQuery(RelayEnvironment, HomeQuery, {}).subscribe({})
          setOpenMutation(false)
        }
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Dialog open={openDeposit} onOpenChange={setOpenDeposit}>
        <DialogTrigger asChild>
          <Button onClick={() => setIdempotencyKey(`${uuidv4}`)} className="bg-woo-blue font-bold hover:bg-woo-blue">
            Depositar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Depósito</DialogTitle>
            <DialogDescription>
              Digite o valor do seu depósito.
            </DialogDescription>
          </DialogHeader>
          <Formik
            validationSchema={valueSchema}
            initialValues={{
              value: 0,
            }}
            onSubmit={createSubmitHandler(depositMutation, setOpenDeposit)}
          >
            {({
              errors,
              values,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="p-4 flex flex-col">
                <Input
                  id="value"
                  type="text"
                  prefix="R$"
                  mask="currency"
                  touched={touched.value}
                  onChange={handleChange}
                  error={errors.value}
                  value={values.value}
                />
                <Button type="submit" className="self-end bg-woo-blue hover:bg-woo-blue w-1/3 mt-8 mr-1">Confirmar</Button>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Dialog open={openWithdraw} onOpenChange={setOpenWithdraw}>
        <DialogTrigger asChild>
          <Button onClick={() => setIdempotencyKey(`${uuidv4}`)} className="bg-woo-blue font-bold hover:bg-woo-blue">
            Sacar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Saque</DialogTitle>
            <DialogDescription>
              Digite o valor do seu saque.
            </DialogDescription>
          </DialogHeader>
          <Formik
            validationSchema={valueSchema}
            initialValues={{
              value: 0,
            }}
            onSubmit={createSubmitHandler(withdrawMutation, setOpenWithdraw)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="p-4 flex flex-col">
                <Input
                  id="value"
                  type="text"
                  prefix="R$"
                  mask="currency"
                  touched={touched.value}
                  onChange={handleChange}
                  error={errors.value}
                  value={values.value}
                />

                <Button type="submit" className="self-end bg-woo-blue hover:bg-woo-blue w-1/3 mt-8 mr-1">Confirmar</Button>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Dialog open={openTransfer} onOpenChange={setOpenTransfer}>
        <DialogTrigger asChild>
          <Button onClick={() => setIdempotencyKey(`${uuidv4}`)} className="bg-woo-blue font-bold hover:bg-woo-blue">
            Transferir
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transferência</DialogTitle>
            <DialogDescription>
              Digite o valor de sua transferência e a chave do recebedor.
            </DialogDescription>
          </DialogHeader>
          <Formik
            validationSchema={transferSchema}
            initialValues={{
              value: 0,
              account_key: ""
            }}
            onSubmit={createSubmitHandler(transferMutation, setOpenTransfer)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
                <Input
                  id="value"
                  type="text"
                  prefix="R$"
                  mask="currency"
                  touched={touched.value}
                  onChange={handleChange}
                  error={errors.value}
                  value={values.value}
                />
                <Input
                  id="account_key"
                  type="text"
                  prefix="@"
                  touched={touched.account_key}
                  onChange={handleChange}
                  error={errors.account_key}
                  value={values.account_key}
                />
                <Button type="submit" className="self-end bg-woo-blue hover:bg-woo-blue w-1/3 mt-8 mr-1">Confirmar</Button>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div >
  )
}

export default TransactionsDisplay
