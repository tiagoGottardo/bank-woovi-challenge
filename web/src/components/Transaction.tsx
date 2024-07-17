import { graphql } from "relay-runtime"
import { TransactionFragment$key } from "./__generated__/TransactionFragment.graphql"
import { useFragment } from "react-relay"
import { TableRow, TableCell } from "./ui/table"

const TransactionFragment = graphql`
fragment TransactionFragment on Transaction {
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
`

type Props = {
  me?: string
  transaction?: TransactionFragment$key | null
}

type Person = {
  name?: string,
  id?: string,
} | null

const Transaction: React.FC<Props> = (props) => {
  const { me } = props
  const transaction = useFragment<TransactionFragment$key>(
    TransactionFragment,
    props.transaction,
  )
  if (!transaction) { return }

  const { sender_account, receiver_account, createdAt, amount_in_cents } = transaction

  const getType = (sender?: string, receiver?: string): string => {
    if (!sender) { return "Depósito" }
    else if (!receiver) { return "Saque" }
    return 'Tranferência'
  }

  const getOrigin = (me?: string, sender?: Person, receiver?: Person) => {
    if (sender && receiver) {
      return me == sender.id ? receiver.name : sender.name
    }
  }

  const date = new Date(createdAt);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  const isGreen = sender_account?.id == me

  return (
    <TableRow>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{getType(sender_account?.id, receiver_account?.id)}</TableCell>
      <TableCell>{getOrigin(me, sender_account, receiver_account) || "Externo"}</TableCell>
      <TableCell className={isGreen ? "text-red-500" : "text-green-500"}>R${isGreen && "-"}{(amount_in_cents / 100).toFixed(2)}</TableCell>
    </TableRow >
  )
}

export default Transaction 
