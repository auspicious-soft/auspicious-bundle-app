import { ObjectId } from "mongodb";
import { getDB } from "../db.server";

const COLLECTION = "bar_types";

export async function createBarType(data) {
  const db = await getDB();

  const result = await db.collection(COLLECTION).insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result;
}

export async function getBarTypes() {
  const db = await getDB();

  return db.collection(COLLECTION)
    .find({ status:1 })
    .toArray();
}

export async function getBarTypeById(id) {
  const db = await getDB();

  return db.collection(COLLECTION).findOne({
    _id: new ObjectId(id),
  });
}

export async function updateBarType(id, data) {
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

export async function deleteBarType(id) {
  const db = await getDB();

  return db.collection(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  });
}