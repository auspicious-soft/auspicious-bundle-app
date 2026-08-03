import { useState } from "react";
import {
    Page,
    Card,
    Text,
    InlineStack,
    Button,
    InlineGrid,
    BlockStack,
    Collapsible,
    RadioButton,
    Icon,
} from "@shopify/polaris";
import {
    ArrowLeftIcon,
    ChevronDownIcon,
} from "@shopify/polaris-icons";

export default function AdditionalPage() {
    const [productsOpen, setProductsOpen] = useState(true);
    const [productOption, setProductOption] = useState("all");

    const navigate = (path) => {
        window.history.go(path);
    };

    return (
        <Page fullWidth>
            <InlineGrid
                columns={{
                    xs: "1fr",
                    sm: "1fr",
                    md: "4fr 3fr",
                }}
                gap="400"
            >
                {/* First column */}
                <BlockStack gap="400">
                    {/* Bundle Creation header */}
                    <Card>
                        <InlineStack gap="300" blockAlign="center">
                            <Button
                                icon={ArrowLeftIcon}
                                variant="tertiary"
                                onClick={() => window.history.back()}
                                accessibilityLabel="Go back"
                            />

                            <Text as="h2" variant="headingMd">
                                Bundle Creation
                            </Text>
                        </InlineStack>
                    </Card>

                    {/* Products section */}
                    <Card padding="0">
                        <BlockStack gap="0">
                            {/* Collapsible header */}
                            <Button
                                variant="tertiary"
                                fullWidth
                                onClick={() => setProductsOpen(!productsOpen)}
                                accessibilityLabel={
                                    productsOpen ? "Collapse Products" : "Expand Products"
                                }
                            >
                                <InlineStack gap="300" blockAlign="left">
                                    <Icon source={ChevronDownIcon} />

                                    <Text as="span" variant="headingMd">
                                        Products
                                    </Text>
                                </InlineStack>
                            </Button>

                            <Collapsible
                                open={productsOpen}
                                id="products-section"
                                transition
                            >
                                <BlockStack gap="300" padding="400">
                                    <RadioButton
                                        label="All products"
                                        checked={productOption === "all"}
                                        id="all-products"
                                        name="products"
                                        onChange={() => setProductOption("all")}
                                    />

                                    <RadioButton
                                        label="Selected products"
                                        checked={productOption === "products"}
                                        id="selected-products"
                                        name="products"
                                        onChange={() => setProductOption("products")}
                                    />

                                    <RadioButton
                                        label="Selected collections"
                                        checked={productOption === "collections"}
                                        id="selected-collections"
                                        name="products"
                                        onChange={() => setProductOption("collections")}
                                    />

                                    <Button fullWidth>
                                        Select exceptions
                                    </Button>
                                </BlockStack>
                            </Collapsible>
                        </BlockStack>
                    </Card>
                </BlockStack>

                {/* Second column */}
                <Card>
                    <Text as="h2" variant="headingMd">
                        Create another page
                    </Text>

                    <Text as="p" variant="bodyMd">
                        Your second card content goes here.
                    </Text>
                </Card>
            </InlineGrid>
        </Page>
    );
}