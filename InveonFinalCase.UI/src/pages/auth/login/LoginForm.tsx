import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import useAuth from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DecodedToken, loginUser } from "./api";

type ErrorResponse = {
  type: string;
  title: string;
  status: number;
  detail: string;
};

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string()
});

export function LoginForm() {

  const { setUserAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [serverError, setServerError] = useState<ErrorResponse>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
        const accessToken = data.token.accessToken;
        const refreshToken = data.token.refreshToken;
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        const { given_name } = decodedToken;
        let { roles } = decodedToken;

        if (typeof roles === "string") {
            roles = [roles];
        }
        setUserAuth({ user: given_name, roles, accessToken, refreshToken });
        navigate(from, { replace: true });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
        console.error("Login Failed:", error);
        setServerError(error.response?.data || "An error occurred during login.");
    },
});

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      {serverError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{serverError.title}</AlertTitle>
            <AlertDescription>{serverError.detail}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant='default' className="w-full" type="submit">
          {mutation.isPending ? <Loader2 className="animate-spin" />
          : "Login"}
        </Button>
      </form>
    </Form>
  );
}
