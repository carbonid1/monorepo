export interface TextFieldProps {
	className?: string;
	inputProps?: JSX.IntrinsicElements['input'];
	label?: React.ReactNode;
	size?: 'sm' | 'md' | 'lg'; // use this
}
export const TextField: React.FC<TextFieldProps> = ({ className, inputProps, label }) => {
	return (
		<fieldset className={className}>
			{label && <label htmlFor={inputProps?.id}>{label}</label>}
			<input
				{...inputProps}
				className="border-2 rounded-md focus:ring-2 focus:ring-skin-primary focus:outline-none bg-skin-complement border-skin-base"
			/>
		</fieldset>
	);
};
