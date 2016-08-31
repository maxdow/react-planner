import React,{Component} from "react"
import "./body.css"

const aWeek = [0,1,2,3,4,5,6];

const itemStyle = {
  width : 100,
  background: "red",
  height:"80%",
  position: "absolute",
  left:0
}

function itemsByKey(items,key){
  return items.filter(item => item.key === key.id)
}

function itemByDay(items,day){
  return items.filter(item => item.start)
}

const Day = ({startDate,nDay,currentDate}) => {
  const newDate = startDate.clone().add(nDay,"d");
  return  <div className={newDate.isSame(currentDate,"day") ? "rpl-body-daylist-day--current" : "rpl-body-daylist-day"}></div>
}

class DayListContainer extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const {startDate, currentDate, items} = this.props;
    return (
      <div className="rpl-body-daylist">
        {aWeek.map((nDay) => <Day startDate={startDate} currentDate={currentDate} nDay={nDay} key={nDay}/>)}
        {items.map((item,index) => <div key={index} style={itemStyle}></div>)}
      </div>
    )
  }
}


/*TODO filterItemByWeek before sending to the body component*/

export const Body = ({style,keys=[],items=[],startDate,currentDate}) => (
  <div style={style} className="rpl-body">
    {
      keys.map((key,index) => <div key={index}>

        <DayListContainer startDate={startDate} currentDate={currentDate} items={itemsByKey(items,key)}/>

        </div>)
    }
  </div>
)