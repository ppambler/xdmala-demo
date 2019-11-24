export default (target) => {
  target.trimSpace = (value) => {
    return value.replace(/\s+/g, '')
  }
  target.generator = function* (arr) {
    for (let item of arr) {
      yield item
    }
  }
  target.remove = (todo, value) => {
    let index = todo.indexOf(value)
    if (index > -1) {
      todo.splice(index, 1);
    }
  }
  // target.generator = function (arr) {
  //   var i = 0

  //   return {
  //     next: function () {
  //       var done = (i >= arr.length)
  //         , value = !done ? arr[i++] : undefined

  //       return {
  //         value: value,
  //         done: done
  //       }
  //     }
  //   }
  // }
}