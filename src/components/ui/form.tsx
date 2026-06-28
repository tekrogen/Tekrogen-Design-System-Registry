"use client";

import { type Label as LabelPrimitive, Slot as SlotPrimitive } from "radix-ui";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Lightweight, dependency-free form primitives. The error string for a field is
// passed to <FormItem error={...}> by the consumer (e.g. from a zod parse);
// labels, controls, and messages read it from context for ids + a11y wiring.

type FormItemContextValue = {
  id: string;
  error?: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

const useFormField = () => {
  const itemContext = React.useContext(FormItemContext);

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }

  const { id, error } = itemContext;

  return {
    id,
    error,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
};

function Form({ className, ...props }: React.ComponentProps<"form">) {
  return <form data-slot="form" className={className} {...props} />;
}

function FormItem({
  className,
  error,
  ...props
}: React.ComponentProps<"div"> & { error?: string }) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id, error }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({
  ...props
}: React.ComponentProps<typeof SlotPrimitive.Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <SlotPrimitive.Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? error : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
