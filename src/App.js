import { useState } from "react";
function App() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [data, setData] = useState([]);
  const [totalhits, setTotalHits] = useState(0);

  const handleSearch = async e => {
    e.preventDefault();
    if (search === '') return;
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&uft8=&format=json&origin=*& srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        return data;
      })

    setResults(response.query.search);
    setSearchInfo(response.query);
    setTotalHits(response.query.searchinfo.totalhits)
  }

  return (
    <div className="App">
      <header>
        <h1>Wiki Seeker</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input type="search"
            placeholder="What are you looking for ?"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
        {(totalhits) ? <p>Search Results: {totalhits}</p> : ''}


      </header>
      <div className="results">

        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/wiki?curid=${result.pageid}`;

          return (
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <p>Read more...
                (<a href={url} target="_blank" rel="nofollow" className="url">{url}</a>)
              </p>

            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;