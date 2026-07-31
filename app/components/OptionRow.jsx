import {
  InlineStack,
  BlockStack,
  Text, 
  RadioButton,
} from "@shopify/polaris";

import Price from "./common/Price";
import PopularRibbon from "./common/PopularRibbon";
import Label from "./common/Label";

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
          <div className={`custom-radio ${active ? "active" : ""}`}>
            <div className="custom-radio-dot" />
          </div>

          <BlockStack gap="200">
            <InlineStack gap="200" blockAlign="center">
              <Text
                as="span"
                variant="bodyMd"
                fontWeight="semibold"
              >
                {option.title}
              </Text>

              {option.badge && (
                <Label>
                  {option.badge}
                </Label>
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