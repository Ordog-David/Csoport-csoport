let canvas = document.getElementById("canvas")
canvasWidth = canvas.width
canvasHeight = canvas.height
let context = canvas.getContext("2d")
let UpDown = false
let DownDown = false
let LeftDown = false
let RightDown = false
let i = 16
let ii = 16
let x = 100
let y = 100
let maxVelocity = 7
let xVelocity = 0
let yVelocity = 0
let acceleration = 1
let deceleration = 0.6
let images = [0,0,0]
images[0] = document.getElementById("img1")
images[1] = document.getElementById("img2")
images[2] = document.getElementById("img3")
class vector {
    constructor(x1,y1,x2,y2) {
        this.xStart = x1
        this.yStart = y1
        this.xEnd = x2
        this.yEnd = y2
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    let cursorX = event.clientX - rect.left
    let cursorY = event.clientY - rect.top
    cursorY = -(cursorY-canvasHeight)
    return (cursorX, cursorY)
    //console.log("x: " + cursorX + " y: " + cursorY)
}
const kanvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(kanvas, e)
    if (cursorX > x && cursorY > y) {console.log("Siker")}
})
function distance(x1,y1,x2,y2) {
    return Math.sqrt((Math.abs(x1 - x2) * Math.abs(x1 - x2) + (Math.abs(y1 - y2) * Math.abs(y1 - y2))))
}
function addVector(vector1,vector2) {
    vector1.xEnd += vector2.xEnd - vector2.xStart
    vector1.yEnd += vector2.yEnd - vector2.yStart
}

function drawImage(image, x, y, scale, rotation){
    context.setTransform(scale, 0, 0, scale, x, -y+canvasHeight);
    context.rotate(rotation);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    context.resetTransform()
}

function drawRect(x,y,width,height,color) {
    context.setTransform(1, 0, 0, 1, x, -y+canvasHeight)
    context.fillStyle = color
    context.fillRect(-width/2,-height/2,width,height)
    context.resetTransform()
}
function drawText(x,y,text,font,fontSize,centeredness,color) {
    context.setTransform(1, 0, 0, 1, x, -y+canvasHeight)
    context.font = fontSize+"px "+font
    context.fillStyle = color
    if (centeredness) {context.textAlign = "center"; context.fillText(text,0,0)}
    else {context.textAlign = center; context.fillText(text,0,0)}
    context.resetTransform()
}
window.onload = function()  {
    context.imageSmoothingEnabled = false
    start()
}
function keyDown(key) {
    switch(key.key) {
        case "ArrowUp" : UpDown = true; break
        case "ArrowDown" : DownDown = true; break
        case "ArrowLeft" : LeftDown = true; break
        case "ArrowRight" : RightDown = true; break
    }
}
function keyUp(key) {
    switch(key.key) {
        case "ArrowUp" : UpDown = false; break
        case "ArrowDown" : DownDown = false; break
        case "ArrowLeft" : LeftDown = false; break
        case "ArrowRight" : RightDown = false; break
    }
}
function start() {
    setInterval( function() {
        i = 16
        ii = 16
        drawRect(canvasWidth/2,canvasHeight/2,canvasWidth,canvasHeight,"aqua")
        while (i < canvasHeight+32) {
            while (ii < canvasWidth+32) {
                drawImage(images[Math.floor(Math.random()*3)],ii,i,2,0)
                ii += 32
            }
            ii = 16
            i += 32
        }
        if (UpDown) {
            yVelocity += acceleration
        }
        if (DownDown) {
            yVelocity -= acceleration
        }
        if (RightDown) {
            xVelocity += acceleration
        }
        if (LeftDown) {
            xVelocity -= acceleration
        }
        if (UpDown == false && DownDown == false) {
            if (yVelocity >= 0) {
                yVelocity -= deceleration
                if (yVelocity <= 0) {yVelocity = 0}
            }
            else {
                yVelocity += deceleration
                if (yVelocity >= 0) {yVelocity = 0}
            }
        }
        if (RightDown == false && LeftDown == false) {
            if (xVelocity >= 0) {
                xVelocity -= deceleration
                if (xVelocity <= 0) {xVelocity = 0}
            }
            else {
                xVelocity += deceleration
                if (xVelocity >= 0) {xVelocity = 0}
            }
        }
        if (Math.abs(xVelocity) >= maxVelocity) {
            if (xVelocity >= 0) {xVelocity = maxVelocity}
            else {xVelocity = -maxVelocity}
        }
        if (Math.abs(yVelocity) >= maxVelocity) {
            if (yVelocity >= 0) {yVelocity = maxVelocity}
            else {yVelocity = -maxVelocity}
        }
        if (Math.abs(yVelocity) >= maxVelocity+0.01 || Math.abs(xVelocity) >= maxVelocity+0.01) {
           temp1 = xVelocity
           temp2 = yVelocity
           if (xVelocity >= 0) {xVelocity = (Math.abs(temp1)+Math.abs(temp2))/2}
           else {xVelocity = -(Math.abs(temp1)+Math.abs(temp2)/2)}
           if (yVelocity >= 0) {yVelocity = (Math.abs(temp1)+Math.abs(temp2))/2}
           else {yVelocity = -(Math.abs(temp1)+Math.abs(temp2)/2)}
        }
        x += xVelocity
        y += yVelocity
        drawRect(x,y,40,40,"red")
    },20)
}
