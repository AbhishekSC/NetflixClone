import React from "react";

import useFetch from "../../../hooks/useFetch";
import { Carousel } from "../../../components/carousel/Carousel";

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  const dataLen = data?.results.length;
  const dataShowInSimilar= dataLen > 0 ? (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  ) : "";
  return dataShowInSimilar;
};

export default Similar;
