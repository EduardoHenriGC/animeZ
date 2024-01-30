import { useState } from 'react';
import styles from '@/src/styles/Painel.module.css';
import Link from 'next/link';

export default function PainelAnime({ anime }) {
  const [showMore, setShowMore] = useState(false);
  const {
    synopsis,
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
    title,
  } = anime;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.flexScreen}>
            <div className={styles.imgContainer}>
              <h3>{anime.title_english}</h3>
              <img src={images?.jpg.image_url} alt="" />
            </div>
            <div className={styles.ContentAction}>
              <Link
                className={styles.btn}
                href={`/anime/assistirOnline/${anime.mal_id}`}
              >
                assistir Online
              </Link>
              <p>
                {showMore ? synopsis : synopsis?.substring(0, 400) + '...'}
                <button
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? 'Show Less' : 'Read More'}
                </button>
              </p>
            </div>
          </div>

          <div className={styles.info}>
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
              <span> Score:</span>
              <span>{score}</span>
            </p>
            <p>
              <span> Scored By:</span>
              <span>{scored_by}</span>
            </p>
            <p>
              <span> Popularity:</span>
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
      </div>
    </>
  );
}
