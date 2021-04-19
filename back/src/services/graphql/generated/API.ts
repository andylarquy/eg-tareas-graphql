export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask?: Maybe<Task>;
  createUser?: Maybe<User>;
};


export type MutationCreateTaskArgs = {
  taskInput?: Maybe<TaskInput>;
};


export type MutationCreateUserArgs = {
  userInput?: Maybe<UserInput>;
};

export type Query = {
  __typename?: 'Query';
  getListOfTasks?: Maybe<Array<Maybe<Task>>>;
  getListOfUsers?: Maybe<Array<Maybe<User>>>;
  getTasksOfUser?: Maybe<Array<Maybe<Task>>>;
};


export type QueryGetTasksOfUserArgs = {
  userId: Scalars['ID'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
};

export type TaskInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  tasks?: Maybe<Array<Maybe<Task>>>;
};

export type UserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};