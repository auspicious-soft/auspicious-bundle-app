import { ObjectId } from "mongodb";
import { authenticate } from "../shopify.server";
import { success, error } from "../utils/apiResponse.server";
import {
  createBar,
  getBars,
  updateBar,
  deleteBar

} from "../models/BarDetail.server";

export async function loader({ request }) {
  //const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const bars = await getBars(id);

  return success(bars,"Bars fetched successfully");  
}

export async function action({ request }) {
//   const { session } = await authenticate.admin(request);

    const session = {
        shop: "bundle-store-lbzpplvx.myshopify.com",
    };

    const body = await request.json();

    switch (request.method) {
        case "POST":

            const id = await createBar({ 
                bundleId: body.bundleId,
                barType: body.barType,
                quantity: body.quantity,
                buyQuantity: body.buyQuantity,
                getQuantity: body.getQuantity,
                priceType: body.priceType,
                fixedPrice: body.fixedPrice,
                itemDiscountPercentage: body.itemDiscountPercentage,
                itemDiscountAmount: body.itemDiscountAmount,
                buyFixedPrice: body.buyFixedPrice,
                buyItemDiscountPercentage: body.buyItemDiscountPercentage,
                buyItemDiscountAmount: body.buyItemDiscountAmount,
                getFixedPrice: body.getFixedPrice,
                getItemDiscountPercentage: body.getItemDiscountPercentage,
                getItemDiscountAmount: body.getItemDiscountAmount,
                title: body.title,
                subtitle: body.subtitle,
                badgeStyle: body.badgeStyle,
                badgeText: body.badgeText,
                badgeImage: body.badgeImage,
                labelText: body.labelText,
                enableQuantitySelector: body.enableQuantitySelector,
                defaultSelection: body.defaultSelection,
                image: body.image,
                highlights: body.highlights,
                enableSoldout: body.enableSoldout,
                soldoutTitle: body.soldoutTitle,
                soldoutOpacity: body.soldoutOpacity,
                soldoutBgColor: body.soldoutBgColor,
                soldoutTextColor: body.soldoutTextColor,
                soldoutFontSize: body.soldoutFontSize,
                status: body.status,
            });

            return success(null, "Bar created successfully");       

        case "PUT":

            // Check if ID is valid
            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);        
            }

            const updateResult = await updateBar(body.id, {
                bundleId: body.bundleId,
                barType: body.barType,
                quantity: body.quantity,
                buyQuantity: body.buyQuantity,
                getQuantity: body.getQuantity,
                priceType: body.priceType,
                fixedPrice: body.fixedPrice,
                itemDiscountPercentage: body.itemDiscountPercentage,
                itemDiscountAmount: body.itemDiscountAmount,
                buyFixedPrice: body.buyFixedPrice,
                buyItemDiscountPercentage: body.buyItemDiscountPercentage,
                buyItemDiscountAmount: body.buyItemDiscountAmount,
                getFixedPrice: body.getFixedPrice,
                getItemDiscountPercentage: body.getItemDiscountPercentage,
                getItemDiscountAmount: body.getItemDiscountAmount,
                title: body.title,
                subtitle: body.subtitle,
                badgeStyle: body.badgeStyle,
                badgeText: body.badgeText,
                badgeImage: body.badgeImage,
                labelText: body.labelText,
                enableQuantitySelector: body.enableQuantitySelector,
                defaultSelection: body.defaultSelection,
                image: body.image,
                highlights: body.highlights,
                enableSoldout: body.enableSoldout,
                soldoutTitle: body.soldoutTitle,
                soldoutOpacity: body.soldoutOpacity,
                soldoutBgColor: body.soldoutBgColor,
                soldoutTextColor: body.soldoutTextColor,
                soldoutFontSize: body.soldoutFontSize,
                status: body.status,
            });

            // Check if document exists
            if (updateResult.matchedCount === 0) {
                return error("Bar not found", 400);         
            }

            return success(null,"Bar updated successfully");     

        case "DELETE":

            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);           
            }

            const result = await deleteBar(body.id);

            if (result.deletedCount === 0) {
                return error("Bar not found.", 400);
            }

            return success(null,"Bar deleted successfully");       

        default:

            return error("Method Not Allowed", 405);      
    }
}