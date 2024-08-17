import { useState } from "react";
import "./search.css";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

export default function Search() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const changeType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="search">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => changeType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form className="searchForm">
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          onChange={handleChange}
          className="input"
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
          className="input"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
          className="input"
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button className="searchButton">
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
}

