function setCloud() {
    var height = document.getElementById('cloud').offsetHeight;
    var width = document.getElementById('cloud').offsetWidth;
    var words = document.getElementsByClassName('word');

    var placedWords = [];
    for (var i=0; i < words.length; i++) {
        var obj = words[i];
        var collide = true;
        for (var g=0; (g < 20 && collide == true); g++) {
            collide = false;
            var x = ((width/2)  - (obj.offsetWidth/2) + ((Math.random() - 0.5) * (width /2)));
            var y = height/2 +((Math.random() - 0.5) * (height/2));
            obj.style.top = y + 'px';
            obj.style.left = x + 'px';
            for (var j=0; j < placedWords.length && collide == false; j++) {
                var compareObj = placedWords[j];
                collide = collides(obj, compareObj);
            }
        }

        var weight = Math.random();
        if(obj.className.match(/\bemphasized\b/)) {
            weight = weight*2;
        }
        obj.data = {'weight': weight*0.1};
        obj.style.zIndex = Math.round((weight)*10);

        placedWords.push(obj);
    }
}

function collides(obj1, obj2) {
    var x1 = obj1.style.left.replace(/px$/, '')*1;
    var y1 = obj1.style.top.replace(/px$/, '')*1;
    // allow 10px superposition
    var h1 = obj1.offsetHeight - 10;
    var w1 = obj1.offsetWidth - 10;

    var x2 = obj2.style.left.replace(/px$/, '')*1;
    var y2 = obj2.style.top.replace(/px$/, '')*1;
    var h2 = obj2.offsetHeight;
    var w2 = obj2.offsetWidth;

    return (x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        h1 + y1 > y2);
}

function parallax(e) {
    var Xcoef;
    var Ycoef;
    if(e.type == 'mousemove') {
        if(tempX1 === null) {
            tempX1 = e.pageX;
            tempY1 = e.pageY;
        }
        tempX2 = e.pageX;
        tempY2 = e.pageY;
        Xcoef = (tempX2 - tempX1);
        Ycoef = (tempY2 - tempY1);
        tempX1 = tempX2;
        tempY1 = tempY2;
    } else {
        if(tempBeta1 === null) {
            tempBeta1 = e.beta;
            tempGamma1 = e.gamma;
        }
        tempBeta2 = e.beta;
        tempGamma2 = e.gamma;
        var mql = window.matchMedia('(orientation: portrait)');
        if(mql.matches) {
            Ycoef = (tempBeta2 - tempBeta1)*-15;
            Xcoef = (tempGamma2 - tempGamma1)*-15;
        } else {
            Xcoef = (tempBeta2 - tempBeta1)*-15;
            Ycoef = (tempGamma2 - tempGamma1)*-15;
        }
        tempBeta1 = e.beta;
        tempGamma1 = e.gamma;
    }
    var words = document.getElementsByClassName('word');
    for (var i=0; i < words.length; i++) {
        var obj = words[i];
        obj.style.left = (obj.style.left.replace(/px$/, '')*1 + (Xcoef)*(obj.data.weight)) + 'px';
        obj.style.top = (obj.style.top.replace(/px$/, '')*1 + (Ycoef)*(obj.data.weight)) + 'px';
    }
    return true
}

setCloud();

window.addEventListener('mousemove', parallax);
window.addEventListener('deviceorientation', parallax);

window.addEventListener('resize', setCloud);

var IE = document.all?true:false
var defaultFontFamily = document.body.style.fontFamily;
var tempX1 = null;
var tempY1 = null
var tempX2 = null
var tempY2 = null
var tempBeta1 = null;
var tempGamma1 = null;
var tempBeta2 = null;
var tempGamma2 = null;
