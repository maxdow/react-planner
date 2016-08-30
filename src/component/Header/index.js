import React from "react"

const DayList = () => (
  <div></div>
)


export const Header = ({startDate,onWeekSub,onWeekAdd}) => (
  <div>
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
    <DayList />
  </div>
)