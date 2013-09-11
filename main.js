

GAMESPEED_BASE = 900;
GAMESPEED = GAMESPEED_BASE;
BULLETSPEED = 1;

var Moonrun = function () {
   
	// Super Constants...............................
	
	this.smallCanvasWidth = 200;
	this.smallCanvasHeight = 120;
	
	this.canvas_upscale = 4; //vier is beter
	this.canvas_upscale_x = 4;
	this.canvas_upscale_y = 4;
	this.MAXBULLETS = 9;
	this.MOONRAV = 40;
	this.CHARGE_FACTOR = 1;
	
	
	
	//Sound
	this.turretShootSound = 0;
	this.bulletHitGroundSound = 0;
	//Canvas Creation..................
	
	this.klein_canvas = document.createElement( 'canvas' );
    this.klein_canvas.width = this.smallCanvasWidth;
    this.klein_canvas.height = this.smallCanvasHeight;
		
	this.groot_canvas = document.createElement( 'canvas' );
	this.groot_canvas.width = this.smallCanvasWidth * this.canvas_upscale_x;
	this.groot_canvas.height = this.smallCanvasHeight * this.canvas_upscale_y;
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
	
	this.camera = {scrollspeed : 0, follow: false}
	
	this.level = {trokkie_start_x: 100, floor: 108, trokkie_lock_x: 150}
	
	this.fpsElement = document.getElementById('fps');
	
	//Background Images
	this.background_image_width = 480;
	
	this.spritesheet = new Image(); // Al die sprites
	
	
	
	this.stars_offset1 = 0;
	this.stars_offset2 = -this.background_image_width; //img width
	this.stars_vel = this.camera.scrollspeed/2;
	
	
	this.mountains_offset1 = 0;
	this.mountains_offset2 = -this.background_image_width;
	this.mountains_vel = this.camera.scrollspeed*7; //makie sakie, want stars bepaal hom

	this.rocks_offset1 = 0;
	this.rocks_offset2 = -this.background_image_width;
	this.rocks_vel = this.camera.scrollspeed*22; //makie sakie, want stars bepaal hom
	
	
	//Trokkie
	
	//Sprites...
	
	this.trokkieCell = [{ left: 0,   top: 186, 
        width: 40, height: 21 }];
	
	this.grootwielCell = [{ left: 0,   top: 207, 
        width: 9, height: 9 }];
	
	this.kleinwielCell = [{ left: 0,   top: 216, 
        width: 7, height: 7 }];
	
	
	this.groundEXP_WIDTH = 17;
	this.groundEXP_HEIGHT = 8;
	
	this.groundEXPCells = [
      { left: 0, top: 223, 
        width: 17, height: 8},

      { left: this.groundEXP_WIDTH, top: 223, 
        width: 17, height: 8 },

      { left: this.groundEXP_WIDTH*2, top: 223, 
        width: 17, height: 8 },

      { left: this.groundEXP_WIDTH*3, top: 223, 
        width: 17, height: 8 },
	
      { left: this.groundEXP_WIDTH*4, top: 223, 
        width: 17, height: 8},

      { left: this.groundEXP_WIDTH*5, top: 223, 
        width: 17, height: 8 },

      { left: this.groundEXP_WIDTH*6, top: 223, 
        width: 17, height: 8 },

      { left: this.groundEXP_WIDTH*7, top: 223, 
        width: 17, height: 8 },
		
	  { left: this.groundEXP_WIDTH*8, top: 223, 
        width: 17, height: 8 },
		
   ];
	
	
	this.AlienPod_WIDTH = 14;
	this.AlienPod_HEIGHT = 13;
	
	this.AlienPodCells = [
      { left: 0, top: 231, 
        width: 14, height: 13},

      { left: this.AlienPod_WIDTH, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },

      { left: this.AlienPod_WIDTH*2, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },

      { left: this.AlienPod_WIDTH*3, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },
	
      { left: this.AlienPod_WIDTH*4, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT},

      { left: this.AlienPod_WIDTH*5, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },

      { left: this.AlienPod_WIDTH*6, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },

      { left: this.AlienPod_WIDTH*7, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },
		
	  
		
   ];
   
    this.AlienPodPartRoofCells = [{ left: this.AlienPod_WIDTH*8, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },
	];	

	this.AlienPodPartLeftCells = [{ left: this.AlienPod_WIDTH*9, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },
	];

	this.AlienPodPartRightCells = [{ left: this.AlienPod_WIDTH*10, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },
	];	
   
   
   this.AlienPodBoosterCells = [
      { left: 0, top: 244, 
        width: 4, height: 4},

      { left: 4, top: 244, 
        width: 4, height:4 },

      { left: 8, top: 244, 
        width: 4, height: 4},

      { left: 12, top: 244, 
        width: 4, height: 4 },
	
      { left: 16, top: 244, 
        width:4, height: 4},

      { left: 20, top: 244, 
        width: 4, height: 4 },

      { left: 24, top: 244, 
        width: 4, height: 4 },

      { left: 28, top: 244, 
        width: 4, height: 4 },
		
	  { left: 32, top: 244, 
        width: 4, height: 4 },
	
      { left: 36, top: 244, 
        width: 4, height: 4},

       
		
   ];
	
	this.BulletCells = [
      { left: 0, top: 248, 
        width: 3, height: 4},
		
		{ left: 3, top: 248, 
        width: 3, height: 4},
	
	{ left: 6, top: 248, 
        width: 3, height: 4},
		
		{ left: 9, top: 248, 
        width: 3, height: 4},
      
		
   ];
   
   this.grootExplosion_WIDTH = 53;
   this.grootExplosion_HEIGHT = 40;
   
   
   this.grootExplosionCells = [
     { left: 0, top: 252, 
        width: 53, height: 40},
	 
	 { left: this.grootExplosion_WIDTH, top: 252, 
        width: 53, height: 40},
	
     { left: this.grootExplosion_WIDTH*2, top: 252, 
        width: 53, height: 40}, 	
		
     { left: this.grootExplosion_WIDTH*3, top: 252, 
        width: 53, height: 40},  
		
	 { left: this.grootExplosion_WIDTH*4, top: 252, 
        width: 53, height: 40},
		
	 { left: this.grootExplosion_WIDTH*5, top: 252, 
        width: 53, height: 40},
		
	 { left: this.grootExplosion_WIDTH*6, top: 252, 
        width: 53, height: 40},
		
	 { left: this.grootExplosion_WIDTH*7, top: 252, 
        width: 53, height: 40},
		
	 { left: this.grootExplosion_WIDTH*8, top: 252, 
        width: 53, height: 40},
		
	 { left: 0, top: 292, 
        width: 53, height: 40},	
	
 	 { left: this.grootExplosion_WIDTH, top: 292, 
         width: 53, height: 40},
		 
	 { left: this.grootExplosion_WIDTH*2, top: 292, 
         width: 53, height: 40},

	 { left: this.grootExplosion_WIDTH*3, top: 292, 
			 width: 53, height: 40},

	 { left: this.grootExplosion_WIDTH*4, top: 292, 
			 width: 53, height: 40},

	 { left: this.grootExplosion_WIDTH*5, top: 292, 
			 width: 53, height: 40},		
	
	{ left: this.grootExplosion_WIDTH*6, top: 292, 
			 width: 53, height: 40},					 

		
   ];
   
   
   
   
	
	//Data...
	
	
	this.alienPodData =  {x: 150,  y: 90, speed:26};
	
	
	this.trokkieData =  {x: this.level.trokkie_start_x,  y: 90, speed:22}; //speed 22 is werk goed saam met camera scrollspeed 1
	
	this.grootwielData = {x: 18, y:11, angle:0, radius:4.5, rotation_speed:0};
	this.grootwielData.rotation_speed = ((1 / this.grootwielData.radius) * this.trokkieData.speed);
	
	this.kleinwielData = {x: 2, y:13, angle:23, radius:3.5, rotation_speed:0};
	this.kleinwielData.rotation_speed = ((1 / this.kleinwielData.radius) * this.trokkieData.speed);
	
	this.turretData = { 
	
	x: 9.5, 
	y:6.5, 
	width: 2.3, 
	length:9,  
	angle: Math.PI+0.5, 
	color:'#5F5F5F',
	
	//HIERIE VIER HANG AF VAN this.MOONGRAV!!
	
	charge_level: 20*this.CHARGE_FACTOR,
	charge_rate: 40*this.CHARGE_FACTOR,
	base_charge_level: 20*this.CHARGE_FACTOR,
	max_charge_level: 120*this.CHARGE_FACTOR,
	
	cooldown: 0,
	max_cooldown: 100, // recharge points
	cooldown_recharge: 140, //recharge points per second
	
	charging : false	};
	
	this.gageData = { 
	
	x: 5, 
	y:10.5, 
	width: 1, 
	
	middle:0,
	length:9,  
	
	color1:'#605743', 
	color2:'#201713', 
	color3:'#ff3411'
	
	
	};
	
	
	this.bulletData = 	{ x: 50, y:50, velx:0, vely: 0, accx: 0, accy : 0, radius:2, angle: Math.PI+0.5, power:0, colour:'#887634'};
		
	
	this.trokkieSprite;
	this.grootwielSprite;
	this.kleinwielSprite;
	this.turretSprite;
	this.gageSprite;
	
	
	this.effects = [];
	this.bulletsSprites = [];
	this.targetSprites = [];
	this.sprites = [];
	
	
	//BEHAVIOURS
	this.trokkieBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
         
		sprite.myData.x += ((sprite.myData.speed - 22*sprite.myCamera.scrollspeed) * ((now - lastAnimationFrameTime) / GAMESPEED) );
		 
		 
		sprite.left = sprite.myData.x; 
		sprite.top = sprite.myData.y;
      }
    };
	
	
	this.turretBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
        
		//console.log("sprite.myData.cooldown: " + sprite.myData.cooldown);
		
		if (sprite.myData.cooldown < sprite.myData.max_cooldown) {
		sprite.myData.cooldown += sprite.myData.cooldown_recharge * ((now - lastAnimationFrameTime) / GAMESPEED);
		}
		else sprite.myData.cooldown = sprite.myData.max_cooldown;
		
		if ((sprite.myData.charging == true)&&(sprite.myData.charge_level < sprite.myData.max_charge_level)){
		 sprite.myData.charge_level += sprite.myData.charge_rate * ((now - lastAnimationFrameTime) / GAMESPEED);
			
		}
      
	    sprite.left = sprite.myData.x + sprite.myTrokkieData.x;
		sprite.top = sprite.myData.y + sprite.myTrokkieData.y;
	  }
    };
	
	this.gageBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {

		sprite.left = sprite.myData.x + sprite.myTrokkieData.x;
		sprite.top = sprite.myData.y + sprite.myTrokkieData.y;
		sprite.myData.middle = ((sprite.myTurretData.charge_level-sprite.myTurretData.base_charge_level)/(sprite.myTurretData.max_charge_level-sprite.myTurretData.base_charge_level)) * sprite.myData.length
		
		
		}
	};					
	
	this.wielDraaiBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
         sprite.myData.angle += sprite.myData.rotation_speed * ((now - lastAnimationFrameTime) / GAMESPEED);
		 sprite.left = sprite.myData.x + sprite.myTrokkieData.x;
		 sprite.top = sprite.myData.y + sprite.myTrokkieData.y;
	 
      }
    };
	this.bulletBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
		sprite.velx += sprite.accx * ((now - lastAnimationFrameTime) / GAMESPEED);
		sprite.vely += sprite.accy * ((now - lastAnimationFrameTime) / GAMESPEED);        
		sprite.x += sprite.velx * ((now - lastAnimationFrameTime) / GAMESPEED);
		sprite.y += sprite.vely * ((now - lastAnimationFrameTime) / GAMESPEED);
		  
		if (sprite.velx < 0)
		sprite.angle = (Math.atan(sprite.vely/sprite.velx))-Math.PI/2;
		else
		sprite.angle = (Math.atan(sprite.vely/sprite.velx))-(Math.PI/2)+(Math.PI);
		
		sprite.left = sprite.x; 
		sprite.top = sprite.y;
		
      }
    };
  
    this.groundEXPBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
	  
		 
		sprite.velx = sprite.myRocksVel; 
		
	  
		sprite.x += Math.floor(sprite.velx) * (now - lastAnimationFrameTime) / GAMESPEED;
	  
	  
	  }
   };
   
     this.grootExplosionBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
	  
		
		
		sprite.velx = sprite.myRocksVel; 
		
	  
		sprite.x += Math.floor(sprite.velx) * (now - lastAnimationFrameTime) / GAMESPEED;
	  
	  
	  }
   };
   
    this.alienPodBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
		if (sprite.y < 40){
			sprite.booster_flame.visible = false;
			sprite.vely += sprite.accy * (now - lastAnimationFrameTime) / GAMESPEED;
			sprite.booster_flame.artist.cellIndex = 0;
			
		}
		else
		{
			sprite.vely += sprite.boost_accy * (now - lastAnimationFrameTime) / GAMESPEED;
			sprite.booster_flame.visible = true;
		}
		
		sprite.x += (sprite.velx) * (now - lastAnimationFrameTime) / GAMESPEED;
		sprite.y += (sprite.vely) * (now - lastAnimationFrameTime) / GAMESPEED;
		
		sprite.booster_flame.update(now, 
             fps, 
             context,
             lastAnimationFrameTime);
			 
		sprite.left = sprite.x; 
		sprite.top = sprite.y;

		sprite.booster_flame.left = sprite.x; 
		sprite.booster_flame.top = sprite.y; 	 
				 
      }
   };
   
   this.alienPodPartBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
		sprite.velx += sprite.accx * ((now - lastAnimationFrameTime) / GAMESPEED);
		sprite.vely += sprite.accy * ((now - lastAnimationFrameTime) / GAMESPEED);        
		sprite.x += sprite.velx * ((now - lastAnimationFrameTime) / GAMESPEED);
		sprite.y += sprite.vely * ((now - lastAnimationFrameTime) / GAMESPEED);
		  
	//	
		sprite.angle += sprite.rotation_speed * ((now - lastAnimationFrameTime) / GAMESPEED);;
		
		sprite.left = sprite.x; 
		sprite.top = sprite.y;
		
		//console.log("sprite.top behave" + sprite.top);
		
      }
    };
   //Artists
	
  
  
    this.gageArtist = {
      draw: function (sprite, context) {
       
		context.save();
			context.beginPath();
			context.lineWidth = sprite.myData.width;
			context.moveTo(sprite.left,sprite.top);
			context.lineTo(sprite.left+sprite.myData.middle, sprite.top);
		
			if (sprite.myTurretData.charge_level > sprite.myTurretData.max_charge_level)
			context.strokeStyle = sprite.myData.color3;
			else
			context.strokeStyle = sprite.myData.color1;
			context.stroke();
			
			context.beginPath();
			context.lineWidth = sprite.myData.width;
			context.moveTo(sprite.left+sprite.myData.middle,sprite.top);
			context.lineTo(sprite.left+sprite.myData.length, sprite.top);
			context.strokeStyle = sprite.myData.color2;
			context.stroke();
		
			if (sprite.myTurretData.cooldown >= sprite.myTurretData.max_cooldown)
			context.fillStyle = '#00aa00';
			else
			context.fillStyle = '#bb2222';
		
			context.fillRect(sprite.left+sprite.myData.length+1, sprite.top-5.5, 1, 1);
		context.restore();
		
      }
   };

};
  
Moonrun.prototype = {
    createSprites: function () {
      this.createTrokkieSprites(); 
      
	  this.addSpritesToSpriteArray();
    },

    addSpritesToSpriteArray: function () {
      this.sprites.push(this.turretSprite);
      this.sprites.push(this.trokkieSprite);
	  this.sprites.push(this.gageSprite);
      this.sprites.push(this.grootwielSprite);
	  this.sprites.push(this.kleinwielSprite);
    },
   

    leveldo: function(){
	
		if (this.trokkieSprite.myData.x > this.level.trokkie_lock_x){
			
				this.camera.lock = true;
				this.trokkieSprite.myData.x = this.level.trokkie_lock_x;
				
			}
		
		    
			
		if 	(this.camera.lock)	{
		
			this.camera.scrollspeed = this.trokkieSprite.myData.speed/22; //ratio constant
		
		}else{
		
			this.turretData.cooldown = 0;
		
		}
		
		this.stars_vel = this.camera.scrollspeed/2;
		this.mountains_vel = this.camera.scrollspeed*7; //makie sakie, want stars bepaal hom
		this.rocks_vel = this.camera.scrollspeed*22; //makie sakie, want stars bepaal hom
		
			
	
	},
	createTrokkieSprites: function () {
		this.trokkieSprite = new Sprite('trokkie',
                          new TrokkieSheetArtist(this.spritesheet, 
                                                this.trokkieCell),
												[this.trokkieBehavior]);
											
		this.trokkieSprite.width = this.trokkieCell[0].width;
		this.trokkieSprite.height = this.trokkieCell[0].height;
		this.trokkieSprite.myData = this.trokkieData;
		this.trokkieSprite.myCamera = this.camera;
		this.grootwielSprite = new Sprite('grootwiel',
                          new wielArtist(this.spritesheet, 
                                                this.grootwielCell),[this.wielDraaiBehavior]);
		this.grootwielSprite.myTrokkieData = this.trokkieData;
		this.grootwielSprite.myData = this.grootwielData;
		this.grootwielSprite.width = this.grootwielCell[0].width;
		this.grootwielSprite.height = this.grootwielCell[0].height;										

		this.kleinwielSprite = new Sprite('kleinwiel',
                          new wielArtist(this.spritesheet, 
                                                this.kleinwielCell), [this.wielDraaiBehavior]);
		this.kleinwielSprite.myTrokkieData = this.trokkieData;
		this.kleinwielSprite.myData = this.kleinwielData;
		this.kleinwielSprite.width = this.kleinwielCell[0].width;
		this.kleinwielSprite.height = this.kleinwielCell[0].height;												
												
		this.turretSprite = new Sprite('turret', new turretArtist(), [this.turretBehavior]);
		this.turretSprite.myData = this.turretData; 
		this.turretSprite.myData.cooldown = 0;
		this.turretSprite.myTrokkieData = this.trokkieData;   
		
		this.gageSprite = new Sprite('gage', this.gageArtist, [this.gageBehavior]);
		this.gageSprite.myData = this.gageData; 
		this.gageSprite.myTrokkieData = this.trokkieData;
		this.gageSprite.myTurretData = this.turretData;
      
		
	},
	createBulletSprite : function () {
	
		var bulletSprite;
	
		if (this.bulletCount < this.MAXBULLETS){
			this.bulletCount += 1;
		}
		else{
			this.bulletCount = 0;
		}
		bulletSprite = new Sprite('bullet',
							  new BulletSheetArtist(this.spritesheet, this.BulletCells), [new CycleBehavior(100, 0), this.bulletBehavior]);	
		bulletSprite.myTurretData = this.turretData;
		bulletSprite.power = this.turretData.charge_level;
		bulletSprite.accy = this.MOONRAV;
		bulletSprite.accx = 0;
		bulletSprite.radius = this.bulletData.radius;
		bulletSprite.angle = 0;
		bulletSprite.rotation_speed = (Math.random()*10)+4;
		
		bulletSprite.x = this.trokkieData.x + bulletSprite.myTurretData.x + Math.cos(bulletSprite.myTurretData.angle)*bulletSprite.myTurretData.length;
		bulletSprite.y = this.trokkieData.y + bulletSprite.myTurretData.y + Math.sin(bulletSprite.myTurretData.angle)*bulletSprite.myTurretData.length;
		bulletSprite.velx = Math.cos(bulletSprite.myTurretData.angle)*bulletSprite.power;
		bulletSprite.vely = Math.sin(bulletSprite.myTurretData.angle)*bulletSprite.power;
		
		this.bulletsSprites.push(bulletSprite);
	},

	createAlienPodSprite : function (px,py) {
		
		var AlienPodSprite; 
		
		AlienPodSprite = new Sprite('AlienPod',
                          new AlienPodSheetArtist(this.spritesheet, 
                                                this.AlienPodCells),
												[ new CycleBehavior(300, 0), this.alienPodBehavior ]
												);	
		AlienPodSprite.booster_flame = 	new Sprite('AlienPodBooster',
                          new AlienPodBoosterSheetArtist(this.spritesheet, 
                                                this.AlienPodBoosterCells),
												[ new CycleBehavior(50, 0)]
												);										
		AlienPodSprite.width = this.AlienPodCells[0].width;
		AlienPodSprite.height = this.AlienPodCells[0].height;
		AlienPodSprite.x = px;
		AlienPodSprite.y = py;
		AlienPodSprite.velx = 10;
		AlienPodSprite.vely = 0;
		AlienPodSprite.accy = 2;
		AlienPodSprite.boost_accy = -5;
		this.targetSprites.push(AlienPodSprite);
	},

	creategroundEXPSprite : function (dropping_sprite) {
		
		var groundEXPSprite; 
		groundEXPSprite = new Sprite('EXP',
                          new GroundEXPSheetArtist(this.spritesheet, 
                                                this.groundEXPCells),
												[ new CycleBehavior(60, 0), this.groundEXPBehavior ]
												);	
		groundEXPSprite.width = this.groundEXPCells[0].width;
		groundEXPSprite.height = this.groundEXPCells[0].height;
		groundEXPSprite.myBullet = dropping_sprite;
		
		if (dropping_sprite.type == "alienpodpart"){
			console.log("dropping_sprite.special_mid_x" + dropping_sprite.special_mid_x);
			groundEXPSprite.x = Math.floor(dropping_sprite.x + dropping_sprite.special_mid_x) - (groundEXPSprite.width/2);
			groundEXPSprite.y = Math.floor(dropping_sprite.y + dropping_sprite.special_mid_y) - (groundEXPSprite.height/2);
		
		
		}else{
			
		    groundEXPSprite.x = Math.floor(dropping_sprite.x) - (groundEXPSprite.width/2);
			groundEXPSprite.y = Math.floor(dropping_sprite.y) - (groundEXPSprite.height/2);
		}
		
		
		groundEXPSprite.myRocksVel = -this.rocks_vel;
		
		this.effects.push(groundEXPSprite);
	},
	
	
	createalienPodPartSprite : function (target, cells, parttype) {
		
		var alienPodPartSprite; 
		alienPodPartSprite = new Sprite('alienpodpart',
                          new AlienPodPartSheetArtist(this.spritesheet, cells),
												[this.alienPodPartBehavior ]);	
												
		alienPodPartSprite.width = this.AlienPodCells[0].width;
		alienPodPartSprite.height = this.AlienPodCells[0].height;
		
			
		alienPodPartSprite.x = (target.x);
		alienPodPartSprite.y = (target.y);
		
		
		if (parttype == "roof"){
		alienPodPartSprite.velx = Math.random()*10 - Math.random()*10;
		alienPodPartSprite.vely =  -(Math.random()*30 + 20);
		alienPodPartSprite.special_mid_x = 6.5;
		alienPodPartSprite.special_mid_y = 4.5;
		}
		
		if (parttype == "left"){
		alienPodPartSprite.velx = -(Math.random()*20 + 15);
		alienPodPartSprite.vely = -(Math.random()*5 + 5);
		alienPodPartSprite.special_mid_x = 3.5;
		alienPodPartSprite.special_mid_y = 9.5;
		}
		
		if (parttype == "right"){
		alienPodPartSprite.velx = Math.random()*20 + 15;
		alienPodPartSprite.vely = -(Math.random()*5 + 5)
		alienPodPartSprite.special_mid_x = 9.5;
		alienPodPartSprite.special_mid_y = 9.5;
		}
		
		alienPodPartSprite.myPartType = parttype;
		alienPodPartSprite.accx = 0;
		alienPodPartSprite.accy = this.MOONRAV;
		alienPodPartSprite.rotation_speed = Math.random()*7 - Math.random()*7;
		alienPodPartSprite.angle = 0;
		
		
		this.effects.push(alienPodPartSprite);
	},
	
	
	creategrootExplosionSprite : function (target) {
		
		var grootExplotionSprite; 
		grootExplotionSprite = new Sprite('grootExplosion',
                          new GrootExplotionSheetArtist(this.spritesheet, 
                                                this.grootExplosionCells),
												[ new CycleBehavior(60, 0), this.grootExplosionBehavior ]
												);	
		grootExplotionSprite.width = this.grootExplosionCells[0].width;
		grootExplotionSprite.height = this.grootExplosionCells[0].height;
		grootExplotionSprite.myTarget = target;
		
	
		grootExplotionSprite.x = Math.floor(target.x) - (grootExplotionSprite.width/2) + (7);
		grootExplotionSprite.y = Math.floor(target.y) - (grootExplotionSprite.height/2) + (9);
		grootExplotionSprite.myRocksVel = -this.rocks_vel/2;
		
		console.log(grootExplotionSprite);
		
		this.effects.push(grootExplotionSprite);
	},
	

	bulletCollision : function(){
 	  var Bsprite;
	  var Tsprite;
      for (var i=0; i < this.bulletsSprites.length; ++i) {
         Bsprite = this.bulletsSprites[i];
		 
		

		if (Bsprite.x < 0){
		
			this.bulletsSprites.splice(i,1);
			
		}else
		
		if (Bsprite.y > this.level.floor){
							
			
			this.creategroundEXPSprite(Bsprite);
			
			this.bulletsSprites.splice(i,1);
			this.bulletHitGroundSound.play();
		}else
			
			for (var j=0; j < this.targetSprites.length; ++j) {
				Tsprite = this.targetSprites[j]; 
						
				if (Tsprite.type == "AlienPod"){
				
					if (!((Tsprite.y + Tsprite.height < Bsprite.y) || (Tsprite.y+6 > Bsprite.y) || (Tsprite.x+2 > Bsprite.x) || (Tsprite.x + Tsprite.width - 2 < Bsprite.x))){
					
						
						
						this.createalienPodPartSprite(Tsprite,this.AlienPodPartRoofCells, "roof");
						this.createalienPodPartSprite(Tsprite,this.AlienPodPartLeftCells, "left");
						this.createalienPodPartSprite(Tsprite,this.AlienPodPartRightCells, "right");
						
						this.creategrootExplosionSprite(Tsprite);
						
						
						this.bulletsSprites.splice(i,1);
						this.targetSprites.splice(j,1);
						this.AlienExplodesSound.play();
					}
				}
				
			
			
			} 
		
		} 
	},
	
	chargeTurret: function(){
		if (this.turretData.charge_level < this.turretData.max_charge_level)
		this.turretData.charging = true;
    },
		
	shootBullet: function(){
		
		if (this.turretData.cooldown >= this.turretData.max_cooldown){
		
			this.createBulletSprite();
			this.turretData.cooldown = 0;
			this.turretShootSound.play();
		}
		this.turretData.charge_level = this.turretData.base_charge_level;
		this.turretData.charging = false;
	},
	
	isSpriteInView: function(sprite) {
    return sprite.left + sprite.width > sprite.hOffset &&
             sprite.left < sprite.hOffset + this.klein_canvas.width;
		 
    },
 
	updateEffectsSprites: function (now) {
      var sprite;
      for (var i=0; i < this.effects.length; ++i) {
         sprite = this.effects[i];
		
		
		 if (sprite.type == "alienpodpart"){
				
				if (sprite.y + sprite.special_mid_y > this.level.floor){
				sprite.visible = false;
				this.creategroundEXPSprite(sprite);
				this.bulletHitGroundSound.play();
				}
			};

		
         if (sprite.visible && this.isSpriteInView(sprite)) {
       	   sprite.update(now, 
             this.fps, 
             this.ctx,
             this.lastAnimationFrameTime);
		  
		  } else 
			this.effects.splice(i,1);
	     
		}
    },
	
	
	
	
	
	updateBulletSprites: function (now) {
      var sprite;
      for (var i=0; i < this.bulletsSprites.length; ++i) {
         sprite = this.bulletsSprites[i];
         if (sprite.visible && this.isSpriteInView(sprite)) {
            sprite.update(now, 
             this.fps, 
             this.ctx,
             this.lastAnimationFrameTime);
         } 
      }
    },
	
	updateTargetSprites: function (now) {
      var sprite;
	     for (var i=0; i < this.targetSprites.length; ++i) {
         sprite = this.targetSprites[i];
         if (sprite.visible && this.isSpriteInView(sprite)) {
    		 sprite.update(now, 
             this.fps, 
             this.ctx,
             this.lastAnimationFrameTime);
         } 
      }
    },
	
	updateSprites: function (now) {
      var sprite;

      for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];

             sprite.update(now, 
             this.fps, 
             this.ctx,
             this.lastAnimationFrameTime);
         
      }
    },
	
	drawTargets: function() {
      var sprite;
	  for (var i=0; i < this.targetSprites.length; ++i) {
         sprite = this.targetSprites[i];
         if (sprite.visible && this.isSpriteInView(sprite)) {
    		this.ctx.translate(-sprite.hOffset, 0);
  			sprite.draw(this.ctx);
            this.ctx.translate(sprite.hOffset, 0);
         } 
       }
    },

	drawBullets: function() {
      var sprite;
	  for (var i=0; i < this.bulletsSprites.length; ++i) {
         sprite = this.bulletsSprites[i];
	     if (sprite.visible && this.isSpriteInView(sprite)) {
    		this.ctx.translate(-sprite.hOffset, 0);
			sprite.draw(this.ctx);
            this.ctx.translate(sprite.hOffset, 0);
         } 
      }
    },
	
	drawEffects: function() {
      var sprite;
	  for (var i=0; i < this.effects.length; ++i) {
         sprite = this.effects[i];
	
         if (sprite.visible && this.isSpriteInView(sprite)) {
			this.ctx.translate(-sprite.hOffset, 0);
     		sprite.draw(this.ctx);
            this.ctx.translate(sprite.hOffset, 0);
         } 
        }
    },
	
    drawSprites: function() {
      var sprite;
	  for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];
	
         if (sprite.visible && this.isSpriteInView(sprite)) {
			this.ctx.translate(-sprite.hOffset, 0);
            sprite.draw(this.ctx);
	        this.ctx.translate(sprite.hOffset, 0);
         } 
      }
    },
	
	small_draw: function(now){
		
		
		this.bulletCollision();
		
		this.updateSprites(now);
        this.updateBulletSprites(now);
		this.updateEffectsSprites(now);
		this.updateTargetSprites(now);
		
		
	
		this.drawBackground();
		this.drawEffects();
		this.drawSprites();
		this.drawBullets();
		this.drawTargets();
		this.drawForeground();
	
	},
	
	draw: function (now) {
	  
	  this.keyboard();
	  this.timer++;	
	  this.leveldo();
	  this.setStartBackgroundOffset(now);
	  this.small_draw(now);
	  this.grootmaak();
	
	},
  
    setStartBackgroundOffset: function(now) {
	   
	   this.stars_offset1 += this.stars_vel * (now - this.lastAnimationFrameTime) / GAMESPEED;
	   this.stars_offset2 += this.stars_vel * (now - this.lastAnimationFrameTime) / GAMESPEED;

	   if (this.stars_offset1 > this.background_image_width) {
		  
		  this.stars_offset1 = this.stars_offset2 - this.background_image_width
		  }
	   if (this.stars_offset2 > this.background_image_width) {
		  
		  this.stars_offset2 = this.stars_offset1 - this.background_image_width
		  }  
		  
	   this.mountains_offset1 += this.mountains_vel * (now - this.lastAnimationFrameTime) / GAMESPEED;
	   this.mountains_offset2 += this.mountains_vel * (now - this.lastAnimationFrameTime) / GAMESPEED;

	   if (this.mountains_offset1 > this.background_image_width) {
		  
		  this.mountains_offset1 = this.mountains_offset2 - this.background_image_width
		  }  
		if (this.mountains_offset2 > this.background_image_width) {
		 
		  this.mountains_offset2 = this.mountains_offset1 - this.background_image_width
		  }    
		  
		this.rocks_offset1 += this.rocks_vel * (now - this.lastAnimationFrameTime) / GAMESPEED;
	    this.rocks_offset2 += this.rocks_vel * (now - this.lastAnimationFrameTime) / GAMESPEED;

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
				
				
				x = xi;
				y = yi;
				this.ctx2.save();
					this.ctx2.scale(this.canvas_upscale_x,this.canvas_upscale_y);
					this.ctx2.fillStyle  = "rgba("+ this.imagedata.data[i]+","+ this.imagedata.data[i+1]+","+this.imagedata.data[i+2]+",255)";
					this.ctx2.fillRect(x,y,1,1);
				this.ctx2.restore();
			}
			xi = xi + 1;
		}
		this.old_imagedata = this.imagedata
	},

	animate: function (now) { 
      if (moonrun.paused) {
         setTimeout( function () {
            requestNextAnimationFrame(moonrun.animate);
         }, moonrun.PAUSED_CHECK_INTERVAL);
      }
      else {
         moonrun.fps = moonrun.calculateFps(now); 
         moonrun.draw(now);
         moonrun.lastAnimationFrameTime = now;
         requestNextAnimationFrame(moonrun.animate);
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
      this.turretShootSound = new Audio("nes-13-00.wav");
	  this.bulletHitGroundSound = new Audio("nes-00-00.wav");
	  this.AlienExplodesSound = new Audio("nes-15-00.wav");

      this.spritesheet.onload = function (e) {
		moonrun.startGame();
      };
   },

   startGame: function () {
	  moonrun.constructor();
	  requestNextAnimationFrame(this.animate);
   },

   
	keyboard: function() {
		
			if (Key.isDown(Key.a)){
			  this.chargeTurret();
			} 
			
			if (Key.isDown(Key.c)){
			
			GAMESPEED = 30800; //-900 reverse!!!
			}else
			GAMESPEED = GAMESPEED_BASE;		
			
			
			if (Key.isDown(Key.LEFT)) 
			if (this.turretData.angle > (Math.PI))
				this.turretData.angle = this.turretData.angle - 0.04;
			
				
			if (Key.isDown(Key.RIGHT)) 
			if (this.turretData.angle < (Math.PI+(Math.PI/1.5)))
				this.turretData.angle = this.turretData.angle + 0.04;
					  
											
		}  
};
// daai anner bra se se shit.....http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  a : 65,
  c : 67,
  
  
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


	window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
	
	window.onkeyup = function (e) {
	   var key = e.keyCode;
		
	   if (key === 65) { // 'd' or left arrow
		 
		 moonrun.shootBullet();
		  
	   }
		
	
	}
	
	window.onkeydown = function (e) {
	   var key = e.keyCode;
	
	   if (key === 68) { // 'd'
		
		moonrun.createAlienPodSprite(-14,45);
		 
		  
	   }
	   else if (key === 75 || key === 39) { // 'k' or right arrow
		 
	   }
	
	   if (key === 80) { // 'p'*/
		 moonrun.togglePaused();
		 
	   }
	};

	window.onblur = function (e) {  // pause if unpaused
	   moonrun.windowHasFocus = false;
	   
	   if ( ! moonrun.paused) {
		  moonrun.togglePaused();
	   }
	};

	window.onfocus = function (e) {  // unpause if paused
	   if (moonrun.paused) {
		  moonrun.togglePaused();
	   }
	};
   
   
var moonrun = new Moonrun();
moonrun.initializeImages(); 
moonrun.createSprites();
