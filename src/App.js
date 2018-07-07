"use_strict";

import React, { Component, Fragment } from "react";
import "./App.scss";
import { sort, filter, map, length } from "./PureArray";

const colorFromScore = score => {
  if (score >= 0 && score <= 25) {
    return 'score--red';
  }
  if (score >= 25 && score <= 75) {
    return 'score--yellow';
  }
  if (score >= 75 && score <= 100) {
    return 'score--green';
  }
};

const getCompareFn = sortScheme => {
  switch(sortScheme) {
    case 'name':
      return (a, b) => {
        return a.name.charCodeAt(0) - b.name.charCodeAt(0);
      }
    case 'coolness':
      return (a, b) => {
        return b.coolness - a.coolness;
      }
    default:
      return (a, b) => {
        return a.name.charCodeAt(0) - b.name.charCodeAt(0);
      }
  }
}

const Hacker = ({ hacker }) => {
  // Red if between 0-25
  // Yellow if between 25-75
  // Green if 75 or greater
  const colorClass = colorFromScore(hacker.coolness);
  return (
    <li className="result">
      {hacker.name}
      <span className={`score ${colorClass}`}>{hacker.coolness}</span>
    </li>
  );
};

function getHackers() {
  return fetch(`/hackers.json`).then((response) => response.json());
}

const SAMPLE_HACKER = {
  id: "4DA381F3-2BEC-4AA4-86F2-21A106038BFD",
  name: "Sample Text",
  coolness: 22
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackers: [],
      searchText: '',
      sortFilter: 'coolness',
    };
  }

  componentDidMount() {
    getHackers()
      .then(hackers => {
        this.setState({
          hackers,
        });
      });
  }

  handleSearchTextChange = e => {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleSortFilterChange = e => {
    this.setState({
      sortFilter: e.target.value,
    })
  }

  render() {
    const { hackers, searchText, sortFilter } = this.state;
    const filteredHackers = filter(hackers, hacker => {
      return hacker.name.toLowerCase().includes(searchText.toLowerCase());
    });
    const sortedHackers = sort(filteredHackers, getCompareFn(sortFilter));
    return (
      <Fragment>
        <div className="logo-container">
          <img src="/logo.png" className="logo-img" alt="Hackers" />
        </div>
        <div className="container">
          <input type="text" placeholder="Search" className="search-input" onChange={this.handleSearchTextChange} />
          <div className="panel">
            <header className="panel-header">
              <h1 className="panel-header-text">Coolest Hackers</h1>
              <section className="info-bar">
                <div className="result-count">{length(filteredHackers)} results</div>
                <div className="sort-by-container">
                  Sort By:
                  <select className="sort-by-selector" value={sortFilter} onChange={this.handleSortFilterChange}>
                    <option value="name">Name</option>
                    <option value="coolness">Coolness</option>
                  </select>
                </div>
              </section>
            </header>

            <ul className="results">
              {map(sortedHackers, hacker => (
                  <Hacker hacker={hacker} key={hacker.id} />
                ))
              }
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
