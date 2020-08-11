// 获取当前浏览器支持的transform兼容写法
function getTransform() {
    var transform = '',
        divStyle = document.createElement('div').style,
        // 可能涉及到的几种兼容性写法，通过循环找出浏览器识别的那一个
        transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],

        i = 0,
        len = transformArr.length;

    for(; i < len; i++)  {
        if(transformArr[i] in divStyle) {
            // 找到之后立即返回，结束函数
            return transform = transformArr[i];
        }
    }

    // 如果没有找到，就直接返回空字符串
    return transform;
}
//获取元素的样式
function getStyle(elem,property){
    // ie通过currentStyle来获取元素的样式，其他浏览器通过getComputedStyle来获取
    // console.log(document.defaultView.getComputedStyle(elem,false)["width"]);
    return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem,false)[property]:elem.currentStyle[property];
}
//获取目标元素初始位置
function getTargetPos(elem){
    let transform = getTransform();
    let pos = {x:0,y:0};
    if(transform){
        let transformValue = getStyle(elem,transform); 
        if(transformValue=="none"){
            elem.style[transform]="translate(0,0)"; 
            return pos;
        }else{
            let temp = transformValue.match(/\d+/g);
            return pos = {
                //trim去除多余的空格
                x : parseInt(temp[4].trim()),
                y : parseInt(temp[5].trim())
            }
        }
    }else{
        if(getStyle(elem,'position')=='static'){
            //静态定位无法设置top，left。。。
            elem.style.position = 'relative';
            return pos;
        }
        else{
            return pos = {
                x:parseInt(getStyle(elem,'left') ? getStyle(elem,'left'):0),
                y:parseInt(getStyle(elem,'top') ? getStyle(elem,'top'):0)
            }
        }
    }
}
//设置新位置
function setTargetPos(elem,pos){
    
    let transform = getTransform();
    if(transform){
        elem.style[transform] = 'translate('+pos.x+"px,"+pos.y+"px)";
        
    }else{
        elem.style.left = pos.x + 'px';
        elem.style.top = pos.y + 'px';
    }
    return elem;
}
let oElem = document.getElementById('target');
let startX = 0,startY = 0;
let sourceX = 0,sourceY = 0;
oElem.addEventListener('mousedown',start,false);

function start(event){
    startX = event.pageX;
    startY = event.pageY;

    let pos = getTargetPos(oElem);

    sourceX = pos.x;
    sourceY = pos.y;

    document.addEventListener('mousemove',move,false);
    document.addEventListener('mouseup',end,false);
}
function move(event){
    let currentX = event.pageX;
    let currentY = event.pageY;

    let distanceX = currentX - startX;
    let distanceY = currentY - startY;

    setTargetPos(oElem,{
        x:(sourceX + distanceX).toFixed(),
        y:(sourceY + distanceY).toFixed()
    })
}
function end(event){
    document.removeEventListener("mousemove",move);
    document.removeEventListener("mouseup",end);
}