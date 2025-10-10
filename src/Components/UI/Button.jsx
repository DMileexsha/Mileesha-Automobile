export function Button({ disabled, children, ...props }) {
  return (
    <Button
      {...props}
      className="w-full bg-red-800 hover:bg-red-600 text-lg py-3 text-white rounded disabled:opacity-80"
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
