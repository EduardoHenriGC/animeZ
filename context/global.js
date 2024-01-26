import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';

const GlobalContext = createContext();

const baseUrl = 'https://api.jikan.moe/v4';

//actions
const LOADING = 'LOADING';
const SEARCH = 'SEARCH';
const GET_POPULAR_ANIME = 'GET_POPULAR_ANIME';
const GET_PICTURES = 'GET_PICTURES';

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false };
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };
    case GET_PICTURES:
      return { ...state, pictures: action.payload, loading: false };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  //intial state
  const intialState = {
    popularAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, intialState);
  const [search, setSearch] = useState('');
  const [filterResults, setFilterResults] = useState(null);

  //handle change
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      state.isSearch = false;
    }
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert('Please enter a search term');
    }
  };
  const handleFilterChange = async (filter) => {
    switch (filter) {
      case 'bypopularity':
        await getAnimeByFilter('bypopularity');
        break;
      case 'favorite':
        await getAnimeByFilter('favorite');
        break;
      case 'upcoming':
        await getAnimeByFilter('upcoming');
        break;
      case 'airing':
        await getAnimeByFilter('airing');
        break;
      default:
        console.error(`Unsupported filter: ${filter}`);
    }
  };

  const getAnimeByFilter = async (filter) => {
    const response = await fetch(`${baseUrl}/top/anime?filter=${filter}`);
    const data = await response.json();
    setFilterResults(data.data);
  };

  //fetch popular anime
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  //search anime
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`,
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
  };

  //get anime pictures
  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/pictures`,
    );
    const data = await response.json();
    dispatch({ type: GET_PICTURES, payload: data.data });
  };

  //initial render
  useEffect(() => {
    getPopularAnime();
    handleFilterChange('airing');
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getAnimePictures,
        getAnimeByFilter,
        handleFilterChange,
        filterResults,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
