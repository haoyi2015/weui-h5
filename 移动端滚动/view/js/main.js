;(function(window,document,undefined){
	var data,
	    myScroll,
	    pullDownEl, pullDownOffset,
	    pullUpEl, pullUpOffset,
	    generatedCount = 0;
	
	var _scroll ={
		pullDownAction: function(){
			$.getJSON('js/test.json', function(data, state) {
		        if (data && data.state == 1 && state == 'success') {
		            //本地测试，为了看到加载中效果故加上定时器
		            setTimeout(function() {
		                $('#news-lists').before(data.data);
		                myScroll.refresh();
		            }, 600);
		        }
		    });
		},
		pullUpAction: function(){
			$.getJSON('/js/test.json', function(data, state) {
		        if (data && data.state == 1 && state == 'success') {
		            //本地测试，为了看到加载中效果故加上定时器
		            setTimeout(function() {
		                $('#news-lists').append(data.data);
		                myScroll.refresh();
		            }, 600);
		        }
		    });
		},
		init: function(){
			pullDownEl = document.getElementById('pullDown');
		    pullDownOffset = pullDownEl.offsetHeight;
		    pullUpEl = document.getElementById('pullUp');
		    pullUpOffset = pullUpEl.offsetHeight;

		    /**
		     * 初始化iScroll控件
		     */
		    myScroll = new iScroll('wrapper', {
		        vScrollbar: false,
		        topOffset: pullDownOffset,
		        onRefresh: function() {
		            if (pullDownEl.className.match('loading')) {
		                pullDownEl.className = '';
		                //这个只是提示
		                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
		            } else if (pullUpEl.className.match('loading')) {
		                pullUpEl.className = '';
		                //这个只是提示
		                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
		            }
		        },
		        onScrollMove: function() {
		            if (this.y > 5 && !pullDownEl.className.match('flip')) {
		                pullDownEl.className = 'flip';
		                //这个只是提示
		                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
		                this.minScrollY = 0;
		            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
		                pullUpEl.className = 'flip';
		                //这个只是提示
		                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
		            }
		        },
		        onScrollEnd: function() {
		            if (pullDownEl.className.match('flip')) {
		                pullDownEl.className = 'loading';
		                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
		                _scroll.pullDownAction();
		            } else if (pullUpEl.className.match('flip')) {
		                pullUpEl.className = 'loading';
		                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
		                _scroll.pullUpAction();
		            }
		        }
		    });
		}
	}
	//初始化绑定iScroll控件 
	document.addEventListener('touchmove', function(e) {
	    e.preventDefault();
	}, false);
	document.addEventListener('DOMContentLoaded', _scroll.init, false);
})(window,document);