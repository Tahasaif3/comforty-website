// import { defineType, defineField } from 'sanity'

// export const order = defineType({
//   name: 'order',
//   title: 'Order',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'name',
//       title: 'Name',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'email',
//       title: 'Email',
//       type: 'string',
//       validation: (Rule) => Rule.required().email(),
//     }),
//     defineField({
//       name: 'phone',
//       title: 'Phone',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'company',
//       title: 'Company',
//       type: 'string',
//     }),
//     defineField({
//       name: 'address',
//       title: 'Address',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'city',
//       title: 'City',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'state',
//       title: 'State',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'zip',
//       title: 'ZIP',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'country',
//       title: 'Country',
//       type: 'string',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'orderNotes',
//       title: 'Order Notes',
//       type: 'text',
//     }),
//     // defineField({
//     //   name: 'items',
//     //   title: 'Items',
//     //   type: 'array',
//     //   of: [
//     //     {
//     //       type: 'object',
//     //       fields: [
//     //         defineField({
//     //           name: 'product',
//     //           title: 'Product',
//     //           type: 'reference',
//     //           to: [{ type: 'products' }], // Changed from 'product' to 'products'
//     //           validation: (Rule) => Rule.required(),
//     //         }),
//     //         defineField({
//     //           name: 'quantity',
//     //           title: 'Quantity',
//     //           type: 'number',
//     //           validation: (Rule) => Rule.required().min(1),
//     //         }),
//     //         defineField({
//     //           name: 'price',
//     //           title: 'Price',
//     //           type: 'number',
//     //           validation: (Rule) => Rule.required().min(0),
//     //         }),
//     //       ],
//     //     },
//     //   ],
//     //   validation: (Rule) => Rule.required(),
//     // }),
//     defineField({
//       name: "items",
//       title: "Items",
//       type: "array",
//       of: [
//         {
//           type: "object",
//           name: "lineItem",
//           fields: [
//             defineField({
//               name: "product",
//               title: "Product",
//               type: "reference",
//               to: [{ type: "products" }],
//             }),
//             defineField({
//               name: "quantity",
//               title: "Quantity",
//               type: "number",
//             }),
//             defineField({
//               name: "price",
//               title: "Price",
//               type: "number",
//             }),
//           ],
//           preview: {
//             select: {
//               title: "product.title",
//               quantity: "quantity",
//               price: "price",
//             },
//             prepare({ title, quantity, price }) {
//               return {
//                 title: title || "No product title",
//                 subtitle: `Qty: ${quantity} - Price: $${price}`,
//               }
//             },
//           },
//         },
//       ],
//     }),
//     defineField({
//       name: 'totalPrice',
//       title: 'Total Price',
//       type: 'number',
//       validation: (Rule) => Rule.required().min(0),
//     }),
//     defineField({
//       name: 'status',
//       title: 'Status',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'Pending', value: 'pending' },
//           { title: 'Processing', value: 'processing' },
//           { title: 'Shipped', value: 'shipped' },
//           { title: 'Delivered', value: 'delivered' },
//           { title: 'Cancelled', value: 'cancelled' },
//         ],
//       },
//       initialValue: 'pending',
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'createdAt',
//       title: 'Created At',
//       type: 'datetime',
//       initialValue: () => new Date().toISOString(),
//       validation: (Rule) => Rule.required(),
//     }),
//   ],
// })


import { defineField, defineType } from "sanity"

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
    }),
    defineField({
      name: "zip",
      title: "ZIP",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "orderNotes",
      title: "Order Notes",
      type: "text",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "orderItem" }],
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
})

