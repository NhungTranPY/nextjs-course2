import {connectDatabase, insertDocument, getAllDocuments} from '../../../helpers/db-util'

async function handler(req, res) {

    const eventId = req.query.eventId

    let client

    try {
        client = await connectDatabase()
    } catch (error) {
        res.status(500).json({message: 'Connecting to the database failed!'})
        return
    }   

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
            client.close()
            return
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        let result

        try {
            result = await insertDocument(client, 'comments', newComment)
            newComment._id = result.insertedId
            res.status(201).json({message: 'Added comments.', comment: newComment})
        } catch (error) {
            res.status(500).json({message: 'Inserting comment failed!'})
        }
    }
    
    if (req.method === 'GET') {

        try {
            documents = await getAllDocuments(client, 'comments', { _id: -1 }) // { _id: -1 } the latest comment will be on the top
            res.status(200).json({comments: documents})
        } catch (error) {
            res.status(500).json({message: 'Getting comments failed.'})
        }
    }

    client.close()
}

export default handler