import { connectMongoDB } from "../../lib/MongoDB";
import TodoModel from "@/models/TodoModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id, isCompleted } = req.body;
      await connectMongoDB();
      await TodoModel.findByIdAndUpdate(id, { isCompleted: true });
      if (!deletedData) {
        return res.status(404).json({ message: "ID not found" });
      }
      return res.status(200).json({ message: "Task Deleted" });
    } catch (error) {}
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
