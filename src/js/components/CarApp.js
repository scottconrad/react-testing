var React = require('react');
var CarStore = require('../stores/CarStore');
var CarItem = require('./CarItem');
var CarAppActions = require('../actions/CarAppActions');
//////

  function getCars(){
    return {
      cars:CarStore.getAllCars()
    }
  }

var CarApp = React.createClass({

  getInitialState:function(){
    return getCars();
  },
  componentDidMount:function(){
    CarStore.addChangeListener(this._onChange);
  },
  componentWillUnmount:function(){
    CarStore.removeChangeListener(this._onChange);
  },
  _onChange:function(){
    console.log('CarApp._onChange was called:',getCars());
    this.setState(getCars());

  },
  _onButtonClick:function(){
    //this was bad
    //CarStore.addCar({'name':'A Car ' + (Math.floor(Math.random() * 10000000000)).toString(),'img_src':'http://loremflickr.com/320/240/paris,girl/all?random=' + Math.floor((Math.random() * 100) + 1) + '/HawaiiLife'});
    CarAppActions.addCar({
      'key':(Math.floor(Math.random() * 10000000000000)),
      'name': 'A Car ' + (Math.floor(Math.random() * 10000000000)).toString(),
      'img_src': 'http://loremflickr.com/320/240/paris,girl/all?random=' + Math.floor((Math.random() * 100) + 1) + '/HawaiiLife'
    });
  },
  render:function(){

    var car_items = this.state.cars.map(function(item,i){

      return (
        <div>
          <CarItem item={item} key={i}  />
        </div>
      )

    });
    return (
      <div>
        <div>Here's the Car App</div>
       <button onClick={this._onButtonClick}>Here's a button</button>
        <div className="car-items">
        {car_items}
        </div>
      </div>
    )
  }
});


module.exports = CarApp;
