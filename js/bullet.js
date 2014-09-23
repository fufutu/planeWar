/**
 * Created by Administrator on 2014/8/23.
 */
function Bullet(x,y) {//-------------改进处9
    this.x = x;
    this.y = y;
    this.timer = null;
    this.isLive = true;
    this.run = function run() {

        //在该表这个子弹的坐标时，我们先判断子弹是否已经到边界
        //子弹不前进，有两个逻辑，1.碰到边界，2. 碰到敌人坦克.好像没检查碰到敌人坦克这种情况在isHitEnemy函数中检查--------改进处9
        if (this.y < -10 || this.isLive == false) {

            window.clearInterval(this.timer);//子弹要停止.

            this.isLive = false;
        }
            //子弹死亡
        else
            {
                this.y -= 20;

            }
        }
    }




