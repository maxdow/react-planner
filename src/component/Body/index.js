import React,{Component} from "react"
import moment from "moment"
import tinycolor from "tinycolor2"
// import Draggable from "react-draggable"
import ReactGridLayout,{WidthProvider} from 'react-grid-layout';
const ReactGridLayoutw = WidthProvider(ReactGridLayout)
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./body.css"

const aWeek = [0,1,2,3,4,5,6];


const itemStyle = {
  boxSizing : "border-box",
  background: "rgba(0,0,0,0.5)",
  border : "2px solid #000",
  borderRadius: "5px"//,
  // height:"1.4em",
  //position: "absolute",
  //left:0,
  // top:"0.3em"
}

function itemsByKey(items,key){
  return items.filter(item => item.key === key.id)
}


class DayListContainer extends Component {
  constructor(props){
    super(props)
    this.checkSideBarOverlaps = this.checkSideBarOverlaps.bind(this)
  }
  checkSideBarOverlaps(layout, oldLayoutItem, layoutItem, placeholder){
    if(layoutItem.x<=1){
      layoutItem.x=1;
      placeholder.x=1;
    }
  }
  render(){

    const {items,linekey,startDate,days} = this.props;
    const color = tinycolor(linekey.color);

      const colors = {
        border : color.toString(),
        background : color.setAlpha(.5).toRgbString()
    }
    const layout = [{
          i:linekey.title,
          x:0,
          y:0,
          w:1,
          h:1,
          maxH:1,
          static: true
          }].concat(items
                .filter(item => moment(item.start).isSame(startDate,"week"))
                .map((item,index) => {
                  const startDay = days.findIndex(day => day.isSame(item.start,"day"))
                  const endDay = moment(item.end).isSame(startDate,"week") ? days.findIndex(day => day.isSame(item.end,"day")) : -1

                  return {
                    i:linekey.title+index,
                    data:item,
                    x:startDay+1,
                    y:0,
                    w:endDay === -1 ? (7-startDay) : (endDay - startDay + 1),
                    h:1,
                    maxH:1
                  }
                }
            ))
    return (
        <ReactGridLayoutw className="layout" layout={layout} cols={8} rowHeight={44} margin={[4,4]}
        onDrag={this.checkSideBarOverlaps}>
          {
            layout.map((item,index) => index === 0 ?

              <div key={item.i} className="rpl-sidebar-item">{linekey.title}</div> :

              <div style={Object.assign({},itemStyle,{
                borderColor:colors.border,
                background: colors.background
              })} key={item.i}>{item.data.content}</div>)
          }
        </ReactGridLayoutw>

    )
  }

}


const dayColors = {
  today : "#d4d6e8",
  day: "#fff",
  alternate: "#f2f2f2",
  weekend: "rgba(6,6,6,0.5)"
}

/*TODO filterItemByWeek before sending to the body component*/
const BodyGrid = ({width,currentDate,startDate}) => {
  return (
    <div className="rpl-body-grid-line" style={{
      // opacity : mounted ? 1 : 0,
      //transition: "opacity 0.8s ease",
      position:"absolute",
      width : width,
      height : "100%"
    }}>
    {[0,1,2,3,4,5,6,7].map(day => {
      const newDate = startDate.clone().add(day,"d");
      const isToday = newDate.isSame(currentDate,"day");
      // const isWeekend = () => newDate.day() === 0 || newDate.day() === 6 ;
      // console.log(day,newDate.format("DD"),newDate.day(),isWeekend())
      return (
        <div key={day} style={{
          boxSizing : "border-box",
          background: day === 0 ? "#fff" :
                      isToday ? dayColors.today :
                      day === 6 || day === 7 ? dayColors.weekend :
                      day%2 ? dayColors.day : dayColors.alternate,
          position:"absolute",
          height:"100%",
          width: width/8,
          left:day*width/8,
          borderRight:"1px solid #888"
        }}>
        </div>)
    })
    }
    </div>
  )
}

const Body = ({style,keys,startDate,currentDate,items,width}) => {

  const days = aWeek.map(nDay => startDate.clone().add(nDay,"d"));
  return (
      <div style={style} className="rpl-body">
      <BodyGrid width={width} currentDate={currentDate} startDate={startDate} />
      {
        keys.map((key,index) => <div key={index} /*style={{borderBottom : "1px solid #888",zIndex:100}}*/>
          <DayListContainer style={{paddingTop : 2}} startDate={startDate} currentDate={currentDate} items={itemsByKey(items,key)} linekey={key} days={days} width={0}/>

          </div>)
      }

      </div>
  )
}

export default WidthProvider(Body)