import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime"

const HTTP_ENDPOINT = "http://localhost:3000/graphql"

const fetchFn: FetchFunction = async (request, variables) => {
  return fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('authToken') || ''
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  }).then(json => {
    if (json && json.errors) {
      if (json.errors[0].message == 'Token is not valid!') {
        localStorage.removeItem('authToken')
      }

      throw new Error(json.errors[0].message)
    }
    return json
  })
}

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  })
}

export const RelayEnvironment = createRelayEnvironment()
