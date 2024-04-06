import 'reflect-metadata';
import { config } from "./config";
import express from "express";
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import cors from "cors";
import Routers from './routers';

const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", Routers());

app.listen(config.port.HTTP_PORT, () =>
  console.log(`app running on http//:localhost:${config.port.HTTP_PORT}`)
);
