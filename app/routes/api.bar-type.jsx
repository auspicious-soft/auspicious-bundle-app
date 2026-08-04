import { ObjectId } from "mongodb";
import { authenticate } from "../shopify.server";
import { success, error } from "../utils/apiResponse.server";
import {
  createBarType,
  getBarTypes,
  getBarTypeById,
  updateBarType,
  deleteBarType,
} from "../models/BarType.server";

export async function loader({ request }) {
  //const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const barTypes = await getBarTypes();

  return success(barTypes,"Bar types fetched successfully");  
}

export async function action({ request }) {
//   const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const body = await request.json();

  switch (request.method) {
    case "POST":
      const id = await createBarType({ 
        typeName: body.typeName,       
        typeSlug: body.typeSlug,
        status: body.status,
      });

      return success(null, "Bar type created successfully");       

    case "PUT":

      // Check if ID is valid
      if (!ObjectId.isValid(body.id)) {
        return error("Invalid ID", 400);        
      }

      const updateResult = await updateBarType(body.id, {
        typeName: body.typeName,       
        typeSlug: body.typeSlug,
        status: body.status,
      });

      // Check if document exists
      if (updateResult.matchedCount === 0) {
        return error("Bar type not found", 400);         
      }

      return success(null,"Bar type updated successfully");     

    case "DELETE":

      if (!ObjectId.isValid(body.id)) {
        return error("Invalid ID", 400);           
      }

      const result = await deleteBarType(body.id);

      if (result.deletedCount === 0) {
        return error("Bar type not found.", 400);
      }      

      return success(null,"Bar type deleted successfully");       

    default:
      return error("Method Not Allowed", 405);      
  }
}