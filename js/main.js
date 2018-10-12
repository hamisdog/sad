var nums=new Array();
var score=0;
var hasConf=new Array();  //单元格重复叠加问题

var sx=0;
var sy=0;
var ex=0;
var ey=0;

$(document).ready(function(){
     newgame();
});


function newgame(){

  if(documentWidth>500){
    containerWidth=500;
    aa=100; 
    bb=20;
  }else{
    mobile();
  }

      
  
	init();


  getOneNumber();
  getOneNumber();
  


  
}

function mobile(){
  $('.container').css('width',containerWidth);
  $('.header1').css('width',containerWidth).css('display','flex').css('justifyContent','space-around');
  $('.mainbody').css('width',containerWidth).css('height',containerWidth);
  $('.bottom').css('width',aa).css('height',aa);
  $('.title').css('font-size',aa*0.7);
  $('.score').css('width',aa*1.5).css('height',aa*0.5).css('font-size',aa*0.2).css('line-height',aa*0.5+'px').css('margin-top',aa*0.1);
  $('.game').css('font-size',aa*0.2).css('padding',aa*0.1);
  $('.header2').css('width',containerWidth).css('display','flex').css('justifyContent','space-around');
  $('.txt').css('font-size',aa*0.2);




}

function init(){
   // 初始化下层单元格
 for(var i=0;i<4;i++){

 	for(var j=0;j<4;j++){
 		
 		var getbottom=$('#bottom-'+i+'-'+j);
 		   getbottom.css('top',getTop(i,j));
 		   getbottom.css('left',getLeft(i,j));
       
 	}  
 }

 // 初始化数组
 for(var i=0;i<4;i++){
 	nums[i]=new Array();
  hasConf[i]=new Array();
 	 for(var j=0;j<4;j++){
       nums[i][j]=0;
       hasConf[i][j]=false;
 	 }
   
 }

  updateFloor();  
  score=0;
  updateScore(score);
 
}

 // 更新上层单元格
function updateFloor(){


  // 每次重新游戏清空单元格
  $('.floorN').remove();

 for(var i=0;i<4;i++){

   for(var j=0;j<4;j++){

   	$(".mainbody").append('<div class=floorN id="number-floor-'+i+'-'+j+'"></div>');
   	var floorN=$('#number-floor-'+i+'-'+j);

   	if(nums[i][j]==0){
        floorN.css('width','0px');
        floorN.css('height','0px');
        floorN.css('top',getTop(i,j)+aa*0.5);
 		    floorN.css('left',getLeft(i,j)+aa*0.5);
         


   	}else{
        floorN.css('width',aa);
        floorN.css('height',aa);
        floorN.css('top',getTop(i,j));
 		    floorN.css('left',getLeft(i,j));
 		    floorN.css('background-color',getNumberBgColor(nums[i][j]));
        floorN.css('color',getNumberColor(nums[i][j]));
        floorN.text(nums[i][j]);

   	}
      hasConf[i][j]=false;

     $('.floorN').css('line-height',aa+'px').css('font-size',aa*0.5);


   }
 
 }

}




  function  getOneNumber (){
    // 判断是否有空间

    if(noSpace(nums)){
      return;
    }
  

    // 随机一个位置

    var count=0;
    var a=new Array();

    for(var i=0;i<4;i++){

      for(var j=0;j<4;j++){
       
       if(nums[i][j]==0){
        a[count]=i*4+j;
        count++;
       }

      }

    }

   var pos=Math.floor(Math.random()*count);
   var randomx=Math.floor(a[pos]/4);
   var randomy=Math.floor(a[pos]%4);


    // 随机2或4

     var randomNumber=Math.random()<0.5?2:4;

     nums[randomx][randomy]=randomNumber;

     showNumberAnimation(randomx,randomy,randomNumber);



  }

  // 键盘响应
  $(document).keydown(function(event) {
   // console.log(event);
     event.preventDefault();
    switch(event.keyCode){

        case 37: //left
             // 判断是否向左移动
             if(canMoveLeft(nums)){
               moveLeft();
               setTimeout(getOneNumber,200);
               setTimeout(gameOver,500);


             }

             break;

        case 38: //up
            if(canMoveUp(nums)){
              moveUp();
              setTimeout(getOneNumber,200);
              setTimeout(gameOver,500);

            }

             break;

        case 39: //right

             if(canMoveRight(nums)){
              moveRight();
              setTimeout(getOneNumber,200);
              setTimeout(gameOver,500);


             }


             break;

        case 40: //down
             if(canMoveDown(nums)){
              moveDown();
              setTimeout(getOneNumber,200);
              setTimeout(gameOver,500);

             }

        break;

        default:
             break;


    }


  });
  


  // 触摸响应

  document.addEventListener('touchstart', function(event){
    // console.log(event);
    sx=event.touches[0].pageX;
    sy=event.touches[0].pageY;




  });


    document.addEventListener('touchend', function(event){
    // console.log(event);
    ex=event.changedTouches[0].pageX;
    ey=event.changedTouches[0].pageY;

    // 判断滑动方向
    var dirx=ex-sx;
    var diry=ey-sy;
    
    if(Math.abs(dirx)<documentWidth*0.06 && Math.abs(diry)<documentWidth*0.06){
      return;
    }
    

    if(Math.abs(dirx)>=Math.abs(diry)){  //水平

      if(dirx>0){ //向右

        if(canMoveRight(nums)){
              moveRight();
              setTimeout(getOneNumber,200);
              setTimeout(gameOver,500);

      }



    }else{
        //向左

         if(canMoveLeft(nums)){
               moveLeft();
               setTimeout(getOneNumber,200);
               setTimeout(gameOver,500);


             }

      }


  }else{//垂直方向

    if(diry>0){//向下
       if(canMoveDown(nums)){
              moveDown();
              setTimeout(getOneNumber,200);
              setTimeout(gameOver,500);

             }

    }else{
      if(canMoveUp(nums)){
              moveUp();
              setTimeout(getOneNumber,200);
              setTimeout(gameOver,500);

            }

    }

  }

});

  // 向左移动
  //需要对每一个数字的左边进行判断，选择落脚点：
  //   1.落脚点没有数字，移动过程中没有障碍
  //   2.落脚点数字与自己相同，且移动过程中没有障碍物

  function moveLeft(){
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        if(nums[i][j]!=0){
          for(var k=0;k<j;k++){
            if(nums[i][k]==0 && noBlockHor(i,k,j,nums)){
              showMoveAnimation(i,j,i,k);
              nums[i][k]=nums[i][j];
              nums[i][j]=0;
              break;
            }else if(nums[i][k]==nums[i][j] &&noBlockHor(i,k,j,nums) &&!hasConf[i][k]){
               showMoveAnimation(i,j,i,k);
               nums[i][k]=nums[i][k]+nums[i][j];
               nums[i][j]=0;
               // 统计分数
               score+=nums[i][k];
               updateScore(score);

               hasConf[i][j]=true;
               break;



            }

          }
        }
      }
    }

    setTimeout(updateFloor,200);
  



  }

  // 向右移动
  function moveRight(){
    for(var i=0;i<4;i++){
      for(var j=2;j>=0;j--){
        if(nums[i][j]!=0){
          for(var k=3;k>j;k--){
            if(nums[i][k]==0 && noBlockHor(i,j,k,nums)){
              showMoveAnimation(i,j,i,k);
              nums[i][k]=nums[i][j];
              nums[i][j]=0;
              break;

            }else if(nums[i][k]==nums[i][j] && noBlockHor(i,j,k,nums) && !hasConf[i][k]){
              showMoveAnimation(i,j,i,k);
              nums[i][k]+=nums[i][j];
              nums[i][j]=0;
              score+=nums[i][k];
               updateScore(score);

               hasConf[i][k]=true;
               break;
            }
          }
        }
      }
    }
   setTimeout(updateFloor,200);


  }

//向上移动
 function moveUp(){
  for(var j=0;j<4;j++){
    for(var i=1;i<4;i++){
      if(nums[i][j]!=0){
        for(var k=0;k<i;k++){
          if(nums[k][j]==0 && noBlockVer(j,k,i,nums)){
            showMoveAnimation(i,j,k,j);
            nums[k][j]=nums[i][j];
            nums[i][j]=0;
            break;

          }else if(nums[k][j]==nums[i][j] && noBlockVer(j,k,i,nums) && !hasConf[k][j]){
            showMoveAnimation(i,j,k,j);
            nums[k][j]+=nums[i][j];
            nums[i][j]=0;
            score+=nums[k][j];
            updateScore(score);

            hasConf[k][j]=true;
            break;
          }

        }
      }

    }
  }
  setTimeout(updateFloor,200);
 }

 //向下移动
  
 function moveDown(){
  for(var j=0;j<4;j++){
    for(var i=2;i>=0;i--){
      if(nums[i][j]!=0){
        for(var k=3;k>i;k--){
          if(nums[k][j]==0 && noBlockVer(j,i,k,nums)){
            showMoveAnimation(i,j,k,j);
            nums[k][j]=nums[i][j];
            nums[i][j]=0;
            break;
          }else if(nums[k][j]==nums[i][j] && noBlockVer(j,i,k,nums) && !hasConf[k][j]){
            showMoveAnimation(i,j,k,j);
            nums[k][j]+=nums[i][j];
            nums[i][j]=0;
            score+=nums[k][j];
            updateScore(score);

            hasConf[k][j]=true;
            break;

          }
        }
      }
    }
  }
  setTimeout(updateFloor,200);
 }