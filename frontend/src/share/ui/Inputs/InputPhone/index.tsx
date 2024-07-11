import { forwardRef, type HTMLAttributes } from "react"
import { defaultCountries, usePhoneInput, type UsePhoneInputConfig } from "react-international-phone"
import { Input } from "../Input"
import { FlagImagePreview } from "./components"
import { logger, mergeRefs } from "@share/lib"

interface PhoneInputProps {
	onChange(phone: string): void
}

export const InputPhone = forwardRef<HTMLInputElement, PhoneInputProps & HTMLAttributes<HTMLInputElement>>(
	(props, ref) => {
		const { country, handlePhoneValueChange, inputRef, inputValue, setCountry } = usePhoneInput({
			...props,
			defaultCountry: "ru",
			countries: defaultCountries,
			prefix: "+",
			onChange(data) {
				props.onChange(data.phone)
			},
		})

		return (
			<div className='relative'>
				<FlagImagePreview
					iso2={country.iso2}
					onChangeCountry={(val) => setCountry(val)}
				/>
				<Input
					className='pl-[50px]'
					type='tel'
					value={inputValue}
					onChange={handlePhoneValueChange}
					ref={mergeRefs(inputRef, ref)}
				/>
			</div>
		)
	},
)
