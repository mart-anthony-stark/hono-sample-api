import { serve } from "@hono/node-server";
import { app } from ".";
import mongoose from "mongoose";
const bootstrap = async () => {
  const port = 3000;
  console.log(`Server is running on port ${port}`);

  mongoose.set({ strictQuery: false });
  await mongoose.connect(`${process.env.DB_URI}`);
  console.log(`Connected to mongoDB: ${process.env.DB_URI}`);

  serve({
    fetch: app.fetch,
    port,
  });
};

export default bootstrap;
