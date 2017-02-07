import React from "react"
// import "./sidebar.css"

const keyStyle = {
  height: "2em"
}
//className="rpl-sidebar"
//
export const SideBar = ({keys = [],style}) => (
  <div style={style}>
    {keys.map((key,index) => <div style={keyStyle} key={index}>{key.title}</div>)}
  </div>
)