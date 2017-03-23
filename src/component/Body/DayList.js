import React,{Component} from "react"
import isEqual from "lodash.isequal"

import addDays from "date-fns/add_days"

import isSameWeek from "date-fns/is_same_week"
import isSameDay from "date-fns/is_same_day"

import "react-grid-layout/css/styles.css"

import ReactGridLayout,{WidthProvider} from "react-grid-layout";

const ReactGridLayoutw = WidthProvider(ReactGridLayout)




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

    const {items,startDate,linekey,days,config} = this.props;

    const {ItemComponent,SideComponent} = config

    const layout = [{
          i:"_"+items[0].id,
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

              <div key={item.i} className="rpl-sidebar-item"><SideComponent index={index} data={linekey}/></div> :

              <div key={item.i} className="rpl-item">
                <ItemComponent index={index} data={item.data}/>
              </div>
            )
          }
        </ReactGridLayoutw> : null
  }

}