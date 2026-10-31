// type: "success" | "error"
export default function Message({ type = 'success', children }) {
  return (
    <div
      className={`message message--${type}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      {children}
    </div>
  );
}
