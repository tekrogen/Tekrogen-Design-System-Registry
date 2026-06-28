"use client";

import { Logo } from "@/components/logo";

import Link from "next/link";
import * as React from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

function LoginForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = formSchema.safeParse({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if ((key === "email" || key === "password") && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
  }

  return (
    <div className="grid gap-6">
      <Form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormItem error={errors.email}>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input name="email" type="email" placeholder="name@example.com" />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem error={errors.password}>
          <div className="flex items-center justify-between">
            <FormLabel>Password</FormLabel>
            <Link
              href="#forgot-password"
              className="text-muted-foreground text-xs hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>
          <FormControl>
            <Input name="password" type="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" disabled={isLoading}>
          Google
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          Microsoft
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export function Login() {
  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-foreground/10 p-10 text-foreground lg:flex dark:border-r">
        <div className="relative z-20 flex items-center font-medium text-lg">
          <Logo />
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Tbh @shadcn really cooked with @shadcn. Keeps passing the
              test of time.&rdquo;
            </p>
            <footer className="text-sm">Guillermo Rauch, CEO of Vercel</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-semibold text-2xl tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your email to sign in to your account
            </p>
          </div>

          <LoginForm />

          <p className="px-8 text-center text-muted-foreground text-sm">
            By clicking continue, you agree to our{" "}
            <Link
              href="#terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
