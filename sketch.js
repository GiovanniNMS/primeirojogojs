//Variáveis da Bolinha
let xBolinha = 400;
let yBolinha = 300;
let dBolinha = 30;
let rBolinha = dBolinha/2;

let velocidadeXbolinha = 8;
let velocidadeYbolinha = 8;

//Variáveis da minha raquete
let xRaquete =5;
let yRaquete = 250;
let wRaquete = 10;
let hRaquete = 100;
let colisao = false

//Variáveis raquete Oponente
let xRaqueteOp = 1350;
let yRaqueteOp = 300;
let wRaqueteOp = 10;
let hRaqueteOp = 100;
let velocidadeYRaqueteOp = yBolinha;
let chanceDeErrar = 0;

//Variáveis do Placar
let meuPlacar = 0
let placarOp  = 0

//Variáveis de som
let trilha;
let raquetada;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3")
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
  
}

function setup() {
  createCanvas(1366, 617);
  trilha.loop();
}

function draw() {
  background(0);
  desenhaBolinha();
  mexeBolinha();
  verificaBorda();
  desenharRaquete();
  movimentaMinhaRaquete();
  //toqueNaRaquete();
  desenharRaqueteOp(); 
  //movimentoRaqueteOp();
  colisaoRaqueteLibraries(xRaquete, yRaquete);
  colisaoRaqueteLibraries(xRaqueteOp, yRaqueteOp);
  incluirPlcar();
  pontosJogo();
  multiPlayer();
  calculoChanceDeErrar();
  bolinhaNaoPrendeNaRaquete();
  linhaDoMeio();
}
function desenhaBolinha(){
  circle(xBolinha, yBolinha, dBolinha);
}
function mexeBolinha(){
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}
function verificaBorda(){
  if(xBolinha + rBolinha > width || xBolinha - rBolinha < 0){
    velocidadeXbolinha *= -1
  } 
  if(yBolinha + rBolinha> height || yBolinha - rBolinha < 0){
    velocidadeYbolinha *= -1
  }   
}
function desenharRaquete(){
  rect(xRaquete,yRaquete,wRaquete,hRaquete);
}
function movimentaMinhaRaquete(){
  if (keyIsDown (87)){
  yRaquete -=10;
  }
  if (keyIsDown (83)){
  yRaquete +=10;
}
}
function toqueNaRaquete(){
  if(xBolinha-rBolinha<xRaquete+wRaquete &&
     yBolinha - rBolinha < yRaquete + hRaquete){
    velocidadeXbolinha *= -1;
  }
}
function desenharRaqueteOp(){
  rect(xRaqueteOp,yRaqueteOp,wRaqueteOp,hRaqueteOp);
}
function movimentoRaqueteOp(){
  velocidadeYRaqueteOp = yBolinha - yRaqueteOp - hRaqueteOp /2 - 30;
  yRaqueteOp += velocidadeYRaqueteOp + chanceDeErrar;  
  calculoChanceDeErrar();
}
function colisaoRaqueteLibraries(x,y){
  colisao =
  collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, rBolinha);
  if (colisao){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}
function incluirPlcar(){
  stroke(300);
  textAlign(CENTER);
  textSize(25);
  fill(color(255, 0, 0));
  rect(200, 30, 50, 30);
  fill(300);
  text(meuPlacar, 225, 52);
  fill(color(255, 0, 0));
  rect(1088, 30, 50, 30);
  fill(300);
  text(placarOp, 1111 , 52);
}
function pontosJogo(){
  if (xBolinha + rBolinha > 1365){
    meuPlacar += 1;
    ponto.play();
  }
  if (xBolinha - rBolinha < 4){
    placarOp += 1;
    ponto.play();
  }
}
function multiPlayer(){
   if (keyIsDown(UP_ARROW)){
  yRaqueteOp -=10;
  }
  if (keyIsDown(DOWN_ARROW)){
  yRaqueteOp +=10;
}
}
function calculoChanceDeErrar() {
  if (placarOp >= meuPlacar) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
function bolinhaNaoPrendeNaRaquete(){
  if (xBolinha - rBolinha < 10){
    xBolinha = 20
  }
  if (xBolinha - rBolinha > 1350)
  xBolinha = 1340
  
}
function linhaDoMeio (){
  rect(680, 0, 5, 650);
}