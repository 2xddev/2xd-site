import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createRequestHandler } from "@react-router/express";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/assets",
  express.static(path.join(__dirname, "client", "assets"), {
    immutable: true,
    maxAge: "1y",
  })
);

app.use(express.static(path.join(__dirname, "client")));

app.all(
  /.*/,
  createRequestHandler({
    build: () => import("./server/index.js"),
  })
);

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server draait op poort ${port}`);
});
