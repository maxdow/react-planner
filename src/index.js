import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import {Planner} from "./component"

import moment from "moment"

const node = document.getElementById("planner");

moment.locale("fr");

const keys = [
  {id : 1,title:"module 1",color:"orange",folder:true},
  {id : 2,title:"module 2",color:"blue"},
  {id : 3,title:"module 3",color:"green"}
]
const items = [
  {id : 1 ,key:1,start:moment().toDate(),end:moment().add(1,"d").toDate(),content:"Session 1 - Lieux 1 - Formateur 1"},
  {id : 2 ,key:1,start:moment().add(-1,"d").toDate(),end:moment().add(1,"d").toDate(),content:"Session 2 - Lieux 1 - Formateur 1"},
  {id : 3 ,key:2,start:moment().add(-2,"d").toDate(),end:moment().toDate()},
  {id : 4 ,key:3,start:moment().toDate(),end:moment().add(2,"d").toDate()}
]

const config = {
  weekendMask : true,
  dateControls : true,
  currentDate : new Date(),
  currentWeek : new Date()
}

const props = {
  keys,
  items,
  config,
  onItemMove : (event) => console.log("Item move Event",event),
  onItemSelect : (event) => console.log("Item select Event",event),
  headerTitle : "Modules"
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