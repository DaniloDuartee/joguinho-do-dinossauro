var trex, trexCorrendo ,trexMorto
var chao,imagemChao, chaoInvisivel
var cacto,imagemCacto1,imagemCacto2,imagemCacto3,imagemCacto4,imagemCacto5,imagemCacto6
var nuvem,imagemNuvem
var pontos = 0
var grupoDeCactos,grupoDeNuvens
var estadoDoJogo = "jogando"
var reiniciar, imagemReiniciar
var fimDeJogo, imagemFimDeJogo

function criaNuvens(){
    if(frameCount%120===0){
        nuvem = createSprite(620,30,50,30)
        nuvem.velocityX = -2 
        nuvem.y = Math.round( random (10,100))
        nuvem.addImage(imagemNuvem)
        nuvem.scale = 0.7
        nuvem.lifetime = 600
        trex.depth = nuvem.depth
        trex.depth = trex.depth +1
        grupoDeNuvens.add(nuvem)
    }     
}

function criaCacto(){
    if(frameCount%150===0){
        cacto = createSprite(580,170,20,50)
        cacto.velocityX = -(6 + pontos /100)
        cacto.scale = 0.7
        cacto.lifetime = 600

        var tipoCacto = Math.round(random(1,6))
        switch (tipoCacto) {
            case 1:
                cacto.addImage(imagemCacto1)  
                break;
            case 2:
                cacto.addImage(imagemCacto2)  
                break;
            case 3:
                cacto.addImage(imagemCacto3)  
                break;
            case 4:
                cacto.addImage(imagemCacto4)  
                break
            case 5:
                cacto.addImage(imagemCacto5) 
                break
            case 6:
                cacto.addImage(imagemCacto6)  
                break;    
                
            default:
                break;
        }

        grupoDeCactos.add(cacto)
    }
}

function recomecar (){
    estadoDoJogo = "jogando"
    pontos = 0
    trex.changeAnimation('correndo', trexCorrendo)
    grupoDeCactos.destroyEach()
    grupoDeNuvens.destroyEach()
    fimDeJogo.visible = false
    reiniciar.visible = false
}

// serve para precarregar imagens/animacoes/sons
function preload(){
    trexCorrendo = loadAnimation('trex1.png', 'trex2.png', 'trex3.png')
    imagemChao = loadImage("ground2.png")
    imagemNuvem = loadImage("cloud.png")
    imagemCacto1 = loadImage("obstacle1.png")
    imagemCacto2 = loadImage("obstacle2.png")
    imagemCacto3 = loadImage("obstacle3.png")
    imagemCacto4 = loadImage("obstacle4.png")
    imagemCacto5 = loadImage("obstacle5.png") 
    imagemCacto6 = loadImage("obstacle6.png")
    trexMorto = loadAnimation("trex_collided.png")
    imagemFimDeJogo = loadImage("gameOver.png")
    imagemReiniciar = loadImage("restart.png")
}

function setup() {
    createCanvas(600, 200)

    trex = createSprite(50, 120)
    trex.addAnimation('correndo', trexCorrendo)
    trex.addAnimation("morto",trexMorto)
    trex.scale = 0.7

    chao = createSprite(300,190)
    chao.addImage(imagemChao)
    chao.x = chao.width/2
    chaoInvisivel = createSprite(300,205,600,10)
    chaoInvisivel.visible = false

    grupoDeCactos = new Group()
    grupoDeNuvens = new Group()

    reiniciar = createSprite(300,100)
    reiniciar.addImage(imagemReiniciar)
    reiniciar.scale = 0.7
    reiniciar.visible = false
    fimDeJogo = createSprite(300,50)
    fimDeJogo.addImage(imagemFimDeJogo)
    fimDeJogo.visible = false
}
     
function draw() {
    background('white')

    text("Pontos: " + pontos,520,15)

    trex.velocityY = trex.velocityY + 2

    trex.collide(chaoInvisivel)
    
    if(estadoDoJogo === "jogando"){
        pontos = pontos +Math.round(frameRate()/60)

    if (keyDown('space') && trex.y >= 80) {
        trex.velocityY = -15
    }

    chao.velocityX = -(6 + pontos /100)
    
    if(chao.x <0){
        chao.x = chao.width/2
    }

    criaNuvens()

    criaCacto()

    if(trex.isTouching(grupoDeCactos)){
        estadoDoJogo = "final"
    }

   } else if(estadoDoJogo === "final"){
        chao.velocityX = 0

        grupoDeCactos.setVelocityXEach(0)

        grupoDeNuvens.setVelocityXEach(0)
        grupoDeCactos.setLifetimeEach(-1)
        grupoDeNuvens.setLifetimeEach(-1)

        trex.changeAnimation("morto",trexMorto)
       
        reiniciar.visible = true
        fimDeJogo.visible = true
       
        if(mousePressedOver(reiniciar)){
          recomecar()

        }

   } 

    drawSprites()
}
