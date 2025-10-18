// Input.jsx
export function Input({
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  className = "",
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
    />
  );
}
