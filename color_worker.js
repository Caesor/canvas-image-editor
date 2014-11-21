(function() {
    var img = new Image();
    var canvas = document.getElementById("cvs");
    var original = null;
    var current = null;

    var ctx = canvas.getContext("2d");
    var width = 0;
    var height = 0;
    var board = document.getElementById('stage');

    img.src = "9.jpg";

    img.onload = function () {
       var proportion = img.height / img.width;
    	if(img.width > board.scrollWidth){
    		width = document.getElementById("cvs").width = board.scrollWidth;
    		height = document.getElementById("cvs").height = proportion * width;
    	}else{
    		width = document.getElementById("cvs").width = img.width; //Set the size of canvas based on the loading picture
        	height = document.getElementById("cvs").height = img.height;
    	}
        ctx.drawImage(img, 0, 0, width, height);
        current = original = ctx.getImageData(0 ,0, width, height);
    }

    document.getElementById("redChannel").onchange = function () {
        var local = ctx.getImageData(0, 0, width, height);
        var level = this.value / 10;
        for (var i = 0; i < imgData.data.length; i += 4) {
            local.data[i] = current.data[i] + (255 - current.data[i]) * level;
        }
        ctx.putImageData(loca, 0, 0, 0, 0, width, height);
        this.onblur = function(){
            current = loca;
        }
    }

    document.getElementById("greenChannel").onchange = function () {
        var local = canvas.getImageData(0, 0, width, height),
        level = this.value / 10;
        for (var i = 0; i < current.data.length; i += 4) {
            local.data[i + 1] = current.data[i + 1] + (255 - current.data[i + 1]) * level;
        }
        canvas.putImageData(local, 0, 0, 0, 0, width, height);
        this.onblur = function () {
            current = local;
        }
    }

    document.getElementById("blueChannel").onchange = function () {
        var local = canvas.getImageData(0, 0, width, height),
        level = this.value / 10;
        for (var i = 0; i < current.data.length; i += 4) {
            local.data[i + 2] = current.data[i + 2] + (255 - current.data[i + 2]) * level;
        }
        canvas.putImageData(local, 0, 0, 0, 0, width, height);
        this.onblur = function () {
            current = local;
        }
    }

    document.getElementById("brightChannel").onchange = function () {
        var local = canvas.getImageData(0, 0, width, height),
          level = this.value * 25;
        for (var i = 0; i < current.data.length; i += 4) {
            local.data[i] = current.data[i] + level;
            local.data[i + 1] = current.data[i + 1] + level;
            local.data[i + 2] = current.data[i + 2] + level;
        }
        canvas.putImageData(local, 0, 0, 0, 0, width, height);
        this.onblur = function () {
            current = local;
        }
    }

    document.getElementById("greyChannel").onchange = function () {
        var local = canvas.getImageData(0, 0, width, height),
          level = this.value / 10;
        for (var i = 0; i < current.data.length; i += 4) {
            local.data[i] = current.data[i] + (255 - current.data[i]) * level;
            local.data[i + 1] = current.data[i + 1] + (255 - current.data[i + 1]) * level;
            local.data[i + 2] = current.data[i + 2] + (255 - current.data[i + 2]) * level;
        }
        canvas.putImageData(local, 0, 0, 0, 0, width, height);
        this.onblur = function () {
            current = local;
        }
    }
})()

