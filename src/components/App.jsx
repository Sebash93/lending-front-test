import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Sidebar from './Sidebar';
import Board from './Board';

@observer
class App extends Component {
  render() {
    return (
      <div>
        <div id="title-bar">
          <div className="container">
            <div className="row">
              <h1>Advances for syndication</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="main-content row">
            <Sidebar store={this.props.store} />
            <Board store={this.props.store} />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
