"use client";

import { AvatarFallback, AvatarImage } from "@/components/@ui/avatar";
import { Button } from "@/components/Buttons/Button";
import { Skeleton } from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { useModalsStore } from "@/packages/stores/modals";
import { useUserStore } from "@/packages/stores/user";
import { Avatar } from "@radix-ui/react-avatar";

export const UserInfo = () => {
  const { setModal } = useModalsStore();
  const { user } = useUserStore();

  return user ? (
    <button className="grid grid-cols-[40px_1fr] items-center gap-2">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/300" className="h-10 w-10 rounded-full object-cover object-center" />
        <AvatarFallback>
          <Skeleton className="h-10 w-10 rounded-full" />
        </AvatarFallback>
      </Avatar>
      <Typography variant="span" as="p" textWidth="light" className="truncate">
        {user.name} {user.surname}
      </Typography>
    </button>
  ) : (
      <Button variant="ghost" className="w-full items-center justify-center" onClick={() => setModal("auth", true)}>
        Авторизоваться
      </Button>
  );
};
