import { MongoClient } from 'mongodb'

export async function connectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://next1:cAuBBvW907wnb9lt@cluster0.3bfai.mongodb.net/events?retryWrites=true&w=majority')
    return client
}

export async function insertDocument(client, collection, document) {
    const db = client.db()         
    const result = await db.collection(collection).insertOne(document)
    return result
}

export async function getAllDocuments(client, collection, sort) {
    const db = client.db()

    const documents = await db
        .collection(collection)
        .find()
        .sort(sort) // { _id: -1 } the latest comment will be on the top
        .toArray()

    return documents
}