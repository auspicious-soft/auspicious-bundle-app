import { ObjectId } from "mongodb";
import { getDB } from "../db.server";

const COLLECTION = "color_schemes";

export async function createScheme(data) {
  const db = await getDB();

  const result = await db.collection(COLLECTION).insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result;
}

export async function getSchemes(shop) {
  const db = await getDB();

  return db.collection(COLLECTION)
    .find({ shop })
    .toArray();
}

export async function getSchemeById(id) {
  const db = await getDB();

  return db.collection(COLLECTION).findOne({
    _id: new ObjectId(id),
  });
}

export async function updateScheme(id, data) {
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

export async function deleteScheme(id) {
  const db = await getDB();

  return db.collection(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  });
}