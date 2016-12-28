import React from "react"
import ReactGridLayout,{WidthProvider} from 'react-grid-layout';
const ReactGridLayoutw = WidthProvider(ReactGridLayout)

import "./header.css"

const aWeek = [0,1,2,3,4,5,6];

//const Day = ({day,skin}) => <div className={day.isToday ? "rpl-header-daylist-day rpl-header-daylist-day--current" : "rpl-header-daylist-day"} key={day.i}>{day.title}</div>

export const DayList = ({startDate, currentDate,headerTitle=""}) => {
  const layout = [{
      i:"0.0",
      title:headerTitle,
      x:0,
      y:0,
      w:1,
      h:1,
      static:true
    }].concat(
      aWeek.map((day) => {
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
    )


  return (
  <ReactGridLayoutw className="layout" layout={layout} cols={8} rowHeight={36} margin={[0,0]} >
    {layout.map(day => <div key={day.i}
      className={day.isToday ? "rpl-header-daylist-day rpl-header-daylist-day--current" : "rpl-header-daylist-day"}>
      {day.title}
    </div> )}
  </ReactGridLayoutw>
  )

}

const Controls = ({startDate,onWeekSub,onWeekAdd,onMoveToday}) => (
  <div className="rpl-header-controls">
    <button className="rpl-header-controls-button" onClick={onWeekSub}>{"<"}</button>
    <div className="rpl-header-controls-title">{`${startDate.format("MMMM")} ${startDate.year()}`} - Semaine {startDate.week()}</div>
    <button className="rpl-header-controls-button" onClick={onWeekAdd}>{">"}</button>
    <button onClick={onMoveToday}>Today</button>
  </div>
)

export const Header = ({currentDate,startDate,onWeekSub,onWeekAdd,onMoveToday,style,headerTitle}) => {
  const events = {onMoveToday,onWeekAdd,onWeekSub} ;
  return (
    <div style={style} className="rpl-header">

        <Controls startDate={startDate} {...events} />

        <DayList startDate={startDate} currentDate={currentDate} headerTitle={headerTitle}/>

    </div>

  )
}