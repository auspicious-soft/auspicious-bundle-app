import {
  Card,
  BlockStack,
  Text,
  Button,
  Box,
} from "@shopify/polaris";

import OptionRow from "../OptionRow";

export default function BuyXGetY({
  template,
  selected,
  onSelect,
}) {
  return (
    <Card roundedAbove="sm">
      <div className="template-card">
        {/* Card Content */}
        <div className="template-content">
          <BlockStack gap="400">
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
                    <Box
                      padding="300"
                      background="bg-surface-secondary"
                      borderRadius="200"
                    >
                      <Text
                        as="p"
                        variant="bodyMd"
                        fontWeight="semibold"
                      >
                        🎁 FREE Special Gift
                      </Text>
                    </Box>
                  )}
              </OptionRow>
            ))}
          </BlockStack>
        </div>

        {/* Footer */}
        <div className="template-footer">
          <Button variant="primary" fullWidth>
            Choose
          </Button>
        </div>
      </div>
    </Card>
  );
}