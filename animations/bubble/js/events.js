


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

canvas.addEventListener('mousemove', function(evt) {
    var  M  = getMousePos(canvas, evt);
    Mouse.x = M.x;
    Mouse.y = M.y;
    
    
    
    
    
 }, false);

canvas.addEventListener('mouseup', function(evt) {
    var  M  = getMousePos(canvas, evt);
    Mouse.clickx = M.x;
    Mouse.clicky = M.y;
    
    console.log(Mouse);
    
    var tanYbyX = (Target.y - M.y)/(Target.x - M.x);
    Mouse.yByx = tanYbyX;
    Mouse.angle = Math.atan(tanYbyX) * 180 / Math.PI;
    
    
    
    Bullet.x = Target.x;
    Bullet.y = Target.y;
    Bullet.color = "red";
    Incrementer = 0;
    
    console.log(Mouse.angle);
 }, false);