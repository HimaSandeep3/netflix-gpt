import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestions from './GPTMovieSuggestions'
import { DASHBOARD_IMG} from "../utils/constants";

const GPTSearch = () => {
  return (
    <div>
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <img
                  src={DASHBOARD_IMG}
                  alt="dashBoard_img"
                  className="object-cover w-full h-full"
                />
              </div>
        <GPTSearchBar />
        <GPTMovieSuggestions />
    </div>
  )
}

export default GPTSearch