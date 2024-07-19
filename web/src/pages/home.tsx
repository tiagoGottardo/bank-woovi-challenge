import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Header from '@/components/Header'
import TransactionList from '@/components/TransactionsList'
import { graphql } from 'relay-runtime'
import { useLazyLoadQuery } from 'react-relay'
import { homeQuery } from './__generated__/homeQuery.graphql'
import TransactionsDisplay from '@/components/TransactionsDisplay'

export const HomeQuery = graphql`
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

  return (
    <div className="flex flex-col min-h-screen h-full  items-center bg-woo-gray justify-start bg-background">
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
            <TransactionsDisplay />
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
                    <div className="font-medium">{name}</div> <div className="text-muted-foreground text-sm">@{account_key}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <h1 className="text-3xl m-4 font-bold">Transações</h1>
            <TransactionList query={query} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
