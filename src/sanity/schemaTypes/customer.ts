import { defineType } from "sanity";

export const customerSchema = defineType({
  name: "customers",
  title: "Customers",
  type: "document",
  fields: [
    { name: "customerId", title: "Customer ID", type: "number" },
    { name: "name", title: "Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "address", title: "Address", type: "string" },
    { name: "phoneNo", title: "Phone Number", type: "string" },
    { name: "orders", title: "Orders", type: "array", of: [{ type: "reference", to: [{ type: "orders" }] }] },
  ],
});
