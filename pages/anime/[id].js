'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/src/styles/AnimeItem.module.css';

function AnimeItem() {
  const router = useRouter();
  const { id } = router.query;

  //state
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [UrlVideo, setUrlVideo] = useState(null);
  const [indexVideo, setIndexVideo] = useState(1);
  const [UrlLegenda, setUrlLegenda] = useState(null);
  const [selectedOption, setSelectedOption] = useState(1);
  const [currentEp, setCurrentEp] = useState(null);
  const [data, setData] = useState(null);

  const episodesPerRange = 50; // Defina o número de episódios por faixa

  const calculateDropdownOptions = () => {
    const options = anime
      ? Array.from(
          { length: Math.ceil(anime.episodes / episodesPerRange) },
          (_, index) => ({
            start: index * episodesPerRange + 1,
            end: Math.min((index + 1) * episodesPerRange, anime.episodes),
          }),
        )
      : [];

    return options;
  };

  const dropdownOptions = calculateDropdownOptions();

  const handleDropdownChange = (e) => {
    setSelectedOption(Number(e.target.value));
  };

  useEffect(
    () => {
      carregarUrlVideo(id);
    },
    [indexVideo],
    [UrlVideo],
  );

  useEffect(() => {
    if (id) {
      fetchData();
      carregarUrlVideo(id);
    }
  }, [id]);

  const carregarUrlVideo = async (animeId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/${animeId}?index=${indexVideo}`,
        {},
      );

      const data = await response.json();
      setUrlVideo(data.url);
      setUrlLegenda(data.legenda);
      setCurrentEp(data.ep);
      setData(data);
    } catch (error) {
      console.error('Erro ao carregar detalhes do anime:', error);
    }
  };

  //destructure anime
  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  const fetchData = async () => {
    try {
      const animeResponse = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/full`,
      );
      const animeData = await animeResponse.json();
      setAnime(animeData.data);

      const charactersResponse = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/characters`,
      );
      const charactersData = await charactersResponse.json();
      setCharacters(charactersData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.h1}>{title}</h1>
      <div className={styles.details}>
        <div className={styles.detail}>
          <div className={styles.image}>
            <img src={images?.jpg.image_url} alt="" />
          </div>
          <div>
            <div className={styles.animeDetails}>
              <div>
                <p>
                  <span>Aired:</span>
                  <span>{aired?.string}</span>
                </p>
                <p>
                  <span>Rating:</span>
                  <span>{rating}</span>
                </p>
                <p>
                  <span>Rank:</span>
                  <span>{rank}</span>
                </p>
                <p>
                  <span>Score:</span>
                  <span>{score}</span>
                </p>
                <p>
                  <span>Scored By:</span>
                  <span>{scored_by}</span>
                </p>
              </div>
              <div>
                {' '}
                <p>
                  <span>Popularity:</span>
                  <span>{popularity}</span>
                </p>
                <p>
                  <span>Status:</span>
                  <span>{status}</span>
                </p>
                <p>
                  <span>Source:</span>
                  <span>{source}</span>
                </p>
                <p>
                  <span>Season:</span>
                  <span>{season}</span>
                </p>
                <p>
                  <span>Duration:</span>
                  <span>{duration}</span>
                </p>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Link
                className={styles.btn}
                href={`/anime/assistirOnline/${anime.mal_id}`}
              >
                assistir Online
              </Link>
            </div>
          </div>
        </div>
        <p className={styles.description}>
          {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {showMore ? 'Show Less' : 'Read More'}
          </button>
        </p>
      </div>

      <h3 className={styles.title}>Characters</h3>
      <div className={styles.characters}>
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <Link
              className={styles.link}
              href={`/character/${mal_id}`}
              key={index}
            >
              <div className={styles.character}>
                <img src={images?.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default AnimeItem;
