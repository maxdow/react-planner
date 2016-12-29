import React from "react"

const dayColors = {
  today : "#888",
  day: "#fff",
  alternate: "#f2f2f2",
  weekend: "rgba(6,6,6,0.2)"
}
const aWeek = [0,1,2,3,4,5,6,7] ;

export const BodyGrid = ({width,currentDate,startDate}) => {
  return (
    <div className="rpl-body-grid-line" style={{
      position:"absolute",
      width : width,
      height : "100%"
    }}>
    {aWeek.map(day => {
      const newDate = startDate.clone().add(day-1,"d");
      const isToday = newDate.isSame(currentDate,"day");

      return (
        <div key={day} style={{
          boxSizing : "border-box",
          background:
                      day === 0 ? "#fff" :
                      isToday ? dayColors.today :
                      day === 6 || day === 7 ? dayColors.weekend :
                      day%2 ? dayColors.day : dayColors.alternate,
          position:"absolute",
          height:"100%",
          width: Math.floor(width/8),
          left:Math.floor(day*width/8) +1,
          borderRight:"1px solid #888"
        }}>
        </div>)
    })
    }
    </div>
  )
}