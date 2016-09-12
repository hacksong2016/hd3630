Meteor.startup(function() {

    var trs = Travels.find().count();
    if(trs < 1){
        Travels.insert({
            travelAt:new Date("2016-10-29 08:00:00"),
            day:5,
            address:"中国－南海",
            max:20,
            users:[],
            thumb:"/w1.jpg",
            status:1,
        });
        Travels.insert({
            travelAt:new Date("2016-10-19 08:00:00"),
            day:5,
            address:"美国－阿拉斯加",
            max:20,
            users:[],
            thumb:"/w2.jpg",
            status:1,
        });
        Travels.insert({
            travelAt:new Date("2016-11-10 08:00:00"),
            day:5,
            address:"欧洲－亚丁湾",
            max:20,
            users:[],
            thumb:"/w3.jpg",
            status:1,
        });
        Travels.insert({
            travelAt:new Date("2016-11-20 08:00:00"),
            day:5,
            address:"中国－南海",
            max:20,
            users:[],
            thumb:"/w4.jpg",
            status:1,
        });
        Travels.insert({
            travelAt:new Date("2016-12-05 08:00:00"),
            day:5,
            address:"中国－南海",
            max:20,
            users:[],
            thumb:"/w5.jpg",
            status:1,
        });

    }


    if(Cooks.find().count() < 1){
        Cooks.insert({
            star:5,
            name:"Barnett",
            thumb:"/c1.png",
            status:1,
            desc:"擅长日式料理，尤其以刀法为长。此外寿司制作更佳。",
        });
        Cooks.insert({
            star:5,
            name:"Felix",
            thumb:"/c2.png",
            status:1,
            
            desc:"从事日本料理近20年,曾跟随日本人、香港人学习日本料理制造。在国外学习多年,一直不断的进行菜品创新。",
        });
        Cooks.insert({
            star:5,
            name:"Jason",
            thumb:"/c3.png",
            status:1,
            desc:"曾在全国各地的城市工作，所以对各地的饮食有着较多认识。",
        });
        Cooks.insert({
            star:5,
            name:"Frederic",
            thumb:"/c4.png",
            status:1,
            desc:"为厨先为人，一定要做到勤俭节约精益求精，以店为家，以顾客为上帝的职业精神。",
        });
    }

    if(Goods.find().count() < 1){
        Goods.insert({
            type:"kaiwei",
            star:5,
            name:"菜品A",
            thumb:"/a1.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"kaiwei",
            star:5,
            name:"菜品B",
            thumb:"/a2.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"kaiwei",
            star:5,
            name:"菜品C",
            thumb:"/a3.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"tianpin",
            star:5,
            name:"菜品D",
            thumb:"/a4.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"tianpin",
            star:5,
            name:"菜品E",
            thumb:"/a5.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"tianpin",
            star:5,
            name:"菜品F",
            thumb:"/a6.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"tang",
            star:5,
            name:"菜品G",
            thumb:"/a7.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"tang",
            star:5,
            name:"菜品H",
            thumb:"/a8.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"xiaoshi",
            star:5,
            name:"菜品I",
            thumb:"/a9.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"xiaoshi",
            star:5,
            name:"菜品J",
            thumb:"/a10.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });
        Goods.insert({
            type:"xiaoshi",
            star:5,
            name:"菜品J",
            thumb:"/a11.jpg",
            status:1,
            desc:"是一种颜色白而味道跟大酱相似的酱，只是甜味较重。",
        });

        
    }

    if(Others.find().count() < 1){
        Others.insert({
            type:"hongjiu",
            price:1888.00,
            star:5,
            name:"Chateau Cheval Blanc",
            thumb:"/h1.png",
            status:1,
            desc:"白马庄不仅在圣达美隆的列级名庄中排位第一级，也是A组的两个名庄中排名第一的酒庄，是近年来世人常称的波尔多八大名庄之一。",
        });
        Others.insert({
            type:"hongjiu",
            price:888.00,
            star:5,
            name:"Mouton Rothschild",
            thumb:"/h2.png",
            status:1,
            desc:"尽管从波尔多酒庄的评级时间看，木桐酒庄是五大一级庄中的新晋，但它一直以来却备受众多酒评家青睐。美国著名酒评家Robert Parker品尝2006年新酒后，在“五大”中给予了木桐最高分数。",
        });
        Others.insert({
            type:"xuejia",
            price:120.00,
            star:5,
            name:"Cohiba",
            thumb:"/h3.png",
            status:1,
            desc:"希霸雪茄产自古巴，在雪茄界的地位犹如葡萄酒中的拉菲，是雪茄品牌的No.1。",
        });
        Others.insert({
            type:"xuejia",
            price:300.00,
            star:5,
            name:"Montecristo",
            thumb:"/h4.png",
            status:1,
            desc:"有人说，蒙特克里斯托雪茄是信心和雄性的代名词，就像一个中年男人，充满着男人味的气息，初次与他接触，你会感觉到他的冷峻，但当你与他亲近时，你会发现他如一位慈爱的父亲一样，对你关爱备至。",
        });
      
        
    }
});
