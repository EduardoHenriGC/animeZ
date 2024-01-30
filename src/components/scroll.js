import styles from '@/src/styles/Scroll.module.css';

const scroll = (ref, value) => {
  if (ref.current) {
    ref.current.scrollBy({
      left: value, // Ajuste o valor conforme necessário
      behavior: 'smooth',
    });
  }
};

export default function Scroll({ typeRef }) {
  return (
    <>
      <button
        className={styles.arrowRight}
        onClick={() => scroll(typeRef, 200)}
      >
        &#8250;
      </button>
      <button
        className={styles.arrowLeft}
        onClick={() => scroll(typeRef, -200)}
      >
        &#8249;
      </button>
    </>
  );
}
