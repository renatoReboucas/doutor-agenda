"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SubscriptionPlanProps {
  active?: boolean;
}

export default function SubscriptionPlan({
  active = false,
}: SubscriptionPlanProps) {
  const createStripeCheckoutAction = useAction(createStripeCheckout, {
    onSuccess: async ({ data }) => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
        throw new Error("Stripe publishable key is not found");
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
      );
      if (!stripe) throw new Error("Stripe is not found");
      if (!data?.sessionId) throw new Error("Session ID is not found");
      await stripe?.redirectToCheckout({ sessionId: data?.sessionId });
    },
  });

  const features = [
    "Cadastro de até 3 médicos",
    "Agendamentos ilimitados",
    "Métricas básicas",
    "Cadastro de pacientes",
    "Confirmação manual",
    "Suporte via e-mail",
  ];

  const handleSubscribeClick = async () => {
    createStripeCheckoutAction.execute();
  };

  return (
    <Card className="w-[350px] border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="mb-2 flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Essential
          </CardTitle>
          {active && (
            <Badge className="text-primary bg-primary/10 hover:bg-primary/10">
              Atual
            </Badge>
          )}
        </div>
        <CardDescription className="mb-4 text-sm text-gray-600">
          Para profissionais autônomos ou pequenas clínicas
        </CardDescription>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">R$59</span>
          <span className="ml-1 text-gray-600">/ mês</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="size-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={active ? () => {} : handleSubscribeClick}
          disabled={createStripeCheckoutAction.isExecuting}
        >
          {createStripeCheckoutAction.isExecuting ? (
            <Loader2 className="mr-1 size-4 animate-spin" />
          ) : (
            <>{active ? "Gerenciar assinatura" : "Fazer assinatura"}</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
