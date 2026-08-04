import { ObjectId } from "mongodb";
import { authenticate } from "../shopify.server";
import { success, error } from "../utils/apiResponse.server";
import {
  createBundleStyle,
  getBundleStyleByShop,
  getBundleStyle,
  getBundleStyleById,
  updateBundleStyle,
  deleteBundleStyle

} from "../models/BundleStyle.server";

export async function loader({ request }) {
  //const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const bundleStyles = await getBundleStyle(id);

  return success(bundleStyles,"Bundle styles fetched successfully");  
}

export async function action({ request }) {
//   const { session } = await authenticate.admin(request);

    const session = {
        shop: "bundle-store-lbzpplvx.myshopify.com",
    };

    const body = await request.json();

    switch (request.method) {
        case "POST":

            const id = await createBundleStyle({ 
                bundleId: body.bundleId,
                barsPerRow: body.barsPerRow,
                cornerRadius: body.cornerRadius,
                spacing: body.spacing,
                cardsBgColor: body.cardsBgColor,
                selectedBgColor: body.selectedBgColor,
                borderColor: body.borderColor,
                blockTitleColor: body.blockTitleColor,
                titleColor: body.titleColor,
                subtitleColor: body.subtitleColor,
                priceColor: body.priceColor,
                fullPriceColor: body.fullPriceColor,
                labelBgColor: body.labelBgColor,
                labelTextColor: body.labelTextColor,
                badgeBgColor: body.badgeBgColor,
                badgeTextColor: body.badgeTextColor,
                showPricePerItem: body.showPricePerItem,
                showCompareAtPrice: body.showCompareAtPrice,
                freeGiftBgColor: body.freeGiftBgColor,
                freeGiftTextColor: body.freeGiftTextColor,
                freeGiftSelectedBgColor: body.freeGiftSelectedBgColor,
                freeGiftSelectedTextColor: body.freeGiftSelectedTextColor,
                upsellBgColor: body.upsellBgColor,
                upsellTextColor: body.upsellTextColor,
                upsellSelectedBgColor: body.upsellSelectedBgColor,
                upsellSelectedTextColor: body.upsellSelectedTextColor,
                blockTitleFontSize: body.blockTitleFontSize,
                blockTitleFontStyle: body.blockTitleFontStyle,
                titleFontSize: body.titleFontSize,
                titleFontStyle: body.titleFontStyle,
                subtitleFontSize: body.subtitleFontSize,
                subtitleFontStyle: body.subtitleFontStyle,
                labelFontSize: body.labelFontSize,
                labelFontStyle: body.labelFontStyle,
                freeGiftFontSize: body.freeGiftFontSize,
                freeGiftFontStyle: body.freeGiftFontStyle,
                upsellFontSize: body.upsellFontSize,
                upsellFontStyle: body.upsellFontStyle,
                unitLabelFontSize: body.unitLabelFontSize,
                unitLabelFontStyle: body.unitLabelFontStyle,
                globalCustomStyle: body.globalCustomStyle,
                specificCustomStyle: body.specificCustomStyle,
            });

            return success(null, "Bundle styles created successfully");       

        case "PUT":

            // Check if ID is valid
            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);        
            }

            const updateResult = await updateBundleStyle(body.id, {
                bundleId: body.bundleId,
                barsPerRow: body.barsPerRow,
                cornerRadius: body.cornerRadius,
                spacing: body.spacing,
                cardsBgColor: body.cardsBgColor,
                selectedBgColor: body.selectedBgColor,
                borderColor: body.borderColor,
                blockTitleColor: body.blockTitleColor,
                titleColor: body.titleColor,
                subtitleColor: body.subtitleColor,
                priceColor: body.priceColor,
                fullPriceColor: body.fullPriceColor,
                labelBgColor: body.labelBgColor,
                labelTextColor: body.labelTextColor,
                badgeBgColor: body.badgeBgColor,
                badgeTextColor: body.badgeTextColor,
                showPricePerItem: body.showPricePerItem,
                showCompareAtPrice: body.showCompareAtPrice,
                freeGiftBgColor: body.freeGiftBgColor,
                freeGiftTextColor: body.freeGiftTextColor,
                freeGiftSelectedBgColor: body.freeGiftSelectedBgColor,
                freeGiftSelectedTextColor: body.freeGiftSelectedTextColor,
                upsellBgColor: body.upsellBgColor,
                upsellTextColor: body.upsellTextColor,
                upsellSelectedBgColor: body.upsellSelectedBgColor,
                upsellSelectedTextColor: body.upsellSelectedTextColor,
                blockTitleFontSize: body.blockTitleFontSize,
                blockTitleFontStyle: body.blockTitleFontStyle,
                titleFontSize: body.titleFontSize,
                titleFontStyle: body.titleFontStyle,
                subtitleFontSize: body.subtitleFontSize,
                subtitleFontStyle: body.subtitleFontStyle,
                labelFontSize: body.labelFontSize,
                labelFontStyle: body.labelFontStyle,
                freeGiftFontSize: body.freeGiftFontSize,
                freeGiftFontStyle: body.freeGiftFontStyle,
                upsellFontSize: body.upsellFontSize,
                upsellFontStyle: body.upsellFontStyle,
                unitLabelFontSize: body.unitLabelFontSize,
                unitLabelFontStyle: body.unitLabelFontStyle,
                globalCustomStyle: body.globalCustomStyle,
                specificCustomStyle: body.specificCustomStyle,
            });

            // Check if document exists
            if (updateResult.matchedCount === 0) {
                return error("Bundle styles not found", 400);         
            }

            return success(null,"Bundle styles updated successfully");     

        case "DELETE":

            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);           
            }

            const result = await deleteBundleStyle(body.id);

            if (result.deletedCount === 0) {
                return error("Bundle styles not found.", 400);
            }

            return success(null,"Bundle styles deleted successfully");       

        default:

            return error("Method Not Allowed", 405);      
    }
}