import { useState, useEffect } from 'react';
// import { getDefaultLocale } from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import { getAlbums, getAlbum, getTrack } from '../lib/api';
// import { useNavigate } from 'react-router-dom';

const Albums = () => {
  const { birthyear } = useParams();
  // const [track, setTrack] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    console.log('CALL USE EFFECT');
    const startDataFetching = (offset) => {
      getAlbums(offset)
        .then((res) => {
          console.log('RES FROM ALBUMS ENDPOINT', res.data.albums);
          const albumsByYear = res.data.albums.filter(
            (album) => album.originallyReleased.substring(0, 4) === birthyear
          );

          console.log('FILTERED ALBUMS', albumsByYear.length);
          if (albumsByYear.length) {
            console.log(albumsByYear);

            const randomAlbumId =
              albumsByYear[Math.floor(Math.random() * albumsByYear.length)].id;

            getAlbum(randomAlbumId)
              .then((res) => {
                const randomSongId =
                  res.data.tracks[
                    Math.floor(Math.random() * res.data.tracks.length)
                  ].id;

                console.log(randomSongId);
                navigate(`/song/${randomSongId}`);
                // getTrack(randomSongId)
                //   .then((res) => setTrack(res.data))
                //   .catch((err) => console.error(err));
              })
              .catch((err) => console.error(err));
          } else {
            startDataFetching((offset + 200) % 800);
          }
        })
        .catch((err) => console.error(err));
    };
    startDataFetching(0);
  }, []);

  // useEffect(() => {
  //   const randomSongId =
  //     album.tracks[Math.floor(Math.random() * album.tracks.length)].id;

  //   console.log(randomSongId);

  //   const trackObject = getTrack(randomSongId);
  //   console.log(trackObject);
  // }, []);

  // if (track === null) {
  //   return <p>Loading</p>;
  // }
  // console.log('ksdflwndklnklnlwk', track);
  // return <p>{track.tracks[0].artistName}</p>;
  // navigate(`/songs/${track.tracks[0].id}`);
};

export default Albums;
