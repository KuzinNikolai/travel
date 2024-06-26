import { clientVerify } from "@/packages/API/fetches/auth/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/@ui/form";
import { InputOTP, InputOTPSlot } from "@components/@ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerificationRequest, verificationRequestSchema } from "@packages/schemes/auth/verify/client.schema";
import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useFirstInfoStore } from "../store/firstInformation";
import { useLogin } from "../../login/utils";
import { useToast } from "@/widgets/Toaster";
import { logger } from "@/packages/utils/logger";
import { useModalsStore } from "@/packages/stores/modals";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/Buttons/Button";

interface IVerifyCodeProps {
  goToStep: (step: number) => void;
}

export const VerifyCode: FC<IVerifyCodeProps> = ({ goToStep }) => {
  const { setModal } = useModalsStore();
  const { getFormData, setFormData } = useFirstInfoStore();
  const formRef = useRef<HTMLFormElement>(null);
  const login = useLogin();
  const { toast } = useToast();

  const form = useForm<VerificationRequest>({
    resolver: zodResolver(verificationRequestSchema),
  });

  const onSubmit = form.handleSubmit(async (data: VerificationRequest) => {
    let res: Response | null = null;

    try {
      res = await clientVerify(data);
    } catch (e) {
      logger.error(e);
      return;
    }

    if (res.ok) {
      const formData = getFormData();
      if (!formData) return;
      setFormData(null);
      toast({ title: "Поздравляем", description: "Вы успешно зарегистрировались!" });
      await login({ email: formData.email, password: formData.password });
      setModal("auth", false);
      return;
    }

    const json = (await res.json()) as { code: string };

    switch (json.code) {
      case "FORBIDDEN": {
        form.setError("code", {
          type: "invalid",
          message: "Неверный код",
        });
        toast({ title: "Ошибка с кодом", description: "Неверный код подтверждения" });
        break;
      }
      case "SERVER_ERROR": {
        toast({ title: "Ошибка", description: "На сервере при проверке кода произошла ошибка" });
        break;
      }
      default:
        toast({ title: "Ошибка", description: "При проверке кода произошла ошибка" });
    }

    form.reset({
      code: "",
    });
  });

  useEffect(() => {
    form.setFocus("code");
  }, []);

  const onChangeCode = (value: string) => {
    form.setValue("code", value);

    if (value.length >= 6) {
      formRef.current?.requestSubmit();
    }
  };

  const onRevert = () => {
    goToStep(0);
    setFormData(null);
  };

  const formData = getFormData();

  return (
    <>
      <div className="flex items-center">
        <Typography variant="h3">
          Код подтверждения отправлен на почту {formData?.email ?? "неизвестно"}, если это не правильная почта вы можете
          вернуться на 1 этап.
          <Button variant="link" onClick={onRevert}>
            Перейти на этап регистрации
          </Button>
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-3" ref={formRef}>
          <FormField
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>* Код</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    onChange={onChangeCode}
                    className="w-full !gap-[0.4rem]"
                    disabled={form.formState.isSubmitting}
                  >
                    <InputOTPSlot index={0} className="flex-1" />
                    <InputOTPSlot index={1} className="flex-1" />
                    <InputOTPSlot index={2} className="flex-1" />
                    <InputOTPSlot index={3} className="flex-1" />
                    <InputOTPSlot index={4} className="flex-1" />
                    <InputOTPSlot index={5} className="flex-1" />
                  </InputOTP>
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Код подтверждения приходит на вашу почту, пожалуйста, проверьте почту. Если вы не получили код,
                  пожалуйста, проверьте папку спам. Если вы не можете получить код, пожалуйста, обратитесь в службу
                  поддержки.
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};
