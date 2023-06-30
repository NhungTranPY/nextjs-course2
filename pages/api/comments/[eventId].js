import {MongoClient} from 'mongodb'

async function handler(req, res) {

    const eventId = req.query.eventId

    const client = await MongoClient.connect('mongodb+srv://next1:cAuBBvW907wnb9lt@cluster0.3bfai.mongodb.net/events?retryWrites=true&w=majority')

    if (req.method === 'POST') {
        const { email, name, text } = req.body

        if (
            !email.includes('@') || 
            !name || 
            name.strim() === '' || 
            !text || 
            text.trim() === ''
        ) {
            res.status(422).json({message: 'Invalid input'})
            return
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        // console.log(newComment);
        const db = client.db()

        const result = await db.collection('comments').insertOne(newComment)

        console.log(result);

        newComment.id = result.insertedId

        res.status(201).json({message: 'Added comments.', comment: newComment})
    }
    
    if (req.method === 'GET') {
        const dummyList = [
            { id: 'c1', name: 'Nina1', text: 'A first comment!' },
            { id: 'c2', name: 'Nina2', text: 'A second comment!' }
        ]
        res.status(200).json({comments: dummyList})
    }

    client.close()
}

export default handler