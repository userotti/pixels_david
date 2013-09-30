// Sprite Artists......................................................

// Artists draw sprites with a draw(sprite, context) method.

wielArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
   
};

wielArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	// console.log("artist" + this.wielData.x);
	 
	
	
	 
	 context.save(); 
	 
	 
	 context.translate(sprite.left, sprite.top);
	 context.translate(sprite.radius, sprite.radius);
	 context.rotate(sprite.angle);
	 context.translate(-sprite.radius, -sprite.radius);
	 context.translate(-sprite.left, -sprite.top);
	 
	
	  context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          sprite.left, sprite.top,
                                          cell.width, cell.height);
	context.restore();
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
      }
      else {
         this.cellIndex++;
      }
   }
};

turretArtist = function () {
   
   
      
};

turretArtist.prototype = {
   draw: function (sprite, context) {
      context.save(); 
		
		
		
		context.translate(sprite.left, sprite.top);
		context.rotate(sprite.angle);
		context.translate(-sprite.left, -sprite.top);
		
		//console.log("sprite.myData.cooldown: " + sprite.myData.cooldown);
			context.beginPath();
			context.lineWidth = sprite.width;
			context.moveTo(sprite.left,sprite.top);
			context.lineTo(sprite.left+(((sprite.myCurrentWeapon.cooldown)/(sprite.myCurrentWeapon.max_cooldown))*4)+5, sprite.top);
			context.strokeStyle = sprite.color;
			context.stroke();
		
		context.restore();
		
		
		
      /*context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          sprite.left, sprite.top,
                                          cell.width, cell.height);*/
   }

  
};


TravelingBulletSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

TravelingBulletSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	 
	

	context.translate(sprite.left,sprite.top);
	context.rotate(sprite.angle);
	context.translate(-cell.width/2, -cell.height/8);
		
    context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          0, 0,
                                          cell.width, cell.height);
			  
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
		 
      }
      else {
         this.cellIndex++
		
      }
   }
};



SpinningBulletSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

SpinningBulletSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	 
	
	
	context.save();
	
	
	context.translate(sprite.left,sprite.top);
	context.rotate(sprite.angle);
	context.translate(-cell.width/2, -cell.height/2);
		
    context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          0, 0,
                                          cell.width, cell.height);
										  
	context.restore();											  
	
	
	
	
								  
			  
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
		 
      }
      else {
         this.cellIndex++
		
      }
   }
};

SpinningShiningBulletSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

SpinningShiningBulletSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	 
	
	
	context.save();
	
	
	context.translate(sprite.left,sprite.top);
	context.rotate(sprite.angle);
	context.translate(-cell.width/2, -cell.height/2);
		
    context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          0, 0,
                                          cell.width, cell.height);
										  
	context.restore();											  
	
	
	context.save();
	
		context.translate(sprite.left,sprite.top);
		context.fillStyle  = "rgba(222,222,222,0.2)";
		context.fillRect(-1,-1,2,1);
		context.fillRect(-1,-1,1,2);
		
	context.restore();									  
			  
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
		 
      }
      else {
         this.cellIndex++
		
      }
   }
};

AlienPodPartSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};


AlienPodPartSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	 
	
	context.translate(sprite.special_mid_x,sprite.special_mid_y);
	context.translate(sprite.left,sprite.top);
	context.rotate(sprite.angle);
	context.translate(-sprite.special_mid_x,-sprite.special_mid_y);
	
			
			
    context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          0, 0,
                                          cell.width, cell.height);
			  
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
		 
      }
      else {
         this.cellIndex++
		
      }
   }
};


AlienPodBoosterSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

AlienPodBoosterSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
		
      context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          0, 0,
                                          cell.width, cell.height);
								  
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
		 
      }
      else {
         this.cellIndex++
		
      }
   }
};


AlienPodSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

AlienPodSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	 
	  
	
	 
	context.save();
	context.translate(sprite.left,sprite.top);
	//context.rotate(0.1);

    context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          0, 0,
                                          cell.width, cell.height);
	context.translate(5,13);	 
	sprite.booster_flame.draw(context);
	context.restore();	
				  
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
	  }
      else {
         this.cellIndex++
      }
   },
   
   set_cells: function (cells){
	this.cells = cells
	this.cellIndex = 0;
   }
};

GroundDirtExplosionSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

GroundDirtExplosionSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
		
	  sprite.left = sprite.x; 
	  sprite.top = sprite.y;
      context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          sprite.left, sprite.top,
                                          cell.width, cell.height);
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
        // this.cellIndex = 0;
      }
      else {
         this.cellIndex++
		}
   }
};


HitSparksSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

HitSparksSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
		
	 
      sprite.left = sprite.x; 
	  sprite.top = sprite.y;
	  
	  context.translate(sprite.left,sprite.top);
	 
	  context.translate(sprite.width/2,sprite.height/2);
      
	  context.rotate(sprite.rotation);
	  
	  context.translate(-sprite.width/2,-sprite.height/2);
	  
	  
      context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          0, 0,
                                          cell.width, cell.height);
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         //this.cellIndex = 0;
      }
      else {
         this.cellIndex++
		}
   }
};


GrootExplotionSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

GrootExplotionSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
		
	 
      sprite.left = sprite.x; 
	  sprite.top = sprite.y;
      context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          sprite.left, sprite.top,
                                          cell.width, cell.height);
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         //this.cellIndex = 0;
      }
      else {
         this.cellIndex++
		}
   }
};


TrokkieSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

TrokkieSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	 
	  
	  
	  

      context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          sprite.left, sprite.top,
                                          cell.width, cell.height);
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
      }
      else {
         this.cellIndex++;
      }
   }
};


TargetDebreSheetArtist = function (spritesheet, cells, cellnum) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = cellnum;
   console.log("cellnum: " + cellnum);
};

TargetDebreSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	 
	  context.translate(sprite.special_mid_x,sprite.special_mid_y);
	  context.translate(sprite.left,sprite.top);
      context.rotate(sprite.angle);
 	  context.translate(-sprite.special_mid_x,-sprite.special_mid_y);

      context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          0, 0,
                                          cell.width, cell.height);
   },

   advance: function () {
      
   }
};

HudSpriteSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

HudSpriteSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	 
	  sprite.left = 5; 
	  sprite.top = 107;

      context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          sprite.left, sprite.top,
                                          cell.width, cell.height);
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
      }
      else {
         this.cellIndex++;
      }
   }
};


SpriteSheetArtist = function (spritesheet, cells) {
   this.cells = cells;
   this.spritesheet = spritesheet;
   this.cellIndex = 0;
};

SpriteSheetArtist.prototype = {
   draw: function (sprite, context) {
      var cell = this.cells[this.cellIndex];
	 
	  sprite.left = sprite.x; 
	  sprite.top = sprite.y;

      context.drawImage(this.spritesheet, cell.left, cell.top,
                                          cell.width, cell.height,
                                          sprite.left, sprite.top,
                                          cell.width, cell.height);
   },

   advance: function () {
      if (this.cellIndex === this.cells.length-1) {
         this.cellIndex = 0;
      }
      else {
         this.cellIndex++;
      }
   }
};


// Sprites............................................................

// Sprites have a type, an artist, and an array of behaviors. Sprites 
// can be updated and drawn.
//
// A sprite's artist draws the sprite: draw(sprite, context)
// A sprite's behavior executes: execute(sprite, time, fps)

var Sprite = function (type, artist, behaviors) {
   var DEFAULT_WIDTH = 10,
       DEFAULT_HEIGHT = 10,
       DEFAULT_OPACITY = 1.0;

   this.artist    = artist;
   this.type      = type;
   this.behaviors = behaviors || [];

   this.hOffset   = 0; // Horizontal offset
   this.left      = 0;
   this.top       = 0;
   this.width     = DEFAULT_WIDTH;
   this.height    = DEFAULT_HEIGHT;
   this.velocityX = 0;
   this.velocityY = 0;
   this.opacity   = DEFAULT_OPACITY;
   this.visible   = true;

   this.showCollisionRectangle = false;

   this.collisionMargin = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
   };
};

Sprite.prototype = {
   calculateCollisionRectangle: function () {
      // Return an object with properties left, right, top, and bottom

      return {
         left:   this.left - this.hOffset + this.collisionMargin.left,
         right:  this.left - this.hOffset + this.width - this.collisionMargin.right,
         top:    this.top + this.collisionMargin.top,
         bottom: this.top + this.collisionMargin.top + 
                 this.height - this.collisionMargin.bottom
      }
   },
    
   drawCollisionRectangle: function () {
      var COLLISION_RECTANGLE_COLOR      = 'white', 
          COLLISION_RECTANGLE_LINE_WIDTH = 2.0,
          r = this.calculateCollisionRectangle();

      context.save();

      context.beginPath();

      context.strokeStyle = COLLISION_RECTANGLE_COLOR;
      context.lineWidth   = COLLISION_RECTANGLE_LINE_WIDTH;

      context.strokeRect(r.left + this.hOffset, r.top, 
                         r.right - r.left, r.bottom - r.top);

      context.restore(); // resets strokeStyle and lineWidth
   },

   draw: function (context) {
      context.save();

      context.globalAlpha = this.opacity;
      
      if (this.visible && this.artist) {
         this.artist.draw(this, context);
		// if (this.type == "AlienPodBooster")
		 //console.log("Ek word gedraw");
      }
 
      if (this.showCollisionRectangle) {
         drawCollisionRectangle();
       }

      context.restore(); // resets globalAlpha
   },

   update: function (now, fps, context, lastAnimationFrameTime) {
      
	  
	  for (var i = 0; i < this.behaviors.length; ++i) {
	  
         this.behaviors[i].execute(this, 
                                   now, 
                                   fps, 
                                   context, 
                                   lastAnimationFrameTime);
      }
   }
};