import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import ImageLoader from '../ImageLoader/ImageLoader';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

const API_SECRET_KEY = '23900299-fa2ddfe6bd8026b5b95bcaf8f';
const baseURL = `https://pixabay.com/api/`;
const perPage = 12;

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ imageName, onClickImage }) {
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setStatus(STATUS.PENDING);
    setSearchResult([]);
    setCurrentPage(1);
    fetchImages();
  }, [imageName]);

  const fetchImages = () => {
    const url = `${baseURL}?q=${imageName}&page=${currentPage}&key=${API_SECRET_KEY}&per_page=${perPage}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Empty result'));
      })
      .then(data => {
        const { hits } = data;
        setSearchResult([...searchResult, ...hits]);
        setCurrentPage(currentPage + 1);
        setStatus(STATUS.RESOLVED);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        setError(error);
        setStatus(STATUS.REJECTED);
      });
  };

  if (status === STATUS.IDLE) {
    return <div></div>;
  }

  if (status === STATUS.PENDING) {
    return <ImageLoader />;
  }

  if (status === STATUS.REJECTED) {
    return <div>{error.message}</div>;
  }

  if (status === STATUS.RESOLVED) {
    return (
      <>
        <ul className="ImageGallery">
          {searchResult.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              onClickImage={onClickImage}
              largeImageURL={largeImageURL}
              imageName={imageName}
            />
          ))}
          {searchResult.length > 0 ? (
            <LoadMoreButton onClick={fetchImages} />
          ) : (
            <h1>По вашему запросу ничего не найдено.</h1>
          )}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  onSubmit: PropTypes.func,
  imageName: PropTypes.string,
  onClickImage: PropTypes.func,
};
