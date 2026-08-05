import { ObjectId } from "mongodb";
import { getDB } from "../db.server";

const COLLECTION = "bundle_styles";

export async function createBundleStyle(bundleId, data) {
  const db = await getDB();

  const result = await db.collection(COLLECTION).insertOne({
    bundleId: new ObjectId(bundleId),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result.insertedId;
}

export async function getBundleStyleByShop(shop) {
  const db = await getDB();

  return db.collection(COLLECTION)
    .find({ shop })
    .toArray();
}

export async function getBundleStyle(bundleId) {
  const db = await getDB();

  return db.collection(COLLECTION).findOne({
   bundleId: new ObjectId(bundleId),
  });
}

export async function getBundleStyleById(id) {
  const db = await getDB();

  return db.collection(COLLECTION).findOne({
    _id: new ObjectId(id),
  });
}

export async function updateBundleStyle(id, data) {
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

export async function updateBundleStyleByBundleId(bundleId, data) {
  const db = await getDB();

  return db.collection(COLLECTION).updateOne(
    {
      bundleId: new ObjectId(bundleId),
    },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    }
  );
}

export async function deleteBundleStyle(id) {
  const db = await getDB();

  return db.collection(COLLECTION).deleteOne({
    _id: new ObjectId(id), 
  });
}

export async function deleteBundleStyleByBundle(bundleId) {
  const db = await getDB();

  return db.collection(COLLECTION).deleteOne({
    bundleId: new ObjectId(bundleId),
  });
}

