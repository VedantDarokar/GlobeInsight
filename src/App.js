import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: localStorage.getItem("theme") || "light", // Default to light theme
    };
  }

  toggleTheme = () => {
    const newTheme = this.state.theme === "light" ? "dark" : "light";
    this.setState({ theme: newTheme });
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  componentDidMount() {
    document.body.className = this.state.theme;
  }

  render() {
    return (
      <div className={`app ${this.state.theme}`}>
        <Navbar toggleTheme={this.toggleTheme} theme={this.state.theme} />
        <News theme={this.state.theme} />
      </div>
    );
  }
}
