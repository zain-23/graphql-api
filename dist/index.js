"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const fs_1 = require("fs");
const resolver_1 = __importDefault(require("./resolver/resolver"));
const subgraph_1 = require("@apollo/subgraph");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db/db");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const typeDefs = (0, graphql_tag_1.default)((0, fs_1.readFileSync)("./src/schema/schema.gql", {
    encoding: "utf-8",
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const server = new server_1.ApolloServer({
        schema: (0, subgraph_1.buildSubgraphSchema)({ typeDefs, resolvers: resolver_1.default }),
    });
    yield server.start();
    app.use("/graphql", express_1.default.json(), (0, cors_1.default)(), (0, express4_1.expressMiddleware)(server));
}))();
app.get("/", (req, res) => {
    res.send("Hello World with TypeScript!");
});
(0, db_1.connectDB)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error("DB ERROR", err);
});
