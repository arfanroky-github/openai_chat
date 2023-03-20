import { FormEvent,  SetStateAction,  useEffect,  useState } from "react";
import "./App.css";

function App() {
  const userMessage: any =[]
  const [choices, setChoices] = useState();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = encodeURI(query)
    userMessage.push(query)
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/chat/?search=${params}`);
      const results = await response.json();
     setChoices(results?.success?.content)
     setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    

  }

  return (
    <section className="app">
      <article className="container">
        <div>
          <p>user: {query}</p>
          <p>gpt: { loading ? 'Loading...':  choices}</p>
        </div>

        <form onSubmit={handleSearch}>
          <input
            className="input_field"
            type="search"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
          />
        </form>
      </article>
    </section>
  );
}

export default App;
