(function(){
    //父类
    function Animal(name){
        this.name=name;
    }
    Animal.prototype.sayName = function(){
        console.log(this.name);
    }
    //原型链
    function Cat(){}
    Cat.prototype = new Animal();
    Cat.name="大橘";
    let cat = new Cat();

    //构造函数
    function Dog(){
        Animal.call(this,"柯基");
    }
    let dog = new Dog();

    //组合继承
    function Pig(){
        Animal.call(this,"居居");
    }
    Pig.prototype = new Animal();
    let pig = new Pig();

    //原型继承
    // function Create(prototype,options){
    //     let tmp = {};
    //     tmp.proto = prototype;
    //     Object.defineProperties(tmp,options);
    //     return tmp;
    // }
    // function Sheep(){}
    // Sheep.prototype = Create(Animal.prototype,{
    //     constructor:{
    //         value:Sheep
    //     },
    //     eat:{
    //         value:"草"
    //     }
    // })
    // let sheep = new Sheep();
    // console.log(sheep.eat);
    
    function content(obj){
        function F(){};
        F.prototype = obj;
        return new F();
    }
    let sheep1=content(Animal.prototype);
    //以上为原型式继承，给原型式继承增强对象=>寄生式继承
    function subObject(obj){
        let sub = content(obj);
        sub.eat = function(){
            console.log("寄生式继承");
        }
        return sub;
    }
    let sheep2 = subObject(Animal.prototype);
    console.log(sheep2.eat);


    function inheritPrototype(Fish,Animal){
        let sub = content(Animal.prototype);
        sub.constructor = Fish;
        Fish.prototype = sub;
    }
    function Fish(){
        Animal.call(this,"fish");
    }
    inheritPrototype(Fish,Animal);
    let fish = new Fish();
    console.log(fish);
})();