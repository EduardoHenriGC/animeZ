// ListRelation.jsx
import styles from '@/src/styles/ListDefault.module.css';
import Scroll from './scroll';
import Link from 'next/link';

export default function ListDefault({ title, data, typeRef, entryIndex }) {
  return (
    <>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.animeContent}>
        <ul ref={typeRef} className={styles.animeList}>
          {data?.map((item) => (
            <li
              className={styles.animeItem}
              key={item.entry[entryIndex]?.title || item.entry.title}
            >
              <Link
                href={`/anime/${item.entry[entryIndex]?.mal_id || item.entry.mal_id}`}
              >
                <div className={styles.animeCard}>
                  <img
                    className={styles.img}
                    src={
                      item.entry[entryIndex]?.images.jpg.image_url ||
                      item.entry.images.jpg.image_url
                    }
                    alt={`${item.entry[entryIndex]?.title || item.entry.title} Poster`}
                  />
                  <div className={styles.overlay}>
                    <p>{item.entry[entryIndex]?.title || item.entry.title}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Scroll typeRef={typeRef} />
      </div>
    </>
  );
}
