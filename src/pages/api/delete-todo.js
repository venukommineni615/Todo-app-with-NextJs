import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
    if(req.method==='DELETE'){
        const body=req.body
        const {id}=body
        const client=await MongoClient.connect(`${process.env.MONGO_CLIENT}`)
        const db=client.db('todos')
        const collection=db.collection('todos')
        const result=await collection.deleteOne({_id:new ObjectId(id)})
       client.close()
       res.status(201).json({message:'Deleted the todo successfully', result:result})
      }
}
