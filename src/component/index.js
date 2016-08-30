import React,{Component} from "react";
import {Header} from "./Header"
import moment from "moment"

export class Planner extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentStartDate:moment()
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }
  handleTimeChange(isAdd){
    const time = this.state.currentStartDate.clone() ;
    this.setState({
      currentStartDate : isAdd ? time.add("w",1) : time.subtract("w",1)
    })
  }
  render(){
    return (
      <div>
      <Header
        startDate={this.state.currentStartDate}
        onWeekSub={() => this.handleTimeChange(false)}
        onWeekAdd={() => this.handleTimeChange(true)}
      />

      </div>

    )
  }
}