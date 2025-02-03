import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { v4 as uuidv4 } from "uuid"

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN,
})

interface CartItem {
  _id: string
  title: string
  quantity: number
  price: number
}

interface CheckoutData {
  name: string
  email: string
  phone: string
  company?: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  orderNotes?: string
  cart: CartItem[]
  totalPrice: number
}

export async function POST(req: Request) {
  try {
    const body: CheckoutData = await req.json()

    const order = await client.create({
      _type: "order",
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      address: body.address,
      city: body.city,
      state: body.state,
      zip: body.zip,
      country: body.country,
      orderNotes: body.orderNotes,
      items: body.cart.map((item) => ({
        _key: uuidv4(),
        _type: "orderItem",
        product: { _type: "reference", _ref: item._id },
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: body.totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    })

    console.log("Order created in Sanity:", order._id)
    return NextResponse.json({ message: "Order placed successfully!", orderId: order._id }, { status: 200 })
  } catch (error) {
    console.error("Error processing order:", error)
    //@ts-expect-error:error
    return NextResponse.json({ error: "Failed to process order", details: error.message }, { status: 500 })
  }
}

