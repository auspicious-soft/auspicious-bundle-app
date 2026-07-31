import { ObjectId } from "mongodb";
import { getDB } from "../db.server";

const COLLECTION = "color_schemes";

export async function createColorScheme(data) {
  const db = await getDB();

  const result = await db.collection(COLLECTION).insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result;
}

export async function getColorSchemes(shop) {
  const db = await getDB();

  return db.collection(COLLECTION)
    .find({})
    .sort({ type_name: 1 })
    .toArray();
}

export async function getColorSchemeById(id) {
  const db = await getDB();

  return db.collection(COLLECTION).findOne({
    _id: new ObjectId(id),
  });
}

export async function updateColorScheme(id, data) {
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

export async function deleteColorScheme(id) {
  const db = await getDB();

  return db.collection(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  });
}