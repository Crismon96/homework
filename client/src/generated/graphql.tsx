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
  timers: TimersResult;
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
  timer: TimerUpdate;
};

export type TimerCreation = {
  description: Scalars['String'];
  from: Scalars['Date'];
  until: Scalars['Date'];
};

export type TimerUpdate = {
  id: Scalars['ID'];
  description: Scalars['String'];
  from: Scalars['Date'];
  until: Scalars['Date'];
};

export type TimersResult = {
  __typename?: 'TimersResult';
  totalCount: Scalars['Int'];
  timers: Array<Timer>;
};

export type Timer = {
  __typename?: 'Timer';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  from: Scalars['Date'];
  until: Scalars['Date'];
};

export type GetTimerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTimerQuery = (
  { __typename?: 'RootQuery' }
  & { timer: (
    { __typename?: 'Timer' }
    & Pick<Timer, 'id' | 'description' | 'from' | 'until'>
  ) }
);

export type UpdateTimerMutationVariables = Exact<{
  timer: TimerUpdate;
}>;


export type UpdateTimerMutation = (
  { __typename?: 'RootMutation' }
  & { updateTimer: (
    { __typename?: 'Timer' }
    & Pick<Timer, 'id' | 'description' | 'from' | 'until'>
  ) }
);

export type TimerListQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  filter?: Maybe<Scalars['String']>;
}>;


export type TimerListQuery = (
  { __typename?: 'RootQuery' }
  & { timers: (
    { __typename?: 'TimersResult' }
    & Pick<TimersResult, 'totalCount'>
    & { timers: Array<(
      { __typename?: 'Timer' }
      & Pick<Timer, 'id' | 'description' | 'from' | 'until'>
    )> }
  ) }
);

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
