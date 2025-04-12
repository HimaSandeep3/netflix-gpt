import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainContainer = () => {
    const movies=useSelector(store=>store.movies?.nowPlayingMovies)
    if(!movies) return; //early return
    const mainMovie= movies[0];
    const{original_title,overview,poster_path,id}=mainMovie
  return (
    <div>
        <VideoTitle title={original_title} overview={overview} path={poster_path}/>
        <VideoBackground movieid={id}/>
    </div>
  )
}

export default MainContainer