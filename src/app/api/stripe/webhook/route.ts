import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Error("Stripe webhook secret is not found");
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Error("Stripe signature is not found");
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });

  // HMAC com SHA256
  const events = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (events.type) {
    case "invoice.paid": {
      if (!events.data.object.id) {
        throw new Error("Invoice ID is not found");
      }
      const subscription = await stripe.subscriptions.retrieve(
        events.data.object.id,
      );
      if (!subscription) {
        throw new Error("Subscription is not found");
      }
      const userId = subscription.metadata.userId;
      if (!userId) {
        throw new Error("User ID is not found");
      }
      await db
        .update(usersTable)
        .set({
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          plan: "essential",
        })
        .where(eq(usersTable.id, userId));
    }
    case "customer.subscription.deleted": {
      if (!events.data.object.id) {
        throw new Error("Subscription ID is not found");
      }
      const subscription = await stripe.subscriptions.retrieve(
        events.data.object.id,
      );
      if (!subscription) {
        throw new Error("Subscription is not found");
      }
      const userId = subscription.metadata.userId;
      if (!userId) {
        throw new Error("User ID is not found");
      }
      await db
        .update(usersTable)
        .set({
          stripeCustomerId: null,
          stripeSubscriptionId: null,
          plan: null,
        })
        .where(eq(usersTable.id, userId));
    }
  }
  return NextResponse.json({ received: true });
};
