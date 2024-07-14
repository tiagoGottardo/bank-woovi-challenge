/**
 * @generated SignedSource<<bae0ed8f1825b17e18ad0f2f15e9dccf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TransactionRowFragment$data = {
  readonly balance_in_cents: string;
  readonly cpf: string;
  readonly name: string;
  readonly password: string;
  readonly " $fragmentType": "TransactionRowFragment";
};
export type TransactionRowFragment$key = {
  readonly " $data"?: TransactionRowFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TransactionRowFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TransactionRowFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cpf",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "password",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "balance_in_cents",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "0a83019fb610a637dc0d639184f3c191";

export default node;
