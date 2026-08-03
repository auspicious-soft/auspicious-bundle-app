import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
  Box,
} from "@shopify/polaris";

import OptionRow from "../OptionRow";
import VariantSelector from "../common/VariantSelector";
import TshirtIcon from "../common/TshirtIcon";

export default function QuantityBreak({
  template,
  selected,
  onSelect,
  bundleConfig,
  updateBundleConfig,
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
                {selected === option.id && option.variants && (
                  <BlockStack gap="100">
                    <Text tone="subdued">
                        {option.variantName}
                    </Text>
                    
                    <BlockStack gap="300">
                      {/* First Variant */}
                      <InlineStack gap="300" blockAlign="center">
                        <TshirtIcon
                          color={
                            bundleConfig?.[template.id]?.[option.id]?.variant1 ??
                            option.variants[0].value
                          }
                        />

                        <Box maxWidth="150px">
                          <VariantSelector
                            label=""
                            options={option.variants}
                            value={
                              bundleConfig?.[template.id]?.[option.id]?.variant1 ??
                              option.variants[0].value
                            }
                            onChange={(value) =>
                              updateBundleConfig(
                                template.id,
                                option.id,
                                "variant1",
                                value
                              )
                            }
                          />
                        </Box>
                      </InlineStack>

                      {/* Second Variant */}
                      <InlineStack gap="300" blockAlign="center">
                        <TshirtIcon
                          color={
                            bundleConfig?.[template.id]?.[option.id]?.variant2 ??
                            option.variants[0].value
                          }
                        />

                        <Box maxWidth="150px">
                          <VariantSelector
                            label=""
                            options={option.variants}
                            value={
                              bundleConfig?.[template.id]?.[option.id]?.variant2 ??
                              option.variants[0].value
                            }
                            onChange={(value) =>
                              updateBundleConfig(
                                template.id,
                                option.id,
                                "variant2",
                                value
                              )
                            }
                          />
                        </Box>
                      </InlineStack>

                    </BlockStack>
                  </BlockStack>
                )}
              </OptionRow>            
            ))}
          </BlockStack>
        </div>

        {/* Footer */}
        <div className="template-footer">
          <Button variant="primary" fullWidth           
            onClick={() => {              
              navigate(
                `/app/bundle?template=${template.type}&colorScheme=${colorScheme._id}`
              )
            }}
          >
            Choose
          </Button>
        </div>
      </div>
    </Card>
  );
}