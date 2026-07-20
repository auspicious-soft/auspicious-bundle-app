import { getDB } from "./db.server.js";

export default class MongoSessionStorage {

  async storeSession(session) {
    const db = await getDB();

    await db.collection("shopify-sessions").updateOne(
      { id: session.id },
      {
        $set: {
          id: session.id,
          shop: session.shop,
          state: session.state,
          isOnline: session.isOnline,
          scope: session.scope,
          expires: session.expires,
          accessToken: session.accessToken,          
          firstName:
            session.onlineAccessInfo?.associated_user?.first_name ?? null,
          lastName:
            session.onlineAccessInfo?.associated_user?.last_name ?? null,
          email: session.onlineAccessInfo?.associated_user?.email ?? null,
          accountOwner:
            session.onlineAccessInfo?.associated_user?.account_owner ?? false,
          locale:
            session.onlineAccessInfo?.associated_user?.locale ?? null,
          collaborator:
            session.onlineAccessInfo?.associated_user?.collaborator ?? false,
          emailVerified:
            session.onlineAccessInfo?.associated_user?.email_verified ?? false,
          refreshToken: session.refreshToken ?? null,
          refreshTokenExpires: session.refreshTokenExpires ?? null,
        },
      },
      { upsert: true }
    );

    return true;
  }

  async loadSession(id) {
    const db = await getDB();

    const data = await db.collection("sessions").findOne({ id });

    if (!data) return undefined;

    const session = new Session({
      id: data.id,
      shop: data.shop,
      state: data.state,
      isOnline: data.isOnline,
    });

    session.scope = data.scope;
    session.expires = data.expires;
    session.accessToken = data.accessToken;
    session.refreshToken = data.refreshToken;
    session.refreshTokenExpires = data.refreshTokenExpires;

    if (data.userId) {
      session.onlineAccessInfo = {
        associated_user: {
          id: data.userId,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          account_owner: data.accountOwner,
          locale: data.locale,
          collaborator: data.collaborator,
          email_verified: data.emailVerified,
        },
      };
    }

    return session;
  }

  async deleteSession(id) {
    const db = await getDB();

    await db.collection("sessions").deleteOne({ id });

    return true;
  }

  async deleteSessions(ids) {
    const db = await getDB();

    await db.collection("sessions").deleteMany({
      id: { $in: ids },
    });

    return true;
  }

  async findSessionsByShop(shop) {
    const db = await getDB();

    return await db.collection("sessions").find({
      shop,
    }).toArray();
  }
}