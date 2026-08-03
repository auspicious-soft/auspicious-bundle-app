import {
  Card,
  BlockStack,
  Text,
  Button,
  Box,
} from "@shopify/polaris";

import OptionRow from "../OptionRow";
import FreeGiftBanner from "../common/FreeGiftBanner";

export default function BuyXGetY({
  template,
  selected,
  onSelect,
  navigate,
  colorScheme
}) {
  return (
    <Card roundedAbove="sm">
      <div className="template-card">
        {/* Card Content */}
        <div className="template-content">
          <BlockStack gap="200">
            <BlockStack gap="100">
              <Text as="h2" variant="headingMd">
                {template.title}
              </Text>

              <Text tone="subdued">
                {template.description}
              </Text>
            </BlockStack>

            {template.options.map((option) => (
              <OptionRow
                key={option.id}
                option={option}
                active={selected === option.id}
                onClick={() => onSelect(template.id, option.id)}
              >
                {selected === option.id &&
                  option.freeGift && (
                    <FreeGiftBanner>
                      + FREE Special Gift
                    </FreeGiftBanner>                    
                  )}
              </OptionRow>
            ))}
          </BlockStack>
        </div>

        {/* Footer */}
        <div className="template-footer">
          <Button variant="primary" fullWidth
            onClick={() =>
              navigate(
                `/app/bundle?template=${template.type}&colorScheme=${colorScheme._id}`
              )
            }
          >
            Choose
          </Button>
        </div>
      </div>
    </Card>
  );
}