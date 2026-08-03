import { ObjectId } from "mongodb";
import { getDB } from "../db.server";

const COLLECTION = "bundle_types";

export async function createBundleType(data) {
  const db = await getDB();

  const result = await db.collection(COLLECTION).insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result;
}

export async function getBundleTypes(shop) {
  const db = await getDB();
  return db.collection(COLLECTION)
    .find({status: 1,})
    .sort({ displayOrder: 1 })
    .toArray();
}

export async function getBundleTypeById(id) {
  const db = await getDB();

  return db.collection(COLLECTION).findOne({
    _id: new ObjectId(id),
  });
}

export async function updateBundleType(id, data) {
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

export async function deleteBundleType(id) {
  const db = await getDB();
  
  return db.collection(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  });
}