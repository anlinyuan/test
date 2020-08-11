(function(){
    class Subject{
        constructor(){
            this.observers = [];
        }
        add(key){
            this.observers.push(key);
        }
        delete(key){
            let i = this.observers.indexOf(key);
            if(i>-1){
                this.observers.splice(i,1);
            }
        }
        notify(){
            for(let i of this.observers){
                i.update();
            }
        }
    }
    class Observer{
        constructor(name){
            this.name = name; 
        }
        update(){
            console.log(`通知${this.name}`);
        }
    }
    let sub = new Subject();
    let obj1 = new Observer("obj1");
    let obj2 = new Observer("obj2");

    sub.add(obj1);
    sub.add(obj2);
    sub.notify();
    sub.delete(obj1);
    sub.notify();
})()