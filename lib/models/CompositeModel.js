var Model = require('./Model');

class CompositeModel extends Model {

  constructor() {
    super();
    this.children = [];
  }

  addChild(model) {
    this.children.push(model);
    this.emitChange('child_added');
  }

  removeChild(model) {
    var index = this.children.indexOf(model);
    if (index === -1) {
      throw new Error('model not found in composite');
    }
    this.children.splice(index, 1);
    this.emitChange('child_removed');
  }

}

module.exports = CompositeModel;