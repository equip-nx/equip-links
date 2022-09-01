export default function Label({ htmlFor, value }: {
  htmlFor: string,
  value: string,
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700" > {value}</label>
  );
}