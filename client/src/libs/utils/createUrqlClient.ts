import { cacheExchange } from "@urql/exchange-graphcache";
import {
  ClearTrashMutation,
  CreateLabelMutation,
  CreateNoteMutation,
  DeleteLabelMutation,
  DeleteLabelMutationVariables,
  DeleteNoteForeverMutation,
  DeleteNoteForeverMutationVariables,
  EditLabelMutation,
  EditNoteMutation,
  LabelsDocument,
  LabelsQuery,
  LogoutMutation,
  MeDocument,
  MeQuery,
  MoveNoteToTrashMutation,
  MoveNoteToTrashMutationVariables,
  NotesDocument,
  NotesQuery,
  RestoreNoteFromTrashMutation,
  RestoreNoteFromTrashMutationVariables,
  SigninFromGoogleMutation,
  SigninMutation,
  SignupMutation,
} from "generated/graphql";
import { createClient as createWSClient } from "graphql-ws";
import { betterUpdateQuery } from "libs/utils/betterUpdateQuery";
import { invalidateQuery } from "libs/utils/invalidateCache";
import { createClient, dedupExchange, fetchExchange, subscriptionExchange } from "urql";

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
          },
          deleteLabel: (_result, args, cache, _info) => {
            betterUpdateQuery<DeleteLabelMutation, LabelsQuery>(
              cache,
              { query: LabelsDocument },
              _result,
              (_, query) => {
                return {
                  labels: query.labels.filter(
                    (label) => +label.id !== (args as DeleteLabelMutationVariables).labelId
                  ),
                };
              }
            );
            invalidateQuery(cache, "notes");
          },
          createLabel: (_result, _args, cache, _info) => {
            betterUpdateQuery<CreateLabelMutation, LabelsQuery>(
              cache,
              { query: LabelsDocument },
              _result,
              (result, query) => {
                return { labels: [...query.labels, result.createLabel] };
              }
            );
          },
          updateLabel: (_result, _args, cache, _info) => {
            betterUpdateQuery<EditLabelMutation, LabelsQuery>(
              cache,
              { query: NotesDocument },
              _result,
              (result, query) => {
                return {
                  labels: query.labels.map((label) =>
                    label.id === result.editLabel!.id ? result.editLabel : label
                  ),
                };
              }
            );
            invalidateQuery(cache, "notes");
          },
          createNote: (_result, _args, cache, _info) => {
            betterUpdateQuery<CreateNoteMutation, NotesQuery>(
              cache,
              { query: NotesDocument },
              _result,
              (result, query) => {
                return { notes: [...query.notes, result.createNote] };
              }
            );
          },
          editNote: (_result, _args, cache, _info) => {
            betterUpdateQuery<EditNoteMutation, NotesQuery>(
              cache,
              { query: NotesDocument },
              _result,
              (result, query) => {
                return {
                  notes: query.notes.map((note) =>
                    note.id === result.editNote!.id ? { ...note, ...result.editNote } : note
                  ),
                };
              }
            );
          },
          moveNoteToTrash: (_result, args, cache, _info) => {
            betterUpdateQuery<MoveNoteToTrashMutation, NotesQuery>(
              cache,
              { query: NotesDocument },
              _result,
              (_, query) => {
                return {
                  notes: query.notes.map((note) =>
                    +note.id === (args as MoveNoteToTrashMutationVariables).noteId
                      ? { ...note, trashed: true, pinned: false, archived: false }
                      : note
                  ),
                };
              }
            );
          },
          restoreNoteFromTrash: (_result, args, cache, _info) => {
            betterUpdateQuery<RestoreNoteFromTrashMutation, NotesQuery>(
              cache,
              { query: NotesDocument },
              _result,
              (_, query) => {
                return {
                  notes: query.notes.map((note) =>
                    +note.id === (args as RestoreNoteFromTrashMutationVariables).noteId
                      ? { ...note, trashed: false }
                      : note
                  ),
                };
              }
            );
          },
          deleteNoteForever: (_result, args, cache, _info) => {
            betterUpdateQuery<DeleteNoteForeverMutation, NotesQuery>(
              cache,
              { query: NotesDocument },
              _result,
              (_, query) => {
                return {
                  notes: query.notes.filter(
                    (note) => +note.id !== (args as DeleteNoteForeverMutationVariables).noteId
                  ),
                };
              }
            );
          },
          clearTrash: (_result, _args, cache, _info) => {
            betterUpdateQuery<ClearTrashMutation, NotesQuery>(
              cache,
              { query: NotesDocument },
              _result,
              (_, _query) => {
                return {
                  notes: [],
                };
              }
            );
          },
        },
      },
    }),
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
