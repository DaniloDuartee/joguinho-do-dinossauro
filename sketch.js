var caixa;

function setup() {
  createCanvas(540,540);
  caixa = createSprite(200,200,30,30)
}

function draw() {
background(30);


if(keyDown("right_arrow")){
    background("red")
    caixa.x = caixa.x +5
}

if(keyDown("left_arrow")){
  caixa.x = caixa.x -5
}

if(keyDown("down_arrow")){
  caixa.y = caixa.y +5
}

  if(keyDown("up_arrow")){
  caixa.y = caixa.y -5
}

  drawSprites();
}




