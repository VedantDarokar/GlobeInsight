import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, theme } = this.props;
    let defaultImgUrl = "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg";
    let imageSrc = imgUrl ? imgUrl : defaultImgUrl;

    // Truncate title and description if they are too long
    const maxTitleLength = 50;
    const maxDescriptionLength = 100;

    const truncatedTitle = title?.length > maxTitleLength ? title.slice(0, maxTitleLength) + "..." : title;
    const truncatedDescription = description?.length > maxDescriptionLength ? description.slice(0, maxDescriptionLength) + "..." : description;

    // Add dark mode styling
    const themeClass = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
    const buttonClass = theme === "dark" ? "btn-outline-light" : "btn-outline-dark";

    return (
      <div className={`card my-3 mx-3 ${themeClass} border rounded shadow-sm`}>
        <img 
          src={imageSrc} 
          className="card-img-top" 
          alt={title || "News"} 
          onError={(e) => e.target.src = defaultImgUrl} // Fallback for broken image
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{truncatedTitle}</h5>
          <p className="card-text">{truncatedDescription}</p>
          <a 
            href={newsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`btn ${buttonClass}`}
          >
            Read more
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
