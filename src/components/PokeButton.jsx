export default function PokeButton({
  prevUrl,
  nextUrl,
  setPokemonData,
  setUrl,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  const canGoPrev = hasPrev !== undefined ? hasPrev : Boolean(prevUrl);
  const canGoNext = hasNext !== undefined ? hasNext : Boolean(nextUrl);

  const handlePrevClick = () => {
    if (onPrev && hasPrev !== undefined) {
      onPrev();
    } else if (prevUrl) {
      if (setPokemonData) setPokemonData([]);
      if (setUrl) setUrl(prevUrl);
    }
  };

  const handleNextClick = () => {
    if (onNext && hasNext !== undefined) {
      onNext();
    } else if (nextUrl) {
      if (setPokemonData) setPokemonData([]);
      if (setUrl) setUrl(nextUrl);
    }
  };

  if (!canGoPrev && !canGoNext) return null;

  return (
    <div className="btn-group">
      {canGoPrev && <button onClick={handlePrevClick}>Previous</button>}
      {canGoNext && <button onClick={handleNextClick}>Next</button>}
    </div>
  );
}
