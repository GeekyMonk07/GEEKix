import React, { useEffect } from 'react'
import './style.scss'
import {useParams} from 'react-router-dom'
import {fetchDataFromApi} from '../../utils/api'
import Spinner from '../../components/spinner/Spinner'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/movieCard/MovieCard'

const SearchResult = () => {
  const [data, setData] = React.useState(null)
  const [pageNum, setPageNum] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const {query} = useParams()

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if(data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results]
        })
      }
      else{
        setData(res)
      }
      setPageNum((prev) => prev + 1)
    })
  }

  useEffect(() => {
    setPageNum(1)
    fetchInitialData();
  }, [query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
            <div className='pageTitle'>
              {`Search Results for '${query}'`}
            </div>
            <InfiniteScroll
            className='content'
            dataLength={data?.results?.length || []}
            next={fetchNextPageData}
            hasMore={pageNum <= data?.total_pages}
            loader={<Spinner/>}>
              {
                data?.results?.map((item, index) => {
                  if(item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true}/>
                  )
                })
              }
            </InfiniteScroll>
            </>
          ) : 
          (
            <div className="resultNotFound">
              sorry, no results found.
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult