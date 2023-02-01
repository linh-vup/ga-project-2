import axios from 'axios';

const ALBUMS_URL = 'https://api.napster.com/v2.0/albums/top';
const API_KEY = {
  params: { apikey: 'YTY2NzM4ODgtMTdhNi00MWQ5LTkyZDktMmZjODBkYzA4N2Qw' }
};

const getParams = (offset) => ({
  params: {
    limit: 200,
    apikey: 'YTY2NzM4ODgtMTdhNi00MWQ5LTkyZDktMmZjODBkYzA4N2Qw',
    offset
  }
});

export const getAlbums = (offset) => {
  return axios.get(ALBUMS_URL, getParams(offset));
};

export const getAlbum = (albumId) => {
  return axios.get(
    `https://api.napster.com/v2.2/albums/${albumId}/tracks`,
    API_KEY
  );
};

export const getTrack = (trackId) => {
  return axios.get(`https://api.napster.com/v2.2/tracks/${trackId}`, API_KEY);
};

export const getImages = (albumImagesEndpoint) => {
  return axios.get(albumImagesEndpoint, API_KEY);
};
