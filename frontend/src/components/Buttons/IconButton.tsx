import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@packages/tw-utils";
import { Icon, IconsName } from "../Icon";
import { ButtonHTMLAttributes, HTMLAttributes, forwardRef } from "react";
import { Typography } from "../Typography";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "w-10 h-10 rounded-full p-2",
        // lg: "w-10 h-10 rounded-full p-2"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  icon: IconsName;
  iconProps?: HTMLAttributes<SVGSVGElement>;
  description?: string;
  asChild?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, description, size, icon, iconProps = {}, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const IconComp = asChild ? (
      children
    ) : (
      <>
        <Icon name={icon} {...iconProps} />
        {description && (
          <Typography variant="span" className="sr-only">
            {description}
          </Typography>
        )}
      </>
    );

    return (
      <Comp className={cn(iconButtonVariants({ variant, size, className }))} ref={ref} {...props}>
        {IconComp}
      </Comp>
    );
  },
);

IconButton.displayName = "Button";

export { IconButton, iconButtonVariants as buttonVariants, type IconButtonProps };
