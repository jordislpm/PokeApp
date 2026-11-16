import axios from "axios";
import { useEffect, useState } from "react";

function useGetPokemon(unique) {
  const [onePokemon, setOnePokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!unique) {
      setOnePokemon(null);
      setError(null);
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${unique}/`);
        if (isMounted) {
          setOnePokemon(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setOnePokemon(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [unique]);

  return [onePokemon, setOnePokemon, loading, error];
}

export default useGetPokemon;
