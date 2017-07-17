var creatures = [];
var timer = 0;
var lifespan;
var popSize = 10;
var goal;
var gravity;
var mutability = 0.04;
var obstacles;
var replay = false;
var winner = [];
var c;
var speed = 0.5;
var counter = true;
var go = false;
var asap = true;
var gensPassed = 0;
var totalHighest = 0;
var species = true;

function setup() {
	createCanvas(windowWidth,windowHeight);
	lifespan = round(height/5.65);
	obstacles = [];
	gravity = createVector(0,0.025);
	goal = [width/2,50];
    for(var i = 0; i < popSize; i++){
        creatures.push(new Creature(width/2,height-50));    
    }
    frameRate(60);
}

function draw() {
    background(0);
    fill(255);
    ellipse(goal[0],goal[1],20,20);
    for(var i = 0; i < obstacles.length; i++){
        rect(obstacles[i][0],obstacles[i][1],obstacles[i][2],obstacles[i][3]);
    }
    if(replay === false){
        if(go === true){
            for(var i = 0; i < creatures.length; i++){
                if(asap === false){
                    creatures[i].display();
                    if(creatures[i].reached === false){
                        creatures[i].update(timer);
                    }
                } else {
                    for(var j = 0; j < lifespan; j++){
                        creatures[i].update(j);
                    }
                }
                if(dist(creatures[i].position.x,creatures[i].position.y,goal[0],goal[1]) < 18){
                    creatures[i].fitness = 1;
                    creatures[i].reached = true;
                    winner = creatures[i].vectors;
                    timer = 0;
                    replay = true;
                }
            }
            if(asap === false){
                timer++;
            } else {
                timer = lifespan;
            }
            fill(255);
            text("Running", width/2.2,height-20)
        }
        if(timer === lifespan){
            gensPassed++;
            var highest = 0;
            var lowest = 1;
            for(var i = 0; i < creatures.length; i++){
                    creatures[i].fitness = 1/dist(creatures[i].position.x,creatures[i].position.y,goal[0],goal[1]);
                    creatures[i].dead = true;
                    if(creatures[i].fitness > highest){
                        highest = creatures[i].fitness;
                    }
                    
                    if(creatures[i].fitness < lowest){
                        lowest = creatures[i].fitness;
                    }
            }
    
            for(var i = 0; i < creatures.length; i++){
                var r = random(lowest,highest);
                if(r < creatures[i].fitness && creatures[i].dead === true){
                    for(var k = 0; k < round(map(creatures[i].fitness,lowest,highest,1,15)); k++){
                        var dna = [];
                        for(var j = 0; j < creatures[i].vectors.length; j++){
                            var r1 = random(0,1);
                            if(r1 < mutability){
                                dna.push(createVector(random(-speed,speed),random(-speed,speed)));
                            } else {
                                dna.push(creatures[i].vectors[j]);
                            }
                        }
                        if(creatures.length < 225){
                            creatures.push(new Creature(width/2,height-50,dna));
                        }
                    }
                }
            }
            
            for(var i = creatures.length-1; i >= 0; i--){
                if(creatures[i].dead === true){
                    creatures.splice(i,1);
                }
            }
            if(highest > totalHighest){
                totalHighest = highest;    
            }
            
            timer = 0;
        }
        
        mousePressed = function(){
            obstacles.push( new Array(mouseX-50,mouseY-15,100,30) )    
        }
        
        keyTyped = function(){
            if(key == 'g'){
                go = true;
            } else if(key == 'z'){
                if(asap === true){
                    asap = false;
                } else {
                    asap = true;
                }
            }
        }
    } else {
        if(counter === true){
            timer = 0;
            c = new Creature(width/2,height-50,winner);
            counter = false;
        }
        c.display();
        c.update(timer);
        timer++;
        if(timer === lifespan){
            timer = 0;
            c.position.x = width/2;
            c.position.y = height-50;
            c.velocity.set(0,0);
            c.acceleration.set(0,0);
        }
    }
    keyPressed = function(){
        if(keyCode === UP_ARROW){
            lifespan += 5;
        } else if(keyCode === DOWN_ARROW){
            lifespan -= 5;
        }
    }
    fill(255);
    textSize(15);
    text("Lifespan: " + lifespan + " frames", width-145,height-20)
    text("Andre Monteiro", 20,height-20);
}