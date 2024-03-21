// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if(req.method==='POST'){
    const body=req.body
      const client=await MongoClient.connect(`${process.env.MONGO_CLIENT}`)
      const db=client.db('todos')
      const collection=db.collection('todos')
      const result=await collection.insertOne(body)
      client.close()

      res.status(200).json({ message: "added a todo successfully", result:result });
  }
  
}
