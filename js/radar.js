paper.install(window)


APP={
	WIDTH:500,
	HEIGHT:500,
	EL:'canvas',
	CANVAS:{},
	COMPUS_POSITION:{cx:0, cy:0},
	// RULER_POSITION:{rx:200,ry:-200},
	// RULLER_SIZE:new Size(50,400),
	SCOPE:new paper.PaperScope(),
	RADAR:{},// defult is papper
	POSITION:{},
	CMPS_POSITION:{},
	RULS_POSITION:{},			
	CHILDREN:null,
	TOOL:new Tool(),
	VIEW:{},
	RADIOUS:200,
	init:function()
	{	
	        
	        APP.CANVAS= document.getElementById(APP.EL);
			APP.WIDTH=APP.CANVAS.width;
			APP.HEIGHT=APP.CANVAS.height;
			APP.POSITION.x=APP.WIDTH/2;
			APP.POSITION.y=APP.HEIGHT/2;
			APP.RADAR=APP.SCOPE.setup(APP.EL);
			APP.VIEW=APP.RADAR.view;
					
			
			APP.CMPS_POSITION.x=APP.POSITION.x+APP.COMPUS_POSITION.cx;
			APP.CMPS_POSITION.y=APP.POSITION.y+APP.COMPUS_POSITION.cy;
		    // APP.RULS_POSITION.x=APP.POSITION.x+APP.RULER_POSITION.rx;
		    // APP.RULS_POSITION.y=APP.POSITION.y+APP.RULER_POSITION.ry;
						
			APP.CHILDREN=APP.RADAR.project.activeLayer;	
			
			APP._init_grid();																				
			APP._init_cicrle();
			APP._init_circle_scale();
			APP._draw_radar_hand(APP.RADIOUS).onFrame=function(e){
				this.rotate(1,APP.CMPS_POSITION);
				this.shadowColor='#33FF00';
				this.shadowBlur=20;
				this.shadowOffsetX=15;
				this.shadowOffsetY=15;
			};
		 // var _scale=APP._draw_ruler_scale(5,10,'#1FFF18',0.5);
		 // var overlaypath=new Path.Rectangle();
		 // overlaypath.visible=false;
		 // overlaypath.fillColor='red';
		 // overlaypath.size=APP.RULLER_SIZE;
  	//  	  _scale.onMouseMove=function(e){
			    
			// 	overlaypath.point=e.point;
			// 	overlaypath.visible=true;
				
			//   };
		  
			
			APP._draw();
	   
	},
	
	_init_grid:function()
	{
		    APP._draw_grid(APP.RADIOUS,APP.RADIOUS,'#33FF00',2).opacity=0.3;																				
			APP._draw_grid(APP.RADIOUS,25,'#33FF00',1).opacity=0.1;																				
			APP._draw_grid(APP.RADIOUS,5,'#1FFF18',2).opacity=0.1/2;
	},
	
	_init_cicrle:function()
	{
	   
			
		    APP._circle(APP.CMPS_POSITION,8,'#FFFFFF','#FFFFFF',null,0,0); //1st central circle
			APP._circle(APP.CMPS_POSITION,APP.RADIOUS-150,null,'#1FFF18',null,0,0.5); //2st circle
			APP._circle(APP.CMPS_POSITION,APP.RADIOUS-147,null,'#1FFF18',null,0,4,'cube', [2,54]).onFrame=function(e){this.rotate(-2);};//2st moveable circle	  		
			APP._circle(APP.CMPS_POSITION,APP.RADIOUS-100,null,'#1FFF18',null,0,1); //3rd circle
			APP._circle(APP.CMPS_POSITION,APP.RADIOUS-98,null,'#1FFF18',null,0,1); //4th circle
			APP._circle(APP.CMPS_POSITION,APP.RADIOUS-50,null,'#1FFF18','#33FF00',8,1)//4th circle
			APP._circle(APP.CMPS_POSITION,APP.RADIOUS-52,null,'#1FFF18','#33FF00',8,1)//4th circle
			APP._circle(APP.CMPS_POSITION,APP.RADIOUS,null,'#1FFF18',null,0,3); //5th circle  
		
	},
	
	_init_circle_scale:function()
	{
		APP._circle_scale(APP.RADIOUS-150,30,'#1FFF18',1,5,false,null,null,null,true).onFrame=function(e){
			this.rotate(1);
			};
		APP._circle_scale(APP.RADIOUS-10,80,'#1FFF18',1,10,false);
		APP._circle_scale(APP.RADIOUS,17,'#1FFF18',0.5,30,true,0,10,30)
	},
	
	
	// _draw_ruler_scale:function(_step,length,_color, _width)
	// {
		
		
	// 	for(var i=0; i<=APP.RULLER_SIZE.height; i+=_step)
	// 	{
	// 		var lx=APP.RULS_POSITION.x-length;
	// 		var ly=APP.RULS_POSITION.y+i;
	// 		var rx=APP.RULS_POSITION.x+APP.RULLER_SIZE.width+length;
	// 		var ry=APP.RULS_POSITION.y+i;
 //     		var vl_path=new APP.RADAR.Path();
	// 			vl_path.strokeColor=_color;
	// 			vl_path.strokeWidth=_width;
	// 			vl_path.moveTo(APP.RULS_POSITION.x, ly);
	// 			vl_path.lineTo(lx,ly);
	// 		var vr_path=new APP.RADAR.Path();
	// 			vr_path.strokeColor=_color;
	// 			vr_path.strokeWidth=_width;
	// 			vr_path.moveTo(APP.RULS_POSITION.x+APP.RULLER_SIZE.width, ry);
	// 			vr_path.lineTo(rx,ry);
	// 	}
		
	// 	return path = new Path.Rectangle({
	//         point: APP.RULS_POSITION,
	//         size: APP.RULLER_SIZE,
	//         strokeColor: _color,
	// 		strokeWidth:_width,
	// 		fillColor:'black'			
 //          });
			
		
	// },
	
	_draw_radar_hand:function(_radious)
	{
		     var path=new APP.RADAR.Path();
				path.strokeColor='white';
				path.strokeWidth=2;
				path.moveTo(APP.CMPS_POSITION);
				path.lineTo(APP.CMPS_POSITION.x,APP.CMPS_POSITION.y-_radious);
			return path;
	},

	_draw_grid:function(_radius,_step,_color, _width)
	{
           var _group=new APP.RADAR.Group();
		   
		   for(x=-_radius; x<=_radius; x+=_step)
		    { _sx = -Math.sqrt(_radius*_radius-x*x); 
			  _sy =  Math.sqrt(_radius*_radius-x*x); 			
			var h_path=new APP.RADAR.Path();
				h_path.strokeColor=_color;
				h_path.strokeWidth=_width;
				h_path.moveTo(APP.CMPS_POSITION.x+x,APP.CMPS_POSITION.y+_sx); 
				h_path.lineTo(APP.CMPS_POSITION.x+x,APP.CMPS_POSITION.y+_sy);
				_group.addChild(h_path);
			var v_path=new APP.RADAR.Path();
				v_path.strokeColor=_color;
				v_path.strokeWidth=_width;
				v_path.moveTo(APP.CMPS_POSITION.x+_sx,APP.CMPS_POSITION.y+x); 
				v_path.lineTo(APP.CMPS_POSITION.x+_sy,APP.CMPS_POSITION.y+x);				
				_group.addChild(v_path);
			}
		   

		return _group;
	},
	_circle_scale:function(_radius,_step,_strokecolor,_strokewidth,_length,_is_text,_number_start, _number_step,_modulas,_is_group)
	{  
	    var _number_start_from=_number_start;
		if(_is_group==true)
			{
				var _group=new APP.RADAR.Group();
				
			}
		for (var _quardent=0,_qmax=(2*Math.PI),_qstep=(Math.PI/_step); _quardent<_qmax; _quardent+=_qstep){
		_number_start+=_number_step;
		//console.log(_number_start);
		_sx = APP.CMPS_POSITION.x+Math.sin(_quardent)*_radius;
		_sy = APP.CMPS_POSITION.y+Math.cos(_quardent)*_radius;
		_ex = APP.CMPS_POSITION.x+Math.sin(_quardent)*(_radius+_length);
		_ey = APP.CMPS_POSITION.y+Math.cos(_quardent)*(_radius+_length);
		_tx = APP.CMPS_POSITION.x+Math.sin(_quardent)*(_radius+_length+8);
		_ty = APP.CMPS_POSITION.y+Math.cos(_quardent)*(_radius+_length+5);
		  var path=new APP.RADAR.Path();
			path.strokeColor=_strokecolor;
			path.strokeWidth=_strokewidth;
			path.moveTo(_sx,_sy);
			path.lineTo(_ex,_ey);
			if(_is_text)
			{
			 
		     var text = new PointText(new Point(_tx, _ty));
			 text.justification = 'center';
			 text.fillColor = 'white';
			 text.content = _number_start;
			 if(_modulas!='undefined' && _modulas!='NaN')
			 {
				 if(_number_start%_modulas==0)
				 {
					 _number_start=_number_start_from;
				 }
			 }
			}
			if(_is_group==true)
			{
				_group.addChild(path);
			}
		};	
		if(_is_group==true)
			{
				return _group;
			}		
		
	},
	_circle:function(_position, _radius,_background_color, _border_color,_shadow_color,_shadow_blur, _border_width,_cap,_dash_array)
	{
		return new APP.RADAR.Path.Circle({
	       center:_position,
		   radius: _radius,
           fillColor:_background_color,
		   strokeColor:_border_color,
		   strokeWidth:_border_width,
		   shadowColor:_shadow_color,
		   shadowBlur:_shadow_blur,  
		   strokeCap:_cap, //ex:cube,square
		   dashArray:_dash_array //ex:[4,10]	
	    });
	},
	_draw:function()
	{
		APP.VIEW.draw();
	},
	
	
	
	
}
//APP.CANVAS='canvas';	
window.addEventListener('load', APP.init, false);