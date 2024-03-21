
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    
    const client=await MongoClient.connect(`${process.env.MONGO_CLIENT}`)
    const db=client.db('todos')
    const collection=db.collection('todos')
    const result= await collection.find().toArray()
    
   client.close()

    res.status(200).json({ message: "fetched todos successfully", result:result });
  
}