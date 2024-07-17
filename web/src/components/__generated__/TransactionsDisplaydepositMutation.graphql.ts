/**
 * @generated SignedSource<<5459a3b1f079ccb719b66b3820bac7f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DepositInput = {
  amount_in_cents: number;
  clientMutationId?: string | null | undefined;
  idempotencyKey: string;
};
export type TransactionsDisplaydepositMutation$variables = {
  input: DepositInput;
};
export type TransactionsDisplaydepositMutation$data = {
  readonly depositMutation: {
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
export type TransactionsDisplaydepositMutation = {
  response: TransactionsDisplaydepositMutation$data;
  variables: TransactionsDisplaydepositMutation$variables;
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
    "concreteType": "DepositPayload",
    "kind": "LinkedField",
    "name": "depositMutation",
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
    "name": "TransactionsDisplaydepositMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TransactionsDisplaydepositMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "8b8655457056b50a0ac989e7983f7806",
    "id": null,
    "metadata": {},
    "name": "TransactionsDisplaydepositMutation",
    "operationKind": "mutation",
    "text": "mutation TransactionsDisplaydepositMutation(\n  $input: DepositInput!\n) {\n  depositMutation(input: $input) {\n    transactionEdge {\n      node {\n        id\n        amount_in_cents\n        sender_account {\n          id\n          name\n        }\n        receiver_account {\n          id\n          name\n        }\n        createdAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa52ea72e94a3835e60e4b8be95df224";

export default node;
