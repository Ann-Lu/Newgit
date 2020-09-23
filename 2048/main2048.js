var board = new Array(); //一维数组
var score = 0;

$(document).ready(function () {
    restart(); //DOM文档加载完之后启动
});

function restart() {
    //初始化棋盘格：清空数字格
    init();
    //随机生成两个数字2或4
    generateOneNumber();
    generateOneNumber();

}

//初始化棋盘格
function init() {

    //底层UI:根据grid-cell（i，j）放置16个格子
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top', getPosTop(i));
            gridCell.css('left', getPosLeft(j));
        }
    //把board变成二维数组，遍历每个小格，初始化为0
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++)
            board[i][j] = 0;
    }
    //更新底层数据在界面上的显示
    updateBoardView();
}
//每次开始新游戏和产生移动操作时，根据board数据更新上层显示
function updateBoardView() {
    $(".number-cell").remove(); //清空界面的数字格元素
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //对于每个底层格子，添加隐藏的数字格元素
            $("#container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
            //对单个数字格添加显示样式
            var theNumberCell = $('number-cell-' + i + '-' + j);
            //如果底层数据为0，则数字格在底层格子中间，大小为0（以便后面使用显示动画）
            if (board[i][j] = 0) {
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css("top", getPosTop(i) + 50);
                theNumberCell.css("left", getPosLeft(j) + 50);
            }
            //如果底层数据不为零，根据board值显示对应的样式
            else {
                theNumberCell.css("width", "100px");
                theNumberCell.css("height", "100px");
                theNumberCell.css("top", getPosTop(i));
                theNumberCell.css("left", getPosLeft(j));
                theNumberCell.css("background-color", getBackgroundColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                theNumberCell.css("color", getNumberColor(board[i][j]));
            }
        }
    }
}

//随机生成数字
function generateOneNumber() {
    if (noSpace(board)) //判断是否有空位
        return false;
    else
        //选择一个随机位置
        var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));

    //死循环判断随机位置上是否有占位
    //有空位时跳出循环
    while (true) {
        if (board[randX][randY] == 0)
            break;
        else
            var randX = parseInt(Math.floor(Math.random() * 4));
        var randY = parseInt(Math.floor(Math.random() * 4));
    }

    //生成一个随机数
    // 利用随机数（0，1）判断语句随机产生50%的2，4
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置上显示随机数
    board[randX][randY] = randNumber;
    showNumberAnimation(randX, randY, randNumber);
    return true;
}

//游戏交互
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) { //确实执行向左操作
                generateOneNumber();
                isGameOver();
            }
            break;
        case 38: //up
            if (moveUp()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 39: //right
            if (moveRight()) {
                generateOneNumber();
                isGameOver();

            }
            break;
        case 40: //down
            if (moveDown()) {
                generateOneNumber();
                isGameOver();

            }
            break;
        default: //其他值不响应
            break;
    }
});

//定义向左移动函数
function moveLeft() {
    //判断是否能左移
    if (!canMoveLeft(board))
        return false;
    else
        //对每个数字的左侧位置进行判断，看是否可以落脚：移动几个或者是否叠加 
        for (var i = 0; i < 4; i++)
            for (var j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    for (var k = 0; k < j; k++) {

                        //判断落脚位置为空，移动路径没有障碍
                        if (board[i][k] == 0 && noBarrierX(i, k, j, board)) {
                            //move
                            showMoveAnimation(i, k, j);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        //与落脚位置数字相等，移动路径没有障碍
                        else if (board[i][k] != 0 && noBarrierX(i, k, j, board)) {
                            //move
                            showMoveAnimation(i, k, j);
                            //add
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                    }
                }
            }
    setTimeout("updateBoardView()", 200);
    return true;
}