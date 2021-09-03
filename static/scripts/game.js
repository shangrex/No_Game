// import  'mushroom.js'

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
        this.charc;
        this.mouseX = 0;
        this.mouseY = 0;
        this.machine = [];
        this.machine_distance = [];
        // '0' means go up
        // '1' means go down
        // '2' means go left
        // '3' means go right
        // '4' means stay
        this.machine_way = [];
    }

    hit (mouseX, mouseY) {
        // console.log(mouseX, mouseY);

        if(mouseX <  this.charc.x + 20 & mouseX > this.charc.x - 20 & 
            mouseY < this.charc.y + 20 & mouseY > this.charc.y - 20){
            console.log('hit');
            // console.log("charc", this.charc.x, this.charc.y);
            // console.log(this.mouseX, this.mouseY);
        }
    }
    
    random_generate(min, max){
        return Math.floor(Math.random() * (max-min))+min;
    }

    random_move(index, speed, delta){
        // height: 1000
        // width:  1400
        if(this.machine_distance[index] <= 0){
            // restart movement
            let distance = this.random_generate(1, 300);
            this.machine_distance[index] = distance;
            let way = this.random_generate(0, 6);
            this.machine_way[index] = way;
        }
        else{
            // continuous movement
            if(this.machine_way[index] == 0){
                this.machine_distance[index] -= 1;
                this.machine[index].y -= speed * delta;
            }
            else if(this.machine_way[index] == 1){
                this.machine_distance[index] -= 1;
                this.machine[index].y += speed * delta;
            }
            else if(this.machine_way[index] == 2){
                this.machine_distance[index] -= 1;
                this.machine[index].x -= speed * delta;
            }            
            else if(this.machine_way[index] == 3){
                this.machine_distance[index] -= 1;
                this.machine[index].x += speed * delta;
            }
            else if(this.machine_way[index] == 4
                | this.machine_way[index] == 5){
                this.machine_distance[index] -= 1;
            }
        }
    }

    preload ()
    {
        this.load.image('sight', 'https://i.imgur.com/cwkNzG4.png');
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('mushroom', 'assets/sprites/mushroom2.png');
    }

    create () {
        // Add character to scene
        let x = this.random_generate(25, 1375);
        let y = this.random_generate(25, 975);
        this.charc = this.physics.add.sprite(x, y, 'mushroom').setDepth(1);
        this.charc.setBounce(0.2);
        this.charc.setCollideWorldBounds(true);

        // Add bot to scene
        for(let i = 0; i < 10; i++){
            // height: 1000
            // width: 1400
            // pixel size: 50
            // random generate from (25~1375, 25~975)
            let x = this.random_generate(25, 1375);
            let y = this.random_generate(25, 975);
            // random generate the direction of movements
            let direction = this.random_generate(0, 4);
            this.machine.push(this.physics.add.sprite(x, y, 'mushroom').setDepth(1));
            this.machine_way.push(direction);
            this.machine_distance.push(0);
            // Add physic attribute
            this.machine[i].setBounce(0.2);
            this.machine[i].setCollideWorldBounds(true);
            this.physics.add.collider(this.machine[i], this.charc);
            for(let j = 0; j < i; j++){
                this.physics.add.collider(this.machine[i], this.machine[j]);
            }
        }

        // Scale the target picture
        const group = this.add.group();
        this.sight = this.add.image(10, 10, 'sight').setScale(0.1).setDepth(2);
        group.add(this.sight);

        // create cursors objects to handel character movements
        cursors = this.input.keyboard.createCursorKeys();
        
        // Set character movement speed
        speed = Phaser.Math.GetSpeed(150, 1);
        
        // Gun sight move with cursor
        this.input.on('pointermove', function (pointer) {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
            Phaser.Actions.SetXY(group.getChildren(), this.mouseX, this.mouseY);
        });
        
        // Cusor click
        this.input.on('pointerdown', function (pointer) {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
            console.log("click", this.mouseX, this.mouseY);
            Phaser.Actions.SetXY(group.getChildren(), this.mouseX, this.mouseY);
            gx = pointer.x;
            gy = pointer.y;
        });
    }


    update (time, delta)
    {
        // Gun sight collision with character detection
        this.hit(gx, gy);
        // Character movement
        if (cursors.left.isDown)
        {
            this.charc.x -= speed * delta;
        }
        else if (cursors.right.isDown)
        {
            this.charc.x += speed * delta;
        }
        else if(cursors.up.isDown){
            this.charc.y -= speed * delta;
        }
        else if(cursors.down.isDown){
            this.charc.y += speed * delta;
        }
        
        for(let i = 0; i < 10; i++){
            this.random_move(
                i,
                speed,
                delta,
            )
        }
    }

}


const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 1000,
    // backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [ Example ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

var speed;
var cursors;

var gx, gy;

const game = new Phaser.Game(config);
