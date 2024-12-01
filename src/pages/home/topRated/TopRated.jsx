import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { SwitchTabs } from "../../../components/switchTabs/SwitchTabs";
import "../style.scss";
import useFetch from "../../../hooks/useFetch";
import { Carousel } from "../../../components/carousel/Carousel";

export const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const onSwitchTabChange = (tab) => {
    setEndpoint(tab == "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated on Filmz</span>
        <SwitchTabs
          data={["Movies", "TV Shows"]}
          onSwitchTabChange={onSwitchTabChange}
        />
      </ContentWrapper>
      <Carousel data= {data?.results} loading= {loading} endpoint= {endpoint} />
    </div>
  );
};
