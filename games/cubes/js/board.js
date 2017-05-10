var sqareSize=35.0;
function Board(form,full)
{
    
    var board=document.createElement('div');
    this.form=form;
    this.pieces=[];
    board.className='board';
    board.style.height=(form.length*sqareSize+5)+'px';
    board.style.width=(form[0].length*sqareSize+5)+'px';
    
    if((typeof full)=="string")
    {
        board.style.backgroundImage="url('images/"+full+"n.png')";
        board.style.height=form.length*sqareSize+"px";
        board.style.width=form[0].length*sqareSize+"px";
    }
    else{
        board.style.marginTop=(160-(form.length*35)/2)+"px";
        for(var i=0;i<form.length;i++)
            {
                var row=form[i];
                for(var j=0;j<row.length;j++)
                {
                    if(row[j]==1){
                        var el = document.createElement('div');
                        el.className='empty';
                        el.style.marginLeft=2+j*sqareSize+'px';
                        el.style.marginTop=2+i*sqareSize+'px';
                        board.appendChild(el);
                    }
                }
        }
    }
    this.div=board;
};
Board.prototype.testPos=function(x,y,piece)
{
    if(x<0||y<0)return false;
    var form=this.form;
    var inform=piece.form
    for(var i=0;i<inform.length;i++)
    {
        if(i+y>=form.length)
            return false
        var inrow=inform[i];
        var row=form[i+y];
        for(var j=0;j<inrow.length;j++)
        {
            if(j+x>=row.length)
                return false;
            if(row[j+x]==0&&inrow[j]==1)
                return false;
            //if(row[j+x]==1&&inrow[j]==0)
            //    return false;
            if(!this.avelable(j+x,i+y,piece)&&inrow[j]==1)
                return false;
        }
    }
    return true;
}
Board.prototype.setPos=function(x,y,piece)
{

    this.pieces.push({x:x,y:y,p:piece});
    piece.div.style.marginLeft=x*sqareSize+'px';
    piece.div.style.marginTop=y*sqareSize+'px';
    //piece.stable={left:x*sqareSize,top:y*sqareSize,div:this.div};
    return true;
}
Board.prototype.remove=function(piece){
        this.pieces=this.pieces.filter(function (params) {
       return params.p!=piece;
    });
};
Board.prototype.avelable=function(x,y,inpiece)
{
    var pieces=this.pieces;
    for(var i=0;i<pieces.length;i++)
    {
        var piece=pieces[i];
        if(inpiece==piece.p) continue;
        if(y-piece.y>=0&&y-piece.y<piece.p.form.length&&x-piece.x>=0&&x-piece.x<piece.p.form[y-piece.y].length)
        {
            if(piece.p.form[y-piece.y][x-piece.x]==1)
                    return false;
        }
    }
    return true;
}
Board.prototype.complete=function () {
     var form=this.form;
     var ret=true;
     var test=[];
     for(var i=0;i<form.length;i++){
         var row=form[i];
         var testr=[];
        for(j=0;j<row.length;j++)
            if(row[j]==1&&this.avelable(j,i))
            {
                 ret=false;
                 testr.push(1);
            }
            else  testr.push(0);
        test.push(testr);
    }
    console.log(test);
    return ret;
}
