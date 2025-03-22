export function Track({ track, index, onGetLyrics }) {
  console.log(track);
  return (
    <div>
      <p
        onClick={() =>
          onGetLyrics(
            track.name,
            track.artists[0].name,
            track.uri,
            track.external_urls.spotify
          )
        }
      >
        {index} - <span className="track">{track.name}</span>
      </p>
    </div>
  );
}
