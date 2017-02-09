import React from "react"
import ReactGridLayout,{WidthProvider} from 'react-grid-layout';
const ReactGridLayoutw = WidthProvider(ReactGridLayout)

import format from 'date-fns/format'
import addDays from "date-fns/add_days"
import isSameDay from "date-fns/is_same_day"

import "./header.css"

const aWeek = [0,1,2,3,4,5,6];


export const DayListHeader = ({startDate, currentDate,HeaderTitle,DayFormatter}) => {
  const layout = [{
      i:"0.0",
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
            date:newDate,
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
    {layout.map((day,index) => (
      <div key={day.i}
      className={day.isToday ? "rpl-header-daylist-day rpl-header-daylist-day--current" : "rpl-header-daylist-day"}>

      {index === 0 ? <HeaderTitle /> : <DayFormatter date={day.date}/> }

    </div>
    )
  )}
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






//TODO events as unique cb "onChange"
export const Header = ({currentDate,startDate,onWeekSub,onWeekAdd,onMoveToday,style,config}) => {
  const events = {onMoveToday,onWeekAdd,onWeekSub} ;
  return (
    <div style={style} className="rpl-header">

        {config.dateControls ? <Controls startDate={startDate} {...events} />: null}

        <DayListHeader startDate={startDate} currentDate={currentDate} HeaderTitle={config.HeaderTitle} DayFormatter={config.DayFormatter}/>

    </div>

  )
}