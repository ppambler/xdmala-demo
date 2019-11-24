import tools from './utils/tools.js';
import todo from './decorator/todo.js';
import M from './middleware/functions.js';

@todo
@tools
class Todo {
  constructor(doc) {
    this.oTodo = doc.getElementsByClassName('J_todo')[0]
    this.oInput = this.oTodo.getElementsByClassName('todo-input')[0]
    this.oTodoList = this.oTodo.getElementsByClassName('todo-list')[0]
    this.oLogList = this.oTodo.getElementsByClassName('log-list')[0]

    this.log = []
    this.todo = []
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
    Todo.remove(this.todo, val)
    console.log(this.todo)
    this._handleItem('remove', {
      val,
      iteratorVal: this.iterator.next().value,
      oParent
    })
    console.log(this.log)
  }
  // _handleItem这个函数命名加了_表示这是额外扩展的函数，不过一般都用于私有函数的命名！
  // 总之，这样的函数在最初实现功能的时候是咩有的，或者是这是为了重构代码而存在的函数！咩有这个函数也能实现相应的功能！
  _handleItem(method, options) {
    switch (method) {
      case 'add':
        this.oTodoList.appendChild(this._createItem(options.val))
        this.oLogList.appendChild(this._showLog(options.iteratorVal))
        this.oInput.value = ''
        break;
      case 'remove':
        options.oParent.remove()
        this.oLogList.appendChild(this._showLog(options.iteratorVal))
        break;
      default:
        break;
    }

  }
  addItem() {
    const val = Todo.trimSpace(this.oInput.value)
    M([function (next) {
      if (val.length <= 0 || val.length > 20) {
        alert('字数 1~20 个')
        return false
      }
      next()
    }, (next) => {
      // console.log(this)
      if (this._checkItemExist(val, this.todo) === -1) {
        alert('已存在该项，请不要重复添加！')
        return false
      }
      next()
    }, () => {
      this.addLog(val, 'add')
      this.todo.push(val)
      this._handleItem('add', {
        val,
        iteratorVal: this.iterator.next().value
      })
    }])
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