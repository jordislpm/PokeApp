export default function PokeButton({
  prevUrl,
  nextUrl,
  setPokemonData,
  setUrl,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  selectedType = "all",
  search = false,
}) {
  const isCustomFilter = selectedType !== "all" || Boolean(search);

  const canGoPrev = isCustomFilter
    ? Boolean(hasPrev)
    : Boolean(prevUrl);

  const canGoNext = isCustomFilter
    ? Boolean(hasNext)
    : Boolean(nextUrl);

  const handlePrevClick = () => {
    if (isCustomFilter) {
      if (onPrev) onPrev();
    } else if (prevUrl && setUrl) {
      if (setPokemonData) setPokemonData([]);
      setUrl(prevUrl);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextClick = () => {
    if (isCustomFilter) {
      if (onNext) onNext();
    } else if (nextUrl && setUrl) {
      if (setPokemonData) setPokemonData([]);
      setUrl(nextUrl);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!canGoPrev && !canGoNext) return null;

  return (
    <div className="btn-group">
      {canGoPrev && <button onClick={handlePrevClick}>Previous</button>}
      {canGoNext && <button onClick={handleNextClick}>Next</button>}
    </div>
  );
}
