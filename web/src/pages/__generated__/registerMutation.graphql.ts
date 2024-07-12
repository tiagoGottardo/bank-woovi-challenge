/**
 * @generated SignedSource<<d7782e56da6678d981102be46cff7dd2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AccountRegisterInput = {
  account_key: string;
  clientMutationId?: string | null | undefined;
  cpf: string;
  date_of_birth: string;
  email: string;
  name: string;
  password: string;
};
export type registerMutation$variables = {
  input: AccountRegisterInput;
};
export type registerMutation$data = {
  readonly accountRegisterMutation: {
    readonly token: string | null | undefined;
  } | null | undefined;
};
export type registerMutation = {
  response: registerMutation$data;
  variables: registerMutation$variables;
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
    "concreteType": "AccountRegisterPayload",
    "kind": "LinkedField",
    "name": "accountRegisterMutation",
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
    "name": "registerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "registerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f2cc9e124606d91ee20cbe30d22bc6f5",
    "id": null,
    "metadata": {},
    "name": "registerMutation",
    "operationKind": "mutation",
    "text": "mutation registerMutation(\n  $input: AccountRegisterInput!\n) {\n  accountRegisterMutation(input: $input) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "058097c2825d1fb3f7f5ba983b83ca8f";

export default node;
