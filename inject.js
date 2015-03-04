

var s2 = document.createElement('script');
s2.src = chrome.extension.getURL("lib/sjcl/sjcl.js");
(document.head||document.documentElement).appendChild(s2);



var s = document.createElement('script');
s.src = chrome.extension.getURL("custom.js");
(document.head||document.documentElement).appendChild(s);
//var two=s.onload();