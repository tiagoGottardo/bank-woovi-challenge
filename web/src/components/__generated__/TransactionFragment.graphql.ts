/**
 * @generated SignedSource<<12dfe7acd732c79102236d9229e5356f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TransactionFragment$data = {
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
  readonly " $fragmentType": "TransactionFragment";
};
export type TransactionFragment$key = {
  readonly " $data"?: TransactionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TransactionFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TransactionFragment",
  "selections": [
    (v0/*: any*/),
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
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "receiver_account",
      "plural": false,
      "selections": (v1/*: any*/),
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
  "type": "Transaction",
  "abstractKey": null
};
})();

(node as any).hash = "c87da1d56a173e727fa4103dc772db1c";

export default node;
