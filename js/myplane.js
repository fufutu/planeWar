
var fps=55;
var boxx=0;
var boxy=0;
var boxwidth=500;
var boxheight=500;
var planeImage;
var planex;
var planey;
var planewidth=60;
var planeheight=60;
var sp=0;
var bulletx=0;
var heroBullet;
var bullety=0;
var speed=10;
var enemyx=0;
var theEnemy;
var heroBullets=new Array();
var allEnemy=new Array();
var enemyImage=new Image();
var enemywidth=30;
var enemyheight=30;
var bulletwidth=10;
var bulletheight=10;
var gameTimeer;
var score=0;
var btimeer;
var etimeer;
var bingoImage=new Image();
bingoImage.src="images/bingo.PNG";
enemyImage.src="images/newenemy.PNG";
bulletImage=new Image();
bulletImage.src="images/newbullet.PNG";

function beginPlane(){
    planeImage=new Image();
    planeImage.src="images/plane.png";
    planex=(boxwidth-planewidth)/2;
    planey=boxheight-planeheight;
}
function init(){
    ctx=document.getElementById('canvas').getContext('2d');
    ctx.lineWidth=2;
    canvas=document.getElementById('canvas');
    beginPlane();
    var body=document.getElementsByTagName("body")[0];
    btimeer=setInterval(produceBullet, 500);
    etimeer=setInterval(procuceEnemy, 800);
    body.addEventListener("keydown",function(event){
        switch (event.keyCode){
            case 37:{if(planex>boxx){sp=8;}else{sp=0;}planex=planex-sp;break;}
            case 39:{if((planex+planewidth)<boxwidth){sp=8;}else{sp=0;}planex=planex+sp;break;}
            case 38:{if(planey>boxy){sp=4;}else{sp=8;}planey=planey-sp;break;}
            case 40:{if((planey+planeheight)<boxheight){sp=8;}else{sp=0;}planey=planey+sp;break;}
            default :break;
        }
    },false);

    gameTimeer=setInterval(run,1000/fps);
}

function drawPlane(){
    ctx.clearRect(boxx,boxy,boxwidth,boxheight);
    ctx.drawImage(planeImage,planex,planey,planewidth,planeheight);
}

function drawBullet() {
    for (var i = 0; i < heroBullets.length; i++) {
        if (heroBullets[i].isLive) {
            ctx.drawImage(bulletImage, heroBullets[i].x, heroBullets[i].y, bulletwidth, bulletheight);
        }
    }
}
    function produceBullet() {
        heroBullet = new Bullet(planex + planewidth / 2, planey + 10);
        heroBullets.push(heroBullet);
        var timer = window.setInterval("heroBullets[" + (heroBullets.length - 1) + "].run()", 50);
        heroBullets[(heroBullets.length - 1)].timer = timer;

    }

    function procuceEnemy() {
        var x = Math.ceil(Math.random() * (boxwidth - planewidth));
        theEnemy = new Enemy(x, 33);
        allEnemy.push(theEnemy);
        var timer = window.setInterval("allEnemy[" + (allEnemy.length - 1) + "].run()", 50);
        allEnemy[(allEnemy.length - 1)].timer = timer;
    }

    function Enemy(x, y) {
        this.x = x;
        this.y = y;
        this.timer = null;
        this.isLive = true;
        this.run = function run() {

           
            if (this.y > boxheight || this.isLive == false) {

                window.clearInterval(this.timer);

                this.isLive = false;
            }

            else {
                this.y += 2.5;

            }
        }
    }

    function drawEnemy() {
        for (var i = 0; i < allEnemy.length; i++) {
            if (allEnemy[i].isLive ==true) {
                ctx.drawImage(enemyImage, allEnemy[i].x, allEnemy[i].y, enemywidth, enemyheight);
            }
        }
    }

    function checkBullet() {
        for (var j = 0; j < allEnemy.length; j++) {
            if (allEnemy[j].isLive) {
                var e = allEnemy[j];
                for (var i = 0; i < heroBullets.length; i++) {
                    if (heroBullets[i].isLive) {
                        var b = heroBullets[i];
                        if(b.x> e.x- bulletwidth&& b.x< e.x+planewidth&& b.y< e.y) {
                            e.isLive = false;
                            b.isLive = false;
                            ctx.drawImage(bingoImage, e.x, e.y,10,10);
                            score+=100;
                        }
                    }
                }
            }
        }
    }

function stop(){
    clearInterval(gameTimeer);
    ctx.clearRect(boxx,boxy,boxwidth,boxheight);
    allEnemy.length=0;
    heroBullets.length=0;
    var start=document.getElementById("start");
    start.style.display="";
}
    function checkPlane(){
        for (var j = 0; j < allEnemy.length; j++) {
            if (allEnemy[j].isLive) {
                var e = allEnemy[j];
                      if(planex> e.x-planewidth&&planex< e.x+enemywidth&& e.y+enemyheight>planey|| e.y>boxheight){
                        stop();
                      }
            }}
    }


    function drawScore(){
       document.getElementById("score").innerHTML=score;
    }
    function run() {

        drawPlane();
        drawBullet();
        drawEnemy();
        drawScore();
        checkPlane();
        checkBullet();


    }
