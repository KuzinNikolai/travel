import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/@ui/form";
import { Input } from "@/components/@ui/input";
import { Button } from "@/components/Buttons/Button";
import { useLogin } from "@/packages/hooks/auth/login";
import { LoginRequest, loginRequestScheme } from "@/packages/schemes/auth/login/client.schema";
import { useModalsStore } from "@/packages/stores/modals";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const { setModal } = useModalsStore();
  const login = useLogin();

  const form = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginRequestScheme),
  });

  const onSubmit = form.handleSubmit(async (data: LoginRequest) => {
    await login(data);
    setModal("auth", false);
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
              <FormLabel>* Ваша почта</FormLabel>
              <FormControl>
                <Input type="email" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* Ваш пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} required autoComplete="current-password webauthn" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
          Войти
        </Button>
      </form>
    </Form>
  );
};
