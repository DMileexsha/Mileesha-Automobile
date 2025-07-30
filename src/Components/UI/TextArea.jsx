export function TextArea({ id, name, value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  );
}
