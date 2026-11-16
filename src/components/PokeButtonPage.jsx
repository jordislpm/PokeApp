export default function PokeButtonPage({ value, setValue }) {
  const currentVal = Number(value) || 1;

  return (
    <div className="btn-group">
      {currentVal > 1 && (
        <button
          onClick={() => {
            setValue(currentVal - 1);
          }}
        >
          Previous
        </button>
      )}
      {currentVal < 1025 && (
        <button
          onClick={() => {
            setValue(currentVal + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
