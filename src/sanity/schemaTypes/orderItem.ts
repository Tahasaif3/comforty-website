import { defineField, defineType } from "sanity"

export default defineType({
  name: "orderItem",
  title: "Order Item",
  type: "object",
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "products" }],
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "product.title",
      quantity: "quantity",
      price: "price",
    },
    prepare({ title, quantity, price }) {
      return {
        title: title || "No product title",
        subtitle: `Qty: ${quantity} - Price: $${price}`,
      }
    },
  },
})

