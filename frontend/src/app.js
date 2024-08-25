import React, { useState, useEffect } from 'react';
import './App.css'; // Import any component-specific styles

function App() {
  useEffect(() => {
    document.title = 'ABCD123'; // Replace with your roll number
  }, []);

  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState({
    alphabets: false,
    numbers: false,
    highestLowercaseAlphabet: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: JSON.parse(jsonInput) }),
      });

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionChange = (e) => {
    setDropdownOptions({
      ...dropdownOptions,
      [e.target.name]: e.target.checked,
    });
  };

  const renderResponse = () => {
    const { alphabets, numbers, highestLowercaseAlphabet } = dropdownOptions;
    let displayData = {};

    if (alphabets) {
      displayData.alphabets = responseData.alphabets;
    }
    if (numbers) {
      displayData.numbers = responseData.numbers;
    }
    if (highestLowercaseAlphabet) {
      displayData.highestLowercaseAlphabet = responseData.highest_lowercase_alphabet;
    }

    return (
      <div>
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Submit JSON Data</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter valid JSON, e.g., { "data": ["A","C","z"] }'
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {responseData.is_success && (
        <div>
          <h2>Select Data to Display</h2>
          <label>
            <input
              type="checkbox"
              name="alphabets"
              checked={dropdownOptions.alphabets}
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              name="numbers"
              checked={dropdownOptions.numbers}
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              name="highestLowercaseAlphabet"
              checked={dropdownOptions.highestLowercaseAlphabet}
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>

          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
