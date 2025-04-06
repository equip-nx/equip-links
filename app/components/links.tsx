import { Tooltip } from 'react-tooltip'
import { QRCodeCanvas } from 'qrcode.react';
import Twitter from './icons/twitter';
import Instagram from './icons/instagram';
import LinkedIn from './icons/linkedin';
import Facebook from './icons/facebook';
import Copy from './icons/copy';

export default function Links({ links }: { links: Link[] }) {
  const copyToClipboard = (url: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(url);
    }

    return Promise.reject('The Clipboard API is not available.');
  };

  const downloadQRCode = (shortCode: string) => {
    const canvas = document.getElementById(shortCode);
    const image = canvas?.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "qr-code.png";
    link.href = image;
    link.click();
  }

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 px-4">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Shortcode
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Visits
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
                    Destination
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {links.map((link) => (
                  <tr key={link.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                      {link.shortcode}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                      <Tooltip id={`visits-${link.id}`} />
                      <div data-tooltip-id={`visits-${link.id}`} data-tooltip-content={new Date(link.updatedAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })} className="cursor-crosshair">
                        <span className="max-w-56 truncate text-ellipsis text-center">
                          {link.visits}
                        </span>
                      </div>
                    </td>
                    <td title={link.shortUrl} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Tooltip id={`short-${link.id}`} />
                      <div data-tooltip-id={`short-${link.id}`} data-tooltip-content={link.shortUrl} className="flex items-center gap-x-2 cursor-crosshair">
                        <span className="max-w-56 truncate text-ellipsis">
                          {link.shortUrl}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Tooltip id={`long-${link.id}`} />
                      <div data-tooltip-id={`long-${link.id}`} data-tooltip-content={link.longUrl} className="flex items-center gap-x-2 cursor-crosshair">
                        <span className="max-w-56 truncate text-ellipsis">
                          {link.longUrl}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-x-4 justify-end">
                        <span title="Download QR Code" className="cursor-pointer text-gray-500" onClick={() => downloadQRCode(link.shortcode)}>
                          <QRCodeCanvas id={link.shortcode} value={link.shortUrl} fgColor="#ffffff" bgColor="#000000" className="hidden" />
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                          </svg>
                        </span>
                        <span title="Copy Link" className="cursor-pointer" onClick={() => copyToClipboard(link.shortUrl)}>
                          <Copy className='w-6 h-6' />
                        </span>
                        <span title="Copy Facebook Link" className="cursor-pointer" onClick={() => copyToClipboard(`${link.shortUrl}/f`)}>
                          <Facebook className='w-[22px] h-[22px]' />
                        </span>
                        <span title="Copy LinkedIn Link" className="cursor-pointer" onClick={() => copyToClipboard(`${link.shortUrl}/l`)}>
                          <LinkedIn className='w-6 h-6' />
                        </span>
                        <span title="Copy Instagram Link" className="cursor-pointer" onClick={() => copyToClipboard(`${link.shortUrl}/i`)}>
                          <Instagram className='w-6 h-6' />
                        </span>
                        <span title="Copy X Link" className="cursor-pointer" onClick={() => copyToClipboard(`${link.shortUrl}/x`)}>
                          <Twitter className="w-6 h-6" />
                        </span>
                      </div>
                    </td>
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