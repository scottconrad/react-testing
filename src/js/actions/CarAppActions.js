/**
 * Created by scottconrad on 1/14/15.
 */
var AppDispatcher = require('../dispatchers/AppDispatcher');

var CarAppActions = {
  addCar: function (item) {
    console.log("CarAppActions.addCar was called");
    AppDispatcher.handleViewAction({
      actionType: 'CarStore.add',
      item: item
    });
  }
}

module.exports = CarAppActions;