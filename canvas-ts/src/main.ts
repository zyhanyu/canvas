const el = document.querySelector<HTMLCanvasElement>('#canvas')!

const app =  el.getContext('2d')!

/* 填充
app.fillStyle = 'pink'
app.fillRect(0, 0, 300, 300)

app.fillStyle = '#16a085'
app.fillRect(el.width/2 - 50, el.height/2 - 50, 100, 100)
*/

/* 矩形
app.strokeStyle = '#8e44ad'
app.lineWidth = 30
app.lineJoin = 'round'
app.strokeRect(50, 50, 200, 200)
*/

/* 正圆
app.strokeStyle = '#8e44ad'
app.lineWidth = 30
app.arc(100,100,50,0,2*Math.PI)
app.stroke()
*/

/* 
app.beginPath()

app.moveTo(el.width/2,10)
app.lineTo(el.width - 10  ,150)
app.fillStyle = 'pink' // 填充样式
app.lineTo(10,150)
app.closePath() // 连接
app.strokeStyle = '#8e44ad'
app.lineWidth = 30
app.fill() // 填充
// app.stroke() // 描边
*/

/* 渐变
const gradient = app.createLinearGradient(0, 0, 300,300)
gradient.addColorStop(0,'#16a085')
gradient.addColorStop(0.5,'#e67e22')
gradient.addColorStop(1,'#9ba232')

app.fillStyle = gradient
app.fillRect(0,0,300,300)
*/

/*  文字填充
app.fillStyle = '#34495a'
app.fillRect(0,0,el.width,el.height)
app.font = '50px SourceHanSansSC-Normal'
app.fillStyle = 'white'
app.textBaseline = 'top' // 基线 top middle bottom
app.fillText('hanyu',50,0)
*/


/*  文字描边
app.fillStyle = '#34495a'
app.fillRect(0,0,el.width,el.height)
app.font = '50px SourceHanSansSC-Normal'
app.strokeStyle = 'white'
app.lineWidth = 2
app.textBaseline = 'top' // 基线 top middle bottom
app.strokeText('hanyu',50,0)
*/

/*  贴图
const img = document.createElement('img')
img.src = './images/头像.jpg'
img.onload = () => {
  // document.body.insertAdjacentElement('afterbegin',img)
  const pattern =  app.createPattern(img,'no-repeat')!
  app.fillStyle = pattern
  app.fillRect(0,0,300,300)
}
*/

/* 等比例贴图
app.fillStyle= 'pink'
app.fillRect(0,0,el.width,el.height)

const img = document.createElement('img')
img.src = './images/头像.jpg'
img.onload = () => {
  el.width =  img.naturalWidth * scale(img,el)
  el.height =  img.naturalHeight * scale(img,el)
  app.drawImage(img,0,0,el.width,el.height)
  // app.drawImage(img,20, 50,100,100)
}

function scale(img:HTMLImageElement,el:HTMLCanvasElement){
  return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight)
}
*/

/* 随机填充
app.fillStyle= 'pink'
app.fillRect(0,0,300,300)

for(let i = 0;i<1000;i++){
  app.fillStyle = 'white'
  app.fillRect(Math.random()*el.width,Math.random()*el.height,2,2)
}
*/

/* 随机园
app.fillStyle= '#000'
app.fillRect(0,0,300,300)

for(let i = 0;i<20;i++){
  app.beginPath()
  app.fillStyle = ['#1abc9c','#27ae60',"#2980b9","#9e33ad","#e67e22"].sort(()=>(Math.floor(Math.random() *3) ? 1: -1))[0]

  app.arc(Math.random()*(el.width/2),Math.random()*(el.height/2),20+Math.random()*50,0,2*Math.PI)
  app.fill()
}
*/

// ---------------------黑板--------------------------

import './css.css'

class Blackboard {
  constructor(
    private el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    private app = el.getContext('2d')!,
    private height:number=el.height,
    private width:number=el.width,
    private btns:HTMLDivElement = document.createElement('div'),
    private bgColor = '#000',
    private lineColor = '#fff'
  ){
    this.initCanvas()
    this.bindEvent()
  }
  private bindEvent(){
    const callback = this.drawLine.bind(this)
    this.el.addEventListener('mousedown',()=>{
      this.app.beginPath()
      this.app.strokeStyle = this.lineColor
      this.el.addEventListener('mousemove',callback)
    })

    document.addEventListener('mouseup',()=>{
      this.el.removeEventListener('mousemove',callback)
    })
  }

  private drawLine(event:MouseEvent){
    this.app.lineTo(event.offsetX,event.offsetY)
    this.app.stroke()
  }

  private initCanvas (){
    this.app.fillStyle = this.bgColor
    this.app.fillRect(0,0,this.width,this.height)
    // this.btns.style.cssText="margin-top:10px"
    this.btns.classList.add('btns')
    this.el.insertAdjacentElement('afterend', this.btns)
  }

  public setBgColor(color:string){
    this.bgColor = color
    this.app.fillStyle = color
    this.app.fillRect(0,0,this.el.width,this.el.height)
    return this
  }

  public clear(){
    const el = document.createElement('button')
    el.innerText = "清屏"
    this.btns.insertAdjacentElement('afterbegin',el)

    el.addEventListener('click',()=>{
      this.app.fillStyle = this.bgColor
      this.app.fillRect(0,0,this.el.width,this.el.height)
    })
    return this
  }

  public setLineColor (){
    const colors = ['#1abc9c','#f1c40f','#9b59b6','#ecf5f1']
    const container = document.createElement('div')
    container.classList.add('color-container')
    colors.forEach(color=>{
      const div = document.createElement('div')
      div.style.cssText = `width:20px;height:20px;background:${color}`
      container.insertAdjacentElement('afterbegin',div)

      div.addEventListener('click',()=>(this.lineColor = color))
    })
    this.btns.insertAdjacentElement('beforeend',container)

    return this
  }

  public erase(){
    const el = document.createElement('button')
    el.innerText = "橡皮擦"
    this.btns.insertAdjacentElement('afterbegin',el)

    el.addEventListener('click',()=>{
      this.lineColor = this.bgColor
      this.app.lineWidth = 10
    })
    return this
  }

  public draw(){
    const el = document.createElement('button')
    el.innerText = "写字"
    this.btns.insertAdjacentElement('afterbegin',el)

    el.addEventListener('click',()=>{
      this.lineColor = '#fff'
      this.app.lineWidth = 1
    })
    return this
  }

  public short(){
    const el = document.createElement('button')
    el.innerText = "截图"
    this.btns.insertAdjacentElement('afterbegin',el)
    const img = document.createElement('img')
    el.addEventListener('click',()=>{
      img.src  = this.el.toDataURL('image/jpeg')
      img.classList.add('img-sort')
    })
    this.btns.insertAdjacentElement('afterend',img)
    return this
  }
}

const instance = new Blackboard()

instance.clear().setBgColor('#16a085').setLineColor().erase().draw().short()

// git push https://gethub.com/culverthanyu/canvas.git main



export{

}