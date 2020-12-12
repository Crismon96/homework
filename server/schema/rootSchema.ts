const typeDefs = `
# Scalars ------------------------------------------------------------------------------------------------------------

# A ISO-String Datetime Format
scalar Date

# Queries ------------------------------------------------------------------------------------------------------------

type RootQuery {
  timer(id: ID!): Timer!
  timers(offset: Int!, limit: Int!, filter: String): TimersResult!
}

# Mutations ------------------------------------------------------------------------------------------------------------

type RootMutation {
  createTimer(timer: TimerCreation!): Timer!
  updateTimer(id: ID!, description: String!, from: Date!, until: Date!): Timer!
}

# Object-Types ------------------------------------------------------------------------------------------------------------

input TimerCreation {
  description: String!
  from: Date!
  until: Date!
}

type TimersResult {
  totalCount: Int!
  timers: [Timer!]!
}

type Timer {
  id: ID!
  description: String
  from: Date!
  until: Date!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`;

export default typeDefs;
