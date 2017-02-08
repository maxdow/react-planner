import React from "react"
import ReactGridLayout,{WidthProvider} from 'react-grid-layout';
const ReactGridLayoutw = WidthProvider(ReactGridLayout)

import format from 'date-fns/format'
import addDays from "date-fns/add_days"
import isSameDay from "date-fns/is_same_day"

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
        const newDate = addDays(startDate,day);
          return {
            i:day.toString(),
            title:format(newDate,"dddd D"),
            isToday:isSameDay(newDate,currentDate),
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

const upperCaseFirst = (str) => str[0].toUpperCase() + str.substr(1);

const dateformat = (date) => upperCaseFirst(format(date,"MMMM YYYY - [Week] W"/*,{locale:localfr}*/))


const Controls = ({startDate,onWeekSub,onWeekAdd,onMoveToday}) => (
  <div className="rpl-header-controls">
    <button className="rpl-header-controls-button" onClick={onWeekSub}>{"<"}</button>
    <div className="rpl-header-controls-title">{dateformat(startDate)}</div>
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