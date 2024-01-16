import { useState } from "react";
import { useDebounce } from "use-debounce";
import { XIcon } from "@heroicons/react/outline";

const suggestions = [
  {
    name: "Nick Giannopoulos",
    email: "n.giannopoulos@example.com",
    photo: "https://robohash.org/Terry.png?set=set4",
  },
  {
    name: "Narayana Garner",
    email: "n.gamer@example.com",
    photo: "https://robohash.org/Sheldon.png?set=set4",
  },
  {
    name: "Anita Gros",
    email: "a.gros@example.com",
    photo: "https://robohash.org/Miles.png?set=set4",
  },
  {
    name: "Megan Smith",
    email: "m.smith@example.com",
    photo: "https://robohash.org/Alison.png?set=set4",
  },
];

export default function Search() {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);

    // Update the filtered suggestions based on the input
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleChipClick = (chip) => {
    // Add the chip to the selected names
    setChips((prevChips) => [...prevChips, chip]);

    // Clear the input
    setInput("");
  };

  const handleBackspace = (e) => {
    if (input === "" && chips.length > 0 && e.key === "Backspace") {
      setChips((prevChips) => prevChips.slice(0, prevChips.length - 1));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          {chips.map((chip, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-1 text-sm text-gray-700 bg-gray-100 rounded-md"
            >
              {chip}
              <span className="text-gray-400 ml-2">
                <img src={suggestions.find((suggestion) => suggestion.name === chip)?.photo} alt={chip} className="w-6 h-6 rounded-full" />
              </span>
              <button
                type="button"
                className="ml-2 text-gray-400 hover:text-gray-500"
                onClick={() => setChips((prevChips) => prevChips.filter((c) => c !== chip))}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
          <input
            type="text"
            placeholder="Type to Search"
            className="flex-grow bg-transparent outline-none ml-2"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleBackspace}
          />
          {input && (
            <button
              type="button"
              className="ml-2 text-gray-400 hover:text-gray-500"
              onClick={() => setInput("")}
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <ul className="mt-2">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion.email}
              className="flex items-center justify-between px-2 py-1 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleChipClick(suggestion.name)}
            >
              {suggestion.name}
              <span className="text-gray-400">
                <img src={suggestion.photo} alt={suggestion.name} className="w-6 h-6 rounded-full" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}





