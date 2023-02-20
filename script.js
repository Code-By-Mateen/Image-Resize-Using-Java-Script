const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn ");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0]; //getting first user selected file
    if(!file) return; // return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file); //passing selected file URL tp preview img src
    previewImg.addEventListener("load", () => { //once image loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper"). classList.add("active");
    });
}

widthInput.addEventListener("keyup", () => {
    // getting height according to the ratio checkbox status
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
    // getting width according to the ratio checkbox status
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : heightInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    // setting canvas height & width according to the input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/jpeg",imgQuality);
    a.download = new Date().getTime();
    a.click();
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change",loadFile);
uploadBox.addEventListener("click", () => fileInput.click());