import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/@ui/sheet";
import { BurgerIcon } from "./_components/BurgerIcon";
import { BurgerSheet } from "./_components/BurgerSheet";

export const BurgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <BurgerIcon />
      </SheetTrigger>
      <SheetContent side="right" className="w-[70%]">
        <BurgerSheet />
      </SheetContent>
    </Sheet>
  );
};
