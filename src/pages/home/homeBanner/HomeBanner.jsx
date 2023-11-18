import React, { useEffect } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyloadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const HomeBanner = () => {

  const [background, setBackground] = React.useState('')
  const [query, setQuery] = React.useState('')
  const navigate = useNavigate();
  const {url} = useSelector((state) => state.home);

  const {data, loading} = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg)
  }, [data])

  const searchQueryHandler = (e) => {
    if(e.key === "Enter" && query !== '') {
      navigate(`/search/${query}`)
  }}
  return (
    <div className='heroBanner'>
      {!loading && <div className="backdrop-img">
        <Img src={background} alt="backdrop" />
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
      <div className="heroBannerContent">
          <span className="title">WELCOME</span>
          <span className="subTitle">Millions of movies, TV shows and People to Discover. Explore Now.</span>
          <div className="searchInput">
            <input type="text" placeholder='Search for a movie, tv show, person...' onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler}/>
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HomeBanner