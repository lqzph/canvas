function shape(canvas,cobj) {
    this.canvas=canvas;
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
        that.canvas.onmousedown=function (e) {
            var stratx=e.offsetX;
            var straty=e.offsetY;
            that.canvas.onmousemove=function (e) {
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
            that.canvas.onmouseup=function () {
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
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
        that.canvas.onmousedown = function (e) {
            var stratx = e.offsetX;
            var straty = e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(stratx, straty);
            that.canvas.onmousemove = function (e) {
                that.init();
                var endx = e.offsetX;
                var endy = e.offsetY;
                that.cobj.clearRect(0, 0, that.width, that.height);
                if (that.history.length > 0) {
                    that.cobj.putImageData(that.history[that.history.length - 1], 0, 0)
                }
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke();
            }
            that.canvas.onmouseup = function () {
                 that.history.push(that.cobj.getImageData(0, 0, that.width, that.height));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }

        }

    }
}