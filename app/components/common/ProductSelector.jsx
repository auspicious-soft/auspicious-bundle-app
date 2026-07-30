import {
  InlineStack,
  Text,
  BlockStack,
  Button,
} from "@shopify/polaris";

import VariantSelector from "./VariantSelector";
import TshirtIcon from "./TshirtIcon";

import { XIcon } from "@shopify/polaris-icons";

export default function ProductSelector({
  product,
  value,
  onChange,
  onRemove,
  iconColor = "#000000",
}) {
  return (
    <InlineStack align="space-between" blockAlign="center">
      <InlineStack gap="300" blockAlign="center">
        <TshirtIcon color={iconColor} />

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

      {onRemove && (
        <Button
          icon={XIcon}
          variant="tertiary"
          tone="critical"
          accessibilityLabel="Remove product"
          onClick={onRemove}
        />
      )}
    </InlineStack>
  );
}