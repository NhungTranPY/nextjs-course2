import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid email address'})
            return
        }
        // console.log(userEmail);
        // connect with mongodb
        const client = await MongoClient.connect('mongodb+srv://next1:cAuBBvW907wnb9lt@cluster0.3bfai.mongodb.net/events?retryWrites=true&w=majority')
        
        const db = client.db() 
        
        await db.collection('newsletter').insertOne({email: userEmail})
        
        client.close()
        
        res.status(201).json({message: 'Signed up!'})
    } 
}

export default handler