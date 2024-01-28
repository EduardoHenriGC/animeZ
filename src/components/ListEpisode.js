import { useEffect, useState } from 'react';
import styles from '@/src/styles/ListEpisode.module.css';

export default function ListEpisode({
  anime,
  setIndexVideo,
  currentEp,
  episode,
}) {
  const [shouldTruncate, setShouldTruncate] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setShouldTruncate(screenWidth <= 300 || screenWidth >= 1250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

    handleResize();
  }, []);

  if (!anime) {
    return null;
  }

  const truncateText = (text, maxLength) =>
    shouldTruncate && text.length > maxLength
      ? `${text.substring(0, maxLength)}..`
      : text;

  const getMaxLength = () =>
    window.innerWidth > 350 && window.innerWidth < 500 ? 27 : 17;

  return (
    <div className={styles.container}>
      <p>
        Você está assistindo episódio de <br />
        <span>{anime.title_english}</span>
      </p>

      <div className={styles.ListContainer}>
        <ul
          className={`${styles.List} ${
            !episode?.some((name) => name.title) && anime.title
              ? styles.ConditionalStyle
              : ''
          }`}
        >
          {episode?.map((name) => (
            <li key={name.mal_id} onClick={() => setIndexVideo(name.mal_id)}>
              <span>
                <span>
                  {name.mal_id} -{' '}
                  {truncateText(name.title || currentEp, getMaxLength())}
                </span>
              </span>
            </li>
          ))}
          {!episode?.some((name) => name.title) && anime.title && (
            <li key={anime.mal_id}>
              <span>{truncateText(anime.title_english, getMaxLength())}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
