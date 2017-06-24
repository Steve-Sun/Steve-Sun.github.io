window.onload= function () {
    $(".topBox .NIE-topBar-include .inner .right-nav ul li").mouseenter(function () {
        $(this).children("span").show().parent("li").siblings("li").children("span").hide()
    }).mouseleave(function () {
        $(this).children("span").hide();
    });

    $(".fixed-nav .inner .right-nav ul .other").mouseenter(function () {
        $(this).children("span").show();
        $(this).siblings(".other").children("span").hide();
    }).mouseleave(function () {
        $(this).children("span").hide();
    });

    $(window).scroll(function () {

        if($(window).scrollTop()>100){
            $("#topFixedNav").css("background","rgba(255,255,255,0.5)");
        }else{
            $("#topFixedNav").css("background","");
        }
    });


    $("#allGameList").mouseenter(function () {
        $("#downGameList").stop().slideDown();
    }).mouseleave(function () {
        $("#downGameList").hide();
    });


    setInterval(function () {
        $('.topBox .NIE-topBar-include .inner .right-nav ul #list1').stop(false,true).fadeOut(4000);
        $(".topBox .NIE-topBar-include .inner .right-nav ul #list2").stop(false,true).hide();
        $('.topBox .NIE-topBar-include .inner .right-nav ul #list1').stop(false,true).fadeIn(4000);
        $(".topBox .NIE-topBar-include .inner .right-nav ul #list2").stop(false,true).hide();
    },4000)


    $(".fixed-nav .inner .right-nav ul .two-code").mouseenter(function () {
        $(".fixed-nav .inner .right-nav ul .two-code .bg").show();
    }).mouseleave(function () {
        $(".fixed-nav .inner .right-nav ul .two-code .bg").hide();
    });

    var downTriangle = document.getElementById("downTriangle");

    setInterval(downPlay,1250);
    function downPlay(){
        myAnimate3(downTriangle,{"top":50}, function () {
            myAnimate3(downTriangle,{"top":43});
        });
    };

    var jqSpanArr = $(".part02 .inner .top .left ol li");
    var imgList = document.getElementById("imgList");
    var imgListUl = document.getElementById("imgListUl");
    var liArr = imgListUl.getElementsByTagName("li");
    var key = 0;
    var square = 0;
    for(var i= 0;i<jqSpanArr.length;i++){
        jqSpanArr[i].index = i;
        jqSpanArr[i].onmouseenter= function () {
            for(var j=0;j<jqSpanArr.length;j++){
                jqSpanArr[j].className = "";
            }
            this.className="current";
            myAnimate1(imgListUl,-this.index*473);
            key = square = this.index;
        }
    }

    imgListUl.appendChild(liArr[0].cloneNode(true));
    var timer1 = null;
    timer1 = setInterval(autoPlay1,2000);

    imgList.onmouseenter= function () {
        clearInterval(timer1);
    }
    imgList.onmouseleave= function () {
        timer1 = setInterval(autoPlay1,2000);
    }
    function autoPlay1(){
        key++;
        square++;
        if(square === jqSpanArr.length){
            square = 0;
        }
        if(key === liArr.length){
            imgListUl.style.left = 0;
            key = 1;
        }

        for(var j=0;j<jqSpanArr.length;j++){
            jqSpanArr[j].className = "";
        }
        jqSpanArr[square].className = "current";
        myAnimate1(imgListUl,-key*473);

    }


    var jqHeadLiArr = $(".part02 .inner .top .right .head li");
    var jqInfoUlArr = $(".part02 .inner .top .right .info ul");
    for(var i=0;i<jqHeadLiArr.length;i++){
        jqHeadLiArr[i].index = i;
        jqHeadLiArr[i].onmouseenter = function () {
            $(this).children("a").css("color","#ab0808").siblings("i").stop().show(500);
            $(this).siblings("li").children("a").css("color","#fff");
            $(this).siblings("li").children("i").stop().hide(500);
            $(jqInfoUlArr[this.index]).stop().fadeIn().siblings("ul").stop().hide();
        }
    }

    var jqAArr = $(".part02 .inner .bottom a");
    for(var i=0;i<jqAArr.length;i++){
        jqAArr[i].onmouseenter= function () {
            myAnimate2(this,{"margin-top":-5});
            $(this).css("box-shadow","5px 5px 10px rgba(0,0,0,.2)")
        };
        jqAArr[i].onmouseleave= function () {
            myAnimate2(this,{"margin-top":0});
            $(this).css("box-shadow","none");
        }
    }


    var json1 = [
        {//   1
            "width": 721,
            "top":0,
            "left": 0,
            "opacity":1,
            "z-index": 3
        },
        {//  2
            "width": 601,
            "top":60,
            "left": 320,
            "opacity":0.7,
            "z-index": 1
        },
        {//  3
            "width": 721,
            "top":0,
            "left": 0,
            "opacity":0,
            "z-index": 1
        },
        {//  4
            "width": 601,
            "top":60,
            "left": -200,
            "opacity":0.7,
            "z-index": 1
        },
    ]
    var specialImgArr = $(".part04 .inner .game-special img");
    var leftMask = $(".part04 .inner .game-special .left-mask")[0];
    var rightMask = $(".part04 .inner .game-special .right-mask")[0];
    var flag = true;
    for(var i=0;i<json1.length;i++){
        myAnimate2(specialImgArr[i],json1[i]);
    }

    rightMask.onclick= function () {
        if(flag){
            flag=false;
            json1.unshift(json1.pop());
            for(var i=0;i<specialImgArr.length;i++){
                myAnimate2(specialImgArr[i],json1[i], function () {
                    flag=true;
                });
            };
        }
    };
    leftMask.onclick= function () {
        if(flag){
            flag=false;
            json1.push(json1.shift());
            for(var i=0;i<specialImgArr.length;i++){
                myAnimate2(specialImgArr[i],json1[i], function () {
                    flag=true;
                });
            };
        }
    };

    var videoLeft = $(".part05 .inner .left");
    var videoMask = $(".part05 .inner .left .mask");
    var videoPlay = $(".part05 .inner .left .play");
    videoLeft.mouseenter(function () {
       videoMask.stop().fadeOut();
    }).mouseleave(function () {
        videoMask.stop().fadeIn();
    });
    $(".part05 .inner .right .mask").on("mouseenter",function () {
        $(this).stop().fadeOut();
        window.getSelection()? window.getSelection().removeAllRanges():document.selection.empty();
    }).mouseleave(function () {
        $(this).stop().fadeIn();
    });

    var part05ImagesLi = $(".part05 .inner .right .images li")
    var bigMask = document.getElementById("bigMask");
    var maskImagesArr = $(bigMask).children("div");
    var closeSpan = $(".bigMask div span");
    for(var i= 0;i<5;i++){
        part05ImagesLi[i].index = i;
        $(part05ImagesLi[i]).on("dblclick", function () {
            for(var j=0;j<5;j++){
                maskImagesArr[j].style.display="none";
            };
            bigMask.style.display="block";
            maskImagesArr[this.index].style.display="block";
        });
    };
    closeSpan.on("click",function () {
        bigMask.style.display='none';
    });

    var moveToLeft = document.getElementById("moveToLeft");
    var moveToRight = document.getElementById("moveToRight");
    var bigBox = $("#bigBox")[0];
    var count = 0;
    var lastSquare = document.getElementById("lastSquare");
    var lastOlLiArr = lastSquare.children;
    moveToRight.onclick= function () {
        count++;
        if(count===3){
            count=1;
            bigBox.style.left = 0;
        }
        if(count===2){
            lastOlLiArr[0].className="current";
            lastOlLiArr[1].className="";
        }else{
            lastOlLiArr[0].className="";
            lastOlLiArr[1].className="current";
        }
        myAnimate1(bigBox,-1004*count);
    }
    moveToLeft.onclick= function () {
        count--;
        if(count===-1){
            count=1;
            bigBox.style.left = -2008+"px";
        }
        if(count===0){
            lastOlLiArr[0].className="current";
            lastOlLiArr[1].className="";
        }else{
            lastOlLiArr[0].className="";
            lastOlLiArr[1].className="current";
        }
        myAnimate1(bigBox,-1004*count);
    }

    $(".part06 .inner .game-skills .big-box div ul li").mouseenter(function () {
        myAnimate2(this,{"margin-top":-5});
        $(this).css("box-shadow","5px 5px 10px rgba(0,0,0,.4)")
    }).mouseleave(function () {
        myAnimate2(this,{"margin-top":0});
        $(this).css("box-shadow","none");
    })

    $("#closeBanner").click(function () {
        $("#fixedBanner").fadeOut();
    });


}