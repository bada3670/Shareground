import { useEffect, useState } from 'react';

export default function exp() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/search`);
      const { searchList } = await response.json();
      setResults(searchList);
    })();
  }, []);
  const htmlresult = results.map((searchInfo) => <div>{searchInfo.title}</div>);
  return <div>{htmlresult}</div>;
}
