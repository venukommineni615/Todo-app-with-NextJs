
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
if(req.method==='PATCH'){
    const body=req.body
    const {id,done}=body
    const client=await MongoClient.connect('mongodb+srv://venukommineni615:9963676437kVmm@cluster0.48jxaze.mongodb.net/')
    const db=client.db('todos')
    const collection=db.collection('todos')
    const result=await collection.updateOne({_id:new ObjectId(id)},{$set: {
      done: done,
   }})
   client.close()

    res.status(200).json({ message: "updated the todo successfully", result:result });
  }
}