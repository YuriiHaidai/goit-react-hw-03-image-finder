import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import axios from 'axios';

const KEY = '15932999-a5eed31b79b3cb2d90b9ac589';

class App extends Component {
  state = {
    gallery: [],
    query: '',
    page: 1,
    isLoading: false,
    error: false,
  };

  onChangeQuery = query => {
    this.setState({
      query,
      page: 1,
      gallery: [],
    });
  };

  fetchRequest = async () => {
    try {
      const { query, page } = this.state;
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      );

      return response.data.hits;
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query) {
      this.setState({
        isLoading: true,
      });
      const request = async () => {
        const result = await this.fetchRequest();
        this.setState({
          gallery: [...result],
          isLoading: false,
        });
      };
      request();
    }

    if (page !== prevState.page) {
      this.setState({
        isLoading: true,
      });
      const request = async () => {
        const result = await this.fetchRequest();
        this.setState(state => ({
          gallery: [...state.gallery, ...result],
          isLoading: false,
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      };
      request();
    }
  }

  pageChanger = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  render() {
    const { gallery, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onChangeQuery={this.onChangeQuery} />
        {error && <h1>something gone wrong, try again later</h1>}
        {!!gallery.length && !error && (
          <>
            <ImageGallery gallery={gallery} />
            {!isLoading && <Button pageChanger={this.pageChanger} />}
          </>
        )}
        {isLoading && <Loader />}
      </>
    );
  }
}

export default App;
