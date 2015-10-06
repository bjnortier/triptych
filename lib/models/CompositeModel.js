var Model = require('./Model');

class CompositeModel extends Model {

  constructor() {
    super();
    this.children = [];
    this.changeFn = () => {
      this.emit('change');
    };
  }

  addChild(child) {
    this.children.push(child);
    this.emitChange('child_added');
    child.on('change', this.changeFn);
  }

  removeChild(child) {
    var index = this.children.indexOf(child);
    if (index === -1) {
      throw new Error('model not found in composite');
    }
    child.off('change', this.changeFn);
    this.children.splice(index, 1);
    this.emitChange('child_removed');
  }

}

module.exports = CompositeModel;