export const LOGO ="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const DASHBOARD_IMG="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_large.jpg";
export const USER_IMG="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";
export const API_OPTIONS={
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.REACT_APP_TMDBAPI_KEY
    }
  }

export const IMG_PATH="https://image.tmdb.org/t/p/original/"
export const SUPPORTED_LANGUAGES=[{id:"eng",name:"English"},{id:"hin",name:"Hindi"},{id:"tel",name:"Telugu"}]
export const GEMINIAI_KEY = process.env.REACT_APP_GEMINIAI_KEY;