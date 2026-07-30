import {
  InlineStack,
  BlockStack,
  Text,
  Badge,
  RadioButton,
} from "@shopify/polaris";

import Price from "./common/Price";
import PopularRibbon from "./common/PopularRibbon";

export default function OptionRow({
  option,
  active,
  onClick,
  children,
}) {
  return (
    <div
      className={`option-card ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {option.popular && <PopularRibbon />}

      <InlineStack
        align="space-between"
        blockAlign="start"
        gap="300"
      >
        <InlineStack gap="300" blockAlign="start">
          <RadioButton
            checked={active}
            label=""
            onChange={onClick}
          />

          <BlockStack gap="100">
            <InlineStack gap="200" blockAlign="center">
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
              <Text as="p" tone="subdued">
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

      {active && children && (
        <div className="option-extra">
          {children}
        </div>
      )}
    </div>
  );
}