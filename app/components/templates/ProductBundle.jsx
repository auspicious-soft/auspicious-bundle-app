import {
  Card,
  BlockStack,
  Text,
  Button,
  InlineStack,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";

import OptionRow from "../OptionRow";
import ProductSelector from "../common/ProductSelector";

export default function ProductBundle({
  template,
  selected,
  onSelect,
  bundleConfig,
  updateBundleConfig,
  openProductPicker,
}) {
  return (
    <Card roundedAbove="sm">
      <div className="template-card">
        <div className="template-content">
          <BlockStack gap="400">
            {/* Header */}
            <BlockStack gap="100">
              <Text as="h2" variant="headingMd">
                {template.title}
              </Text>

              <Text tone="subdued">
                {template.description}
              </Text>
            </BlockStack>

            {/* Options */}
            {template.options.map((option) => {
              const config =
                bundleConfig?.[template.id]?.[option.id] || {};

              return (
                <OptionRow
                  key={option.id}
                  option={option}
                  active={selected === option.id}
                  onClick={() => onSelect(template.id, option.id)}
                >
                  {selected === option.id && option.product && (
                    <BlockStack gap="300">

                      {/* First Product */}
                      <ProductSelector
                        product={option.product}
                        value={
                          config.variant ??
                          option.product.variants?.[0]?.value
                        }
                        iconColor={
                          config.variant ??
                          option.product.variants?.[0]?.value
                        }
                        onChange={(value) =>
                          updateBundleConfig(
                            template.id,
                            option.id,
                            "variant",
                            value
                          )
                        }
                      />

                      {/* Second Product */}
                      {config.secondProduct ? (
                        <ProductSelector
                          key={config.secondProduct.id}
                          product={config.secondProduct}
                          value={
                            config.secondVariant ??
                            config.secondProduct.variants?.[0]?.value
                          }
                          iconColor={
                            config.secondVariant ??
                            config.secondProduct.variants?.[0]?.value
                          }
                          onChange={(value) =>
                            updateBundleConfig(
                              template.id,
                              option.id,
                              "secondVariant",
                              value
                            )
                          }
                          
                          onRemove={() => {
                            updateBundleConfig(
                              template.id,
                              option.id,
                              "secondProduct",
                              null
                            );

                            updateBundleConfig(
                              template.id,
                              option.id,
                              "secondVariant",
                              null
                            );
                          }}

                        />
                      ) : (
                        <InlineStack>
                          <Button
                            icon={PlusIcon}
                            variant="secondary"
                            onClick={() =>
                              openProductPicker(
                                template.id,
                                option.id
                              )
                            }
                          >
                            Choose Product
                          </Button>
                        </InlineStack>
                      )}
                    </BlockStack>
                  )}
                </OptionRow>
              );
            })}
          </BlockStack>
        </div>

        <div className="template-footer">
          <Button variant="primary" fullWidth>
            Choose
          </Button>
        </div>
      </div>
    </Card>
  );
}