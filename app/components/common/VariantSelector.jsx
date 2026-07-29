import { Select } from "@shopify/polaris";

export default function VariantSelector({
  label,
  options,
  value,
  onChange,
}) {
  return (
    <Select
      label={label}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}