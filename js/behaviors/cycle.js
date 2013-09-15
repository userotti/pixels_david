// CYCLE: For sprites that have a spritesheet artist, this behavior
//        advances the sprite artist through the sprite's images.
//        
//        The behavior shows each cell for the specified duration.
//        When the behavior has cycled through all of the cells, it
//        pauses for the specified interval before starting the whole
//        process again.




CycleBehavior = function (duration, interval) {
   this.duration = duration || 0;  //  milliseconds
   this.interval = interval || 0;
   this.lastAdvance = 0;

   };

CycleBehavior.prototype = {
   execute: function (sprite, 
                         now, 
                         fps, 
                         context, 
                         lastAnimationFrameTime) {
      
	 
	  
	  if (this.lastAdvance === 0) {
         this.lastAdvance = now;
      }

      if (this.interval && sprite.artist.cellIndex === 0) {
         
		 
		 if (now - this.lastAdvance > this.interval) {
            sprite.artist.advance();
			      this.lastAdvance = now;
		     }         
      }
      else if (now - this.lastAdvance > (this.duration * ((1/GAMESPEED_BASE)*GAMESPEED))) {
         sprite.artist.advance();
         this.lastAdvance = now;
      }
   }
};