function canvas(json){
	this.json = json;
	this.width = 650
	this.height = 748
	this.init()
}
canvas.prototype.init = function(){
	var _this = this;
	var itemDom = '';
	$.each(this.json, function(index,obj){
		_this.item(obj,function(item){
			itemDom += item
		})
	})
	$(".list").html(itemDom)
}
canvas.prototype.item = function(obj,callback){
	var item = document.createElement("div")
    var item_nav = document.createElement("div")
    item.className = "list-item"
    item_nav.className = "list-nav"
    this.image(obj, function(cv){

        item_nav.innerHTML = '<div class="item-nav-key"><a href="'+obj.code+'">查看二维码</a></div>'+
                            '<div class="item-nav-key"><a href="'+cv.toDataURL('image/jpg')+'" download="product.jpg">下载图片</a></div>'+
                            '<div class="item-nav-key">库存'+obj.ku+'</div>'
        item.append(cv)
        item.append(item_nav)
    	// callback(item)
    	$(".list").append(item)
    })
}
canvas.prototype.image = function(obj, callback){
	var cv = document.createElement("canvas");
        cv.width = this.width;
        cv.height = this.height;
    var cvs = cv.getContext('2d');
        cvs.fillStyle = "#fff";
        cvs.fillRect(0, 0, this.width, this.height)
    var _this = this

    cvs.fillStyle = "#333";
    cvs.textAlign="center";
    cvs.font = "900 30px 微软雅黑";
    cvs.fillText(obj.title, this.width/2,96);
    cvs.font = "600 20px 微软雅黑";
    cvs.fillText(obj.msg, this.width/2,131);
    cvs.fillStyle = "#ee5587";
    cvs.font = "41px 微软雅黑";
    cvs.fillText(obj.pic, this.width/2,645);

    var code = new Image();
    code.src = this.erweima(obj);
    code.onload = function () {
    	cvs.drawImage(code, _this.width-120 , _this.height-120,115,115)
    }
    var logo = new Image();
    logo.src = obj.logo;
    logo.onload = function () {
        cvs.drawImage(logo, 560,665, 30, 30)
    }
    var icon = new Image();
    icon.src = obj.icon;
    icon.onload = function () {
        cvs.drawImage(icon, 0, 0, 314, 99)
    }
    var image = new Image();
    image.src = obj.img;
    image.onload = function () {
        cvs.drawImage(image, 218, 153, 212, 441)
        callback(cv)
    }
}
canvas.prototype.erweima = function(obj){
	var qrcode = $('#qrcode').qrcode({
		 render: "canvas",
		 width: 80,
		 height: 80,
		 text: obj.url 
	}).hide();
	var ac = qrcode.find('canvas').get(0);
        var jpg = ac.toDataURL('image/jpg');
	$('#qrcode').html('')
    	return jpg
}
