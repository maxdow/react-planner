import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import {Planner} from "./component"

const node = document.getElementById("planner")


ReactDOM.render(
  <AppContainer>
    <Planner/>
  </AppContainer>,
  node
);

/*
if ( module.hot ) {
  module.hot.accept( './component', () => {
    const NextRoot = require( './component' ).default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      node
    );
  } );
}*/