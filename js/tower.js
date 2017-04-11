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

//建立部分场景元素(three.js提供构造好的模型部分)
	myThree.Cone(0.2,4,3); 										//塔尖
	myThree.Lathe(2,true,0.7,0,0.3,22,6);						//塔顶上半球
	myThree.Lathe(2,false,0.2,0.8,0.4,20,6);					//塔顶下半球
	myThree.Cylinder(1.3,1.3,0.4,6,16.8);						//塔顶半球中部
	myThree.Lathe(17,true,0.095,0.8,0.8,3.5,4);					//塔身
	myThree.Cylinder(2.3,2.3,0.6,4,-1.7);						//塔身与塔底链接处
	//塔底中部链接处
	for (var i = 0; i < 5; i++) {
		var iteml = 1.7;
		myThree.newCube({x:iteml,y:1,z:iteml},{x:-iteml*2 + i*iteml,y:-8.9,z:3.4},{x:0,y:0,z:0},true);
		myThree.newCube({x:iteml,y:1,z:iteml},{x:-iteml*2 + i*iteml,y:-8.9,z:-3.4},{x:0,y:0,z:0},true);
		myThree.newCube({x:iteml,y:1,z:iteml},{x:-3.4,y:-8.9,z:-iteml*2 + i*iteml},{x:0,y:0,z:0},true);
		myThree.newCube({x:iteml,y:1,z:iteml},{x:3.4,y:-8.9,z:-iteml*2 + i*iteml},{x:0,y:0,z:0},true);
	};
	//end
	//塔底的黑色底座
	myThree.newCube({x:1.8,y:0.3,z:0.3},{x:-6.7,y:-15.5,z:7.5},{x:0,y:0,z:0},false);
	myThree.newCube({x:1.8,y:0.3,z:0.3},{x:6.7,y:-15.5,z:7.5},{x:0,y:0,z:0},false);
	myThree.newCube({x:1.8,y:0.3,z:0.3},{x:-6.7,y:-15.5,z:-7.5},{x:0,y:0,z:0},false);
	myThree.newCube({x:1.8,y:0.3,z:0.3},{x:6.7,y:-15.5,z:-7.5},{x:0,y:0,z:0},false);
	myThree.newCube({x:0.3,y:0.3,z:1.8},{x:7.5,y:-15.5,z:-6.7},{x:0,y:0,z:0},false);
	myThree.newCube({x:0.3,y:0.3,z:1.8},{x:7.5,y:-15.5,z:6.7},{x:0,y:0,z:0},false);
	myThree.newCube({x:0.3,y:0.3,z:1.8},{x:-7.5,y:-15.5,z:-6.7},{x:0,y:0,z:0},false);
	myThree.newCube({x:0.3,y:0.3,z:1.8},{x:-7.5,y:-15.5,z:6.7},{x:0,y:0,z:0},false);
	//end
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

//建立塔底上半部分封闭处
var verticesA = makePoint(0.65,5,-0.3);
var verticesB = makePoint(0.65,5,0.3);
var faces = makeFace(8);
myThree.customizeShape(verticesB,faces,{x:-1.3,y:-2,z:1.3},{x:0,y:0,z:0});
myThree.customizeShape(verticesA,faces,{x:-1.3,y:-2,z:1.3},{x:0,y:1.6,z:0});
myThree.customizeShape(verticesA,faces,{x:-1.4,y:-2,z:-1.3},{x:0,y:0,z:0});
myThree.customizeShape(verticesB,faces,{x:1.3,y:-2,z:1.3},{x:0,y:1.6,z:0});
//end

//建立塔底上半部分非封闭处
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
//end

//建立塔底下班部分
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
//end func

//建立塔底下班部分圆弧面
	//构造圆弧的点
	var CpointA = [],CpointA_side = [];
	var CpointB = [],CpointB_side = [];
	var cX = 0,cY = 0;
	for (var i = -5.9; i < 5.9; i+=0.59) {
		cX = i.toFixed(2);
		cY = Math.sqrt(6.5 * 6.5 - i * i).toFixed(2);
		CpointA.push(new THREE.Vector3(cX,cY,0));
		CpointA_side.push(new THREE.Vector3(0,cY,cX));
	};
	cX = 0,cY = 0;
	var Cfaces = [];
	for (var i = -5; i < 5; i+=0.5) {
		cX = i.toFixed(2);
		cY = Math.sqrt(6.5 * 6.5 - i * i).toFixed(2) + 1;
		CpointB.push(new THREE.Vector3(cX,cY,0));
		CpointB_side.push(new THREE.Vector3(0,cY,cX));
	};
	for (var i = 0; i < 18; i++) {
		Cfaces.push(new THREE.Face3(i,i+1,i+2));
	};
	//end 

	//构造梯形的点
	var Tpoint = [],Tpoint_side = [];
	var tX = -5.9,tY = 3;
	Tpoint.push(new THREE.Vector3(tX.toFixed(4),tY.toFixed(1),0));
	Tpoint_side.push(new THREE.Vector3(0,tY.toFixed(1),tX.toFixed(4)));
	for (var i = 0; i < 6; i++) {
		tX += 0.5583;
		tY += 1.1;
		Tpoint.push(new THREE.Vector3(tX.toFixed(4),tY.toFixed(1),0));
		Tpoint_side.push(new THREE.Vector3(0,tY.toFixed(1),tX.toFixed(4)));
	};
	for (var i = 0; i < 8; i++) {
		tX += 0.6375;
		Tpoint.push(new THREE.Vector3(tX.toFixed(4),tY.toFixed(1),0));
		Tpoint_side.push(new THREE.Vector3(0,tY.toFixed(1),tX.toFixed(4)));
	};
	for (var i = 0; i < 6; i++) {
		tX += 0.5583;
		tY -= 1.1;
		Tpoint.push(new THREE.Vector3(tX.toFixed(4),tY.toFixed(1),0));
		Tpoint_side.push(new THREE.Vector3(0,tY.toFixed(1),tX.toFixed(4)));
	};
	//end

	//构造圆弧面
	var CTpoint = [],CTpoint_side = [];
	var CTfaces = [];
	for (var i = 0; i < 21; i++) {
		if(i != 0) {
			CTpoint.push(Tpoint[i]);
			CTpoint_side.push(Tpoint_side[i]);
		};
		if(i != 20) {
			CTpoint.push(CpointA[i]);
			CTpoint_side.push(CpointA_side[i]);
		};
	};
	for (var i = 0; i < 38; i++) {
		CTfaces.push(new THREE.Face3(i,i+1,i+2));
	};
	var Lpoint = [new THREE.Vector3(-3.2,7.6,0),new THREE.Vector3(3.2,7.6,0),new THREE.Vector3(3.2,7.6,0)];
	var Lpoint_side = [new THREE.Vector3(0,7.6,-3.2),new THREE.Vector3(0,7.6,3.2),new THREE.Vector3(0,7.6,3.2)];
	var Lfaces = [new THREE.Face3(0,1,2)];

	//正面
	myThree.customizeShape(CTpoint,CTfaces,{x:0,y:-17.7,z:8.9},{x:-0.54,y:0,z:0});
	myThree.customizeShape(Lpoint,Lfaces,{x:0.1,y:-17.1,z:8.6},{x:-0.54,y:0,z:0});
	myThree.customizeShape(CpointB,Cfaces,{x:0.1,y:-17.1,z:8.6},{x:-0.54,y:0,z:0});

	//背面
	myThree.customizeShape(CTpoint,CTfaces,{x:0,y:-17.7,z:-8.9},{x:0.54,y:0,z:0});
	myThree.customizeShape(Lpoint,Lfaces,{x:0.1,y:-17.1,z:-8.6},{x:0.54,y:0,z:0});
	myThree.customizeShape(CpointB,Cfaces,{x:0.1,y:-17.1,z:-8.6},{x:0.54,y:0,z:0});

	//左面
	myThree.customizeShape(CTpoint_side,CTfaces,{x:-8.9,y:-17.7,z:0},{x:0,y:0,z:-0.54});
	myThree.customizeShape(Lpoint_side,Lfaces,{x:-8.6,y:-17.1,z:0},{x:0,y:0,z:-0.54});
	myThree.customizeShape(CpointB_side,Cfaces,{x:-8.6,y:-17.1,z:0},{x:0,y:0,z:-0.54});

	//右面
	myThree.customizeShape(CTpoint_side,CTfaces,{x:8.9,y:-17.7,z:0},{x:0,y:0,z:0.54});
	myThree.customizeShape(Lpoint_side,Lfaces,{x:8.6,y:-17.1,z:0},{x:0,y:0,z:0.54});
	myThree.customizeShape(CpointB_side,Cfaces,{x:8.6,y:-17.1,z:0},{x:0,y:0,z:0.54});
	//end
//end
