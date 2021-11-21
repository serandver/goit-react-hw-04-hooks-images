import './App.css';
import React, { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [imageName, setImageName] = useState('');
  const [largeImage, setLargeImage] = useState(null);

  const search = imageName => {
    setImageName(imageName);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClickImage = largeImage => {
    setLargeImage(largeImage);
    toggleModal();
  };

  return (
    <>
      <Searchbar onSubmit={search} />
      <ImageGallery imageName={imageName} onClickImage={handleClickImage} />
      {showModal && (
        <Modal
          toogleModal={toggleModal}
          largeImage={largeImage}
          imageName={imageName}
        />
      )}
      <ToastContainer />
    </>
  );
}
