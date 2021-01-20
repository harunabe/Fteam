let sw = [], counter = [], num = [];
let level = 1;
let speed = 400;
let count = document.querySelectorAll("#slot_1 > p, #slot_2 > p, #slot_3 > p")

window.onload = function(){
    slot();
    // RESTARTボタンでスロットを回す
    document.getElementById("restart").addEventListener("click", function(){
        if(sw[0] && sw[1] && sw[2]){
            if(num[0] == num[1] && num[0] == num[2]){
                upLevel();
            }else{
                downLevel();
            }
            for(let i = 0; i < 3; i++){
                count[i].innerHTML = parseInt(Math.random() * 10);
            }
            slot();
        }
    });

    // STOPボタンでスロットを止める
    for(let i = 0; i < 3; i++){
        document.getElementById("stop_" + (i + 1)).addEventListener("click", function(){
            clearInterval(counter[i]);
            sw[i] = true;
            if(sw[0] && sw[1] && sw[2]){
                setScore(num);
            }
        });
    }
}

function slot(){
    // 初期化
    for(let i = 0; i < 3; i++){
        num[i] = parseInt(count[i].innerHTML);
        sw[i] = false;
    }

    for(let i = 0; i < 3; i++){
        // カウントアップ
        counter[i] = setInterval(function(){
            num[i] = (num[i] + 1) % 10
            count[i].innerHTML = num[i];
        }, speed);
    }
}

//スコアアップ
function setScore(num){
    if(num[0] == num[1] && num[0] == num[2]){
        const strScore = document.getElementById("score");
        let numScore = parseInt(strScore.innerHTML.match(/[0-9]{1,}/));
        numScore += 10 * level;
        strScore.innerHTML = "SCORE:" + numScore;
    }   
}

//レベルアップ
function upLevel(){
    //マックススピードに達していなかったら
    if(speed > 5){
        level++;
        const strLevel = document.getElementById("level");
        let numLevel = parseInt(strLevel.innerHTML.match(/[0-9]{1,}/));
        strLevel.innerHTML = "Lv." + ++numLevel;
        //スピードを1割上げる
        speed *= 0.9;
    }
}

//レベルダウン
function downLevel(){
    //レベル1より下げない
    if(level > 1){
        level--;
        const strLevel = document.getElementById("level");
        let numLevel = parseInt(strLevel.innerHTML.match(/[0-9]{1,}/));
        strLevel.innerHTML = "Lv." + --numLevel;
        //スピードを1割下げる
        speed /= 0.9;
    }
}