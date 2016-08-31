import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import {Planner} from "./component"

import moment from "moment"

const node = document.getElementById("planner");

moment.locale("fr");

const keys = [
  {id : 1,title:"module 1"},
  {id : 2,title:"module 2"}
]
const items = [
  {key:1,start:new Date(2016,7,31,9),end:new Date(2016,7,31,19)}
]

const props = {
  keys,
  items
}

ReactDOM.render(
  <AppContainer>
    <Planner {...props}/>
  </AppContainer>,
  node
);


if ( module.hot ) {
  module.hot.accept( './component', () => {
    const NewPlanner = require( './component' ).Planner;
    ReactDOM.render(
      <AppContainer>
        <NewPlanner {...props}/>
      </AppContainer>,
      node
    );
  } );
}