import React,{Component} from "react"
import isEqual from "lodash.isequal"
import tinycolor from "tinycolor2"

import addDays from "date-fns/add_days"

import isSameWeek from "date-fns/is_same_week"
import isSameDay from "date-fns/is_same_day"

import "react-grid-layout/css/styles.css"

import ReactGridLayout,{WidthProvider} from "react-grid-layout";

const ReactGridLayoutw = WidthProvider(ReactGridLayout)


const itemStyle = {
  boxSizing : "border-box",
  background: "rgba(0,0,0,0.5)",
  border : "2px solid #000",
  // borderRadius: "5px"//,
  // height:"1.4em",
  //position: "absolute",
  //left:0,
  // top:"0.3em"
}

const layoutEventToPlannerEvent = (layoutEvent,{items,linekey,startDate,days}) => {
  const {x,w,i} = layoutEvent;

  return {
    itemId : i,
    start : addDays(startDate,x-1),
    end : addDays(startDate,x - 1 + w)
  }
}

const checkSideBarOverlaps = (layout, oldLayoutItem, layoutItem, placeholder) => {
    if(layoutItem.x<=1){
      layoutItem.x=1;
      layoutItem.y=0;
      if(placeholder){
        placeholder.x=1;
      }
    }
}

const dateInWeek = (date,startDate) => isSameWeek(date,startDate,{weekStartsOn:1})
const itemsInWeek = (items,startDate) => items.some(item => isSameWeek(item.start,startDate,{weekStartsOn:1}))
// console.log(items,startDate)

export class DayListBody extends Component {
  constructor(props){
    super(props)
    this.handleDragStop = this.handleDragStop.bind(this)
  }

  handleDragStop(layout, oldLayoutItem, layoutItem, placeholder){
    checkSideBarOverlaps(layout, oldLayoutItem, layoutItem, placeholder);
    if(isEqual(oldLayoutItem,layoutItem) && this.props.onItemSelect){
      this.props.onItemSelect(layoutEventToPlannerEvent(layoutItem,this.props))
    } else if(this.props.onItemMove) {
      this.props.onItemMove(layoutEventToPlannerEvent(layoutItem,this.props))
    }
  }
  render(){

    const {items,linekey,startDate,days,config} = this.props;

    const {ItemComponent} = config

    const color = tinycolor(linekey.color);

    const colors = {
      border : color.toString(),
      background : color.setAlpha(.5).toRgbString()
    }

    const layout = [{
          i:linekey.title,
          x:0,
          y:0,
          w:1,
          h:1,
          maxH:1,
          static: true
          }].concat(items
                .filter(item => dateInWeek(item.start,startDate))
                .map((item) => {

                  const startDay = days.findIndex(day => isSameDay(day,item.start))

                  const endDay = dateInWeek(item.end,startDate) ? days.findIndex(day => isSameDay(item.end,day)) : -1

                  return {
                    i:item.id+"",
                    data:item,
                    x:startDay+1,
                    y:0,
                    w:endDay === -1 ? (7-startDay) : (endDay - startDay + 1),
                    h:1,
                    maxH:1
                  }
                }
            ))

    return itemsInWeek(items,startDate) ? <ReactGridLayoutw className="layout" layout={layout} cols={8} rowHeight={30} margin={[4,4]}
        onDragStart={checkSideBarOverlaps}
        onDrag={checkSideBarOverlaps}
        onDragStop={this.handleDragStop}
        onResizeStop={this.handleDragStop}
        >
          {
            layout.map((item,index) => index === 0 ?

              <div key={item.i} className="rpl-sidebar-item">{linekey.title}</div> :

              <div style={{...itemStyle,borderColor:colors.border,background: colors.background,borderLeft : "8px solid "+colors.border}} key={item.i}>
                <ItemComponent />
              </div>
            )
          }
        </ReactGridLayoutw> : null
  }

}