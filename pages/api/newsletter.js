import { MongoClient } from 'mongodb'

async function connectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://next1:cAuBBvW907wnb9lt@cluster0.3bfai.mongodb.net/events?retryWrites=true&w=majority')
    return client
}

async function insertDocument(client, document) {
    const db = client.db()         
    await db.collection('newsletter').insertOne(document)
}

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid email address'})
            return
        }
        // console.log(userEmail);
        // connect with mongodb

        let client

        try {
            client = await connectDatabase() 
        } catch (error) {
            res.status(500).json({message: 'Connecting to the database failed!'})
            return
        }
        
        try {
            await insertDocument(client, {email: userEmail})       
            client.close()
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed!'})
            return
        }

        res.status(201).json({message: 'Signed up!'})
    } 
}

export default handler