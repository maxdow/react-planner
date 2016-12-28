import React from "react"
import {WidthProvider} from "react-grid-layout";


import {BodyGrid} from "./BodyGrid"
import {DayListContainer} from "./DayList"

import "react-resizable/css/styles.css"
import "./body.css"

const aWeek = [0,1,2,3,4,5,6];


function itemsByKey(items,key){
  return items.filter(item => item.key === key.id)
}





/*TODO filterItemByWeek before sending to the body component*/


const Body = ({style,keys,startDate,currentDate,items,width,onItemMove}) => {

  const days = aWeek.map(nDay => startDate.clone().add(nDay,"d"));
  return (
      <div style={style} className="rpl-body">
      <BodyGrid width={width} currentDate={currentDate} startDate={startDate} />

      {keys.map((key,index) => (
        <div key={index}>
          <DayListContainer style={{paddingTop : 2}}
                            startDate={startDate}
                            currentDate={currentDate}
                            items={itemsByKey(items,key)}
                            linekey={key}
                            days={days}
                            width={0}
                            onItemMove={onItemMove}
          />
        </div>
        )
      )}

      </div>
  )
}

export default WidthProvider(Body)