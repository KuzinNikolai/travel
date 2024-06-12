import { mergeRefs } from "@/packages/utils/mergeRefs";
import { cn } from "@packages/tw-utils";
import { MaskProps, useMask } from "@react-input/mask";
import { InputHTMLAttributes, forwardRef } from "react";
import { z } from "zod";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validator?: z.ZodSchema;
  mask?: MaskProps;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, validator, mask, required, ...props }, ref) => {
    const maskRef = useMask(mask);

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-primary-400 bg-backround-400 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={mergeRefs(maskRef, ref)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
