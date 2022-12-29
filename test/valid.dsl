model
  schema 1.1
type user
type document
  relations
    define blocked: [user]
    define editor: [user] but not blocked
