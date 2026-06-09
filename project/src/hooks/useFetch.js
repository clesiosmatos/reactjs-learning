import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    //fetch is a built-in browser function 
    // (part of the Web API, not JavaScript itself). 
    // It takes a URL string and returns a Promise<Response>.
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(result => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    // cleanup: if url changes before the fetch completes, ignore the stale response
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
