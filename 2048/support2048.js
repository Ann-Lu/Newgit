function getPosTop(i) {
    return 20 + 120 * i;
}

function getPosLeft(j) {
    return 20 + 120 * j;
}

function getBackgroundColor(number) {
    switch (number) { //根据数字返回不同的颜色
        case 2:
            return "#FFB6C1";
            break;
        case 4:
            return "#FFC0CB ";
            break;
        case 8:
            return "#FFF0F5 ";
            break;
        case 16:
            return "#4B0082 ";
            break;
        case 32:
            return "#8A2BE2 ";
            break;
        case 64:
            return "#0000CD ";
            break;
        case 128:
            return "#00008B ";
            break;
        case 256:
            return "#708090 ";
            break;
        case 512:
            return " #1E90FF";
            break;
        case 1024:
            return "#F0F8FF ";
            break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number < 4)
        return "blue";
    else
        return "white";
}

function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++)
            if (board[i][j] == 0)
                return false;
            else
                return true;
    }
}

//判断是否能左移
function canMoveLeft(board) {

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            //左边是否没有数字
            //与左边数字是否相等
            if (board[i][j] !== 0) {
                if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1])
                    return true;
                else
                    return false;
            }
        }
    }

}



//移动路径无障碍