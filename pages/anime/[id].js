'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/src/styles/AnimeItem.module.css';
import { useGlobalContext } from '@/context/global';
import ListDefault from '@/src/components/ListDefault';
import Character from '@/src/components/Character';
import PainelAnime from '@/src/components/PainelAnime';

function AnimeItem() {
  const recommendationsRef = useRef(null);
  const relationsRef = useRef(null);
  const router = useRouter();
  const { id } = router.query;
  const { fetchData, recommendations, anime, characters, relations } =
    useGlobalContext();

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <div className={styles.Container}>
      <div className={styles.btnContainer}>
        <PainelAnime anime={anime} />
      </div>

      <ListDefault
        title="Recomendados"
        data={recommendations}
        typeRef={recommendationsRef}
      />
      <ListDefault typeRef={relationsRef} data={relations} entryIndex={0} />

      <Character characters={characters} />
    </div>
  );
}

export default AnimeItem;
