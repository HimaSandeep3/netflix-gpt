import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieid, playWithAudio }) => {
  const playerRef = useRef(null);
  const playerReadyRef = useRef(false);
  const videoId = useMovieTrailer(movieid);

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
      if (!videoId) return;
      await loadYouTubeAPI();

      // Clean up old player if it exists
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
        playerReadyRef.current = false;
      }

      playerRef.current = new window.YT.Player("yt-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: playWithAudio ? 0 : 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: (event) => {
            playerReadyRef.current = true;
            if (playWithAudio) {
              event.target.unMute();
            } else {
              event.target.mute();
            }
            event.target.playVideo();
          },
        },
      });
    };

    setupPlayer();

    return () => {
      // Cleanup on unmount or before re-initialization
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
        playerReadyRef.current = false;
      }
    };
  }, [videoId, playWithAudio]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-black pb-10 md:h-screen">
      <div id="yt-player" className="w-full h-full" />
    </div>
  );
};

export default VideoBackground;
