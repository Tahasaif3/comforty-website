import { defineType } from "sanity";

export const shipmentSchema = defineType({
  name: "shipments",
  title: "Shipments",
  type: "document",
  fields: [
    { name: "shipmentId", title: "Shipment ID", type: "number" },
    { name: "order", title: "Order", type: "reference", to: [{ type: "orders" }] },
    { name: "trackingNo", title: "Tracking Number", type: "string" },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Pending", "Shipped", "Delivered"] },
    },
    { name: "deliveryDate", title: "Delivery Date", type: "datetime" },
  ],
});
