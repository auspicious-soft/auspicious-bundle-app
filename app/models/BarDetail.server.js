import { ObjectId } from "mongodb";
import { getDB } from "../db.server";

const COLLECTION = "bar_details";

export async function createBar(bundleId, data) {
  const db = await getDB();

  const result = await db.collection(COLLECTION).insertOne({
    bundleId: new ObjectId(bundleId),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result.insertedId;
}

export async function getBarsByShop(shop) {
  const db = await getDB();

  return db.collection(COLLECTION)
    .find({ shop })
    .toArray();
}

export async function getBars(bundleId) {
  const db = await getDB();

  return db.collection(COLLECTION).find({
   bundleId: new ObjectId(bundleId),
  })
  .toArray();
}

export async function getBarById(id) {
  const db = await getDB();

  return db.collection(COLLECTION).findOne({
    _id: new ObjectId(id),
  });
}

export async function updateBar(id, data) {
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

export async function deleteBar(id) {
  const db = await getDB();

  return db.collection(COLLECTION).deleteOne({
    $or: [
      { _id: new ObjectId(id) },
      { bundleId: new ObjectId(id) },
    ],
  });
}

