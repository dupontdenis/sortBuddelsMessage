

var Engine = (function(global) {
  
//set up
      var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

        canvas.width = 500;
        canvas.height = 500;
        doc.body.appendChild(canvas);
        
        //to do add listeneur

    function init() {
        Screen.welcome();
        initObjects();
        canvas.addEventListener('click', main, false);
    }


    function main() {
        canvas.removeEventListener('click', main, false);
        update();
        render();
        win.requestAnimationFrame(main);
    };

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    


 function dynSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
} 




function checkOver(){
	allGirls.forEach(function(girl,i) {
            if (player.index===i){
               if(isInside(player,girl)){
                   girl.found = true;		   
//search the next	
                   player.index = player.index + 1;
//console.log("player.index = " + player.index);
		     }
            }    
	});
}


  /*
      * Purpose:  This check 
  */
     function isInside(player,girl){
         if((Math.pow(player.x-girl.x, 2) + Math.pow(girl.y-player.y, 2) < girl.width*girl.width))       
             return true;
         else
             return false;
     }


function checkEnd(){
console.log(" checkend  = " + player.index,allGirls.length)
    if (player.index ===  allGirls.length)
              return true;
         else
             return false;
}

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
       
        if (!checkEnd()){
            updateEntities(dt);
            checkOver();
        }
        else {
            goHomeEntities(dt);
        }     
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allGirls array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        //player.update();
        allGirls.forEach(function(girl) {
            girl.update(dt);
        });
     }
    
var reset = false;
function goHomeEntities(dt) {
        //player.update();

//update to the player position
        if (reset === false) {
           reset = true;
        	allGirls.forEach(function(girl) {
            	girl.changePos(dt);
        	});
        };


        allGirls.forEach(function(girl) {
            girl.goHome(dt);
        });
}



  


    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your girl and player entities within app.js
     */
    function renderEntities() {
        ctx.clearRect ( 0 , 0 , canvas.width, canvas.height);

        /* Loop through all of the objects within the allGirls array and call
         * the render function you have defined.
         */
        allGirls.forEach(function(girl) {
            girl.render();
        });
        //player.render();

        if (reset){
          canvas.addEventListener('click', init, false);
             Screen.gameover();
             //play();

        }
    }  
    

 var Screen = {
        welcome: function() {
            // Setup base values
            this.text = 'SORT the Buddles';
            this.textSub = 'find the criteria';
            this.textColor = 'red';
            // Create screen
            this.create();
        },

        gameover: function() {
            this.text = 'We have a Winner';
            this.textSub = 'Winner !';
            this.textColor = 'red';

            this.create();
        },

        create: function() {
            // Background
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Main text
            ctx.fillStyle = this.textColor;
            ctx.textAlign = 'center';
            ctx.font = '40px helvetica, arial';
            ctx.fillText(this.text, canvas.width / 2, canvas.height / 2);

            // Sub text
            ctx.fillStyle = '#999999';
            ctx.font = '20px helvetica, arial';
            ctx.fillText(this.textSub, canvas.width / 2, canvas.height / 2 + 30);
        }
    };

   
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/Heart.png'
    ]);
    

    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
    global.canvas = canvas;

    global.dynSort = dynSort;
})(this);
