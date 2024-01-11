import { CartContext } from "@/contexts/CartContext";
import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { useContext } from "react";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { lineItems } = req.body;

    if (req.method != 'POST') {
        return res.status(405).json({error: 'Method not allowed.'})
    }

    if (!lineItems) {
        return res.status(400).json({error: 'Products not found.'})
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancel = `${process.env.NEXT_URL}/`

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancel,
        mode: 'payment',
        line_items: lineItems,
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}