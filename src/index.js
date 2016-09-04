import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import {Planner} from "./component"

import moment from "moment"

const node = document.getElementById("planner");

moment.locale("fr");

const keys = [
  {id : 1,title:"module 1",color:"red"},
  {id : 2,title:"module 2",color:"blue"},
  {id : 3,title:"module 3",color:"green"}
]
const items = [
  {key:1,start:new Date(2016,7,29,9),end:new Date(2016,7,30,19),content:"Session 1 - Lieux 1 - Formateur 1"},
  {key:1,start:new Date(2016,7,31,9),end:new Date(2016,8,2,19),content:"Session 2 - Lieux 1 - Formateur 1"},
  {key:2,start:new Date(2016,7,30,9),end:new Date(2016,7,30,19)},
  {key:3,start:new Date(2016,7,31,9),end:new Date(2016,8,3,19)}
]

const config = {
  weekend : true
}

const props = {
  keys,
  items,
  config
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