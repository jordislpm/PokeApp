export default function Loading() {
  return (
    <div className="loading">
      <h1
        style={{
          color: "var(--poke-yellow)",
          textShadow: "2px 2px var(--poke-blue)",
          fontWeight: "bold",
        }}
      >
        Loading...
      </h1>
      <div
        className="spinner-border text-warning mt-3"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
