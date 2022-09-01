import { LinkIcon } from '@heroicons/react/20/solid'

export default function Button({ label, type, onClick }: {
  label: string,
  onClick?: Function,
  type: 'button' | 'submit',
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      <LinkIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      {label}
    </button>
  )
}