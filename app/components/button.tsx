import { LinkIcon } from '@heroicons/react/20/solid'

export default function Button({ label, type, onClick }: {
  label: string,
  onClick?: Function,
  type: 'button' | 'submit',
}) {
  return (
    <button
      type={type}
      onClick={() => onClick && onClick()}
      className="w-full text-center justify-center inline-flex items-center px-6 py-3 text-base text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      <LinkIcon className="w-5 h-5 mr-3 -ml-1" aria-hidden="true" />
      {label}
    </button>
  )
}