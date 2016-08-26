(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["createIt"] = factory();
	else
		root["createIt"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.map = exports.compose = exports.merge = exports.concat = exports.filter = exports.createMiddleware = exports.autoAppend = exports.createIt = undefined;
	
	var _createIt2 = __webpack_require__(1);
	
	var _createIt3 = _interopRequireDefault(_createIt2);
	
	var _autoAppend2 = __webpack_require__(2);
	
	var _autoAppend3 = _interopRequireDefault(_autoAppend2);
	
	var _createMiddleware2 = __webpack_require__(3);
	
	var _createMiddleware3 = _interopRequireDefault(_createMiddleware2);
	
	var _filter2 = __webpack_require__(4);
	
	var _filter3 = _interopRequireDefault(_filter2);
	
	var _concat2 = __webpack_require__(5);
	
	var _concat3 = _interopRequireDefault(_concat2);
	
	var _merge2 = __webpack_require__(6);
	
	var _merge3 = _interopRequireDefault(_merge2);
	
	var _compose2 = __webpack_require__(7);
	
	var _compose3 = _interopRequireDefault(_compose2);
	
	var _map2 = __webpack_require__(8);
	
	var _map3 = _interopRequireDefault(_map2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createIt = exports.createIt = _createIt3.default;
	var autoAppend = exports.autoAppend = _autoAppend3.default;
	var createMiddleware = exports.createMiddleware = _createMiddleware3.default;
	var filter = exports.filter = _filter3.default;
	var concat = exports.concat = _concat3.default;
	var merge = exports.merge = _merge3.default;
	var compose = exports.compose = _compose3.default;
	var map = exports.map = _map3.default;
	
	exports.default = createIt;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * defaultCtor to pass to create factory
	 * 
	 * @param {Function} factory
	 * @param {Array} dependencies
	 */
	var defaultCtor = exports.defaultCtor = function defaultCtor(factory, dependencies) {
	  return factory.apply(undefined, _toConsumableArray(dependencies));
	};
	
	/**
	 * create function is a factory produces a pure DI container to instantiate actual components with it.
	 * 
	 * @example
	 * import { create } from 'create-it';
	 * import { app, mainContent, sideBar } from 'factories';
	 * import { Paragraph, Menu } from 'components';
	 * 
	 * const create = createIt();
	 * 
	 * const MainContent = create({ Paragraph })(mainContent);
	 * const SideBar = create({ Menu })(sideBar);
	 * const App = create({ SideBar, MainContent })(app);
	 * 
	 * @param {Array} middlewares: 
	 * @param {any} { resolver = defaultresolver }
	 * @returns Function
	 */
	var createIt = function createIt() {
	  var middlewares = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  var _ref$ctor = _ref.ctor;
	  var ctor = _ref$ctor === undefined ? defaultCtor : _ref$ctor;
	
	  return function () {
	    for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
	      dependencies[_key] = arguments[_key];
	    }
	
	    return function (originalFactory) {
	      return ctor(middlewares.reduce(function (actualFactory, middleware) {
	        return middleware(actualFactory, originalFactory, ctor);
	      }, originalFactory), dependencies);
	    };
	  };
	};
	
	exports.default = createIt;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 
	 * 
	 * @param {any} appendix
	 * @returns
	 */
	var autoAppend = function autoAppend() {
	  for (var _len = arguments.length, appendix = Array(_len), _key = 0; _key < _len; _key++) {
	    appendix[_key] = arguments[_key];
	  }
	
	  return function (factory, _, ctor) {
	    return function () {
	      for (var _len2 = arguments.length, dependencies = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        dependencies[_key2] = arguments[_key2];
	      }
	
	      return ctor(factory, [].concat(dependencies, appendix));
	    };
	  };
	};
	
	exports.default = autoAppend;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 
	 * 
	 * @param {any} func
	 * @returns
	 */
	var createMiddleware = function createMiddleware(func) {
	  return function (factory, _, ctor) {
	    return function () {
	      for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
	        dependencies[_key] = arguments[_key];
	      }
	
	      var component = ctor(factory, dependencies);
	      return func(component) || component;
	    };
	  };
	};
	
	exports.default = createMiddleware;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var filter = function filter(condition) {
	  return function (middleware) {
	    return function (factory, originalFactory) {
	      for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        rest[_key - 2] = arguments[_key];
	      }
	
	      return condition(originalFactory) ? middleware.apply(undefined, [factory, originalFactory].concat(rest)) : factory;
	    };
	  };
	};
	
	exports.default = filter;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var concat = function concat() {
	  var actualDependencies = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  var _ref$isAppending = _ref.isAppending;
	  var isAppending = _ref$isAppending === undefined ? true : _ref$isAppending;
	  return function (create) {
	    var calculateDependencies = function calculateDependencies(dependencies) {
	      return isAppending ? [].concat(_toConsumableArray(actualDependencies), _toConsumableArray(dependencies)) : [].concat(_toConsumableArray(dependencies), _toConsumableArray(actualDependencies));
	    };
	
	    return function () {
	      for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
	        dependencies[_key] = arguments[_key];
	      }
	
	      return create.apply(undefined, _toConsumableArray(calculateDependencies(dependencies)));
	    };
	  };
	};
	
	exports.default = concat;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var merge = function merge() {
	  for (var _len = arguments.length, actualDependencies = Array(_len), _key = 0; _key < _len; _key++) {
	    actualDependencies[_key] = arguments[_key];
	  }
	
	  return function (create) {
	    return function () {
	      for (var _len2 = arguments.length, dependencies = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        dependencies[_key2] = arguments[_key2];
	      }
	
	      var depsSize = Math.max(actualDependencies.length, dependencies.length);
	      var deps = Array(depsSize).fill({});
	
	      return create.apply(undefined, _toConsumableArray(deps.map(function (_, index) {
	        return _extends({}, actualDependencies[index] || {}, dependencies[index] || {});
	      })));
	    };
	  };
	};
	
	exports.default = merge;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var compose = function compose() {
	  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
	    functions[_key] = arguments[_key];
	  }
	
	  if (functions.length === 0) {
	    return function (x) {
	      return x;
	    };
	  }
	
	  if (functions.length === 1) {
	    return functions[0];
	  }
	
	  var lastFunction = functions[functions.length - 1];
	  var restFunctions = functions.slice(0, -1);
	
	  return function () {
	    return restFunctions.reduceRight(function (previousValue, currentValue) {
	      return currentValue(previousValue);
	    }, lastFunction.apply(undefined, arguments));
	  };
	};
	
	exports.default = compose;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var map = function map(fn) {
	  return function (create) {
	    return function () {
	      for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
	        dependencies[_key] = arguments[_key];
	      }
	
	      return create.apply(undefined, _toConsumableArray(dependencies.map(function (dependency) {
	        return fn(dependency);
	      })));
	    };
	  };
	};
	
	exports.default = map;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjNDAzNTc2ZDYxNDU0YTA0YjI0MiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NyZWF0ZUl0LmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9hdXRvQXBwZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9jcmVhdGVNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLEtBQU0sZ0RBQU47QUFDQSxLQUFNLHNEQUFOO0FBQ0EsS0FBTSx3RUFBTjtBQUNBLEtBQU0sMENBQU47QUFDQSxLQUFNLDBDQUFOO0FBQ0EsS0FBTSx1Q0FBTjtBQUNBLEtBQU0sNkNBQU47QUFDQSxLQUFNLGlDQUFOOzttQkFFUSxROzs7Ozs7Ozs7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QVk7QUFDOUIsWUFBTyxZQUFxQjtBQUFBLHlDQUFqQixZQUFpQjtBQUFqQixxQkFBaUI7QUFBQTs7QUFDMUIsY0FBTywyQ0FBVSxhQUFhLEdBQWIsQ0FBaUI7QUFBQSxnQkFBYyxHQUFHLFVBQUgsQ0FBZDtBQUFBLFFBQWpCLENBQVYsRUFBUDtBQUNELE1BRkQ7QUFHRCxJQUpXO0FBQUEsRUFBWjs7bUJBTWUsRyIsImZpbGUiOiJjcmVhdGVJdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImNyZWF0ZUl0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImNyZWF0ZUl0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjNDAzNTc2ZDYxNDU0YTA0YjI0MlxuICoqLyIsImltcG9ydCBfY3JlYXRlSXQgZnJvbSAnLi9jcmVhdGVJdCc7XHJcbmltcG9ydCBfYXV0b0FwcGVuZCBmcm9tICcuL21pZGRsZXdhcmVzL2F1dG9BcHBlbmQnO1xyXG5pbXBvcnQgX2NyZWF0ZU1pZGRsZXdhcmUgZnJvbSAnLi9taWRkbGV3YXJlcy9jcmVhdGVNaWRkbGV3YXJlJztcclxuaW1wb3J0IF9maWx0ZXIgZnJvbSAnLi9taWRkbGV3YXJlcy9maWx0ZXInO1xyXG5pbXBvcnQgX2NvbmNhdCBmcm9tICcuL2NvbmNhdCc7XHJcbmltcG9ydCBfbWVyZ2UgZnJvbSAnLi9tZXJnZSc7XHJcbmltcG9ydCBfY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xyXG5pbXBvcnQgX21hcCBmcm9tICcuL21hcCc7XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlSXQgPSBfY3JlYXRlSXQ7XHJcbmV4cG9ydCBjb25zdCBhdXRvQXBwZW5kID0gX2F1dG9BcHBlbmQ7XHJcbmV4cG9ydCBjb25zdCBjcmVhdGVNaWRkbGV3YXJlID0gX2NyZWF0ZU1pZGRsZXdhcmU7XHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBfZmlsdGVyO1xyXG5leHBvcnQgY29uc3QgY29uY2F0ID0gX2NvbmNhdDtcclxuZXhwb3J0IGNvbnN0IG1lcmdlID0gX21lcmdlO1xyXG5leHBvcnQgY29uc3QgY29tcG9zZSA9IF9jb21wb3NlO1xyXG5leHBvcnQgY29uc3QgbWFwID0gX21hcDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUl0O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIi8qKlxyXG4gKiBkZWZhdWx0Q3RvciB0byBwYXNzIHRvIGNyZWF0ZSBmYWN0b3J5XHJcbiAqIFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmYWN0b3J5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRlcGVuZGVuY2llc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDdG9yID0gKGZhY3RvcnksIGRlcGVuZGVuY2llcykgPT4gZmFjdG9yeSguLi5kZXBlbmRlbmNpZXMpO1xyXG5cclxuLyoqXHJcbiAqIGNyZWF0ZSBmdW5jdGlvbiBpcyBhIGZhY3RvcnkgcHJvZHVjZXMgYSBwdXJlIERJIGNvbnRhaW5lciB0byBpbnN0YW50aWF0ZSBhY3R1YWwgY29tcG9uZW50cyB3aXRoIGl0LlxyXG4gKiBcclxuICogQGV4YW1wbGVcclxuICogaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnY3JlYXRlLWl0JztcclxuICogaW1wb3J0IHsgYXBwLCBtYWluQ29udGVudCwgc2lkZUJhciB9IGZyb20gJ2ZhY3Rvcmllcyc7XHJcbiAqIGltcG9ydCB7IFBhcmFncmFwaCwgTWVudSB9IGZyb20gJ2NvbXBvbmVudHMnO1xyXG4gKiBcclxuICogY29uc3QgY3JlYXRlID0gY3JlYXRlSXQoKTtcclxuICogXHJcbiAqIGNvbnN0IE1haW5Db250ZW50ID0gY3JlYXRlKHsgUGFyYWdyYXBoIH0pKG1haW5Db250ZW50KTtcclxuICogY29uc3QgU2lkZUJhciA9IGNyZWF0ZSh7IE1lbnUgfSkoc2lkZUJhcik7XHJcbiAqIGNvbnN0IEFwcCA9IGNyZWF0ZSh7IFNpZGVCYXIsIE1haW5Db250ZW50IH0pKGFwcCk7XHJcbiAqIFxyXG4gKiBAcGFyYW0ge0FycmF5fSBtaWRkbGV3YXJlczogXHJcbiAqIEBwYXJhbSB7YW55fSB7IHJlc29sdmVyID0gZGVmYXVsdHJlc29sdmVyIH1cclxuICogQHJldHVybnMgRnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGNyZWF0ZUl0ID0gKG1pZGRsZXdhcmVzID0gW10sIHsgY3RvciA9IGRlZmF1bHRDdG9yIH0gPSB7fSkgPT4ge1xyXG4gIHJldHVybiAoLi4uZGVwZW5kZW5jaWVzKSA9PiAob3JpZ2luYWxGYWN0b3J5KSA9PiBjdG9yKG1pZGRsZXdhcmVzLnJlZHVjZShcclxuICAgIChhY3R1YWxGYWN0b3J5LCBtaWRkbGV3YXJlKSA9PiBtaWRkbGV3YXJlKGFjdHVhbEZhY3RvcnksIG9yaWdpbmFsRmFjdG9yeSwgY3RvciksIFxyXG4gICAgb3JpZ2luYWxGYWN0b3J5XHJcbiAgKSwgZGVwZW5kZW5jaWVzKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUl0OyAgXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY3JlYXRlSXQuanNcbiAqKi8iLCIvKipcclxuICogXHJcbiAqIFxyXG4gKiBAcGFyYW0ge2FueX0gYXBwZW5kaXhcclxuICogQHJldHVybnNcclxuICovXHJcbmNvbnN0IGF1dG9BcHBlbmQgPSAoLi4uYXBwZW5kaXgpID0+IHtcclxuICByZXR1cm4gKGZhY3RvcnksIF8sIGN0b3IpID0+ICguLi5kZXBlbmRlbmNpZXMpID0+IGN0b3IoZmFjdG9yeSwgWy4uLmRlcGVuZGVuY2llcywgLi4uYXBwZW5kaXhdKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF1dG9BcHBlbmQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlkZGxld2FyZXMvYXV0b0FwcGVuZC5qc1xuICoqLyIsIi8qKlxyXG4gKiBcclxuICogXHJcbiAqIEBwYXJhbSB7YW55fSBmdW5jXHJcbiAqIEByZXR1cm5zXHJcbiAqL1xyXG5jb25zdCBjcmVhdGVNaWRkbGV3YXJlID0gKGZ1bmMpID0+IHtcclxuICByZXR1cm4gKGZhY3RvcnksIF8sIGN0b3IpID0+ICguLi5kZXBlbmRlbmNpZXMpID0+IHtcclxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGN0b3IoZmFjdG9yeSwgZGVwZW5kZW5jaWVzKTtcclxuICAgIHJldHVybiBmdW5jKGNvbXBvbmVudCkgfHwgY29tcG9uZW50O1xyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVNaWRkbGV3YXJlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pZGRsZXdhcmVzL2NyZWF0ZU1pZGRsZXdhcmUuanNcbiAqKi8iLCJjb25zdCBmaWx0ZXIgPSAoY29uZGl0aW9uKSA9PiAobWlkZGxld2FyZSkgPT4ge1xyXG4gIHJldHVybiAoZmFjdG9yeSwgb3JpZ2luYWxGYWN0b3J5LCAuLi5yZXN0KSA9PiB7XHJcbiAgICByZXR1cm4gY29uZGl0aW9uKG9yaWdpbmFsRmFjdG9yeSlcclxuICAgICAgPyBtaWRkbGV3YXJlKGZhY3RvcnksIG9yaWdpbmFsRmFjdG9yeSwgLi4ucmVzdClcclxuICAgICAgOiBmYWN0b3J5O1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZpbHRlcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taWRkbGV3YXJlcy9maWx0ZXIuanNcbiAqKi8iLCJjb25zdCBjb25jYXQgPSAoYWN0dWFsRGVwZW5kZW5jaWVzID0gW10sIHsgaXNBcHBlbmRpbmcgPSB0cnVlIH0gPSB7fSkgPT4gKGNyZWF0ZSkgPT4ge1xyXG4gIGNvbnN0IGNhbGN1bGF0ZURlcGVuZGVuY2llcyA9IChkZXBlbmRlbmNpZXMpID0+IFxyXG4gICAgICBpc0FwcGVuZGluZyBcclxuICAgICAgICA/IFsgLi4uYWN0dWFsRGVwZW5kZW5jaWVzLCAuLi5kZXBlbmRlbmNpZXMgXVxyXG4gICAgICAgIDogWyAuLi5kZXBlbmRlbmNpZXMsIC4uLmFjdHVhbERlcGVuZGVuY2llcyBdO1xyXG5cclxuICByZXR1cm4gKC4uLmRlcGVuZGVuY2llcykgPT4gY3JlYXRlKFxyXG4gICAgLi4uY2FsY3VsYXRlRGVwZW5kZW5jaWVzKGRlcGVuZGVuY2llcylcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29uY2F0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbmNhdC5qc1xuICoqLyIsImNvbnN0IG1lcmdlID0gKC4uLmFjdHVhbERlcGVuZGVuY2llcykgPT4gKGNyZWF0ZSkgPT4ge1xyXG4gIHJldHVybiAoLi4uZGVwZW5kZW5jaWVzKSA9PiB7XHJcbiAgICBjb25zdCBkZXBzU2l6ZSA9IE1hdGgubWF4KGFjdHVhbERlcGVuZGVuY2llcy5sZW5ndGgsIGRlcGVuZGVuY2llcy5sZW5ndGgpO1xyXG4gICAgY29uc3QgZGVwcyA9IEFycmF5KGRlcHNTaXplKS5maWxsKHt9KTtcclxuXHJcbiAgICByZXR1cm4gY3JlYXRlKC4uLmRlcHMubWFwKChfLCBpbmRleCkgPT4gKHtcclxuICAgICAgLi4uKGFjdHVhbERlcGVuZGVuY2llc1tpbmRleF0gfHwge30pLFxyXG4gICAgICAuLi4oZGVwZW5kZW5jaWVzW2luZGV4XSB8fCB7fSlcclxuICAgIH0pKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVyZ2U7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWVyZ2UuanNcbiAqKi8iLCJjb25zdCBjb21wb3NlID0gKC4uLmZ1bmN0aW9ucykgPT4ge1xyXG4gIGlmIChmdW5jdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4geCA9PiB4O1xyXG4gIH1cclxuXHJcbiAgaWYgKGZ1bmN0aW9ucy5sZW5ndGggPT09IDEpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbnNbMF07XHJcbiAgfVxyXG5cclxuICBjb25zdCBsYXN0RnVuY3Rpb24gPSBmdW5jdGlvbnNbZnVuY3Rpb25zLmxlbmd0aCAtIDFdO1xyXG4gIGNvbnN0IHJlc3RGdW5jdGlvbnMgPSBmdW5jdGlvbnMuc2xpY2UoMCwgLTEpO1xyXG5cclxuICByZXR1cm4gKC4uLmFyZ3MpID0+IHJlc3RGdW5jdGlvbnMucmVkdWNlUmlnaHQoXHJcbiAgICAocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiBcclxuICAgICAgY3VycmVudFZhbHVlKHByZXZpb3VzVmFsdWUpLCBsYXN0RnVuY3Rpb24oLi4uYXJncykpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb21wb3NlLmpzXG4gKiovIiwiY29uc3QgbWFwID0gKGZuKSA9PiAoY3JlYXRlKSA9PiB7XHJcbiAgcmV0dXJuICguLi5kZXBlbmRlbmNpZXMpID0+IHtcclxuICAgIHJldHVybiBjcmVhdGUoLi4uZGVwZW5kZW5jaWVzLm1hcChkZXBlbmRlbmN5ID0+IGZuKGRlcGVuZGVuY3kpKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFwO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYXAuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9