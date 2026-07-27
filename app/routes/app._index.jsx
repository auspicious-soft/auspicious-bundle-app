import { useLoaderData } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { useState } from "react";
import { useNavigate } from "react-router";

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
  InlineStack,
  Checkbox,
  useIndexResourceState,
} from "@shopify/polaris";

import { ChevronRightIcon, ChevronDownIcon } from "@shopify/polaris-icons";


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

  const navigate = useNavigate();

  const bundleTypes = [
    {
      id: "1",
      type_name: "Frequently Bought Together",
      status: true,
      children: [
        { id: "1-1", name: "1 Deck" },
        { id: "1-2", name: "2 Decks" },
        { id: "1-3", name: "3 Decks" },
      ],
    },
    {
      id: "2",
      type_name: "Volume Discount",
      status: true,
      children: [],
    },
    {
      id: "3",
      type_name: "Mix & Match",
      status: false,
      children: [],
    },
    {
      id: "4",
      type_name: "Product Bundle",
      status: true,
      children: [],
    },
  ];

  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const { mode, setMode } = useSetIndexFiltersMode();

  const [selectedTab, setSelectedTab] = useState(0);

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(paginatedData);

  // const rowMarkup = paginatedData.map((item, index) => (
  //   <IndexTable.Row
  //     id={item.id}
  //     key={item.id}
  //     position={index}
  //     selected={selectedResources.includes(item.id)}      
  //   >
  //     <IndexTable.Cell>
  //       <InlineStack gap="200" blockAlign="center">
  //         <Button
  //           variant="plain"
  //           icon={expandedRows[item.id] ? ChevronDownIcon : ChevronRightIcon}
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             toggleRow(item.id);
  //           }}
  //           accessibilityLabel="Expand row"
  //         />

  //         <Text as="span" fontWeight="medium">
  //           {item.type_name}
  //         </Text>
  //       </InlineStack>
  //     </IndexTable.Cell>

  //     <IndexTable.Cell>
  //       <Badge tone={item.status ? "success" : "critical"}>
  //         {item.status ? "Active" : "Inactive"}
  //       </Badge>
  //     </IndexTable.Cell>

  //     <IndexTable.Cell>
  //       <InlineStack  gap="400" blockAlign="center">
  //         <div
  //           onClick={(e) => {
  //             e.stopPropagation();
  //           }}
  //         >
  //           <s-switch
  //             checked={item.status}
  //             onChange={(e) => {
  //               toggleStatus(item.id, e.target.checked);
  //             }}
  //           ></s-switch>
  //         </div>

  //         <div
  //           onPointerDown={(e) => e.stopPropagation()}
  //           onClick={(e) => e.stopPropagation()}
  //         >
  //           <s-button
  //             commandfor={`menu-${item.id}`}
  //             icon="menu-horizontal"
  //             variant="tertiary"
  //             accessibilitylabel="More actions"
  //           ></s-button>

  //           <s-menu id={`menu-${item.id}`}>
  //             <s-button icon="duplicate">Duplicate</s-button>
  //             <s-button icon="delete" tone="critical">Remove</s-button>
  //           </s-menu>
  //         </div>
  //       </InlineStack>
  //     </IndexTable.Cell>      
  //   </IndexTable.Row>
  // ));

  const rowMarkup = paginatedData.flatMap((item, index) => {
    const rows = [];

    // Parent Row
    rows.push(
      <IndexTable.Row
        id={item.id}
        key={item.id}
        position={index}
        selected={selectedResources.includes(item.id)}
      >
        <IndexTable.Cell>
          <InlineStack gap="200" blockAlign="center">
            <Button
              variant="plain"
              icon={
                expandedRows[item.id]
                  ? ChevronDownIcon
                  : ChevronRightIcon
              }
              onClick={(e) => {
                e.stopPropagation();
                toggleRow(item.id);
              }}
              accessibilityLabel="Expand row"
            />

            <Text as="span" fontWeight="medium">
              {item.type_name}
            </Text>
          </InlineStack>
        </IndexTable.Cell>

        <IndexTable.Cell>
          <Badge tone={item.status ? "success" : "critical"}>
            {item.status ? "Active" : "Inactive"}
          </Badge>
        </IndexTable.Cell>

        <IndexTable.Cell>
          <InlineStack gap="400" blockAlign="center">
            <div
              onClick={(e) => e.stopPropagation()}
            >
              <s-switch
                checked={item.status}
                onChange={(e) =>
                  toggleStatus(item.id, e.target.checked)
                }
              />
            </div>

            <div
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <s-button
                commandfor={`menu-${item.id}`}
                icon="menu-horizontal"
                variant="tertiary"
                accessibilitylabel="More actions"
              />

              <s-menu id={`menu-${item.id}`}>
                <s-button icon="duplicate">Duplicate</s-button>
                <s-button icon="delete" tone="critical">
                  Remove
                </s-button>
              </s-menu>
            </div>
          </InlineStack>
        </IndexTable.Cell>
      </IndexTable.Row>
    );

    // Child Rows
    if (expandedRows[item.id]) {
      item.children.forEach((child) => {
        rows.push(
          <tr
            key={child.id}
            className="Polaris-IndexTable__TableRow Polaris-IndexTable__TableRow--child Polaris-IndexTable__TableRow--unclickable Polaris-IndexTable--toneSubdued"
          >
            <td className="Polaris-IndexTable__TableCell"></td>

            <td className="Polaris-IndexTable__TableCell">
              <div
                style={{
                  paddingLeft: "32px",
                  fontWeight: 500,
                }}
              >
                {child.name}
              </div>
            </td>

            <td className="Polaris-IndexTable__TableCell"></td>

            <td className="Polaris-IndexTable__TableCell"></td>
          </tr>
        );
      });
    }

    return rows;
  });

  return (
    <Page>
      <BlockStack gap="400">
        <Card>
          <BlockStack gap="400">
            {/* <Text as="h2" variant="headingMd">
              Congrats on installing the Auspicious Bundle App 🎉
            </Text> */}

            <Text as="h2" variant="headingMd">
              Enable Store Widget
            </Text>

            <InlineStack  gap="400" blockAlign="center">
              <span>
                To activate the Auspicious Bundles app, enable the Auspicious Bundles app button.
              </span>

              <Button  
                url={themeEditorUrl}              
                target="_blank"
                variant="secondary"
              >
                Enable Store Widget
              </Button>
            </InlineStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Create Bundles
            </Text>

            <InlineStack  gap="400" blockAlign="center">
              <span>
                Create bundle to display on the product page.
              </span>

              <Button
                onClick={() => navigate("/app/templates")}
                variant="secondary"
              >
                Create Bundle
              </Button>
            </InlineStack>            
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <InlineStack align="space-between" blockAlign="center">
              <Text as="h2" variant="headingMd">
                Bundles
              </Text>
              <Button variant="primary" onClick={() => navigate("/app/templates")}>
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
              selectedItemsCount={
                allResourcesSelected
                  ? "All"
                  : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              promotedBulkActions={[
                {
                  destructive: true,
                  content: "Delete",
                  onAction: () => {
                    console.log(selectedResources);
                  },
                },
              ]}              
              headings={[
                { title: "Type Name" },
                { title: "Status" },
                { title: "Action" }                
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