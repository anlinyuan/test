(function(){
    // let Publisher = {
    //     list:{},
    //     subscribe:function(key,fn){
    //         if(!this.list[key]){
    //             this.list[key]=[];
    //         }
    //         this.list[key].push(fn);
    //     },
    //     publish:function(key,...arg){
    //         for(let fn of this.list[key]){
    //             fn.call(this,...arg);//？
    //         }
    //     },
    //     unSubscribe:function(key,fn){
    //         let fnList = this.list[key];
    //         if(!fnList){
    //             return false;
    //         }
    //         if(!fn){
    //             fnList.length = 0;
    //         }else{
    //             fnList.forEach((item,index)=>{
    //                 console.log(item.toString()===fn.toString());
    //                 console.log(fn.toString())
    //                 if(item.toString()===fn.toString()){
    //                     fnList.splice(index,1);
    //                 }
    //             })
    //         }
    //     }
    // }

    // Publisher.subscribe('onwork',time=>{ console.log(`上班:${time}`);})
    // Publisher.subscribe('offwork',function(time){
    //    console.log(`下班:${time}`);
    // })
    // Publisher.publish('onwork',"9:00");
    // Publisher.unSubscribe('onwork',time=>{ console.log(`上班:${time}`);})
    // console.log(Publisher.list);


    // data中更新后触发
function updatePrint() {
    console.log("data修改时打印");
}

// 属性更新，监听
function defineReactive(target, key, value) {
    // 深度监听(递归深度监听)
    observer(value);

    // 用的核心API
    Object.defineProperty(target, key, {
        get(){
            return value;
        },
        set(newVal) {
            if (newVal !== value){
                // 深度监听(递归深度监听)
                observer(value);
                // 赋值
                value = newVal;
                // 更新时记录
                updatePrint()
            }
        }
    })
}

// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null){
        // 不是对象和数组
        return target;
    }

    // 遍历target中属性
    for (let key in target){
        defineReactive(target, key, target[key]);
    }
}

// 准备数据
const data = {
    fruit: {
        name: "apple"
    },
    count: 10
};

// 监听数据
observer(data);

//测试
data.fruit.name = 'banana';

data.fruit = {name: 'banana'};

data.count = 5;

})()