export type Size = "sm" | "md" | "lg";
export type Variant = "primary" | "secondary" | "neutral";

export interface LabelT {
  id: string;
  name: string;
}

export type Position = "left" | "right";

export type ReadOnlyArray<A> = A extends ReadonlyArray<infer T> ? T : never;

export interface INote {
  id: string;
  title: string;
  text: string;
  archived: boolean;
  pinned: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  labels: LabelT[];
  indexColor: number | null;
  time: string | null;
  trashed: boolean;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}
