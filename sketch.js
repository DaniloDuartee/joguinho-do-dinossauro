var trex, trexCorrendo ,trexMorto
var chao,imagemChao, chaoInvisivel
var cacto,imagemCacto1,imagemCacto2,imagemCacto3,imagemCacto4,imagemCacto5,imagemCacto6
var nuvem,imagemNuvem
var pontos = 0
var grupoDeCactos,grupoDeNuvens
var estadoDoJogo = "jogando"
var reiniciar, imagemReiniciar
var fimDeJogo, imagemFimDeJogo
var somPulo, somMorte, somCheckPoint
var estaNoAr = false
var larguraTela = window.innerWidth - 20

function criaNuvens(){
    if(frameCount%120===0){
        nuvem = createSprite(larguraTela + 20,30,50,30)
        nuvem.velocityX = -5 
        nuvem.y = Math.round( random (10,100))
        nuvem.addImage(imagemNuvem)
        nuvem.scale = 0.7
        nuvem.lifetime = larguraTela
        trex.depth = nuvem.depth
        trex.depth = trex.depth +1
        grupoDeNuvens.add(nuvem)
    }     
}

function criaCacto(){
    if(frameCount%150===0){
        cacto = createSprite(larguraTela + 20 ,170,20,50)
        cacto.velocityX = -(7 + pontos /100)
        cacto.scale = 0.7
        cacto.lifetime = larguraTela

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
    imagemChao = loadAnimation("ground2.png","ground2.png")
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
    somPulo = loadSound("jump.mp3")
    somCheckPoint = loadSound("checkPoint.mp3")
    somMorte = loadSound("die.mp3")

}

function setup() {
    createCanvas(larguraTela, 200)

    trex = createSprite(50, 120)
    trex.addAnimation('correndo', trexCorrendo)
    trex.addAnimation("morto",trexMorto)
    trex.scale = 0.7

    chao = createSprite(300,190)
    chao.addAnimation("chao",imagemChao)
    console.log(chao.width)
    chao.x = chao.width/2
    chaoInvisivel = createSprite(300,205,600,10)
    chaoInvisivel.visible = false

    grupoDeCactos = new Group()
    grupoDeNuvens = new Group()

    reiniciar = createSprite(larguraTela /2,120)
    reiniciar.addImage(imagemReiniciar)
    reiniciar.scale = 01
    reiniciar.visible = false
    fimDeJogo = createSprite(larguraTela /2,50)
    fimDeJogo.addImage(imagemFimDeJogo)
    fimDeJogo.visible = false
}
     
function draw() {
    background('white')

    text("Pontos: " + pontos,larguraTela -90,15)

    trex.velocityY = trex.velocityY + 0.5

    trex.collide(chaoInvisivel)
    
    if(estadoDoJogo === "jogando"){
        pontos = pontos +Math.round(frameRate()/60)

        if(pontos % 100 === 0){
            somCheckPoint.play()
        }

        if ((keyDown('space') || touches.length >0) && trex.y >= 70 && estaNoAr == false) {
            trex.velocityY = -10
            somPulo.play()
            estaNoAr = true
            touches = []
        } else if(estaNoAr && trex.y >= 120) {
            estaNoAr = false
        }
       

        chao.velocityX = -(7 + pontos /100)
        
        if(chao.x <larguraTela /2){
            chao.x = chao.width/2
        }

        criaNuvens()

        criaCacto()

        if(trex.isTouching(grupoDeCactos)){
            estadoDoJogo = "final"
            somMorte.play()
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
       
        if(mousePressedOver(reiniciar) || touches.length >0){
          recomecar()
          touches = []
        }
   } 

    drawSprites()
}
