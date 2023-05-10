import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    imagelist: [],
    page: 1,
    filter: '',
    loading: false,
    showModal: false,
    modalImg: '',
  };

  handleSearchSubmit = filter => {
    this.setState({ filter });
  };

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  toggleModal = largeImageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      modalImg: largeImageURL,
    }));
  };

  render() {
    const { filter, imagelist, showModal, modalImg } = this.state;

    return (
      <div>
        <header>
          <Searchbar
            value={filter}
            onSubmit={this.handleSearchSubmit}
            onChange={this.handleChange}
          />
        </header>
        <main>
          <ImageGallery
            filter={filter}
            images={imagelist}
            onClick={this.toggleModal}
          />
          {showModal && <Modal onClose={this.toggleModal} url={modalImg} />}
        </main>
        <ToastContainer />
      </div>
    );
  }
}
