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

const Day = ({date,currentDate}) => {
  return  <div className={date.isSame(currentDate,"day") ? "rpl-body-daylist-day--current" : "rpl-body-daylist-day"}></div>
}

function findnDayFromItem(days,item){
  return days.findIndex(day => day.isSame(item.start,"day"))
}

class DayListContainer extends Component{
  constructor(props){
    super(props)
    this.placeItems = this.placeItems.bind(this)
    this.state = {
      items : [],
      days : aWeek.map(nDay => this.props.startDate.clone().add(nDay,"d"))
    }
  }
  componentWillReceiveProps(nextprops){
    const newDays = aWeek.map(nDay => nextprops.startDate.clone().add(nDay,"d"))
    this.setState({
      days : newDays,
      items : this.props.items.map(item => Object.assign({},item,
        {positionX : this.dimensionJour*findnDayFromItem(newDays,item)}
        ))
    })
  }
  placeItems(domnode){
    //const positionX = domnode.getBoundingClientRect().left;
    if(domnode){
      this.dimensionJour = domnode.childNodes[0].getBoundingClientRect().width;

    }

    this.setState({
      items : this.props.items.map(item => Object.assign(item,
        {positionX : this.dimensionJour*findnDayFromItem(this.state.days,item)}
        ))
      })
  }
  render(){
    const {startDate, currentDate, items} = this.props;
    return (
      <div className="rpl-body-daylist" ref={this.placeItems}>
        {this.state.days.map((day,index) => <Day currentDate={currentDate} date={day} key={index}/>)}
        {this.state.items.map((item,index) => <div key={index} style={Object.assign({},itemStyle,{
          left : item.positionX
        })}></div>)}
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