# vue-contextmenu
基于Vue V1.0.2的右键菜单插件
### 使用方法
引入插件 vue-contextmenu.js，并添加如下样式
```css
.context-menu{
	position: fixed;
	top: 0;
	left: 0;
	min-width: 100px;
	margin: 2px 0 0;
	list-style: none;
	background-color: #fff;
	border: 1px solid #ddd;
	border: 1px solid rgba(0, 0, 0, 0.15);
	-webkit-box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.15);
	box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.15);
	-webkit-background-clip: padding-box;
	-moz-background-clip: padding;
	background-clip: padding-box;
	text-align: left;
	border-radius: 2px;
}
.context-menu ul{
	list-style: none;
	margin: 0;
	padding: 0;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 12px;
}
.context-menu ul li{
	height: 30px;
	line-height: 30px;
	border-top: 1px solid #ededed;
}
.context-menu ul li:first-child{
	border-top: none;
}
.context-menu ul li a{
	display: block;
	color: #222;
	padding: 0 10px;
}
.context-menu ul li a.disable{
	color: #999;
}
.context-menu ul li a:hover{
	color: #fff;
	text-decoration: none;
	background-color: #3B5999;
}
```
添加模板

```html
<script type="text/x-template" id="context-menu">
	<div class="context-menu" v-show="show"
		:style="{'left':x+'px','top':y+'px'}">
		<ul>
			<slot></slot>
		</ul>
	</div>
</script>
```
添加javaScript代码，注册一个右键菜单组件
```javascript
Vue.component('context-menu',{
	template : '#context-menu',
	props : {
		show : {
			type: Boolean,
			default: false
		},
		x : {
			type: Number,
			default: 0
		},
		y : {
			type: Number,
			default: 0
		}
	},
	watch : {
		x : function() {
			var w = this.$el.offsetWidth;
			this.x = ((this.x + w) > window.innerWidth)? this.x - w : this.x;
		},
		y : function() {
			var h = this.$el.offsetHeight;
			this.y = ((this.y + h) > window.innerHeight)? this.y - h : this.y;
		}
	}
})
```
在页面需要使用右键菜单的区域添加v-contextmenu指令，如下：
```html
<div class="demo" v-contextmenu:show="options" onselectstart="return false">

</div>
<context-menu :show="show" :x="options.x" :y="options.y">
	<li><a href="javascript:;">Copy</a></li>
	<li><a href="javascript:;">Paste</a></li>
	<li><a href="javascript:;">Delete</a></li>
</context-menu>
```

```javascript
new Vue({
	el : '#app',
	data : {
		options:{ //  右键菜单定位
			x:0,
			y:0
		},
		show : false // 显示右键菜单
	}
})
```
