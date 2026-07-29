import { BlockStack, Text } from "@shopify/polaris";

export default function Price({
  price,
  comparePrice,
}) {
  return (
    <BlockStack gap="050" inlineAlign="end">
      <Text as="span" variant="headingMd">
        £{price}
      </Text>

      {comparePrice && (
        <Text
          as="span"
          tone="subdued"
          textDecorationLine="line-through"
        >
          £{comparePrice}
        </Text>
      )}
    </BlockStack>
  );
}