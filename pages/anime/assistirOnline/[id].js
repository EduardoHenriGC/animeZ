// pages/anime/episodes/[episodeId].js
import ListEpisode from '@/src/components/ListEpisode';
import VideoPlayer from '@/src/components/VideoPlayer';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/src/styles/Watch.module.css';

const WatchPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [anime, setAnime] = useState({});
  const [episode, setEpisode] = useState([]);
  const [UrlVideo, setUrlVideo] = useState(null);
  const [indexVideo, setIndexVideo] = useState(1);
  const [UrlLegenda, setUrlLegenda] = useState(null);
  const [currentEp, setCurrentEp] = useState(null);
  const [data, setData] = useState(null);
  const [opening, setOpening] = useState(null);
  const [openingEnds, setOpeningEnds] = useState(null);
  const [ending, setEnding] = useState(null);

  const handleNextEpisode = () => {
    // Verifica se ainda há episódios disponíveis
    if (indexVideo < episode.length) {
      // Incrementa o índice do episódio
      setIndexVideo(indexVideo + 1);

      // Carrega os detalhes do próximo episódio
      carregarUrlVideo(id);
    } else {
      // Se não houver mais episódios, você pode redirecionar para a página inicial ou fazer outra coisa
      console.log('Não há mais episódios disponíveis.');
    }
  };

  useEffect(
    () => {
      carregarUrlVideo(id);
    },
    [indexVideo],
    [UrlVideo],
  );

  useEffect(() => {
    if (id) {
      fetchData();
      carregarUrlVideo(id);
    }
  }, [id]);

  const carregarUrlVideo = async (animeId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/${animeId}?index=${indexVideo}`,
        {},
      );

      const data = await response.json();
      setUrlVideo(data.url);
      setUrlLegenda(data.legenda);
      setCurrentEp(data.ep);
      setData(data);
      setEnding(data.ending);
      setOpeningEnds(data.openingEnds);
      setOpening(data.opening);
    } catch (error) {
      console.error('Erro ao carregar detalhes do anime:', error);
    }
  };

  const fetchData = async () => {
    try {
      const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const animeData = await animeResponse.json();
      setAnime(animeData.data);

      const episodeResponse = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/episodes`,
      );
      const episodeData = await episodeResponse.json();
      setEpisode(episodeData.data);
      console.log(episodeData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.videoContainer}>
          {' '}
          {UrlVideo && (
            <VideoPlayer
              videoUrl={UrlVideo}
              subtitleUrl={UrlLegenda}
              subtitleLang="pt-BR"
              onNextEpisode={handleNextEpisode}
              opening={opening}
              openingEnds={openingEnds}
              ending={ending}
            />
          )}
        </div>

        <ListEpisode
          setIndexVideo={setIndexVideo}
          anime={anime}
          setUrlVideo={setUrlVideo}
          data={data}
          currentEp={currentEp}
          episode={episode}
        />
      </div>
    </div>
  );
};

export default WatchPage;
