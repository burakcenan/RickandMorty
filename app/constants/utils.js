import moment from 'moment';

export const apiUrl = 'https://rickandmortyapi.com/api/';

export const formatDate = date => {
  const dateObj = moment(date).fromNow();

  return dateObj;
};
