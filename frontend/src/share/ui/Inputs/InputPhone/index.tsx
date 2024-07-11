import { mergeRefs } from "@share/lib"
import { type InputHTMLAttributes, forwardRef } from "react"
import { defaultCountries, usePhoneInput } from "react-international-phone"
import { Input } from "../Input"
import { FlagImagePreview } from "./components"

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	onChange(phone: string): void
}

export const InputPhone = forwardRef<HTMLInputElement, PhoneInputProps>(
	(props, ref) => {
		const { country, handlePhoneValueChange, inputRef, inputValue, setCountry } = usePhoneInput({
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
