'use client';
import { useGlobalContext } from '@/context/global';
import Popular from './Popular';
import { useState } from 'react';
import styles from '@/src/styles/Home.module.css';

function Homepage() {
  const { handleSubmit, search, handleChange } = useGlobalContext();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.searchContainer}>
          <form action="" className={styles.searchForm} onSubmit={handleSubmit}>
            <div className={styles.inputControl}>
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
              />
              <button className={styles.button} type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </header>
      <Popular />
    </div>
  );
}

export default Homepage;
