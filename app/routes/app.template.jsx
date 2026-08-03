import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "../styles.templates.css";

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
import { templatePreview } from "../data/templatePreview";


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

  const [templates, setTemplates] = useState([]); 

  useEffect(() => {
     console.log("Fetching bundle types...");
    fetch("/api/bundle-types")
      .then((res) => res.json())
      .then((res) => {
        console.log("Data:", res);
        const merged = res.data.map((item, index) => ({
          dbId: item._id,           // MongoDB id
          id: index + 1,
          type: item.typeSlug,
          title: item.typeName,
          description: item.typeDescription,
          ...templatePreview[item.typeSlug],
        }));

        setTemplates(merged);
      });
  }, []);

  const [colorSchemes, setColorSchemes] = useState([]);
  const [selectedColorScheme, setSelectedColorScheme] = useState(null);

  useEffect(() => {
    fetch("/api/color-scheme")
      .then((res) => res.json())
      .then((res) => {
        setColorSchemes(res.data);

        if (res.data.length > 0) {
          setSelectedColorScheme(res.data[0]);
        }
      });
  }, []);

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
    <Page fullWidth>
      <div
        className="templates-theme"
        style={{
          "--theme-color": selectedColorScheme?.colorCode || "#B4E600",
          "--border-color": selectedColorScheme?.borderColor || "#DDF58B",
          "--bg-color": selectedColorScheme?.bgColor || "#FBFEEB",
          "--label-bg-color": selectedColorScheme?.labelBgColor || "#F2FBD0",
          "--active-border-color":
            selectedColorScheme?.activeBorderColor || "#B4E600",
          "--active-bg-color":
            selectedColorScheme?.activeBgColor || "#FFFFFF",
          "--badge-color": selectedColorScheme?.badgeColor || "#3F6212",
          "--badge-bg-color":
            selectedColorScheme?.badgeBgColor || "#B4E600",
        }}
      >
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

                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme._id}
                    type="button"
                    className={`color-item ${
                      selectedColorScheme?._id === scheme._id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedColorScheme(scheme)}
                  >
                    <span
                      className="color-circle"
                      style={{ backgroundColor: scheme.colorCode }}
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
            navigate={navigate}  
            colorScheme={selectedColorScheme}                
          />

          <ProductPickerModal
            open={productPicker.open}
            onClose={closeProductPicker}
            products={availableProducts}
            onChoose={handleChooseProduct}
          />

        </BlockStack>
      </div>
    </Page>
  );
}