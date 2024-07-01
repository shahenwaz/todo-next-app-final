import { connectMongoDB } from "../../lib/MongoDB";
import TodoModel from "@/models/TodoModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const datas = await TodoModel.find();
      return res.status(200).json(datas);
    } catch (error) {
      console.error("Error retrieving datas:", error);
      return res.status(500).json({ message: "Error retrieving datas", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
