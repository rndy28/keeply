import { cacheExchange } from "@urql/exchange-graphcache";
import {
  DeleteLabelMutationVariables,
  LogoutMutation,
  MeDocument,
  MeQuery,
  SigninFromGoogleMutation,
  SigninMutation,
  SignupMutation,
} from "generated/graphql";
import { betterUpdateQuery } from "libs/utils/betterUpdateQuery";
import { invalidateQuery } from "libs/utils/invalidateCache";
import { createClient, dedupExchange, Exchange, fetchExchange, subscriptionExchange } from "urql";
import { createClient as createWSClient } from "graphql-ws";
import { pipe, tap } from "wonka";

const errorExchange: Exchange = ({ forward }) => {
  return (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          console.log(error.message);
        }
      })
    );
  };
};

const wsClient = createWSClient({
  url: `${import.meta.env.VITE_WS_ORIGIN}/graphql`,
});

export const client = createClient({
  url: `${import.meta.env.VITE_SERVER_ORIGIN}/graphql`,
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          signin: (_result, _args, cache, _info) => {
            betterUpdateQuery<SigninMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.signin.error) {
                  return query;
                } else {
                  return {
                    me: result.signin.user,
                  };
                }
              }
            );
            invalidateQuery(cache, "labels");
            invalidateQuery(cache, "notes");
            invalidateQuery(cache, "trash");
          },
          signinFromGoogle: (_result, _args, cache, _info) => {
            betterUpdateQuery<SigninFromGoogleMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.signinFromGoogle.error) {
                  return query;
                } else {
                  return {
                    me: result.signinFromGoogle.user,
                  };
                }
              }
            );
            invalidateQuery(cache, "labels");
            invalidateQuery(cache, "notes");
            invalidateQuery(cache, "trash");
          },
          signup: (_result, _args, cache, _info) => {
            betterUpdateQuery<SignupMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.signup.error) {
                  return query;
                } else {
                  return {
                    me: result.signup.user,
                  };
                }
              }
            );
            invalidateQuery(cache, "labels");
            invalidateQuery(cache, "notes");
            invalidateQuery(cache, "trash");
          },
          deleteLabel: (_result, args, cache, _info) => {
            cache.invalidate({
              __typename: "Label",
              id: (args as DeleteLabelMutationVariables).labelId,
            });
            invalidateQuery(cache, "notes");
            invalidateQuery(cache, "trash");
          },
          createLabel: (_result, _args, cache, _info) => {
            invalidateQuery(cache, "labels");
          },
          updateLabel: (_result, _args, cache, _info) => {
            invalidateQuery(cache, "labels");
            invalidateQuery(cache, "notes");
            invalidateQuery(cache, "trash");
          },
          createNote: (_result, _args, cache, _info) => {
            invalidateQuery(cache, "notes");
          },
          updateNote: (_result, _args, cache, _info) => {
            invalidateQuery(cache, "notes");
          },
          moveNoteToTrash: (_result, _args, cache, _info) => {
            invalidateQuery(cache, "notes");
            invalidateQuery(cache, "trash");
          },
          restoreNoteFromTrash: (_result, _args, cache, _info) => {
            invalidateQuery(cache, "notes");
            invalidateQuery(cache, "trash");
          },
          deleteNoteForever: (_result, _args, cache, _info) => {
            invalidateQuery(cache, "trash");
          },
          clearTrash: (_result, _args, cache, _info) => {
            invalidateQuery(cache, "trash");
          },
        },
      },
    }),
    errorExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return {
          subscribe: (sink) => {
            const dispose = wsClient.subscribe(operation, sink);
            return {
              unsubscribe: dispose,
            };
          },
        };
      },
    }),
  ],
});
