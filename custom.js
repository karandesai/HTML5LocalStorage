
Storage.prototype.new_setItem = Storage.prototype.setItem; 
Storage.prototype.setItem = function (key,value) 
{  
          this.new_setItem(key,sjcl.encrypt(document.cookie,value));
          //this.new_setItem(key,value+"TEST");
          console.log("SET"+this);
        
};

/*
Storage.prototype.new_getItem = Storage.prototype.getItem;
Storage.prototype.getItem = function(key) 
{
        console.log("GET CALLED:"+key);          
        this.new_getItem(key);
};
*/


Storage.prototype.new_getItem = Storage.prototype.getItem;
Object.defineProperty(localStorage, "getItem", {
  __proto__: null,
  enumerable: false,
  configurable: false,
  writable: false,
  value: function(key){
    console.log("GET CALLED:"+key); 
    return sjcl.decrypt(document.cookie,this.new_getItem(key));
  }    
});


//var closure_one = window.localStorage.new_getItem('nukK');
//var closure_orne = window.localStorage.getItem('nukK');
//var closure_onew = new_getItem('sdad');
