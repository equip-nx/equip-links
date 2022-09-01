export default function Button({ label, type }: {
  type: 'button' | 'submit',
  label: string,
}) {
  return (
    <button
      type={type}
      className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      {label}
    </button>
  )
}