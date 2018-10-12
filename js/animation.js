// 动画显示数字
function showNumberAnimation(i,j,nums){

   // console.log(i,j,nums);

   var numberCeil=$('#number-floor-'+i+'-'+j);
   numberCeil.css('background-color',getNumberBgColor(nums));
   numberCeil.css('color',getNumberColor(nums));
   numberCeil.text(nums);


  numberCeil.animate({
  	width:aa,
  	height:aa,
  	top:getTop(i,j),
  	left:getLeft(i,j)




  },500)

}
// 动画显示移动
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCeil=$('#number-floor-'+fromx+'-'+fromy);
	numberCeil.animate({
		top:getTop(tox,toy),
		left:getLeft(tox,toy)

	},200);
}