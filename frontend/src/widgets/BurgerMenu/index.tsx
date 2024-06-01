import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/@ui/sheet";
import { BurgerIcon } from "./_components/BurgerIcon";
import { BurgerSheet } from "./_components/BurgerSheet";

export const BurgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <BurgerIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <BurgerSheet />
      </SheetContent>
    </Sheet>
  );
};
