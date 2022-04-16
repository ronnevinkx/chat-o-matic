# Chat-o-matic

A React chat app using MongoDB and GraphQL subscription over Web Socket.

## Client Tech

-   React
-   TypeScript
-   Apollo Client
-   graphql-ws
-   GraphQL Code Generator
-   MUI

## Server Tech

-   Node.js
-   TypeScript
-   Apollo Server
-   TypeGraphQL
-   TypeGoose
-   graphql-ws

## server-regular

Regular GraphQL server with typeDefs.

## server-typegrahql

Improved server using TypeGraphQL and TypeGoose to create typed entities and resolvers. No need to create separate interfaces or keep Mongoose model schema in sync with GraphQL schema (type defs), we just use decorators in classes to define all at once.

Following the reasoning here: https://www.velotio.com/engineering-blog/type-safe-backend-apps-with-typegoose-typegraphql

Adding `@typegoose/typegoose`, we can set up entities that serve as both Mongoose schema and GraphQL types. TypeGoose is like TypeORM, but with better MongoDB support.

We use TypeGraphQL to declare GraphQL fields.

## Notes

-   In Apollo Studio, click Settings, Edit (at Connection Settings), use WS implementation instead of subscriptions-transport-ws.

-   Downgraded GraphQL to `^15.3.0` to work with TypeGraphQL.

-   Possible improvement: use Redis with `graphql-redis-subscriptions` because TypeGraphQL's PubSub system comes from `graphql-subscriptions` which only works when you have a single instance of the Node.js app, so it doesn't scale (https://typegraphql.com/docs/subscriptions.html). The Redis package is also one of the recommended ones by Apollo.
