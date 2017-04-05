var myThree = new threeStudy();

//初始化
myThree.baseInit();
myThree.renderScene($(".box"));
//end

//建立一个可移动的视角
myThree.camera.rotation.x = 45;
myThree.camera.position.x = 0;
myThree.camera.position.y = 20;
myThree.camera.position.z = 60;
myThree.circleControls();
//end func

//建立一个底座和场景光线
myThree.newPlane();
myThree.lighting();
myThree.amLight();
//end func

//建立场景元素
myThree.Cone(0.2,4,3);
myThree.Lathe(2,true,0.7,0,0.3,22,6);
myThree.Lathe(2,false,0.2,0.8,0.4,20,6);
myThree.Cylinder(1.3,1.3,0.4,6,16.8);
myThree.Lathe(17,true,0.095,0.8,0.8,3.5,4);
myThree.Cylinder(2.3,2.3,0.6,4,-1.7);
for (var i = 0; i < 5; i++) {
	var iteml = 1.7;
	myThree.newCube({x:iteml,y:1,z:iteml},{x:-iteml*2 + i*iteml,y:-8.9,z:3.4},{x:0,y:0,z:0},true);
	myThree.newCube({x:iteml,y:1,z:iteml},{x:-iteml*2 + i*iteml,y:-8.9,z:-3.4},{x:0,y:0,z:0},true);
	myThree.newCube({x:iteml,y:1,z:iteml},{x:-3.4,y:-8.9,z:-iteml*2 + i*iteml},{x:0,y:0,z:0},true);
	myThree.newCube({x:iteml,y:1,z:iteml},{x:3.4,y:-8.9,z:-iteml*2 + i*iteml},{x:0,y:0,z:0},true);
};
	myThree.newCube({x:1.8,y:0.3,z:0.3},{x:-6.7,y:-15.5,z:7.5},{x:0,y:0,z:0},false);
	myThree.newCube({x:1.8,y:0.3,z:0.3},{x:6.7,y:-15.5,z:7.5},{x:0,y:0,z:0},false);
	myThree.newCube({x:1.8,y:0.3,z:0.3},{x:-6.7,y:-15.5,z:-7.5},{x:0,y:0,z:0},false);
	myThree.newCube({x:1.8,y:0.3,z:0.3},{x:6.7,y:-15.5,z:-7.5},{x:0,y:0,z:0},false);
	myThree.newCube({x:0.3,y:0.3,z:1.8},{x:7.5,y:-15.5,z:-6.7},{x:0,y:0,z:0},false);
	myThree.newCube({x:0.3,y:0.3,z:1.8},{x:7.5,y:-15.5,z:6.7},{x:0,y:0,z:0},false);
	myThree.newCube({x:0.3,y:0.3,z:1.8},{x:-7.5,y:-15.5,z:-6.7},{x:0,y:0,z:0},false);
	myThree.newCube({x:0.3,y:0.3,z:1.8},{x:-7.5,y:-15.5,z:6.7},{x:0,y:0,z:0},false);

//end func

//形状塔底(横)结构的点
function makePoint(l,n,s){
	var vertices = [];
	for (var j = 0; j < n; j++) {
		vertices.push(new THREE.Vector3(l*j,0,0));
		if(j == 0) {
			vertices.push(new THREE.Vector3(l*j - 0.3,-0.8,s));
			vertices.push(new THREE.Vector3(l*j - 0.6,-1.6,s*2));
		}
		else if(j == n-1) {
			vertices.push(new THREE.Vector3(l*j + 0.3,-0.8,s));
			vertices.push(new THREE.Vector3(l*j + 0.6,-1.6,s*2));
		}
		else {
			vertices.push(new THREE.Vector3(l*j,-0.8,s));
			vertices.push(new THREE.Vector3(l*j,-1.6,s*2));
		}
	};
	return vertices;
}
//end

//形成塔底(横)结构的面
function makeFace(n){
	var faces = [];
	for (var i = 0; i < n; i++) {
		var item = i + parseInt(i/2);
		var a = item,b = item+1,c = item+3,d = item+4;
		faces.push(new THREE.Face3(a,b,c));
		faces.push(new THREE.Face3(b,c,d));
		faces.push(new THREE.Face3(c,d,a));
	};
	return faces;
}
//end

//形状塔底(竖)结构的点
function makePointV(l,n,h,s1,s2){
	var vertices = [];
		for (var i = 0; i < n; i++) {
			vertices.push(new THREE.Vector3(0-s1*i,-h*i,s2*i));
			vertices.push(new THREE.Vector3(l-s1*i,-h*i,s2*i));
		};
	return vertices;
}
//end

//形成塔底(竖)结构的面
function makeFaceV(n){
	var faces = [];
	for (var i = 0; i < n; i++) {
		var item = 2*i;
		var a = item,b = item+1,c = item+2,d = item+3;
		faces.push(new THREE.Face3(a,b,c));
		faces.push(new THREE.Face3(b,c,d));
		faces.push(new THREE.Face3(c,d,a));
	};
	return faces;
}
//end

var verticesA = makePoint(0.65,5,-0.3);
var verticesB = makePoint(0.65,5,0.3);
var faces = makeFace(8);
myThree.customizeShape(verticesB,faces,{x:-1.3,y:-2,z:1.3},{x:0,y:0,z:0});
myThree.customizeShape(verticesA,faces,{x:-1.3,y:-2,z:1.3},{x:0,y:1.6,z:0});
myThree.customizeShape(verticesA,faces,{x:-1.4,y:-2,z:-1.3},{x:0,y:0,z:0});
myThree.customizeShape(verticesB,faces,{x:1.3,y:-2,z:1.3},{x:0,y:1.6,z:0});


var verticesC = makePointV(1.26,7,0.8,0.3,0.3);
var verticesD = makePointV(1.26,7,0.8,-0.3,0.3);
var verticesE = makePointV(1.26,7,0.8,0.3,-0.3);
var verticesF = makePointV(1.26,7,0.8,-0.3,-0.3);
var facesB = makeFaceV(6);
myThree.customizeShape(verticesC,facesB,{x:-1.9,y:-3.6,z:1.9},{x:0,y:0,z:0});
myThree.customizeShape(verticesD,facesB,{x:0.64,y:-3.6,z:1.9},{x:0,y:0,z:0});
myThree.customizeShape(verticesE,facesB,{x:-1.9,y:-3.6,z:-1.9},{x:0,y:0,z:0});
myThree.customizeShape(verticesF,facesB,{x:0.64,y:-3.6,z:-1.9},{x:0,y:0,z:0});

myThree.customizeShape(verticesE,facesB,{x:-1.9,y:-3.6,z:1.9},{x:0,y:1.57,z:0});
myThree.customizeShape(verticesC,facesB,{x:1.9,y:-3.6,z:1.9},{x:0,y:1.57,z:0});
myThree.customizeShape(verticesF,facesB,{x:-1.9,y:-3.6,z:-0.64},{x:0,y:1.57,z:0});
myThree.customizeShape(verticesD,facesB,{x:1.9,y:-3.6,z:-0.64},{x:0,y:1.57,z:0});



var verticesG = makePointV(1.5,6,1.2,0.7,0.7);
var verticesH = makePointV(1.5,6,1.2,-0.7,0.7);
var verticesI = makePointV(1.5,6,1.2,0.7,-0.7);
var verticesJ = makePointV(1.5,6,1.2,-0.7,-0.7);
var facesC = makeFaceV(5);
myThree.customizeShape(verticesG,facesC,{x:-4,y:-9.4,z:4},{x:0,y:0,z:0});
myThree.customizeShape(verticesH,facesC,{x:2.5,y:-9.4,z:4},{x:0,y:0,z:0});
myThree.customizeShape(verticesI,facesC,{x:-4,y:-9.4,z:-4},{x:0,y:0,z:0});
myThree.customizeShape(verticesJ,facesC,{x:2.5,y:-9.4,z:-4},{x:0,y:0,z:0});

myThree.customizeShape(verticesI,facesC,{x:-4,y:-9.4,z:4},{x:0,y:1.57,z:0});
myThree.customizeShape(verticesG,facesC,{x:4,y:-9.4,z:4},{x:0,y:1.57,z:0});
myThree.customizeShape(verticesJ,facesC,{x:-4,y:-9.4,z:-2.5},{x:0,y:1.57,z:0});
myThree.customizeShape(verticesH,facesC,{x:4,y:-9.4,z:-2.5},{x:0,y:1.57,z:0});
