/**
 * @generated SignedSource<<f0884b111489bce086c667702e963fd4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TransactionRowQuery$variables = Record<PropertyKey, never>;
export type TransactionRowQuery$data = {
  readonly meQuery: {
    readonly name: string;
  } | null | undefined;
};
export type TransactionRowQuery = {
  response: TransactionRowQuery$data;
  variables: TransactionRowQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TransactionRowQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "meQuery",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TransactionRowQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "meQuery",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4cc2ae3fde873f1ca360c2967ff5acfb",
    "id": null,
    "metadata": {},
    "name": "TransactionRowQuery",
    "operationKind": "query",
    "text": "query TransactionRowQuery {\n  meQuery {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0a78ac03c0f7d490435f679854873f35";

export default node;
