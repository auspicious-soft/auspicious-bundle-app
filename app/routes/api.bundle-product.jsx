import { ObjectId } from "mongodb";
import { authenticate } from "../shopify.server";
import { success, error } from "../utils/apiResponse.server";
import {
  createBundleProduct,
  getBundleProductsByShop,
  getBundleProduct,
  getBundleProductById,
  updateBundleProduct,
  deleteBundleProduct, 

} from "../models/BundleProduct.server";

export async function loader({ request }) {
  //const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const bundleProducts = await getBundleProduct(id);

  return success(bundleProducts,"Bundle products fetched successfully");  
}

export async function action({ request }) {
//   const { session } = await authenticate.admin(request);

    const session = {
        shop: "bundle-store-lbzpplvx.myshopify.com",
    };

    const body = await request.json();

    switch (request.method) {
        case "POST":

            const id = await createBundleProduct({ 
                bundleId: body.bundleId,
                productList: body.productList,
                excludedProductList: body.excludedProductList,
                collectionList: body.collectionList,
                excludedCollectionList: body.excludedCollectionList,
            });

            return success(null, "Bundle products created successfully");       

        case "PUT":

            // Check if ID is valid
            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);        
            }

            const updateResult = await updateBundleProduct(body.id, {
                bundleId: body.bundleId,
                productList: body.productList,
                excludedProductList: body.excludedProductList,
                collectionList: body.collectionList,
                excludedCollectionList: body.excludedCollectionList,
            });

            // Check if document exists
            if (updateResult.matchedCount === 0) {
                return error("Bundle products not found", 400);         
            }

            return success(null,"Bundle products updated successfully");     

        case "DELETE":

            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);           
            }

            const result = await deleteBundleProduct(body.id);

            if (result.deletedCount === 0) {
                return error("Bundle products not found.", 400);
            }            

            return success(null,"Bundle products deleted successfully");       

        default:

            return error("Method Not Allowed", 405);      
    }
}