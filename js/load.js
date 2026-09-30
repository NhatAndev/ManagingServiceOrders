const DURATION = 1600;

const titleContainer = document.getElementById("loading-title");
const percentEl = document.getElementById("percent");

// Định nghĩa 3 cụm chữ với màu sắc tương ứng
const parts = [
    { text: "Managing", type: "purple-neon" },
    { text: " ", type: "space" },
    { text: "Service", type: "magenta-neon" },
    { text: " ", type: "space" },
    { text: "Order", type: "pink-neon" }
];

titleContainer.innerHTML = "";
const charSpans = [];

// Tạo thẻ span và gán class màu tương ứng
parts.forEach(part => {
    for (let char of part.text) {
        const span = document.createElement("span");
        if (char === " ") {
            span.classList.add("space");
            span.innerHTML = "&nbsp;";
        } else {
            span.textContent = char;
            span.classList.add(part.type);
        }
        titleContainer.appendChild(span);
        charSpans.push(span);
    }
});

let start = null;
let redirected = false;

function animateProgress(timestamp) {
    if (!start) start = timestamp;

    let progress = timestamp - start;
    let percent = Math.min((progress / DURATION) * 100, 100);

    // Cập nhật %
    percentEl.innerText = Math.floor(percent);

    // Bật sáng ký tự
    let activeLettersCount = Math.floor((percent / 100) * charSpans.length);

    charSpans.forEach((span, index) => {
        if (index < activeLettersCount) {
            span.classList.add("active");
        } else {
            span.classList.remove("active");
        }
    });

    // Done → Redirect
    if (percent >= 100) {
        if (!redirected) {
            redirected = true;
            window.location.href = "../html/index.html";
        }
        return;
    }

    requestAnimationFrame(animateProgress);
}

requestAnimationFrame(animateProgress);