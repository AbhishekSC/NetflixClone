import { useEffect } from "react";
import { fetchDataFromAPI } from "./utils/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Details } from "./pages/details/Details";
import { SearchResult } from "./pages/searchResult/SearchResult";
import { Explore } from "./pages/explore/Explore";
import { PageNotFound } from "./pages/404/PageNoteFound";
import { Footer } from "./components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAPIConfiguration } from "./features/home/homeSlice";
import { Header } from "./components/header/Header";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchAPIConfig();
  }, []);

  const fetchAPIConfig = () => {
    fetchDataFromAPI("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getAPIConfiguration(url));
    });
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
