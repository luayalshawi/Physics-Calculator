var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  getInitialState: function()
  {
    return(
      {
          selectedTab:["active","","","","",""],
      }
    );
  },
  _onClick: function(index)
  {
    // e.preventDefault();
    var tmp = ["","","","","",""];
    tmp[index] = "active";
    this.setState({
      selectedTab: tmp
    });

  },
  render: function()
  {

    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-1"></div>
          <div className="col-xs-10">
          <ul className="nav nav-pills">
            <li onClick={this._onClick.bind(this,0)} role="presentation" className={this.state.selectedTab[0]}><Link to="/">Home</Link></li>
            <li onClick={this._onClick.bind(this,1)} role="presentation" className="dropdown">
              <a  className={this.state.selectedTab[1] + " dropdown-toggle"} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                Resistor Calculator <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li onClick={this._onClick.bind(this,2)} role="presentation" className={this.state.selectedTab[2]}><Link to="/resistor">Resistor Color Chart Calculator</Link></li>
                <li onClick={this._onClick.bind(this,2)} role="presentation" className={this.state.selectedTab[2]}><Link to="/seriesresistor">Serires Resistor Calculator</Link></li>
                <li onClick={this._onClick.bind(this,3)} role="presentation" className={this.state.selectedTab[3]}><Link to="/parallelresistor">Parallel Resistor Calculator</Link></li>

              </ul>
            </li>
            <li onClick={this._onClick.bind(this,1)} role="presentation" className="dropdown">
              <a  className={this.state.selectedTab[1] + " dropdown-toggle"} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                Capacitor Calculator <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
              <li onClick={this._onClick.bind(this,4)} role="presentation" className={this.state.selectedTab[4]}><Link to="/seriescapacitor">Serires Capacitor Calculator</Link></li>
              <li onClick={this._onClick.bind(this,5)} role="presentation" className={this.state.selectedTab[5]}><Link to="/parallelcapacitor">Parallel Capacitor Calculator</Link></li>

              </ul>
            </li>
          </ul>
          </div>
          <div  className="col-xs-1"></div>
        </div>
      </div>

    );
  }
});
