var Tab = function (mode) {
  // 如果用户传了'xxx',那么默认是就是「fade」
  this.mode = mode == 'fade' || mode == 'slide' ? mode : 'fade'

  this.oPage = $('.J_page')
  this.oTab = $('.J_tab')
  // 只找儿子的所有匹配到的元素
  this.oPageWrap = this.oPage.children('.page-wrap')
  // 儿子、后代也要找
  this.oPageItems = this.oPage.find('.item')
  this.init()
}

Tab.prototype.init = function () {
  this.setMode()
  this.bindEvent()
}

Tab.prototype.setMode = function () {
  this.oPageWrap.addClass(this.mode)
}

Tab.prototype.bindEvent = function () {
  console.log($('.J_tab'))
  this.oTab.on('click', '.item', $.proxy(this.tabClick, this))
}

Tab.prototype.tabClick = function (e) {
  var e = e || window.event,
    tar = e.target || e.srcElement,
    curIdx = $(tar).index() //index()这个API拿到的是相对于兄弟元素里边的第一个元素的位置，即0,1、2,3这样
  console.log(tar, $(tar), curIdx)
  // console.log($(this).addClass('current').siblings('.item'))
  // console.log($(this).addClass('current').siblings('.item').prevObject) //拿到当前点击的那个jQuery DOM对象
  // console.log($(this))
  // console.log(tar)
  // console.log(tar.className)
  // console.log(tar.className === 'item')
  // 这个判断鸡贼，如果DOM元素是这样的 ：<div class="item ">选项2</div>，即class里边多了空格，那么判断是不通过
  // 即tar.className的值是「item 」(有空格的item)
  // 反之，如果是这样的：<div class="item">选项2</div>，那么则是通过的！
  // 即tar.className的值是「item」(没有空格的item)
  // 或许空格也是一个字符吧！所以在写HTML的时候，class属性值不要有多余的空格！当然，写多个class除外！
  if (tar.className === 'item') {
    $(tar).addClass('current').siblings('.item').removeClass('current')
    // 为啥要指定this？——因为我们需要用到Tab的_pageChange方法
    this._pageChange(curIdx)
  }
  // console.log(this)
}

Tab.prototype._pageChange = function (index) {
  switch (this.mode) {
    case 'fade':
      this._fadePage(index)
      break;
    case 'slide':
      this._slidePage(index)
      break;
    default:
      this._fadePage(index)
      break
  }
}

Tab.prototype._fadePage = function (index) {
  this.oPageItems.eq(index).fadeIn(100).siblings('.item').fadeOut(100)
}


// oPageWrap：用于整体定义它的left值。关于动画，原本是用translate 3D的！

Tab.prototype._slidePage = function (index) {
  console.log(index)
  this.oPageWrap.animate({
    left: (-index * 500) + 'px'
  })
}

// 除此之外你可能还会有更多的模式，如动画翻页模式哈！

var xxx = new Tab('fade')