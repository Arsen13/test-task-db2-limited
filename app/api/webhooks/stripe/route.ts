import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-12-18.acacia',
});

const endpointSecret = process.env.WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        try {
            const stripeData = event.data.object;

            const dbUser = await prisma.user.findUnique({
                where: {
                    email: stripeData.customer_details?.email as string
                }
            })
    
            if (!dbUser) return new Response("User not found", { status: 404 });
    
            await prisma.transaction.create({
                data: {
                    user_id: dbUser.id,
                    stripe_id: stripeData.id,
                    amount_total: stripeData.amount_total as number,
                    currency: stripeData.currency as string,
                    customer_email: stripeData.customer_details?.email as string,
                    customer_name: stripeData.customer_details?.name as string
                }
            })
            
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
            return new Response("Internal server error", { status: 500 })
        }
    }

    return new Response("Webhook received!", {status: 200})

}