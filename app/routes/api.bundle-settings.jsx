import { ObjectId } from "mongodb";
import { authenticate } from "../shopify.server";
import { success, error } from "../utils/apiResponse.server";
import {
  createBundleSetting,
  getBundleSettingsByShop,
  getBundleSetting,
  getBundleSettingById,
  updateBundleSetting,
  deleteBundleSetting

} from "../models/BundleSetting.server";

export async function loader({ request }) {
  //const { session } = await authenticate.admin(request);

  const session = {
      shop: "bundle-store-lbzpplvx.myshopify.com",
  };

  const bundleSettings = await getBundleSetting(id);

  return success(bundleSettings,"Bundle settings fetched successfully");  
}

export async function action({ request }) {
//   const { session } = await authenticate.admin(request);

    const session = {
        shop: "bundle-store-lbzpplvx.myshopify.com",
    };

    const body = await request.json();

    switch (request.method) {
        case "POST":

            const id = await createBundleSetting({ 
                bundleId: body.bundleId,
                blockTitle: body.blockTitle,
                discountName: body.discountName,
                visibleMarketList: body.visibleMarketList,
                excludedMarketList: body.excludedMarketList,
                excludeB2bCustomer: body.excludeB2bCustomer,
                discountAppliedByApp: body.discountAppliedByApp,
                startDate: body.startDate,
                startTime: body.startTime,
                requireVariantSelection: body.requireVariantSelection,
                showVariantSelectionSingleDeal: body.showVariantSelectionSingleDeal,
                themeVariantPicker: body.themeVariantPicker,
                unavailableVariantOptions: body.unavailableVariantOptions,
                disableOtherProductUpdates: body.disableOtherProductUpdates,
                showPricePerItem: body.showPricePerItem,
                showCompareAtPrice: body.showCompareAtPrice,
                priceWithoutDecimal: body.priceWithoutDecimal,
                priceRounded: body.priceRounded,
                updateThemeProductPrice: body.updateThemeProductPrice,
                skipCart: body.skipCart,
                lowStockAlert: body.lowStockAlert,
            });

            return success(null, "Bundle settings created successfully");       

        case "PUT":

            // Check if ID is valid
            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);        
            }

            const updateResult = await updateBundleSetting(body.id, {
                bundleId: body.bundleId,
                blockTitle: body.blockTitle,
                discountName: body.discountName,
                visibleMarketList: body.visibleMarketList,
                excludedMarketList: body.excludedMarketList,
                excludeB2bCustomer: body.excludeB2bCustomer,
                discountAppliedByApp: body.discountAppliedByApp,
                startDate: body.startDate,
                startTime: body.startTime,
                requireVariantSelection: body.requireVariantSelection,
                showVariantSelectionSingleDeal: body.showVariantSelectionSingleDeal,
                themeVariantPicker: body.themeVariantPicker,
                unavailableVariantOptions: body.unavailableVariantOptions,
                disableOtherProductUpdates: body.disableOtherProductUpdates,
                showPricePerItem: body.showPricePerItem,
                showCompareAtPrice: body.showCompareAtPrice,
                priceWithoutDecimal: body.priceWithoutDecimal,
                priceRounded: body.priceRounded,
                updateThemeProductPrice: body.updateThemeProductPrice,
                skipCart: body.skipCart,
                lowStockAlert: body.lowStockAlert,
            });

            // Check if document exists
            if (updateResult.matchedCount === 0) {
                return error("Bundle settings not found", 400);         
            }

            return success(null,"Bundle settings updated successfully");     

        case "DELETE":

            if (!ObjectId.isValid(body.id)) {
                return error("Invalid ID", 400);           
            }

            const result = await deleteBundleSetting(body.id);

            if (result.deletedCount === 0) {
                return error("Bundle settings not found.", 400);
            }

            return success(null,"Bundle settings deleted successfully");       

        default:

            return error("Method Not Allowed", 405);      
    }
}