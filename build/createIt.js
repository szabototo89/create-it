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
	exports.compose = exports.merge = exports.concat = exports.filter = exports.createMiddleware = exports.autoAppend = exports.createIt = undefined;
	
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createIt = exports.createIt = _createIt3.default;
	var autoAppend = exports.autoAppend = _autoAppend3.default;
	var createMiddleware = exports.createMiddleware = _createMiddleware3.default;
	var filter = exports.filter = _filter3.default;
	var concat = exports.concat = _concat3.default;
	var merge = exports.merge = _merge3.default;
	var compose = exports.compose = _compose3.default;
	
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzZDYxMjI2OWI4NmZhZTllODM1YiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NyZWF0ZUl0LmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9hdXRvQXBwZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9jcmVhdGVNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sS0FBTSxnREFBTjtBQUNBLEtBQU0sc0RBQU47QUFDQSxLQUFNLHdFQUFOO0FBQ0EsS0FBTSwwQ0FBTjtBQUNBLEtBQU0sMENBQU47QUFDQSxLQUFNLHVDQUFOO0FBQ0EsS0FBTSw2Q0FBTjs7bUJBRVEsUTs7Ozs7Ozs7Ozs7Ozs7QUNoQmY7Ozs7OztBQU1PLEtBQU0sb0NBQWMsU0FBZCxXQUFjLENBQUMsT0FBRCxFQUFVLFlBQVY7QUFBQSxVQUEyQiw0Q0FBVyxZQUFYLEVBQTNCO0FBQUEsRUFBcEI7O0FBRVA7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxLQUFNLFdBQVcsU0FBWCxRQUFXLEdBQW1EO0FBQUEsT0FBbEQsV0FBa0QseURBQXBDLEVBQW9DOztBQUFBLG9FQUFQLEVBQU87O0FBQUEsd0JBQTlCLElBQThCO0FBQUEsT0FBOUIsSUFBOEIsNkJBQXZCLFdBQXVCOztBQUNsRSxVQUFPO0FBQUEsdUNBQUksWUFBSjtBQUFJLG1CQUFKO0FBQUE7O0FBQUEsWUFBcUIsVUFBQyxlQUFEO0FBQUEsY0FBcUIsS0FBSyxZQUFZLE1BQVosQ0FDcEQsVUFBQyxhQUFELEVBQWdCLFVBQWhCO0FBQUEsZ0JBQStCLFdBQVcsYUFBWCxFQUEwQixlQUExQixFQUEyQyxJQUEzQyxDQUEvQjtBQUFBLFFBRG9ELEVBRXBELGVBRm9ELENBQUwsRUFHOUMsWUFIOEMsQ0FBckI7QUFBQSxNQUFyQjtBQUFBLElBQVA7QUFJRCxFQUxEOzttQkFPZSxROzs7Ozs7Ozs7OztBQ2pDZjs7Ozs7O0FBTUEsS0FBTSxhQUFhLFNBQWIsVUFBYSxHQUFpQjtBQUFBLHFDQUFiLFFBQWE7QUFBYixhQUFhO0FBQUE7O0FBQ2xDLFVBQU8sVUFBQyxPQUFELEVBQVUsQ0FBVixFQUFhLElBQWI7QUFBQSxZQUFzQjtBQUFBLDBDQUFJLFlBQUo7QUFBSSxxQkFBSjtBQUFBOztBQUFBLGNBQXFCLEtBQUssT0FBTCxZQUFrQixZQUFsQixFQUFtQyxRQUFuQyxFQUFyQjtBQUFBLE1BQXRCO0FBQUEsSUFBUDtBQUNELEVBRkQ7O21CQUllLFU7Ozs7Ozs7Ozs7O0FDVmY7Ozs7OztBQU1BLEtBQU0sbUJBQW1CLFNBQW5CLGdCQUFtQixDQUFDLElBQUQsRUFBVTtBQUNqQyxVQUFPLFVBQUMsT0FBRCxFQUFVLENBQVYsRUFBYSxJQUFiO0FBQUEsWUFBc0IsWUFBcUI7QUFBQSx5Q0FBakIsWUFBaUI7QUFBakIscUJBQWlCO0FBQUE7O0FBQ2hELFdBQU0sWUFBWSxLQUFLLE9BQUwsRUFBYyxZQUFkLENBQWxCO0FBQ0EsY0FBTyxLQUFLLFNBQUwsS0FBbUIsU0FBMUI7QUFDRCxNQUhNO0FBQUEsSUFBUDtBQUlELEVBTEQ7O21CQU9lLGdCOzs7Ozs7Ozs7OztBQ2JmLEtBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxTQUFEO0FBQUEsVUFBZSxVQUFDLFVBQUQsRUFBZ0I7QUFDNUMsWUFBTyxVQUFDLE9BQUQsRUFBVSxlQUFWLEVBQXVDO0FBQUEseUNBQVQsSUFBUztBQUFULGFBQVM7QUFBQTs7QUFDNUMsY0FBTyxVQUFVLGVBQVYsSUFDSCw2QkFBVyxPQUFYLEVBQW9CLGVBQXBCLFNBQXdDLElBQXhDLEVBREcsR0FFSCxPQUZKO0FBR0QsTUFKRDtBQUtELElBTmM7QUFBQSxFQUFmOzttQkFRZSxNOzs7Ozs7Ozs7Ozs7OztBQ1JmLEtBQU0sU0FBUyxTQUFULE1BQVM7QUFBQSxPQUFDLGtCQUFELHlEQUFzQixFQUF0Qjs7QUFBQSxvRUFBbUQsRUFBbkQ7O0FBQUEsK0JBQTRCLFdBQTVCO0FBQUEsT0FBNEIsV0FBNUIsb0NBQTBDLElBQTFDO0FBQUEsVUFBMEQsVUFBQyxNQUFELEVBQVk7QUFDbkYsU0FBTSx3QkFBd0IsU0FBeEIscUJBQXdCLENBQUMsWUFBRDtBQUFBLGNBQzFCLDJDQUNTLGtCQURULHNCQUNnQyxZQURoQyxrQ0FFUyxZQUZULHNCQUUwQixrQkFGMUIsRUFEMEI7QUFBQSxNQUE5Qjs7QUFLQSxZQUFPO0FBQUEseUNBQUksWUFBSjtBQUFJLHFCQUFKO0FBQUE7O0FBQUEsY0FBcUIsMkNBQ3ZCLHNCQUFzQixZQUF0QixDQUR1QixFQUFyQjtBQUFBLE1BQVA7QUFHRCxJQVRjO0FBQUEsRUFBZjs7bUJBV2UsTTs7Ozs7Ozs7Ozs7Ozs7OztBQ1hmLEtBQU0sUUFBUSxTQUFSLEtBQVE7QUFBQSxxQ0FBSSxrQkFBSjtBQUFJLHVCQUFKO0FBQUE7O0FBQUEsVUFBMkIsVUFBQyxNQUFELEVBQVk7QUFDbkQsWUFBTyxZQUFxQjtBQUFBLDBDQUFqQixZQUFpQjtBQUFqQixxQkFBaUI7QUFBQTs7QUFDMUIsV0FBTSxXQUFXLEtBQUssR0FBTCxDQUFTLG1CQUFtQixNQUE1QixFQUFvQyxhQUFhLE1BQWpELENBQWpCO0FBQ0EsV0FBTSxPQUFPLE1BQU0sUUFBTixFQUFnQixJQUFoQixDQUFxQixFQUFyQixDQUFiOztBQUVBLGNBQU8sMkNBQVUsS0FBSyxHQUFMLENBQVMsVUFBQyxDQUFELEVBQUksS0FBSjtBQUFBLDZCQUNwQixtQkFBbUIsS0FBbkIsS0FBNkIsRUFEVCxFQUVwQixhQUFhLEtBQWIsS0FBdUIsRUFGSDtBQUFBLFFBQVQsQ0FBVixFQUFQO0FBSUQsTUFSRDtBQVNELElBVmE7QUFBQSxFQUFkOzttQkFZZSxLOzs7Ozs7Ozs7OztBQ1pmLEtBQU0sVUFBVSxTQUFWLE9BQVUsR0FBa0I7QUFBQSxxQ0FBZCxTQUFjO0FBQWQsY0FBYztBQUFBOztBQUNoQyxPQUFJLFVBQVUsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixZQUFPO0FBQUEsY0FBSyxDQUFMO0FBQUEsTUFBUDtBQUNEOztBQUVELE9BQUksVUFBVSxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFlBQU8sVUFBVSxDQUFWLENBQVA7QUFDRDs7QUFFRCxPQUFNLGVBQWUsVUFBVSxVQUFVLE1BQVYsR0FBbUIsQ0FBN0IsQ0FBckI7QUFDQSxPQUFNLGdCQUFnQixVQUFVLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBQyxDQUFwQixDQUF0Qjs7QUFFQSxVQUFPO0FBQUEsWUFBYSxjQUFjLFdBQWQsQ0FDbEIsVUFBQyxhQUFELEVBQWdCLFlBQWhCO0FBQUEsY0FDRSxhQUFhLGFBQWIsQ0FERjtBQUFBLE1BRGtCLEVBRWEsd0NBRmIsQ0FBYjtBQUFBLElBQVA7QUFHRCxFQWZEOzttQkFpQmUsTyIsImZpbGUiOiJjcmVhdGVJdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImNyZWF0ZUl0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImNyZWF0ZUl0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzZDYxMjI2OWI4NmZhZTllODM1YlxuICoqLyIsImltcG9ydCBfY3JlYXRlSXQgZnJvbSAnLi9jcmVhdGVJdCc7XHJcbmltcG9ydCBfYXV0b0FwcGVuZCBmcm9tICcuL21pZGRsZXdhcmVzL2F1dG9BcHBlbmQnO1xyXG5pbXBvcnQgX2NyZWF0ZU1pZGRsZXdhcmUgZnJvbSAnLi9taWRkbGV3YXJlcy9jcmVhdGVNaWRkbGV3YXJlJztcclxuaW1wb3J0IF9maWx0ZXIgZnJvbSAnLi9taWRkbGV3YXJlcy9maWx0ZXInO1xyXG5pbXBvcnQgX2NvbmNhdCBmcm9tICcuL2NvbmNhdCc7XHJcbmltcG9ydCBfbWVyZ2UgZnJvbSAnLi9tZXJnZSc7XHJcbmltcG9ydCBfY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUl0ID0gX2NyZWF0ZUl0O1xyXG5leHBvcnQgY29uc3QgYXV0b0FwcGVuZCA9IF9hdXRvQXBwZW5kO1xyXG5leHBvcnQgY29uc3QgY3JlYXRlTWlkZGxld2FyZSA9IF9jcmVhdGVNaWRkbGV3YXJlO1xyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gX2ZpbHRlcjtcclxuZXhwb3J0IGNvbnN0IGNvbmNhdCA9IF9jb25jYXQ7XHJcbmV4cG9ydCBjb25zdCBtZXJnZSA9IF9tZXJnZTtcclxuZXhwb3J0IGNvbnN0IGNvbXBvc2UgPSBfY29tcG9zZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUl0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiLyoqXHJcbiAqIGRlZmF1bHRDdG9yIHRvIHBhc3MgdG8gY3JlYXRlIGZhY3RvcnlcclxuICogXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZhY3RvcnlcclxuICogQHBhcmFtIHtBcnJheX0gZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdEN0b3IgPSAoZmFjdG9yeSwgZGVwZW5kZW5jaWVzKSA9PiBmYWN0b3J5KC4uLmRlcGVuZGVuY2llcyk7XHJcblxyXG4vKipcclxuICogY3JlYXRlIGZ1bmN0aW9uIGlzIGEgZmFjdG9yeSBwcm9kdWNlcyBhIHB1cmUgREkgY29udGFpbmVyIHRvIGluc3RhbnRpYXRlIGFjdHVhbCBjb21wb25lbnRzIHdpdGggaXQuXHJcbiAqIFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBpbXBvcnQgeyBjcmVhdGUgfSBmcm9tICdjcmVhdGUtaXQnO1xyXG4gKiBpbXBvcnQgeyBhcHAsIG1haW5Db250ZW50LCBzaWRlQmFyIH0gZnJvbSAnZmFjdG9yaWVzJztcclxuICogaW1wb3J0IHsgUGFyYWdyYXBoLCBNZW51IH0gZnJvbSAnY29tcG9uZW50cyc7XHJcbiAqIFxyXG4gKiBjb25zdCBjcmVhdGUgPSBjcmVhdGVJdCgpO1xyXG4gKiBcclxuICogY29uc3QgTWFpbkNvbnRlbnQgPSBjcmVhdGUoeyBQYXJhZ3JhcGggfSkobWFpbkNvbnRlbnQpO1xyXG4gKiBjb25zdCBTaWRlQmFyID0gY3JlYXRlKHsgTWVudSB9KShzaWRlQmFyKTtcclxuICogY29uc3QgQXBwID0gY3JlYXRlKHsgU2lkZUJhciwgTWFpbkNvbnRlbnQgfSkoYXBwKTtcclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXl9IG1pZGRsZXdhcmVzOiBcclxuICogQHBhcmFtIHthbnl9IHsgcmVzb2x2ZXIgPSBkZWZhdWx0cmVzb2x2ZXIgfVxyXG4gKiBAcmV0dXJucyBGdW5jdGlvblxyXG4gKi9cclxuY29uc3QgY3JlYXRlSXQgPSAobWlkZGxld2FyZXMgPSBbXSwgeyBjdG9yID0gZGVmYXVsdEN0b3IgfSA9IHt9KSA9PiB7XHJcbiAgcmV0dXJuICguLi5kZXBlbmRlbmNpZXMpID0+IChvcmlnaW5hbEZhY3RvcnkpID0+IGN0b3IobWlkZGxld2FyZXMucmVkdWNlKFxyXG4gICAgKGFjdHVhbEZhY3RvcnksIG1pZGRsZXdhcmUpID0+IG1pZGRsZXdhcmUoYWN0dWFsRmFjdG9yeSwgb3JpZ2luYWxGYWN0b3J5LCBjdG9yKSwgXHJcbiAgICBvcmlnaW5hbEZhY3RvcnlcclxuICApLCBkZXBlbmRlbmNpZXMpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSXQ7ICBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jcmVhdGVJdC5qc1xuICoqLyIsIi8qKlxyXG4gKiBcclxuICogXHJcbiAqIEBwYXJhbSB7YW55fSBhcHBlbmRpeFxyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuY29uc3QgYXV0b0FwcGVuZCA9ICguLi5hcHBlbmRpeCkgPT4ge1xyXG4gIHJldHVybiAoZmFjdG9yeSwgXywgY3RvcikgPT4gKC4uLmRlcGVuZGVuY2llcykgPT4gY3RvcihmYWN0b3J5LCBbLi4uZGVwZW5kZW5jaWVzLCAuLi5hcHBlbmRpeF0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXV0b0FwcGVuZDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taWRkbGV3YXJlcy9hdXRvQXBwZW5kLmpzXG4gKiovIiwiLyoqXHJcbiAqIFxyXG4gKiBcclxuICogQHBhcmFtIHthbnl9IGZ1bmNcclxuICogQHJldHVybnNcclxuICovXHJcbmNvbnN0IGNyZWF0ZU1pZGRsZXdhcmUgPSAoZnVuYykgPT4ge1xyXG4gIHJldHVybiAoZmFjdG9yeSwgXywgY3RvcikgPT4gKC4uLmRlcGVuZGVuY2llcykgPT4ge1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gY3RvcihmYWN0b3J5LCBkZXBlbmRlbmNpZXMpO1xyXG4gICAgcmV0dXJuIGZ1bmMoY29tcG9uZW50KSB8fCBjb21wb25lbnQ7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU1pZGRsZXdhcmU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlkZGxld2FyZXMvY3JlYXRlTWlkZGxld2FyZS5qc1xuICoqLyIsImNvbnN0IGZpbHRlciA9IChjb25kaXRpb24pID0+IChtaWRkbGV3YXJlKSA9PiB7XHJcbiAgcmV0dXJuIChmYWN0b3J5LCBvcmlnaW5hbEZhY3RvcnksIC4uLnJlc3QpID0+IHtcclxuICAgIHJldHVybiBjb25kaXRpb24ob3JpZ2luYWxGYWN0b3J5KVxyXG4gICAgICA/IG1pZGRsZXdhcmUoZmFjdG9yeSwgb3JpZ2luYWxGYWN0b3J5LCAuLi5yZXN0KVxyXG4gICAgICA6IGZhY3Rvcnk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmlsdGVyO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pZGRsZXdhcmVzL2ZpbHRlci5qc1xuICoqLyIsImNvbnN0IGNvbmNhdCA9IChhY3R1YWxEZXBlbmRlbmNpZXMgPSBbXSwgeyBpc0FwcGVuZGluZyA9IHRydWUgfSA9IHt9KSA9PiAoY3JlYXRlKSA9PiB7XHJcbiAgY29uc3QgY2FsY3VsYXRlRGVwZW5kZW5jaWVzID0gKGRlcGVuZGVuY2llcykgPT4gXHJcbiAgICAgIGlzQXBwZW5kaW5nIFxyXG4gICAgICAgID8gWyAuLi5hY3R1YWxEZXBlbmRlbmNpZXMsIC4uLmRlcGVuZGVuY2llcyBdXHJcbiAgICAgICAgOiBbIC4uLmRlcGVuZGVuY2llcywgLi4uYWN0dWFsRGVwZW5kZW5jaWVzIF07XHJcblxyXG4gIHJldHVybiAoLi4uZGVwZW5kZW5jaWVzKSA9PiBjcmVhdGUoXHJcbiAgICAuLi5jYWxjdWxhdGVEZXBlbmRlbmNpZXMoZGVwZW5kZW5jaWVzKVxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25jYXQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uY2F0LmpzXG4gKiovIiwiY29uc3QgbWVyZ2UgPSAoLi4uYWN0dWFsRGVwZW5kZW5jaWVzKSA9PiAoY3JlYXRlKSA9PiB7XHJcbiAgcmV0dXJuICguLi5kZXBlbmRlbmNpZXMpID0+IHtcclxuICAgIGNvbnN0IGRlcHNTaXplID0gTWF0aC5tYXgoYWN0dWFsRGVwZW5kZW5jaWVzLmxlbmd0aCwgZGVwZW5kZW5jaWVzLmxlbmd0aCk7XHJcbiAgICBjb25zdCBkZXBzID0gQXJyYXkoZGVwc1NpemUpLmZpbGwoe30pO1xyXG5cclxuICAgIHJldHVybiBjcmVhdGUoLi4uZGVwcy5tYXAoKF8sIGluZGV4KSA9PiAoe1xyXG4gICAgICAuLi4oYWN0dWFsRGVwZW5kZW5jaWVzW2luZGV4XSB8fCB7fSksXHJcbiAgICAgIC4uLihkZXBlbmRlbmNpZXNbaW5kZXhdIHx8IHt9KVxyXG4gICAgfSkpKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtZXJnZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tZXJnZS5qc1xuICoqLyIsImNvbnN0IGNvbXBvc2UgPSAoLi4uZnVuY3Rpb25zKSA9PiB7XHJcbiAgaWYgKGZ1bmN0aW9ucy5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiB4ID0+IHg7XHJcbiAgfVxyXG5cclxuICBpZiAoZnVuY3Rpb25zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uc1swXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxhc3RGdW5jdGlvbiA9IGZ1bmN0aW9uc1tmdW5jdGlvbnMubGVuZ3RoIC0gMV07XHJcbiAgY29uc3QgcmVzdEZ1bmN0aW9ucyA9IGZ1bmN0aW9ucy5zbGljZSgwLCAtMSk7XHJcblxyXG4gIHJldHVybiAoLi4uYXJncykgPT4gcmVzdEZ1bmN0aW9ucy5yZWR1Y2VSaWdodChcclxuICAgIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IFxyXG4gICAgICBjdXJyZW50VmFsdWUocHJldmlvdXNWYWx1ZSksIGxhc3RGdW5jdGlvbiguLi5hcmdzKSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbXBvc2UuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9