const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector('#result');
const endpoint = 12;
const select = [0, 0, 0, 0, 0];



function calResult() {
    var result = select.indexOf(Math.max(...select));
    // ...  -> 전개구문 선택한 배열을 펼치게 함
    return result;
}

function setResult() {
    let point = calResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'image/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
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
    setResult();
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
            var target = qnaList[qIdx].a[idx].type;
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1;
            }
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


// function downloadImg() {
//     document.addEventListener("DOMContentLoaded", function() {    
//         var btn = document.querySelector('.download');
    
//         btn.addEventListener("click", function() {
//             html2canvas(document.querySelector(".capture")).then(function(canvas) {
//                 var el = document.createElement("a");
//                 el.href = canvas.toDataURL("image/jpeg");
//                 el.download = '이미지.jpg'; // 다운로드 할 파일명 설정
//                 el.click();
//             });
//         });
//     });
// }

function clip(){
    var url = 'https://personaltest22.netlify.app/';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("링크가 복사되었습니다 😊")
 };

