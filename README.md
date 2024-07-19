# bank-woovi-challenge
A replica of bank which is possible to transact money between users.

## Stack
This project uses the following technologies:

- [ReactJS](https://react.dev/)
- [Graphql](https://graphql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwindcss](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)

Other packages used:

- [Koa](https://koajs.com/)
- [Shadcn](https://ui.shadcn.com/)
- [React Relay](https://relay.dev/)
- [Formik](https://formik.org/)
- [graphql-http](https://www.npmjs.com/package/graphql-http)
- [Yup](https://www.npmjs.com/package/yup)
- [React Router](https://reactrouter.com/en/main)

## Features

* Deposit, withdraw and tranfer money 
* Idempotency key on transactions
* Fragmentation on relay queries
* Pagination on list of transactions
* Form validation with Formik and Yup
* Form Mask with IMask
* And much more...

## Access deployed demo

- https://web-winter-field-6045.fly.dev/login (Frontend)
- https://server-little-darkness-3240.fly.dev/playground (Backend)

## How to run project 

```bash

# Clone repo 

$ git clone https://github.com/tiagoGottardo/bank-woovi-challenge

# Enter on project folder 

$ cd bank-woovi-challenge

# Run docker compose 

$ docker compose up -d

```

#### Access project

- http://localhost:3000 (Frontend)
- http://localhost:3001/playground (Backend)
