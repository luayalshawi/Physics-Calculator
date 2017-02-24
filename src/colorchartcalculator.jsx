var React = require('react');
var ReactDOM = require('react-dom');
module.exports = React.createClass({
  getInitialState: function() {
    return({
      s:["Black","Brown","Red","Orange","Yellow","Green","Blue","Violet","Gray","White","Gold","Silver"],
      Selected: 0,
      selectedColors: [],
      result:0,
      mapped:[{color:"Black",value:0,multiplier:1,tolerance:0},
      {color:"Brown",value:1,multiplier:10,tolerance:1},
      {color:"Red",value:2,multiplier:100,tolerance:2},
      {color:"Orange",value:3,multiplier:1000,tolerance:0},
      {color:"Yellow",value:4,multiplier:100000,tolerance:0},
      {color:"Green",value:5,multiplier:1000000,tolerance:0.5},
      {color:"Blue",value:6,multiplier:10000000,tolerance:0.25},
      {color:"Violet",value:7,multiplier:100000000,tolerance:0.1},
      {color:"Gray",value:8,multiplier:1000000000,tolerance:0.1},
      {color:"White",value:9,multiplier:1000000000,tolerance:0.1},
      {color:"Gold",value:0,multiplier:0.10,tolerance:5},
      {color:"Silver",value:0,multiplier:0.01,tolerance:10}
    ]
        });
  },
  resistorMapedValue:function(color)
  {
    var tmp = this.state.mapped;
    var v = [];
    for(var i = 0; i < tmp.length; i++)
    {
      if(tmp[i].color == color)
      {
        v = tmp[i];
        break;
      }
    }
    return v;
  },
  numOfSelected:function(selectedArr)
  {
    var arr= selectedArr;
    var counter = 0;
    for(var i =0; i < arr.length;i++)
    {
      if(arr[i] =="Selected")
      {
        counter +=1;
      }
    }
    this.setState({Selected:counter});
  },
  change: function(i)
  {
    //console.log(i.target.checked);
  },
  remvoveFrom:function(arr,value)
  {
    var tmp = [];
    for(var i = 0; i < arr.length;i++){
      if( arr[i] !=value )
      {
        tmp.push(arr[i]);
      }
    }
    return tmp;
  },
  setColor:function(index,logic,color)
  {
    var tmp = this.state.s;
    var selected = this.state.selectedColors;
    var result = 0;
    if(logic == true)
    {
      tmp[index] = "Selected";
      selected.push(color);
    }
    else {
      tmp[index] = color;
      selected = this.remvoveFrom(selected,color);
    }

    var colors = selected;//this.state.selectedColors;
    if(colors.length > 2)
    {
      var multiplier;
      var tolerance;
      var totalFigure = "";
      for(var i = 0; i < colors.length; i++)
      {
        if(i < (colors.length-2))
        {
          totalFigure = totalFigure + "" +   this.resistorMapedValue(colors[i]).value;
        }else {
          multiplier =   this.resistorMapedValue(colors[colors.length-2]).multiplier;
          tolerance =   this.resistorMapedValue(colors[colors.length-1]).tolerance;

          break;
        }
      }
      result = parseInt(totalFigure) * multiplier;
    }
    this.setState({s:tmp,selectedColors:selected,result:result});
    this.numOfSelected(tmp);

  },
  change1: function(i)
  {
    console.log('click');
    this.setColor(0,i.target.checked,"Black");
  },
  change2: function(i)
  {
    this.setColor(1,i.target.checked,"Brown");
  },
  change3: function(i)
  {
    this.setColor(2,i.target.checked,"Red");
  },
  change4: function(i)
  {
    this.setColor(3,i.target.checked,"Orange");
  },
  change5: function(i)
  {
    this.setColor(4,i.target.checked,"Yellow");
  },
  change6: function(i)
  {
    this.setColor(5,i.target.checked,"Green");
  },
  change7: function(i)
  {
    this.setColor(6,i.target.checked,"Blue");
  },
  change8: function(i)
  {
    this.setColor(7,i.target.checked,"Violet");
  },
  change9: function(i)
  {
    this.setColor(8,i.target.checked,"Grey");
  },
  change10: function(i)
  {
    this.setColor(9,i.target.checked,"White");
  },
  change11: function(i)
  {
    this.setColor(10,i.target.checked,"Gold");
  },
  change12: function(i)
  {
    this.setColor(11,i.target.checked,"Silver");
  },
  render: function() {
    var colorsSelected = this.state.selectedColors.map(function(v,i){
      var color = ((v=="Black") ?v+" white-color":v);
      return(           <label key={i} className={color+ " btn btn-secondary-outline}"}>
                          {i}
                          <input type="checkbox" className="boarderRad" autoComplete="off"/>
                        </label>);
    });
    return ( <form className="text-center" onChange={this.change}>
              <p className="text-muted"> Resistevity values </p>
              <div className="">
                <div className="btn-group" data-toggle="buttons">
                  <label style={{"color":"white"}} className=" black btn btn-secondary-outline">
                    <input onChange={this.change1} type="checkbox" className="boarderRad " autoComplete="off"/>
                    {this.state.s[0]}
                  </label>
                  <label className={this.state.s[1] + " brown btn btn-secondary-outline"}>
                    <input onChange={this.change2} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[1]}
                  </label>
                  <label className={this.state.s[2] + " red btn btn-secondary-outline"}>
                    <input onChange={this.change3} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[2]}
                  </label>
                  <label className={this.state.s[3] + " orange btn btn-secondary-outline"}>
                    <input onChange={this.change4} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[3]}
                  </label>
                  <label className={this.state.s[4] + " yellow btn btn-secondary-outline"}>
                    <input onChange={this.change5} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[4]}
                  </label>
                  <label className={this.state.s[5] + " green btn btn-secondary-outline"}>
                    <input onChange={this.change6} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[5]}
                  </label>
                  <label className={this.state.s[6] + " blue btn btn-secondary-outline"}>
                    <input onChange={this.change7} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[6]}
                  </label>
                  <label className={this.state.s[7] + " violet btn btn-secondary-outline"}>
                    <input onChange={this.change8} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[7]}
                  </label>
                  <label className={this.state.s[8] + " grey btn btn-secondary-outline"}>
                    <input onChange={this.change9} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[8]}
                  </label>
                  <label className={this.state.s[9] + " white btn btn-secondary-outline"}>
                    <input onChange={this.change10} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[9]}
                  </label>
                  <label className={this.state.s[10] + " gold btn btn-secondary-outline"}>
                    <input onChange={this.change11} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[10]}
                  </label>
                  <label className={this.state.s[11] + " silver btn btn-secondary-outline"}>
                    <input onChange={this.change12} type="checkbox" className="boarderRad" autoComplete="off"/>
                    {this.state.s[11]}
                  </label>

                </div>
              </div>
              <br/>
              <div className="">
                <div className="btn-group" data-toggle="buttons">
                  {colorsSelected}
                </div>
              </div>
              <br/>
              <div className="">
                <div className=""></div>
                <div className=""><span>{this.state.result}</span> Ω</div>
                <div className=""></div>
              </div>
            </form>
          );
  }
});
