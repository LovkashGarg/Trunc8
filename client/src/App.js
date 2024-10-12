import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [URL, setURL] = useState('');
  const [boxProperties] = useState({
    width: '100%',  // Make it full width by default
    height: '50px',
    backgroundColor: 'white',
    color: 'black',
  });
  
  const boxContainerRef = useRef(null);

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://trunc8-backend.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Send as JSON
        },
        body: JSON.stringify({ url: URL }),  // Convert URL to JSON string
      });
      
      const result = await response.json();
      // console.log( result);

      if (result.error) {
        alert(result.error); // Log the error if any
        return;
      }
      
      // Reset input field
      setURL('');
      const outerbox = window.document.createElement('div');
      outerbox.style.display='flex'
      // Create a new div element for the short URL
      const newBox = window.document.createElement('div');
      const copyButton = window.document.createElement('button');
      copyButton.textContent = 'Copy';
      copyButton.style.color = 'green';
      copyButton.onclick = () => {
        // used for writing it to clipboard
        navigator.clipboard.writeText(result.newurl);
        alert('Copied to clipboard');
      }

      // Set the box properties based on user input
      newBox.style.width = boxProperties.width;  // Use percentage width
      newBox.style.height = boxProperties.height;
      newBox.style.backgroundColor = boxProperties.backgroundColor;
      newBox.style.color = boxProperties.color;
      newBox.style.margin = '10px';
      newBox.style.display = 'flex';
      newBox.style.alignItems = 'center';
      newBox.style.justifyContent = 'center';
      newBox.textContent = `Short URL: ${result.newurl}`; // Display the short URL
      
      // Append the new box to the box container div
      outerbox.style.border='2px solid black';
      outerbox.style.padding='10px';
      outerbox.appendChild(newBox);
      outerbox.appendChild(copyButton);

      boxContainerRef.current.appendChild(outerbox)
      
    } catch (error) {
      // console.error('Error:', error);
    }
  };

  return (
    <div className="App flex flex-col items-center px-4 sm:px-8 lg:px-16 mx-auto max-w-[1200px]">
      <h1 className="text-[40px] bg-black text-white font-mono mt-8 mb-4 px-[20px] text-center">SpongeIt</h1>
      
      <form 
        onSubmit={handlesubmit}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-[600px] mt-4"
      >
        <label htmlFor="url" className="text-[20px]">URL:</label>
        <input 
          type="text" 
          value={URL} 
          onChange={(e) => setURL(e.target.value)} 
          id="url"
          className="border-[2px] border-gray-300 px-4 py-2 w-full sm:w-auto h-auto text-black"
          placeholder="Enter URL" 
        />
      </form>
      
      <button 
        onClick={handlesubmit} 
        className="bg-black text-white text-[20px] px-6 py-3 mt-6 mb-8 rounded-md">
        Create URL
      </button>
      
      <h2 className="text-[25px] mb-4">Your URLs</h2>
      
      {/* This is the container where boxes (divs) will be appended */}
      <div 
        className="box-container flex flex-col text-[25px] items-center gap-4 w-full  max-w-[600px]" 
        ref={boxContainerRef}
      >
      </div>
    </div>
  );
}

export default App;
