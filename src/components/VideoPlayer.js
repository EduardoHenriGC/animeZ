import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import styles from '@/src/styles/Video.module.css';

const VideoPlayer = ({
  videoUrl,
  subtitleUrl,
  subtitleLang,
  onNextEpisode,
  opening,
  openingEnds,
  ending,
}) => {
  const [skipOpening, setSkipOpening] = useState(false);
  const [skipCredits, setSkipCredits] = useState(false);
  const playerRef = useRef(null);

  const handleEnded = () => {
    // Chame a função para avançar para o próximo episódio
    onNextEpisode();
  };

  const handleProgress = (progress) => {
    if (
      skipOpening &&
      progress.playedSeconds >= opening &&
      progress.playedSeconds < opening + 2
    ) {
      // Pule para o minuto 4
      playerRef.current.seekTo(openingEnds, 'seconds');

      // Mantenha a opção marcada
    }

    if (skipCredits && progress.playedSeconds >= ending) {
      // Pule para o final do vídeo
      playerRef.current.seekTo(playerRef.current.getDuration(), 'seconds');

      // Mantenha a opção marcada
    }
  };

  return (
    <div className={styles.container}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onEnded={handleEnded}
        playing
        config={{
          file: {
            tracks: [
              {
                kind: 'subtitles',
                src: subtitleUrl,
                srcLang: subtitleLang,
                default: true,
              },
            ],
          },
        }}
      />
      <div className={styles.skip}>
        <label>
          Pular abertura
          <input
            type="checkbox"
            checked={skipOpening}
            onChange={() => setSkipOpening(!skipOpening)}
          />
        </label>
        <label>
          Pular final
          <input
            type="checkbox"
            checked={skipCredits}
            onChange={() => setSkipCredits(!skipCredits)}
          />
        </label>
      </div>
    </div>
  );
};

export default VideoPlayer;
