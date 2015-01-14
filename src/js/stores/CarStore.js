var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _cars = [];

var CHANGE_EVENT = 'Carstore.changed';
var ADD_EVENT = 'Carstore.add';
var REMOVE_EVENT = 'Carstore.remove';

var CarStore = assign({}, EventEmitter.prototype, {
  instance:this,
  counter:0,
  addCar:function(car){
    //console.log("we are adding car",car);
    car.index = _cars.length;
    ++this.counter;
    _cars.push(car);
    CarStore.emitChange();
  },
  getAllCars:function(){
    return _cars;
  },
  removeCar:function(item){
    console.log('the item is:',item);
    _cars.map(function(array_item,index){
      console.log('the array item is',array_item);
      if(item.props.item.name === array_item.name) _cars.splice(index,1);
      CarStore.emitChange();
    });
  },

  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener:function(callback){
    this.on(CHANGE_EVENT,callback);
  },
  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT,callback);
  },
  dispatcherIndex: AppDispatcher.register(function (payload) {

    var action = payload.action;
    var text;
    console.log(payload);
    console.log("our dispatcherIndex was called");
    switch (action.actionType) {
      case ADD_EVENT:
          this.addCar(action.car);
          this.emitChange();
        break;
      case REMOVE_EVENT:
        console.log("Our remove event was called");
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }
    CarStore.emitChange();

    return true; // No errors. Needed by promise in Dispatcher.
  })

  //



});



module.exports = CarStore;
