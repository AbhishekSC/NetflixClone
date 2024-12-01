import { useParams } from "react-router-dom";
import "./style.scss";
import { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";

export const SearchResult = () => {
  const [data, setdata] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setdata(res);
        setPageNum((prevState) => prevState + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setdata({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setdata(res);
        }
        setPageNum((prevState) => prevState + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of "${query}"`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="resultNotFound">
              <span>
                Your search did not find any matches.
              </span>
              <div className="resultNotFoundBelow">
                <p className="suggestions">Suggestions</p>
                <ul className="resultNotFoundList">
                  <li>Try different keywords</li>
                  <li>Looking for a movie or a TV show?</li>
                  <li>Try using a movie, TV show title</li>
                </ul>
              </div>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};
