import {
    Card,
    Box,
    Text,
    InlineStack,
    Icon,
    Collapsible,
} from "@shopify/polaris";

import {
    ChevronRightIcon,
    ChevronDownIcon,
} from "@shopify/polaris-icons";

export default function CollapsibleCard({
    title,
    icon,
    open,
    setOpen,
    children,
}) {
    return (
        <Card padding="600">
            <Box
                padding="400"
                onClick={() => setOpen(!open)}
                style={{
                    cursor: "pointer",
                    userSelect: "none",
                }}
            >
                <InlineStack
                    align="space-between"
                    blockAlign="center"
                >
                    <InlineStack
                        gap="300"
                        blockAlign="center"
                    >
                        <Icon
                            source={open ? ChevronDownIcon : ChevronRightIcon}
                        />

                        {icon && <Icon source={icon} />}

                        <Text
                            as="h3"
                            variant="headingMd"
                        >
                            {title}
                        </Text>
                    </InlineStack>
                </InlineStack>
            </Box>

            <Collapsible open={open} id={title}>
                <Box
                    paddingInline="400"
                    paddingBlockEnd="400"
                >
                    {children}
                </Box>
            </Collapsible>
        </Card>
    );
}