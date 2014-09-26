
function Bullet(x,y) {
    this.x = x;
    this.y = y;
    this.timer = null;
    this.isLive = true;
    this.run = function run() {

   
        if (this.y < -10 || this.isLive == false) {

            window.clearInterval(this.timer);

            this.isLive = false;
        }

        else
            {
                this.y -= 20;

            }
        }
    }




