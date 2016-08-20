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
	exports.merge = exports.concat = exports.filter = exports.createMiddleware = exports.autoAppend = exports.createIt = undefined;
	
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createIt = exports.createIt = _createIt3.default;
	var autoAppend = exports.autoAppend = _autoAppend3.default;
	var createMiddleware = exports.createMiddleware = _createMiddleware3.default;
	var filter = exports.filter = _filter3.default;
	var concat = exports.concat = _concat3.default;
	var merge = exports.merge = _merge3.default;
	
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
	var defaultResolver = exports.defaultResolver = function defaultResolver(factory, dependencies) {
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
	
	  var _ref$resolver = _ref.resolver;
	  var resolver = _ref$resolver === undefined ? defaultResolver : _ref$resolver;
	
	  return function () {
	    for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
	      dependencies[_key] = arguments[_key];
	    }
	
	    return function (originalFactory) {
	      return resolver(middlewares.reduce(function (actualFactory, middleware) {
	        return middleware(actualFactory, originalFactory, resolver);
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxMDU5YjgyMDA3YzM5MWQzNzBiNCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NyZWF0ZUl0LmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9hdXRvQXBwZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9jcmVhdGVNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9taWRkbGV3YXJlcy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWVyZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLEtBQU0sZ0RBQU47QUFDQSxLQUFNLHNEQUFOO0FBQ0EsS0FBTSx3RUFBTjtBQUNBLEtBQU0sMENBQU47QUFDQSxLQUFNLDBDQUFOO0FBQ0EsS0FBTSx1Q0FBTjs7bUJBRVEsUTs7Ozs7Ozs7Ozs7Ozs7QUNkZjs7Ozs7O0FBTU8sS0FBTSw0Q0FBa0IsU0FBbEIsZUFBa0IsQ0FBQyxPQUFELEVBQVUsWUFBVjtBQUFBLFVBQTJCLDRDQUFXLFlBQVgsRUFBM0I7QUFBQSxFQUF4Qjs7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LEVBQW9DLGFBQWEsTUFBakQsQ0FBakI7QUFDQSxXQUFNLE9BQU8sTUFBTSxRQUFOLEVBQWdCLElBQWhCLENBQXFCLEVBQXJCLENBQWI7O0FBRUEsY0FBTywyQ0FBVSxLQUFLLEdBQUwsQ0FBUyxVQUFDLENBQUQsRUFBSSxLQUFKO0FBQUEsNkJBQ3BCLG1CQUFtQixLQUFuQixLQUE2QixFQURULEVBRXBCLGFBQWEsS0FBYixLQUF1QixFQUZIO0FBQUEsUUFBVCxDQUFWLEVBQVA7QUFJRCxNQVJEO0FBU0QsSUFWYTtBQUFBLEVBQWQ7O21CQVllLEsiLCJmaWxlIjoiY3JlYXRlSXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjcmVhdGVJdFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjcmVhdGVJdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMTA1OWI4MjAwN2MzOTFkMzcwYjRcbiAqKi8iLCJpbXBvcnQgX2NyZWF0ZUl0IGZyb20gJy4vY3JlYXRlSXQnO1xyXG5pbXBvcnQgX2F1dG9BcHBlbmQgZnJvbSAnLi9taWRkbGV3YXJlcy9hdXRvQXBwZW5kJztcclxuaW1wb3J0IF9jcmVhdGVNaWRkbGV3YXJlIGZyb20gJy4vbWlkZGxld2FyZXMvY3JlYXRlTWlkZGxld2FyZSc7XHJcbmltcG9ydCBfZmlsdGVyIGZyb20gJy4vbWlkZGxld2FyZXMvZmlsdGVyJztcclxuaW1wb3J0IF9jb25jYXQgZnJvbSAnLi9jb25jYXQnO1xyXG5pbXBvcnQgX21lcmdlIGZyb20gJy4vbWVyZ2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUl0ID0gX2NyZWF0ZUl0O1xyXG5leHBvcnQgY29uc3QgYXV0b0FwcGVuZCA9IF9hdXRvQXBwZW5kO1xyXG5leHBvcnQgY29uc3QgY3JlYXRlTWlkZGxld2FyZSA9IF9jcmVhdGVNaWRkbGV3YXJlO1xyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gX2ZpbHRlcjtcclxuZXhwb3J0IGNvbnN0IGNvbmNhdCA9IF9jb25jYXQ7XHJcbmV4cG9ydCBjb25zdCBtZXJnZSA9IF9tZXJnZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUl0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiLyoqXHJcbiAqIGRlZmF1bHRDdG9yIHRvIHBhc3MgdG8gY3JlYXRlIGZhY3RvcnlcclxuICogXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZhY3RvcnlcclxuICogQHBhcmFtIHtBcnJheX0gZGVwZW5kZW5jaWVzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdFJlc29sdmVyID0gKGZhY3RvcnksIGRlcGVuZGVuY2llcykgPT4gZmFjdG9yeSguLi5kZXBlbmRlbmNpZXMpO1xyXG5cclxuLyoqXHJcbiAqIGNyZWF0ZSBmdW5jdGlvbiBpcyBhIGZhY3RvcnkgcHJvZHVjZXMgYSBwdXJlIERJIGNvbnRhaW5lciB0byBpbnN0YW50aWF0ZSBhY3R1YWwgY29tcG9uZW50cyB3aXRoIGl0LlxyXG4gKiBcclxuICogQGV4YW1wbGVcclxuICogaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnY3JlYXRlLWl0JztcclxuICogaW1wb3J0IHsgYXBwLCBtYWluQ29udGVudCwgc2lkZUJhciB9IGZyb20gJ2ZhY3Rvcmllcyc7XHJcbiAqIGltcG9ydCB7IFBhcmFncmFwaCwgTWVudSB9IGZyb20gJ2NvbXBvbmVudHMnO1xyXG4gKiBcclxuICogY29uc3QgY3JlYXRlID0gY3JlYXRlSXQoKTtcclxuICogXHJcbiAqIGNvbnN0IE1haW5Db250ZW50ID0gY3JlYXRlKHsgUGFyYWdyYXBoIH0pKG1haW5Db250ZW50KTtcclxuICogY29uc3QgU2lkZUJhciA9IGNyZWF0ZSh7IE1lbnUgfSkoc2lkZUJhcik7XHJcbiAqIGNvbnN0IEFwcCA9IGNyZWF0ZSh7IFNpZGVCYXIsIE1haW5Db250ZW50IH0pKGFwcCk7XHJcbiAqIFxyXG4gKiBAcGFyYW0ge0FycmF5fSBtaWRkbGV3YXJlczogXHJcbiAqIEBwYXJhbSB7YW55fSB7IHJlc29sdmVyID0gZGVmYXVsdHJlc29sdmVyIH1cclxuICogQHJldHVybnMgRnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGNyZWF0ZUl0ID0gKG1pZGRsZXdhcmVzID0gW10sIHsgcmVzb2x2ZXIgPSBkZWZhdWx0UmVzb2x2ZXIgfSA9IHt9KSA9PiB7XHJcbiAgcmV0dXJuICguLi5kZXBlbmRlbmNpZXMpID0+IChvcmlnaW5hbEZhY3RvcnkpID0+IHJlc29sdmVyKG1pZGRsZXdhcmVzLnJlZHVjZShcclxuICAgIChhY3R1YWxGYWN0b3J5LCBtaWRkbGV3YXJlKSA9PiBtaWRkbGV3YXJlKGFjdHVhbEZhY3RvcnksIG9yaWdpbmFsRmFjdG9yeSwgcmVzb2x2ZXIpLCBcclxuICAgIG9yaWdpbmFsRmFjdG9yeVxyXG4gICksIGRlcGVuZGVuY2llcyk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVJdDsgIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NyZWF0ZUl0LmpzXG4gKiovIiwiLyoqXHJcbiAqIFxyXG4gKiBcclxuICogQHBhcmFtIHthbnl9IGFwcGVuZGl4XHJcbiAqIEByZXR1cm5zXHJcbiAqL1xyXG5jb25zdCBhdXRvQXBwZW5kID0gKC4uLmFwcGVuZGl4KSA9PiB7XHJcbiAgcmV0dXJuIChmYWN0b3J5LCBfLCBjdG9yKSA9PiAoLi4uZGVwZW5kZW5jaWVzKSA9PiBjdG9yKGZhY3RvcnksIFsuLi5kZXBlbmRlbmNpZXMsIC4uLmFwcGVuZGl4XSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhdXRvQXBwZW5kO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pZGRsZXdhcmVzL2F1dG9BcHBlbmQuanNcbiAqKi8iLCIvKipcclxuICogXHJcbiAqIFxyXG4gKiBAcGFyYW0ge2FueX0gZnVuY1xyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuY29uc3QgY3JlYXRlTWlkZGxld2FyZSA9IChmdW5jKSA9PiB7XHJcbiAgcmV0dXJuIChmYWN0b3J5LCBfLCBjdG9yKSA9PiAoLi4uZGVwZW5kZW5jaWVzKSA9PiB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSBjdG9yKGZhY3RvcnksIGRlcGVuZGVuY2llcyk7XHJcbiAgICByZXR1cm4gZnVuYyhjb21wb25lbnQpIHx8IGNvbXBvbmVudDtcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWlkZGxld2FyZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taWRkbGV3YXJlcy9jcmVhdGVNaWRkbGV3YXJlLmpzXG4gKiovIiwiY29uc3QgZmlsdGVyID0gKGNvbmRpdGlvbikgPT4gKG1pZGRsZXdhcmUpID0+IHtcclxuICByZXR1cm4gKGZhY3RvcnksIG9yaWdpbmFsRmFjdG9yeSwgLi4ucmVzdCkgPT4ge1xyXG4gICAgcmV0dXJuIGNvbmRpdGlvbihvcmlnaW5hbEZhY3RvcnkpXHJcbiAgICAgID8gbWlkZGxld2FyZShmYWN0b3J5LCBvcmlnaW5hbEZhY3RvcnksIC4uLnJlc3QpXHJcbiAgICAgIDogZmFjdG9yeTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWx0ZXI7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlkZGxld2FyZXMvZmlsdGVyLmpzXG4gKiovIiwiY29uc3QgY29uY2F0ID0gKGFjdHVhbERlcGVuZGVuY2llcyA9IFtdLCB7IGlzQXBwZW5kaW5nID0gdHJ1ZSB9ID0ge30pID0+IChjcmVhdGUpID0+IHtcclxuICBjb25zdCBjYWxjdWxhdGVEZXBlbmRlbmNpZXMgPSAoZGVwZW5kZW5jaWVzKSA9PiBcclxuICAgICAgaXNBcHBlbmRpbmcgXHJcbiAgICAgICAgPyBbIC4uLmFjdHVhbERlcGVuZGVuY2llcywgLi4uZGVwZW5kZW5jaWVzIF1cclxuICAgICAgICA6IFsgLi4uZGVwZW5kZW5jaWVzLCAuLi5hY3R1YWxEZXBlbmRlbmNpZXMgXTtcclxuXHJcbiAgcmV0dXJuICguLi5kZXBlbmRlbmNpZXMpID0+IGNyZWF0ZShcclxuICAgIC4uLmNhbGN1bGF0ZURlcGVuZGVuY2llcyhkZXBlbmRlbmNpZXMpXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmNhdDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25jYXQuanNcbiAqKi8iLCJjb25zdCBtZXJnZSA9ICguLi5hY3R1YWxEZXBlbmRlbmNpZXMpID0+IChjcmVhdGUpID0+IHtcclxuICByZXR1cm4gKC4uLmRlcGVuZGVuY2llcykgPT4ge1xyXG4gICAgY29uc3QgZGVwc1NpemUgPSBNYXRoLm1heChhY3R1YWxEZXBlbmRlbmNpZXMubGVuZ3RoLCBkZXBlbmRlbmNpZXMubGVuZ3RoKTtcclxuICAgIGNvbnN0IGRlcHMgPSBBcnJheShkZXBzU2l6ZSkuZmlsbCh7fSk7XHJcblxyXG4gICAgcmV0dXJuIGNyZWF0ZSguLi5kZXBzLm1hcCgoXywgaW5kZXgpID0+ICh7XHJcbiAgICAgIC4uLihhY3R1YWxEZXBlbmRlbmNpZXNbaW5kZXhdIHx8IHt9KSxcclxuICAgICAgLi4uKGRlcGVuZGVuY2llc1tpbmRleF0gfHwge30pXHJcbiAgICB9KSkpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lcmdlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21lcmdlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==