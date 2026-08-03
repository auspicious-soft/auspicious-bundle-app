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
  openProductPicker,
  navigate,
  colorScheme
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
          template,
          selected: selectedOptions[template.id],
          onSelect,
          bundleConfig,
          updateBundleConfig,
          openProductPicker, 
          navigate, 
          colorScheme,        
        };

        switch (template.type) {
          case "quantity_break":
            return <QuantityBreak key={template.id} {...props} />;

          case "bxgy":
            return <BuyXGetY key={template.id} {...props} />;

          case "bundle":
            return <ProductBundle key={template.id} {...props} />;

          default:
            return null;
        }
      })}
    </InlineGrid>
  );
}