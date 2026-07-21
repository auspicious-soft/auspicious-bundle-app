import { useEffect } from "react";
import { useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "react-router";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const shopHandle = session.shop.replace(".myshopify.com", "");

  const apiKey = "237ff610ab8dfd2f10aeb63827383865";
  const embedHandle = "bundles";

  const themeEditorUrl =
    `https://admin.shopify.com/store/${shopHandle}/themes/current/editor` +
    `?context=apps` +
    `&template=product` +
    `&activateAppId=${apiKey}/${embedHandle}`;

  return { themeEditorUrl };
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyReactRouterTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  };
};

export default function Index() {
  const { themeEditorUrl } = useLoaderData();

  return (
    <s-page heading="Shopify app template">
      <s-section heading="Congrats on creating a new Shopify app 🎉">
        <s-paragraph>
          Enable the app from Shopify theme editor{" "}
          <s-link
            href={themeEditorUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enable App Embed
          </s-link>
        </s-paragraph>
      </s-section>
    </s-page>
  );
}
export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
