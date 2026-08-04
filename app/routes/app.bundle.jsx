import { useState } from "react";
import { useSearchParams } from "react-router";
import { TitleBar, useAppBridge, SaveBar } from "@shopify/app-bridge-react";

import {
    Page,
    Card,
    Text,
    InlineStack,
    Button,
    InlineGrid,
    BlockStack,
    RadioButton,
    Box,
} from "@shopify/polaris";

import {
    ArrowLeftIcon,
    ProductIcon,
    SettingsIcon,
    PaintBrushFlatIcon,
} from "@shopify/polaris-icons";

import CollapsibleCard from "../components/CollapsibleCard";

export default function AdditionalPage() {
    
    const shopify = useAppBridge();    

    const [searchParams] = useSearchParams();

    const templateSlug = searchParams.get("template");
    const colorSchemeId = searchParams.get("colorScheme");

    const [productsOpen, setProductsOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [styleOpen, setStyleOpen] = useState(false);

    const [productOption, setProductOption] = useState("all");

    const handleSave = async () => {
        // Save your data
        await shopify.saveBar.hide("bundle-save-bar");
    };

    const handleDiscard = async () => {
        // Reset your changes
        await shopify.saveBar.hide("bundle-save-bar");
    };

    return (  
        <>
            <SaveBar id="bundle-save-bar">
                <button variant="primary" onClick={handleSave}>Save</button>
                <button onClick={handleDiscard}>Discard</button>
            </SaveBar>

            <TitleBar title="Auspicious Bundles">
                <button
                    variant="primary"
                    onClick={() => shopify.saveBar.show("bundle-save-bar")}
                >
                    Publish
                </button>
                <button
                    onClick={() => console.log('Export clicked')}
                >
                    Save as draft
                </button>                
            </TitleBar>     
            
            
            <Page fullwidth>
                <InlineGrid
                    columns={{
                        xs: "1fr",
                        sm: "1fr",
                        md: "4fr 3fr",
                    }}
                    gap="500"
                >
                    {/* LEFT COLUMN */}
                    <Card roundedAbove="sm">
                        <Box
                            padding={{
                                xs: "400",
                                sm: "500",
                                md: "600",
                            }}
                        >
                            <BlockStack gap="400">
                                {/* Header */}

                                <InlineStack
                                    align="space-between"
                                    blockAlign="center"
                                >
                                    <InlineStack
                                        gap="300"
                                        blockAlign="center"
                                    >
                                        <Button
                                            icon={ArrowLeftIcon}
                                            variant="tertiary"
                                            onClick={() => window.history.back()}
                                        />

                                        <Text
                                            as="h1"
                                            variant="headingLg"
                                        >
                                            Bundle deal
                                        </Text>
                                    </InlineStack>

                                    <Button variant="secondary">
                                        Translations
                                    </Button>
                                </InlineStack>

                                {/* Products */}

                                <CollapsibleCard
                                    title="Products"
                                    icon={ProductIcon}
                                    open={productsOpen}
                                    setOpen={setProductsOpen}
                                >
                                    <BlockStack gap="300">
                                        <RadioButton
                                            label="All products"
                                            checked={productOption === "all"}
                                            id="all-products"
                                            name="products"
                                            onChange={() =>
                                                setProductOption("all")
                                            }
                                        />

                                        <RadioButton
                                            label="Selected products"
                                            checked={productOption === "products"}
                                            id="selected-products"
                                            name="products"
                                            onChange={() =>
                                                setProductOption("products")
                                            }
                                        />

                                        <RadioButton
                                            label="Selected collections"
                                            checked={productOption === "collections"}
                                            id="selected-collections"
                                            name="products"
                                            onChange={() =>
                                                setProductOption("collections")
                                            }
                                        />

                                        <Button fullWidth>
                                            Select exceptions
                                        </Button>
                                    </BlockStack>
                                </CollapsibleCard>

                                {/* Settings */}

                                <CollapsibleCard
                                    title="Settings"
                                    icon={SettingsIcon}
                                    open={settingsOpen}
                                    setOpen={setSettingsOpen}
                                >
                                    <Text as="p">
                                        Settings content goes here.
                                    </Text>
                                </CollapsibleCard>

                                {/* Style */}

                                <CollapsibleCard
                                    title="Style"
                                    icon={PaintBrushFlatIcon}
                                    open={styleOpen}
                                    setOpen={setStyleOpen}
                                >
                                    <Text as="p">
                                        Style configuration goes here.
                                    </Text>
                                </CollapsibleCard>
                            </BlockStack>
                        </Box>
                    </Card>
                    {/* RIGHT COLUMN */}

                    <Card>
                        <BlockStack gap="300">
                            <Text
                                as="h2"
                                variant="headingMd"
                            >
                                Summary
                            </Text>

                            <Text>
                                Template: {templateSlug || "-"}
                            </Text>

                            <Text>
                                Color Scheme: {colorSchemeId || "-"}
                            </Text>
                        </BlockStack>
                    </Card>
                </InlineGrid>
            </Page>  
        </>      
    );
}