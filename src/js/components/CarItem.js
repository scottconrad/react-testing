/**
 * Created by scottconrad on 1/14/15.
 */
var React = require('react');
var CarStore = require('../stores/CarStore');
var CarItem = React.createClass({
  relative_style:{position:'relative','width':'400px'},
  remove_icon:{position:'absolute','top':'10px;','right':'10px'},
  _removeItem:function(){
    console.log("we clicked removed on",this);
    CarStore.removeCar(this);
  },

  render:function() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div style={this.relative_style}>
        <i onClick={this._removeItem} style={this.remove_icon} className="fa fa-remove"></i>
        <h2>This is a car Item {this.props.item.index}</h2>
        <img src={this.props.item.img_src} alt={this.props.item.name} />
      </div>
    )
  }
});

module.exports = CarItem; //