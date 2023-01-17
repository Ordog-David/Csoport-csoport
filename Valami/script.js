let canvas = document.getElementById("canvas")
canvasWidth = canvas.width
canvasHeight = canvas.height
let context = canvas.getContext("2d")
let img = document.getElementById("sus")
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
                drawImage(img,ii,i,2,0)
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
        x += xVelocity
        y += yVelocity
        drawRect(x,y,50,50,"red")
    },20)
}