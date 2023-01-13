const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

class MongoCRUD {
  constructor(url, dbName, collectionName) {
    this.url = url;
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      const result = await this.collection.insertOne(data);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async read(query = {}) {
    try {
      const result = await this.collection.find(query).toArray();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(query = {}, data) {
    try {
      const result = await this.collection.updateOne(query, { $set: data });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(query = {}) {
    try {
      const result = await this.collection.deleteOne(query);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MongoCRUD;