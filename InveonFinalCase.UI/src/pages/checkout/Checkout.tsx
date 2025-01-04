import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "../cart/context/CartContext";
import {
  detectCardBrand,
  PaymentFormValues,
  zPaymentSchema,
} from "./lib/checkoutSchema";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Loading } from "@/components/Loading";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

type OrderData = {
    orderItems: { courseId: string; price: number }[];
    payment: {
        cardType: "Visa" | "MasterCard" | "Unknown";
        last4Digits: string;
        amount: number;
    };
};

export default function PaymentPage() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { toast } = useToast()

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(zPaymentSchema),
    defaultValues: {
      cardNumber: "",
      expiration: "",
      cvc: "",
      cardholderName: "",
      saveCard: false,
    },
  });

  const [cardBrand, setCardBrand] = useState<"Visa" | "MasterCard" | "Unknown">(
    "Unknown"
  );
  const cardNumberValue = form.watch("cardNumber");

  useEffect(() => {
    setCardBrand(detectCardBrand(cardNumberValue));
  }, [cardNumberValue]);

const {mutate, isPending} = useMutation({
    mutationFn: async (orderData: OrderData) => {
        const response = await axiosPrivate.post("/orders", orderData);
        return response.data;
    },
    onSuccess: (data) => {
        navigate("/order-success", { replace: true });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
        console.log("Error =>", error);
        toast({
            variant: "destructive",
            title: "Payment Failed",
            description: error.response?.statusText || "An error occurred.",
          })
    },
});

  // Expiration mask ("MM/YY")
  function handleExpirationMask(value: string): string {
    let raw = value.replace(/\D/g, "");

    if (raw.length > 4) {
      raw = raw.slice(0, 4);
    }

    if (raw.length >= 3) {
      let mm = parseInt(raw.slice(0, 2), 10);
      const yy = raw.slice(2);

      if (mm > 12) {
        mm = 12;
      }

      const mmStr = mm.toString().padStart(2, "0");
      raw = `${mmStr}/${yy}`;
    }

    return raw;
  }

  const onSubmit = (data: PaymentFormValues) => {
    const orderItems = cart.map((item) => ({
      courseId: item.id,
      price: item.price,
    }));
    const last4 = data.cardNumber.slice(-4);

    const orderData = {
      orderItems,
      payment: {
        cardType: cardBrand,
        last4Digits: last4,
        amount: totalAmount,
      },
    };

    console.log("Submitting order =>", orderData);
    mutate(orderData);
  };

  if (isPending) return <Loading />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold">Payment Information</h1>

          <div className="border border-border rounded p-4 space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <div className="relative">
                    <Input
                      className="pr-14"
                      placeholder="1234 5678 9012 3456"
                      value={field.value}
                      onChange={(e) => {
                        let raw = e.target.value.replace(/[^\d]/g, "");
                        if (raw.length > 19) raw = raw.slice(0, 19);
                        field.onChange(raw);
                      }}
                    />
                    {cardBrand !== "Unknown" && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {cardBrand}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration (MM/YY)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YY"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(handleExpirationMask(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="CVC"
                        value={field.value}
                        onChange={(e) => {
                          let raw = e.target.value.replace(/\D/g, "");
                          if (raw.length > 3) {
                            raw = raw.slice(0, 3);
                          }
                          field.onChange(raw);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name on card"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saveCard"
              render={({ field }) => (
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="h-4 w-4"
                    id="saveCard"
                  />
                  <Label htmlFor="saveCard" className="text-sm">
                    Save this card for future payments
                  </Label>
                </div>
              )}
            />
          </div>

          <div className="bg-card shadow-sm space-y-4">
            <h3 className="text-base font-semibold">
              Order Details ({cart.length} courses)
            </h3>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{item.name}</span>
                  <span className="text-primary font-medium">
                    ₺{item.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold">Summary</h2>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground font-medium">
                Total ({cart.length} courses):
              </span>
              <div className="text-3xl font-bold">
                ₺{totalAmount.toFixed(2)}
              </div>
            </div>

            <Separator />

            <p className="text-sm text-muted-foreground">
              30-Day Money-Back Guarantee
            </p>
            <p className="text-xs text-muted-foreground">
              Not satisfied? You can request a refund within 30 days.
            </p>
          </div>

          <Button type="submit" className="w-full mt-4">
            Complete Payment
          </Button>
        </div>
      </form>
    </Form>
  );
}
