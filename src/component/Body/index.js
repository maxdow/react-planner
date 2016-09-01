import React,{Component} from "react"
import moment from "moment"
import tinycolor from "tinycolor2"
import "./body.css"

const aWeek = [0,1,2,3,4,5,6];

const itemStyle = {
  boxSizing : "border-box",
  background: "rgba(0,0,0,0.5)",
  border : "2px solid #000",
  borderRadius: "5px",
  height:"1.4em",
  position: "absolute",
  left:0,
  top:"0.3em"
}

function itemsByKey(items,key){
  return items.filter(item => item.key === key.id)
}
/*
function itemByDay(items,day){
  return items.filter(item => item.start)
}*/

const Day = ({date,currentDate}) => (
   <div className={date.isSame(currentDate,"day") ? "rpl-body-daylist-day--current" : "rpl-body-daylist-day"}></div>
)

const Item = ({item,colors}) => (
  <div style={Object.assign({},itemStyle,{
          left : item.positionX,
          width:item.width,
          borderColor:colors.border,
          background: colors.background
        })}>
  </div>
  )



function getDOMItems(dimensionJour,startDate,days,items){

  return items
        .filter(item => moment(item.start).isSame(startDate,"week"))
        .map(item => {
          const startDay = days.findIndex(day => day.isSame(item.start,"day"))
          const endDay = moment(item.end).isSame(startDate,"week") ? days.findIndex(day => day.isSame(item.end,"day")) : -1

          return Object.assign({},item,
                  {
                    positionX : dimensionJour*startDay,
                    width : endDay === -1 ? (7-startDay)*dimensionJour : dimensionJour*(endDay - startDay + 1)
                  })
        }
          )
}


class DayListContainer extends Component{
  constructor(props){
    super(props)

    this.placeItems = this.placeItems.bind(this)

    const color = tinycolor(props.linekey.color);

    this.colors = {
      border : color.toString(),
      background : color.setAlpha(.5).toRgbString()
    }

    this.state = {
      items : [],
      days : aWeek.map(nDay => this.props.startDate.clone().add(nDay,"d"))
    }
  }
  componentWillReceiveProps({startDate,items}){
    const newDays = aWeek.map(nDay => startDate.clone().add(nDay,"d"))
    this.setState({
      days : newDays,
      items : getDOMItems(this.dimensionJour,startDate,newDays,items)
    })
  }


  placeItems(domnode){
    //const positionX = domnode.getBoundingClientRect().left;
    if(domnode){
      this.dimensionJour = domnode.childNodes[0].getBoundingClientRect().width;
    }

    this.setState({
      items : getDOMItems(this.dimensionJour, this.props.startDate, this.state.days, this.props.items)
    })
  }
  render(){

    const {currentDate} = this.props;

    return (
      <div className="rpl-body-daylist" ref={this.placeItems}>
        {this.state.days.map((day,index) => <Day currentDate={currentDate} date={day} key={index}/>)}

        {this.state.items.map((item,index) => <Item key={index} item={item} colors={this.colors}/>)}

      </div>
    )
  }
}


/*TODO filterItemByWeek before sending to the body component*/

export const Body = ({style,keys=[],items=[],startDate,currentDate}) => (
  <div style={style} className="rpl-body">
    {
      keys.map((key,index) => <div key={index}>

        <DayListContainer startDate={startDate} currentDate={currentDate} items={itemsByKey(items,key)} linekey={key}/>

        </div>)
    }
  </div>
)