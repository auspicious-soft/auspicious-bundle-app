import { useNavigate } from "react-router";
import { useState } from "react";
import "../styles.templates.css";
import {
  Page,
  BlockStack,
  InlineStack,
  InlineGrid,
  Card,
  Text,
  Button,
  Box,
} from "@shopify/polaris";
import { ArrowLeftIcon } from "@shopify/polaris-icons";

const colors = [
  "#000000",
  "#ff0000",
  "#ff9800",
  "#c6e600",
  "#14c96f",
  "#1e88e5",
  "#7c4dff",
  "#e040fb",
];

const templates = [
  {
    id: 1,
    title: "Single",
    description: "One product",
  },
  {
    id: 2,
    title: "Buy 1, Get 1 Free",
    description: "BOGO offer",
  },
  {
    id: 3,
    title: "Volume Discount",
    description: "Quantity discount",
  },
  {
    id: 4,
    title: "Mix & Match",
    description: "Mix products",
  },
  {
    id: 5,
    title: "Bundle",
    description: "Bundle products",
  },
  {
    id: 6,
    title: "Free Gift",
    description: "Gift with purchase",
  },
];

export default function Templates() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <Page>
      <BlockStack gap="500">
        {/* Header */}
        <div className="template-header">
          <InlineStack gap="300" blockAlign="center">
            <Button
              icon={ArrowLeftIcon}
              variant="tertiary"
              onClick={() => navigate(-1)}
            />

            <BlockStack gap="100">
              <Text as="h1" variant="headingLg">
                Select discount type
              </Text>

              <Text as="p" tone="subdued">
                You can fully customize it later.
              </Text>
            </BlockStack>
          </InlineStack>

          <div className="color-theme">
            <Text as="span" tone="subdued">
              Color theme
            </Text>

            <div className="color-picker">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-item ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className="color-circle"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <Box paddingInline="400" borderRadius="300">

          <InlineGrid
            columns={{
              xs: 1,
              sm: 1,
              md: 3,
            }}
            gap="400"
          >
            {templates.map((template) => (
              <Card key={template.id}>
                <BlockStack gap="300">
                  <Text as="h3" variant="headingMd">
                    {template.title}
                  </Text>

                  <Text as="p" tone="subdued">
                    {template.description}
                  </Text>

                  <Button variant="primary">
                    Select
                  </Button>
                </BlockStack>
              </Card>
            ))}
          </InlineGrid>
        </Box>

        {/* Your cards go here */}
      </BlockStack>      
    </Page>
  );
}