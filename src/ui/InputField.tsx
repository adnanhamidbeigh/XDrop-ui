export interface InputFormProps {
  label: string
  placeholder: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField(props: InputFormProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-zinc-600 font-medium text-sm">{props.label}</label>
      <input
        className={`bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none`}

        placeholder={props.placeholder}
        value={props.value || ''}
        onChange={props.onChange}
      />
    </div>
  )
}