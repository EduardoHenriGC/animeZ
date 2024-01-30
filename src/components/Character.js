import styles from '@/src/styles/Character.module.css';

export default function Character({ characters }) {
  return (
    <>
      <h3 className={styles.title}>Personagens</h3>
      <div className={styles.characters}>
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <div
              className={styles.link}
              href={`/character/${mal_id}`}
              key={index}
            >
              <div className={styles.character}>
                <img src={images?.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
