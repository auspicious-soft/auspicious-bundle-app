import { useLoaderData } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { useState } from "react";

import {
  Page,
  Card,
  IndexTable,
  Text,
  Badge,
  Button,
  BlockStack,
  Pagination,
  TextField,
  IndexFilters,
  useSetIndexFiltersMode,
  InlineStack 
} from "@shopify/polaris";


export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const shopHandle = session.shop.replace(".myshopify.com", "");

  const apiKey = "237ff610ab8dfd2f10aeb63827383865";
  const embedHandle = "bundles";

  const themeEditorUrl =
    `https://admin.shopify.com/store/${shopHandle}/themes/current/editor` +
    `?context=apps` +
    `&template=product` +
    `&activateAppId=${apiKey}/${embedHandle}`;

  return { themeEditorUrl };
};

export default function Index() {
  const { themeEditorUrl } = useLoaderData();

  const bundleTypes = [
    {
      id: "1",
      type_name: "Frequently Bought Together",
      status: true,
    },
    {
      id: "2",
      type_name: "Volume Discount",
      status: true,
    },
    {
      id: "3",
      type_name: "Mix & Match",
      status: false,
    },
    {
      id: "4",
      type_name: "Product Bundle",
      status: true,
    },
  ];

  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const { mode, setMode } = useSetIndexFiltersMode();

  const [selectedTab, setSelectedTab] = useState(0);

  const sortOptions = [
    { label: "Bundle Name (A-Z)", value: "name asc" },
    { label: "Bundle Name (Z-A)", value: "name desc" },
  ];

  const [sortSelected, setSortSelected] = useState(["name asc"]);

  const tabs = [
    {
      id: "all",
      content: "All",
    },
    {
      id: "active",
      content: "Active",
    },
    {
      id: "inactive",
      content: "Inactive",
    },
  ];

  const pageSize = 10;

  const filteredBundleTypes = bundleTypes.filter((item) => {
    let matchSearch = item.type_name
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    if (selectedTab === 1) {
      return matchSearch && item.status;
    }

    if (selectedTab === 2) {
      return matchSearch && !item.status;
    }

    return matchSearch;
  });

  const totalPages = Math.ceil(
    filteredBundleTypes.length / pageSize
  );

  const paginatedData = filteredBundleTypes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const rowMarkup = paginatedData.map((item, index) => (
    <IndexTable.Row
      id={item.id}
      key={item.id}
      position={index}
    >
      <IndexTable.Cell>
        <Text as="span" fontWeight="medium">
          {item.type_name}
        </Text>
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Badge tone={item.status ? "success" : "critical"}>
          {item.status ? "Active" : "Inactive"}
        </Badge>
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Button size="slim">Edit</Button>
      </IndexTable.Cell>

      <IndexTable.Cell>
        <Button tone="critical" size="slim">
          Delete
        </Button>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page>
      <BlockStack gap="400">
      <Card>
        <Text as="h2" variant="headingMd">
          Congrats on installing the Auspicious Bundle App 🎉
        </Text>

        <p style={{ marginBottom: "20px" }}>
          Enable app from the theme editor { }
          <a
            href={themeEditorUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enable App
          </a>
        </p>
        </Card>

        <Card>
        <Text as="h2" variant="headingMd">
          Create Bundles
        </Text>

        <p style={{ marginBottom: "20px" }}>
          Create bundle to display on the product page {" "}
          <a
            href="#"
            rel="noopener noreferrer"
          >
            Create Bundle
          </a>
        </p>
        </Card>

        <Card>
          <BlockStack gap="400">
            <InlineStack align="space-between" blockAlign="center">
              <Text as="h2" variant="headingMd">
                Bundles
              </Text>
              <Button variant="primary">
                Create Bundle
              </Button>
            </InlineStack>
            <IndexFilters
              // sortOptions={sortOptions}
              // sortSelected={sortSelected}
              // onSort={setSortSelected}
              queryValue={searchValue}
              queryPlaceholder="Search bundle types"
              onQueryChange={(value) => {
                setSearchValue(value);
                setCurrentPage(1);
              }}
              onQueryClear={() => setSearchValue("")}
              tabs={tabs}
              selected={selectedTab}
              onSelect={setSelectedTab}
              filters={[]}
              appliedFilters={[]}
              onClearAll={() => setSearchValue("")}
              mode={mode}
              setMode={setMode}
              canCreateNewView={false}
              cancelAction={{
                onAction: () => {
                  setSearchValue("");
                  setMode("default");
                },
                disabled: false,
                loading: false,
              }}
            />
            <IndexTable
              resourceName={{
                singular: "Bundle Type",
                plural: "Bundle Types",
              }}
              itemCount={filteredBundleTypes.length}
              selectable={false}
              headings={[
                { title: "Type Name" },
                { title: "Status" },
                { title: "Edit" },
                { title: "Delete" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
            <Pagination
              hasPrevious={currentPage > 1}
              onPrevious={() => setCurrentPage(currentPage - 1)}

              hasNext={currentPage < totalPages}
              onNext={() => setCurrentPage(currentPage + 1)}
            />
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};