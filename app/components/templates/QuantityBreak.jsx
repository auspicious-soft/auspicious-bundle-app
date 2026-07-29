import { useState } from "react";
import {
  Card,
  BlockStack,
  Text,
  Button,
} from "@shopify/polaris";

import OptionRow from "../OptionRow";
import VariantSelector from "../common/VariantSelector";

export default function QuantityBreak({
  template,
  selected,
  onSelect,
}) {
  const [colour, setColour] = useState("black");

  return (
    <Card roundedAbove="sm">
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
          <BlockStack key={option.id} gap="200">

            <OptionRow
              option={option}
              active={selected === option.id}
              onClick={() => onSelect(template.id, option.id)}
            />

            {selected === option.id &&
              option.variants && (
                <>
                  <VariantSelector
                    label="Colour"
                    options={option.variants}
                    value={colour}
                    onChange={setColour}
                  />

                  <VariantSelector
                    label=""
                    options={option.variants}
                    value={colour}
                    onChange={setColour}
                  />
                </>
              )}

          </BlockStack>
        ))}

        <Button variant="primary" fullWidth>
          Choose
        </Button>

      </BlockStack>
    </Card>
  );
}