import React from "react"

import "./header.css"

const aWeek = [0,1,2,3,4,5,6];

export const DayList = ({startDate, currentDate}) => (
  <div className="rpl-header-daylist">
    {aWeek.map((day) => {
      const newDate = startDate.clone().add(day,"d");
      return  <div className={newDate.isSame(currentDate,"day") ? "rpl-header-daylist-day--current" : "rpl-header-daylist-day"} key={day}>
              {newDate.format("dddd D")}
              </div>
    })}
  </div>
)

/*
const Controls = () => (

)*/

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