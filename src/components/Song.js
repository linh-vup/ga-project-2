import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbums, getAlbum, getTrack, getImages } from '../lib/api';

function Song() {
  const { birthyear } = useParams();
  const [artwork, setArtwork] = useState('');
  const [track, setTrack] = useState(null);

  useEffect(() => {
    console.log('CALL USE EFFECT');
    const startDataFetching = (offset) => {
      getAlbums(offset)
        .then((res) => {
          console.log('GOT', res.data.albums.length, 'Albums');

          const albumsByYear = res.data.albums.filter(
            (album) => album.originallyReleased.substring(0, 4) === birthyear
          );

          if (albumsByYear.length) {
            const randomAlbum =
              albumsByYear[Math.floor(Math.random() * albumsByYear.length)];
            const randomAlbumId = randomAlbum.id;

            const randomAlbumEP = randomAlbum.links.images.href;
            // get images for album
            getImages(randomAlbumEP).then((data) => {
              const randomNumber = Math.floor(
                Math.random() * data.data.images.length
              );
              setArtwork(data.data.images[randomNumber].href);
            });

            // get album data
            getAlbum(randomAlbumId)
              .then((res) => {
                const randomSongId =
                  res.data.tracks[
                    Math.floor(Math.random() * res.data.tracks.length)
                  ].id;

                console.log('FILTERED TRACK', randomSongId);

                getTrack(randomSongId)
                  .then((res) => setTrack(res.data))
                  .catch((err) => console.error(err));
              })
              .catch((err) => console.error(err));
          } else {
            console.log('NO FILTERED ALBUMS');
            startDataFetching(offset + 200);
          }
        })
        .catch((err) => console.error(err));
    };
    startDataFetching(0);
  }, []);

  if (track === null) {
    return <p>Loading</p>;
  }

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Q? Not sure why below isn't centered on page, I thought className "container" makes it centered */}
      <div className="container">
        <div className="column is-half-desktop is-one-half-tablet container">
          <div className="card">
            <div className="card-header">
              <h4 className="card-header-title">{track.tracks[0].name}</h4>
            </div>
            <div className="card-image">
              <figure className="image image is-1by1">
                <img
                  src={artwork}
                  alt="album artwork"
                  loading="lazy"
                  width="255"
                  height="255"
                />
              </figure>
            </div>
            <div className="card-content">
              <h4 className="">
                <strong>Artist:</strong> {track.tracks[0].artistName}
              </h4>
              <h4 className="">
                <strong>Album/EP:</strong> {track.tracks[0].albumName}
              </h4>
              <h4 className="">
                <strong>Released:</strong> {track.tracks[0].albumName}
              </h4>
              <audio controls src={track.tracks[0].previewURL}></audio>
              <button
                className="button is-fullwidth is-medium is-link"
                onClick={reloadPage}
              >
                Give me another one
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Song;
