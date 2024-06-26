"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/@ui/dialog";
import { Typography } from "@/components/Typography";
import { useModalsStore } from "@/packages/stores/modals";
import { useState } from "react";
import { LoginForm } from "./components/login";
import { RegistrationForm } from "./components/registration";

export const AuthBase = () => {
  const { auth, setModal } = useModalsStore();
  const [tab, setTab] = useState<"login" | "registration">("login");

  return (
    <Dialog open={auth} onOpenChange={(open) => !open && setModal("auth", false)}>
      <DialogContent>
        <DialogHeader>
          <Typography variant="h1">{tab === "login" ? "Вход" : "Регистрация"}</Typography>
        </DialogHeader>
        {tab === "login" ? <LoginForm /> : <RegistrationForm />}
        <DialogFooter className="items-center justify-start gap-1 sm:justify-start">
          {tab === "login" ? (
            <>
              <Typography variant="span">У вас нет аккаунта?</Typography>
              <button className="text-accent" onClick={() => setTab("registration")}>
                Зарегистрироваться
              </button>
            </>
          ) : (
            <>
              <Typography variant="span">Уже есть аккаунт?</Typography>
              <button className="text-accent" onClick={() => setTab("login")}>
                Войти
              </button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
