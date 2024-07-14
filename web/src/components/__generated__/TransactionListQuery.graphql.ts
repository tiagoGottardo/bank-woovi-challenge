/**
 * @generated SignedSource<<9427048308634a777fd3da4dbc1df91d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TransactionListQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
};
export type TransactionListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"TransactionList_transaction">;
};
export type TransactionListQuery = {
  response: TransactionListQuery$data;
  variables: TransactionListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TransactionListQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "TransactionList_transaction"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TransactionListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TransactionConnection",
        "kind": "LinkedField",
        "name": "getTransactionsQuery",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TransactionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Transaction",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
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
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "TransactionList_getTransactionsQuery",
        "kind": "LinkedHandle",
        "name": "getTransactionsQuery"
      }
    ]
  },
  "params": {
    "cacheID": "a2584e713bc4b0243c4e80c4adbadd9b",
    "id": null,
    "metadata": {},
    "name": "TransactionListQuery",
    "operationKind": "query",
    "text": "query TransactionListQuery(\n  $count: Int\n  $cursor: String\n) {\n  ...TransactionList_transaction\n}\n\nfragment TransactionList_transaction on Query {\n  getTransactionsQuery(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        amount_in_cents\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b4cf51ec092242f742341b35238ce02f";

export default node;
