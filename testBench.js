//Global Constants
	var		_WIDTH				=	640;
	var		_HEIGHT				=	480;
	
	//Global Variables
	var		_LoopID;
	
	//Circle 1 Properties
	var		_Circle1X			=	_WIDTH / 2;
	var		_Circle1Y			=	_HEIGHT / 2;
	var		_Circle1Radius		=	(_HEIGHT / 4);
	
	//Circle 2 Properties
	var		_Circle2X			=	0;
	var		_Circle2Y			=	0;
	var		_Circle2Radius		=	20;
	var		_Circle2Angle		=	0;
	var		_Circle2dAngle		=	0.01;
	
	//Line Properties
	var		_Line1X				=	0;
	var		_Line1Y				=	0;
	var		_Line2X				=	0;
	var		_Line2Y				=	0;
	var		_LineDistance		=	40;
	var		_LineAngle			=	0;
	var		_LinedAngle			=	0.1;
	
	//Draw Variables
	var		_PointX				=	0.0;
	var		_PointY				=	0.0;
	
	function initDraw()
	{
		_Circle2X			=	(_Circle1Radius + _Circle2Radius) * Math.cos(_Circle2Angle) + _Circle1X;
		_Circle2Y			=	(_Circle1Radius + _Circle2Radius) * Math.sin(_Circle2Angle) + _Circle1Y;
			
		_Line1X				=	_Circle2X + _Circle2Radius * Math.cos(_Circle2Angle + _LineAngle);
		_Line1Y				=	_Circle2Y + _Circle2Radius * Math.sin(_Circle2Angle + _LineAngle);
		_Line2X				=	_Circle2X + (_Circle2Radius + _LineDistance) * Math.cos(_Circle2Angle + _LineAngle);
		_Line2Y				=	_Circle2Y + (_Circle2Radius + _LineDistance) * Math.sin(_Circle2Angle + _LineAngle);
			
		_LoopID				=	setInterval(draw, 20);
	}
	
	function draw()
	{
		var canvasRotor			=	document.getElementById('canvasRotor');
		var canvasPaper			=	document.getElementById('canvasPaper');
		
        if (canvasRotor.getContext && canvasPaper.getContext)
		{
			//Update - Start			
			_Circle2Angle		+=	_Circle2dAngle;
			_LineAngle			+=	_LinedAngle;
			
			if(_Circle2Angle > Math.PI * 2.0)
			{
				clearInterval(_LoopID);
			}
			
			_Circle2X			=	(_Circle1Radius + _Circle2Radius) * Math.cos(_Circle2Angle) + _Circle1X;
			_Circle2Y			=	(_Circle1Radius + _Circle2Radius) * Math.sin(_Circle2Angle) + _Circle1Y;
			
			_PointX				=	_Line2X;
			_PointY				=	_Line2Y;
			_Line1X				=	_Circle2X + _Circle2Radius * Math.cos(_Circle2Angle + _LineAngle);
			_Line1Y				=	_Circle2Y + _Circle2Radius * Math.sin(_Circle2Angle + _LineAngle);
			_Line2X				=	_Circle2X + (_Circle2Radius + _LineDistance) * Math.cos(_Circle2Angle + _LineAngle);
			_Line2Y				=	_Circle2Y + (_Circle2Radius + _LineDistance) * Math.sin(_Circle2Angle + _LineAngle);
			//Update - End
		
		
			//Draw - Start
			var ctx				=	canvasRotor.getContext('2d');
			var cty				=	canvasPaper.getContext('2d');
			
			ctx.clearRect(0, 0, _WIDTH, _HEIGHT);
			
			//Draw Outer Circle
			ctx.beginPath();
			ctx.arc(_Circle1X, _Circle1Y, _Circle1Radius, 0, Math.PI * 2, true);
			ctx.stroke();
			
			//Draw Inner Circle
			ctx.beginPath();
			ctx.arc(_Circle2X, _Circle2Y, _Circle2Radius, 0, Math.PI * 2, true);
			ctx.stroke();
			
			//DrawLine
			ctx.beginPath();
			ctx.moveTo(_Line1X, _Line1Y);
			ctx.lineTo(_Line2X, _Line2Y);
			ctx.stroke();
			
			//Draw Spiro
			cty.beginPath();
			cty.moveTo(_PointX, _PointY);
			cty.lineTo(_Line2X, _Line2Y);
			cty.stroke();
			//Draw - End
        }  
	}