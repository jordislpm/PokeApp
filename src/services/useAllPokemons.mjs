import { useState, useEffect } from "react";
import axios from "axios";

let cachedPokemonList = null;
const typeCache = {};

async function getAllPokemonCatalog() {
  if (cachedPokemonList && cachedPokemonList.length > 0) {
    return cachedPokemonList;
  }
  const resp = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0");
  cachedPokemonList = resp.data.results;
  return cachedPokemonList;
}

async function getPokemonsByType(typeName) {
  if (typeCache[typeName] && typeCache[typeName].length > 0) {
    return typeCache[typeName];
  }
  const resp = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`);
  const list = (resp.data.pokemon || []).map((p) => p.pokemon);
  typeCache[typeName] = list;
  return list;
}

function useAllPokemons(url, search, find, selectedType = "all") {
  const [data, setData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination for filtered types & search
  const [filterOffset, setFilterOffset] = useState(0);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);
  const pageSize = 20;

  // Reset offset when filter or search changes
  useEffect(() => {
    setFilterOffset(0);
  }, [selectedType, search, find]);

  // Normal paginated data (when no search and type is 'all')
  useEffect(() => {
    if (search || selectedType !== "all") return;

    let isMounted = true;
    async function loadPageData() {
      setLoading(true);
      setReady(false);
      try {
        const resp = await axios.get(url);
        if (!isMounted) return;

        setNextUrl(resp.data.next);
        setPrevUrl(resp.data.previous);

        const results = resp.data.results || [];
        const detailPromises = results.map((item) =>
          axios.get(item.url).then((res) => res.data)
        );
        const detailedPokemons = await Promise.all(detailPromises);

        if (isMounted) {
          detailedPokemons.sort((a, b) => a.id - b.id);
          setData(detailedPokemons);
          setReady(true);
        }
      } catch (err) {
        console.error("Error loading pokemons:", err);
        if (isMounted) {
          setData([]);
          setReady(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPageData();

    return () => {
      isMounted = false;
    };
  }, [url, search, selectedType]);

  // Filter by Type data (when selectedType is NOT 'all')
  useEffect(() => {
    if (selectedType === "all") return;

    let isMounted = true;
    async function loadTypeData() {
      setLoading(true);
      setReady(false);

      try {
        const typePokemons = await getPokemonsByType(selectedType);
        if (!isMounted) return;

        let filtered = typePokemons;
        const query = (find || "").trim().toLowerCase();

        if (query) {
          const queryId = parseInt(query, 10);
          filtered = filtered.filter((item) => {
            if (item.name.toLowerCase().includes(query)) return true;
            if (!isNaN(queryId)) {
              const parts = item.url.split("/").filter(Boolean);
              const id = parseInt(parts[parts.length - 1], 10);
              if (id === queryId) return true;
            }
            return false;
          });
        }

        setTotalFilteredCount(filtered.length);

        // Paginate by pageSize
        const pageMatches = filtered.slice(filterOffset, filterOffset + pageSize);

        if (pageMatches.length === 0) {
          if (isMounted) {
            setData([]);
            setNextUrl(null);
            setPrevUrl(null);
            setReady(true);
          }
        } else {
          const detailPromises = pageMatches.map((item) =>
            axios.get(item.url).then((res) => res.data)
          );
          const detailedPokemons = await Promise.all(detailPromises);

          if (isMounted) {
            detailedPokemons.sort((a, b) => a.id - b.id);
            setData(detailedPokemons);
            setNextUrl(null);
            setPrevUrl(null);
            setReady(true);
          }
        }
      } catch (err) {
        console.error("Error loading pokemons by type:", err);
        if (isMounted) {
          setData([]);
          setReady(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTypeData();

    return () => {
      isMounted = false;
    };
  }, [selectedType, search, find, filterOffset]);

  // Search without specific type filter
  useEffect(() => {
    if (!search || selectedType !== "all") return;

    let isMounted = true;
    async function searchPokemons() {
      setLoading(true);
      setReady(false);

      const query = (find || "").trim().toLowerCase();
      if (!query) {
        if (isMounted) {
          setData([]);
          setNextUrl(null);
          setPrevUrl(null);
          setReady(true);
          setLoading(false);
        }
        return;
      }

      try {
        const allList = await getAllPokemonCatalog();
        if (!isMounted) return;

        const queryId = parseInt(query, 10);
        const matches = allList.filter((item) => {
          if (item.name.toLowerCase().includes(query)) {
            return true;
          }
          if (!isNaN(queryId)) {
            const parts = item.url.split("/").filter(Boolean);
            const id = parseInt(parts[parts.length - 1], 10);
            if (id === queryId) {
              return true;
            }
          }
          return false;
        });

        setTotalFilteredCount(matches.length);

        const pageMatches = matches.slice(filterOffset, filterOffset + pageSize);

        if (pageMatches.length === 0) {
          if (isMounted) {
            setData([]);
            setNextUrl(null);
            setPrevUrl(null);
            setReady(true);
          }
        } else {
          const detailPromises = pageMatches.map((item) =>
            axios.get(item.url).then((res) => res.data)
          );
          const detailedPokemons = await Promise.all(detailPromises);

          if (isMounted) {
            detailedPokemons.sort((a, b) => a.id - b.id);
            setData(detailedPokemons);
            setNextUrl(null);
            setPrevUrl(null);
            setReady(true);
          }
        }
      } catch (err) {
        console.error("Error searching pokemons:", err);
        if (isMounted) {
          setData([]);
          setReady(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    searchPokemons();

    return () => {
      isMounted = false;
    };
  }, [search, find, selectedType, filterOffset]);

  const isCustomPaging = selectedType !== "all" || search;

  const hasPrev = isCustomPaging
    ? filterOffset > 0
    : Boolean(prevUrl);

  const hasNext = isCustomPaging
    ? filterOffset + pageSize < totalFilteredCount
    : Boolean(nextUrl);

  const handlePrev = () => {
    if (isCustomPaging) {
      setFilterOffset((prev) => Math.max(0, prev - pageSize));
    }
  };

  const handleNext = () => {
    if (isCustomPaging) {
      setFilterOffset((prev) => prev + pageSize);
    }
  };

  return [
    data,
    setData,
    nextUrl,
    prevUrl,
    ready,
    setReady,
    loading,
    handleNext,
    handlePrev,
    hasNext,
    hasPrev,
  ];
}

export default useAllPokemons;
