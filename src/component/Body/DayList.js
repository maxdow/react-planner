import React,{Component} from "react"
import tinycolor from "tinycolor2"
import moment from "moment"
import "react-grid-layout/css/styles.css"

import ReactGridLayout,{WidthProvider} from "react-grid-layout";

const ReactGridLayoutw = WidthProvider(ReactGridLayout)


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


export class DayListContainer extends Component {
  constructor(props){
    super(props)
    this.checkSideBarOverlaps = this.checkSideBarOverlaps.bind(this)
    this.handleDragStop = this.handleDragStop.bind(this)
  }
  checkSideBarOverlaps(layout, oldLayoutItem, layoutItem, placeholder){
    if(layoutItem.x<=1){
      layoutItem.x=1;
      layoutItem.y=0;
      if(placeholder){
        placeholder.x=1;
      }
    }

  }

  handleDragStop(layout, oldLayoutItem, layoutItem, placeholder){
    this.checkSideBarOverlaps(layout, oldLayoutItem, layoutItem, placeholder);

    console.log("Item déplacé",layoutItem);
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
                    i:item.id+"",
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
        onDragStart={this.checkSideBarOverlaps}
        onDrag={this.checkSideBarOverlaps}
        onDragStop={this.handleDragStop}>
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