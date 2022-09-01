export default function Links({ links }: { links: Link[] }) {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                  >
                    Shortcode
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Website
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Short URL
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Clicks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {links.map((link) => (
                  <tr key={link.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {link.shortcode}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{link.longUrl}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{link.shortUrl}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{link.createdAt.toString()}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{link.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}