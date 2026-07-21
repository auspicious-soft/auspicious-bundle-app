import { ObjectId } from "mongodb";
import { getDB } from "../db.server";

const COLLECTION = "bundle_details";

export async function createBundle(data) {
  const db = await getDB();

  const result = await db.collection(COLLECTION).insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return insertedId;
}

export async function getBundle(shop) {
  const db = await getDB();

  return db.collection(COLLECTION)
    .find({ shop })
    .toArray();
}

export async function getBundleById(id) {
  const db = await getDB();

  return db.collection(COLLECTION).findOne({
    _id: new ObjectId(id),
  });
}

export async function updateBundle(id, data) {
  const db = await getDB();

  return db.collection(COLLECTION).updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    }
  );
}

export async function deleteBundle(id) {
  const db = await getDB();

  return db.collection(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  });
}