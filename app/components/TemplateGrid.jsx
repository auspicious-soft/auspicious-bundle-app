import { InlineGrid } from "@shopify/polaris";

import QuantityBreak from "./templates/QuantityBreak";
import BuyXGetY from "./templates/BuyXGetY";
import ProductBundle from "./templates/ProductBundle";

export default function TemplateGrid({
  templates,
  selectedOptions,
  onSelect,
  bundleConfig,
  updateBundleConfig,
  openProductPicker
}) {
  return (
    <InlineGrid
      columns={{
        xs: 1,
        sm: 1,
        md: 3,
      }}
      gap="400"
      alignItems="stretch"
    >
      {templates.map((template) => {
        const props = {
          key: template.id,
          template,
          selected: selectedOptions[template.id],
          onSelect,
          bundleConfig,
          updateBundleConfig,
          openProductPicker
        };

        switch (template.type) {
          case "quantity_break":
            return <QuantityBreak {...props} />;

          case "bxgy":
            return <BuyXGetY {...props} />;

          case "bundle":
            return <ProductBundle {...props} />;

          default:
            return null;
        }
      })}
    </InlineGrid>
  );
}