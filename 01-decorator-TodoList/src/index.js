import tools from './utils/tools.js';
import todo from './decorator/todo.js';

@todo
@tools
class Todo {
  constructor(doc) {
    this.oTodo = doc.getElementsByClassName('J_todo')[0]
    this.oInput = this.oTodo.getElementsByClassName('todo-input')[0]
    this.oTodoList = this.oTodo.getElementsByClassName('todo-list')[0]
    this.oLogList = this.oTodo.getElementsByClassName('log-list')[0]

    this.log = []
    // console.log(Todo.generator)
    // console.log(this.log)
    this.iterator = Todo.generator(this.log)
    // console.log(Todo.prototype)
    this.init()
  }

  init() {
    this.bindEvent()
  }

  bindEvent() {
    this.oTodo.addEventListener('click', this.handleTodoBtn.bind(this), false)
  }

  handleTodoBtn(ev) {
    // console.log(ev)
    const e = ev || window.event,
      tar = e.target || e.srcElement,
      className = tar.className
    // console.log(e)
    // console.log(e.target)
    // console.log(e.currentTarget)

    switch (className) {
      case 'add-btn':
        this.addItem()
        break;
      case 'remove-btn':
        this.removeItem(tar)
        break;
      default:
        break;
    }
  }
  removeItem(target) {
    const oParent = target.parentNode,
      val = oParent.getElementsByTagName('span')[0].innerHTML
    // console.log(target) //触发事件的元素
    // console.log(oParent) // li元素
    // console.log(val) //内容
    this.addLog(val, 'remove')
    oParent.remove()
    this.oLogList.appendChild(this._showLog(this.iterator.next().value))
  }
  addItem() {
    const val = Todo.trimSpace(this.oInput.value)
    // console.log(val)
    if (val.length <= 0 || val.length > 20) {
      alert('字数 1~20 个')
      return
    }
    if (this._checkItemExist(val, this.log) === -1) {
      alert('已存在该项，请不要重复添加！')
      return
    }
    this.addLog(val, 'add')
    this.oTodoList.appendChild(this._createItem(val))
    this.oLogList.appendChild(this._showLog(this.iterator.next().value))
    this.oInput.value = ''
  }

  addLog(value, action) {
    this.log.push({
      value,
      action,
      dateTime: new Date()
    })
  }
}

new Todo(document)