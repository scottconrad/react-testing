var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _cars = [];

var CHANGE_EVENT = 'CarStore.changed';
var ADD_EVENT = 'CarStore.add';
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
    _cars.map(function(array_item,index){

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
    console.log("dispatcherIndex:AppDispatcher.register was called with payload",payload);
    var action = payload.action;
    switch (action.actionType) {
      case ADD_EVENT:
          console.log("we got into our ADD_EVENT");
          CarStore.addCar(action.item);
          CarStore.emitChange();
        break;
      case REMOVE_EVENT:
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }
    CarStore.emitChange();

    return true; // No errors. Needed by promise in Dispatcher.
  })

  //



});



module.exports = CarStore;
