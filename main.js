
//var Bullet = function () {


var Paratrooper = function () {
   
	// Super Constants...............................
	
	this.smallCanvasWidth = 200;
	this.smallCanvasHeight = 120;
	
	this.canvas_upscale = 4; //vier is beter
   
	//Canvas Creation..................
	
	this.klein_canvas = document.createElement( 'canvas' );
    this.klein_canvas.width = this.smallCanvasWidth;
    this.klein_canvas.height = this.smallCanvasHeight;
		
	this.groot_canvas = document.createElement( 'canvas' );
	this.groot_canvas.width = this.smallCanvasWidth * this.canvas_upscale;
	this.groot_canvas.height = this.smallCanvasHeight * this.canvas_upscale;
	this.groot_canvas.id = "game-canvas";
	
	this.ctx = this.klein_canvas.getContext( '2d' );
    this.ctx2 = this.groot_canvas.getContext( '2d' );
	
	
	//System
	
	this.paused = false;
    this.PAUSED_CHECK_INTERVAL = 200;
	
    this.lastAnimationFrameTime = 0,
    this.lastFpsUpdateTime = 0,
    this.fps = 60,
	
	
	//Blokkie effect shit
	
	this.imagedata = 0;
	this.old_imagedata = 0;
	this.timer = 0;
	
	// Elements
	
	this.fpsElement = document.getElementById('fps');
	
	//Background Images
	this.background_image_width = 480;
	
	this.spritesheet = new Image(); // Al die sprites
	
	this.stars_offset1 = 0;
	this.stars_offset2 = -this.background_image_width; //img width
	this.stars_vel = 0.5;
	
	
	this.mountains_offset1 = 0;
	this.mountains_offset2 = -this.background_image_width;
	this.mountains_vel = 7; //makie sakie, want stars bepaal hom

	this.rocks_offset1 = 0;
	this.rocks_offset2 = -this.background_image_width;
	this.rocks_vel = 22; //makie sakie, want stars bepaal hom
	

	//Trokkie
	
	//Sprites...
	
	this.trokkieCell = [{ left: 0,   top: 186, 
        width: 40, height: 21 }];
	
	this.grootwielCell = [{ left: 0,   top: 207, 
        width: 9, height: 9 }];
	
	this.kleinwielCell = [{ left: 0,   top: 216, 
        width: 7, height: 7 }];
	
	//Data...
	
	this.trokkieData =  {x: 150,  y: 90, speed:30};
	
	this.grootwielData = {x: 18, y:11, angle:0, radius:4.5, rotation_speed:0};
	this.grootwielData.rotation_speed = (1 / this.grootwielData.radius) * this.trokkieData.speed;
	
	this.kleinwielData = {x: 2, y:13, angle:23, radius:3.5, rotation_speed:0};
	this.kleinwielData.rotation_speed = (1 / this.kleinwielData.radius) * this.trokkieData.speed;
	
	this.turretData = { x: 9.5, y:6.5, width: 2.3, length:9,  angle: Math.PI+0.5, color:'#5F5F5F'};
	
	
	this.trokkieSprite;
	this.grootwielSprite;
	this.kleinwielSprite;
	this.turretSprite;
	
	
	
	this.sprites = [];
	
	
	this.wielDraaiBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
         sprite.myData.angle += sprite.myData.rotation_speed * (now - lastAnimationFrameTime) / 1000;
		 
      }
   };
	
};
  

Paratrooper.prototype = {
    createSprites: function () {
      this.createTrokkieSprites(); 
     // this.positionAllSprites();
      this.addSpritesToSpriteArray();
    
	},

    addSpritesToSpriteArray: function () {
      
	  this.sprites.push(this.turretSprite);
      this.sprites.push(this.trokkieSprite);
      this.sprites.push(this.grootwielSprite);
	  this.sprites.push(this.kleinwielSprite);
     
    },
   
/*   
	positionSprite: function (sprite, spriteData) {
     
           sprite.left  = spriteData.x;
           sprite.top = spriteData.y;
     
	},
   
    	
	positionAllSprites: function() {  
     
	  this.positionSprite(this.trokkieSprite, this.trokkieData);
	  this.positionSprite(this.grootwielSprite, this.grootwielData);
	  this.positionSprite(this.kleinwielSprite, this.kleinwielData);
	  this.positionSprite(this.turretSprite, this.turretData);
	  
	},*/
    
	createTrokkieSprites: function () {
		
		
		this.trokkieSprite = new Sprite('trokkie',
                          new SpriteSheetArtist(this.spritesheet, 
                                                this.trokkieCell));
											
		this.trokkieSprite.width = this.trokkieCell[0].width;
		this.trokkieSprite.height = this.trokkieCell[0].height;
		
		this.trokkieSprite.myData = this.trokkieData;
		
		
		//
		
		
		this.grootwielSprite = new Sprite('grootwiel',
                          new wielArtist(this.spritesheet, 
                                                this.grootwielCell),[this.wielDraaiBehavior]);
		
				
		this.grootwielSprite.myTrokkieData = this.trokkieData;
		this.grootwielSprite.myData = this.grootwielData;
		
		this.grootwielSprite.width = this.grootwielCell[0].width;
		this.grootwielSprite.height = this.grootwielCell[0].height;										
		
		//
		
		this.kleinwielSprite = new Sprite('kleinwiel',
                          new wielArtist(this.spritesheet, 
                                                this.kleinwielCell), [this.wielDraaiBehavior]);
		
		this.kleinwielSprite.myTrokkieData = this.trokkieData;
		this.kleinwielSprite.myData = this.kleinwielData;
		
		this.kleinwielSprite.width = this.kleinwielCell[0].width;
		this.kleinwielSprite.height = this.kleinwielCell[0].height;												
												
		//
		
		this.turretSprite = new Sprite('turret', new turretArtist());
		
		this.turretSprite.myData = this.turretData; 
		this.turretSprite.myTrokkieData = this.trokkieData;       
      
	},
	
	isSpriteInView: function(sprite) {
      
	  
	 
	  
	  return sprite.left + sprite.width > sprite.hOffset &&
             sprite.left < sprite.hOffset + this.klein_canvas.width;
    },

    //for the next image in the sprite sheet animation
	updateSprites: function (now) {
      var sprite;

      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];

         if (sprite.visible && this.isSpriteInView(sprite)) {
            sprite.update(now, 
             this.fps, 
             this.ctx,
             this.lastAnimationFrameTime);
         }
      }
    },

    drawSprites: function() {
      var sprite;
	
	
      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];
		
		 /*console.log(sprite.visible + "sprite.visible");	
		 console.log(this.isSpriteInView(sprite) + "this.isSpriteInView(sprite)");
		 console.clear*/
         if (sprite.visible && this.isSpriteInView(sprite)) {
          
			this.ctx.translate(-sprite.hOffset, 0);
            //console.log("draw");
			sprite.draw(this.ctx);
			
            this.ctx.translate(sprite.hOffset, 0);
         }
      }
    },
	
	draw: function (now) {
	  
	  
	  this.keyboard();
	  this.timer++;	
	  this.setStartBackgroundOffset(now);
	 	  
	  this.small_draw(now);
	  this.grootmaak();
	},
   
    keyboard: function() {
	
		//if (Key.isDown(Key.UP)) this.moveUp();
		if (Key.isDown(Key.DOWN)) this.trokkieData.x -= 1;
		
		
		if (Key.isDown(Key.LEFT)) 
		if (this.turretData.angle > (Math.PI))
			this.turretData.angle = this.turretData.angle - 0.04;
		
			
		if (Key.isDown(Key.RIGHT)) 
		if (this.turretData.angle < (Math.PI+(Math.PI/1.5)))
			this.turretData.angle = this.turretData.angle + 0.04;
				  
										
	},
	
	
	
	
	
    setStartBackgroundOffset: function(now) {
	   
	   this.stars_offset1 += this.stars_vel * (now - this.lastAnimationFrameTime) / 1000;
	   this.stars_offset2 += this.stars_vel * (now - this.lastAnimationFrameTime) / 1000;

	   if (this.stars_offset1 > this.background_image_width) {
		  
		  this.stars_offset1 = this.stars_offset2 - this.background_image_width
		  }
	   if (this.stars_offset2 > this.background_image_width) {
		  
		  this.stars_offset2 = this.stars_offset1 - this.background_image_width
		  }  
		  
	   this.mountains_offset1 += this.mountains_vel * (now - this.lastAnimationFrameTime) / 1000;
	   this.mountains_offset2 += this.mountains_vel * (now - this.lastAnimationFrameTime) / 1000;

	   if (this.mountains_offset1 > this.background_image_width) {
		  
		  this.mountains_offset1 = this.mountains_offset2 - this.background_image_width
		  }  
		if (this.mountains_offset2 > this.background_image_width) {
		 
		  this.mountains_offset2 = this.mountains_offset1 - this.background_image_width
		  }    
		  
		this.rocks_offset1 += this.rocks_vel * (now - this.lastAnimationFrameTime) / 1000;
	    this.rocks_offset2 += this.rocks_vel * (now - this.lastAnimationFrameTime) / 1000;

	    if (this.rocks_offset1 > this.background_image_width) {
		  
		  this.rocks_offset1 = this.rocks_offset2 - this.background_image_width
		  }  
		if (this.rocks_offset2 > this.background_image_width) {
		 
		  this.rocks_offset2 = this.rocks_offset1 - this.background_image_width
		  }      
	   
	},
	
	
	drawForeground: function(now) {
	
		this.ctx.translate(-this.rocks_offset1, 0);
	    this.ctx.drawImage(this.spritesheet,0,177,this.background_image_width,9,0,106,this.background_image_width,9);
	    this.ctx.translate(this.rocks_offset1, 0);
		
		this.ctx.translate(-this.rocks_offset2, 0);
	    this.ctx.drawImage(this.spritesheet,0,177,this.background_image_width,9,0,106,this.background_image_width,9);
	    this.ctx.translate(this.rocks_offset2, 0);
	
	},
	
	drawBackground: function(now) {
		this.ctx.translate(-this.stars_offset1, 0);
	   	this.ctx.drawImage(this.spritesheet,0,0,this.background_image_width,120,0,0,this.background_image_width,120);
		this.ctx.translate(this.stars_offset1, 0);
		
		this.ctx.translate(-this.stars_offset2, 0);
	    this.ctx.drawImage(this.spritesheet,0,0,this.background_image_width,120,0,0,this.background_image_width,120);
        this.ctx.translate(this.stars_offset2, 0);
				
		this.ctx.translate(-this.mountains_offset1, 0);
	  
	    this.ctx.drawImage(this.spritesheet,0,120,this.background_image_width,51,0,69,this.background_image_width,51);
		this.ctx.translate(this.mountains_offset1, 0);
		
		this.ctx.translate(-this.mountains_offset2, 0);
	    this.ctx.drawImage(this.spritesheet,0,120,this.background_image_width,51,0,69,this.background_image_width,51);
	    this.ctx.translate(this.mountains_offset2, 0);
		
		this.ctx.translate(-this.rocks_offset1, 0);
	    this.ctx.drawImage(this.spritesheet,0,171,this.background_image_width,6,0,100,this.background_image_width,6);
	    this.ctx.translate(this.rocks_offset1, 0);
		
		this.ctx.translate(-this.rocks_offset2, 0);
	    this.ctx.drawImage(this.spritesheet,0,171,this.background_image_width,6,0,100,this.background_image_width,6);
	    this.ctx.translate(this.rocks_offset2, 0);
		
	
	},
	
	
	
	small_draw: function(now){
		
				
		this.drawBackground();
		this.updateSprites(now);
        this.drawSprites();
		this.drawForeground();
		
	
		
	},
	
	
	
	// SOLID METHODS
	
	
	calculateFps: function(now) {
		var fps = 1 / (now - this.lastAnimationFrameTime) * 1000;

	   if (now - this.lastFpsUpdateTime > 1000) {
		  this.lastFpsUpdateTime = now;
		  this.fpsElement.innerHTML = fps.toFixed(0) + ' fps';
	   }
	   return fps; 
	},
	
	grootmaak: function(){
	
		this.imagedata = this.ctx.getImageData(0, 0, this.smallCanvasWidth, this.smallCanvasHeight)
			
		if (this.timer == 1) 
			this.old_imagedata = this.imagedata;
		
		xi = 0;
		yi = 0;
		
		for (i = 0; i < ((this.smallCanvasWidth * this.smallCanvasHeight)*4); i = i + 4)
		{
			if (((i % (this.smallCanvasWidth*4)) == 0) && (i != 0)){
				xi = 0;
				yi = yi + 1;
			}
			if ((this.old_imagedata.data[i] != this.imagedata.data[i]) || (this.timer == 1) ) {
				x = xi*this.canvas_upscale; 
				y = yi*this.canvas_upscale;
					
				this.ctx2.fillStyle  = "rgba("+ this.imagedata.data[i]+","+ this.imagedata.data[i+1]+","+this.imagedata.data[i+2]+",255)";
				this.ctx2.fillRect(x,y,this.canvas_upscale,this.canvas_upscale);
				
			}
			xi = xi + 1;
					
		} // kak for loop
		
		this.old_imagedata = this.imagedata

	},
	
	
	

	animate: function (now) { 
      if (paratrooper.paused) {
         setTimeout( function () {
            requestNextAnimationFrame(paratrooper.animate);
         }, paratrooper.PAUSED_CHECK_INTERVAL);
      }
      else {
         paratrooper.fps = paratrooper.calculateFps(now); 
         paratrooper.draw(now);
         paratrooper.lastAnimationFrameTime = now;
         requestNextAnimationFrame(paratrooper.animate);
      }
   },

    togglePaused: function () {
      var now = +new Date();

      this.paused = !this.paused;
   
      if (this.paused) {
         this.pauseStartTime = now;
      }
      else {
         this.lastAnimationFrameTime += (now - this.pauseStartTime);
      }
    },
   
   

   //INIT-----------------------------------------
   
   initializeImages: function () {
      
	//  document.getElementById("arena").appendChild( this.klein_canvas );
	  document.getElementById("arena").appendChild( this.groot_canvas );
	 
	 
	  this.spritesheet.src = 'images/spritesheet.png';

	  
	
	  
	  
      this.spritesheet.onload = function (e) {
        
		 paratrooper.startGame();
      };
   },

   startGame: function () {
      
	  
	  paratrooper.constructor();
	  requestNextAnimationFrame(this.animate);
   }
};
// daai anner bra se se shit.....http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

   
//klaar met die prototype

	window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
	
	window.onkeydown = function (e) {
	   var key = e.keyCode;

	   if (key === 68 || key === 37) { // 'd' or left arrow
		 // paratrooper.turretData.angle = paratrooper.turretData.angle - 0.04;
		  
		  
	   }
	   else if (key === 75 || key === 39) { // 'k' or right arrow
		 // paratrooper.turretData.angle = paratrooper.turretData.angle + 0.04;
	   }
	   
	   
	   if (key === 80) { // 'p'*/
		 paratrooper.togglePaused();
		 
	   }
	};

	window.onblur = function (e) {  // pause if unpaused
	   paratrooper.windowHasFocus = false;
	   
	   if ( ! paratrooper.paused) {
		  paratrooper.togglePaused();
	   }
	};

	window.onfocus = function (e) {  // unpause if paused
	   if (paratrooper.paused) {
		  paratrooper.togglePaused();
	   }
	};
   
   
var paratrooper = new Paratrooper();



paratrooper.initializeImages(); 
paratrooper.createSprites();
