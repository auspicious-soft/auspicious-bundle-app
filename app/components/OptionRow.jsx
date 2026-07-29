import {
  InlineStack,
  BlockStack,
  Text,
  Badge,
  RadioButton,
} from "@shopify/polaris";

import Price from "./common/Price";
import PopularRibbon from "./common/PopularRibbon";

import "../styles.templates.css";

export default function OptionRow({
  option,
  active,
  onClick,
}) {
  return (
    <div
      className={`option-row ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {option.popular && <PopularRibbon />}

      <InlineStack
        align="space-between"
        blockAlign="start"
      >
        <InlineStack gap="300">

          <RadioButton
            checked={active}
            label=""
            onChange={() => {}}
          />

          <BlockStack gap="050">

            <InlineStack gap="200">

              <Text
                as="span"
                variant="bodyMd"
                fontWeight="semibold"
              >
                {option.title}
              </Text>

              {option.badge && (
                <Badge tone="success">
                  {option.badge}
                </Badge>
              )}

            </InlineStack>

            {option.subtitle && (
              <Text tone="subdued">
                {option.subtitle}
              </Text>
            )}

          </BlockStack>

        </InlineStack>

        <Price
          price={option.price}
          comparePrice={option.comparePrice}
        />
      </InlineStack>
    </div>
  );
}