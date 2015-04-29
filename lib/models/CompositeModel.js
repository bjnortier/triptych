var Model = require('./Model');

function CompositeModel() {
  Model.call(this);
  this.children = [];
}

CompositeModel.prototype = Object.create(Model.prototype);

CompositeModel.prototype.addChild =function(model) {
  this.children.push(model);
  this.emitChange();
};

CompositeModel.prototype.removeChild = function(model) {
  var index = this.children.indexOf(model);
  if (index === -1) {
    throw new Error('model not found in composite');
  }
  this.children.splice(index, 1);
  this.emitChange();
};


module.exports = CompositeModel;