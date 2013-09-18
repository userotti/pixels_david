

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

	this.CHARGE_FACTOR = 1;
	
	
	
	//Sound
	this.turretShootSound = 0;
	this.bulletHitGroundSound = 0;
	//Canvas Creation..................
	
	this.klein_game_canvas = document.createElement( 'canvas' );
    this.klein_game_canvas.width = this.smallCanvasWidth;
    this.klein_game_canvas.height = this.smallCanvasHeight;
		
	this.groot_game_canvas = document.createElement( 'canvas' );
	this.groot_game_canvas.width = this.smallCanvasWidth * this.canvas_upscale_x;
	this.groot_game_canvas.height = this.smallCanvasHeight * this.canvas_upscale_y;
	this.groot_game_canvas.id = "game-canvas";
	
	this.klein_game_canvas_context = this.klein_game_canvas.getContext( '2d' );
    this.groot_game_canvas_context = this.groot_game_canvas.getContext( '2d' );
	
	
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
	
	this.camera = {scrollspeed :0.7, follow: false}
	
	this.level = {trokkie_start_x: 150, floor: 108, trokkie_lock_x: 155, moongrav: 40}
	
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
	
	{ //CELLS
	
	
	this.trokkieCell = [{ left: 0,   top: 186, 
        width: 40, height: 21 }];
	
	this.grootwielCell = [{ left: 0,   top: 207, 
        width: 9, height: 9 }];
	
	this.kleinwielCell = [{ left: 0,   top: 216, 
        width: 7, height: 7 }];
	
	
	this.groundDirtExplosion_WIDTH = 17;
	this.groundDirtExplosion_HEIGHT = 8;
	
	this.groundDirtExplosionCells = [
      { left: 0, top: 223, 
        width: 17, height: 8},

      { left: this.groundDirtExplosion_WIDTH, top: 223, 
        width: 17, height: 8 },

      { left: this.groundDirtExplosion_WIDTH*2, top: 223, 
        width: 17, height: 8 },

      { left: this.groundDirtExplosion_WIDTH*3, top: 223, 
        width: 17, height: 8 },
	
      { left: this.groundDirtExplosion_WIDTH*4, top: 223, 
        width: 17, height: 8},

      { left: this.groundDirtExplosion_WIDTH*5, top: 223, 
        width: 17, height: 8 },

      { left: this.groundDirtExplosion_WIDTH*6, top: 223, 
        width: 17, height: 8 },

      { left: this.groundDirtExplosion_WIDTH*7, top: 223, 
        width: 17, height: 8 },
		
	  { left: this.groundDirtExplosion_WIDTH*8, top: 223, 
        width: 17, height: 8 },
		
   ];
	
	this.groundDebreDropCells = [
      { left: 0, top: 336, 
        width: 7, height: 5},

      { left: 7, top: 336, 
        width: 7, height: 5 },

      { left: 14, top: 336, 
        width: 7, height: 5 },

      { left: 21, top: 336, 
        width: 7, height: 5 },
	
     
		
   ];
   
   	this.hitSparksCells = [
      { left: 0, top: 341, 
        width: 8, height: 8},

      { left: 8, top: 341, 
        width: 8, height: 8 },

      { left: 16, top: 341, 
        width: 8, height: 8 },

      { left: 24, top: 341, 
        width: 8, height: 8 },
	
      { left: 32, top: 341, 
        width: 8, height: 8 },
	
		{ left: 40, top: 341, 
			width: 8, height: 8 },	
		
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
   
   this.AlienPodDamagedLookCells = [
      { left: this.AlienPod_WIDTH*11, top: 231, 
        width: this.AlienPod_WIDTH, height: 13},

      { left: this.AlienPod_WIDTH*12, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },

      { left: this.AlienPod_WIDTH*13, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },

      { left: this.AlienPod_WIDTH*14, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },
	
      { left: this.AlienPod_WIDTH*15, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT},

      { left: this.AlienPod_WIDTH*16, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },

      { left: this.AlienPod_WIDTH*17, top: 231, 
        width: this.AlienPod_WIDTH, height: this.AlienPod_HEIGHT },

      { left: this.AlienPod_WIDTH*18, top: 231, 
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
	
	this.RocketBulletCells = [
      { left: 0, top: 248, 
        width: 3, height: 4},
		
		{ left: 3, top: 248, 
        width: 3, height: 4},
	
	{ left: 6, top: 248, 
        width: 3, height: 4},
		
		{ left: 9, top: 248, 
        width: 3, height: 4},
      
		
   ];
   
   
   this.MetalBallBulletCells = [
      { left: 12, top: 248, 
        width: 3, height: 3},
		
	
      
		
   ];
   
   
    
  
   
   
   
   this.MachingunBulletCells = [
      { left: 15, top: 248, 
        width: 1, height: 2},
			
   ];
   
   
   this.ShotgunBulletCells = [
      { left: 16, top: 248, 
        width: 1, height: 1},
			
   ];
   
   
   this.RiotgunBulletCells = [
      { left: 17, top: 248, 
        width: 1, height: 2},
			
   ];
   
    this.MetalScrapBulletCells = [
      { left: 18, top: 248, 
        width: 2, height: 2},
		
	
      
		
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
   
   this.targetDebre_WIDTH = 4;
   this.targetDebre_HEIGHT = 4;
   
   
   this.targetDebreCells = [
    { left: 0, top: 332, 
        width: this.targetDebre_WIDTH, height: this.targetDebre_HEIGHT },
	 
	{ left: this.targetDebre_WIDTH, top: 332, 
        width: this.targetDebre_WIDTH, height: this.targetDebre_HEIGHT },
		
	{ left: this.targetDebre_WIDTH*2, top: 332, 
        width: this.targetDebre_WIDTH, height: this.targetDebre_HEIGHT },			 
	
	{ left: this.targetDebre_WIDTH*3, top: 332, 
        width: this.targetDebre_WIDTH, height: this.targetDebre_HEIGHT },
		
   ];
   
   };
	
	//Data...
	{ //DATA GUNS SPECIFIC this.VAR
	
	this.alienPodData =  {x: 150,  y: 90, speed:26};
	
	
	this.trokkieData =  {x: this.level.trokkie_start_x,  y: 90, speed:30}; //speed 22 is werk goed saam met camera scrollspeed 1
	
	this.grootwielData = {x: 18, y:11, angle:0, radius:4.5, rotation_speed:0};
	this.grootwielData.rotation_speed = ((1 / this.grootwielData.radius) * this.trokkieData.speed);
	
	this.kleinwielData = {x: 2, y:13, angle:23, radius:3.5, rotation_speed:0};
	this.kleinwielData.rotation_speed = ((1 / this.kleinwielData.radius) * this.trokkieData.speed);
	
	this.turretData = { 
	
	x: 9.5, 
	y:6.5, 
	width: 2.4, 
	length:9,  
	angle: Math.PI+0.5, 
	color:'#5F5F5F',
	

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
	
	this.rocketLauncherWeapon = {
	
		bulletSpriteCells : this.RocketBulletCells,
		tarveling_style : "torpedo",
		groundhit_type : "largecrator",
		
		min_angle : (Math.PI)+(Math.PI/3), //70 ISH
		max_angle : Math.PI+(Math.PI/1.75), //120 ISH
		
		charge_level: 20*this.CHARGE_FACTOR,
		charge_rate: 40*this.CHARGE_FACTOR,
		base_charge_level: 20*this.CHARGE_FACTOR,
		max_charge_level: 120*this.CHARGE_FACTOR,
		autoRelease: false,
		cooldown: 100,
		max_cooldown: 100, // recharge points
		cooldown_recharge: 50, //recharge points per second
		angle_random_offset : 0,
		charging : false,
		damage: 100,
		type: "rocketlauncher",
	
	}
	
	this.MetalScrapCannonWeapon = {
	
		
		bulletSpriteCells : this.MetalScrapBulletCells,
		tarveling_style : "spinning",
		groundhit_type : "smallcrator",
		
		min_angle : Math.PI, //0
		max_angle : (Math.PI)+(Math.PI/2), //90
		
		charge_level: 10*this.CHARGE_FACTOR,
		charge_rate: 50*this.CHARGE_FACTOR,
		base_charge_level: 10*this.CHARGE_FACTOR,
		max_charge_level: 80*this.CHARGE_FACTOR,
		autoRelease: false,
		cooldown: 100,
		max_cooldown: 100, // recharge points
		cooldown_recharge: 130, //rec
		//harge points per second
		angle_random_offset : 0.1,
		charging : false,
		damage: 34,
		type: "metalscrap",
	}
	
	
	this.ScrapRepeaterWeapon = {
	
		
		bulletSpriteCells : this.MetalScrapBulletCells,
		tarveling_style : "spinning",
		groundhit_type : "smallcrator",
		
		min_angle : Math.PI,
		max_angle : Math.PI+(Math.PI/1.5),
		
		charge_level: 10*this.CHARGE_FACTOR,
		charge_rate: 100*this.CHARGE_FACTOR,
		base_charge_level: 10*this.CHARGE_FACTOR,
		max_charge_level: 75*this.CHARGE_FACTOR,
		autoRelease: true,
		cooldown: 100,
		max_cooldown: 100, // recharge points
		cooldown_recharge: 240, //rec
		//harge points per second
		angle_random_offset : 0.17,
		charging : false,
		damage: 14,
		type: "metalscrap",
	}
	
	
	this.MetalBallCannonWeapon = {
	
		
		bulletSpriteCells : this.MetalBallBulletCells,
		tarveling_style : "spinning",
		groundhit_type : "largecrator",
		
		min_angle : Math.PI,
		max_angle : Math.PI+(Math.PI/1.5),
		
		charge_level: 40*this.CHARGE_FACTOR,
		charge_rate: 50*this.CHARGE_FACTOR,
		base_charge_level: 40*this.CHARGE_FACTOR,
		max_charge_level: 120*this.CHARGE_FACTOR,
		autoRelease: false,
		cooldown: 100,
		max_cooldown: 100, // recharge points
		cooldown_recharge: 130, //rec
		//harge points per second
		angle_random_offset : 0,
		charging : false,
		damage: 51,
		type: "metalball",
	}
	
	
	this.machineGunWeapon = {
	
		
		bulletSpriteCells : this.MachingunBulletCells,
		tarveling_style : "torpedo",
		groundhit_type : "smallcrator",
		
		min_angle : Math.PI,
		max_angle : Math.PI+(Math.PI/1.5),
		
		charge_level: 20*this.CHARGE_FACTOR,
		charge_rate: 850*this.CHARGE_FACTOR,
		base_charge_level: 20*this.CHARGE_FACTOR,
		max_charge_level: 120*this.CHARGE_FACTOR,
		autoRelease: true,
		cooldown: 100,
		max_cooldown: 100, // recharge points
		cooldown_recharge: 700, //rec
		//harge points per second
		
		
		angle_random_offset : 0.1,
		
		charging : false,
		damage: 6,
		type: "machinegun",
	
	}
	
	
	this.shotGunWeapon = {
	
		
		bulletSpriteCells : this.ShotgunBulletCells,
		tarveling_style : "spinning",
		groundhit_type : "smallcrator",
		
		min_angle : Math.PI,
		max_angle : Math.PI+(Math.PI/1.5),
		
		charge_level: 50*this.CHARGE_FACTOR,
		charge_rate: 50*this.CHARGE_FACTOR,
		base_charge_level: 50*this.CHARGE_FACTOR,
		max_charge_level: 120*this.CHARGE_FACTOR,
		autoRelease: false,
		cooldown: 100,
		max_cooldown: 100, // recharge points
		cooldown_recharge: 30, //rec
		//harge points per second
		
		angle_random_offset : 0.20,
		
		charging : false,
		damage: 13,
		type: "shotgun",
		pelletcount : 9,
	
	}
	
	this.riotGunWeapon = {
		
		
		bulletSpriteCells : this.RiotgunBulletCells,
		tarveling_style : "spinning",
		groundhit_type : "smallcrator",
		
		min_angle : Math.PI,
		max_angle : Math.PI+(Math.PI/1.5),
		
		charge_level: 50*this.CHARGE_FACTOR,
		charge_rate: 250*this.CHARGE_FACTOR,
		base_charge_level: 50*this.CHARGE_FACTOR,
		max_charge_level: 120*this.CHARGE_FACTOR,
		autoRelease: true,
		cooldown: 100,
		max_cooldown: 100, // recharge points
		cooldown_recharge: 230, //rec
		//harge points per second
		
		angle_random_offset : 0.30,
		
		charging : false,
		damage: 16,
		type: "shotgun",
		pelletcount : 3,
	
	}
	
	
	
	
	
	this.bulletData = 	{ x: 50, y:50, velx:0, vely: 0, accx: 0, accy : 0, radius:2, angle: Math.PI+0.5, power:0, colour:'#887634'};
		
	
	this.trokkieSprite;
	this.grootwielSprite;
	this.kleinwielSprite;
	this.turretSprite;
	this.gageSprite;
	
	this.selectedWeaponIndex = 0;
	this.weapons = [];
	this.weapons.push(this.ScrapRepeaterWeapon);
	this.weapons.push(this.MetalScrapCannonWeapon);	
	this.weapons.push(this.MetalBallCannonWeapon);	

	this.weapons.push(this.machineGunWeapon);
	this.weapons.push(this.rocketLauncherWeapon);
	this.weapons.push(this.shotGunWeapon);
	this.weapons.push(this.riotGunWeapon);	
	
	
	this.effects = [];
	this.bulletsSprites = [];
	this.targetSprites = [];
	this.sprites = [];
	
	};
	
	{//BEHAVIOURS
	
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
		
		if (sprite.myCurrentWeapon.cooldown < sprite.myCurrentWeapon.max_cooldown) {
		sprite.myCurrentWeapon.cooldown += sprite.myCurrentWeapon.cooldown_recharge * ((now - lastAnimationFrameTime) / GAMESPEED);
		}
		else sprite.myCurrentWeapon.cooldown = sprite.myCurrentWeapon.max_cooldown;
		
		if ((sprite.myCurrentWeapon.charging == true)&&(sprite.myCurrentWeapon.charge_level < sprite.myCurrentWeapon.max_charge_level)){
		 sprite.myCurrentWeapon.charge_level += sprite.myCurrentWeapon.charge_rate * ((now - lastAnimationFrameTime) / GAMESPEED);
		
			if (sprite.myCurrentWeapon.charge_level > sprite.myCurrentWeapon.max_charge_level)
				sprite.myCurrentWeapon.charge_level = sprite.myCurrentWeapon.max_charge_level;
		}
      
	    sprite.left = sprite.x + sprite.myTrokkieData.x;
		sprite.top = sprite.y + sprite.myTrokkieData.y;
	  }
    };
	
	this.gageBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {

		sprite.left = sprite.myData.x + sprite.myTrokkieData.x;
		sprite.top = sprite.myData.y + sprite.myTrokkieData.y;
		sprite.myData.middle = ((sprite.myWeaponData.charge_level-sprite.myWeaponData.base_charge_level)/(sprite.myWeaponData.max_charge_level-sprite.myWeaponData.base_charge_level)) * sprite.myData.length
		
		
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
	
	this.travelingBulletBehavior = {
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
  
	this.spinningBulletBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
		sprite.velx += sprite.accx * ((now - lastAnimationFrameTime) / GAMESPEED);
		sprite.vely += sprite.accy * ((now - lastAnimationFrameTime) / GAMESPEED);        
		sprite.x += sprite.velx * ((now - lastAnimationFrameTime) / GAMESPEED);
		sprite.y += sprite.vely * ((now - lastAnimationFrameTime) / GAMESPEED);
		  
		
		sprite.angle += (sprite.rotation_speed * ((now - lastAnimationFrameTime) / GAMESPEED));
		
		
		sprite.left = sprite.x; 
		sprite.top = sprite.y;
		
      }
    };
  
    this.groundDirtExplosionBehavior = {
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
   

    this.defenceSystemBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {

		//console.log("hallo");				 
		if (sprite.shieldsOnStatus == true){

			sprites.shields += sprites.shieldsRechargeSpeed;
						
		}	
						 
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
	
	
	this.targetDebreBehavior = {
      execute: function (sprite, now, fps, context, 
                         lastAnimationFrameTime) {
		sprite.velx += sprite.accx * ((now - lastAnimationFrameTime) / GAMESPEED);
		sprite.vely += sprite.accy * ((now - lastAnimationFrameTime) / GAMESPEED);        
		sprite.x += sprite.velx * ((now - lastAnimationFrameTime) / GAMESPEED);
		sprite.y += sprite.vely * ((now - lastAnimationFrameTime) / GAMESPEED);
	
		sprite.angle += sprite.rotation_speed * ((now - lastAnimationFrameTime) / GAMESPEED);;
		
		sprite.left = sprite.x; 
		sprite.top = sprite.y;
		
      }
    };
	
	}
   //Artists
	
  
  
    this.gageArtist = {
      draw: function (sprite, context) {
       
		context.save();
			context.beginPath();
			context.lineWidth = sprite.myData.width;
			context.moveTo(sprite.left,sprite.top);
			context.lineTo(sprite.left+sprite.myData.middle, sprite.top);
		
			
			if (sprite.myWeaponData.charge_level >= sprite.myWeaponData.max_charge_level)
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
			
			
			if (sprite.myWeaponData.cooldown >= sprite.myWeaponData.max_cooldown)
			context.fillStyle = '#00aa00';
			else
			context.fillStyle = '#bb2222';
		
			context.fillRect(sprite.left+sprite.myData.length+1, sprite.top-5.5, 1, 1);
			
		context.restore();
		
      }
   };
   
      this.blankArtist = {
      draw: function (sprite, context) {
       
		
		
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
   

    levelDo: function(){
	
		if (this.turretSprite.myCurrentWeapon.autoRelease == true)
			if((this.turretSprite.myCurrentWeapon.cooldown >= this.turretSprite.myCurrentWeapon.max_cooldown)&&
				((this.turretSprite.myCurrentWeapon.max_charge_level <= this.turretSprite.myCurrentWeapon.charge_level)))
				
				{
					this.shootBullet();
					this.turretSprite.myCurrentWeapon.charge_level = this.turretSprite.myCurrentWeapon.base_charge_level;
					this.turretSprite.myCurrentWeapon.charging = false;
				}
		
		
		if (this.trokkieSprite.myData.x > this.level.trokkie_lock_x){
			
				this.camera.lock = true;
				this.trokkieSprite.myData.x = this.level.trokkie_lock_x;
				
			}
		
		    
			
		if 	(this.camera.lock)	{
		
			this.camera.scrollspeed = this.trokkieSprite.myData.speed/22; //ratio constant
		
		}else{
		
			this.turretSprite.myCurrentWeapon.cooldown = 0;
		
		}
		
		this.stars_vel = this.camera.scrollspeed/2;
		this.mountains_vel = this.camera.scrollspeed*7; //makie sakie, want stars bepaal hom
		this.rocks_vel = this.camera.scrollspeed*22; //makie sakie, want stars bepaal hom
		
			
	
	},
	
	//CREATE METHODS
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
		this.turretSprite.x = this.turretData.x; 
		this.turretSprite.y = this.turretData.y; 
		
		this.turretSprite.width = this.turretData.width; 
		this.turretSprite.length = this.turretData.length;
		this.turretSprite.color = this.turretData.color;
		this.turretSprite.charging = this.turretData.charging;
		
		this.turretSprite.angle = Math.PI;
		
		this.turretSprite.myTrokkieData = this.trokkieData; 
		this.turretSprite.myCurrentWeapon = this.weapons[this.selectedWeaponIndex];		
		
		this.gageSprite = new Sprite('gage', this.gageArtist, [this.gageBehavior]);
		this.gageSprite.myData = this.gageData; 
		this.gageSprite.myTrokkieData = this.trokkieData;
		this.gageSprite.myTurretData = this.turretData;
		this.gageSprite.myWeaponData = this.turretSprite.myCurrentWeapon;
		
	},
	
	createBulletSprite : function (BulletCells) {
	
		var bulletSprite;
	
		if (this.bulletCount < this.MAXBULLETS){
			this.bulletCount += 1;
		}
		else{
			this.bulletCount = 0;
		}
		
		
		
		
		if (this.turretSprite.myCurrentWeapon.tarveling_style == "spinning"){
			
			if  (this.turretSprite.myCurrentWeapon.type == "metalball")
				bulletSprite = new Sprite('bullet', new SpinningShiningBulletSheetArtist(this.spritesheet, BulletCells), [new CycleBehavior(100, 0), this.spinningBulletBehavior]);
			else
			    bulletSprite = new Sprite('bullet', new SpinningBulletSheetArtist(this.spritesheet, BulletCells), [new CycleBehavior(100, 0), this.spinningBulletBehavior]);	
		}
		
		
		if (this.turretSprite.myCurrentWeapon.tarveling_style == "torpedo"){
			bulletSprite = new Sprite('bullet',
								  new TravelingBulletSheetArtist(this.spritesheet, BulletCells), [new CycleBehavior(100, 0), this.travelingBulletBehavior]);	
		}
	
		
		
		
		bulletSprite.myTurret = this.turretSprite;
		bulletSprite.power = this.turretSprite.myCurrentWeapon.charge_level;
		bulletSprite.bulletDamage = this.turretSprite.myCurrentWeapon.damage;
		bulletSprite.accy = this.level.moongrav;
		bulletSprite.accx = 0;
		bulletSprite.radius = this.bulletData.radius;
		bulletSprite.angle = 0;
		bulletSprite.rotation_speed = (Math.random()*10)+4;
		bulletSprite.bulletType = this.turretSprite.myCurrentWeapon.type;
		bulletSprite.groundhit_type = this.turretSprite.myCurrentWeapon.groundhit_type;
		bulletSprite.special_mid_x = 0;
		bulletSprite.special_mid_y = 0;
		
		
		bulletSprite.x = this.trokkieData.x + bulletSprite.myTurret.x + Math.cos(bulletSprite.myTurret.angle)*bulletSprite.myTurret.length;
		bulletSprite.y = this.trokkieData.y + bulletSprite.myTurret.y + Math.sin(bulletSprite.myTurret.angle)*bulletSprite.myTurret.length;
		bulletSprite.velx = Math.cos(bulletSprite.myTurret.angle+(this.turretSprite.myCurrentWeapon.angle_random_offset*Math.random())-(this.turretSprite.myCurrentWeapon.angle_random_offset*Math.random()))*bulletSprite.power;
		bulletSprite.vely = Math.sin(bulletSprite.myTurret.angle+(this.turretSprite.myCurrentWeapon.angle_random_offset*Math.random())-(this.turretSprite.myCurrentWeapon.angle_random_offset*Math.random()))*bulletSprite.power;
		
		this.bulletsSprites.push(bulletSprite);
	},

	createHitSparks : function(px,py) {
	var SparksSprite; 
	SparksSprite = 	new Sprite('sparks',
                          new HitSparksSheetArtist(this.spritesheet, 
                                                this.hitSparksCells),
												[ new CycleBehavior(50, 0)]	);	
	
		SparksSprite.width =  this.hitSparksCells[0].width;
		SparksSprite.height =  this.hitSparksCells[0].height;
		SparksSprite.rotation = Math.random() * (2*Math.PI);
	
		SparksSprite.x = Math.floor(px) - (SparksSprite.width/2)
		SparksSprite.y = Math.floor(py) - (SparksSprite.height/2)
		
	
	
	this.effects.push(SparksSprite);											
												
	},
	
	createAlienPodSprite : function (px,py) {
		
		var AlienPodSprite; 
		
		AlienPodSprite = new Sprite('AlienPod',
                          new AlienPodSheetArtist(this.spritesheet, 
                                                this.AlienPodCells),
												[ new CycleBehavior(75, 0), this.alienPodBehavior ]
												);	
		AlienPodSprite.booster_flame = 	new Sprite('AlienPodBooster',
                          new AlienPodBoosterSheetArtist(this.spritesheet, 
                                                this.AlienPodBoosterCells),
												[ new CycleBehavior(50, 0)]
												);	


	
	
		AlienPodSprite.defenceSystem = 	new Sprite('AlienPodDefenceSystem',this.blankArtist,[ this.defenceSystemBehavior ]);
		
		AlienPodSprite.defenceSystem.maxhull = 100;	
		AlienPodSprite.defenceSystem.hull = 100;
		AlienPodSprite.defenceSystem.damagedlookzone = 50;
		AlienPodSprite.defenceSystem.looksDamaged = false;
		AlienPodSprite.defenceSystem.maxshields = 0;	
		AlienPodSprite.defenceSystem.shields = AlienPodSprite.defenceSystem.maxshields;
		AlienPodSprite.defenceSystem.shieldsRechargeSpeed = 0.01;
		AlienPodSprite.defenceSystem.shieldsOnStatus = false
	
	//console.log(AlienPodSprite.defenceSystem.hull);
		
		AlienPodSprite.defenceSystem.shieldsOnStatus = true;
		
		
		AlienPodSprite.width = this.AlienPodCells[0].width;
		AlienPodSprite.height = this.AlienPodCells[0].height;
		AlienPodSprite.x = px;
		AlienPodSprite.y = py;
		AlienPodSprite.velx = 10;
		AlienPodSprite.vely = 0;
		AlienPodSprite.accy = this.level.moongrav;
		AlienPodSprite.boost_accy = -1;
		this.targetSprites.push(AlienPodSprite);
	},

	creategroundDirtExplosionSprite : function (dropping_sprite) {
		
		var groundDirtExplosion; 
		groundDirtExplosion = new Sprite('EXP',
                          new GroundDirtExplosionSheetArtist(this.spritesheet, 
                                                this.groundDirtExplosionCells),
												[ new CycleBehavior(60, 0), this.groundDirtExplosionBehavior ]
												);	
		groundDirtExplosion.width = this.groundDirtExplosionCells[0].width;
		groundDirtExplosion.height = this.groundDirtExplosionCells[0].height;
		groundDirtExplosion.myBullet = dropping_sprite;
		
		if (dropping_sprite.type == "alienpodpart"){
			
			groundDirtExplosion.x = Math.floor(dropping_sprite.x + dropping_sprite.special_mid_x) - (groundDirtExplosion.width/2);
			groundDirtExplosion.y = Math.floor(dropping_sprite.y + dropping_sprite.special_mid_y) - (groundDirtExplosion.height/2);
		
		
		}else{
			
		    groundDirtExplosion.x = Math.floor(dropping_sprite.x) - (groundDirtExplosion.width/2);
			groundDirtExplosion.y = Math.floor(dropping_sprite.y) - (groundDirtExplosion.height/2);
		}
		
		
		groundDirtExplosion.myRocksVel = -this.rocks_vel;
		this.bulletHitGroundSound.play();
		this.effects.push(groundDirtExplosion);
	},
	
	creategroundDirtDropSprite : function (dropping_sprite) {
		
		
		
		var groundDebreDrop; 
		groundDebreDrop = new Sprite('debregroundhit',
                          new GroundDirtExplosionSheetArtist(this.spritesheet, 
                                                this.groundDebreDropCells),
												[ new CycleBehavior(60, 0), this.groundDirtExplosionBehavior ]
												);	
		groundDebreDrop.width = this.groundDebreDropCells[0].width;
		groundDebreDrop.height = this.groundDebreDropCells[0].height;
		groundDebreDrop.myBullet = dropping_sprite;
		
		
		groundDebreDrop.x = Math.floor(dropping_sprite.x + dropping_sprite.special_mid_x) - (groundDebreDrop.width/2);
		groundDebreDrop.y = Math.floor(dropping_sprite.y + dropping_sprite.special_mid_y) - (groundDebreDrop.height/2);
		
	
		
		
		groundDebreDrop.myRocksVel = -this.rocks_vel;
		
		this.effects.push(groundDebreDrop);
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
		alienPodPartSprite.accy = this.level.moongrav;
		alienPodPartSprite.rotation_speed = Math.random()*7 - Math.random()*7;
		alienPodPartSprite.angle = 0;
		
		
		this.effects.push(alienPodPartSprite);
	},
	
	createTargetDebreSprite : function (target, cells, debretype_num) {
		
		var alienTargetDebreSprite; 
		alienTargetDebreSprite = new Sprite('targetdebre',
                          new TargetDebreSheetArtist(this.spritesheet, cells, debretype_num),
												[this.targetDebreBehavior]);	
			//Math.floor(Math.random()*6									
		alienTargetDebreSprite.width = this.targetDebreCells[0].width;
		alienTargetDebreSprite.height = this.targetDebreCells[0].height;
		
			
		alienTargetDebreSprite.x = (target.x+target.width/2);
		alienTargetDebreSprite.y = (target.y+target.height/2);
		
		
		switch (debretype_num){
		
		case 0:
		
			alienTargetDebreSprite.special_mid_x = 2;
			alienTargetDebreSprite.special_mid_y = 2;
		    break;
			
		case 1:
		
			alienTargetDebreSprite.special_mid_x = 2;
			alienTargetDebreSprite.special_mid_y = 2;
		    break;	
			
		case 2:
		
			alienTargetDebreSprite.special_mid_x = 2;
			alienTargetDebreSprite.special_mid_y = 2;
		    break;	
		
		case 3:
		
			alienTargetDebreSprite.special_mid_x = 2.5;
			alienTargetDebreSprite.special_mid_y = 1.5;
		    break;
		
		
		
		}
		
		
		alienTargetDebreSprite.velx = Math.random()*35 - Math.random()*35;
		alienTargetDebreSprite.vely =  -(Math.random()*20 + 20);
		
		
		alienTargetDebreSprite.accx = 0;
		alienTargetDebreSprite.accy = this.level.moongrav;
		alienTargetDebreSprite.rotation_speed = Math.random()*7 - Math.random()*7;
		alienTargetDebreSprite.angle = 0;
		
		
		this.effects.push(alienTargetDebreSprite);
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
		
	//	console.log(grootExplotionSprite);
		
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
							
			
			
			
			if ((Bsprite.groundhit_type == "smallcrator"))
			 this.creategroundDirtDropSprite(Bsprite);
			if((Bsprite.groundhit_type == "largecrator"))
			 this.creategroundDirtExplosionSprite(Bsprite);
			
			this.bulletsSprites.splice(i,1);
			
		}else
			
			for (var j=0; j < this.targetSprites.length; ++j) {
				Tsprite = this.targetSprites[j]; 
						
				if (Tsprite.type == "AlienPod"){
				
					if (!((Tsprite.y + Tsprite.height < Bsprite.y) || (Tsprite.y+6 > Bsprite.y) || (Tsprite.x+2 > Bsprite.x) || (Tsprite.x + Tsprite.width - 2 < Bsprite.x))){
					
						
						
						if ((Tsprite.defenceSystem.shieldOnStatus == true) && (Tsprite.defenceSystem.shield > 0)){
							Tsprite.defenceSystem.shield -= Bsprite.bulletDamage;
							Tsprite.defenceSystem.shieldOnStatus = false;
						}else{
							Tsprite.defenceSystem.hull -= Bsprite.bulletDamage;
							if (!(Tsprite.defenceSystem.hull<=0)) this.targetHitSound.play();
							this.createHitSparks(Bsprite.x, Bsprite.y);
						}
						this.createTargetDebreSprite(Tsprite,this.targetDebreCells,Math.floor(1));	
						
						if (Tsprite.defenceSystem.hull < Tsprite.defenceSystem.damagedlookzone){
							Tsprite.defenceSystem.looksDamaged = true;
						}else 
							Tsprite.defenceSystem.looksDamaged = false;
							
									
						if 	(Tsprite.defenceSystem.hull <= 0){
							this.targetDies(Tsprite,Bsprite, j,i,8);
						}

						if (Tsprite.defenceSystem.hull < Tsprite.defenceSystem.damagedlookzone){
							
							Tsprite.artist.set_cells(this.AlienPodDamagedLookCells);
						
						}
						
						
						
						this.bulletsSprites.splice(i,1);		
						
					}
				}
				
			
			
			} 
		
		} //bullet for
	},
	
	
	targetDies: function(TargetS, BulletS, TargetLoopIndex, BulletLoopIndex, AmountOfDebres){
	
	for (k = 0; k < AmountOfDebres; k++)
		this.createTargetDebreSprite(TargetS,this.targetDebreCells,Math.floor(Math.random()*4));
				
						
	this.createalienPodPartSprite(TargetS,this.AlienPodPartRoofCells, "roof");
	this.createalienPodPartSprite(TargetS,this.AlienPodPartLeftCells, "left");
	this.createalienPodPartSprite(TargetS,this.AlienPodPartRightCells, "right");
						
	this.creategrootExplosionSprite(TargetS);
						
	
	this.targetSprites.splice(TargetLoopIndex,1);
	this.AlienExplodesSound.play();
		
	},
	
	
	selectNextWeapon: function(){
	
		this.selectedWeaponIndex++;
		 
		if (this.selectedWeaponIndex >= this.weapons.length)
			this.selectedWeaponIndex = 0;
		 
		this.turretSprite.myCurrentWeapon = this.weapons[this.selectedWeaponIndex]; 
		this.gageSprite.myWeaponData = this.turretSprite.myCurrentWeapon;
		 
		 
		if (this.turretSprite.angle < (this.turretSprite.myCurrentWeapon.min_angle))
				this.turretSprite.angle = this.turretSprite.myCurrentWeapon.min_angle;
		if (this.turretSprite.angle > (this.turretSprite.myCurrentWeapon.max_angle))
				this.turretSprite.angle = this.turretSprite.myCurrentWeapon.max_angle;
			
		if ((this.turretSprite.myCurrentWeapon.charging == true) || (this.turretSprite.myCurrentWeapon.charge_level >= this.turretSprite.myCurrentWeapon.max_charge_level)){
			this.turretSprite.myCurrentWeapon.charge_level = this.turretSprite.myCurrentWeapon.base_charge_level;
			this.turretSprite.myCurrentWeapon.charging = false;
		 }
	
	},
	
	
	chargeTurret: function(){
		if (this.turretSprite.myCurrentWeapon.charge_level < this.turretSprite.myCurrentWeapon.max_charge_level)
		this.turretSprite.myCurrentWeapon.charging = true;
    },
		
	shootBullet: function(){
		
		if (this.turretSprite.myCurrentWeapon.cooldown >= this.turretSprite.myCurrentWeapon.max_cooldown)
		
		{
			if (this.turretSprite.myCurrentWeapon.type == "shotgun"){
			
				for (i=0 ; i < this.turretSprite.myCurrentWeapon.pelletcount; i++){
				
				
					this.createBulletSprite(this.turretSprite.myCurrentWeapon.bulletSpriteCells);
				
				}
			
			} else{ //any other weapon
			
			/*if ((this.turretSprite.myCurrentWeapon.type == "basiccannon") || (this.turretSprite.myCurrentWeapon.type == "machinegun") 
			|| (this.turretSprite.myCurrentWeapon.type == "rocketlauncher")){*/
				
				this.createBulletSprite(this.turretSprite.myCurrentWeapon.bulletSpriteCells);
			
			}
			
			this.turretSprite.myCurrentWeapon.cooldown = 0;
			if (this.turretSprite.myCurrentWeapon.autoRelease == false) this.turretShootSound.play();
		}
		this.turretSprite.myCurrentWeapon.charge_level = this.turretSprite.myCurrentWeapon.base_charge_level;
		this.turretSprite.myCurrentWeapon.charging = false;
	},
	
	isSpriteInView: function(sprite) {
    return sprite.left + sprite.width > sprite.hOffset &&
             sprite.left < sprite.hOffset + this.klein_game_canvas.width;
		 
    },
 
	updateEffectsSprites: function (now) {
      var sprite;
      for (var i=0; i < this.effects.length; ++i) {
         sprite = this.effects[i];
		
		
		 if (sprite.type == "sparks"){
		
			if (sprite.artist.cellIndex === sprite.artist.cells.length-1){
				sprite.visible = false;
				
			
			}
		};
		
		 if (sprite.type == "alienpodpart"){
				
				if (sprite.y + sprite.special_mid_y > this.level.floor){
				sprite.visible = false;
				this.creategroundDirtExplosionSprite(sprite);
				this.bulletHitGroundSound.play();
				}
			};
			
		 if (sprite.type == "targetdebre"){
				
				if (sprite.y + sprite.special_mid_y > this.level.floor+Math.floor(Math.random()*3)-Math.floor(Math.random()*3)){
				sprite.visible = false;
				this.creategroundDirtDropSprite(sprite);
				
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
	
	drawTargets: function(ctx) {
      var sprite;
	  for (var i=0; i < this.targetSprites.length; ++i) {
         sprite = this.targetSprites[i];
         if (sprite.visible && this.isSpriteInView(sprite)) {
    		ctx.translate(-sprite.hOffset, 0);
  			sprite.draw(ctx);
            ctx.translate(sprite.hOffset, 0);
         } 
       }
    },

	drawBullets: function(ctx) {
      var sprite;
	  for (var i=0; i < this.bulletsSprites.length; ++i) {
         sprite = this.bulletsSprites[i];
	     if (sprite.visible && this.isSpriteInView(sprite)) {
    		ctx.translate(-sprite.hOffset, 0);
			sprite.draw(ctx);
            ctx.translate(sprite.hOffset, 0);
         } 
      }
    },
	
	drawEffects: function(ctx) {
      var sprite;
	  for (var i=0; i < this.effects.length; ++i) {
         sprite = this.effects[i];
	
         if (sprite.visible && this.isSpriteInView(sprite)) {
			ctx.translate(-sprite.hOffset, 0);
     		sprite.draw(ctx);
            ctx.translate(sprite.hOffset, 0);
         } 
        }
    },
	
    drawSprites: function(ctx) {
      var sprite;
	  for (var i=0; i < this.sprites.length; ++i) {
         sprite = this.sprites[i];
	
         if (sprite.visible && this.isSpriteInView(sprite)) {
			ctx.translate(-sprite.hOffset, 0);
            sprite.draw(ctx);
	        ctx.translate(sprite.hOffset, 0);
         } 
      }
    },
	
	small_draw: function(now){
		
		
		this.bulletCollision();
		
		this.updateSprites(now);
        this.updateBulletSprites(now);
		this.updateEffectsSprites(now);
		this.updateTargetSprites(now);
		
		
	
		this.drawBackground(this.klein_game_canvas_context);
		
		this.drawBullets(this.klein_game_canvas_context);
		this.drawTargets(this.klein_game_canvas_context);
		this.drawEffects(this.klein_game_canvas_context);
		this.drawSprites(this.klein_game_canvas_context);
		
		this.drawForeground(this.klein_game_canvas_context);
	
	},
	
	draw: function (now) {
	  
	  this.keyboard();
	  this.timer++;	
	  this.levelDo();
	  this.setStartBackgroundOffset(now);
	  this.small_draw(now);
	  this.grootmaak(this.klein_game_canvas_context,this.groot_game_canvas_context);
	
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
	
	
	drawForeground: function(ctx) {
	
		ctx.translate(-this.rocks_offset1, 0);
	    ctx.drawImage(this.spritesheet,0,177,this.background_image_width,9,0,106,this.background_image_width,9);
	    ctx.translate(this.rocks_offset1, 0);
		
		ctx.translate(-this.rocks_offset2, 0);
	    ctx.drawImage(this.spritesheet,0,177,this.background_image_width,9,0,106,this.background_image_width,9);
	    ctx.translate(this.rocks_offset2, 0);
	
	},
	
	drawBackground: function(ctx) {
		ctx.translate(-this.stars_offset1, 0);
	   	ctx.drawImage(this.spritesheet,0,0,this.background_image_width,120,0,0,this.background_image_width,120);
		ctx.translate(this.stars_offset1, 0);
		
		ctx.translate(-this.stars_offset2, 0);
	    ctx.drawImage(this.spritesheet,0,0,this.background_image_width,120,0,0,this.background_image_width,120);
        ctx.translate(this.stars_offset2, 0);
				
		ctx.translate(-this.mountains_offset1, 0);
	  
	    ctx.drawImage(this.spritesheet,0,120,this.background_image_width,51,0,69,this.background_image_width,51);
		ctx.translate(this.mountains_offset1, 0);
		
		ctx.translate(-this.mountains_offset2, 0);
	    ctx.drawImage(this.spritesheet,0,120,this.background_image_width,51,0,69,this.background_image_width,51);
	    ctx.translate(this.mountains_offset2, 0);
		
		ctx.translate(-this.rocks_offset1, 0);
	    ctx.drawImage(this.spritesheet,0,171,this.background_image_width,6,0,100,this.background_image_width,6);
	    ctx.translate(this.rocks_offset1, 0);
		
		ctx.translate(-this.rocks_offset2, 0);
	    ctx.drawImage(this.spritesheet,0,171,this.background_image_width,6,0,100,this.background_image_width,6);
	    ctx.translate(this.rocks_offset2, 0);
		
	
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
	
	grootmaak: function(ctx,ctx2){
	
		this.imagedata = ctx.getImageData(0, 0, this.smallCanvasWidth, this.smallCanvasHeight)
			
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
				ctx2.save();
					ctx2.scale(this.canvas_upscale_x,this.canvas_upscale_y);
					ctx2.fillStyle  = "rgba("+ this.imagedata.data[i]+","+ this.imagedata.data[i+1]+","+this.imagedata.data[i+2]+",255)";
					ctx2.fillRect(x,y,1,1);
				ctx2.restore();
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
	  document.getElementById("arena").appendChild( this.groot_game_canvas );
	 
	 
	  this.spritesheet.src = 'images/spritesheet.png';
      this.turretShootSound = new Audio("nes-13-00.wav");
	  this.bulletHitGroundSound = new Audio("nes-00-00.wav");
	  this.AlienExplodesSound = new Audio("nes-15-00.wav");
	  
	   this.targetHitSound = new Audio("nes-02-00.wav");

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
			
			GAMESPEED = 20000; //-900 reverse!!!
			}else
			GAMESPEED = GAMESPEED_BASE;		
			
			
			if (Key.isDown(Key.LEFT)){ 
				if (this.turretSprite.angle > (this.turretSprite.myCurrentWeapon.min_angle))
					this.turretSprite.angle = this.turretSprite.angle - 0.04;
				else
					this.turretSprite.angle = this.turretSprite.myCurrentWeapon.min_angle;
			}		
			if (Key.isDown(Key.RIGHT)){
				if (this.turretSprite.angle < (this.turretSprite.myCurrentWeapon.max_angle))
					this.turretSprite.angle = this.turretSprite.angle + 0.04;
				else
					this.turretSprite.angle = this.turretSprite.myCurrentWeapon.max_angle;
				
			}								
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
	   
	   if (key === 69) { // 'e'
		
		 
		 moonrun.selectNextWeapon();
		
		  
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
