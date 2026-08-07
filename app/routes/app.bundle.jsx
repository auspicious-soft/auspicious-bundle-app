import { useState } from "react";
import { useSearchParams } from "react-router";
import { TitleBar, useAppBridge, SaveBar } from "@shopify/app-bridge-react";
import { ImageIcon } from "@shopify/polaris-icons";
import { useNavigate } from "react-router";
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
    Popover,
    ActionList,
    Icon,
    TextField,
    Divider,
    Select,
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

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const templateSlug = searchParams.get("template");
    const colorSchemeId = searchParams.get("colorScheme");

    const [productsOpen, setProductsOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [styleOpen, setStyleOpen] = useState(false);

    const [productOption, setProductOption] = useState("all");

    const [popoverActive, setPopoverActive] = useState(false);

    // All Products -> Exceptions
    const [exceptionProducts, setExceptionProducts] = useState([]);
    const [exceptionCollections, setExceptionCollections] = useState([]);

    // Selected Products
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Selected Collections
    const [selectedCollections, setSelectedCollections] = useState([]);

    // 👇 ADD THE FUNCTIONS HERE
    const openProductPicker = async () => {
        const selection = await shopify.resourcePicker({
            type: "product",
            multiple: true,
            selectionIds: selectedProducts.map(item => ({
                id: item.id
            }))
        });

        if (!selection) return;

        if (productOption === "all") {
            setExceptionProducts(selection);
        } else {
            setSelectedProducts(selection);
        }
        await shopify.saveBar.show("bundle-save-bar");
    };
    const openCollectionPicker = async () => {
        const selection = await shopify.resourcePicker({
            type: "collection",
            multiple: true,
        });

        if (!selection) return;

        if (productOption === "all") {
            setExceptionCollections(selection);
        } else {
            setSelectedCollections(selection);
        }
    };

    const removeExceptionProduct = (id) => {
        setExceptionProducts(prev =>
            prev.filter(item => item.id !== id)
        );
    };

    const removeExceptionCollection = (id) => {
        setExceptionCollections(prev =>
            prev.filter(item => item.id !== id)
        );
    };

    const removeProduct = (id) => {
        setSelectedProducts(prev =>
            prev.filter(item => item.id !== id)
        );
    };

    const removeCollection = (id) => {
        setSelectedCollections(prev =>
            prev.filter(item => item.id !== id)
        );
    };

    const handleSave = async () => {
        // Save your data
        await shopify.saveBar.hide("bundle-save-bar");
    };

    const handleDiscard = async () => {
        // Reset your changes
        await shopify.saveBar.hide("bundle-save-bar");
    };
    const [bundleName, setBundleName] = useState("");
    const [blockTitle, blockTitleName] = useState("");
    const [discountName, setDiscountName] = useState("");

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
            <Page fullWidth>
                <InlineGrid
                    columns={{
                        xs: "1fr",
                        sm: "1fr",
                        md: "3fr 4fr",
                    }}
                    gap="500"
                >
                    {/* LEFT COLUMN */}
                    <Card>
                        <BlockStack gap="300">
                            <InlineStack
                                gap="300"
                                blockAlign="center"
                            >
                                <Button
                                    icon={ArrowLeftIcon}
                                    variant="tertiary"
                                    onClick={() => navigate(-1)}
                                />

                                <Text
                                    as="h2"
                                    variant="headingMd"
                                >
                                    Preview
                                </Text>
                            </InlineStack>


                            <Text>
                                Template: {templateSlug || "-"}
                            </Text>

                            <Text>
                                Color Scheme: {colorSchemeId || "-"}
                            </Text>
                        </BlockStack>
                    </Card>




                    {/* RIGHT COLUMN */}

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
                                        {/* <Button
                                            icon={ArrowLeftIcon}
                                            variant="tertiary"
                                            onClick={() => window.history.back()}
                                        /> */}

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

                                        {/* =======================
                ALL PRODUCTS
            ======================== */}

                                        {productOption === "all" && (
                                            <BlockStack gap="300">

                                                {(exceptionProducts.length > 0 ||
                                                    exceptionCollections.length > 0) && (
                                                        <BlockStack gap="200">

                                                            <Text
                                                                as="h3"
                                                                variant="headingSm"
                                                            >
                                                                Exceptions
                                                            </Text>

                                                            {exceptionProducts.map((product) => (
                                                                <InlineStack
                                                                    key={product.id}
                                                                    align="space-between"
                                                                    blockAlign="center"
                                                                >
                                                                    <InlineStack
                                                                        gap="300"
                                                                        blockAlign="center"
                                                                    >
                                                                        {product.images?.[0]?.url ? (
                                                                            <img
                                                                                src={product.images[0].url}
                                                                                alt={product.title}
                                                                                style={{
                                                                                    width: "40px",
                                                                                    height: "40px",
                                                                                    objectFit: "cover",
                                                                                    borderRadius: "8px",
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <Box
                                                                                width="40px"
                                                                                height="40px"
                                                                                background="bg-surface-secondary"
                                                                                borderRadius="200"
                                                                            >
                                                                                <Icon source={ImageIcon} />
                                                                            </Box>
                                                                        )}

                                                                        <Text>
                                                                            {product.title}
                                                                        </Text>
                                                                    </InlineStack>


                                                                    <Button
                                                                        variant="plain"
                                                                        tone="critical"
                                                                        onClick={() =>
                                                                            removeExceptionProduct(product.id)
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>

                                                                </InlineStack>
                                                            ))}

                                                            {exceptionCollections.map((collection) => (
                                                                <InlineStack
                                                                    key={collection.id}
                                                                    align="space-between"
                                                                    blockAlign="center"
                                                                >
                                                                    <InlineStack
                                                                        gap="300"
                                                                        blockAlign="center"
                                                                    >

                                                                        {collection.image?.url ? (
                                                                            <img
                                                                                src={collection.image.url}
                                                                                alt={collection.title}
                                                                                style={{
                                                                                    width: "40px",
                                                                                    height: "40px",
                                                                                    objectFit: "cover",
                                                                                    borderRadius: "8px",
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <Box
                                                                                width="40px"
                                                                                height="40px"
                                                                                background="bg-surface-secondary"
                                                                                borderRadius="200"
                                                                            >
                                                                                <Icon source={ImageIcon} />
                                                                            </Box>
                                                                        )}

                                                                        <Text>
                                                                            {collection.title}
                                                                        </Text>

                                                                    </InlineStack>


                                                                    <Button
                                                                        variant="plain"
                                                                        tone="critical"
                                                                        onClick={() =>
                                                                            removeExceptionCollection(collection.id)
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>

                                                                </InlineStack>
                                                            ))}

                                                        </BlockStack>
                                                    )}

                                                <Popover
                                                    active={popoverActive}
                                                    activator={
                                                        <Button
                                                            fullWidth
                                                            onClick={() =>
                                                                setPopoverActive(!popoverActive)
                                                            }
                                                        >
                                                            {exceptionProducts.length ||
                                                                exceptionCollections.length
                                                                ? "Select more exceptions"
                                                                : "Select exceptions"}
                                                        </Button>
                                                    }
                                                    onClose={() =>
                                                        setPopoverActive(false)
                                                    }
                                                >
                                                    <ActionList
                                                        items={[
                                                            {
                                                                content: "Products",
                                                                icon: ProductIcon,
                                                                onAction: async () => {
                                                                    setPopoverActive(false);
                                                                    await openProductPicker();
                                                                },
                                                            },
                                                            {
                                                                content: "Collections",
                                                                icon: ProductIcon,
                                                                onAction: async () => {
                                                                    setPopoverActive(false);
                                                                    await openCollectionPicker();
                                                                },
                                                            },
                                                        ]}
                                                    />
                                                </Popover>

                                            </BlockStack>
                                        )}

                                        {/* =======================
                SELECTED PRODUCTS
            ======================== */}

                                        {productOption === "products" && (
                                            <BlockStack gap="300">

                                                {selectedProducts.length > 0 && (
                                                    <>
                                                        <Text
                                                            as="h3"
                                                            variant="headingSm"
                                                        >
                                                            Products
                                                        </Text>

                                                        {selectedProducts.map((product) => (
                                                            <InlineStack
                                                                key={product.id}
                                                                align="space-between"
                                                                blockAlign="center"
                                                            >
                                                                <InlineStack gap="300" blockAlign="center">

                                                                    {product.images?.[0]?.url ? (
                                                                        <img
                                                                            src={product.images[0].url}
                                                                            alt={product.title}
                                                                            style={{
                                                                                width: "40px",
                                                                                height: "40px",
                                                                                objectFit: "cover",
                                                                                borderRadius: "8px",
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <Box
                                                                            width="40px"
                                                                            height="40px"
                                                                            background="bg-surface-secondary"
                                                                            borderRadius="200"
                                                                        >
                                                                            <Icon source={ImageIcon} />
                                                                        </Box>
                                                                    )}

                                                                    <Text>{product.title}</Text>

                                                                </InlineStack>

                                                                <Button
                                                                    variant="tertiary"
                                                                    tone="critical"
                                                                    onClick={() => removeProduct(product.id)}
                                                                >
                                                                    Delete
                                                                </Button>

                                                            </InlineStack>
                                                        ))}
                                                    </>
                                                )}

                                                <Button
                                                    fullWidth
                                                    onClick={openProductPicker}
                                                >
                                                    {selectedProducts.length
                                                        ? "Select more products"
                                                        : "Select products"}
                                                </Button>

                                            </BlockStack>
                                        )}

                                        {/* =======================
                SELECTED COLLECTIONS
            ======================== */}

                                        {productOption === "collections" && (
                                            <BlockStack gap="300">

                                                {selectedCollections.length > 0 && (
                                                    <>
                                                        <Text
                                                            as="h3"
                                                            variant="headingSm"
                                                        >
                                                            Collections
                                                        </Text>

                                                        {selectedCollections.map((collection) => (
                                                            <InlineStack
                                                                key={collection.id}
                                                                align="space-between"
                                                                blockAlign="center"
                                                            >
                                                                <InlineStack gap="300" blockAlign="center">

                                                                    {collection.image?.url ? (
                                                                        <img
                                                                            src={collection.image.url}
                                                                            alt={collection.title}
                                                                            style={{
                                                                                width: "40px",
                                                                                height: "40px",
                                                                                objectFit: "cover",
                                                                                borderRadius: "8px",
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <Box
                                                                            width="40px"
                                                                            height="40px"
                                                                            background="bg-surface-secondary"
                                                                            borderRadius="200"
                                                                        >
                                                                            <Icon source={ImageIcon} />
                                                                        </Box>
                                                                    )}

                                                                    <Text>{collection.title}</Text>

                                                                </InlineStack>

                                                                <Button
                                                                    variant="tertiary"
                                                                    tone="critical"
                                                                    onClick={() => removeCollection(collection.id)}
                                                                >
                                                                    Delete
                                                                </Button>

                                                            </InlineStack>
                                                        ))}
                                                    </>
                                                )}

                                                <Button
                                                    fullWidth
                                                    onClick={openCollectionPicker}
                                                >
                                                    {selectedCollections.length
                                                        ? "Select more collections"
                                                        : "Select collections"}
                                                </Button>

                                            </BlockStack>
                                        )}

                                    </BlockStack>
                                </CollapsibleCard>



                                {/* Settings */}

                                <CollapsibleCard
                                    title="Settings"
                                    icon={SettingsIcon}
                                    open={settingsOpen}
                                    setOpen={setSettingsOpen}
                                >
                                    <BlockStack gap="400" marginBlockStart="400">
                                        <TextField
                                            label="Name (only visible for you)"
                                            value={bundleName}
                                            onChange={setBundleName}
                                            autoComplete="off"
                                        />
                                        <TextField
                                            label="Block title"
                                            value={blockTitle}
                                            onChange={blockTitleName}
                                            autoComplete="off"
                                        />
                                        <TextField
                                            label="Discount name (shown in cart/checkout)"
                                            value={discountName}
                                            onChange={setDiscountName}
                                            autoComplete="off"
                                        />
                                        {/* <Box
                                            style={{
                                                height: "1px",
                                                background: "var(--p-color-border-secondary)",
                                                width: "100%",
                                            }}
                                        /> */}
                                        <Divider />
                                        <Text as="h2" variant="headingMd">
                                            Visibility
                                        </Text>
                                        {/* <Select
                                            label="Markets"
                                            options={marketOptions}
                                            value={selectedMarket}
                                            onChange={setSelectedMarket}
                                        /> */}
                                    </BlockStack>
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
                </InlineGrid>
            </Page>
        </>
    );
}