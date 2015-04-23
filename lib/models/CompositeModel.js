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

module.exports = CompositeModel;