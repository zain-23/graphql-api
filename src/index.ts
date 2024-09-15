import express, { Application, Request, Response } from "express";

import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFileSync } from "fs";
import resolvers from "./resolver/resolver";
import { buildSubgraphSchema } from "@apollo/subgraph";
import cors from "cors";
import { connectDB } from "./db/db";

const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.use(cors());

const typeDefs = gql(
  readFileSync("./src/schema/schema.gql", {
    encoding: "utf-8",
  })
);

(async () => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  await server.start();
  app.use("/graphql", express.json(), cors(), expressMiddleware(server));
})();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World with TypeScript!");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("DB ERROR", err);
  });
