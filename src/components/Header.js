import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const [hidden, setHidden] = useState(true);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return JSON.parse(localStorage.getItem("darkMode")) ? "dark" : "light";
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("darkMode", JSON.stringify(theme === "dark"));
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("tricolor", theme === "tricolor");
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");
  };

  const toggleTricolorTheme = () => {
    setTheme((currentTheme) => currentTheme === "tricolor" ? "light" : "tricolor");
  };

  const activeClass = "text-base block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white";
  const inActiveClass = "text-base block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryTerm = event.target.search.value;
    event.target.reset();
    return navigate(`/search?q=${queryTerm}`);
  }

  return (
    <header>      
      <nav className="bg-white border-b-2 border-gray-200 px-2 sm:px-4 py-2 dark:bg-gray-900 dark:border-b-1 dark:border-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex items-center">
              <img src="/logo.png" className="mr-2 h-8 sm:h-9" alt="Mayur's Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Info By Mayur</span>
          </Link>

          <div id="mobile-nav" className="flex md:order-2">
          <button onClick={toggleDarkMode} title="Toggle light and dark theme" aria-label="Toggle light and dark theme" type="button" className="flex items-center justify-center p-2 mr-2 min-w-[42px] h-[42px] text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            {theme === "dark" ? (
              <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a4 4 0 100 8 4 4 0 000-8zm0-4a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 13a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm8-5a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm10.657-5.657a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM6.464 13.536a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zm9.193.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414l.707.707zM6.464 5.05A1 1 0 015.05 6.464l-.707-.707a1 1 0 011.414-1.414l.707.707z" /></svg>
            ) : (
              <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>
          <button onClick={toggleTricolorTheme} title="Toggle Indian tricolor theme" aria-label="Toggle Indian tricolor theme" aria-pressed={theme === "tricolor"} type="button" className="tricolor-toggle flex flex-col overflow-hidden mr-2 w-[42px] h-[42px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800">
            <span className="flex-1 w-full bg-[#ff9933]"></span>
            <span className="tricolor-white-band flex-1 w-full bg-white"></span>
            <span className="flex-1 w-full bg-[#138808]"></span>
          </button>
            <button onClick={() => setHidden(!hidden)} type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="hidden relative md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Search icon</span>
              </div>
              <form onSubmit={handleSubmit}>
                <input type="text" id="search-navbar" name="search" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
              </form>
            </div>
            <button onClick={() => setHidden(!hidden)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
          </div>

            <div className={`${hidden ? "hidden" : ""} justify-between items-center w-full md:flex md:w-auto md:order-1`} id="navbar-search">
              <div className="relative mt-3 md:hidden">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <form onSubmit={handleSubmit}>
                  <input type="text" id="search-navbar" name="search" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
                </form>
              </div>
              <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to="/" className={({isActive}) => isActive ? activeClass : inActiveClass } end>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/movies/popular" className={({isActive}) => isActive ? activeClass : inActiveClass }>Popular</NavLink>
                </li>
                <li>
                  <NavLink to="/movies/top" className={({isActive}) => isActive ? activeClass : inActiveClass }>Top Rated</NavLink>
                </li>
                <li>
                  <NavLink to="/movies/upcoming" className={({isActive}) => isActive ? activeClass : inActiveClass }>Upcoming</NavLink>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    </header>
  )
}
