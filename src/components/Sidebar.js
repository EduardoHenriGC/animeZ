import React from 'react';
import Link from 'next/link';
import { useGlobalContext } from '@/context/global';
import styles from '@/src/styles/Sidebar.module.css';
import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa';

// Função para renderizar estrelas com base na nota e aplicar estilos
function renderStars(rating) {
  const scaledRating = rating / 2;
  const fullStars = Math.floor(scaledRating);
  const hasHalfStar = scaledRating % 1 >= 0.25;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className={styles.starFull}>
        <FaStar />
      </span>,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <span key="half" className={styles.starHalf}>
        <FaStarHalfAlt />
      </span>,
    );
  }

  while (stars.length < 5) {
    stars.push(
      <span key={`empty-${stars.length}`} className={styles.starEmpty}>
        <FaRegStar />
      </span>,
    );
  }

  return stars;
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function FirstItem({ anime }) {
  return (
    <div className={styles.firstItem}>
      <img src={anime.images.jpg.large_image_url} alt="" />

      <div className={styles.firstItemInfo}>
        <p>1</p>
        <div>
          <span className={styles.titleFirst}>{anime.title_english}</span>
          <span className={styles.stars}>{renderStars(anime.score)}</span>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const { filterResults, handleFilterChange } = useGlobalContext();

  return (
    <div className={styles.Container}>
      <ul className={styles.category}>
        <li onClick={() => handleFilterChange('airing')}>Em alta</li>
        <li onClick={() => handleFilterChange('bypopularity')}>Popular</li>
        <li onClick={() => handleFilterChange('favorite')}>Favoritos</li>
        <li onClick={() => handleFilterChange('upcoming')}>Em breve</li>
      </ul>
      <div className={styles.anime}>
        {filterResults?.slice(0, 10).map((anime, index) => {
          return index === 0 ? (
            <Link href={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <FirstItem anime={anime} />
            </Link>
          ) : (
            <div className={styles.rated} key={anime.mal_id}>
              <p>{index + 1}</p>
              <Link href={`/anime/${anime.mal_id}`}>
                <img src={anime.images.jpg.image_url} alt="" />
              </Link>
              <Link title={anime.title_english} href={`/anime/${anime.mal_id}`}>
                <h4>{truncateText(anime.title_english, 25)}</h4>
                <span className={styles.starContainer}>
                  {renderStars(anime.score)}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
