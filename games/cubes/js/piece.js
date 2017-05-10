var sqareSize=35.0;
function Piece(obj,n)
{
    
    var elpc = document.createElement('div');
    elpc.className='piece-container';
    elpc.id='piece'+n;
    
    this.form=obj;
    this.stable={left:0,top:0,div:null}
    if((typeof n)=="string")
    {
        elpc.style.backgroundImage="url('images/"+n+".png')";
        elpc.style.height=obj.length*sqareSize+"px";
        elpc.style.width=obj[0].length*sqareSize+"px";
    }
    else{
    for(var i=0;i<obj.length;i++)
        {
            var row=obj[i];
            for(var j=0;j<row.length;j++)
            {
                if(row[j]==1){
                    ell = document.createElement('div');
                    ell.className=n%2==0?'colored':'coloreda';
                    ell.style.marginLeft=2.5+j*sqareSize+'px';
                    ell.style.marginTop=2.5+i*sqareSize+'px';
                    elpc.appendChild(ell);
                }
            }
    }
    }
    this.div=elpc;
};
Piece.prototype.restore=function(x,y)
{
    if(this.div.parentNode)
        this.div.parentNode.removeChild(this.div);
    this.stable.div.appendChild(this.div);
    this.div.style.marginLeft=this.stable.left+'px';
    this.div.style.marginTop=this.stable.top+'px';
}
Piece.prototype.isOver=function (x,y) {
    var rect=this.div.getBoundingClientRect();
    var rx=int((x-rect.left)/sqareSize);
    var ry=int((y-rect.top)/sqareSize);
    if(rx<0||ry<0)return false;
    if(ry<this.form.length)
        if(rx<this.form[ry].length)
            if(this.form[ry][rx]==1)
                return true;
    return false;
}

