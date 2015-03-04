/*Object.defineProperty(localStorage, "setItem", { writable: true });
localStorage._setItem=localStorage.setItem;
localStorage.setItem= function(key,value)
{ localStorage._setItem(key,value+"MY_CUSTOM");
};
*/

Storage.prototype._setItem = Storage.prototype.setItem; Storage.prototype.setItem = function(key, value) 

          {  this._setItem(key, "value Prefix"+value); };

          Storage.prototype._getItem = Storage.prototype.getItem;

          Storage.prototype.getItem = function(key) 
          {
        return this._getItem("prefix" + key);
          };