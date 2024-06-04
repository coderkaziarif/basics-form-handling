export default function Select({
  id,
  label,
  name,
  value,
  options,
  onChange,
  error,
}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>

      <select id={id} name={name} value={value} onChange={onChange}>
        <option value="" hidden>
          Select Category
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="error">{`${error} !`}</p>}
    </div>
  );
}
