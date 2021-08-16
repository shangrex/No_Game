// import  'mushroom.js'

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
        this.charc;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    hit (mouseX, mouseY) {
        console.log(mouseX, mouseY);

        if(mouseX <  this.charc.x + 20 & mouseX > this.charc.x - 20 & 
            mouseY < this.charc.y + 20 & mouseY > this.charc.y - 20){
            console.log('hit');
            // console.log("charc", this.charc.x, this.charc.y);
            // console.log(this.mouseX, this.mouseY);
        }
    }

    preload ()
    {
        this.load.image('sight', 'https://i.imgur.com/cwkNzG4.png');
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('mushroom', 'assets/sprites/mushroom2.png');
    }

    create () {

        this.charc = this.add.sprite(400, 500, 'mushroom').setDepth(1);

        const group = this.add.group();
        this.sight = this.add.image(10, 10, 'sight').setScale(0.1).setDepth(2);
        group.add(this.sight);

        cursors = this.input.keyboard.createCursorKeys();
        
        speed = Phaser.Math.GetSpeed(200, 1);

        this.input.on('pointerdown', function (pointer) {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
            console.log("click", this.mouseX, this.mouseY);
            Phaser.Actions.SetXY(group.getChildren(), this.mouseX, this.mouseY);
            gx = pointer.x;
            gy = pointer.y;
        });

        this.input.keyboard.on('keydown_W', this.movement, this);
        this.input.keyboard.on('keydown_S', this.movement, this);
        this.input.keyboard.on('keydown_A', this.movement, this);
        this.input.keyboard.on('keydown_D', this.movement, this);


    }

    movement(event) {
        // Here you can see what's passed when Phaser triggers it.
        console.log(arguments);
        let code = event.keyCode;

        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
            console.log('S was pressed');
            // this.charc.y += speed * delta;
            this.direction = 'down';
        } 
        else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.W) {
            console.log('W was pressed');
            // this.charc.y -= speed * delta;
            this.direction = 'up';
        }
        else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
            console.log('A was pressed');
            // this.charc.x -= speed * delta;
            this.direction = 'left';
        }
        else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D) {
            console.log('D was pressed');
            // this.charc.x += speed * delta;
            this.direction = 'right';
        }
  
    }


    update (time, delta)
    {
        this.hit(gx, gy);
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
        if(this.direction == 'up'){
            this.charc.y -= speed * delta;
        }
        else if(this.direction == 'down'){
            this.charc.y += speed * delta;
        }
    }

}

const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1200,
    // backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [ Example ]
};

var speed;
var cursors;

var gx, gy;

const game = new Phaser.Game(config);
