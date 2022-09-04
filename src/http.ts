import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { routes } from "./routes";

const app = express();
const http = createServer(app);

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

export { app, http };