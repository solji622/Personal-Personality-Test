const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector('#result');
const endpoint = 9;
const select = [];

function calResult() {
    var pointArray = [
        {name: 'cool', value : 0, key : 0},
        {name: 'warm', value : 0, key : 1},
        {name: 'mild', value : 0, key : 2},
        {name: 'fiery', value : 0, key : 3},
        {name: 'frosty', value : 0, key : 4},
    ]
    
    for (let i = 0; i < endpoint; i++) {
        var target = qnaList[i].a[select[i]];
        for (let j = 0; j < target.type.length; j++) {
            for (let k = 0; k < pointArray.length; k++) {
                if (target.type[j] === pointArray[k].name) {
                    pointArray[k].value += 1;
                }
            }
        }
    }

    var resultArray = pointArray.sort(function (a,b) {
        if (a.value > b.value) {
            return -1;
        } else if (a.value < b.value) {
            return 1;
        } else {
            return 0;
        }
    });
    
    let resultWord = resultArray[0].key;
    return resultWord;
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => { 
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {    
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
    })

    calResult();
}

function addAns(answerText, qIdx, idx) {
    var a = document.querySelector('.ansBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList')
    answer.classList.add('.fadeIn');
    answer.classList.add('.fadeOut');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList')
        for(let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s"
        }
        setTimeout(() =>{
            select[qIdx] = idx;
            for(let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx)
        }, 450)
    }, false)
}

function goNext(qIdx) {
    if (qIdx === endpoint){
        goResult();
        return;
    } 

    var q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {
        addAns(qnaList[qIdx].a[i].answer, qIdx, i)
    }

    var status = document.querySelector('.statusBar');
    status.style.width = (100 / endpoint) * (qIdx+1) + '%';
}


function begin() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => { 
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {    
            main.style.display = "none";
            qna.style.display = "block";
        }, 500)
        let qIdx = 0;
        goNext(qIdx);
    }, 500);
}