import { useEffect, useState } from "react";
import { Track } from "../Track";
import { useExtractColors } from "react-extract-colors";
import rgbHex from "rgb-hex";

import Lyrics from "./Lyrics";

export default function AlbumDetails({ album, onScrollTopDetails }) {
  const [lyrics, setLyrics] = useState("");
  const [showDetails, setShowDetails] = useState(true);

  const {
    name,
    release_date,
    total_tracks,
    tracks,
    artists = [],
    images = [],
    uri: albumUri,
  } = album;

  const [displayedName, setDisplayedName] = useState(name);
  const [uri, setUri] = useState(albumUri);
  const albumUrl = album.external_urls.spotify;
  const [url, setUrl] = useState(albumUrl);

  const image = images[0]?.url;
  const releaseYear = release_date?.slice(0, 4);
  const { colors } = useExtractColors(image);

  useEffect(() => {
    setShowDetails(true);
    setDisplayedName(album.name);
    setUri(album.uri);
  }, [album]);

  function handleShowDetails() {
    setShowDetails((showDetails) => !showDetails);
    setDisplayedName(name);
    setLyrics("");
  }

  async function handleGetLyrics(songName, artistName, uri, url) {
    const res = await fetch(
      `https://lrclib.net/api/get?artist_name=${artistName}&track_name=${songName}}`
    );
    const data = await res.json();
    setLyrics(data.plainLyrics);
    setShowDetails(false);
    setDisplayedName(songName);
    setUri(uri);
    onScrollTopDetails();
    setUrl(url);
  }

  const mainColor = colors[1]
    ? rgbHex(colors[1]?.slice(5, 18))?.slice(0, 6)
    : "000";

  if (!album) return;
  return (
    <div className="box">
      <div className="album-details">
        {lyrics !== "" && lyrics?.trim() && (
          <button onClick={handleShowDetails} className="btn-back">
            <svg
              className="arrow"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="#fff"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>

            <p> Back</p>
          </button>
        )}
        <img className="album-img" src={image} alt={name} />
        <div className="album-text">
          <h2 className="artist-name">
            {artists[0].name} <span className="circle">&#9679;</span>{" "}
            {releaseYear}{" "}
            {showDetails && (
              <>
                <span className="circle">&#9679;</span> {total_tracks} songs
              </>
            )}
          </h2>
          <div className="album-title">
            <h2
              style={{
                backgroundImage: `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
              }}
              className="album-name highlight"
            >
              {displayedName}
            </h2>
            <a href={url} target="_blank" rel="noreferrer">
              <img
                className="spotify-code"
                src={`https://scannables.scdn.co/uri/plain/png/${mainColor}/white/260/${uri}`}
                alt={`Spotify Code for ${name}`}
              />
            </a>
          </div>
        </div>

        {showDetails ? (
          <>
            <div className="album-text">
              <div className="tracks">
                {tracks?.items?.map((track, i) => (
                  <Track
                    onGetLyrics={handleGetLyrics}
                    track={track}
                    index={i + 1}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </>
        ) : lyrics && lyrics.trim() !== "" ? (
          <Lyrics>{lyrics}</Lyrics>
        ) : (
          <p>No lyrics found.</p>
        )}
      </div>
    </div>
  );
}
