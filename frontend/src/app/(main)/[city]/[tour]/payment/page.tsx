"use client";

import { DatePicker } from "@/components/@ui/DatePicker";
import { Input } from "@/components/@ui/input";
import { Textarea } from "@/components/@ui/textarea";
import { Button } from "@/components/Button";
import { BackHeader } from "@/components/Headers/BackHeader";
import { Section } from "@/components/layout/Section";
import { mergeRefs } from "@/packages/utils/mergeRefs";
import { toNumber } from "@/packages/utils/toNumber";
import { useToast } from "@/widgets/Toaster";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/@ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMask } from "@react-input/mask";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { paymentFormSchema } from "./formSchema";

const Payment = () => {
  const { toast } = useToast()

  const telRef = useMask({
    mask: "+_ (___) ___-__-__",
    replacement: "_",
    showMask: false,
    separate: true,
  });

  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: "",
      tel: "",
      numberOfAdults: 0,
      numberOfChildren: 0,
      numberOfYoungerChildren: 0,
      comment: "",
      hotel: "",
    },
  });

  function onSubmit(values: z.infer<typeof paymentFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast({
      title: "submit",
      description: "TEST",
    })
  }

  return (
    <>
      <BackHeader />
      <Section title="Заказ экскурсии" className="h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваше имя</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input {...field} ref={mergeRefs(field.ref, telRef)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="hotel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес отеля</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="numberOfAdults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Взрослых</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        form.setValue(
                          "numberOfAdults",
                          toNumber(e.target.value) || 0
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="numberOfChildren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Детей (3-12 лет)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        form.setValue(
                          "numberOfChildren",
                          toNumber(e.target.value) || 0
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="numberOfYoungerChildren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Детей (0-3 лет)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        form.setValue(
                          "numberOfYoungerChildren",
                          toNumber(e.target.value) || 0
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="excursionDate"
              render={({ field }) => (
                <FormItem className="space-y-[0px] flex items-center justify-between">
                  <FormLabel>Дата экскурсии</FormLabel>
                  <FormControl>
                    <DatePicker
                      onSelect={field.onChange}
                      defaultSelect={new Date()}
                      trigger={
                        <Button
                          onClick={() => form.setFocus("excursionDate")}
                          className="bg-gray-200 rounded p-1 m-0"
                          {...field}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Укажите дату"}
                        </Button>
                      }
                      disable={(date) => date.getTime() <= Date.now()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий к заказу</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Отправить заказ</button>
          </form>
        </Form>
      </Section>
    </>
  );
};

export default Payment;
