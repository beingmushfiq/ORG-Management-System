import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import type { IncomingMessage, ServerResponse } from "http";

const server = express();
let isInitialized = false;

async function bootstrap(): Promise<express.Express> {
  if (!isInitialized) {
    server.use(cookieParser());

    const app = await NestFactory.create<INestApplication>(
      AppModule,
      new ExpressAdapter(server)
    );

    app.enableCors({
      origin: true,
      credentials: true,
    });

    app.setGlobalPrefix("api");

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      })
    );

    await app.init();
    isInitialized = true;
  }
  return server;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Normalize root requests to /api prefix so NestJS global prefix matches
  if (req.url && !req.url.startsWith("/api")) {
    req.url = `/api${req.url === "/" ? "" : req.url}`;
  }

  await bootstrap();
  server(req, res);
}
