/**
 * @author SteveSun
 * @alert 以下全部为伟神原创，采用原生JavaScript编写，版权所有翻版必究!
 * (c) Copyright 2017 SteveSun. All Rights Reserved.
 */

//------------------------------------------------------------------------------------
//---------------------------------我是华丽的分割线-------------------------------------
//------------------------------------------------------------------------------------

//雪花部分
var aSnow = document.getElementsByClassName('snow');

snowFall(aSnow[0], 2, 1.5);
setTimeout('snowFall(aSnow[1], 2.5, 1)', 1000);
setTimeout('snowFall(aSnow[2], 2, 1.5)', 2000);
setTimeout('snowFall(aSnow[3], 2.5, 2)', 3000);

/**
 * @name	snowFall
 * @function  生成雪花飘落效果
 * @param {Object} flower 传入雪花
 * @param {Number} speed	飘落速率
 * @param {Number} angle	飘落斜率
 */
function snowFall(flower, speed, angle) {
	flower.sizeTimes = Math.ceil(Math.random() * 3);
	flower.style.width = flower.sizeTimes * 51 + 'px';
	flower.style.height = flower.sizeTimes * 43 + 'px';
	flower.style.top = '-' + flower.style.height;
	flower.xWidth = parseInt(Math.random() * 1000) + 500;
	flower.style.left = flower.xWidth + 'px';
	clearInterval(flower.timer);
	flower.timer = setInterval(function() {
		flower.xWidth -= speed;
		var step = angle * speed;
		flower.style.top = flower.offsetTop + step + 'px';
		flower.style.left = flower.xWidth + 'px'
		if(flower.xWidth <= -(flower.sizeTimes * 51)) {
			clearInterval(flower.timer);
			snowFall(flower, speed, angle);
		}
	}, 10);
}

//------------------------------------------------------------------------------------
//---------------------------------我是视频的分割线-------------------------------------
//------------------------------------------------------------------------------------

var oPlay = document.getElementById('video');
var oPlayVideo = oPlay.getElementsByTagName('video')[0];
var oPlayBg = oPlay.getElementsByClassName('bg')[0];
var oPlayClose = oPlay.getElementsByClassName('close')[0];
var oPlayBtn = document.getElementById('play-video');
var oVbox = document.getElementById('vBox');
//关
oPlayClose.onclick = function() {
	oPlay.style.display = 'none';
	oPlayBg.style.opacity = 0;
	oVbox.removeChild(oVbox.children[0]);
};
//开
oPlayBtn.onclick = function() {
	oPlay.style.display = 'block';
	elementFadeIn(oPlayBg, 0.1, 0.7);
	var video = document.createElement('video');
	video.src = "video/27ba2067e6193d9ae5c9f853451bd4b5qt.mp4";
	video.autoplay = 'autoplay';
	video.controls = 'controls';
	oVbox.appendChild(video);
};

//------------------------------------------------------------------------------------
//---------------------------------我是闷骚的分割线-------------------------------------
//------------------------------------------------------------------------------------

//楼层跳转
var oNavigation = document.getElementById('navigation');
aLiOfNavigation = oNavigation.children;
var aDivOfMainPage = document.getElementsByClassName('slidePage');
var target = 0,
	leader = 0,
	timer = null;

for(var i = 0; i < 4; i++) {
	aLiOfNavigation[i].index = i;
	aLiOfNavigation[i].onclick = function() {
		clearCur();
		this.id = 'cur';
		target = aDivOfMainPage[this.index].offsetTop + 55;
		scrollToTarget(target);
	};
}
/**
 * @function 清空楼层ID
 */
function clearCur() {
	for(var i = 0; i < aLiOfNavigation.length; i++) {
		aLiOfNavigation[i].id = '';
	}
}

//滚动动画
/**
 * @function Y轴滚动到指定位置
 * @param {Number} placeY
 */
function scrollToTarget(placeY) {
	clearInterval(timer);
	timer = setInterval(function() {
		var step = (placeY - leader) / 8;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		if(step > 0 && step < 3) {
			step = 2;
		} else if(step > -3 && step < 0) {
			step = -2;
		}
		leader += step;
		window.scrollTo(0, leader);
		if(Math.abs(placeY - window.scrollY) <= Math.abs(step)) {
			window.scrollTo(0, placeY);
			clearInterval(timer);
		}
	}, 15);
};

//跳动下滑菜单和电梯
var oArrow = document.getElementsByClassName('J_arrow')[0];
window.onscroll = function() {
	//	console.log(window.scrollY);
	clearCur();
	if(window.scrollY > 333 && window.scrollY <= 1333) {
		aLiOfNavigation[1].id = 'cur';
		oArrow.style.visibility = 'visible';
	} else if(window.scrollY > 1333 && window.scrollY <= 2333) {
		aLiOfNavigation[2].id = 'cur';
		oArrow.style.visibility = 'visible';
	} else if(window.scrollY > 2333) {
		aLiOfNavigation[3].id = 'cur';
		oArrow.style.visibility = 'hidden';
	} else {
		oArrow.style.visibility = 'visible';
		aLiOfNavigation[0].id = 'cur';
	}

}
//page1 333 1333 2333

//------------------------------------------------------------------------------------
//---------------------------------我是广告的分割线-------------------------------------
//------------------------------------------------------------------------------------

//获取广告页
var oAllPageBanner = document.getElementById('all-page-banner');
//广告业背景
var oAllPageBannerBg = document.getElementById('all-page-banner-bg');
//主内容
var oJdialog = oAllPageBannerBg.nextElementSibling;
var oMainOfoJdialog = oJdialog.getElementsByClassName('main')[0];
//获取第二屏相应列表
var aItemList = document.getElementsByClassName('hl-list')[0].children;
//关闭
var oClose = oAllPageBanner.getElementsByClassName('close')[0];
//左
var oBtnPrev = oAllPageBanner.getElementsByClassName('prev')[0];
//右
var oBtnPrev = oAllPageBanner.getElementsByClassName('next')[0];
//关闭按钮
oClose.onclick = function() {
	oAllPageBanner.style.display = 'none';
	oAllPageBannerBg.style.opacity = 0;
	oJdialog.style.opacity = 0;
}
//捆绑page2事件
var yOfJdialog = 0;
for(var i = 0; i < aItemList.length; i++) {
	oAllPageBannerBg.style.opacity = 0;
	oJdialog.style.opacity = 0;
	aItemList[i].index = i;
	aItemList[i].leftY = yOfJdialog;
	yOfJdialog -= 780;
	aItemList[i].onclick = function() {
		oAllPageBanner.style.display = 'block';
		elementFadeIn(oAllPageBannerBg, 0.1, 0.7);
		elementFadeIn(oJdialog, 0.1, 1);
		oMainOfoJdialog.style.left = this.leftY + 'px';
	}
}

//TODO:广告无缝轮播
var oAllPageBanner = document.getElementById('all-page-banner');
var oPrevBtn = document.getElementById('dp');
var oNextBtn = document.getElementById('dn');
var oBannerMain = oAllPageBanner.getElementsByClassName('main')[0];
var aBannerMain = oAllPageBanner.getElementsByClassName('main')[0].children;

//左
oPrevBtn.onclick = function() {
	var leftValueOfBanner = parseInt(oBannerMain.offsetLeft);
	if(leftValueOfBanner == 0) {
		animate(oBannerMain, {
			"left": -5460
		});
	} else {
		var newLeft = leftValueOfBanner + 780;
		animate(oBannerMain, {
			"left": newLeft
		});
	}
};
//右
oNextBtn.onclick = function() {
	var leftValueOfBanner = parseInt(oBannerMain.offsetLeft);
	if(leftValueOfBanner == -5460) {
		animate(oBannerMain, {
			"left": 0
		});
	} else {
		var newLeft = leftValueOfBanner - 780;
		animate(oBannerMain, {
			"left": newLeft
		});
	}
};

//------------------------------------------------------------------------------------
//---------------------------------我是咸鱼的分割线-------------------------------------
//------------------------------------------------------------------------------------

//第四屏选中效果
//角色选中 id=item-active
//大图 id=slide-active
var aCharacterMini = document.getElementById('pics-character-mini').children;
var aCharacter = document.getElementById('pics-character').children;

changCharacter(aCharacterMini, aCharacter, 'item-active', 'slide-active');
/**
 * @function 循环绑定点击事件
 * @param {Array} arr1 绑定点击
 * @param {Array} arr2
 * @param {String} idName1
 * @param {String} idName2
 */
function changCharacter(arr1, arr2, idName1, idName2) {
	for(var i = 0; i < arr1.length; i++) {
		arr1[i].index = i;
		arr2[i].index = i;
		arr1[i].onclick = function() {
			for(var i = 0; i < arr1.length; i++) {
				arr1[i].id = '';
				arr2[i].id = '';
			}
			this.id = idName1;
			oPic = arr2[this.index];
			oPic.id = idName2;
			clearInterval(oPic.timer);
			for(var i = 0; i < 5; i++) {
				if(i !== oPic.index) {
					arr2[i].style.opacity = 0;
				}
			}
			elementFadeIn(oPic, 0.1, 1);
		}
	}
}
//淡入动画
/**
 * @function 淡入动画
 * @param {Object} ele
 * @param {Float} speed 淡入速度
 * @param {Float} target 目标浓度
 */
function elementFadeIn(ele, speed, target) {
	var newOpacity = 0;
	ele.timer = setInterval(function() {
		newOpacity = newOpacity + speed;
		ele.style.opacity = newOpacity;
		if(ele.style.opacity >= target) {
			clearInterval(ele.timer);
		}
	}, 20);
}

function elementFadeOut(ele, speed, target) {
	var newOpacity = 1;
	ele.timer = setInterval(function() {
		newOpacity = newOpacity - speed;
		ele.style.opacity = newOpacity;
		if(ele.style.opacity <= target) {
			clearInterval(ele.timer);
		}
	}, 20);
}

//------------------------------------------------------------------------------------
//---------------------------------我是怪异的分割线-------------------------------------
//------------------------------------------------------------------------------------

//TODO:Page3男左女右轮播图
var aArrow = document.getElementById("handler");
var oPrevArrow = aArrow.children[0];
var oNextArrow = aArrow.children[1];
var flag = true;

//鼠标进入显示,移开隐藏;
aArrow.onmouseover = function() {
	animate(aArrow, {
		"opacity": 1
	});
}
aArrow.onmouseout = function() {
	animate(aArrow, {
		"opacity": 0
	});
}

var oSwiperWrapper = document.getElementById('ts').children[0];
//所有主轮播页面
var aSwiperSlide = oSwiperWrapper.getElementsByClassName('swiper-slide');
//角色图
var aPerson = oSwiperWrapper.getElementsByClassName('person');
//宣传图
var aPic = oSwiperWrapper.getElementsByClassName('pic');

var arrOfJson = [{
		"right": -122,
	},
	{
		"right": 22,
	},
	{
		"right": -78,
	},
	{
		"right": -122,
	},
];


//循环捆绑
for (var i = 0; i < aSwiperSlide.length; i++) {
	aSwiperSlide[i].index = i;
	aSwiperSlide[i].jsonRight = arrOfJson[i];
}
var key = 0;
var beforKey = 3;
var nextKey = 1;
autoPlaySwiper();
oSwiperWrapper.timer = setInterval(autoPlaySwiper, 2500);
function autoPlaySwiper() {
	for (var i = 0; i < aSwiperSlide.length; i++) {
		if (i !== key) {
			aPerson[i].style.right = '-750px'
			aPic[i].style.left = '-780px'
			aSwiperSlide[i].style.opacity = 0;
		}
	}
	
	for (var i = 0; i < aSwiperSlide.length; i++) {
		aSwiperSlide[i].id = '';
	}
	aSwiperSlide[key].id = 'slidePageActive';
	animate(aSwiperSlide[key],{
		"opacity": 1
	});
	animate(aPerson[key], aSwiperSlide[key].jsonRight);
	animate(aPic[key],  {
		"left": 86
	});	
	beforKey = key;
	nextKey = key + 1;
	key++;
	if (key == 4) {
		key = 0;
		nextKey = 0;
	}
}

oPrevArrow.onclick = function() {
	animate(aPerson[beforKey],  {
			"right": 1500
	});
	animate(aPic[beforKey],  {
			"left": -1000
	});
};

oNextArrow.onclick = function() {
	animate(aPerson[beforKey],  {
			"right": -800
	});
	animate(aPic[beforKey],  {
			"left": 1500
	});
}

//#slidePageActive



//------------------------------------------------------------------------------------
//---------------------------------我是顶部的分割线-------------------------------------
//------------------------------------------------------------------------------------

//TODO:顶部slidedown菜单和轮播广告

var oNieTopBarBtn = document.getElementById('NIE-topBar-menu').firstElementChild;
var oNieTable = document.getElementById('NIE-table');

//从零向下展开至450
oNieTopBarBtn.onmouseenter = function() {
	clearInterval(oNieTable.timer);
	var height = 0;
	oNieTable.timer = setInterval(function() {
		var step = Math.ceil((450 - height) / 4);
		height += step;
		oNieTable.style.height = height + 'px';
		if(Math.abs(450 - height) <= Math.abs(step)) {
			oNieTable.style.height = '450px';
			clearInterval(oNieTable.timer);
		}
	}, 10)
};
//移开收回至0
oNieTopBarBtn.parentElement.onmouseleave = function() {
	oNieTable.style.height = 0;
};

//分享
var oShareMoreBtn = document.getElementById('share-more-btn');
var oShareMoreList = document.getElementsByClassName('NIE-share-more')[0].firstElementChild;
oShareMoreBtn.onmouseenter = function() {
	oShareMoreList.style.display = 'block';
	elementFadeIn(oShareMoreList, 0.1, 1);
};
oShareMoreBtn.onmouseleave = function() {
	oShareMoreList.style.display = 'none';
	oShareMoreList.style.opacity = 0;
};

//------------------------------------------------------------------------------------
//---------------------------------我是创意的分割线-------------------------------------
//------------------------------------------------------------------------------------

//鼠标移动鲜花反向移动
var oFlowerBg = document.getElementById('flower-bg');
document.onmousemove = function(event) {
	var event = event || window.event;
	var pagex = event.pageX;
	var pagey = event.pageY;
	if(pagey >= 800) {
		pagey = 800;
	}
	var xValue = parseInt((675 - pagex) / 34) - 20;
	var yValue = parseInt((400 - pagey) / 10);
	oFlowerBg.style.left = xValue + 'px';
	oFlowerBg.style.top = yValue + 'px';
};