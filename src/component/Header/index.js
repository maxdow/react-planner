import React from "react"
import ReactGridLayout,{WidthProvider} from 'react-grid-layout';
const ReactGridLayoutw = WidthProvider(ReactGridLayout)

import "./header.css"

const aWeek = [0,1,2,3,4,5,6];

export const DayList = ({startDate, currentDate}) => {
  const layout = aWeek.map((day) => {
    const newDate = startDate.clone().add(day,"d");
    return {
      i:day.toString(),
      title:newDate.format("dddd D"),
      isToday:newDate.isSame(currentDate,"day"),
      x:day+1,
      y:0,
      w:1,
      h:1,
      static:true
    }

  })
  return (
  <ReactGridLayoutw className="layout" layout={layout} cols={8} rowHeight={36} margin={[0,0]} >
    {layout.map(day => <div className={day.isToday ? "rpl-header-daylist-day rpl-header-daylist-day--current" : "rpl-header-daylist-day"} key={day.i}>{day.title}</div> )}
  </ReactGridLayoutw>
  )
}


export const Header = ({startDate,currentDate,onWeekSub,onWeekAdd,style}) => (
  <div style={style} className="rpl-header">

    <div className="rpl-header-controls">
      <div>
      <button>-</button>
      Année 2016
      <button>+</button>
      </div>
      <div>
      <button onClick={onWeekSub}>-</button>
      Week {startDate.week()}
      <button onClick={onWeekAdd}>+</button>
      </div>
    </div>

    <DayList startDate={startDate} currentDate={currentDate}/>

  </div>
)