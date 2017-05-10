


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
    
 }, false);