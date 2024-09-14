import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Scheme Defination
const typeDefs = `#graphql
type Book {
    title:String
    author:String
    }

type Query {
    books:[Book]
    }
`;
// Dateset
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
// Resolver how to fetch data
const resolvers = {
  Query: {
    books: () => books,
  },
};

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const AppoloServer = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: {
        port: 4000,
      },
    });
    return url;
  } catch (error) {
    throw new Error("Something is when intializing apollo server");
  }
};

AppoloServer()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("APOLLO SERVER ERROR", err);
  });
