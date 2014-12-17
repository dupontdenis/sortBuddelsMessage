/**************************************************************
 * Purpose: This file contains the functions used to instantiate
 *          the player, Girl and jewel objects.
 *          
 * Author:  Base file from Udacity Nano degree progam
 *          Additional modifications made by Kevin Stachowski.
 * 
 * Date:    10/24/2014
 * Updated: 10/25/2014
 * 
 * Notes:   This file is part of engine.js and resources.js
 * 
 **************************************************************/

/*
 * Purpose:  This var contains the function that will instantiate
 *           Girl objects.
 *          
 * Pre con:  none.
 * Post con: An Girl object has been loaded into memory.
 *          
 * @param x - The x coordinate to spawn the object.
 * @param y - The y coordinate to spawn the object. 
 */
var Girl = function(x,y) {

    this.x = getRandomInt(50, canvas.width-50);
    this.y = getRandomInt(50, canvas.height-50);

    this.colour =  "#" + Math.random().toString(16).slice(2, 8);
    this.width =  getRandomInt(10, 30);

//if the player find it
    this.found = false;
    
    // these hold buckets of movement that need to be applied.
    // this allows for go back to the position.
    this.moveX = this.x;
    this.moveY = this.y;
    
    // the speed modifier.
    this.speed = getRandomInt(1,5);

   }

/*
 * Purpose:  This method contains the function that will update
 *           Girl objects.
 *          
 * Pre con:  This Girl has been instantiated.
 * Post con: This Girl instance has been updated.
 *          
 * @param dt - The time dialation of the last update. 
 */
Girl.prototype.update = function() {
console.log("============dans update girl");

	if (this.found === true){
console.log (" trouve  : dans update this found player = " + player.x);

		this.x = player.x;
		this.y = player.y;
	}
}

/*
 * Purpose:  This method contains the function that will draw
 *           Girl objects.
 *          
 * Pre con:  This Girl has been updated.
 * Post con: This Girl instance has been drawn.
 */
Girl.prototype.render = function() {

      ctx.beginPath();
      ctx.fillStyle = this.colour;
      ctx.arc(this.x,this.y,this.width,0,2*Math.PI);
      ctx.closePath();
      ctx.fill();
}

Girl.prototype.changePos = function(){
//MoveX is a position, so transform it to have a distance 
    this.moveX-=player.x;
    this.moveY-=player.y;
}

Girl.prototype.goHome = function() {
// moveX and moveY represente a distance to the initial position.
   if(this.moveX > 0)
    {
        this.x += this.speed;
        this.moveX -= this.speed;
    }
    if(this.moveX < 0)
    {
        this.x -= this.speed;
        this.moveX += this.speed;
    }
    if(this.moveY > 0)
    {
        this.y += this.speed;
        this.moveY -= this.speed;
    }
    if(this.moveY < 0)
    {
        this.y -= this.speed;
        this.moveY += this.speed;
    }

}



/*
 * Purpose:  This function will return a random int between
 *           min and max.
 *          
 * Pre con:  none
 * Post con: int has been returned.
 * 
 * @param min - The minimum value to return
 * @param max - The maximum value to return
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



// Holds any Girl objects
var allGirls = [];


// seed sprites in random position for the girls
//var nb = getRandomInt(5,15);
var nb = 2;
for (var i=0;i<nb;i++){
	allGirls[i] = new Girl();
}
var criteria = {
	largest : "width",
	smallest: "-width",
	highest : "y",
	lowest : "-y",
	nearest : "x",
	farest : "-x"
}

allCriteria =["largest","smallest","highest","lowest","nearest","farest"];

randomCriteria = allCriteria[getRandomInt(0, 6)];
  
allGirls.sort(dynSort(randomCriteria));




/*
 * Purpose:  This var contains the function that will instantiate
 *           player object.
 *          
 * Pre con:  none.
 * Post con: A player object has been loaded into memory.
 */
var Player = function() {
    this.x = 0;
    this.y = 0;

// to visualise the mouse
    this.sprite = 'images/Heart.png';
}

/*
 * Purpose:  This method contains the function that will handle
 *           the mouse mouve events.
 *          
 * Pre con:  none.
 * Post con: if a play is able to move to that location,
 *           the move vars are set to move the player
 *           one square. The play is not actually moved
 *           untill the update method.
 */
Player.prototype.handleMouse = function(mouseX,mouseY) {
	var x = mouseX - canvas.offsetLeft;
	var y = mouseY - canvas.offsetTop;

	this.update(x,y);
}

/*
 * Purpose:  This method contains the function that will update
 *           player object.
 *          
 * Pre con:  This player has been instantiated.
 * Post con: This player instance has been updated.
 *          
 * @param dt - The time dialation of the last update. 
 */
Player.prototype.update = function(mouseX,mouseY) {
	this.x = mouseX;
	this.y = mouseY;
	console.log("mouse update =" + this.x);
//      this.render();

}

/*
 * Purpose:  This method contains the function that will draw
 *           player objects.
 *          
 * Pre con:  This player has been updated.
 * Post con: This player instance has been drawn.
 */
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x-60, this.y-80);
}


/*
 * Purpose:  This will add a listener to the document
 *           to watch for key up values. If its 
 *           directional, handle the input.
 *          
 * Pre con:  The page has been loaded
 * Post con: Directional kys have been handled.
 */

/*
 * Purpose:  This var contains the function that will instantiate
 *           Game object.
 *          
 * Pre con:  none.
 * Post con: A player object has been loaded into memory.
 */

initObjects = function(){



// instantiate the player.
player = new Player();
player.index = 0; // remenber the number of girls found


// Holds any Girl objects
allGirls = [];


// seed sprites in random position for the girls
var nb = getRandomInt(5,15);
for (var i=0;i<nb;i++){
	allGirls[i] = new Girl();
}
var games = ["width","-width","x","-x","y","-y"];
  
allGirls.sort(dynSort(games[getRandomInt(0, 6)]));


canvas.addEventListener('mousemove', function(e) {
    player.handleMouse(e.pageX,e.pageY);
    e.preventDefault();
    return false;
});

}


