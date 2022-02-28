// crio as variaveis
var trex, trexCorrendo 
var bordas
var chao,imagemChao, chaoInvisivel

// serve para precarregar imagens/animacoes/sons
function preload(){
    trexCorrendo = loadAnimation('trex1.png', 'trex2.png', 'trex3.png')
    imagemChao = loadImage("ground2.png")
}


// serve pra fazer a configuracao inicial (só é executada 1 vez quando o jogo começar)
function setup() {
    createCanvas(600, 200)

    trex = createSprite(50, 120, 20, 50)
    trex.addAnimation('correndo', trexCorrendo)
    trex.scale = 0.7

    chao = createSprite(300,190,600,20)
    chao.addImage(imagemChao)
    chao.x = chao.width/2
    chaoInvisivel = createSprite(300,205,600,10)
    chaoInvisivel.visible = false

    bordas = createEdgeSprites()
}

// serve para fazer o jogo funcionar o tempo todo (é executada o tempo todo, infinitamente até eu parar o jogo)
function draw() {
    background('white')

    if (keyDown('space')) {
        trex.velocityY = -10
    }

    trex.velocityY = trex.velocityY + 0.5

    chao.velocityX = -4

    if(chao.x <0){
        chao.x = chao.width/2
    }

    trex.collide(chaoInvisivel)

    drawSprites()
}
