/**
 * @generated SignedSource<<e046e4cb83d14b8d30c30d51bdf3fe75>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AccountLoginInput = {
  clientMutationId?: string | null | undefined;
  email: string;
  password: string;
};
export type loginMutation$variables = {
  input: AccountLoginInput;
};
export type loginMutation$data = {
  readonly accountLoginMutation: {
    readonly token: string | null | undefined;
  } | null | undefined;
};
export type loginMutation = {
  response: loginMutation$data;
  variables: loginMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AccountLoginPayload",
    "kind": "LinkedField",
    "name": "accountLoginMutation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
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
    "name": "loginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "loginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d3e984f752705c14c1847630877025b7",
    "id": null,
    "metadata": {},
    "name": "loginMutation",
    "operationKind": "mutation",
    "text": "mutation loginMutation(\n  $input: AccountLoginInput!\n) {\n  accountLoginMutation(input: $input) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "26d26b165233f0cbd7a55e1bb2f4a0c0";

export default node;
