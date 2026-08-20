import { ObjectId } from "mongodb";
import { success, error } from "../utils/apiResponse.server";

import {
  createBundle,
  getBundleById,
} from "../models/BundleDetail.server";

import {
  getBundleProduct,
  createBundleProduct,
} from "../models/BundleProduct.server";

import {
  getBundleSetting,
  createBundleSetting,
} from "../models/BundleSetting.server";

import {
  getBundleStyle,
  createBundleStyle,
} from "../models/BundleStyle.server";

import {
  getBars,
  createBar,
} from "../models/BarDetail.server";

import {
  getBarProducts,
  createBarProducts,
} from "../models/BarProduct.server";

export async function action({ request }) {
  if (request.method !== "POST") {
    return error("Method Not Allowed", 405);
  }

  try {
    const body = await request.json();

    const sourceBundleId = body.id;

    if (!sourceBundleId) {
      return error("Bundle id is required", 400);
    }

    if (!ObjectId.isValid(sourceBundleId)) {
      return error("Invalid bundle id", 400);
    }

    /*
     * ---------------------------------------------------------
     * 1. Get existing bundle
     * ---------------------------------------------------------
     */

    const existingBundle = await getBundleById(sourceBundleId);

    if (!existingBundle) {
      return error("Bundle not found", 404);
    }

    /*
     * ---------------------------------------------------------
     * 2. Get all related bundle data
     * ---------------------------------------------------------
     */

    const existingProducts = await getBundleProduct(sourceBundleId);

    const existingSettings = await getBundleSetting(sourceBundleId);

    const existingStyles = await getBundleStyle(sourceBundleId);

    const existingBars = await getBars(sourceBundleId);

    /*
     * Get products for every bar
     */

    for (const bar of existingBars) {
      bar.products = await getBarProducts(bar._id);
    }

    /*
     * ---------------------------------------------------------
     * 3. Create new bundle
     * ---------------------------------------------------------
     */

    const newBundleId = await createBundle({
      shop: existingBundle.shop,

      bundleType: existingBundle.bundleType,

      /*
       * Add "Copy" to the bundle name
       */
      bundleName: `${existingBundle.bundleName} Copy`,

      colorScheme: existingBundle.colorScheme,

      status: existingBundle.status,
    });

    /*
     * ---------------------------------------------------------
     * 4. Duplicate bundle products
     * ---------------------------------------------------------
     */

    if (existingProducts) {
      await createBundleProduct(newBundleId, {
        productList: existingProducts.productList || [],
        excludedProductList:
          existingProducts.excludedProductList || [],
        collectionList:
          existingProducts.collectionList || [],
        excludedCollectionList:
          existingProducts.excludedCollectionList || [],
      });
    }

    /*
     * ---------------------------------------------------------
     * 5. Duplicate bundle settings
     * ---------------------------------------------------------
     */

    if (existingSettings) {
      await createBundleSetting(newBundleId, {
        blockTitle: existingSettings.blockTitle,
        discountName: existingSettings.discountName,

        visibleMarketList:
          existingSettings.visibleMarketList || [],

        excludedMarketList:
          existingSettings.excludedMarketList || [],

        excludeB2bCustomer:
          existingSettings.excludeB2bCustomer,

        discountAppliedByApp:
          existingSettings.discountAppliedByApp,

        startDate: existingSettings.startDate,
        startTime: existingSettings.startTime,

        requireVariantSelection:
          existingSettings.requireVariantSelection,

        showVariantSelectionSingleDeal:
          existingSettings.showVariantSelectionSingleDeal,

        themeVariantPicker:
          existingSettings.themeVariantPicker,

        unavailableVariantOptions:
          existingSettings.unavailableVariantOptions,

        disableOtherProductUpdates:
          existingSettings.disableOtherProductUpdates,

        showPricePerItem:
          existingSettings.showPricePerItem,

        showCompareAtPrice:
          existingSettings.showCompareAtPrice,

        priceWithoutDecimal:
          existingSettings.priceWithoutDecimal,

        priceRounded:
          existingSettings.priceRounded,

        updateThemeProductPrice:
          existingSettings.updateThemeProductPrice,

        skipCart:
          existingSettings.skipCart,

        lowStockAlert:
          existingSettings.lowStockAlert,
      });
    }

    /*
     * ---------------------------------------------------------
     * 6. Duplicate bundle styles
     * ---------------------------------------------------------
     */

    if (existingStyles) {
      await createBundleStyle(newBundleId, {
        barsPerRow: existingStyles.barsPerRow,
        cornerRadius: existingStyles.cornerRadius,
        spacing: existingStyles.spacing,

        cardsBgColor: existingStyles.cardsBgColor,
        selectedBgColor: existingStyles.selectedBgColor,
        borderColor: existingStyles.borderColor,

        blockTitleColor: existingStyles.blockTitleColor,
        titleColor: existingStyles.titleColor,
        subtitleColor: existingStyles.subtitleColor,

        priceColor: existingStyles.priceColor,
        fullPriceColor: existingStyles.fullPriceColor,

        labelBgColor: existingStyles.labelBgColor,
        labelTextColor: existingStyles.labelTextColor,

        badgeBgColor: existingStyles.badgeBgColor,
        badgeTextColor: existingStyles.badgeTextColor,

        showPricePerItem:
          existingStyles.showPricePerItem,

        showCompareAtPrice:
          existingStyles.showCompareAtPrice,

        freeGiftBgColor:
          existingStyles.freeGiftBgColor,

        freeGiftTextColor:
          existingStyles.freeGiftTextColor,

        freeGiftSelectedBgColor:
          existingStyles.freeGiftSelectedBgColor,

        freeGiftSelectedTextColor:
          existingStyles.freeGiftSelectedTextColor,

        upsellBgColor:
          existingStyles.upsellBgColor,

        upsellTextColor:
          existingStyles.upsellTextColor,

        upsellSelectedBgColor:
          existingStyles.upsellSelectedBgColor,

        upsellSelectedTextColor:
          existingStyles.upsellSelectedTextColor,

        blockTitleFontSize:
          existingStyles.blockTitleFontSize,

        blockTitleFontStyle:
          existingStyles.blockTitleFontStyle,

        titleFontSize:
          existingStyles.titleFontSize,

        titleFontStyle:
          existingStyles.titleFontStyle,

        subtitleFontSize:
          existingStyles.subtitleFontSize,

        subtitleFontStyle:
          existingStyles.subtitleFontStyle,

        labelFontSize:
          existingStyles.labelFontSize,

        labelFontStyle:
          existingStyles.labelFontStyle,

        freeGiftFontSize:
          existingStyles.freeGiftFontSize,

        freeGiftFontStyle:
          existingStyles.freeGiftFontStyle,

        upsellFontSize:
          existingStyles.upsellFontSize,

        upsellFontStyle:
          existingStyles.upsellFontStyle,

        unitLabelFontSize:
          existingStyles.unitLabelFontSize,

        unitLabelFontStyle:
          existingStyles.unitLabelFontStyle,

        globalCustomStyle:
          existingStyles.globalCustomStyle,

        specificCustomStyle:
          existingStyles.specificCustomStyle,
      });
    }

    /*
     * ---------------------------------------------------------
     * 7. Duplicate bars
     * ---------------------------------------------------------
     */

    for (const bar of existingBars) {

      /*
       * IMPORTANT:
       * Do not use the old bar _id.
       *
       * createBar() generates a new bar ID.
       */

      const newBarId = await createBar(newBundleId, {
        barType: bar.barType,

        quantity: bar.quantity,

        buyQuantity: bar.buyQuantity,
        getQuantity: bar.getQuantity,

        priceType: bar.priceType,
        fixedPrice: bar.fixedPrice,

        itemDiscountPercentage:
          bar.itemDiscountPercentage,

        itemDiscountAmount:
          bar.itemDiscountAmount,

        buyFixedPrice:
          bar.buyFixedPrice,

        buyItemDiscountPercentage:
          bar.buyItemDiscountPercentage,

        buyItemDiscountAmount:
          bar.buyItemDiscountAmount,

        getFixedPrice:
          bar.getFixedPrice,

        getItemDiscountPercentage:
          bar.getItemDiscountPercentage,

        getItemDiscountAmount:
          bar.getItemDiscountAmount,

        title: bar.title,
        subtitle: bar.subtitle,

        badgeStyle: bar.badgeStyle,
        badgeText: bar.badgeText,
        badgeImage: bar.badgeImage,

        labelText: bar.labelText,

        enableQuantitySelector:
          bar.enableQuantitySelector,

        defaultSelection:
          bar.defaultSelection,

        image: bar.image,

        highlights: bar.highlights,

        enableSoldout:
          bar.enableSoldout,

        soldoutTitle:
          bar.soldoutTitle,

        soldoutOpacity:
          bar.soldoutOpacity,

        soldoutBgColor:
          bar.soldoutBgColor,

        soldoutTextColor:
          bar.soldoutTextColor,

        soldoutFontSize:
          bar.soldoutFontSize,

        status:
          bar.status,
      });

      /*
       * -------------------------------------------------------
       * Duplicate bar products
       * -------------------------------------------------------
       */

      if (bar.products?.length) {
        await createBarProducts(
          newBarId,
          bar.products
        );
      }
    }

    /*
     * ---------------------------------------------------------
     * 8. Return duplicated bundle
     * ---------------------------------------------------------
     */

    return success(
      {
        bundleId: newBundleId,
        sourceBundleId: sourceBundleId,
      },
      "Bundle duplicated successfully"
    );

  } catch (err) {

    console.error(
      "Duplicate bundle error:",
      err
    );

    return error(
      "Failed to duplicate bundle",
      500
    );
  }
}