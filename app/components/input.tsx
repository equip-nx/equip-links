export default function Input({ type, name, placeholder, className }: {
  type: string,
  name: string,
  className?: string,
  placeholder: string,
}) {
  return (
    <div className="mt-1">
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className={className || 'py-4 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-red-500 sm:text-sm'}
      />
    </div>
  )
}