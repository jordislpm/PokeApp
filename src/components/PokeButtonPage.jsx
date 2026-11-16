export default function PokeButtonPage({ value, setValue }) {
  const currentVal = Number(value) || 1;

  return (
    <div className="btn-group my-2">
      {currentVal > 1 && (
        <button
          onClick={() => {
            setValue(currentVal - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Previous
        </button>
      )}
      {currentVal < 1025 && (
        <button
          onClick={() => {
            setValue(currentVal + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
