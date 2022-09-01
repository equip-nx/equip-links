export default function Input({ type, name, placeholder, label, className }: {
  type: string,
  name: string,
  label: string,
  className?: string,
  placeholder: string,
}) {
  return (
    <div className="bg-white rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-gray-600 focus-within:ring-0 focus-within:ring-gray-600">
      <label htmlFor="name" className="block text-xs font-medium text-gray-900">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-0 focus-within:border-0"
      />
    </div>
  )
}