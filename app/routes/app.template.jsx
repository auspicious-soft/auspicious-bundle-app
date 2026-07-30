import { useNavigate } from "react-router";
import { useState } from "react";
import "../styles.templates.css";
import "../style.optionrow.css";

import {
  Page,
  BlockStack,
  InlineStack,
  Button,
  Text,
} from "@shopify/polaris";

import { ArrowLeftIcon } from "@shopify/polaris-icons";

import TemplateGrid from "../components/TemplateGrid";
import ProductPickerModal from "../components/common/ProductPickerModal";

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
    type: "quantity_break",
    title: "Quantity Break",
    description: "Quantity breaks for the same product",

    options: [
      {
        id: 1,
        title: "Single",
        subtitle: "Standard price",
        price: 20,
        variantName: "",
      },
      {
        id: 2,
        title: "Duo",
        subtitle: "You save 15%",
        badge: "SAVE £6",
        price: 34,
        comparePrice: 40,
        popular: true,
        variantName: "Color",
        variants: [
          { label: "Black", value: "black"},
          { label: "Blue", value: "blue"},
          { label: "Red", value: "red" },
        ],
      },
    ],
  },

  {
    id: 2,
    type: "bxgy",
    title: "Buy X Get Y",
    description: "Buy X, Get Y offer",

    freeGift: true,

    options: [
      {
        id: 1,
        title: "Buy 1 Get 1",
        badge: "SAVE 50%",
        price: 20,
        comparePrice: 40,
      },
      {
        id: 2,
        title: "Buy 2 Get 3",
        badge: "SAVE 60%",
        price: 40,
        comparePrice: 100,
        freeGift: true
      },
    ],
  },

  {
    id: 3,
    type: "bundle",
    title: "Product Bundle",
    description: "Bundle multiple products",

    options: [
      {
        id: 1,
        title: "1 Pack",
        price: 20,
        product: {
          title: "Basic T-Shirt",
          image: "https://picsum.photos/80",
          variants: [
            { label: "Black", value: "black" },
            { label: "Blue", value: "blue" },
          ],
        }
      },
      {
        id: 2,
        title: "2 Pack",
        badge: "SAVE £6",
        price: 34,
        comparePrice: 40,

        product: {
          title: "Basic T-Shirt",
          image: "https://picsum.photos/80",
          variants: [
            { label: "Black", value: "black" },
            { label: "Blue", value: "blue" },
          ],
        },
      },
    ],
  },
];

const availableProducts = [
  {
    id: 1,
    title: "Lithuania Tie-Dye T-shirt",
    image: "https://picsum.photos/100?1",
    price: 17,
    variants: [
      { label: "Black", value: "black" },
      { label: "Green", value: "green" },
    ],
  },
  {
    id: 2,
    title: "Nirvana T-shirt",
    image: "https://picsum.photos/100?2",
    price: 17,
    variants: [
      { label: "Black", value: "black" },
      { label: "Red", value: "red" },
    ],
  },
];

export default function Templates() {
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const [selectedOptions, setSelectedOptions] = useState({
    1: 2,
    2: 1,
    3: 2,
  });

  const handleSelect = (templateId, optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [templateId]: optionId,
    }));
  };

  const [bundleConfig, setBundleConfig] = useState({});

  console.log("Bundle Config:", bundleConfig);

  const updateBundleConfig = (
    templateId,
    optionId,
    field,
    value
  ) => {
    setBundleConfig((prev) => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        [optionId]: {
          ...prev[templateId]?.[optionId],
          [field]: value,
        },
      },
    }));
  };

  const [productPicker, setProductPicker] = useState({
    open: false,
    templateId: null,
    optionId: null,
  });

  const openProductPicker = (templateId, optionId) => {
    setProductPicker({
      open: true,
      templateId,
      optionId,
    });
  };

  const closeProductPicker = () => {
    setProductPicker({
      open: false,
      templateId: null,
      optionId: null,
    });
  };

  const handleChooseProduct = (product) => {
    updateBundleConfig(
      productPicker.templateId,
      productPicker.optionId,
      "secondProduct",
      product
    );

    closeProductPicker();
  };

  const handleRemoveSecondProduct = (templateId, optionId) => {
    updateBundleConfig(
      templateId,
      optionId,
      "secondProduct",
      null
    );
  };

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
              Colour theme
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

        {/* Templates */}

        <TemplateGrid
          templates={templates}
          selectedOptions={selectedOptions}
          onSelect={handleSelect}
          bundleConfig={bundleConfig}
          updateBundleConfig={updateBundleConfig}
          openProductPicker={openProductPicker}
        />

        <ProductPickerModal
          open={productPicker.open}
          onClose={closeProductPicker}
          products={availableProducts}
          onChoose={handleChooseProduct}
        />

      </BlockStack>
    </Page>
  );
}