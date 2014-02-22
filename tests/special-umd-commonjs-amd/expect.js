var define = function (deps, callback) {callback(require, module, require("./a"), require("./b"), require("./c"))};
;(function(){
(function() {
if(typeof define !== 'function') {
  // NodeJS -> AMD
  if(typeof module === 'object' && module.exports) {
    var nodeJS = true;
    define = function(ids, factory) {
      factory(require, module);
    };
  }
  // <script>
  else {
    if(typeof test === 'undefined') {
      test = {foo: 'bar'};
    }
    return;
  }
}
// AMD
var deps;
var defineFunc = function(require, module) {
  module.exports = function(test) {
    var mods = deps.map(function(dep) {
      return require(dep);
    });
    // handle circular dependencies
    test = test || {};
    test.defined = test.defined || {};
    if(test.defined[name]) {
      return test[name];
    }
    test.defined[name] = true;
    for(var i = 0; i < mods.length; ++i) {
      mods[i](test);
    }
    return test;
  };
  module.exports.foo = 'bar';
  module.exports(module.exports);
};
var tmpDefine = define;
define = function(ids, factory) {
  deps = (typeof ids === 'string') ? factory.slice(2) : ids.slice(2);
  if(nodeJS) {
    delete define;
    return tmpDefine.apply(null, Array.prototype.slice.call(arguments, 0));
  }
  define = tmpDefine;
  return define.apply(null, Array.prototype.slice.call(arguments, 0));
};
define([
  'require',
  'module',
  './a',
  './b',
  './c',
], function() {
  defineFunc.apply(null, Array.prototype.slice.call(arguments, 0));
});
})();

}.call(window));