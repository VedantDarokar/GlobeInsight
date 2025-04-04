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
    const apiKey = "eafab1af717446bfab68fb25a93b60b5";
    const baseUrl = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&page=${page}&pageSize=20`;
    const proxyUrl = "https://api.allorigins.win/raw?url=";
  
    this.setState({ loading: true });
  
    try {
      const response = await fetch(proxyUrl + encodeURIComponent(baseUrl));
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
  
      const parsedData = await response.json();
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
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
        <div className="d-flex flex-wrap justify-content-center my-3 gap-2">
          {[
            "general",
            "business",
            "entertainment",
            "health",
            "science",
            "sports",
            "technology",
          ].map((category) => (
            <button
              key={category}
              className={`btn ${this.state.category === category ? (theme === 'dark' ? 'btn-light' : 'btn-dark') : 'btn-outline-primary'}`}
              onClick={() => this.handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="row my-4">
          {this.state.loading ? (
            <Spinner />
          ) : (
            this.state.articles.length === 0 ? (
              <p>No articles found</p>
            ) : (
              this.state.articles.map((element) => (
                <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex align-items-stretch" key={element.url}>
                  <div className="w-100">
                    <NewsItem
                      title={element.title || ""}
                      description={element.description || ""}
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      theme={theme}
                    />
                  </div>
                </div>
              ))
            )
          )}
        </div>

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