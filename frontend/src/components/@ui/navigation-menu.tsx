import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@packages/tw-utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "uirelative uiz-10 uiflex uimax-w-max uiflex-1 uiitems-center uijustify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "uigroup uiflex uiflex-1 uilist-none uiitems-center uijustify-center uispace-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "uigroup uiinline-flex uih-10 uiw-max uiitems-center uijustify-center uirounded-md uibg-background uipx-4 uipy-2 uitext-sm uifont-medium uitransition-colors hover:uibg-accent hover:uitext-accent-foreground focus:uibg-accent focus:uitext-accent-foreground focus:uioutline-none disabled:uipointer-events-none disabled:uiopacity-50 data-[active]:uibg-accent/50 data-[state=open]:uibg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "uigroup", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="uirelative uitop-[1px] uiml-1 uih-3 uiw-3 uitransition uiduration-200 group-data-[state=open]:uirotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "uileft-0 uitop-0 uiw-full data-[motion^=from-]:uianimate-in data-[motion^=to-]:uianimate-out data-[motion^=from-]:uifade-in data-[motion^=to-]:uifade-out data-[motion=from-end]:uislide-in-from-right-52 data-[motion=from-start]:uislide-in-from-left-52 data-[motion=to-end]:uislide-out-to-right-52 data-[motion=to-start]:uislide-out-to-left-52 md:uiabsolute md:uiw-auto ui",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("uiabsolute uileft-0 uitop-full uiflex uijustify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "uiorigin-top-center uirelative uimt-1.5 uih-[var(--radix-navigation-menu-viewport-height)] uiw-full uioverflow-hidden uirounded-md uiborder uibg-popover uitext-popover-foreground uishadow-lg data-[state=open]:uianimate-in data-[state=closed]:uianimate-out data-[state=closed]:uizoom-out-95 data-[state=open]:uizoom-in-90 md:uiw-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "uitop-full uiz-[1] uiflex uih-1.5 uiitems-end uijustify-center uioverflow-hidden data-[state=visible]:uianimate-in data-[state=hidden]:uianimate-out data-[state=hidden]:uifade-out data-[state=visible]:uifade-in",
      className
    )}
    {...props}
  >
    <div className="uirelative uitop-[60%] uih-2 uiw-2 uirotate-45 uirounded-tl-sm uibg-border uishadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
