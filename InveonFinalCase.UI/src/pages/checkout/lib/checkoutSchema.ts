import { z } from "zod";

function luhnCheck(num: string) {
    const cleaned = num.replace(/\D/g, "");
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }
  
  export function detectCardBrand(num: string): "Visa" | "MasterCard" | "Unknown" {
    if (/^4/.test(num)) return "Visa";
    if (/^5[1-5]/.test(num) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(num)) return "MasterCard";
    return "Unknown";
  }
  
  export const zPaymentSchema = z.object({
    cardNumber: z
      .string()
      .regex(/^\d+$/, "Card number must contain only digits")
      .refine((val) => val.length >= 13 && val.length <= 19, {
        message: "Card number should be between 13 and 19 digits",
      })
      .refine((val) => luhnCheck(val), { message: "Invalid card number" }),
  
    expiration: z
      .string()
      .refine((val) => {
        return val.length === 5 && /^\d{2}\/\d{2}$/.test(val);
      }, { message: "Invalid expiration format (MM/YY)" }),
  
    cvc: z
      .string()
      .refine((val) => /^\d{3}$/.test(val), { message: "CVC must be 3 digits" }),
  
    cardholderName: z.string().min(1, "Cardholder name is required"),
    saveCard: z.boolean().default(false),
  });
  
  export type PaymentFormValues = z.infer<typeof zPaymentSchema>;