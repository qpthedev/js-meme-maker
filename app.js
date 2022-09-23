const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraseBtn = document.getElementById("erase-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }

  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown() {
  isPainting = true;
}
function onMouseUp() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;

    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;

    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onResetClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick() {
  modeBtn.innerText = "Fill";
  isFilling = false;
  ctx.strokeStyle = "white";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = "";
  };
}

function onDoubleClick(event) {
  const text = textInput.value;

  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "40px Comic Sans MS";
    ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onResetClick);
eraseBtn.addEventListener("click", onEraseClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
