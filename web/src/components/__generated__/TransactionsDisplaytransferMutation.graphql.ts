/**
 * @generated SignedSource<<9560cc4d72650c4e6cc921e80b40c18e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TransferInput = {
  amount_in_cents: number;
  clientMutationId?: string | null | undefined;
  idempotencyKey: string;
  receiver_account_key: string;
};
export type TransactionsDisplaytransferMutation$variables = {
  input: TransferInput;
};
export type TransactionsDisplaytransferMutation$data = {
  readonly transferMutation: {
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
export type TransactionsDisplaytransferMutation = {
  response: TransactionsDisplaytransferMutation$data;
  variables: TransactionsDisplaytransferMutation$variables;
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
    "concreteType": "TransferPayload",
    "kind": "LinkedField",
    "name": "transferMutation",
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
    "name": "TransactionsDisplaytransferMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TransactionsDisplaytransferMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "5f504910090677dab2b2d06936f9c707",
    "id": null,
    "metadata": {},
    "name": "TransactionsDisplaytransferMutation",
    "operationKind": "mutation",
    "text": "mutation TransactionsDisplaytransferMutation(\n  $input: TransferInput!\n) {\n  transferMutation(input: $input) {\n    transactionEdge {\n      node {\n        id\n        amount_in_cents\n        sender_account {\n          id\n          name\n        }\n        receiver_account {\n          id\n          name\n        }\n        createdAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "63eabb860bede363453c860cf955f231";

export default node;
