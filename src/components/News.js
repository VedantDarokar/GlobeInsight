import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      category: "general",
    };
  }

  async fetchNews(page, category) {
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=eafab1af717446bfab68fb25a93b60b5&page=${page}&pageSize=20`;

    this.setState({ loading: true });

    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error("Failed to fetch news");
      }

      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.fetchNews(this.state.page, this.state.category);
  }

  handleNextPage = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchNews(this.state.page, this.state.category);
    });
  };

  handlePreviousPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, () => {
        this.fetchNews(this.state.page, this.state.category);
      });
    }
  };

  handleCategoryChange = (category) => {
    this.setState({ category, page: 1 }, () => {
      this.fetchNews(1, category);
    });
  };

  render() {
    const { theme } = this.props;

    return (
      <div className={`container ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
        {/* Category Buttons */}
        <div className="d-flex justify-content-center my-3">
          {["general", "business", "entertainment", "health", "science", "sports", "technology"].map((category) => (
            <button
              key={category}
              className={`btn mx-2 ${this.state.category === category ? (theme === 'dark' ? 'btn-light' : 'btn-dark') : 'btn-outline-primary'}`}
              onClick={() => this.handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="row my-4">
          {this.state.loading ? (
            <Spinner />
          ) : (
            <>
              {this.state.articles.length === 0 ? (
                <p>No articles found</p>
              ) : (
                this.state.articles.map((element) => (
                  <div className="col-md-4 mb-4 news-item" key={element.url}>
                    <NewsItem
                      title={element.title || ""}
                      description={element.description || ""}
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      theme={theme}
                    />
                  </div>
                ))
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between my-3">
          <button
            className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
            disabled={this.state.page === 1}
            onClick={this.handlePreviousPage}
          >
            Previous
          </button>
          <button
            className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
            disabled={this.state.page * 20 >= this.state.totalResults}
            onClick={this.handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
