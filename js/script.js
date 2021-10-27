const wrap = document.querySelector("#wrap");
const select_box = document.querySelector("#menu .inner #select");

const menu = document.querySelector("#menu");
const text = document.querySelector("#menu .inner .iput_count_exam p");

let is_wrong_exam = false;
let is_all_exam = false;
let exams_count;
let max_exam;

for (let i = 0; i < data.length; i++) {
    const option = document.createElement("option");
    option.innerText = data[i].chapter;
    option.value = i;
    select_box.appendChild(option);
}


// ==================== Main ====================
const all_exam_btn = document.querySelector("#main .inner .all_exam_btn");
const count_exam_btn = document.querySelector("#main .inner .count_exam_btn");


// functions
function setScreen(num) {
    wrap.style.marginLeft = (-100*num)+"%";
    input.value = 1;
}

function setText(count) {
    text.innerText = `총 ${count} 문제 입니다.`;
}

// 전체 과목 문제 풀기
all_exam_btn.addEventListener("click", () => {
    setScreen(1);
    menu.classList.add("all");
    
    let exam_count = 0;
    for (let i of data) {
        exam_count += i.exams.length;
    }
    setText(exam_count);
    max_exam = exam_count;
})
// 선택 과목 문제 풀기
count_exam_btn.addEventListener("click", () => {
    setScreen(1);
    menu.classList.remove("all");

    select_box.value = 0;
    let exam_count = data[0].exams.length;
    setText(exam_count);
    max_exam = exam_count;
})




// ==================== Menu ====================
const menu_back_btn = document.querySelector("#menu .inner .btn_back");
const check_wrong_exam = document.querySelector("#menu .inner .check_wrong_exam");
const check_all_exam = document.querySelector("#menu .inner .check_all_exam");
const start_btn = document.querySelector("#menu .inner .btn_start");
const input_count = document.querySelector("#menu .inner .iput_count_exam");
const input = document.querySelector("#menu .inner .iput_count_exam input");

function check_box(element) {
    if (element.querySelector("svg:nth-of-type(1)").classList.contains("on")) {
        element.querySelector("svg:nth-of-type(1)").classList.remove("on")
        element.querySelector("svg:nth-of-type(2)").classList.add("on")
        return true;
    } else {
        element.querySelector("svg:nth-of-type(1)").classList.add("on")
        element.querySelector("svg:nth-of-type(2)").classList.remove("on")
        return false;
    }
}

menu_back_btn.addEventListener("click", () => {
    setScreen(0);
})

check_wrong_exam.addEventListener("click", event => {
    is_wrong_exam = check_box(event.currentTarget);
})
check_all_exam.addEventListener("click", event => {
    is_all_exam = check_box(event.currentTarget);
    is_all_exam ? input_count.style.display = "none" : input_count.style.display = "block";
})

input.addEventListener("change", () => {
    if (input.value >= max_exam) {
        is_all_exam = check_box(check_all_exam);
        is_all_exam ? input_count.style.display = "none" : input_count.style.display = "block";
        input.value = 1;
    } else if (input.value <= 0) {
        input.value = 1;
    }
})
select_box.addEventListener("change", () => {
    let exam_count = data[select_box.value].exams.length;
    setText(exam_count);
    max_exam = exam_count;
})

start_btn.addEventListener("click", () => {
    is_all_exam ? exams_count = max_exam : exams_count = parseInt(input.value);
    setScreen(2);
})




// ==================== Exam ====================
const exam_back_btn = document.querySelector("#exam .inner .btn_back");

