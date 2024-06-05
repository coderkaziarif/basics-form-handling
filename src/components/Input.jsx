export default function Input({
  type,
  id,
  label,
  name,
  value,
  onChange,
  error,
  pattern,
}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error">{`${error} !`}</p>}
    </div>
  );
}
