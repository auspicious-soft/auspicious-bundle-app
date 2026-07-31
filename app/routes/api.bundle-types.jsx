import { ObjectId } from "mongodb";
import { authenticate } from "../shopify.server";
import { success, error } from "../utils/apiResponse.server";
import {
  createBundleType,
  getBundleTypes,
  updateBundleType,
  deleteBundleType,
} from "../models/BundleType.server";

export async function loader({ request }) {
  //const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const bundleTypes = await getBundleTypes(session.shop);

  return success(bundleTypes,"Bundle types fetched successfully");  
}

export async function action({ request }) {
//   const { session } = await authenticate.admin(request);

    const session = {
        shop: "bundle-store-lbzpplvx.myshopify.com",
    };

  const body = await request.json();

  switch (request.method) {
    case "POST":
      const id = await createBundleType({ 
        typeName: body.typeName,
        typeDescription: body.typeDescription,
        typeSlug: body.typeSlug,
        displayOrder: body.displayOrder,
        status: body.status,
      });

      return success(null, "Bundle type created successfully");       

    case "PUT":

      // Check if ID is valid
      if (!ObjectId.isValid(body.id)) {
        return error("Invalid ID", 400);        
      }

      const updateResult = await updateBundleType(body.id, {
        typeName: body.typeName,
        typeDescription: body.typeDescription,
        typeSlug: body.typeSlug,
        displayOrder: body.displayOrder,
        status: body.status,
      });

      // Check if document exists
      if (updateResult.matchedCount === 0) {
        return error("Bundle type not found", 400);         
      }

      return success(null,"Bundle type updated successfully");     

    case "DELETE":

      if (!ObjectId.isValid(body.id)) {
        return error("Invalid ID", 400);           
      }

      const result = await deleteBundleType(body.id);

      if (result.deletedCount === 0) {
        return error("Bundle type not found.", 400);
      }

      return success(null,"Bundle type deleted successfully");       

    default:
      return error("Method Not Allowed", 405);      
  }
}