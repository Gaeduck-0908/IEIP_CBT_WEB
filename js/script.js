const wrap = document.querySelector("#wrap");
const select_box = document.querySelector("#menu .inner #select");

const menu = document.querySelector("#menu");
const text = document.querySelector("#menu .inner .iput_count_exam p");

let datas = data;

let is_exam_type; // 0: 전체 과목 | 1: 선택 과목
let is_wrong_exam = false;
let is_all_exam = false;
let exams_count;
let max_exam;

let count = 0;
let chapter_index = 0;
let exam_index = 0;
let answer_count = 0;
let return_exam_count = 0;

for (let i = 0; i < data.length; i++) {
    const option = document.createElement("option");
    option.innerText = data[i].chapter;
    option.value = i;
    select_box.appendChild(option);
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length; i; i -= 1) { 
        j = Math.floor(Math.random() * i); 
        x = a[i - 1]; 
        a[i - 1] = a[j]; 
        a[j] = x; 
    } 
}


// ==================== Main ====================
const all_exam_btn = document.querySelector("#main .inner .all_exam_btn");
const count_exam_btn = document.querySelector("#main .inner .count_exam_btn");


// functions
// 씬 설정
function setScreen(num) {
    wrap.style.marginLeft = (-100*num)+"%";
    input.value = 1;
}
// 텍스트 설정
function setText(count) {
    text.innerText = `총 ${count} 문제 입니다.`;
}

// Events
// 전체 과목 문제 풀기
all_exam_btn.addEventListener("click", () => {
    setScreen(1);
    menu.classList.add("all");
    is_exam_type = 0;

    let exam_count = 0;
    for (let data of datas) {
        exam_count += data.exams.length;
    }

    setText(exam_count);
    max_exam = exam_count;
    datas = data;
})
// 선택 과목 문제 풀기
count_exam_btn.addEventListener("click", () => {
    setScreen(1);
    menu.classList.remove("all");
    is_exam_type = 1;

    select_box.value = 0;
    let exam_count = datas[0].exams.length;

    setText(exam_count);
    max_exam = exam_count;
    datas = data;
})




// ==================== Menu ====================
const menu_back_btn = document.querySelector("#menu .inner .btn_back");
const check_wrong_exam = document.querySelector("#menu .inner .check_wrong_exam");
const check_all_exam = document.querySelector("#menu .inner .check_all_exam");
const start_btn = document.querySelector("#menu .inner .btn_start");
const input_count = document.querySelector("#menu .inner .iput_count_exam");
const input = document.querySelector("#menu .inner .iput_count_exam input");

// functions
// checkBox 토글 넣기
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

// Events
// 메뉴에서 뒤로가기 버튼
menu_back_btn.addEventListener("click", () => {
    setScreen(0);
})
// 틀린문제 다시 풀기 체크박스
check_wrong_exam.addEventListener("click", event => {
    is_wrong_exam = check_box(event.currentTarget);
})
// 모든문제 풀기 체크박스
check_all_exam.addEventListener("click", event => {
    is_all_exam = check_box(event.currentTarget);
    is_all_exam ? input_count.style.display = "none" : input_count.style.display = "block";
})
// 개수 입력칸 변경 이벤트
input.addEventListener("change", () => {
    if (input.value >= max_exam) {
        is_all_exam = check_box(check_all_exam);
        is_all_exam ? input_count.style.display = "none" : input_count.style.display = "block";
        input.value = 1;
    } else if (input.value <= 0) {
        input.value = 1;
    }
})
// 과목 선택박스 변경 이벤트
select_box.addEventListener("change", () => {
    let exam_count = datas[select_box.value].exams.length;
    setText(exam_count);
    max_exam = exam_count;
})
// 시작 버튼 이벤트
start_btn.addEventListener("click", () => {
    // 변수 리셋
    is_all_exam ? exams_count = max_exam : exams_count = parseInt(input.value);
    count = 0;
    chapter_index = 0;
    exam_index = 0;
    answer_count = 0;
    return_exam_count = 0;

    // 전체 과목일 경우
    if (is_exam_type == 0) {
        shuffle(datas);
        for (let data of datas) {
            shuffle(data.exams);
        }
    // 선택 과목일 경우
    } else {
        chapter_index = select_box.value;
        shuffle(datas[chapter_index].exams);
    }

    exam_num.innerText = `Q.${count + 1}`;
    setExam(exam_box);
    setScreen(2);
})




// ==================== Exam ====================
const exam_back_btn = document.querySelector("#exam .inner .btn_back");
const answer_btn = document.querySelector("#exam .inner div button");
const exam_num = document.querySelector("#exam h1");

const exam_box = document.querySelector("#exam .inner p");
const exam_answer = document.querySelector("#exam .inner div input");

// functions
// 과목 문제를 다 풀경우 다음 과목으로 변경
function check_exam() {
    if (exam_index == datas[chapter_index].exams.length) {
        chapter_index++;
        exam_index = 0;
    }
}
// 문제 텍스트 표시
function setExam(element) {
    element.innerText = datas[chapter_index].exams[exam_index].exam;
}
// 다음 시험으로 변경
function nextExam() {
    exam_index++;
    check_exam();

    setExam(exam_box);
}
// 정답 오답 표시 지우기
function icon_reset() {
    for (let el of document.querySelectorAll("#exam .inner .isWrongAnswer svg")) {
        el.classList.remove("on");
    }
}
// 정답 오답 표시 띄우기
function icon_answer(answer) {
    const icon = document.querySelectorAll("#exam .inner .isWrongAnswer svg");
    if(answer) {
        icon[0].classList.add("on");
        return true;
    } else {
        icon[1].classList.add("on");
        return false;
    }
}
// 확인 버튼 이벤트 핸들러
function answer_handler() {
    const answer_count_box = document.querySelector("#result .inner p:nth-of-type(1)");
    const answer_percent_box = document.querySelector("#result .inner p:nth-of-type(2)");

    const input_answer = exam_answer.value.replace(/ /g, "").toLowerCase();
    const real_answer = datas[chapter_index].exams[exam_index].answer.replace(/ /g, "").toLowerCase();

    // 버튼의 글자가 다음일 경우
    if (answer_btn.innerText == "다음") {
        // 모든 문제를 풀었을 경우
        if (exams_count == count) {
            if(is_wrong_exam) {
                answer_count_box.innerText = `문제 개수 : ${count}`;
                answer_percent_box.innerText = `재시도 횟수 : ${return_exam_count}`;

            } else {
                answer_count_box.innerText = `정답 개수 : ${answer_count} / ${count}`;
                answer_percent_box.innerText = `정답률 : ${(answer_count/count).toFixed(2)*100 + "%"}`;
            }
            setScreen(3);
        }

        // 다음 문제로 넘어가고 버튼을 확인으로 변경
        exam_num.innerText = `Q.${count + 1}`;
        answer_btn.innerText = "확인";
        exam_answer.style.color = "#333";
        exam_answer.value = "";
        icon_reset();
        nextExam();

    } else if (answer_btn.innerText == "다시") {
        icon_reset();
        setExam(exam_box);
        exam_answer.style.color = "#333";
        exam_answer.value = "";
        answer_btn.innerText = "확인";
    
    // 정답 입력칸이 빈칸이 아닐 경우
    } else if (input_answer != "") {
        // 정답을 맞췄을 경우
        if (icon_answer(input_answer == real_answer)) {
            count++;
            answer_count++;
            answer_btn.innerText = "다음";
        // 정답을 못맞췄을 경우
        } else {
            exam_answer.style.color = "red";
            exam_answer.value = datas[chapter_index].exams[exam_index].answer;

            if (is_wrong_exam) {
                return_exam_count++;
                answer_btn.innerText = "다시";
            } else {
                answer_btn.innerText = "다음";
                count++;
            }
        }

        
    }
}
// 문제에서 뒤로가기 버튼 이벤트
exam_back_btn.addEventListener("click", () => {
    setScreen(1);
})
// 답안 입력칸 이벤트
answer_btn.addEventListener("click", answer_handler);
exam_answer.addEventListener("keypress", () => {
    if (window.event.keyCode == 13) {
        answer_handler();
    }
})




// ==================== Result ====================
const reset_btn = document.querySelector("#result .inner button");

// 처음으로 버튼 누르면 메인으로 이동
reset_btn.addEventListener("click", () => {
    setScreen(0);
})