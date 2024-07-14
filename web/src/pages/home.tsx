import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Header from '@/components/Header'
import { Button } from "@/components/ui/button"
import TransactionList from '@/components/TransactionsList'
import { graphql } from 'relay-runtime'
import { useLazyLoadQuery } from 'react-relay'
import { homeQuery } from './__generated__/homeQuery.graphql'

const HomeQuery = graphql`
  query homeQuery {
    ...TransactionsListQuery
    meQuery {
      id
      name
      balance_in_cents
      account_key
    } 
  } 
`

const Home: React.FC = () => {
  const query = useLazyLoadQuery<homeQuery>(HomeQuery, {})
  if (!query?.meQuery) { return }
  const { name, balance_in_cents, account_key } = query?.meQuery

  const getTwoFirstLetters = (text: string): string => {
    const words = text.split(' ');
    if (words.length < 2) { return text; }
    return words[0].slice(0, 1) + words[1].slice(0, 1);
  }

  const handleDeposit = () => { }
  const handleWithdraw = () => { }
  const handleTransfer = () => { }
  return (
    <div className="flex flex-col h-full items-center bg-woo-gray justify-start bg-background">
      <Header />
      <Card className="w-full m-2 max-w-6xl">
        <CardContent className="m-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Saldo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">R${(Number(balance_in_cents) / 100).toFixed(2)}</div>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-4">
              <Button className="bg-woo-blue font-bold hover:bg-woo-blue" onClick={handleDeposit}>Depositar</Button>
              <Button className="bg-woo-blue font-bold hover:bg-woo-blue" onClick={handleWithdraw}>Sacar</Button>
              <Button className="bg-woo-blue font-bold hover:bg-woo-blue" onClick={handleTransfer}>Transferir</Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{getTwoFirstLetters(name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-muted-foreground text-sm">@{account_key}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <h1 className="text-3xl m-4 font-bold">Transações</h1>
            <TransactionList query={query} />
          </div>
        </CardContent >
      </Card >
    </div >
  )
}

export default Home
