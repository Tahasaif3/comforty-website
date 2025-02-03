import { defineType } from "sanity";

export const deliveryZoneSchema = defineType({
  name: "deliveryZones",
  title: "Delivery Zones",
  type: "document",
  fields: [
    { name: "zoneName", title: "Zone Name", type: "string" },
    { name: "deliveryId", title: "Delivery ID", type: "number" },
    { name: "driverName", title: "Driver Name", type: "string" },
    { name: "deliveryFee", title: "Delivery Fee", type: "number" },
  ],
});
