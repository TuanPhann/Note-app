import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs } from "./schema/index.js";
import { resolvers } from "./resolver/index.js";
import mongoose from "mongoose";
import "dotenv/config";
import "./configFirebase.js";
import { getAuth } from "firebase-admin/auth";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const app = express();
const httpServer = http.createServer(app);

const URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS_WORD}@cluster0.vd2uypm.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: "/",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

// Set up Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

// midleWare ckek token
const authorizationJWT = (req, res, next) => {
  const authornization = req.headers.authornization;
  if (authornization) {
    const accessToken = authornization.split(" ")[1];
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch((err) => {
        return res.status(403).json("token da het han");
      });
  } else {
    next();
  }
};

app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("connect to DB");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
