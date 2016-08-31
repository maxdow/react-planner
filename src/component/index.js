import React,{Component} from "react";
import {Header} from "./Header"
import {SideBar} from "./SideBar"
import {Body} from "./Body"
import moment from "moment"

const mainContainerStyle = {
  display: "flex",
  flexDirection: "column"
}

const headContainerStyle = {
  display: "flex",
  flex:1
}

const headerStyle = {
  flex: 1
}

const filterStyle = {
  width : 100
}

const sideBarStyle = {
  width : 100
}

const bodyContainerStyle = {
  display: "flex",
  flex : 1
}

const bodyStyle = {
  flex : 1
}


export class Planner extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentDate:moment(),
      currentStartDate:moment().startOf("week")
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }
  handleTimeChange(isAdd){
    const time = this.state.currentStartDate.clone() ;
    const newTime = isAdd ? time.add(1,"w") : time.subtract(1,"w");

    this.setState({
      currentStartDate : newTime.startOf("week")
    })
  }
  render(){
    return (
      <div style={mainContainerStyle}>


      <div style={headContainerStyle}>

        <div style={filterStyle}>filter</div>

        <Header
          style={headerStyle}
          startDate={this.state.currentStartDate}
          currentDate={this.state.currentDate}
          onWeekSub={() => this.handleTimeChange(false)}
          onWeekAdd={() => this.handleTimeChange(true)}
        />
      </div>

      <div style={bodyContainerStyle}>
        <SideBar style={sideBarStyle} keys={this.props.keys} />
        <Body style={bodyStyle} keys={this.props.keys} items={this.props.items}
          startDate={this.state.currentStartDate}
          currentDate={this.state.currentDate}/>
      </div>




      </div>

    )
  }
}