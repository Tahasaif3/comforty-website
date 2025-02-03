import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const cartQuery = groq`
  *[_type == "products"] {
    _id,
    title,
    price,
    "image": image.asset->url,
    "quantity": 1
  }
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cartItems = await client.fetch(cartQuery);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
