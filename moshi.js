(function(){
    //工厂模式 无法识别对象实例的类型
    function createPerson(name,age,job){
        let o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function(){
            console.log(this.name);
        }
        return o;
    }
    // let perYinhui = createPerson("银灰",25,"boss");

    //构造函数模式
    function Person1(name,age,job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function(){
            console.log(this.name);
        }
    }
    // let perAmy = new Person("阿米娅",16,"boss");

    //原型模式
    function Person2(name,age,job){}
    Person2.prototype.name = "kong";
    Person2.prototype = {
        constructor : Person2,
        name:"kong"
    };
    // let perKong = new Person2();
    // console.log(perKong.name);

    //单例模式
    //单例模式的定义是:保证一个类仅有一个实例，并提供一个访问它的全局访问点。
    let CreateS = (function(){
        let tmp;
        return function(name){
            if(tmp){
                return tmp;
            }else{
                this.name = name;
                tmp = this;
                return tmp;
            }
        }
    })();
    CreateS.prototype.callName = function(){
        console.log(this.name);
    }
    // let single = new CreateS("name")
    // single.callName();

    //es6
    class People{
        constructor(name){
            if(typeof People.instance === 'object'){
                return People.instance;
            }
            People.instance = this;
            this.name = name;
            return this;
        }
        sayPeople(){
            console.log(this.name);
        }
    }
    let p = new People("people");
    p.sayPeople();
    //惰性单例,弹框
    let getI = (function(fn){
        let result;
        return function(){
            return result||(result = fn.apply(this,arguments));
        }
    })
    let CreateI = function(str){
        let div = document.createElement("div");
        div.innerHTML = str;
        div.style.display = "none";
        document.body.appendChild(div);
        return div;
    }
    let createI = getI(CreateI);
    let flag = false;
    document.body.addEventListener("click",function(){
        let a = createI("单例模式");
        if(!flag){
            a.style.display = 'block';
            flag = true;
        }else{
            a.style.display = "none";
            flag = false;
        }
        
    }) 
})();