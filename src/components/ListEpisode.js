import styles from '@/src/styles/ListEpisode.module.css';

export default function ListEpisode({
  anime,
  setIndexVideo,
  currentEp,
  episode,
}) {
  if (!anime) {
    // Render a loading state or return null
    return null;
  }

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '..';
    }
    return text;
  }

  return (
    <div className={styles.container}>
      <p>
        Você está assistindo <br />
        <span>{anime.title_english}</span>
      </p>

      <div className={styles.ListContainer}>
        <ul
          className={`${styles.List} ${!episode?.some((name) => name.title) && anime.title ? styles.ConditionalStyle : ''}`}
        >
          {episode?.map((name) => (
            <li key={name.mal_id}>
              <button
                title={name.title}
                className={styles.btn}
                onClick={() => setIndexVideo(name.mal_id)}
              >
                <span>{name.mal_id} -</span>
                <span>{truncateText(name.title || currentEp, 18)}</span>
              </button>
            </li>
          ))}
          {!episode?.some((name) => name.title) && anime.title && (
            <li key={anime.mal_id}>
              <button title={anime.title} className={styles.btn}>
                <span>{truncateText(anime.title_english, 18)}</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
