/**
 * Created by Administrator on 2014/8/20.
 */
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
    function produceBullet() {//定义一个Hero类,//x 表示坦克的 横坐标, y 表示纵坐标, direct 方向
        heroBullet = new Bullet(planex + planewidth / 2, planey + 10);
        heroBullets.push(heroBullet);//把这个子弹放在数组中
        var timer = window.setInterval("heroBullets[" + (heroBullets.length - 1) + "].run()", 50);//就算你工作过一两年，你也不一定能想到这儿,把子弹数组所有子弹同时启动,每个子弹定时器是独立的，按原来的方法heroBullet.run(),50,所有子弹共享一个定时器，子弹速度会越来越快
        heroBullets[(heroBullets.length - 1)].timer = timer;//把这个Timer传递给子弹，js对象是引用传递

    }

    function procuceEnemy() {//定义一个Hero类,//x 表示坦克的 横坐标, y 表示纵坐标, direct 方向
        var x = Math.ceil(Math.random() * (boxwidth - planewidth));
        theEnemy = new Enemy(x, 33);
        allEnemy.push(theEnemy);//把这个子弹放在数组中
        var timer = window.setInterval("allEnemy[" + (allEnemy.length - 1) + "].run()", 50);//就算你工作过一两年，你也不一定能想到这儿,把子弹数组所有子弹同时启动,每个子弹定时器是独立的，按原来的方法heroBullet.run(),50,所有子弹共享一个定时器，子弹速度会越来越快
        allEnemy[(allEnemy.length - 1)].timer = timer;//把这个Timer传递给子弹，js对象是引用传递
    }

    function Enemy(x, y) {//-------------改进处9
        this.x = x;
        this.y = y;
        this.timer = null;
        this.isLive = true;
        this.run = function run() {

            //在该表这个子弹的坐标时，我们先判断子弹是否已经到边界
            //子弹不前进，有两个逻辑，1.碰到边界，2. 碰到敌人坦克.好像没检查碰到敌人坦克这种情况在isHitEnemy函数中检查--------改进处9
            if (this.y > boxheight || this.isLive == false) {

                window.clearInterval(this.timer);//子弹要停止.

                this.isLive = false;
            }
            //子弹死亡
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
