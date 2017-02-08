import React,{Component} from "react";
import {Header} from "./Header"
//import {SideBar} from "./SideBar"
import Body from "./Body"

import startOfWeek from "date-fns/start_of_week"
import addWeeks from "date-fns/add_weeks"
import format from 'date-fns/format'


const mainContainerStyle = {
  display: "flex",
  flexDirection: "column"
}

const headerStyle = {
  flex: 1
}

const bodyContainerStyle = {
  display: "flex",
  flexDirection:"column",
  flex : 1
}

const bodyStyle = {
  flex : 1
}


const defaultProps = {
  currentWeek: new Date(),
  config: {
    DayFormatter : ({date}) => <div>{format(date,"ddd D")}</div>,
    HeaderTitle : () => <div></div>,
    ItemComponent : () => <div></div>
  },
};


export class Planner extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentDate:new Date(),
      currentStartDate: startOfWeek(props.currentWeek || new Date(),{weekStartsOn:1})
    }

    this.decorateItemEvent = this.decorateItemEvent.bind(this)
  }

  handleTimeChange(isAdd){

    this.setState({
      currentStartDate : startOfWeek(
                          addWeeks(this.state.currentStartDate,
                                      isAdd ? 1:-1
                                  )
                         ,{weekStartsOn:1})
    })

  }
  handleMoveToday(){
    this.setState({
      currentStartDate : startOfWeek(new Date())
    })
  }
  decorateItemEvent(cb) {
    return (event) => cb ? cb({
      item : this.props.items.find(item => item.id == event.itemId),
      start : event.start,
      end : event.end
    }) : null
  }
  render(){
    const config = {...defaultProps.config,...this.props.config}



    return (
      <div style={mainContainerStyle}>

      <div style={bodyContainerStyle}>

       <Header
          style={headerStyle}
          startDate={this.state.currentStartDate}
          currentDate={this.state.currentDate}
          onWeekSub={this.handleTimeChange.bind(this,false)}
          onWeekAdd={this.handleTimeChange.bind(this,true)}
          onMoveToday={this.handleMoveToday.bind(this)}

          config={config}
       />

        {/*<SideBar style={sideBarStyle} keys={this.props.keys} />*/}

        <Body style={bodyStyle}
          keys={this.props.keys}
          items={this.props.items}
          startDate={this.state.currentStartDate}
          currentDate={this.state.currentDate}
          onItemMove={this.decorateItemEvent(this.props.onItemMove)}
          onItemSelect={this.decorateItemEvent(this.props.onItemSelect)}
          config={config}
        />

      </div>




      </div>

    )
  }
}
Planner.defaultProps = {
  config: {}
};