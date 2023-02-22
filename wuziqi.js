let arr = [      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},],
]
//封装渲染函数
const render = () => {
document.querySelector('table').innerHTML = ''
arr.forEach((item, index) => {
  let tr = document.createElement('tr')
  item.forEach((item2, index2) => {
    let td = document.createElement('td')//遍历数组，绘制棋盘
    //给td标签设置自定义属性，用来作为坐标使用
    td.dataset.y = index
    td.dataset.x = index2
    tr.appendChild(td)
    //给数组里面的对象做条件判断，这样就能渲染出颜色
    if (item2.num === 1) {
      td.classList.add('bgc1')
    }
    else if (item2.num === 2) {
      td.classList.add('bgc2')
    }
  })
  document.querySelector('table').appendChild(tr)
})
}
render()

//判断下棋顺序的全局变量
let flag = true
//所有黑棋数组
let blackArr = []
//所有白棋数组
let whiteArr = []
//轮流下棋逻辑
document.querySelector('table').addEventListener('click', function (e) {
  if (e.target.dataset.x) {
    let td = e.target
    //判断黑白棋子的顺序
    if (flag) {
      //判断点击的地方是否已经有棋子了，避免棋子覆盖
      if (!arr[td.dataset.y][td.dataset.x].num) {
        flag = !flag
        arr[td.dataset.y][td.dataset.x].num = 1
        //每走一步，就将其添加至对应的数组当中
        blackArr.push([td.dataset.y, td.dataset.x])            
      }
    } else {
      if (!arr[td.dataset.y][td.dataset.x].num) {
        flag = !flag
        arr[td.dataset.y][td.dataset.x].num = 2
        whiteArr.push([td.dataset.y, td.dataset.x])
      }
    }
    //调用判断胜负的函数
    XWin(td)
    YWin(td)
    X_YWin(td)
    Y_XWin(td)
  }
  render()
})

//横轴获胜逻辑
function XWin(td) {
  //当前X轴的所有棋子集合
  let xAllArr = []
  //判断横轴胜负逻辑的X轴棋子
  let xWinArr = []
  //判断下的是黑棋还是白棋
  if (!flag) {
    blackArr.map(item => {
      if (item[0] == td.dataset.y) {
        //将当前排的所有棋子加入对应数组
        xAllArr.push(item[1])
      }
    })
  } else {
    whiteArr.map(item => {
      if (item[0] == td.dataset.y) {
        xAllArr.push(item[1])
      }
    })
  }
  //把横排总数组排序，方便比较
  xAllArr.sort((a, b) => a - b)
  for (let i = 1; i < xAllArr.length; i++) {
    // console.log(xAllArr[i]);
    if (xAllArr[i] == (+xAllArr[i - 1] + 1)) {
      //如果相邻的两个棋子数量相差1，就将其添加至胜负逻辑数组
      xWinArr.push(xAllArr[i])
    } else {
      //如果数组长度大于4，就跳出循环
      if (xWinArr.length >= 4) break
      //否则得清空
      xWinArr = []
    }
  }
  //获胜条件
  if (xWinArr.length >= 4) {
    //这里要用定时器将弹框变成异步任务，否则第五颗棋子渲染不出来就提示获胜了
    if (!flag) {
      setTimeout(function () {
        alert('黑棋获胜!')
        location.reload()
      }, 100)
    } else {
      setTimeout(function () {
        alert('白棋获胜!')
        location.reload()
      }, 100)
    }
  }
}

//竖轴获胜逻辑
function YWin(td) {
  //当前Y轴的所有棋子集合
  let yAllArr = []
  //判断竖轴胜负逻辑的X轴棋子
  let yWinArr = []
  if (!flag) {
    blackArr.map(item => {
      if (item[1] == td.dataset.x) {
        yAllArr.push(item[0])
      }
    })
  } else {
    whiteArr.map(item => {
      if (item[1] == td.dataset.x) {
        yAllArr.push(item[0])
      }
    })
  }
  //竖排总数组排序
  yAllArr.sort((a, b) => a - b)
  for (let i = 1; i < yAllArr.length; i++) {
    // console.log(xAllArr[i]);
    if (yAllArr[i] == (+yAllArr[i - 1] + 1)) {
      yWinArr.push(yAllArr[i])
    } else {
    //如果数组长度大于4，就跳出循环
      if (yWinArr.length >= 4) break
      yWinArr = []
    }
  }
  if (yWinArr.length >= 4) {
    if (!flag) {
      setTimeout(function () {
        alert('黑棋获胜!')
        location.reload()
      }, 100)
    } else {
      setTimeout(function () {
        alert('白棋获胜!')
        location.reload()
      }, 100)
    }
  }
}

//正斜轴获胜逻辑
function X_YWin(td) {
  //当前X轴的所有棋子集合
  let x_yAllArr = []
  //判断横轴胜负逻辑的X轴棋子
  let x_yWinArr = []
  if (!flag) {
    blackArr.map(item => {
      //判断斜轴棋子，斜轴棋子的x和y之差都是相同的
      if ((item[0] - td.dataset.y) == (item[1] - td.dataset.x)) {
        x_yAllArr.push(item[1])
      }
    })
  } else {
    whiteArr.map(item => {
      if ((item[0] - td.dataset.y) == (item[1] - td.dataset.x)) {
        x_yAllArr.push(item[1])
      }
    })
  }
  x_yAllArr.sort((a, b) => a - b)
  for (let i = 1; i < x_yAllArr.length; i++) {
    if (x_yAllArr[i] == (+x_yAllArr[i - 1] + 1)) {
      //如果相邻的两个棋子数量相差1，就将其添加至胜负逻辑数组
      x_yWinArr.push(x_yAllArr[i])
    } else {
      //如果数组长度大于4，就跳出循环
      if (x_yWinArr.length >= 4) break
      //否则得清空
      x_yWinArr = []
    }
  }
  //获胜条件
  if (x_yWinArr.length >= 4) {
    if (!flag) {
      setTimeout(function () {
        alert('黑棋获胜!')
        location.reload()
      }, 100)
    } else {
      setTimeout(function () {
        alert('白棋获胜!')
        location.reload()
      }, 100)
    }
  }
}

 //反斜轴获胜逻辑
 function Y_XWin(td) {
  //当前X轴的所有棋子集合
  let y_xAllArr = []
  //判断横轴胜负逻辑的X轴棋子
  let y_xWinArr = []
  if (!flag) {
    blackArr.map(item => {
      //判断斜轴棋子
      if (0 - (item[0] - td.dataset.y) == (item[1] - td.dataset.x)) {
        y_xAllArr.push(item[1])
      }
    })
  } else {
    whiteArr.map(item => {
      if (0 - (item[0] - td.dataset.y) == (item[1] - td.dataset.x)) {
        y_xAllArr.push(item[1])
      }
    })
  }
  y_xAllArr.sort((a, b) => a - b)
  for (let i = 1; i < y_xAllArr.length; i++) {
    if (y_xAllArr[i] == (+y_xAllArr[i - 1] + 1)) {
      //如果相邻的两个棋子数量相差1，就将其添加至胜负逻辑数组
      y_xWinArr.push(y_xAllArr[i])
    } else {
      //如果数组长度大于4，就跳出循环
      if (y_xWinArr.length >= 4) break
      //否则得清空
      y_xWinArr = []
    }
  }
  //获胜条件
  if (y_xWinArr.length >= 4) {
    if (!flag) {
      setTimeout(function () {
        alert('黑棋获胜!')
        location.reload()
      }, 100)
    } else {
      setTimeout(function () {
        alert('白棋获胜!')
        location.reload()
      }, 100)
    }
  }
}

 //悔棋
 document.querySelector('button').addEventListener('click', function () {
  //判断前面一步是黑棋还是白棋
  if (!flag) {
    //黑棋
    //获取对应棋子总数组的最后一个数据的值
    const y = blackArr[blackArr.length - 1][0]
    const x = blackArr[blackArr.length - 1][1]
    //将对应的对象里的num值删除，这样渲染出来对应棋子就消失了
    delete arr[y][x].num
    //删除总数组里的最后一个数据，否则胜负逻辑会有问题
    blackArr.splice(blackArr.length - 1, 1)
    //重置下棋顺序
    flag = !flag
  } else {
    //白棋
    const y = whiteArr[whiteArr.length - 1][0]
    const x = whiteArr[whiteArr.length - 1][1]
    delete arr[y][x].num
    whiteArr.splice(whiteArr.length - 1, 1)
    flag = !flag
  }
  render()
})