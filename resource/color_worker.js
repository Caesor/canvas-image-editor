(function() {
    //strench the background of content
	$(".content").height($(window).height() - $("nav").height());

    //Control menu accordion style
    $("#control h3").click(function(){
        $(this).next("ul").slideToggle();
        if($(this).attr('state') == 0){
            $(this).attr("state",1);
            $(this).children('i').removeClass("fa-plus").addClass('fa-minus');    
        }else{
            $(this).attr("state",0);
            $(this).children('i').removeClass("fa-minus").addClass('fa-plus');
        }
        
    })
    var img = new Image();
    var canvas = document.getElementById("cvs");
    var original = null;
    var current = null;

    var ctx = canvas.getContext("2d");
    var width = 0;
    var height = 0;
    var board = document.getElementById('stage');

    img.src = "img/9.jpg";

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

    //load image
    var input = document.getElementById('open_file');
    if(typeof FileReader === 'undefined'){
        input.setAttribute('disabled','disabled');
    }else{
        input.addEventListener('change',readFile, false);
    }
    function readFile(){
        var file = this.files[0];
        if(!/image\/\w+/.test(file.type)){
            alert("Only Image File");            
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            ctx.clearRect(0,0,width, height);
            img.src = this.result;
            img.onload();
        }
    }
    document.getElementById("open_file_btn").onclick = function(){
    	document.getElementById('open_file').click();
    }
    document.getElementById("redChannel").onchange = function () {
        var local = ctx.getImageData(0, 0, width, height);
        var level = this.value / 10;
        for (var i = 0; i < local.data.length; i += 4) {
            local.data[i] = current.data[i] + (255 - current.data[i]) * level;
        }
        ctx.putImageData(local, 0, 0, 0, 0, width, height);
        this.onblur = function(){
            current = local;
        }
    }

    document.getElementById("greenChannel").onchange = function () {
        var local = ctx.getImageData(0, 0, width, height),
        level = this.value / 10;
        for (var i = 0; i < current.data.length; i += 4) {
            local.data[i + 1] = current.data[i + 1] + (255 - current.data[i + 1]) * level;
        }
        ctx.putImageData(local, 0, 0, 0, 0, width, height);
        this.onblur = function () {
            current = local;
        }
    }

    document.getElementById("blueChannel").onchange = function () {
        var local = ctx.getImageData(0, 0, width, height),
        level = this.value / 10;
        for (var i = 0; i < current.data.length; i += 4) {
            local.data[i + 2] = current.data[i + 2] + (255 - current.data[i + 2]) * level;
        }
        ctx.putImageData(local, 0, 0, 0, 0, width, height);
        this.onblur = function () {
            current = local;
        }
    }

    document.getElementById("brightChannel").onchange = function () {
        var local = ctx.getImageData(0, 0, width, height),
          level = this.value * 25;
        for (var i = 0; i < current.data.length; i += 4) {
            local.data[i] = current.data[i] + level;
            local.data[i + 1] = current.data[i + 1] + level;
            local.data[i + 2] = current.data[i + 2] + level;
        }
        ctx.putImageData(local, 0, 0, 0, 0, width, height);
        this.onblur = function () {
            current = local;
        }
    }

    document.getElementById("greyChannel").onchange = function () {
        var local = ctx.getImageData(0, 0, width, height),
          level = this.value / 10;
        for (var i = 0; i < current.data.length; i += 4) {
            local.data[i] = current.data[i] + (255 - current.data[i]) * level;
            local.data[i + 1] = current.data[i + 1] + (255 - current.data[i + 1]) * level;
            local.data[i + 2] = current.data[i + 2] + (255 - current.data[i + 2]) * level;
        }
        ctx.putImageData(local, 0, 0, 0, 0, width, height);
        this.onblur = function () {
            current = local;
        }
    }

    document.getElementById("save_image").onclick = function(){
        var mask = document.createElement("div");
        mask.id = "mask";
        mask.style.background = 'rgba(0,0,0,0.9)';
        mask.style.position = 'absolute';
        mask.style.zIndex = 9;
        mask.style.left = 0;
        mask.style.top = 0;
        mask.style.right = 0;
        mask.style.bottom = 0;
        document.body.appendChild(mask);

        var curImg = document.createElement('img');
        curImg.id = 'curImg';
        curImg.style.zIndex = 10;
        curImg.style.position = 'absolute';
        curImg.src = document.getElementById('cvs').toDataURL("image/png");
        mask.appendChild(curImg);
        curImg.onload = function(){
            this.style.left = (document.body.clientWidth - this.offsetWidth) / 2 + 'px';
            this.style.top = (document.body.clientHeight - this.offsetHeight) / 2 + 'px';       
        }
        mask.onclick = function(){
            this.style.display = 'none';
        }
    }

    $(".channel").change(function(){
    	$(this).next().val($(this).val());
    })
    $(".channel_value").change(function(){
    	$(this).prev().val($(this).val())
    })
})()

