import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@share/ui"
import { Input } from "@share/ui"
import { Button } from "@share/ui"
import { toast } from "@share/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { type FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { type AdditionalInformation, additionalInformationSchema } from "../schema"
import { useRegistrationFormStore } from "../../model"

interface AdditionalInfoProps {
	next: () => void
	back: () => void
}

export const AdditionalInfo: FC<AdditionalInfoProps> = ({ next, back }) => {
	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className='space-y-3'
			>
				<FormField
					name='first_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Ваше имя</FormLabel>
							<FormControl>
								<Input
									type='text'
									{...field}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='last_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Ваша фамилия</FormLabel>
							<FormControl>
								<Input
									type='text'
									{...field}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='age'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Ваш возраст</FormLabel>
							<FormControl>
								<Input
									type='number'
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
				<div className='grid grid-cols-2 gap-1'>
					<Button
						variant='secondary'
						type='submit'
						disabled={!form.formState.isValid || form.formState.isSubmitting}
					>
						перейти к следующему шагу
					</Button>
					<Button
						variant='outline'
						onClick={() => back()}
						disabled={!form.formState.isValid || form.formState.isSubmitting}
					>
						назад
					</Button>
				</div>
			</form>
		</Form>
	)
}
