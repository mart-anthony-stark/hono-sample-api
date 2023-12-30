import { Hono } from "hono";
import { logger } from "hono/logger";
import { etag } from "hono/etag";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import users from "./v1/user/user";
import bootstrap from "./bootstrap";

import * as dotenv from "dotenv";
dotenv.config({});

export const app = new Hono();

app.use(
  "/v1/*",
  cors({
    origin: "*",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);
app.use(
  "*",
  secureHeaders({
    strictTransportSecurity: "max-age=63072000; includeSubDomains; preload",
    xFrameOptions: "DENY",
    xXssProtection: "1",
  })
);
app.use("*", etag(), logger());
app.use("*", prettyJSON());

app.route("/v1/users", users);

app.onError((err, c) => {
  return c.json({ message: err.message }, 500);
});

bootstrap();
