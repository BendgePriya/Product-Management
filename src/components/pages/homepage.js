import React, { Component } from 'react';
// import { css } from 'emotion';
import Header from '../header/header';
import ResultContainer from '../../containers/resultContainer';
export default class Homepage extends Component {
  render() {
    return (
      <div>
          <Header/>
          <ResultContainer/>
      </div>
    );
  }
}