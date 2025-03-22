import { useEffect, useState } from "react";
import AlbumDetails from "./Main/AlbumDetails";
import Search from "./NavBar/Search";
import NavBar from "./NavBar/NavBar";
import Logo from "./NavBar/Logo";
import Main from "./Main/Main";
import AlbumList from "./Main/AlbumList";
import useAccessToken from "../hooks/useAccessToken";
import Album from "./Main/Album";

function App() {
  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState([]);
  const [accessToken] = useAccessToken();
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  function handleSelectAlbum(album) {
    setSelectedAlbum(album);
    handleShowAlbum(album.id);
    handleScrollTopDetails();
  }

  function handleScrollTopDetails() {
    if (!document.querySelector(".album-details")) return;
    document.querySelector(".album-details").scrollTop = 0;
  }

  function handleSearch(query) {
    setQuery(query);
    if (!document.querySelector(".album-card")) return;

    document.querySelector(".album-card").scrollTop = 0;
  }

  useEffect(
    function () {
      if (query === "") return;
      async function getAlbum() {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${query}&type=album`,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );
          const data = await response.json();
          setAlbums(data?.albums?.items);
        } catch (err) {
          console.error(`⛔ Spotify API: ${err}`);
        }
      }

      getAlbum();
    },
    [setAlbums, query, accessToken]
  );

  async function handleShowAlbum(albumId) {
    if (!albumId) return;
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      const data = await response.json();
      setSelectedAlbum(data);
    } catch (err) {
      console.error(`⛔ Spotify API: ${err}`);
    }
  }

  return (
    <div className="App">
      <NavBar>
        <Logo />
        <Search query={query} onSetQuery={handleSearch} />
        <p>Found {albums?.length || "0"} results</p>
      </NavBar>
      {query === "" && <h1 className="search-title">Search a Song!</h1>}
      <Main>
        {query !== "" && (
          <AlbumList>
            <p className="secondary-header">Suggestions</p>
            {albums?.map((album, index) => (
              <Album
                onSelectAlbum={handleSelectAlbum}
                album={album}
                index={index}
                key={album.id}
              />
            ))}
          </AlbumList>
        )}
        {query !== "" && selectedAlbum && (
          <AlbumDetails
            onScrollTopDetails={handleScrollTopDetails}
            album={selectedAlbum}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
