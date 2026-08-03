import { ObjectId } from "mongodb";
import { authenticate } from "../shopify.server";
import { success, error } from "../utils/apiResponse.server";
import {
  createColorScheme,
  getColorSchemes,
  getColorSchemeById,
  updateColorScheme,
  deleteColorScheme,
} from "../models/ColorScheme.server";

export async function loader({ request }) {
  //const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    if (!ObjectId.isValid(id)) {
      return error("Invalid ID", 400);
    }

    const colorScheme = await getColorSchemeById(id);

    if (!colorScheme) {
      return error("Color scheme not found", 404);
    }

    return success(
      colorScheme,
      "Color scheme fetched successfully"
    );
  }

  const colorSchemes = await getColorSchemes(session.shop);

  return success(colorSchemes,"Color schemes fetched successfully");  
}

export async function action({ request }) {
//   const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const body = await request.json();

  switch (request.method) {
    
    case "POST":
      const id = await createColorScheme({ 
        colorName: body.colorName,
        colorCode: body.colorCode,
        borderColor: body.borderColor,
        bgColor: body.bgColor,
        labelColor: body.labelColor,
        labelBgColor: body.labelBgColor,
        activeBorderColor: body.activeBorderColor,
        activeBgColor: body.activeBgColor,
        badgeColor: body.badgeColor,
        badgeBgColor: body.badgeBgColor,
        popularBadgeSvg: body.popularBadgeSvg,    
        status: body.status,
      });

      return success(null, "Color scheme created successfully");       

    case "PUT":

      // Check if ID is valid
      if (!ObjectId.isValid(body.id)) {
        return error("Invalid ID", 400);        
      }

      const updateResult = await updateColorScheme(body.id, {
        colorName: body.colorName,
        colorCode: body.colorCode,
        borderColor: body.borderColor,
        bgColor: body.bgColor,
        labelColor: body.labelColor,
        labelBgColor: body.labelBgColor,
        activeBorderColor: body.activeBorderColor,
        activeBgColor: body.activeBgColor,
        badgeColor: body.badgeColor,
        badgeBgColor: body.badgeBgColor,
        popularBadgeSvg: body.popularBadgeSvg,    
        status: body.status,
      });

      // Check if document exists
      if (updateResult.matchedCount === 0) {
        return error("Color scheme not found", 400);         
      }

      return success(null,"Color scheme updated successfully");     

    case "DELETE":

      if (!ObjectId.isValid(body.id)) {
        return error("Invalid ID", 400);           
      }

      const result = await deleteColorScheme(body.id);

      if (result.deletedCount === 0) {
        return error("Color scheme not found.", 400);
      }

      return success(null,"Color scheme deleted successfully");       

    default:
      return error("Method Not Allowed", 405);      
  }
}