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

  return (
    <div className={styles.container}>
      <p>
        Você está assistindo episódio de <br />
        <span>{anime.title_english}</span>
      </p>

      <div className={styles.ListContainer}>
        <ul
          className={`${styles.List} ${!episode?.some((name) => name.title) && anime.title ? styles.ConditionalStyle : ''}`}
        >
          {episode?.map((name) => (
            <li key={name.mal_id} onClick={() => setIndexVideo(name.mal_id)}>
              <span>
                {name.mal_id} - {name.title || currentEp}
              </span>
            </li>
          ))}
          {!episode?.some((name) => name.title) && anime.title && (
            <li key={anime.mal_id}>
              <span>{anime.title_english}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
