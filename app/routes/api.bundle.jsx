import { ObjectId } from "mongodb";
import { authenticate } from "../shopify.server";
import { success, error } from "../utils/apiResponse.server";

import {
  createBundle,
  getBundleById,
  updateBundle,
  deleteBundle,
} from "../models/BundleDetail.server";

import {
  createBundleProduct,
  getBundleProduct,
  updateBundleProductByBundleId,
  deleteBundleProductByBundle,
} from "../models/BundleProduct.server";

import {
  createBundleSetting,
  getBundleSetting,
  updateBundleSettingByBundleId,
  deleteBundleSettingByBundle,
} from "../models/BundleSetting.server";

import {
  createBundleStyle,
  getBundleStyle,
  updateBundleStyleByBundleId,
  deleteBundleStyleByBundle,
} from "../models/BundleStyle.server";

import {
  createBar,
  getBars,
  updateBar,
  deleteBarsByBundle
} from "../models/BarDetail.server";

export async function loader({ request }) {
    // const { session } = await authenticate.admin(request);

    const session = {
        shop: "bundle-store-lbzpplvx.myshopify.com",
    };

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
        return error("Bundle id is required", 400);
    }

    if (!ObjectId.isValid(id)) {
        return error("Invalid bundle id", 400);
    }

    const detail = await getBundleById(id);

    if (!detail) {
        return error("Bundle not found", 404);
    }

    const products = await getBundleProduct(id);
    const settings = await getBundleSetting(id);
    const styles = await getBundleStyle(id);
    const bars = await getBars(id);

    for (const bar of bars) {
        bar.products = await getBarProducts(bar._id);
    }

    return success(
        {
        detail,
        products,
        settings,
        styles,
        bars
        },
        "Bundle fetched successfully"
    );
}

export async function action({ request }) {

    // const { session } = await authenticate.admin(request);

    const session = {
        shop: "bundle-store-lbzpplvx.myshopify.com",
    };

    const body = await request.json();

    switch (request.method) {

        case "POST": {

            const bundleId = await createBundle({
                shop: session.shop,
                bundleType: body.bundleType,
                bundleName: body.bundleName,
                colorScheme: body.colorScheme,
                status: body.status,
            });

            if (body.products) {

                await createBundleProduct(bundleId,{
                    productList: body.products.productList,
                    excludedProductList: body.products.excludedProductList,
                    collectionList: body.products.collectionList,
                    excludedCollectionList: body.products.excludedCollectionList,
                });
            }

            if (body.settings) {
                await createBundleSetting(bundleId, {
                    blockTitle: body.settings.blockTitle,
                    discountName: body.settings.discountName,
                    visibleMarketList: body.settings.visibleMarketList,
                    excludedMarketList: body.settings.excludedMarketList,
                    excludeB2bCustomer: body.settings.excludeB2bCustomer,
                    discountAppliedByApp: body.settings.discountAppliedByApp,
                    startDate: body.settings.startDate,
                    startTime: body.settings.startTime,
                    requireVariantSelection: body.settings.requireVariantSelection,
                    showVariantSelectionSingleDeal: body.settings.showVariantSelectionSingleDeal,
                    themeVariantPicker: body.settings.themeVariantPicker,
                    unavailableVariantOptions: body.settings.unavailableVariantOptions,
                    disableOtherProductUpdates: body.settings.disableOtherProductUpdates,
                    showPricePerItem: body.settings.showPricePerItem,
                    showCompareAtPrice: body.settings.showCompareAtPrice,
                    priceWithoutDecimal: body.settings.priceWithoutDecimal,
                    priceRounded: body.settings.priceRounded,
                    updateThemeProductPrice: body.settings.updateThemeProductPrice,
                    skipCart: body.settings.skipCart,
                    lowStockAlert: body.settings.lowStockAlert,
                });
            }

            if (body.styles) {
                await createBundleStyle(bundleId, {                   
                    barsPerRow: body.styles.barsPerRow,
                    cornerRadius: body.styles.cornerRadius,
                    spacing: body.styles.spacing,
                    cardsBgColor: body.styles.cardsBgColor,
                    selectedBgColor: body.styles.selectedBgColor,
                    borderColor: body.styles.borderColor,
                    blockTitleColor: body.styles.blockTitleColor,
                    titleColor: body.styles.titleColor,
                    subtitleColor: body.styles.subtitleColor,
                    priceColor: body.styles.priceColor,
                    fullPriceColor: body.styles.fullPriceColor,
                    labelBgColor: body.styles.labelBgColor,
                    labelTextColor: body.styles.labelTextColor,
                    badgeBgColor: body.styles.badgeBgColor,
                    badgeTextColor: body.styles.badgeTextColor,
                    showPricePerItem: body.styles.showPricePerItem,
                    showCompareAtPrice: body.styles.showCompareAtPrice,
                    freeGiftBgColor: body.styles.freeGiftBgColor,
                    freeGiftTextColor: body.styles.freeGiftTextColor,
                    freeGiftSelectedBgColor: body.styles.freeGiftSelectedBgColor,
                    freeGiftSelectedTextColor: body.styles.freeGiftSelectedTextColor,
                    upsellBgColor: body.styles.upsellBgColor,
                    upsellTextColor: body.styles.upsellTextColor,
                    upsellSelectedBgColor: body.styles.upsellSelectedBgColor,
                    upsellSelectedTextColor: body.styles.upsellSelectedTextColor,
                    blockTitleFontSize: body.styles.blockTitleFontSize,
                    blockTitleFontStyle: body.styles.blockTitleFontStyle,
                    titleFontSize: body.styles.titleFontSize,
                    titleFontStyle: body.styles.titleFontStyle,
                    subtitleFontSize: body.styles.subtitleFontSize,
                    subtitleFontStyle: body.styles.subtitleFontStyle,
                    labelFontSize: body.styles.labelFontSize,
                    labelFontStyle: body.styles.labelFontStyle,
                    freeGiftFontSize: body.styles.freeGiftFontSize,
                    freeGiftFontStyle: body.styles.freeGiftFontStyle,
                    upsellFontSize: body.styles.upsellFontSize,
                    upsellFontStyle: body.styles.upsellFontStyle,
                    unitLabelFontSize: body.styles.unitLabelFontSize,
                    unitLabelFontStyle: body.styles.unitLabelFontStyle,
                    globalCustomStyle: body.styles.globalCustomStyle,
                    specificCustomStyle: body.styles.specificCustomStyle,
                });
            }

            if (body.bars) {
                // Bars
                for (const bar of body.bars) {

                    const barId = await createBar(bundleId,{                       
                        barType: bar.barType,
                        quantity: bar.quantity,
                        buyQuantity: bar.buyQuantity,
                        getQuantity: bar.getQuantity,
                        priceType: bar.priceType,
                        fixedPrice: bar.fixedPrice,
                        itemDiscountPercentage: bar.itemDiscountPercentage,
                        itemDiscountAmount: bar.itemDiscountAmount,
                        buyFixedPrice: bar.buyFixedPrice,
                        buyItemDiscountPercentage: bar.buyItemDiscountPercentage,
                        buyItemDiscountAmount: bar.buyItemDiscountAmount,
                        getFixedPrice: bar.getFixedPrice,
                        getItemDiscountPercentage: bar.getItemDiscountPercentage,
                        getItemDiscountAmount: bar.getItemDiscountAmount,
                        title: bar.title,
                        subtitle: bar.subtitle,
                        badgeStyle: bar.badgeStyle,
                        badgeText: bar.badgeText,
                        badgeImage: bar.badgeImage,
                        labelText: bar.labelText,
                        enableQuantitySelector: bar.enableQuantitySelector,
                        defaultSelection: bar.defaultSelection,
                        image: bar.image,
                        highlights: bar.highlights,
                        enableSoldout: bar.enableSoldout,
                        soldoutTitle: bar.soldoutTitle,
                        soldoutOpacity: bar.soldoutOpacity,
                        soldoutBgColor: bar.soldoutBgColor,
                        soldoutTextColor: bar.soldoutTextColor,
                        soldoutFontSize: bar.soldoutFontSize,
                        status: bar.status,
                    });

                    if (bar.products?.length) {
                        await createBarProducts(barId, bar.products);
                    }
                }
            }
            return success(
                { bundleId },
                "Bundle created successfully"
            );
        }
        case "PUT": {

            if (!ObjectId.isValid(body.id)) {
                return error("Invalid bundle id", 400);
            }

            // Delete bars that were removed from the frontend
            
            const existingBars = await getBars(body.id);

            const incomingIds = body.bars
                .filter(bar => bar.id)
                .map(bar => bar.id.toString());

            for (const existing of existingBars) {
                if (!incomingIds.includes(existing._id.toString())) {
                    await deleteBar(existing._id.toString());
                }
            }

            await updateBundle(body.id, {
                shop: session.shop,
                bundleType: body.bundleType,
                bundleName: body.bundleName,
                colorScheme: body.colorScheme,
                status: body.status,
            });

            if (body.products) {
                await updateBundleProductByBundleId(body.id, {
                    productList: body.products.productList,
                    excludedProductList: body.products.excludedProductList,
                    collectionList: body.products.collectionList,
                    excludedCollectionList: body.products.excludedCollectionList,
                });
            }

            if (body.settings) {
                await updateBundleSettingByBundleId(body.id, {
                    blockTitle: body.settings.blockTitle,
                    discountName: body.settings.discountName,
                    visibleMarketList: body.settings.visibleMarketList,
                    excludedMarketList: body.settings.excludedMarketList,
                    excludeB2bCustomer: body.settings.excludeB2bCustomer,
                    discountAppliedByApp: body.settings.discountAppliedByApp,
                    startDate: body.settings.startDate,
                    startTime: body.settings.startTime,
                    requireVariantSelection: body.settings.requireVariantSelection,
                    showVariantSelectionSingleDeal: body.settings.showVariantSelectionSingleDeal,
                    themeVariantPicker: body.settings.themeVariantPicker,
                    unavailableVariantOptions: body.settings.unavailableVariantOptions,
                    disableOtherProductUpdates: body.settings.disableOtherProductUpdates,
                    showPricePerItem: body.settings.showPricePerItem,
                    showCompareAtPrice: body.settings.showCompareAtPrice,
                    priceWithoutDecimal: body.settings.priceWithoutDecimal,
                    priceRounded: body.settings.priceRounded,
                    updateThemeProductPrice: body.settings.updateThemeProductPrice,
                    skipCart: body.settings.skipCart,
                    lowStockAlert: body.settings.lowStockAlert,
                });
            }

            if (body.styles) {
                await updateBundleStyleByBundleId(body.id, {
                    barsPerRow: body.styles.barsPerRow,
                    cornerRadius: body.styles.cornerRadius,
                    spacing: body.styles.spacing,
                    cardsBgColor: body.styles.cardsBgColor,
                    selectedBgColor: body.styles.selectedBgColor,
                    borderColor: body.styles.borderColor,
                    blockTitleColor: body.styles.blockTitleColor,
                    titleColor: body.styles.titleColor,
                    subtitleColor: body.styles.subtitleColor,
                    priceColor: body.styles.priceColor,
                    fullPriceColor: body.styles.fullPriceColor,
                    labelBgColor: body.styles.labelBgColor,
                    labelTextColor: body.styles.labelTextColor,
                    badgeBgColor: body.styles.badgeBgColor,
                    badgeTextColor: body.styles.badgeTextColor,
                    showPricePerItem: body.styles.showPricePerItem,
                    showCompareAtPrice: body.styles.showCompareAtPrice,
                    freeGiftBgColor: body.styles.freeGiftBgColor,
                    freeGiftTextColor: body.styles.freeGiftTextColor,
                    freeGiftSelectedBgColor: body.styles.freeGiftSelectedBgColor,
                    freeGiftSelectedTextColor: body.styles.freeGiftSelectedTextColor,
                    upsellBgColor: body.styles.upsellBgColor,
                    upsellTextColor: body.styles.upsellTextColor,
                    upsellSelectedBgColor: body.styles.upsellSelectedBgColor,
                    upsellSelectedTextColor: body.styles.upsellSelectedTextColor,
                    blockTitleFontSize: body.styles.blockTitleFontSize,
                    blockTitleFontStyle: body.styles.blockTitleFontStyle,
                    titleFontSize: body.styles.titleFontSize,
                    titleFontStyle: body.styles.titleFontStyle,
                    subtitleFontSize: body.styles.subtitleFontSize,
                    subtitleFontStyle: body.styles.subtitleFontStyle,
                    labelFontSize: body.styles.labelFontSize,
                    labelFontStyle: body.styles.labelFontStyle,
                    freeGiftFontSize: body.styles.freeGiftFontSize,
                    freeGiftFontStyle: body.styles.freeGiftFontStyle,
                    upsellFontSize: body.styles.upsellFontSize,
                    upsellFontStyle: body.styles.upsellFontStyle,
                    unitLabelFontSize: body.styles.unitLabelFontSize,
                    unitLabelFontStyle: body.styles.unitLabelFontStyle,
                    globalCustomStyle: body.styles.globalCustomStyle,
                    specificCustomStyle: body.styles.specificCustomStyle,
                });
            }

            // Bars
            if (body.bars) {
                for (const bar of body.bars) {
                    if (bar.id) {
                        await updateBar(bar.id,{                        
                            barType: bar.barType,
                            quantity: bar.quantity,
                            buyQuantity: bar.buyQuantity,
                            getQuantity: bar.getQuantity,
                            priceType: bar.priceType,
                            fixedPrice: bar.fixedPrice,
                            itemDiscountPercentage: bar.itemDiscountPercentage,
                            itemDiscountAmount: bar.itemDiscountAmount,
                            buyFixedPrice: bar.buyFixedPrice,
                            buyItemDiscountPercentage: bar.buyItemDiscountPercentage,
                            buyItemDiscountAmount: bar.buyItemDiscountAmount,
                            getFixedPrice: bar.getFixedPrice,
                            getItemDiscountPercentage: bar.getItemDiscountPercentage,
                            getItemDiscountAmount: bar.getItemDiscountAmount,
                            title: bar.title,
                            subtitle: bar.subtitle,
                            badgeStyle: bar.badgeStyle,
                            badgeText: bar.badgeText,
                            badgeImage: bar.badgeImage,
                            labelText: bar.labelText,
                            enableQuantitySelector: bar.enableQuantitySelector,
                            defaultSelection: bar.defaultSelection,
                            image: bar.image,
                            highlights: bar.highlights,
                            enableSoldout: bar.enableSoldout,
                            soldoutTitle: bar.soldoutTitle,
                            soldoutOpacity: bar.soldoutOpacity,
                            soldoutBgColor: bar.soldoutBgColor,
                            soldoutTextColor: bar.soldoutTextColor,
                            soldoutFontSize: bar.soldoutFontSize,
                            status: bar.status,
                        });

                        if (bar.products?.length) {
                            await updateBarProducts(bar.id, bar.products);
                        }
                    } else {

                        const newBarId = await createBar(body.id, {
                            barType: bar.barType,
                            quantity: bar.quantity,
                            buyQuantity: bar.buyQuantity,
                            getQuantity: bar.getQuantity,
                            priceType: bar.priceType,
                            fixedPrice: bar.fixedPrice,
                            itemDiscountPercentage: bar.itemDiscountPercentage,
                            itemDiscountAmount: bar.itemDiscountAmount,
                            buyFixedPrice: bar.buyFixedPrice,
                            buyItemDiscountPercentage: bar.buyItemDiscountPercentage,
                            buyItemDiscountAmount: bar.buyItemDiscountAmount,
                            getFixedPrice: bar.getFixedPrice,
                            getItemDiscountPercentage: bar.getItemDiscountPercentage,
                            getItemDiscountAmount: bar.getItemDiscountAmount,
                            title: bar.title,
                            subtitle: bar.subtitle,
                            badgeStyle: bar.badgeStyle,
                            badgeText: bar.badgeText,
                            badgeImage: bar.badgeImage,
                            labelText: bar.labelText,
                            enableQuantitySelector: bar.enableQuantitySelector,
                            defaultSelection: bar.defaultSelection,
                            image: bar.image,
                            highlights: bar.highlights,
                            enableSoldout: bar.enableSoldout,
                            soldoutTitle: bar.soldoutTitle,
                            soldoutOpacity: bar.soldoutOpacity,
                            soldoutBgColor: bar.soldoutBgColor,
                            soldoutTextColor: bar.soldoutTextColor,
                            soldoutFontSize: bar.soldoutFontSize,
                            status: bar.status,
                        });

                        await createBarProducts(newBarId, bar.products);
                    }
                }
            }

            return success(null, "Bundle updated successfully");
        }

        case "DELETE": {

            if (!ObjectId.isValid(body.id)) {
                return error("Invalid bundle id", 400);
            }

            await deleteBundleProductByBundle(body.id);
            await deleteBundleSettingByBundle(body.id);
            await deleteBundleStyleByBundle(body.id);            
            await deleteBarsByBundle(body.id); 
            await deleteBarProductsByBundle(body.id);
            
            await deleteBundle(body.id);

            return success(null, "Bundle deleted successfully");
        }

        default:
        return error("Method Not Allowed", 405);
    }
}