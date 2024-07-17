/**
 * @generated SignedSource<<36329ade16d1a258c3469bcd4c03ec33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type WithdrawInput = {
  amount_in_cents: number;
  clientMutationId?: string | null | undefined;
  idempotencyKey: string;
};
export type TransactionsDisplaywithdrawMutation$variables = {
  input: WithdrawInput;
};
export type TransactionsDisplaywithdrawMutation$data = {
  readonly withdrawMutation: {
    readonly transactionEdge: {
      readonly node: {
        readonly amount_in_cents: number;
        readonly createdAt: string;
        readonly id: string;
        readonly receiver_account: {
          readonly id: string;
          readonly name: string;
        } | null | undefined;
        readonly sender_account: {
          readonly id: string;
          readonly name: string;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type TransactionsDisplaywithdrawMutation = {
  response: TransactionsDisplaywithdrawMutation$data;
  variables: TransactionsDisplaywithdrawMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "WithdrawPayload",
    "kind": "LinkedField",
    "name": "withdrawMutation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "transactionEdge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amount_in_cents",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "sender_account",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "receiver_account",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TransactionsDisplaywithdrawMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TransactionsDisplaywithdrawMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "8a23e862ddba0048e208b61bd7daf9c4",
    "id": null,
    "metadata": {},
    "name": "TransactionsDisplaywithdrawMutation",
    "operationKind": "mutation",
    "text": "mutation TransactionsDisplaywithdrawMutation(\n  $input: WithdrawInput!\n) {\n  withdrawMutation(input: $input) {\n    transactionEdge {\n      node {\n        id\n        amount_in_cents\n        sender_account {\n          id\n          name\n        }\n        receiver_account {\n          id\n          name\n        }\n        createdAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "11e67b86cebb9ae460d705e03c32edad";

export default node;
