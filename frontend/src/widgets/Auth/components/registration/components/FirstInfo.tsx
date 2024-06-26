"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/@ui/form";
import { Input } from "@/components/@ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FirstInfo as IFirstInfo, firstInfoSchema } from "../schema";
import { useFirstInfoStore } from "../store/firstInformation";
import { Button } from "@/components/Buttons/Button";

interface IFirstInfoProps {
  next: () => void;
}

export const FirstInfo: FC<IFirstInfoProps> = ({ next }) => {
  const { setFormData } = useFirstInfoStore();

  const form = useForm<IFirstInfo & { confirm_password: string }>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(firstInfoSchema),
  });

  const onSubmit = form.handleSubmit(async (data: IFirstInfo) => {
    setFormData(data);
    next();
  });

  useEffect(() => {
    form.setFocus("email");
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-3">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* Почта</FormLabel>
              <FormControl>
                <Input type="text" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* Логин</FormLabel>
              <FormControl>
                <Input type="text" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* Пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} required autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting} className="w-full">
          перейти к следующему шагу
        </Button>
      </form>
    </Form>
  );
};
