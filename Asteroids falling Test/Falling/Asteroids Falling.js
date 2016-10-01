var image="asteroid.png";
var no = 15; // number of asteroids falling at once
var speed = 70; // falling speed
var i, dwidth = 480, dheight =640; 
var nht = dheight;
var toppos = 0;

if(document.all){
	var ie4up = 1;
}else{
	var ie4up = 0;
}

if(document.getElementById && !document.all){
	var ns6up = 1;
}else{
	var ns6up = 0;
}

function getScrollXY() {
  var scrOfX = 10, scrOfY = 10;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY =window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement &&
      ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
   scrOfY = document.documentElement.scrollTop;
   scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

var timer;

function ranrot()
{

var a = getScrollXY()
if(timer)
{
	clearTimeout(timer);
}
toppos = a[1];
dheight = nht+a[1];
//alert(dheight);

timer = setTimeout('ranrot()',2000);
}
 	
ranrot();
 	
function iecompattest()
{
	if(document.compatMode && document.compatMode!="BackCompat")
	{
		return document.documentElement;
	}else{
		return document.body;
	}
	
}
if (ns6up) {
	dwidth = window.innerWidth;
	dheight = window.innerHeight;
} 
else if (ie4up) {
	dwidth = iecompattest().clientWidth;
	dheight = iecompattest().clientHeight;
}

nht = dheight;

var cv = new Array();
var px = new Array();       //position variables
var py = new Array();      //position variables
var am = new Array();     //amplitude variables
var sx = new Array();    //step variables
var sy = new Array();   //step variables

for (i = 0; i < no; ++ i) {  
	cv[i] = 0;
	px[i] = Math.random()*(dwidth-100);  // set position variables
	py[i] = Math.random()*dheight;     // set position variables
	am[i] = Math.random()*20;         // set amplitude variables
	sx[i] = 0.02 + Math.random()/10;  // set step variables
	sy[i] = 0.7 + Math.random();    // set step variables
	document.write("<div id=\"dot"+ i +"\" style=\"POSITION: absolute; Z-INDEX: "+ i +"; VISIBILITY: visible; TOP: 15px;LEFT: 15px;\"><img src='"+image+"' border=\"0\"><\/div>");
}

function animation() {  // animation function
	for (i = 0; i < no; ++ i) {  // iterate for every dot
		py[i] += sy[i];
      		if (py[i] > dheight-50) {
        		px[i] = Math.random()*(dwidth-am[i]-100);
        		py[i] = toppos;
        		sx[i] = 0.02 + Math.random()/10;
        		sy[i] = 0.7 + Math.random();
      		}
      		cv[i] += sx[i];
      		document.getElementById("dot"+i).style.top=py[i]+"px";
      		document.getElementById("dot"+i).style.left=px[i] + am[i]*Math.sin(cv[i])+"px";  
    	}
    	atime=setTimeout("animation()", speed);

}
animation();