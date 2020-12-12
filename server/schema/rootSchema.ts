const typeDefs = `
# Scalars ------------------------------------------------------------------------------------------------------------

# A ISO-String Datetime Format
scalar Date

# Queries ------------------------------------------------------------------------------------------------------------

type RootQuery {
  timer(id: ID!): Timer!
  timers(offset: Int!, limit: Int!, filter: String): [Timer!]!
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
