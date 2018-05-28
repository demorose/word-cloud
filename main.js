function setCloud() {
    var height = document.getElementById('cloud').offsetHeight;
    var width = document.getElementById('cloud').offsetWidth;
    var words = document.getElementsByClassName('word');
    for (var i=0; i < words.length; i++) {
        var obj = words[i];

        obj.style.top = height/2 +((Math.random() - 0.5) * (height/2)) + 'px';
        obj.style.left = ((width/2)  - (obj.offsetWidth/2) + ((Math.random() - 0.5) * (width /2))) + 'px';
        obj.data = {'weight': Math.random()*0.1};
    }
}

function parallax(e) {
    if(tempX1 == 0) {
        tempX1 = e.pageX
        tempY1 = e.pageY
    }
    tempX2 = e.pageX
    tempY2 = e.pageY

    var words = document.getElementsByClassName('word');
    for (var i=0; i < words.length; i++) {
        var obj = words[i];
        obj.style.left = (obj.style.left.replace(/px$/, '')*1 + (tempX2 - tempX1)*(obj.data.weight)) + 'px';
        obj.style.top = (obj.style.top.replace(/px$/, '')*1 + (tempY2 - tempY1)*(obj.data.weight)) + 'px';
    }
    tempX1 = tempX2;
    tempY1 = tempY2;

    return true
}

setCloud();
window.addEventListener('mousemove', parallax);
window.addEventListener('resize', setCloud);

var IE = document.all?true:false
var tempX1 = 0
var tempY1 = 0
var tempX2 = 0
var tempY2 = 0
