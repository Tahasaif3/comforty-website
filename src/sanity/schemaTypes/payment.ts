import { defineType } from "sanity";

export const paymentSchema = defineType({
  name: "payments",
  title: "Payments",
  type: "document",
  fields: [
    { name: "paymentId", title: "Payment ID", type: "number" },
    { name: "order", title: "Order", type: "reference", to: [{ type: "orders" }] },
    { name: "amount", title: "Amount", type: "number" },
    { name: "method", title: "Payment Method", type: "string" },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Pending", "Completed", "Failed"] },
    },
  ],
});
