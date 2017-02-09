<h1 align="center">React Planner</h1>
WIP...

## Properties
```
const defaultProps = {
  //Current week displayed
  currentWeek: ?Date = new Date()

  config: {
    // Day weeks
    // day date is passed as property 'date'
    DayFormatter : ?Component = ({date}) => <div>{format(date,"ddd D")}</div>,

    // Top left Cell
    HeaderTitle : ?Component = () => <div></div>,

    // Item
    // There is two properties passed to the component definition 'index' and 'data'
    // 'index' is the current item key
    // 'data' represent all the datas passed as items collection
    ItemComponent : ?Component = () => <div style={itemStyle}></div>
  },
};
```
