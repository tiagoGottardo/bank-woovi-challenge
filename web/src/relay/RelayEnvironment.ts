import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";

let authToken: string | null = null;

const HTTP_ENDPOINT = "http://localhost:3000/graphql";

const fetchFn: FetchFunction = async (request, variables) => {
  return fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
      // <-- Additional headers like 'Authorization' would go here
    },
    body: JSON.stringify({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    }),
  }).then(response => {
    return response.json()
  }).then(json => {
    if (json && json.errors) {
      throw new Error(json.errors[0].message)
    }
    return json;
  });

}

export const setAuthToken = (token: string) => {
  authToken = token;
}

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();
