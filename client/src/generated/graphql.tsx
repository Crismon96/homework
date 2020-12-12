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
  /** A ISO-String Datetime Format */
  Date: any;
};


export type RootQuery = {
  __typename?: 'RootQuery';
  timer: Timer;
  timers: Array<Timer>;
};


export type RootQueryTimerArgs = {
  id: Scalars['ID'];
};


export type RootQueryTimersArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  filter?: Maybe<Scalars['String']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  createTimer: Timer;
  updateTimer: Timer;
};


export type RootMutationCreateTimerArgs = {
  timer: TimerCreation;
};


export type RootMutationUpdateTimerArgs = {
  id: Scalars['ID'];
  description: Scalars['String'];
  from: Scalars['Date'];
  until: Scalars['Date'];
};

export type TimerCreation = {
  description: Scalars['String'];
  from: Scalars['Date'];
  until: Scalars['Date'];
};

export type Timer = {
  __typename?: 'Timer';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  from: Scalars['Date'];
  until: Scalars['Date'];
};

export type CreateTimerMutationVariables = Exact<{
  timer: TimerCreation;
}>;


export type CreateTimerMutation = (
  { __typename?: 'RootMutation' }
  & { createTimer: (
    { __typename?: 'Timer' }
    & Pick<Timer, 'id' | 'description' | 'from' | 'until'>
  ) }
);

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
  { __typename?: 'RootQuery' }
  & { timer: (
    { __typename?: 'Timer' }
    & Pick<Timer, 'id' | 'description' | 'from' | 'until'>
  ) }
);
