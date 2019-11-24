import tpl from '../template/item.js';
import logTpl from '../template/log.js';

export default (target) => {
  target.prototype._createItem = (value) => {
    const oLi = document.createElement('li')
    oLi.innerHTML = tpl().replace(/{{(.*?)}}/g, value)
    return oLi
  }
  target.prototype._checkItemExist = (value, todo) => {
    console.log(todo)
    if (todo.includes(value)) {
      return -1
    }
  }

  target.prototype._showLog = function (item) {
    const oLi = document.createElement('li')
    // console.log(logTpl())
    // console.log(item)
    oLi.innerHTML = logTpl().replace(/{{(.*?)}}/g, (node, key) => {
      return {
        value: item.value,
        action: item.action,
        dateTime: item.dateTime
      }[key];
    })

    return oLi
  }
}