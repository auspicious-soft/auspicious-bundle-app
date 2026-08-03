import { ObjectId } from "mongodb";
import { authenticate } from "../shopify.server";
import { success, error } from "../utils/apiResponse.server";
import {
  createBundle,
  getBundles,
  getBundleById,
  updateBundle,
  deleteBundle,  
} from "../models/BundleDetail.server";

export async function loader({ request }) {
  //const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const bundles = await getBundles(session.shop);

  return success(bundles,"Bundles fetched successfully");  
}

export async function action({ request }) {
//   const { session } = await authenticate.admin(request);

    const session = {
        shop: "bundle-store-lbzpplvx.myshopify.com",
    };

    const body = await request.json();

    switch (request.method) {
        case "POST":

            const id = await createBundle({ 
                shop: body.shop,
                bundleType: body.bundleType,
                colorScheme: body.colorScheme,
                bundleName: body.bundleName,
                status: body.status,
            });

            return success(null, "Bundle created successfully");       

        case "PUT":

            // Check if ID is valid
            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);        
            }

            const updateResult = await updateBundle(body.id, {
                shop: body.shop,
                bundleType: body.bundleType,
                colorScheme: body.colorScheme,
                bundleName: body.bundleName,
                status: body.status,
            });

            // Check if document exists
            if (updateResult.matchedCount === 0) {
                return error("Bundle not found", 400);         
            }

            return success(null,"Bundle updated successfully");     

        case "DELETE":

            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);           
            }

            const result = await deleteBundle(body.id);

            if (result.deletedCount === 0) {
                return error("Bundle not found.", 400);
            }

            return success(null,"Bundle deleted successfully");       

        default:

            return error("Method Not Allowed", 405);      
    }
}