(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["parametric"],{"06d6":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("canvas",{ref:"canvas"})])},r=[],s=n("c4bc"),a={data:function(){return{renderer:null,scene:null,camera:null,light:null}},mounted:function(){this.renderer=new s["p"]({canvas:this.$refs.canvas}),this.scene=new s["m"],this.scene.background=new s["b"]("black"),this.createCamera(),this.createLight(),requestAnimationFrame(this.render.bind(this))},methods:{createCamera:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:40,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.1,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:100,r=this.camera=new s["j"](e,t,n,i);r.position.set(0,10,20),r.lookAt(0,0,0)},createLight:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:16777215,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=this.light=new s["c"](e,t);n.position.set(0,20,15),n.target.position.set(-5,0,0),this.scene.add(n),this.scene.add(n.target)},render:function(e){var t=this.renderer.domElement,n=window.devicePixelRatio,i=t.clientWidth*n|0,r=t.clientHeight*n|0;this.renderer.setSize(i,r,!1),this.camera.aspect=i/r,this.camera.updateProjectionMatrix(),this.beforeRender&&this.beforeRender(e),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.render.bind(this))}}},c=a,o=(n("5bfb"),n("2877")),h=Object(o["a"])(c,i,r,!1,null,"33d3865c",null),d=h.exports;t["default"]={extends:d,data:function(){return{mesh:null}},mounted:function(){this.createMesh()},methods:{tube:function(e,t){return function(n,i,r){n*=2*Math.PI;var s=Math.sin(n)*e,a=t*(i-.5),c=Math.cos(n)*e;r.set(s,a,c)}},createMesh:function(){var e=new s["i"](this.tube(2,8),20,20),t=new s["g"]({color:5623039,side:s["d"]}),n=this.mesh=new s["f"](e,t);this.scene.add(n)},beforeRender:function(e){e/=1e3,this.mesh.rotation.x=e,this.mesh.rotation.z=e}}}},"5bfb":function(e,t,n){"use strict";var i=n("6ed9"),r=n.n(i);r.a},"6ed9":function(e,t,n){}}]);
//# sourceMappingURL=parametric.58d69b60.js.map