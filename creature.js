var Creature = function(x,y,vectors){
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.fitness;
    this.dead = false;
    this.reached = false;
    if(vectors === undefined){
        this.vectors = [];
        for(var i = 0; i < lifespan; i++){
            var v = createVector(random(-speed,speed),random(-speed,speed))
            this.vectors.push(v);
        }
    } else {
        this.vectors = vectors;
    }
    
    if(species === true){
        var sum = 0;
        
        for(var i = 0; i < this.vectors.length; i++){
            sum += this.vectors[i].x;    
            sum += this.vectors[i].y;
        }
        
        if(sum < -5){
            this.colors = [30,30,200];  
        } else if(sum < -3){
            this.colors = [200,200,20];  
        } else if(sum < -1){
            this.colors = [30,200,30];  
        } else if(sum < 2){
            this.colors = [200,30,30];  
        } else {
            this.colors = [200,20,200];
        }
    }
};

Creature.prototype.display = function(){
    if(species === false){
        fill(255,20,20,150);
    } else {
        fill(this.colors[0],this.colors[1],this.colors[2],150);
    }
    ellipse(this.position.x,this.position.y,20,20);
}

Creature.prototype.update = function(counting){
    this.acceleration.add(this.vectors[counting]);
    this.acceleration.add(gravity);
    if(this.position.y > height-10){
        this.velocity.y *= -1;
    }

    if(this.position.x < 10 || this.position.x > width-10){
        this.velocity.x *= -1;
    }
    if(this.position.y > height-11){
        this.position.y = height-11;    
    }
    for(var i = 0; i < obstacles.length; i++){
        if(this.position.y-10 < obstacles[i][1]+obstacles[i][3] && this.position.x + 10 > obstacles[i][0] && this.position.x-10 < obstacles[i][0] + obstacles[i][2] && this.position.y+10 > obstacles[i][1]){
            this.velocity.y *= -1.01;    
        }
        
        
        if(this.position.x-10 < obstacles[i][0]+obstacles[i][2] && this.position.y + 10 > obstacles[i][1] && this.position.y-10 < obstacles[i][1] + obstacles[i][3]  && this.position.x+10 > obstacles[i][0]){
            this.velocity.x *= -1.01;
        }
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0,0);
}