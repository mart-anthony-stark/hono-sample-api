import { Context, Hono } from "hono";
import UserModel from "./user.model";

const UserRoute = new Hono();

UserRoute.get("/", async (c: Context) => {
  const users = await UserModel.find();
  return c.json(users);
});

UserRoute.get("/:id", async (c: Context) => {
  const user = await UserModel.findById(c.req.param("id"));
  return c.json(user);
});

UserRoute.post("/", async (c: Context) => {
  const body = await c.req.json();
  const user = new UserModel(body);
  await user.save();
  return c.json(user);
});

UserRoute.put("/:id", async (c: Context) => {
  const body = await c.req.json();
  const user = await UserModel.findByIdAndUpdate(
    c.req.param("id"),
    {
      $set: body,
    },
    { new: true }
  );
  return c.json(user);
});

UserRoute.delete("/:id", async (c: Context) => {
  const user = await UserModel.findOneAndDelete({ _id: c.req.param("id") });
  return c.json(user);
});

export default UserRoute;
