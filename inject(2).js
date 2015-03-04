//working copy
//Storage.prototype._setItem = Storage.prototype.setItem; Storage.prototype.setItem = function(key, value) {  this._setItem("prefix" + key, "value Prefix"+value); };'
var store = localStorage;
var inited = false;

///// IMPORTATNT
var s = document.createElement('script');
s.src = chrome.extension.getURL("custom.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

//////

var init = function(){
	var body = document.getElementsByTagName('body')[0];
	var iframe = document.createElement('iframe');
	var url404 = location.origin+'/chrome-extension-localstorage-manager-iframe-notification-404.html';
	iframe.src = url404;
	iframe.style.display = 'none';
	iframe.onload = function(ev){
		var fd = iframe.contentWindow.document;
		var fb = fd.getElementsByTagName('body')[0];
		var fs = fd.createElement('script');
		fs.innerHTML = 'var onchange = function(ev){document.getElementById("iframe").contentWindow.postMessage(\'changed\',\'chrome-extension://giompennnhheakjcnobejbnjgbbkmdnd\')};'+'window.addEventListener("storage", onchange, false);';
        
		fb.appendChild(fs);
		var ff = fd.createElement('iframe');
		ff.id = 'iframe';
		ff.src = 'chrome-extension://giompennnhheakjcnobejbnjgbbkmdnd/notification.html';
		fb.appendChild(ff);
	}
	body.appendChild(iframe);		
	inited = true;
};

var dump = function(){
	var result = {};
	for(var i=0,l=store.length;i<l;i++){
		var key = store.key(i);
		var value = store.getItem(key);
		result[key] = value;
	}
	return result;
};

var refresh = function(){
	chrome.runtime.sendMessage({source:'content',event:'sync',data:dump()});
};

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	if(message.source === 'popup'){
		if(message.event === 'onload'){
			if(!inited){
				init();                
			}
		}else if(message.event  === 'pull'){
			sendResponse(dump());
		}else if(message.event  === 'clear'){
			store.clear();
			sendResponse(dump());
		}else if(message.event  === 'remove'){
			store.removeItem(message.data.key);
			sendResponse(dump());
		}else if(message.event  === 'add'){
			store.setItem(message.data.key,message.data.value);
			sendResponse(dump());
		}else if(message.event  === 'dump'){
			console.log('HTML5 LocalStorage Manager dump JSON of key \''+message.data.key+'\' :');
			console.dir(JSON.parse(message.data.value));
		}
	}else if(message.source === 'background'){
		if(message.event === 'init'){
			sendResponse(localStorage.length);
		}else if(message.event === 'refresh'){
			refresh();
		}
	}
});
