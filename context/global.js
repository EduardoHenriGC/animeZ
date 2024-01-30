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

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
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
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [relations, setRelations] = useState(null);

  const disponiveis = [
    1535, 9253, 32281, 34572, 36946, 38000, 40456, 40748, 44511, 48561, 48903,
    50594, 52299,
  ];
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

  const SliceList = (data, limit, func) => {
    if (data && data.length > 0) {
      // Pega apenas os primeiros elementos com base no limite
      const relationsSlice = data.slice(0, limit);

      // Chama a função de estado dinâmica para salvar os elementos
      func(relationsSlice);
    }
  };

  const fetchData = async (id) => {
    try {
      const relationResponse = await fetch(`${baseUrl}/recommendations/anime`);
      const relationData = await relationResponse.json();
      SliceList(relationData.data, 9, setRelations);

      const animeResponse = await fetch(`${baseUrl}/anime/${id}/full`);
      const animeData = await animeResponse.json();
      setAnime(animeData.data);

      const charactersResponse = await fetch(
        `${baseUrl}/anime/${id}/characters`,
      );
      const charactersData = await charactersResponse.json();
      setCharacters(charactersData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    const response = await fetch(`${baseUrl}/anime/${id}/recommendations`);
    const data = await response.json();

    SliceList(data.data, 15, setRecommendations);
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
      `${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`,
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
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
        getAnimeByFilter,
        handleFilterChange,
        filterResults,
        anime,
        characters,
        fetchData,
        recommendations,
        relations,
        disponiveis,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
