import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import {Planner} from "./component"

import format from "date-fns/format"
import localfr from "date-fns/locale/fr"
import addDays from "date-fns/add_days"

const node = document.getElementById("planner");


const keys = [
  {id : 1,title:"module 1",color:"orange",folder:true},
  {id : 2,title:"module 2",color:"blue"},
  {id : 3,title:"module 3",color:"green"}
]
const now = new Date()
const tomorrow = addDays(now,1)
const yesterday = addDays(now,-1)
const lastWeek = addDays(now,-7)


const itemStyle = {
  boxSizing : "border-box",
  background: "rgba(0,0,0,0.5)",
  border : "2px solid #000",
  height:"100%"
}
const itemStyleDashed = {
  ...itemStyle,
  background: "rgba(0,0,0,0.2)",
  border : "2px dashed rgba(0,0,0,0.8)",
}


const items = [
  {id : 1 ,key:1,start:now,end:tomorrow,content:"Session 1 - Lieux 1 - Formateur 1"},
  {id : 2 ,key:1,start:yesterday,end:tomorrow,content:"Session 2 - Lieux 1 - Formateur 1",dashed:true},
  {id : 3 ,key:2,start:tomorrow,end:tomorrow,},
  {id : 4 ,key:3,start:lastWeek,end:now}
]


const upperCaseFirst = (str) => str[0].toUpperCase() + str.substr(1);

const config = {
  weekendMask : true,
  dateControls : false,
  weekStartOn : 1,
  DayFormatter : ({date}) => <div>{upperCaseFirst(format(date,"ddd D",{locale:localfr}))}</div>,
  ItemComponent : ({data}) => <div style={data.dashed ? itemStyleDashed : itemStyle}>{data.content}</div>,
  SideComponent : ({data}) => <div>{data.title}</div>
}

const props = {
  keys,
  items,
  config,
  currentWeek : new Date(),
  onItemMove : (event) => console.log("Item move Event",event),
  onItemSelect : (event) => console.log("Item select Event",event)
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