import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Error = {
  __typename?: "Error";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Label = {
  __typename?: "Label";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type LabelId = {
  id: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: UserResponse;
  clearTrash: Scalars["Boolean"];
  createLabel: Label;
  createNote: Note;
  deleteLabel: Scalars["Boolean"];
  deleteNoteForever: Scalars["Boolean"];
  editLabel: Label;
  editNote?: Maybe<Note>;
  forgotPassword: Scalars["String"];
  logout: Scalars["Boolean"];
  moveNoteToTrash: Scalars["Boolean"];
  restoreNoteFromTrash: Scalars["Boolean"];
  saveUserFCMToken: Scalars["Boolean"];
  signin: UserResponse;
  signinFromGoogle: UserResponse;
  signup: UserResponse;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationCreateLabelArgs = {
  name: Scalars["String"];
};

export type MutationCreateNoteArgs = {
  labelId?: InputMaybe<Array<LabelId>>;
  noteInput: NoteInput;
};

export type MutationDeleteLabelArgs = {
  labelId: Scalars["Float"];
};

export type MutationDeleteNoteForeverArgs = {
  noteId: Scalars["Float"];
};

export type MutationEditLabelArgs = {
  labelId: Scalars["Float"];
  name: Scalars["String"];
};

export type MutationEditNoteArgs = {
  labelId?: InputMaybe<Array<LabelId>>;
  noteId: Scalars["Float"];
  noteInput: NoteInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationMoveNoteToTrashArgs = {
  noteId: Scalars["Float"];
};

export type MutationRestoreNoteFromTrashArgs = {
  noteId: Scalars["Float"];
};

export type MutationSaveUserFcmTokenArgs = {
  timestamp: Scalars["String"];
  token: Scalars["String"];
};

export type MutationSigninArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSigninFromGoogleArgs = {
  tokenId: Scalars["String"];
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type Note = {
  __typename?: "Note";
  archived?: Maybe<Scalars["Boolean"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  indexColor?: Maybe<Scalars["Int"]>;
  labels?: Maybe<Array<Label>>;
  pinned?: Maybe<Scalars["Boolean"]>;
  text: Scalars["String"];
  time?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  trashed?: Maybe<Scalars["Boolean"]>;
  updatedAt: Scalars["DateTime"];
};

export type NoteInput = {
  archived?: InputMaybe<Scalars["Boolean"]>;
  indexColor?: InputMaybe<Scalars["Int"]>;
  pinned?: InputMaybe<Scalars["Boolean"]>;
  text?: InputMaybe<Scalars["String"]>;
  time?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type NotificationPayload = {
  __typename?: "NotificationPayload";
  body: Scalars["String"];
  title: Scalars["String"];
  userId: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  labels: Array<Label>;
  me?: Maybe<User>;
  notes: Array<Note>;
  trash: Array<Note>;
};

export type QueryNotesArgs = {
  reminder?: InputMaybe<Scalars["Boolean"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  reminder: NotificationPayload;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
  picture?: Maybe<Scalars["String"]>;
};

export type UserResponse = {
  __typename?: "UserResponse";
  error?: Maybe<Error>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: "Error"; field: string; message: string };

export type RegularLabelFragment = { __typename?: "Label"; id: string; name: string };

export type NoteInputFragment = {
  __typename?: "Note";
  id: string;
  title: string;
  text: string;
  archived?: boolean | null;
  pinned?: boolean | null;
  indexColor?: number | null;
  time?: string | null;
  trashed?: boolean | null;
  createdAt: any;
  updatedAt: any;
  labels?: Array<{ __typename?: "Label"; id: string; name: string }> | null;
};

export type RegularUserFragment = {
  __typename?: "User";
  id: string;
  name: string;
  email: string;
  picture?: string | null;
};

export type RegularUserResponseFragment = {
  __typename?: "UserResponse";
  error?: { __typename?: "Error"; field: string; message: string } | null;
  user?: {
    __typename?: "User";
    id: string;
    name: string;
    email: string;
    picture?: string | null;
  } | null;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename?: "UserResponse";
    error?: { __typename?: "Error"; field: string; message: string } | null;
    user?: {
      __typename?: "User";
      id: string;
      name: string;
      email: string;
      picture?: string | null;
    } | null;
  };
};

export type ClearTrashMutationVariables = Exact<{ [key: string]: never }>;

export type ClearTrashMutation = { __typename?: "Mutation"; clearTrash: boolean };

export type CreateLabelMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type CreateLabelMutation = {
  __typename?: "Mutation";
  createLabel: { __typename?: "Label"; id: string; name: string };
};

export type CreateNoteMutationVariables = Exact<{
  noteInput: NoteInput;
  labelId?: InputMaybe<Array<LabelId> | LabelId>;
}>;

export type CreateNoteMutation = {
  __typename?: "Mutation";
  createNote: {
    __typename?: "Note";
    id: string;
    title: string;
    text: string;
    archived?: boolean | null;
    pinned?: boolean | null;
    indexColor?: number | null;
    time?: string | null;
    trashed?: boolean | null;
    createdAt: any;
    updatedAt: any;
    labels?: Array<{ __typename?: "Label"; id: string; name: string }> | null;
  };
};

export type DeleteLabelMutationVariables = Exact<{
  labelId: Scalars["Float"];
}>;

export type DeleteLabelMutation = { __typename?: "Mutation"; deleteLabel: boolean };

export type DeleteNoteForeverMutationVariables = Exact<{
  noteId: Scalars["Float"];
}>;

export type DeleteNoteForeverMutation = { __typename?: "Mutation"; deleteNoteForever: boolean };

export type EditLabelMutationVariables = Exact<{
  labelId: Scalars["Float"];
  name: Scalars["String"];
}>;

export type EditLabelMutation = {
  __typename?: "Mutation";
  editLabel: { __typename?: "Label"; id: string; name: string };
};

export type EditNoteMutationVariables = Exact<{
  noteId: Scalars["Float"];
  noteInput: NoteInput;
  labelId?: InputMaybe<Array<LabelId> | LabelId>;
}>;

export type EditNoteMutation = {
  __typename?: "Mutation";
  editNote?: {
    __typename?: "Note";
    id: string;
    title: string;
    text: string;
    archived?: boolean | null;
    pinned?: boolean | null;
    indexColor?: number | null;
    time?: string | null;
    trashed?: boolean | null;
    createdAt: any;
    updatedAt: any;
    labels?: Array<{ __typename?: "Label"; id: string; name: string }> | null;
  } | null;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation"; forgotPassword: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type MoveNoteToTrashMutationVariables = Exact<{
  noteId: Scalars["Float"];
}>;

export type MoveNoteToTrashMutation = { __typename?: "Mutation"; moveNoteToTrash: boolean };

export type RestoreNoteFromTrashMutationVariables = Exact<{
  noteId: Scalars["Float"];
}>;

export type RestoreNoteFromTrashMutation = {
  __typename?: "Mutation";
  restoreNoteFromTrash: boolean;
};

export type SaveUserFcmTokenMutationVariables = Exact<{
  token: Scalars["String"];
  timestamp: Scalars["String"];
}>;

export type SaveUserFcmTokenMutation = { __typename?: "Mutation"; saveUserFCMToken: boolean };

export type SigninMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type SigninMutation = {
  __typename?: "Mutation";
  signin: {
    __typename?: "UserResponse";
    error?: { __typename?: "Error"; field: string; message: string } | null;
    user?: {
      __typename?: "User";
      id: string;
      name: string;
      email: string;
      picture?: string | null;
    } | null;
  };
};

export type SigninFromGoogleMutationVariables = Exact<{
  tokenId: Scalars["String"];
}>;

export type SigninFromGoogleMutation = {
  __typename?: "Mutation";
  signinFromGoogle: {
    __typename?: "UserResponse";
    error?: { __typename?: "Error"; field: string; message: string } | null;
    user?: {
      __typename?: "User";
      id: string;
      name: string;
      email: string;
      picture?: string | null;
    } | null;
  };
};

export type SignupMutationVariables = Exact<{
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: {
    __typename?: "UserResponse";
    error?: { __typename?: "Error"; field: string; message: string } | null;
    user?: {
      __typename?: "User";
      id: string;
      name: string;
      email: string;
      picture?: string | null;
    } | null;
  };
};

export type LabelsQueryVariables = Exact<{ [key: string]: never }>;

export type LabelsQuery = {
  __typename?: "Query";
  labels: Array<{ __typename?: "Label"; id: string; name: string }>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: string;
    name: string;
    email: string;
    picture?: string | null;
  } | null;
};

export type NotesQueryVariables = Exact<{
  reminder?: InputMaybe<Scalars["Boolean"]>;
}>;

export type NotesQuery = {
  __typename?: "Query";
  notes: Array<{
    __typename?: "Note";
    id: string;
    title: string;
    text: string;
    archived?: boolean | null;
    pinned?: boolean | null;
    indexColor?: number | null;
    time?: string | null;
    trashed?: boolean | null;
    createdAt: any;
    updatedAt: any;
    labels?: Array<{ __typename?: "Label"; id: string; name: string }> | null;
  }>;
};

export type TrashQueryVariables = Exact<{ [key: string]: never }>;

export type TrashQuery = {
  __typename?: "Query";
  trash: Array<{
    __typename?: "Note";
    id: string;
    title: string;
    text: string;
    archived?: boolean | null;
    pinned?: boolean | null;
    indexColor?: number | null;
    time?: string | null;
    trashed?: boolean | null;
    createdAt: any;
    updatedAt: any;
    labels?: Array<{ __typename?: "Label"; id: string; name: string }> | null;
  }>;
};

export type ReminderSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ReminderSubscription = {
  __typename?: "Subscription";
  reminder: { __typename?: "NotificationPayload"; title: string; body: string };
};

export const RegularLabelFragmentDoc = gql`
  fragment RegularLabel on Label {
    id
    name
  }
`;
export const NoteInputFragmentDoc = gql`
  fragment NoteInput on Note {
    id
    title
    text
    archived
    pinned
    indexColor
    time
    trashed
    createdAt
    updatedAt
    labels {
      ...RegularLabel
    }
  }
  ${RegularLabelFragmentDoc}
`;
export const RegularErrorFragmentDoc = gql`
  fragment RegularError on Error {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    name
    email
    picture
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    error {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
    ChangePasswordDocument
  );
}
export const ClearTrashDocument = gql`
  mutation ClearTrash {
    clearTrash
  }
`;

export function useClearTrashMutation() {
  return Urql.useMutation<ClearTrashMutation, ClearTrashMutationVariables>(ClearTrashDocument);
}
export const CreateLabelDocument = gql`
  mutation CreateLabel($name: String!) {
    createLabel(name: $name) {
      ...RegularLabel
    }
  }
  ${RegularLabelFragmentDoc}
`;

export function useCreateLabelMutation() {
  return Urql.useMutation<CreateLabelMutation, CreateLabelMutationVariables>(CreateLabelDocument);
}
export const CreateNoteDocument = gql`
  mutation CreateNote($noteInput: NoteInput!, $labelId: [LabelId!]) {
    createNote(noteInput: $noteInput, labelId: $labelId) {
      ...NoteInput
    }
  }
  ${NoteInputFragmentDoc}
`;

export function useCreateNoteMutation() {
  return Urql.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument);
}
export const DeleteLabelDocument = gql`
  mutation DeleteLabel($labelId: Float!) {
    deleteLabel(labelId: $labelId)
  }
`;

export function useDeleteLabelMutation() {
  return Urql.useMutation<DeleteLabelMutation, DeleteLabelMutationVariables>(DeleteLabelDocument);
}
export const DeleteNoteForeverDocument = gql`
  mutation DeleteNoteForever($noteId: Float!) {
    deleteNoteForever(noteId: $noteId)
  }
`;

export function useDeleteNoteForeverMutation() {
  return Urql.useMutation<DeleteNoteForeverMutation, DeleteNoteForeverMutationVariables>(
    DeleteNoteForeverDocument
  );
}
export const EditLabelDocument = gql`
  mutation EditLabel($labelId: Float!, $name: String!) {
    editLabel(labelId: $labelId, name: $name) {
      ...RegularLabel
    }
  }
  ${RegularLabelFragmentDoc}
`;

export function useEditLabelMutation() {
  return Urql.useMutation<EditLabelMutation, EditLabelMutationVariables>(EditLabelDocument);
}
export const EditNoteDocument = gql`
  mutation EditNote($noteId: Float!, $noteInput: NoteInput!, $labelId: [LabelId!]) {
    editNote(noteId: $noteId, noteInput: $noteInput, labelId: $labelId) {
      ...NoteInput
    }
  }
  ${NoteInputFragmentDoc}
`;

export function useEditNoteMutation() {
  return Urql.useMutation<EditNoteMutation, EditNoteMutationVariables>(EditNoteDocument);
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument
  );
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
}
export const MoveNoteToTrashDocument = gql`
  mutation MoveNoteToTrash($noteId: Float!) {
    moveNoteToTrash(noteId: $noteId)
  }
`;

export function useMoveNoteToTrashMutation() {
  return Urql.useMutation<MoveNoteToTrashMutation, MoveNoteToTrashMutationVariables>(
    MoveNoteToTrashDocument
  );
}
export const RestoreNoteFromTrashDocument = gql`
  mutation RestoreNoteFromTrash($noteId: Float!) {
    restoreNoteFromTrash(noteId: $noteId)
  }
`;

export function useRestoreNoteFromTrashMutation() {
  return Urql.useMutation<RestoreNoteFromTrashMutation, RestoreNoteFromTrashMutationVariables>(
    RestoreNoteFromTrashDocument
  );
}
export const SaveUserFcmTokenDocument = gql`
  mutation SaveUserFCMToken($token: String!, $timestamp: String!) {
    saveUserFCMToken(token: $token, timestamp: $timestamp)
  }
`;

export function useSaveUserFcmTokenMutation() {
  return Urql.useMutation<SaveUserFcmTokenMutation, SaveUserFcmTokenMutationVariables>(
    SaveUserFcmTokenDocument
  );
}
export const SigninDocument = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useSigninMutation() {
  return Urql.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument);
}
export const SigninFromGoogleDocument = gql`
  mutation SigninFromGoogle($tokenId: String!) {
    signinFromGoogle(tokenId: $tokenId) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useSigninFromGoogleMutation() {
  return Urql.useMutation<SigninFromGoogleMutation, SigninFromGoogleMutationVariables>(
    SigninFromGoogleDocument
  );
}
export const SignupDocument = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
}
export const LabelsDocument = gql`
  query Labels {
    labels {
      id
      name
    }
  }
`;

export function useLabelsQuery(options?: Omit<Urql.UseQueryArgs<LabelsQueryVariables>, "query">) {
  return Urql.useQuery<LabelsQuery>({ query: LabelsDocument, ...options });
}
export const MeDocument = gql`
  query Me {
    me {
      id
      name
      email
      picture
    }
  }
`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const NotesDocument = gql`
  query Notes($reminder: Boolean) {
    notes(reminder: $reminder) {
      ...NoteInput
    }
  }
  ${NoteInputFragmentDoc}
`;

export function useNotesQuery(options?: Omit<Urql.UseQueryArgs<NotesQueryVariables>, "query">) {
  return Urql.useQuery<NotesQuery>({ query: NotesDocument, ...options });
}
export const TrashDocument = gql`
  query Trash {
    trash {
      ...NoteInput
    }
  }
  ${NoteInputFragmentDoc}
`;

export function useTrashQuery(options?: Omit<Urql.UseQueryArgs<TrashQueryVariables>, "query">) {
  return Urql.useQuery<TrashQuery>({ query: TrashDocument, ...options });
}
export const ReminderDocument = gql`
  subscription Reminder {
    reminder {
      title
      body
    }
  }
`;

export function useReminderSubscription<TData = ReminderSubscription>(
  options: Omit<Urql.UseSubscriptionArgs<ReminderSubscriptionVariables>, "query"> = {},
  handler?: Urql.SubscriptionHandler<ReminderSubscription, TData>
) {
  return Urql.useSubscription<ReminderSubscription, TData, ReminderSubscriptionVariables>(
    { query: ReminderDocument, ...options },
    handler
  );
}
