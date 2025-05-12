import React from 'react'
import { useEffect,useRef } from 'react';
import { useSelector} from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieid,playWithAudio }) => {
  const playerRef = useRef(null);
  const playerReadyRef = useRef(false);
  const videoId = useMovieTrailer(movieid);
  const trailerVideo = useSelector(store => store.movies?.trailer);
  const loadYouTubeAPI = () => {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve();
      } else {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = () => resolve();
      }
    });
  };

  useEffect(() => {
    const setupPlayer = async () => {
      if (!videoId || playerRef.current) return;
      await loadYouTubeAPI();

      playerRef.current = new window.YT.Player("yt-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
            playerReadyRef.current = true;
          },
        },
      });
    };

    setupPlayer();
  }, [videoId]);

  useEffect(() => {
    if (playWithAudio && playerReadyRef.current && playerRef.current?.unMute) {
      playerRef.current.unMute();
      playerRef.current.playVideo();
    }
  }, [playWithAudio]);
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-black pb-10 md:h-screen">
      <div id="yt-player" className="w-full h-full" />
    </div>
  );
};

export default VideoBackground