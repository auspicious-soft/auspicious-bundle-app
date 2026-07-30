import {
  Modal,
  BlockStack,
  InlineStack,
  Thumbnail,
  Text,
  Button,
} from "@shopify/polaris";

export default function ProductPickerModal({
  open,
  onClose,
  products,
  onChoose,
}) {    
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Choose Product"
      large
    >
      <Modal.Section>
        <BlockStack gap="400">
          {products.map((product) => (
            <InlineStack
              key={product.id}
              align="space-between"
              blockAlign="center"
            >
              <InlineStack gap="300" blockAlign="center">
                <Thumbnail
                  source={product.image}
                  alt={product.title}
                  size="large"
                />

                <BlockStack gap="100">
                  <Text variant="bodyMd" fontWeight="semibold">
                    {product.title}
                  </Text>

                  <Text tone="subdued">
                    £{product.price}
                  </Text>
                </BlockStack>
              </InlineStack>

                <Button
                    variant="primary"
                    onClick={() => {
                        if (typeof onChoose === "function") {
                        onChoose(product);
                        }
                    }}
                >
                    Choose
                </Button>
            </InlineStack>
          ))}
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}