var img;
var upImg;
var downImg;
var forwardImg;
var backImg;
var leftImg;
var rightImg;

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);

    img = loadImage('https://i.imgur.com/pnksEIu.jpeg');
    upImg = loadImage('https://i.imgur.com/f5xrXQt.jpeg');
    downImg = loadImage('https://i.imgur.com/Wt1NBEp.jpg');
    forwardImg = loadImage('https://i.imgur.com/UiZy1Mt.jpeg');
    backImg = loadImage('https://i.imgur.com/zG9o2mZ.jpeg');
    leftImg = loadImage('https://i.imgur.com/BfTWID7.jpeg');
    rightImg = loadImage('https://i.imgur.com/jOLRhb5.jpeg');

    //images of both the asl sign and the number
    zeroImg = loadImage('https://i.imgur.com/4VPaCB1.png');
    fourImg = loadImage('https://i.imgur.com/3RC9xik.png');

    //images of just the number
    zeroImgur = loadImage('https://i.imgur.com/hlsaExM.png');
    fourImgur = loadImage('https://i.imgur.com/P01AH57.png');
}

