import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme options
const THEMES = {
  CLASSIC: '#FFFFEC',
  MINT: '#E0FFE0',
  SAKURA: '#FFE0E0',
  SKY: '#E0E0FF'
};

// Create theme context with default value
const ThemeContext = createContext({
  currentTheme: THEMES.CLASSIC,
  setTheme: () => {}
});

// Custom hook to use theme
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme selector component
const ThemeSelector = () => {
  const { currentTheme, setTheme } = useTheme();
  
  return (
    <div className="bg-[#F0E0D6] border border-[#8B8B8B] p-1 my-2">
      <div>Theme:</div>
      <div className="my-1">
        <button 
          onClick={() => setTheme(THEMES.CLASSIC)}
          className="mr-1 px-2 py-1 hover:bg-gray-200"
        >
          Classic
        </button>
        <button 
          onClick={() => setTheme(THEMES.MINT)}
          className="mr-1 px-2 py-1 hover:bg-gray-200"
        >
          Mint
        </button>
        <button 
          onClick={() => setTheme(THEMES.SAKURA)}
          className="mr-1 px-2 py-1 hover:bg-gray-200"
        >
          Sakura
        </button>
        <button 
          onClick={() => setTheme(THEMES.SKY)}
          className="mr-1 px-2 py-1 hover:bg-gray-200"
        >
          Sky
        </button>
      </div>
      <div>
        <label htmlFor="bgcolor">Custom Color: </label>
        <input
          type="color"
          id="bgcolor"
          value={currentTheme}
          onChange={(e) => setTheme(e.target.value)}
          className="ml-1"
        />
      </div>
    </div>
  );
};

// Header component with consistent styling
const ForumHeader = ({ title }) => (
  <div className="border border-[#8B8B8B] p-1 mb-2 bg-[#F0E0D6]">
    <h1 className="text-base m-0 font-normal">
      Anime Forum - {title}
    </h1>
  </div>
);

// Navigation component
const Navigation = () => (
  <div className="my-2 text-sm">
    <a href="index.html" className="text-blue-700 no-underline mr-2 hover:underline">Home</a>
    <a href="search.html" className="text-blue-700 no-underline mr-2 hover:underline">Search</a>
    <a href="rules.html" className="text-blue-700 no-underline mr-2 hover:underline">Rules</a>
    <a href="help.html" className="text-blue-700 no-underline mr-2 hover:underline">Help</a>
  </div>
);

// Main layout component that combines all elements
const ForumLayout = () => {
  const [theme, setTheme] = useState(THEMES.CLASSIC);

  useEffect(() => {
    const savedTheme = localStorage.getItem('forumTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('forumTheme', newTheme);
    document.documentElement.style.setProperty('--bg-color', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, setTheme: handleThemeChange }}>
      <div className="max-w-screen-lg mx-auto p-2 font-sans leading-normal">
        <ForumHeader title="Home" />
        <Navigation />
        <ThemeSelector />
      </div>
    </ThemeContext.Provider>
  );
};

export default ForumLayout;
