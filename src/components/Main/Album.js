export default function Album({ album, onSelectAlbum }) {
  return (
    <div className="album-item" onClick={() => onSelectAlbum(album)}>
      <img src={album.images[0]?.url} alt="" />
      <p>{album.name}</p>
    </div>
  );
}
