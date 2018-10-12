var documentWidth = document.documentElement.clientWidth;
var containerWidth = documentWidth*0.92; //容器宽度
var  aa= documentWidth*0.18;
var  bb=documentWidth*0.04;

// 获取距上距离
function getTop(i,j){
	return bb+(aa+bb)*i;
}
// 获取距左距离
function getLeft(i,j){
	return bb+(aa+bb)*j;
}



//获取数字背景颜色
function getNumberBgColor(num){
	switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

//获取数字颜色
function getNumberColor(num){
	if(num<=4){
		return '#776e65';
	}else{
		return '#fff';
	}
}


function noSpace(nums){
  for(var i=0;i<4;i++){

  	for(var j=0;j<4;j++){

  		if(nums[i][j]==0){
  			return false;
  		}	
  	}
  }

   return true;

}

// 判断左边有没有空间


function canMoveLeft(nums){
   for(var i=0;i<4;i++){
   	 for(var j=0;j<4;j++){
   	 	if(nums[i][j]!=0){
   	 		if(nums[i][j-1]==0||nums[i][j-1]==nums[i][j]){
   	 			return true;
   	 		}  
   	 	}
   	  }
   }
   return false;

}

// 判断右边有没有空间
function canMoveRight(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++ ){
			if(nums[i][j]!=0){
				if(nums[i][j+1]==0 || nums[i][j+1]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp(nums){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i-1][j]==0 || nums[i-1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;

}

function canMoveDown(nums){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i+1][j]==0 || nums[i+1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

// 判断水平方向是否有障碍物

function noBlockHor(row,col1,col2,nums){
	for(var i=col1+1;i<col2;i++){
		if(nums[row][i]!=0){
			return false;
		}
	}
	return true;
}

//判断垂直方向上是否有障碍物
 function noBlockVer(col,row1,row2,nums){
 	for(var i=row1+1;i<row2;i++){
 		if(nums[i][col]!=0){
 			return false;
 		}
 	}
 	return true;


 }



//更新分数
function updateScore(score){
	$("#score").text(score);

}



function cannotMove(nums){

 if(canMoveLeft(nums)||canMoveUp(nums)||canMoveRight(nums)||canMoveDown(nums)){
 	return false;
 }
    return true;
}


function gameOver(){

	if(noSpace(nums)&&cannotMove(nums)){
		if(score<6666){
			alert('Game Over!你好像不太行');
		}else{
			alert('充值使你更强!')
		}
		

	}
}

