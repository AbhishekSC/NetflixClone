import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

export const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [bgTitle, setBgTitle] = useState("");
  const [bgDesc, setBgDesc] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const randPic = data?.results?.[Math.floor(Math.random() * 20)];
    const bg = url.backdrop + randPic?.backdrop_path;
    // data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path; //optional chaining
    setBackground(bg);
    setBgTitle(randPic?.title);
    setBgDesc(randPic?.overview);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} className="nill" />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title"> {bgTitle}</span>
          <span className="subtitle">{bgDesc}</span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
