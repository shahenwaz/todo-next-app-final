import { connectMongoDB } from "../../lib/MongoDB";
import TodoModel from "@/models/TodoModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, description } = req.body;
      console.log(title);
      await connectMongoDB();
      console.log("Connected to MongoDB");
      const newTodo = new TodoModel({
        title,
        description,
      });
      await newTodo.save();
      console.log(newTodo);
      return res.status(200).json({ message: "Task Added" });
    } catch (error) {}
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
