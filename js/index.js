var threeStudy = function(){
	var self = this;

	self.scene = {};
	self.camera = {};
	self.renderer = {};
	var step = 0;										//动画的速度
	var clock = new THREE.Clock();					

	//新建一个3D基础：场景，相机，渲染器
	self.baseInit = function(){
		self.scene = new THREE.Scene();
		self.camera = new THREE.PerspectiveCamera( 45, $(window).width()/$(window).height(), 0.1, 1000);
		self.renderer = new THREE.WebGLRenderer();
		self.renderer.setSize($(window).width(), $(window).height() );														//场景大小
		self.renderer.setClearColor(0xeeeeee,1.0);												//场景颜色
		self.renderer.shadowMap.enabled = true;		

		window.scene = self.scene;
		window.THREE = THREE;
													//场景阴影
		// self.scene.fog = new THREE.Fog(0x900090,50,100);										//雾化
		// self.scene.overrideMaterial = new THREE.MeshLambertMaterial({color:0xa0aa00});			//为场景里所有元素添加材质
	}//end func

	//新建一个坐标轴
	self.newAxes = function(){
		var axes = new THREE.AxisHelper(20);
		self.scene.add(axes);
	}//end func

	//新建一个平面
	self.newPlane = function(){
		var planeG = new THREE.PlaneGeometry(60,60);
		var planeM = new THREE.MeshLambertMaterial({color:0xcccccc});
		self.plane = new THREE.Mesh(planeG,planeM);
		self.plane.name = "plane";
		self.plane.receiveShadow = true;
		self.plane.rotation.x = -0.5*Math.PI;
		self.plane.position.x = 0;
		self.plane.position.y = -15.8;
		self.plane.position.z = 0;
		self.scene.add(self.plane);
	}//end func

	//新建一立方体
	self.newCube = function(size,position,rotation,w){
		var CG = new THREE.BoxGeometry(size.x,size.y,size.z);
		var CM = new THREE.MeshBasicMaterial({color:0x5a3732,wireframe:w});
		self.cube = new THREE.Mesh(CG,CM);
		
		self.cube.rotation.x = rotation.x;
		self.cube.rotation.y = rotation.y;
		self.cube.rotation.z = rotation.z;

		self.cube.position.x = position.x;
		self.cube.position.y = position.y;
		self.cube.position.z = position.z;
		self.scene.add(self.cube);
	}//end func

	//新建一个球体
	self.newBall = function(r,position){
		var SG = new THREE.SphereGeometry(r,20,20);
		var SM = new THREE.MeshLambertMaterial({color:0x990099});
		self.sphere = new THREE.Mesh(SG,SM);
		self.sphere.castShadow = true;
		self.sphere.position.x = position.x;
		self.sphere.position.y = position.y;
		self.sphere.position.z = position.z;
		self.scene.add(self.sphere);
	}//end func

	//渲染场景
	self.renderScene = function(ele){
		ele.append(self.renderer.domElement);
		self.renderer.render(self.scene,myThree.camera);
	}//end func

	//创造光源
	self.lighting = function(){
		var SL = new THREE.SpotLight(0xffffff);
		SL.position.set(-40,60,-10);
		SL.castShadow = true;
		self.scene.add(SL);
	}//end func

	//创造环境光
	self.amLight = function(){
		var abl = new THREE.AmbientLight(0x0c0c0c);
		self.scene.add(abl);
	}//end func
	
	//场景物体的动画
	self.MoveAnime = function(){
		var delta = clock.getDelta();
		self.TC.update(delta);
		self.renderer.render(self.scene,myThree.camera);
		requestAnimationFrame(self.MoveAnime);
	}//end func

	//新建一个自定义形状
	self.customizeShape = function(vertices,faces,position,rotation){
		var geom = new THREE.Geometry();
		geom.vertices = vertices;
		geom.faces = faces;
		var GM = new THREE.MeshBasicMaterial({color:0x5a3732,wireframe:true});
		self.autoShape = new THREE.Mesh(geom,GM);
		self.autoShape.position.x = position.x;
		self.autoShape.position.y = position.y;
		self.autoShape.position.z = position.z;
		self.autoShape.rotation.x = rotation.x;
		self.autoShape.rotation.y = rotation.y;
		self.autoShape.rotation.z = rotation.z;
		// self.autoShape.castShadow = true;
		self.scene.add(self.autoShape);
	}//end func

	//设置轨迹球控件
	self.circleControls = function(){
		self.TC = new THREE.TrackballControls(self.camera,self.renderer.domElement);
		self.TC.rotateSpeed = 2.0;
		self.TC.zoomSpeed = 1.2;
		self.TC.panSpeed = 0.8;
		self.TC.noZoom = false;
		self.TC.noPan = false;
		self.TC.staticMoving = true;
		self.TC.dynamicDampingFactor = 0.3;
		self.TC.keys = [ 65, 83, 68 ];
		animate();

		function animate() {
			requestAnimationFrame( animate );
			self.TC.update();
			render();
		}

		function render() {
			self.renderer.render( self.scene, self.camera );
		}
	}//end func
		
	//创建一个锥形体
	self.Cone = function(r,h,side){
		var geometry = new THREE.ConeGeometry( r, h, side );
		var material = new THREE.MeshBasicMaterial({color:0x5a3732,wireframe:true});
		var cone = new THREE.Mesh( geometry, material );
		cone.position.y = 20;
		scene.add( cone );
	}//end func

	//创建一个半球
	self.Lathe = function(n,s,c,x,y,p,side){
		var points = [];
		for ( var i = 0; i < n; i += y ) {
			var item = s ? Math.cos( i * c ) + x : Math.sin( i * c ) + x;
			points.push( new THREE.Vector2(item , ( i - 5 ) ) );
		}
		var geometry = new THREE.LatheGeometry( points,side);
		var material = new THREE.MeshBasicMaterial({color:0x5a3732,wireframe:true});
		var lathe = new THREE.Mesh( geometry, material );
		lathe.position.y = p;
		lathe.rotation.y = 0.8;
		scene.add( lathe );
	}//end func

	//创建一个圆柱体
	self.Cylinder = function(rt,rb,h,side,y){
		var geometry = new THREE.CylinderGeometry( rt, rb, h, side );
		var material = new THREE.MeshBasicMaterial({color:0x5a3732,wireframe:true});
		var cylinder = new THREE.Mesh( geometry, material );
		cylinder.position.y = y;
		cylinder.rotation.y = 0.8;
		scene.add( cylinder );
	}//end func
}//end func

// var myThree = new threeStudy();

// myThree.baseInit();
// myThree.newPlane();
// myThree.lighting();
// myThree.amLight();

// myThree.customizeShape(vertices,faces);

// myThree.camera.position.x = -30;
// myThree.camera.position.y = 40;
// myThree.camera.position.z = 30;
// myThree.camera.lookAt(myThree.scene.position);

// myThree.renderScene($(".box"));


