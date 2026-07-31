export const templatePreview = {
  quantity_break: {
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
          { label: "Black", value: "black" },
          { label: "Blue", value: "blue" },
          { label: "Red", value: "red" },
        ],
      },
    ],
  },

  bxgy: {
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
        freeGift: true,
      },
    ],
  },

  bundle: {
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
        },
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
};