datasource db {
  provider = "postgresql"
  url      = env("POSTGRESQL_DATABASE_URL")
}


POSTGRESQL_DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
