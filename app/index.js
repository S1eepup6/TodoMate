var currentTitle = document.getElementById('current-year-month');
var calendarBody = document.getElementById('calendar-body');
var today = new Date();
var first = new Date(today.getFullYear(), today.getMonth(),1);
var dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
var notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
var pageFirst = first;
var pageYear;
var mainTodayDay = document.getElementById('main-day');
var mainTodayDate = document.getElementById('main-date');

if(first.getFullYear() % 4 === 0){
    pageYear = leapYear;
}else{
    pageYear = notLeapYear;
}

function showCalendar(){
    let monthCnt = 100;
    let cnt = 1;
    for(var i = 0; i < 6; i++){
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);   
        for(var j = 0; j < 7; j++){
            var todayKey = today.getFullYear() + '' + today.getMonth()+ '';
            if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]){
                var $td = document.createElement('td');
                $tr.appendChild($td);
            }else{
                if (cnt < 10)   todayKey = todayKey + '0' + cnt + 'S';
                else            todayKey = todayKey + cnt + 'S';
                const stresses = localStorage.getItem(todayKey)
                if (stresses === null)  var stressVal = 0;
                else {
                    var stressVal = stresses.split(',').reduce(function add(sum, val) {
                        return Number(sum) + Number(val);
                    }, 0);
                }

                var $td = document.createElement('td');
                $td.textContent = cnt;
                $td.setAttribute('id', cnt);
                $td.setAttribute('id', cnt);
                
                if (stressVal <= 0) $td.setAttribute('class', 'stressDay0');
                else if (stressVal <= 10) $td.setAttribute('class', 'stressDay1');
                else $td.setAttribute('class', 'stressDay2');

                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
        calendarBody.appendChild($tr);
    }
}
showCalendar();

function removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}

function prev(){
    inputBox.value = "";
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function(e){
      e.remove();
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function(e1){
      e1.remove();
    });
    if(pageFirst.getMonth() === 1){
        pageFirst = new Date(first.getFullYear()-1, 12, 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear(), first.getMonth()-1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear();
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
}

function next(){
    inputBox.value = "";
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function(e){
      e.remove();
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function(e1){
      e1.remove();
    });
    if(pageFirst.getMonth() === 12){
        pageFirst = new Date(first.getFullYear()+1, 1, 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear(), first.getMonth()+1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear();
    removeCalendar();
    showCalendar(); 
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');  
    clickStart();
    reshowingList();
}

currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
function showMain(){
    mainTodayDay.innerHTML = dayList[today.getDay()];
    mainTodayDate.innerHTML = today.getDate();
}
showMain();

var clickedDate1 = document.getElementById(today.getDate());
clickedDate1.classList.add('active');
var prevBtn = document.getElementById('prev');
var nextBtn = document.getElementById('next');
prevBtn.addEventListener('click',prev);
nextBtn.addEventListener('click',next);
var tdGroup = [];
function clickStart(){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click',changeToday);
    }
}
function changeToday(e){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        if(tdGroup[i].classList.contains('active')){
            tdGroup[i].classList.remove('active');
        }
    }
    clickedDate1 = e.currentTarget;
    clickedDate1.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
    showMain();
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    reshowingList();
}
clickStart();
function reshowingList(){
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    keyStressVal = keyValue + 'S';
    todoList[keyValue] = localStorage.getItem(keyValue);
    stressList[keyStressVal] = localStorage.getItem(keyStressVal);

    tmpStress = {}

    if(todoList[keyValue] === undefined || todoList[keyValue] === null || todoList[keyValue].length === 0){
        inputList.textContent = '';
        todoList[keyValue] = [];
        stressList[keyStressVal] = [];
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
          e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
          e1.remove();
        });
    }
    else{
        todoList[keyValue] = todoList[keyValue].split(',')
        stressList[keyStressVal] = stressList[keyStressVal].split(',')

        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
            e.remove();
            });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
            e1.remove();
            });
        
        for(var i = 0; i < todoList[keyValue].length; i++){
            dataCnt ++;
            tmpStress[dataCnt+keyValue] = stressList[keyStressVal][i]

            var $div = document.createElement('div');
            $div.setAttribute('id', dataCnt+keyValue);
            $div.setAttribute('class', 'stress' + tmpStress[dataCnt+keyValue]);
            $div.textContent = todoList[keyValue][i];

            var $btn = document.createElement('button');
            $btn.setAttribute('type', 'button'); 
            $btn.setAttribute('id', dataCnt+keyValue);
            $btn.setAttribute('class', 'del-data');
            $btn.textContent = delText;

            var $stressUp = document.createElement('button');
            $stressUp.textContent = '+';
            $stressUp.setAttribute('type', 'button'); 
            $stressUp.setAttribute('id', dataCnt+keyValue);
            $stressUp.setAttribute('class', "del-data");
            
            var $stressDn = document.createElement('button');
            $stressDn.textContent = '-';
            $stressDn.setAttribute('type', 'button'); 
            $stressDn.setAttribute('id', dataCnt+keyValue);
            $stressDn.setAttribute('class', "del-data");
            
            inputList.appendChild($div);
            inputList.appendChild($stressUp);
            inputList.appendChild($stressDn);
            inputList.appendChild($btn);

            $div.addEventListener('click',checkList);
            $btn.addEventListener('click',deleteTodo);
            $stressUp.addEventListener('click',stressUp);
            $stressDn.addEventListener('click',stressDn);
            inputBox.value = '';
        }
    }

}

var inputBox = document.getElementById('input-box');
var inputDate = document.getElementById('input-data');
var inputList = document.getElementById('input-list');
inputDate.addEventListener('click',addTodoList);
var delText = 'X';
var dataCnt = 0;
var keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
var keyStressVal = keyValue + 'S';
var tmpStress = {}
let todoList = [];
let stressList = [];
todoList[keyValue] = [];
stressList[keyStressVal] = [];
reshowingList();

function addTodoList(){
    const inputValue = inputBox.value
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    keyStressVal = keyValue + 'S';
    todoList[keyValue] = [];
    stressList[keyStressVal] = [];
    reshowingList();

    dataCnt++;

    var $div = document.createElement('div');
    $div.setAttribute('id', dataCnt+keyValue);
    $div.setAttribute('class', 'stress0');
    $div.textContent = inputBox.value;

    var $btn = document.createElement('button');
    $btn.setAttribute('type', 'button'); 
    $btn.setAttribute('id', dataCnt+keyValue);
    $btn.setAttribute('class', "del-data");
    $btn.textContent = delText;

    var $stressUp = document.createElement('button');
    $stressUp.textContent = '+';
    $stressUp.setAttribute('type', 'button'); 
    $stressUp.setAttribute('id', dataCnt+keyValue);
    $stressUp.setAttribute('class', "del-data");

    var $stressDn = document.createElement('button');
    $stressDn.textContent = '-';
    $stressDn.setAttribute('type', 'button'); 
    $stressDn.setAttribute('id', dataCnt+keyValue);
    $stressDn.setAttribute('class', "del-data");
    
    inputList.appendChild($div);
    inputList.appendChild($stressUp);
    inputList.appendChild($stressDn);
    inputList.appendChild($btn);

    todoList[keyValue].push(inputValue);
    stressList[keyStressVal].push('0');

    localStorage.setItem(keyValue, todoList[keyValue]);
    localStorage.setItem(keyStressVal, stressList[keyStressVal]);

    inputBox.value = '';
    $div.addEventListener('click',checkList);
    $btn.addEventListener('click',deleteTodo);
    $stressUp.addEventListener('click',stressUp);
    $stressDn.addEventListener('click',stressDn);
    reshowingList();
}

function checkList(e){
    e.currentTarget.classList.add('checked');
}

function deleteTodo(){
    const targetText = document.getElementById(this.id).textContent
    const idx = todoList[keyValue].indexOf(targetText)
    console.log(idx)
    if (idx > -1) {
        todoList[keyValue].splice(idx, 1);
        stressList[keyValue].splice(idx, 1);
    }
    localStorage.setItem(keyValue, todoList[keyValue]);
    localStorage.setItem(keyStressVal, todoList[keyValue]);

    document.getElementById(this.id).remove();
    document.getElementById(this.id).remove();
    document.getElementById(this.id).remove();
    this.remove();
}

function stressUp(){
    var $divTarget = document.getElementById(this.id);
    tmpStress[this.id] = Number(tmpStress[this.id]) + 1;
    if (tmpStress[this.id] > 5)    tmpStress[this.id] = 5;
    $divTarget.setAttribute('class', 'stress' + tmpStress[this.id]);

    var tmpStressList = []
    for (var key in tmpStress) {
        tmpStressList.push(tmpStress[key])
    }
    localStorage.setItem(keyStressVal, tmpStressList);
}

function stressDn(){
    var $divTarget = document.getElementById(this.id);
    tmpStress[this.id] = Number(tmpStress[this.id]) - 1
    if (tmpStress[this.id] < 0)    tmpStress[this.id] = 0;
    $divTarget.setAttribute('class', 'stress' + tmpStress[this.id]);

    var tmpStressList = []
    for (var key in tmpStress) {
        tmpStressList.push(tmpStress[key])
    }
    localStorage.setItem(keyStressVal, tmpStressList);
}