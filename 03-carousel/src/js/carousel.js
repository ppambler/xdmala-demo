class Carousel {
  constructor($, options) {
    this.$dom = $(options.dom)
    // 尽量不要用类名，因为这是一个插件，那么你用其它标签同样也是可以的
    this.oCarItems = this.$dom.find('li')
    this.oIndicators = this.$dom.find('i')
    this.speed = options.speed
    this.timer = null
    this.curIdx = 0
    this.init()
  }

  init() {
    this.autoPlay()
    this.bindEvent()
  }
  bindEvent() {
    // .on( events [, selector ] [, data ], handler(eventObject) )
    // 第二个参数是个子节点，如果不写，那么你在这里传个对象，那么这个数据就会交给事件处理函数的event.data
    this.$dom.on('mouseover', { event: 'in' }, $.proxy(this.mouseInOut, this))
    this.$dom.on('mouseout', { event: 'out' }, $.proxy(this.mouseInOut, this))
    this.$dom.on('click', $.proxy(this.carClick, this))
  }
  autoPlay() {
    // console.log($) //把全局的$变成Carousel实例的$属性是否会比较好点呢？或者我可以用bind哈！
    this.timer = setInterval($.proxy(this.run, this), this.speed)
    //this.timer = setInterval(this.run.bind(this), this.speed)

  }
  run() {
    // 自动轮播，显然是下一张图片，而不是上一张
    this._setIndex('next')
    this._pageChange(this.curIdx)
  }
  mouseInOut(e) {
    // console.log(e)
    var event = e.data.event
    switch (event) {
      case 'in':
        clearInterval(this.timer)
        break;
      case 'out':
        this.autoPlay()
        break;
      default:
        break;
    }
  }
  carClick(ev) {
    // const声明的变量不能与形参变量一致，因此这也是为啥用ev作为形参变量名的缘故
    const e = ev || window.event,
      tar = e.target || e.srcElement,
      tagName = tar.tagName.toLowerCase()

    if (tagName === 'button') {
      console.dir(tar)
      const dir = tar.dataset.dir
      // tar.getAttribute('data-dir') //如果dataset兼容性不好，那么就用这个呗！
      this._setIndex(dir)
      this._pageChange(this.curIdx)
    } else if (tagName === 'i') {
      // console.log($(tar).index()) //0~7,有8张图片哈！
      this.curIdx = $(tar).index() //get：用户点击的哪个小点
      this._pageChange(this.curIdx)
    }

  }
  _setIndex(dir) {
    // 如果你有用if……else的代码洁癖，那么这也是可以用的！不过一般这种洁癖都是咩有必要的，是一种坏习惯哈！
    switch (dir) {
      case 'next':
        this.curIdx === (this.oCarItems.length - 1)
          ? this.curIdx = 0
          : this.curIdx++
        break;
      case 'prev':
        this.curIdx === 0
          ? this.curIdx = (this.oCarItems.length - 1)
          : this.curIdx--
        break;
      // 即便default在这里咩有用也要写上，毕竟这并不会少一斤肉哈！而这样做是一种好的习惯哈！
      default:
        break;
    }
  }

  _pageChange(index) {
    this.oCarItems.eq(index).addClass('active')
      .siblings('li').removeClass('active')
    this.oIndicators.eq(index).addClass('active')
      .siblings('i').removeClass('active')
  }
}

export { Carousel } 