function shape(canvas,copy,cobj) {
    this.canvas=canvas;
    this.copy=copy;
    this.cobj=cobj;
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.type="line";
    this.style="stroke";
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.bianNum=5;
    this.jiaoNum=5;
    this.history=[];
    this.isback=true;
    this.xpsize=10;
    this.isshowxp=true;
}
shape.prototype= {
    init:function () {
        this.cobj.type=this.type;
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
    },
    draw:function () {
        var that=this;
        that.copy.onmousedown=function (e) {
            var stratx=e.offsetX;
            var straty=e.offsetY;
            that.copy.onmousemove=function (e) { 
                that.isback=true;
                that.init();
                var endx=e.offsetX;
                var endy=e.offsetY;
              
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0)
                }
                that.cobj.beginPath();
                that[that.type](stratx,straty,endx,endy);
            }
            that.copy.onmouseup=function () {
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    line:function (x,y,x1,y1) {
        var that=this;
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
    },
    rect:function (x,y,x1,y1) {
        var that=this;
        that.cobj.rect(x,y,x1-x,y1-y);
        that.cobj[that.style]();
    },
    arc:function (x,y,x1,y1) {
        var that=this;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        that.cobj.arc(x,y,r,0,2*Math.PI);
        that.cobj[that.style]();
    },
    bian:function (x,y,x1,y1) {
        var angle=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(Math.cos(angle*i)*r+x,Math.sin(angle*i)*r+y);
        }
        this.cobj.stroke();
        this.cobj.closePath();
        this.cobj[this.style]();

    },
    jiao:function (x,y,x1,y1) {
        var angle=360/(this.jiaoNum*2)*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==1){
                this.cobj.lineTo(Math.cos(angle*i)*r+x,Math.sin(angle*i)*r+y);
            }else{
                this.cobj.lineTo(Math.cos(angle*i)*r1+x,Math.sin(angle*i)*r1+y);
            }
        }
        this.cobj.stroke();
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    pen:function () {
        var that = this;
        that.copy.onmousedown = function (e) {
            var stratx = e.offsetX;
            var straty = e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(stratx, straty);
            that.copy.onmousemove = function (e) {
                that.init();
                var endx = e.offsetX;
                var endy = e.offsetY;
                that.cobj.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.cobj.putImageData(that.history[that.history.length - 1], 0, 0)
                }
                that.cobj.lineTo(endx, endy);
                that.cobj.stroke();
            }
            that.copy.onmouseup = function () {
                that.history.push(that.cobj.getImageData(0, 0, that.width, that.height));
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
            }

        }

    },
    xp:function (xpobj) {
       var that=this;
        that.copy.onmousemove=function (e) {
            if(!that.isshowxp){
                return false
            }
            var movex=e.offsetX;
            var movey=e.offsetY;
            var lefts=movex-that.xpsize/2;
            var tops=movey-that.xpsize/2;
            if(lefts<0){
                lefts=0
            }
            if(lefts>that.width-that.xpsize){
                lefts=that.canvas.width-that.xpsize
            }
            if(tops<0){
                tops=0
            }
            if(tops>that.height-that.xpsize){
                tops=that.canvas.height-that.xpsize
            }
            xpobj.css({
                display:"block",
                width:that.xpsize+"px",
                height:that.xpsize+"px",
                left:lefts,
                top:tops
            })
        }
        that.copy.onmousedown=function () {

            that.copy.onmousemove=function (e) {
                var movex=e.offsetX;
                var movey=e.offsetY;
                var lefts=movex-that.xpsize/2;
                var tops=movey-that.xpsize/2;
                if(lefts<0){
                    lefts=0
                }
                if(lefts>that.width-that.xpsize){
                    lefts=that.canvas.width-that.xpsize
                }
                if(tops<0){
                    tops=0
                }
                if(tops>that.height-that.xpsize){
                    tops=that.canvas.height-that.xpsize
                }
                xpobj.css({
                    display:"block",
                    width:that.xpsize+"px",
                    height:that.xpsize+"px",
                    left:lefts,
                    top:tops
                })
                that.cobj.clearRect(movex,movey,that.xpsize,that.xpsize)
            }
            that.copy.onmouseup=function () {

                that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.xp(xpobj);
            }
        }
    },
    blur:function (dataobj,num,x,y) {
            var arr=[];
            var widths=dataobj.width;
            var heights=dataobj.height;
            for(var i=0;i< heights;i++){
                for(var j=0;j<widths;j++){
                    var y1=i+num>heights?i-num:i;
                    var x1=j+num>heights?j-num:j;
                    var dataObj=this.cobj.getImageData(x1,y1,num,num);
                    var r=0;var g=0;var b=0;
                    for(var k=0;k<dataObj.width*dataObj.height;k++){
                        r+=dataObj.data[k*4+0];
                        g+=dataObj.data[k*4+1];
                        b+=dataObj.data[k*4+2];
                    }
                    r=parseInt(r/(dataObj.width*dataObj.height));
                    g=parseInt(g/(dataObj.width*dataObj.height));
                    b=parseInt(b/(dataObj.width*dataObj.height));
                    arr.push(r,g,b,255);
                }
            }
            for(var i=0;i<dataobj.data.length;i++){
                dataobj.data[i]=arr[i];
            }
            this.cobj.putImageData(dataobj,x,y);
    },
    fx:function (dataobj,x,y) {
    for(var i=0;i<dataobj.width*dataobj.height;i++){
        dataobj.data[i*4+0]=255-dataobj.data[i*4+0];
        dataobj.data[i*4+1]=255-dataobj.data[i*4+1];
        dataobj.data[i*4+2]=255-dataobj.data[i*4+2];
        dataobj.data[i*4+3]=255;
    }
        this.cobj.putImageData(dataobj,x ,y)
},
    m:function(dataobj,num,x,y) {
    var width=dataobj.width,height=dataobj.height;
    var num=num;
    var w=width/num;
    var h=height/num;
    var r=0,g=0,b=0;
    for(var i=0;i<num;i++){//行
        for(var j=0;j<num;j++){//列
            var dataobj=this.cobj.getImageData(j*w,i*h,w,h)
            for(var k=0;k<dataobj.width*dataobj.height;k++){
                r+=dataobj.data[k*4+0];
                g+=dataobj.data[k*4+1];
                b+=dataobj.data[k*4+2];
            }
            r=parseInt(r/(dataobj.width*dataobj.height));
            g=parseInt(g/(dataobj.width*dataobj.height));
            b=parseInt(b/(dataobj.width*dataobj.height));
            for(var k=0;k<dataobj.width*dataobj.height;k++){
                dataobj.data[k*4+0]=r;
                dataobj.data[k*4+1]=g;
                dataobj.data[k*4+2]=b;
            }
            this.cobj.putImageData(dataobj,x+j*w,y+i*h)
        }
    }
}
}