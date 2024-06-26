import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/@ui/form";
import { Input } from "@/components/@ui/input";
import { clientRegistration } from "@/packages/API/fetches/auth/client";
import { toast } from "@/widgets/Toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AdditionalInformation, additionalInformationSchema } from "../schema";
import { useFirstInfoStore } from "../store/firstInformation";
import { Button } from "@/components/Buttons/Button";

interface IAdditionalInfoProps {
  next: () => void;
  back: () => void;
}

export const AdditionalInfo: FC<IAdditionalInfoProps> = ({ next, back }) => {
  const { getFormData } = useFirstInfoStore();

  const form = useForm<AdditionalInformation>({
    defaultValues: {
      first_name: "",
      last_name: "",
      age: 18,
    },
    resolver: zodResolver(additionalInformationSchema),
  });

  const onSubmit = form.handleSubmit(async (data: AdditionalInformation) => {
    const firstInfo = getFormData();

    const register = await clientRegistration(Object.assign({}, firstInfo, data));

    if (register.ok) {
      next();
      toast({
        title: "Успешно",
        description: "Вы успешно зарегистрировались. Осталось только подтвердить почту",
      });
    } else {
      try {
        const res = (await register.json()) as { code: string };

        switch (res.code) {
          case "INVALID_BODY": {
            toast({
              title: "Ошибка",
              description: "Некорректные данные",
            });
            break;
          }
          case "USER_ALREADY_EXISTS": {
            toast({
              title: "Ошибка",
              description: "Пользователь с почтой или логином уже существует",
            });
            back();
            break;
          }
        }
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Неизвестная ошибка",
        });
      }
    }
  });

  useEffect(() => {
    form.setFocus("first_name");
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-3">
        <FormField
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* Ваше имя</FormLabel>
              <FormControl>
                <Input type="text" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* Ваша фамилия</FormLabel>
              <FormControl>
                <Input type="text" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* Ваш возраст</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  min={18}
                  max={110}
                  required
                  onChange={(e) => form.setValue("age", e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-1">
          <Button variant="secondary" type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
            перейти к следующему шагу
          </Button>
          <Button
            variant="outline"
            onClick={() => back()}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            назад
          </Button>
        </div>
      </form>
    </Form>
  );
};
