/*
 *	Vue 右键菜单插件
 *
 *	结合contextmenu.vue组件一起使用
*/
;(function(){
	var contextMenu = {};
	contextMenu.install = function(Vue){		
		Vue.directive('contextmenu',{
			twoWay: true,
			deep:true,
			bind:function(){
				Vue.util.on(this.el, 'contextmenu', this.handler.bind(this));
				Vue.util.on(document, 'click',function(){
					try{this.vm[this.arg] = false;}catch(e){}
				}.bind(this));
			},
			handler:function(e){
				var e = e || window.event;
				e.stopPropagation();
				e.preventDefault();
				var show = this.vm[this.arg];
				if(!show) this.vm[this.arg] = true;
				var wW = window.innerWidth, wH = window.innerHeight,
					w = this.el.offsetWidth, h = this.el.offsetHeight;
				var x = ((e.clientY + h) > wH) ? e.clientY - h : e.clientY;
				var y = ((e.clientX + w) > wW) ? e.clientX - w : e.clientX;
				this.set({x:x,y:y});
			}
		})
	}
	if (typeof exports == "object") {
		module.exports = contextMenu
	} else if (typeof define == "function" && define.amd) {
		define([], function(){ return contextMenu })
	}else if(window.Vue){
		window.contextMenu = contextMenu;
	    Vue.use(contextMenu);
	}
})();