import { createClient, dedupExchange, fetchExchange, subscriptionExchange, Exchange, makeErrorResult } from "urql";
import { cacheExchange, offlineExchange } from "@urql/exchange-graphcache";
import { makeAsyncStorage } from "@urql/storage-rn";
import NetInfo from "@react-native-community/netinfo";
import { share, pipe, filter, map, merge } from "wonka";

let disconnect: any;

const offlineMutationExchange: () => Exchange = () => {
  let connected = true;

  if (disconnect) {
    disconnect();
    disconnect = undefined;
  }

  disconnect = NetInfo.addEventListener((state) => {
    connected = state.isConnected === true;
  });

  return ({ forward }) => {
    return (ops$) => {
      const shared = pipe(ops$, share);

      // mutations when is offline
      const offlineMutations = pipe(
        shared,
        filter((op) => op.kind === "mutation" && !connected),
        map((op) => makeErrorResult(op, new Error("You are offline!"))),
      );

      // everything else
      const rest = pipe(
        shared,
        filter((op) => op.kind !== "mutation" || (op.kind === "mutation" && connected)),
      );
      return merge([forward(rest), offlineMutations]);
    };
  };
};

const storage = makeAsyncStorage({
  dataKey: "my-app-data",
  metadataKey: "my-app-metadata",
  maxAge: 5,
});

export const client = createClient({
  url: "http://10.0.2.2:5000/graphql",
  exchanges: [
    dedupExchange,
    offlineExchange({
      storage,
      resolvers: {},
      updates: {},
    }),
    fetchExchange,
  ],
});
