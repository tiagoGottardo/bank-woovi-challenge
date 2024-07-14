import { graphql } from "relay-runtime"
import { usePaginationFragment } from "react-relay"
import { TransactionsListQuery$key } from "./__generated__/TransactionsListQuery.graphql"
import { Table, TableHead, TableBody, TableRow, TableHeader } from "./ui/table"
import { TransactionsListPaginationQuery } from "./__generated__/TransactionsListPaginationQuery.graphql"
import Transaction from "./Transaction"
import { Button } from "./ui/button"

const TransactionQuery = graphql`
fragment TransactionsListQuery on Query
      @argumentDefinitions(first: { type: Int, defaultValue: 5 }, after: { type: String })
      @refetchable(queryName: "TransactionsListPaginationQuery") {
        getTransactionsQuery(first: $first, after: $after) @connection(key: "TransactionsList_getTransactionsQuery", filters: []) {
          endCursorOffset
          startCursorOffset
          count
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              ...TransactionFragment
            }
          }
        }
        meQuery {
          id
        }
      }
`

type Props = {
  query?: TransactionsListQuery$key
}

const TransactionList: React.FC<Props> = (props) => {
  const { data, hasNext, loadNext } = usePaginationFragment
    <TransactionsListPaginationQuery, TransactionsListQuery$key>(
      TransactionQuery,
      props.query,
    );

  const handleLoadMore = () => {
    loadNext(5)
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Origem</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data?.getTransactionsQuery?.edges.map((transaction) => (
              <Transaction me={data?.meQuery?.id} key={transaction?.node?.id}
                transaction={transaction?.node} />
            ))
          }
        </TableBody>
      </Table>
      {data?.getTransactionsQuery.edges.length === 0 && (
        <div className="flex justify-center my-16">
          <p className="text-gray-500 text-lg">Nenhuma transação</p>
        </div>
      )}
      {
        hasNext && (
          <div className="flex justify-end w-full p-6 m-4">
            <Button className="bg-woo-green hover:bg-woo-green font-bold" onClick={handleLoadMore}>Mais</Button>
          </div>
        )
      }
    </>
  )

}

export default TransactionList
