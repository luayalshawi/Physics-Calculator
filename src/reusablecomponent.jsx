var React = require('react');

module.exports = React.createClass({
  getInitialState: function()
  {
    return(
      {
          inputField:[],
          result: 0
      }
    );
  },
  onAdd: function(e)
  {
    e.preventDefault();
    var arr = this.state.inputField
    var result = ((this.props.typeofcalc=="series") ?this.calculateSeriesResult(arr):this.calculateParallelResult(arr));
    var tmp = this.state.inputField;
    tmp.push(0);
    this.setState({
      inputField:tmp,
      result: result
    });
  },
  calculateParallelResult:function(arr)
  {
    var result = 0;
    for (var i = 0; i < arr.length;i++)
    {
      var _flot = parseFloat(arr[i])
      if(_flot!=0)
      {
        result = (1/parseFloat(arr[i])) + result;
      }
    }

    return (result!=0 ?1/result:0)//(1 / result);
  },
  calculateSeriesResult:function(arr)
  {
    var result = 0;
    for (var i = 0; i < arr.length;i++)
    {
      result = parseFloat(arr[i]) + result;
    }
    return (result);
  },
  Change:function(e)
  {
    var arr = this.state.inputField
    var result = ((this.props.typeofcalc=="series") ?this.calculateSeriesResult(arr):this.calculateParallelResult(arr));
    this.setState({
      result:result
    });
  },
  onRemove: function(index)
  {
    //console.log(index);
    var tmp = this.state.inputField;
    console.log(tmp);
    var newarr = [];
    console.log("index to be removed:"+index);
    for(var i =0 ; i < tmp.length; i++)
    {
      if(index != i)
      {
        newarr.push(tmp[i]);
      }
    }
    var result = ((this.props.typeofcalc=="series") ?this.calculateSeriesResult(newarr):this.calculateParallelResult(newarr));

    console.log(newarr);
    this.setState({
      inputField: newarr,
      result:result
    });
    // console.log(this.calculateSeriesResult());
    // console.log(this.calculateParallelResult());
    return false;
  },
  onValueChange:function(e,index) {
    console.log(e.target.value);
    console.log(index);
    // copy array before modifying
    var temp = this.state.inputField
    temp[index] = e.target.value
    this.setState({inputField:temp})
  },
  render: function()
  {
    var listofinputs = this.state.inputField.map(function(v,i){
      return(
        <div key={i}>
          {this.props.absrv}{i+1}<input value={(v==0?"":v)} onChange={function(e) {this.onValueChange(e,i)}.bind(this)} ref={"input"+i} type="text"/>
          {/*<button className="btn" onClick={this.onRemove.bind(this, i)} >
            <span className="glyphicon glyphicon-remove"></span>
          </button>*/}
          <input value="X" className="bbtn glyphicon glyphicon-remove" type="button" onClick={this.onRemove.bind(this, i)} />
        </div>
      );
    }.bind(this));
      return(
        <form action="" className="text-center" onChange={this.Change}>
          {listofinputs}
          {/*<bold>Test</bold><br/>*/}
          <button className="btn" onClick={this.onAdd}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
          <br/>
          {this.state.result} {this.props.unit}
        </form>
      );
  }
});
