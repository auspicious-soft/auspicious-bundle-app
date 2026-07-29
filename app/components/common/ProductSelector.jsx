import {
  InlineStack,
  Thumbnail,
  Text,
  BlockStack,
} from "@shopify/polaris";

import VariantSelector from "./VariantSelector";

export default function ProductSelector({
  product,
  value,
  onChange,
}) {
  return (
    <InlineStack gap="300" blockAlign="center">
      <Thumbnail
        source={product.image}
        alt={product.title}
        size="medium"
      />

      <BlockStack gap="100">

        <Text
          as="span"
          variant="bodyMd"
          fontWeight="semibold"
        >
          {product.title}
        </Text>

        <VariantSelector
          label=""
          value={value}
          options={product.variants}
          onChange={onChange}
        />

      </BlockStack>

    </InlineStack>
  );
}