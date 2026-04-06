(function(){
  var PRESETS = {
    performance: {
      pixelRatio: 1.2,
      shadowMap: 1024,
      openSpeed: 0.26,
      idleY: 0.006,
      idleZ: 0.02,
      screenGlow: 2.1
    },
    cinematic: {
      pixelRatio: 1.7,
      shadowMap: 2048,
      openSpeed: 0.34,
      idleY: 0.008,
      idleZ: 0.028,
      screenGlow: 2.6
    },
    ultra: {
      pixelRatio: 2.0,
      shadowMap: 2048,
      openSpeed: 0.3,
      idleY: 0.009,
      idleZ: 0.03,
      screenGlow: 2.8
    }
  };

  function createEnvTexture(THREE){
    var c = document.createElement('canvas');
    c.width = 512;
    c.height = 256;
    var g = c.getContext('2d');
    var grad = g.createLinearGradient(0,0,0,c.height);
    grad.addColorStop(0,'#0a1530');
    grad.addColorStop(0.45,'#132f61');
    grad.addColorStop(1,'#050915');
    g.fillStyle = grad;
    g.fillRect(0,0,c.width,c.height);
    var t = new THREE.CanvasTexture(c);
    t.mapping = THREE.EquirectangularReflectionMapping;
    t.encoding = THREE.sRGBEncoding;
    return t;
  }

  function loadThreeAndStart(){
    var loader = document.getElementById('loader');
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = function(){ initHeroLaptop('cinematic'); };
    s.onerror = function(){ if (loader) loader.textContent = 'FAILED TO LOAD THREE.JS'; };
    document.head.appendChild(s);

    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;800&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(f);
  }

  function initHeroLaptop(presetName){
    var THREE = window.THREE;
    var cfg = PRESETS[presetName] || PRESETS.cinematic;

    var ROLES=['Backend Engineer','AI Developer','Python Specialist','FastAPI Expert','Systems Builder'];
    var ri=0,ci=0,deleting=false,typed='';
    function tick(){
      var r=ROLES[ri];
      if(!deleting){
        ci++;typed=r.slice(0,ci);
        if(ci>=r.length){deleting=true;setTimeout(tick,1500);return;}
      } else {
        ci--;typed=r.slice(0,ci);
        if(ci===0){deleting=false;ri=(ri+1)%ROLES.length;}
      }
      setTimeout(tick,deleting?40:72);
    }
    setTimeout(tick,2200);
    var blink=true;
    setInterval(function(){blink=!blink;},520);

    var SW=1440,SH=900;
    var offscreen=document.createElement('canvas');
    offscreen.width=SW;offscreen.height=SH;
    var ctx=offscreen.getContext('2d');
    function rrect(x,y,w,h,r){
      ctx.beginPath();
      ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
      ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
      ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);
      ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);
      ctx.closePath();
    }

    function paintScreen(fade,t){
      ctx.clearRect(0,0,SW,SH);
      ctx.fillStyle='#010409';ctx.fillRect(0,0,SW,SH);
      var g=ctx.createRadialGradient(460,SH*0.5,0,460,SH*0.5,820);
      g.addColorStop(0,'rgba(0,90,200,.22)');
      g.addColorStop(.55,'rgba(0,50,140,.09)');
      g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.fillRect(0,0,SW,SH);
      var vignette=ctx.createRadialGradient(SW*0.5,SH*0.52,100,SW*0.5,SH*0.52,980);
      vignette.addColorStop(0,'rgba(0,0,0,0)');
      vignette.addColorStop(1,'rgba(0,0,0,.34)');
      ctx.fillStyle=vignette;ctx.fillRect(0,0,SW,SH);
      ctx.globalAlpha=fade;
      var lx=118,ly=132;
      rrect(86,84,1266,736,22);
      ctx.fillStyle='rgba(4,10,24,.42)';
      ctx.fill();
      rrect(86,84,1266,736,22);
      ctx.strokeStyle='rgba(0,212,255,.08)';
      ctx.lineWidth=2;
      ctx.stroke();
      var p=0.5+0.5*Math.sin(t*3.2);
      ctx.beginPath();ctx.arc(lx+4,ly+8,7,0,Math.PI*2);ctx.fillStyle='#22c55e';ctx.fill();
      ctx.beginPath();ctx.arc(lx+4,ly+8,7+p*8,0,Math.PI*2);
      ctx.strokeStyle='rgba(34,197,94,'+(0.5*(1-p))+')';ctx.lineWidth=2;ctx.stroke();
      ctx.fillStyle='#00d4ff';ctx.fillRect(lx+20,ly+7,30,2);
      ctx.font='600 20px "JetBrains Mono",monospace';ctx.fillStyle='#2be3ff';ctx.fillText('AVAILABLE FOR WORK',lx+58,ly+13);
      ctx.shadowColor='rgba(0,212,255,.28)';ctx.shadowBlur=14;
      ctx.font='800 148px "Space Grotesk",sans-serif';ctx.fillStyle='#e8eef6';ctx.fillText('Rohan',lx,ly+155);
      var tg=ctx.createLinearGradient(lx,0,lx+550,0);tg.addColorStop(0,'#00d4ff');tg.addColorStop(1,'#10b981');
      ctx.fillStyle=tg;ctx.font='800 148px "Space Grotesk",sans-serif';ctx.fillText('Tekale.',lx,ly+320);ctx.shadowBlur=0;
      ctx.font='500 34px "JetBrains Mono",monospace';ctx.fillStyle='#9bb3cf';ctx.fillText((typed||'')+(blink?'▊':' '),lx,ly+404);
      var DESC=[['I','build','scalable','backend','systems','and'],['intelligent','AI','pipelines','—','from','microservices'],['on','AWS','to','RAG','systems','with','LangChain.']];
      var HL={scalable:1,backend:1,systems:1,intelligent:1,AI:1,pipelines:1,microservices:1,AWS:1,RAG:1,'LangChain.':1};
      DESC.forEach(function(line,li){
        var cx=lx;
        line.forEach(function(w){
          var isH=HL[w];
          ctx.font=(isH?'600':'400')+' 24px "Space Grotesk",sans-serif';
          ctx.fillStyle=isH?'#dbe7f5':'#59728f';
          ctx.fillText(w+' ',cx,ly+456+li*36);
          cx+=ctx.measureText(w+' ').width;
        });
      });
      function btn(x,y,w,h,label,solid,col){
        rrect(x,y,w,h,8);
        if(solid){ctx.fillStyle=col;ctx.fill();ctx.font='700 19px "JetBrains Mono",monospace';ctx.fillStyle='#000';}
        else {ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='rgba(0,0,0,.2)';ctx.fill();ctx.font='500 19px "JetBrains Mono",monospace';ctx.fillStyle=col;}
        var tw=ctx.measureText(label).width;ctx.fillText(label,x+(w-tw)/2,y+h/2+5);
      }
      btn(lx,ly+588,200,52,'> View Work',true,'#00d4ff');
      btn(lx+216,ly+588,200,52,"> Let's Talk",false,'rgba(0,212,255,.72)');
      btn(lx+432,ly+588,186,52,'> AI Work',false,'rgba(16,185,129,.72)');
      var rx=860,ry=138,rw=474,rh=462,cw=rw/2,ch=rh/2;
      var STATS=[{n:'99.9%',l:'API UPTIME'},{n:'1k+',l:'EVENTS / SEC'},{n:'30%',l:'QUERY SPEEDUP'},{n:'5+',l:'PROJECTS SHIPPED'}];
      STATS.forEach(function(s,i){
        var col=i%2,row=Math.floor(i/2),sx=rx+col*cw,sy=ry+row*ch,pad=5;
        rrect(sx+pad,sy+pad,cw-pad*2,ch-pad*2,10);ctx.fillStyle='rgba(3,7,20,.88)';ctx.fill();
        var ng=ctx.createLinearGradient(sx,sy,sx+cw,sy+ch);ng.addColorStop(0,'#00d4ff');ng.addColorStop(1,'#10b981');
        ctx.shadowColor='rgba(0,212,255,.26)';ctx.shadowBlur=12;ctx.font='800 92px "Space Grotesk",sans-serif';ctx.fillStyle=ng;
        var nw=ctx.measureText(s.n).width;ctx.fillText(s.n,sx+(cw-nw)/2,sy+ch*0.57);ctx.shadowBlur=0;
        ctx.font='500 22px "JetBrains Mono",monospace';ctx.fillStyle='#7e9db9';var lw=ctx.measureText(s.l).width;ctx.fillText(s.l,sx+(cw-lw)/2,sy+ch*0.78);
      });
      var scan=ctx.createLinearGradient(0,0,0,SH);scan.addColorStop(0,'rgba(255,255,255,.02)');scan.addColorStop(.5,'rgba(255,255,255,0)');scan.addColorStop(1,'rgba(255,255,255,.024)');
      ctx.fillStyle=scan;ctx.fillRect(0,0,SW,SH);
      var sweepY=(t*110)%SH;var sweep=ctx.createLinearGradient(0,sweepY-80,0,sweepY+80);
      sweep.addColorStop(0,'rgba(0,212,255,0)');sweep.addColorStop(.5,'rgba(0,212,255,.1)');sweep.addColorStop(1,'rgba(0,212,255,0)');
      ctx.fillStyle=sweep;ctx.fillRect(0,0,SW,SH);ctx.globalAlpha=1;
    }

    var canvas=document.getElementById('c');
    var W=innerWidth,H=innerHeight;
    var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:false});
    renderer.setSize(W,H);
    renderer.setPixelRatio(Math.min(devicePixelRatio,cfg.pixelRatio));
    renderer.outputEncoding=THREE.sRGBEncoding;
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=0.98;

    var scene=new THREE.Scene();
    scene.background=new THREE.Color(0x020611);
    scene.fog=new THREE.Fog(0x020611,14,31);
    scene.environment = createEnvTexture(THREE);

    var cam=new THREE.PerspectiveCamera(35,W/H,.01,100);
    cam.position.set(0,2.35,10.25);
    cam.lookAt(0,0.08,0.72);

    scene.add(new THREE.AmbientLight(0xffffff,.11));
    var keyL=new THREE.SpotLight(0xf2f6ff,1.8);
    keyL.position.set(-3.8,5.2,5.9);keyL.castShadow=true;
    keyL.shadow.mapSize.set(cfg.shadowMap,cfg.shadowMap);
    keyL.angle=.42;keyL.penumbra=.95;keyL.decay=1.22;scene.add(keyL);
    var rimL=new THREE.DirectionalLight(0x6f9bff,.24);rimL.position.set(4.4,3.1,-5.8);scene.add(rimL);
    var fillL=new THREE.DirectionalLight(0x7ea9ff,.16);fillL.position.set(-4.8,2.1,-2.6);scene.add(fillL);
    var scrG=new THREE.PointLight(0x4e86ff,0,10);scrG.position.set(0,1.55,2.15);scene.add(scrG);
    var kbG=new THREE.PointLight(0x223f82,0,5.5);kbG.position.set(0,.4,1.0);scene.add(kbG);

    var bodyM =new THREE.MeshStandardMaterial({color:0x4d5563,metalness:.86,roughness:.34});
    var innerM =new THREE.MeshStandardMaterial({color:0x6d7789,metalness:.66,roughness:.42});
    var bezM  =new THREE.MeshStandardMaterial({color:0x0c0d10,metalness:.15,roughness:.75});
    var kbM   =new THREE.MeshStandardMaterial({color:0x73829a,metalness:.14,roughness:.7});
    var keyM  =new THREE.MeshStandardMaterial({color:0x9eacc2,metalness:.06,roughness:.84});
    var tpM   =new THREE.MeshStandardMaterial({color:0x707b8e,metalness:.2,roughness:.62});
    var sTex=new THREE.CanvasTexture(offscreen);sTex.encoding=THREE.sRGBEncoding;
    var sMat=new THREE.MeshBasicMaterial({map:sTex,side:THREE.FrontSide});sMat.toneMapped=false;

    var mac=new THREE.Group();scene.add(mac);
    /* Keep laptop large but avoid hiding keyboard area */
    mac.scale.set(1.18,1.18,1.18);
    var base=new THREE.Mesh(new THREE.BoxGeometry(3.95,.08,2.68),bodyM);base.position.y=.0475;base.castShadow=true;base.receiveShadow=true;mac.add(base);
    var baseLip=new THREE.Mesh(new THREE.BoxGeometry(3.9,.01,2.63),innerM);baseLip.position.set(0,.086,0);mac.add(baseLip);
    var rim=new THREE.Mesh(new THREE.BoxGeometry(3.86,.012,2.6),innerM);rim.position.y=.008;mac.add(rim);
    var kbD=new THREE.Mesh(new THREE.BoxGeometry(3.3,.004,2.08),kbM);kbD.position.set(0,.128,.05);kbD.renderOrder=10;mac.add(kbD);
    function addKey(x,z,w){var km=new THREE.Mesh(new THREE.BoxGeometry(w,.014,.16),keyM);km.position.set(x,.136,z);km.castShadow=true;km.receiveShadow=true;km.renderOrder=11;mac.add(km);}
    var rowZ=[0.51,0.305,0.1,-0.105,-0.31];
    rowZ.forEach(function(z,ri){for(var col=0;col<13;col++){var w=.155,x=-1.28+col*.205;
      if(ri===0&&col===12){w=.27;x=-1.28+col*.205+.05;} if(ri===1&&col===0){w=.24;x=-1.28-.03;} if(ri===1&&col===12){w=.22;x=-1.28+12*.205+.02;}
      if(ri===2&&col===0){w=.29;x=-1.28-.06;} if(ri===2&&col===12){w=.29;x=-1.28+12*.205+.06;} if(ri===3&&col===0){w=.35;x=-1.28-.09;}
      if(ri===3&&col===12){w=.36;x=-1.28+12*.205+.09;} if(ri===4&&col>0&&col<11){continue;} if(ri===4&&col===0){w=.28;x=-1.28-.02;}
      if(ri===4&&col===11){w=.28;x=-1.28+11*.205+.02;} if(ri===4&&col===12){w=.28;x=-1.28+12*.205+.02;} addKey(x,z,w);
    }});
    var spacebar=new THREE.Mesh(new THREE.BoxGeometry(1.02,.014,.16),keyM);spacebar.position.set(0,.136,-.31);spacebar.castShadow=true;spacebar.receiveShadow=true;spacebar.renderOrder=11;mac.add(spacebar);
    var tpad=new THREE.Mesh(new THREE.BoxGeometry(1.16,.002,.76),tpM);tpad.position.set(0,.128,.9);tpad.renderOrder=12;mac.add(tpad);
    var touchId=new THREE.Mesh(new THREE.BoxGeometry(.16,.014,.16),keyM);touchId.position.set(1.45,.136,-.77);touchId.renderOrder=11;mac.add(touchId);

    var lid=new THREE.Group();lid.position.set(0,.115,-1.3);mac.add(lid);
    var ls=new THREE.Mesh(new THREE.BoxGeometry(4.18,.043,2.88),bodyM);ls.position.set(0,0,1.3);ls.castShadow=true;lid.add(ls);
    var lidEdge=new THREE.Mesh(new THREE.BoxGeometry(4.14,.006,2.84),innerM);lidEdge.position.set(0,-.024,1.3);lid.add(lidEdge);
    var hinge=new THREE.Mesh(new THREE.CylinderGeometry(.028,.028,3.36,28),innerM);hinge.rotation.z=Math.PI/2;hinge.position.set(0,-.008,.02);mac.add(hinge);
    var bz=new THREE.Mesh(new THREE.BoxGeometry(4.1,.01,2.82),bezM);bz.position.set(0,-.028,1.3);lid.add(bz);
    var scrMesh=new THREE.Mesh(new THREE.PlaneGeometry(3.9,2.6),sMat);scrMesh.rotation.x=Math.PI/2;scrMesh.position.set(0,-.036,1.3);lid.add(scrMesh);
    var glass=new THREE.Mesh(new THREE.PlaneGeometry(3.9,2.6),new THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:.06,roughness:.1,metalness:0,clearcoat:1,clearcoatRoughness:.12}));
    glass.rotation.x=Math.PI/2;glass.position.set(0,-.038,1.3);lid.add(glass);
    var ntch=new THREE.Mesh(new THREE.BoxGeometry(.34,.02,.09),new THREE.MeshStandardMaterial({color:0x030305,roughness:1,metalness:0}));ntch.position.set(0,-.034,.18);lid.add(ntch);

    var fl=new THREE.Mesh(new THREE.PlaneGeometry(28,28),new THREE.MeshStandardMaterial({color:0x070f22,roughness:.95,metalness:.03}));
    fl.rotation.x=-Math.PI/2;fl.position.y=-.48;fl.receiveShadow=true;scene.add(fl);
    var refM=new THREE.MeshBasicMaterial({color:0x2255bb,transparent:true,opacity:0});
    var refP=new THREE.Mesh(new THREE.PlaneGeometry(4.5,3.5),refM);refP.rotation.x=-Math.PI/2;refP.position.set(0,-.479,1.8);scene.add(refP);

    var lidAngle=0.06,TARGET=1.74,openAnim=0;
    var camStartZ=10.7,camEndZ=10.25,lastNow=0,time=0,ft=0,autoOpen=true;
    var tY=0,tX=0,cY=0,cX=0,dragging=false,px=0,py=0,uiShown=false;

    canvas.addEventListener('mousedown',function(e){dragging=true;px=e.clientX;py=e.clientY;autoOpen=false;});
    window.addEventListener('mouseup',function(){dragging=false;});
    window.addEventListener('mousemove',function(e){if(!dragging)return;tY+=(e.clientX-px)*.0048;tX+=(e.clientY-py)*.0032;tX=Math.max(-.16,Math.min(.16,tX));px=e.clientX;py=e.clientY;});
    canvas.addEventListener('touchstart',function(e){dragging=true;px=e.touches[0].clientX;py=e.touches[0].clientY;autoOpen=false;},{passive:true});
    window.addEventListener('touchend',function(){dragging=false;});
    window.addEventListener('touchmove',function(e){if(!dragging)return;tY+=(e.touches[0].clientX-px)*.0048;tX+=(e.touches[0].clientY-py)*.0032;px=e.touches[0].clientX;py=e.touches[0].clientY;},{passive:true});
    canvas.addEventListener('wheel',function(e){cam.position.z=Math.max(7.7,Math.min(11.2,cam.position.z+e.deltaY*.005));e.preventDefault();},{passive:false});

    var loaderHidden=false;
    function loop(now){
      requestAnimationFrame(loop);
      if(!lastNow) lastNow=now;
      var dt=Math.min(0.033,Math.max(0.001,(now-lastNow)/1000));
      lastNow=now;time+=dt;ft+=dt*.38;
      if(autoOpen&&openAnim<1){
        openAnim=Math.min(1,openAnim+dt*cfg.openSpeed);
        var eased=openAnim*openAnim*(3-2*openAnim);
        var settle=Math.sin(Math.min(1,openAnim)*Math.PI)*0.016*(1-openAnim);
        lidAngle=0.06+(TARGET-0.06)*eased+settle;
        if(!dragging){tY=Math.sin(time*.24)*.02;tX=0;}
      } else if(!dragging){ tY+=Math.sin(ft*.65)*.00008; }

      var cl=Math.min(lidAngle,TARGET);
      lid.rotation.x=-cl + Math.sin(ft*1.2)*0.0012*Math.min(1,openAnim);
      var openR=Math.max(0,(cl-.05)/(TARGET-.05));
      var fade=0;if(openR>.02){fade=Math.min(1,Math.max(.4,(openR-.02)/.22));}
      scrG.intensity=openR*(cfg.screenGlow+0.35);kbG.intensity=openR*1.45;refM.opacity=openR*.07;
      cam.position.z=camStartZ-(camStartZ-camEndZ)*Math.min(1,openAnim);
      paintScreen(fade,time);sTex.needsUpdate=true;
      cY+=(tY-cY)*Math.min(.08,dt*4.8);cX+=(tX-cX)*Math.min(.08,dt*4.8);
      mac.rotation.y=cY;mac.rotation.x=-0.05+cX;mac.rotation.z=Math.sin(ft*.75)*.0018;
      mac.position.y=-.5+Math.sin(ft*1.0)*cfg.idleY;mac.position.z=Math.sin(ft*.52)*cfg.idleZ;
      if(openR>.35&&!uiShown){uiShown=true;document.getElementById('nav').classList.add('on');document.getElementById('hint').classList.add('on');}
      renderer.render(scene,cam);
      if(!loaderHidden){loaderHidden=true;var loader=document.getElementById('loader');loader.classList.add('hide');setTimeout(function(){loader.style.display='none';},900);}
    }
    loop(0);

    window.addEventListener('resize',function(){
      W=innerWidth;H=innerHeight;
      cam.aspect=W/H;cam.updateProjectionMatrix();
      renderer.setSize(W,H);
    });
  }

  loadThreeAndStart();
})();
