import React from 'react';
import Link from 'next/link';
import { useGlobalContext } from '@/context/global';
import Sidebar from './Sidebar';
import styles from '@/src/styles/Popular.module.css';

function Popular() {
  const { popularAnime, isSearch, searchResults, disponiveis } =
    useGlobalContext();

  const filterSearchResults = () => {
    // Filtra os resultados de pesquisa para incluir apenas aqueles com IDs na lista disponiveis
    return searchResults.filter((anime) => disponiveis.includes(anime.mal_id));
  };

  const conditionalRender = () => {
    const resultsToRender = isSearch ? filterSearchResults() : popularAnime;

    return resultsToRender.map((anime) => (
      <Link
        className={styles.btn}
        href={`/anime/${anime.mal_id}`}
        key={anime.mal_id}
        data-title={anime.title_english}
      >
        {isSearch ? (
          <div className={styles.imgContainer}>
            <img src={anime.images.jpg.large_image_url} alt="" />
          </div>
        ) : (
          <img src={anime.images.jpg.large_image_url} alt="" />
        )}
      </Link>
    ));
  };

  return (
    <div className={styles.Container}>
      <div className={styles.popularAnime}>{conditionalRender()}</div>
      <Sidebar />
    </div>
  );
}

export default Popular;
