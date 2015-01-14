/**
 * Created by scottconrad on 1/14/15.
 */
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var CarAppActions = {
  addCar: function (item) {
    AppDispatcher.handleViewAction({
      actionType: 'CarStore.add',
      item: item
    })
  }
}

module.exports = CarAppActions;