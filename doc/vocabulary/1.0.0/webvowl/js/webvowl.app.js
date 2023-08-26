webvowl.app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(319);
	__webpack_require__(321);

	module.exports = __webpack_require__(322);


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

	module.exports = d3;

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(92),
	    getRawTag = __webpack_require__(95),
	    objectToString = __webpack_require__(96);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(93);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(94);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ }),

/***/ 94:
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(92);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ }),

/***/ 96:
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(91),
	    isObjectLike = __webpack_require__(104);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ }),

/***/ 104:
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ }),

/***/ 112:
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ }),

/***/ 154:
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(220);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(92),
	    arrayMap = __webpack_require__(154),
	    isArray = __webpack_require__(112),
	    isSymbol = __webpack_require__(103);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ }),

/***/ 319:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/* Taken from here: http://stackoverflow.com/a/17907562 */
	function getInternetExplorerVersion(){
	  var ua,
	    re,
	    rv = -1;
	  
	  // check for edge
	  var isEdge = /(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:|\bEdge\/)(\d+)/.test(navigator.userAgent);
	  if ( isEdge ) {
	    rv = parseInt("12");
	    return rv;
	  }
	  
	  var isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
	  if ( isIE11 ) {
	    rv = parseInt("11");
	    return rv;
	  }
	  if ( navigator.appName === "Microsoft Internet Explorer" ) {
	    ua = navigator.userAgent;
	    re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
	    if ( re.exec(ua) !== null ) {
	      rv = parseFloat(RegExp.$1);
	    }
	  } else if ( navigator.appName === "Netscape" ) {
	    ua = navigator.userAgent;
	    re = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})");
	    if ( re.exec(ua) !== null ) {
	      rv = parseFloat(RegExp.$1);
	    }
	  }
	  return rv;
	}

	function showBrowserWarningIfRequired(){
	  var version = getInternetExplorerVersion();
	  console.log("Browser Version =" + version);
	  if ( version > 0 && version <= 11 ) {
	    d3.select("#browserCheck").classed("hidden", false);
	    d3.select("#killWarning").classed("hidden", true);
	    d3.select("#optionsArea").classed("hidden", true);
	    d3.select("#logo").classed("hidden", true);
	  }
	  if ( version == 12 ) {
	    d3.select("#logo").classed("hidden", false);
	    d3.select("#browserCheck").classed("hidden", false);
	    // connect the button;
	    var pb_kill = d3.select("#killWarning");
	    pb_kill.on("click", function (){
	      console.log("hide the warning please");
	      d3.select("#browserCheck").classed("hidden", true);
	      d3.select("#logo").style("padding", "10px");
	    });
	  }
	  else {
	    d3.select("#logo").classed("hidden", false);
	    d3.select("#browserCheck").classed("hidden", true);
	  }
	  
	}

	module.exports = showBrowserWarningIfRequired;
	showBrowserWarningIfRequired();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {String.prototype.replaceAll = function ( search, replacement ){
	  var target = this;
	  return target.split(search).join(replacement);
	};
	module.exports = function (){
	  var newOntologyCounter = 1;
	  var app = {},
	    graph = webvowl.graph(),
	    options = graph.graphOptions(),
	    languageTools = webvowl.util.languageTools(),
	    GRAPH_SELECTOR = "#graph",
	    // Modules for the webvowl app
	    exportMenu = __webpack_require__(323)(graph),
	    filterMenu = __webpack_require__(325)(graph),
	    gravityMenu = __webpack_require__(326)(graph),
	    modeMenu = __webpack_require__(327)(graph),
	    debugMenu = __webpack_require__(328)(graph),
	    ontologyMenu = __webpack_require__(329)(graph),
	    pauseMenu = __webpack_require__(333)(graph),
	    resetMenu = __webpack_require__(334)(graph),
	    searchMenu = __webpack_require__(335)(graph),
	    navigationMenu = __webpack_require__(336)(graph),
	    zoomSlider = __webpack_require__(337)(graph),
	    sidebar = __webpack_require__(338)(graph),
	    leftSidebar = __webpack_require__(339)(graph),
	    editSidebar = __webpack_require__(340)(graph),
	    configMenu = __webpack_require__(341)(graph),
	    loadingModule = __webpack_require__(342)(graph),
	    warningModule = __webpack_require__(343)(graph),
	    directInputMod = __webpack_require__(344)(graph),
	    
	    
	    // Graph modules
	    colorExternalsSwitch = webvowl.modules.colorExternalsSwitch(graph),
	    compactNotationSwitch = webvowl.modules.compactNotationSwitch(graph),
	    datatypeFilter = webvowl.modules.datatypeFilter(),
	    disjointFilter = webvowl.modules.disjointFilter(),
	    focuser = webvowl.modules.focuser(graph),
	    emptyLiteralFilter = webvowl.modules.emptyLiteralFilter(),
	    nodeDegreeFilter = webvowl.modules.nodeDegreeFilter(filterMenu),
	    nodeScalingSwitch = webvowl.modules.nodeScalingSwitch(graph),
	    objectPropertyFilter = webvowl.modules.objectPropertyFilter(),
	    pickAndPin = webvowl.modules.pickAndPin(),
	    selectionDetailDisplayer = webvowl.modules.selectionDetailsDisplayer(sidebar.updateSelectionInformation),
	    statistics = webvowl.modules.statistics(),
	    subclassFilter = webvowl.modules.subclassFilter(),
	    setOperatorFilter = webvowl.modules.setOperatorFilter();
	  
	  
	  app.getOptions = function (){
	    return webvowl.opts;
	  };
	  app.getGraph = function (){
	    return webvowl.gr;
	  };
	  // app.afterInitializationCallback=undefined;
	  
	  
	  var executeFileDrop = false;
	  var wasMessageToShow = false;
	  var firstTime = false;
	  
	  function addFileDropEvents( selector ){
	    var node = d3.select(selector);
	    
	    node.node().ondragover = function ( e ){
	      e.preventDefault();

	      d3.select("#dragDropContainer").classed("hidden", false);
	      // get svg size
	      var w = graph.options().width();
	      var h = graph.options().height();
	      
	      // get event position; (using clientX and clientY);
	      var cx = e.clientX;
	      var cy = e.clientY;
	      
	      if ( firstTime === false ) {
	        var state = d3.select("#loading-info").classed("hidden");
	        wasMessageToShow = !state;
	        firstTime = true;
	        d3.select("#loading-info").classed("hidden", true); // hide it so it does not conflict with drop event
	        var bb=d3.select("#drag_msg").node().getBoundingClientRect();
	        var hs = bb.height;
	        var ws = bb.width;
	        
	        var icon_scale=Math.min(hs,ws);
	        icon_scale/=100;
	        
	        d3.select("#drag_icon_group").attr("transform", "translate ( " + 0.25 * ws + " " + 0.25 * hs + ")");
	        d3.select("#drag_icon").attr("transform","matrix ("+icon_scale+",0,0,"+icon_scale+",0,0)");
	        d3.select("#drag_icon_drop").attr("transform","matrix ("+icon_scale+",0,0,"+icon_scale+",0,0)");
	      }
	      
	      
	      if ( (cx > 0.25 * w && cx < 0.75 * w) && (cy > 0.25 * h && cy < 0.75 * h) ) {
	        
	        d3.select("#drag_msg_text").node().innerHTML = "Drop it here.";
	        d3.select("#drag_msg").style("background-color", "#67bc0f");
	        d3.select("#drag_msg").style("color", "#000000");
	        executeFileDrop = true;
	        // d3.select("#drag_svg").transition()
	        //   .duration(100)
	        //   // .attr("-webkit-transform", "rotate(90)")
	        //   // .attr("-moz-transform",    "rotate(90)")
	        //   // .attr("-o-transform",      "rotate(90)")
	        //   .attr("transform",         "rotate(90)");
	  
	        d3.select("#drag_icon").classed("hidden",true);
	        d3.select("#drag_icon_drop").classed("hidden",false);
	  
	  
	      } else {
	        d3.select("#drag_msg_text").node().innerHTML = "Drag ontology file here.";
	        d3.select("#drag_msg").style("background-color", "#fefefe");
	        d3.select("#drag_msg").style("color", "#000000");
	        executeFileDrop = false;
	  
	        d3.select("#drag_icon").classed("hidden",false);
	        d3.select("#drag_icon_drop").classed("hidden",true);
	        
	        
	        // d3.select("#drag_svg").transition()
	        //   .duration(100)
	        //   // .attr("-webkit-transform", "rotate(0)")
	        //   // .attr("-moz-transform",    "rotate(0)")
	        //   // .attr("-o-transform",      "rotate(0)")
	        //   .attr("transform",         "rotate(0)");
	        //
	      }
	      
	    };
	    node.node().ondrop = function ( ev ){
	      ev.preventDefault();
	      firstTime = false;
	      if ( executeFileDrop ) {
	        if ( ev.dataTransfer.items ) {
	          if ( ev.dataTransfer.items.length === 1 ) {
	            if ( ev.dataTransfer.items[0].kind === 'file' ) {
	              var file = ev.dataTransfer.items[0].getAsFile();
	              graph.options().loadingModule().fromFileDrop(file.name, file);
	            }
	          }
	          else {
	            //  >> WARNING not multiple file uploaded;
	            graph.options().warningModule().showMultiFileUploadWarning();
	          }
	        }
	      }
	      d3.select("#dragDropContainer").classed("hidden", true);
	    };
	    
	    node.node().ondragleave = function ( e ){
	      var w = graph.options().width();
	      var h = graph.options().height();
	      
	      // get event position; (using clientX and clientY);
	      var cx = e.clientX;
	      var cy = e.clientY;
	      
	      var hidden = false;
	      firstTime = false;
	      
	      if ( cx < 0.1 * w || cx > 0.9 * w ) hidden = true;
	      if ( cy < 0.1 * h || cy > 0.9 * h ) hidden = true;
	      d3.select("#dragDropContainer").classed("hidden", hidden);
	      
	      d3.select("#loading-info").classed("hidden", !wasMessageToShow); // show it again
	      // check if it should be visible
	      var should_show=graph.options().loadingModule().getMessageVisibilityStatus();
	      if (should_show===false){
	        d3.select("#loading-info").classed("hidden", true); // hide it
	      }
	    };
	    
	  }
	  
	  
	  app.initialize = function (){
	    addFileDropEvents(GRAPH_SELECTOR);
	    
	    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function ( f ){
	        return setTimeout(f, 1000 / 60);
	      }; // simulate calling code 60
	    window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function ( requestID ){
	        clearTimeout(requestID);
	      }; //fall back
	    
	    options.graphContainerSelector(GRAPH_SELECTOR);
	    options.selectionModules().push(focuser);
	    options.selectionModules().push(selectionDetailDisplayer);
	    options.selectionModules().push(pickAndPin);
	    
	    options.filterModules().push(emptyLiteralFilter);
	    options.filterModules().push(statistics);
	    
	    options.filterModules().push(nodeDegreeFilter);
	    options.filterModules().push(datatypeFilter);
	    options.filterModules().push(objectPropertyFilter);
	    options.filterModules().push(subclassFilter);
	    options.filterModules().push(disjointFilter);
	    options.filterModules().push(setOperatorFilter);
	    options.filterModules().push(nodeScalingSwitch);
	    options.filterModules().push(compactNotationSwitch);
	    options.filterModules().push(colorExternalsSwitch);
	    
	    d3.select(window).on("resize", adjustSize);
	    
	    exportMenu.setup();
	    gravityMenu.setup();
	    filterMenu.setup(datatypeFilter, objectPropertyFilter, subclassFilter, disjointFilter, setOperatorFilter, nodeDegreeFilter);
	    modeMenu.setup(pickAndPin, nodeScalingSwitch, compactNotationSwitch, colorExternalsSwitch);
	    pauseMenu.setup();
	    sidebar.setup();
	    loadingModule.setup();
	    leftSidebar.setup();
	    editSidebar.setup();
	    debugMenu.setup();
	    var agentVersion = getInternetExplorerVersion();
	    if ( agentVersion > 0 && agentVersion <= 11 ) {
	      console.log("Agent version " + agentVersion);
	      console.log("This agent is not supported");
	      d3.select("#browserCheck").classed("hidden", false);
	      d3.select("#killWarning").classed("hidden", true);
	      d3.select("#optionsArea").classed("hidden", true);
	      d3.select("#logo").classed("hidden", true);
	    } else {
	      d3.select("#logo").classed("hidden", false);
	      if ( agentVersion === 12 ) {
	        // allow Mircosoft Edge Browser but with warning
	        d3.select("#browserCheck").classed("hidden", false);
	        d3.select("#killWarning").classed("hidden", false);
	      } else {
	        d3.select("#browserCheck").classed("hidden", true);
	      }
	      
	      resetMenu.setup([gravityMenu, filterMenu, modeMenu, focuser, selectionDetailDisplayer, pauseMenu]);
	      searchMenu.setup();
	      navigationMenu.setup();
	      zoomSlider.setup();
	      
	      // give the options the pointer to the some menus for import and export
	      options.literalFilter(emptyLiteralFilter);
	      options.nodeDegreeFilter(nodeDegreeFilter);
	      options.loadingModule(loadingModule);
	      options.filterMenu(filterMenu);
	      options.modeMenu(modeMenu);
	      options.gravityMenu(gravityMenu);
	      options.pausedMenu(pauseMenu);
	      options.pickAndPinModule(pickAndPin);
	      options.resetMenu(resetMenu);
	      options.searchMenu(searchMenu);
	      options.ontologyMenu(ontologyMenu);
	      options.navigationMenu(navigationMenu);
	      options.sidebar(sidebar);
	      options.leftSidebar(leftSidebar);
	      options.editSidebar(editSidebar);
	      options.exportMenu(exportMenu);
	      options.graphObject(graph);
	      options.zoomSlider(zoomSlider);
	      options.warningModule(warningModule);
	      options.directInputModule(directInputMod);
	      options.datatypeFilter(datatypeFilter);
	      options.objectPropertyFilter(objectPropertyFilter);
	      options.subclassFilter(subclassFilter);
	      options.setOperatorFilter(setOperatorFilter);
	      options.disjointPropertyFilter(disjointFilter);
	      options.focuserModule(focuser);
	      options.colorExternalsModule(colorExternalsSwitch);
	      options.compactNotationModule(compactNotationSwitch);
	      
	      ontologyMenu.setup(loadOntologyFromText);
	      configMenu.setup();
	      
	      leftSidebar.showSidebar(0);
	      leftSidebar.hideCollapseButton(true);
	      
	      
	      graph.start();
	      
	      var modeOp = d3.select("#modeOfOperationString");
	      modeOp.style("font-size", "0.6em");
	      modeOp.style("font-style", "italic");
	      
	      adjustSize();
	      var defZoom;
	      var w = graph.options().width();
	      var h = graph.options().height();
	      defZoom = Math.min(w, h) / 1000;
	      
	      var hideDebugOptions = true;
	      if ( hideDebugOptions === false ) {
	        graph.setForceTickFunctionWithFPS();
	      }
	      
	      graph.setDefaultZoom(defZoom);
	      d3.selectAll(".debugOption").classed("hidden", hideDebugOptions);
	      
	      // prevent backspace reloading event
	      var htmlBody = d3.select("body");
	      d3.select(document).on("keydown", function ( e ){
	        if ( d3.event.keyCode === 8 && d3.event.target === htmlBody.node() ) {
	          // we could add here an alert
	          d3.event.preventDefault();
	        }
	        // using ctrl+Shift+d as debug option
	        if ( d3.event.ctrlKey && d3.event.shiftKey && d3.event.keyCode === 68 ) {
	          graph.options().executeHiddenDebugFeatuers();
	          d3.event.preventDefault();
	        }
	      });
	      if ( d3.select("#maxLabelWidthSliderOption") ) {
	        var setValue = !graph.options().dynamicLabelWidth();
	        d3.select("#maxLabelWidthSlider").node().disabled = setValue;
	        d3.select("#maxLabelWidthvalueLabel").classed("disabledLabelForSlider", setValue);
	        d3.select("#maxLabelWidthDescriptionLabel").classed("disabledLabelForSlider", setValue);
	      }
	      
	      d3.select("#blockGraphInteractions").style("position", "absolute")
	        .style("top", "0")
	        .style("background-color", "#bdbdbd")
	        .style("opacity", "0.5")
	        .style("pointer-events", "auto")
	        .style("width", graph.options().width() + "px")
	        .style("height", graph.options().height() + "px")
	        .on("click", function (){
	          d3.event.preventDefault();
	          d3.event.stopPropagation();
	        })
	        .on("dblclick", function (){
	          d3.event.preventDefault();
	          d3.event.stopPropagation();
	        });
	      
	      d3.select("#direct-text-input").on("click", function (){
	        directInputMod.setDirectInputMode();
	      });
	      d3.select("#blockGraphInteractions").node().draggable = false;
	      options.prefixModule(webvowl.util.prefixTools(graph));
	      adjustSize();
	      sidebar.updateOntologyInformation(undefined, statistics);
	      loadingModule.parseUrlAndLoadOntology(); // loads automatically the ontology provided by the parameters
	      options.debugMenu(debugMenu);
	      debugMenu.updateSettings();
	      
	      // connect the reloadCachedVersionButton
	      d3.select("#reloadSvgIcon").on("click", function (){
	        if ( d3.select("#reloadSvgIcon").node().disabled === true ) {
	          graph.options().ontologyMenu().clearCachedVersion();
	          return;
	        }
	        d3.select("#reloadCachedOntology").classed("hidden", true);
	        graph.options().ontologyMenu().reloadCachedOntology();
	        
	      });
	      // add the initialized objects
	      webvowl.opts = options;
	      webvowl.gr = graph;
	      
	    }
	  };
	  
	  
	  function loadOntologyFromText( jsonText, filename, alternativeFilename ){
	    d3.select("#reloadCachedOntology").classed("hidden", true);
	    pauseMenu.reset();
	    graph.options().navigationMenu().hideAllMenus();
	    
	    if ( (jsonText === undefined && filename === undefined) || (jsonText.length === 0) ) {
	      loadingModule.notValidJsonFile();
	      return;
	    }
	    graph.editorMode(); // updates the checkbox
	    var data;
	    if ( jsonText ) {
	      // validate JSON FILE
	      var validJSON;
	      try {
	        data = JSON.parse(jsonText);
	        validJSON = true;
	      } catch ( e ) {
	        validJSON = false;
	      }
	      if ( validJSON === false ) {
	        // the server output is not a valid json file
	        loadingModule.notValidJsonFile();
	        return;
	      }
	      
	      if ( !filename ) {
	        // First look if an ontology title exists, otherwise take the alternative filename
	        var ontologyNames = data.header ? data.header.title : undefined;
	        var ontologyName = languageTools.textInLanguage(ontologyNames);
	        
	        if ( ontologyName ) {
	          filename = ontologyName;
	        } else {
	          filename = alternativeFilename;
	        }
	      }
	    }
	    
	    
	    // check if we have graph data
	    var classCount = 0;
	    if ( data.class !== undefined ) {
	      classCount = data.class.length;
	    }
	    
	    var loadEmptyOntologyForEditing = false;
	    if ( location.hash.indexOf("#new_ontology") !== -1 ) {
	      loadEmptyOntologyForEditing = true;
	      newOntologyCounter++;
	      d3.select("#empty").node().href = "#opts=editorMode=true;#new_ontology" + newOntologyCounter;
	    }
	    if ( classCount === 0 && graph.editorMode() === false && loadEmptyOntologyForEditing === false ) {
	      // generate message for the user;
	      loadingModule.emptyGraphContentError();
	    } else {
	      loadingModule.validJsonFile();
	      ontologyMenu.setCachedOntology(filename, jsonText);
	      exportMenu.setJsonText(jsonText);
	      options.data(data);
	      graph.options().loadingModule().setPercentMode();
	      if ( loadEmptyOntologyForEditing === true ) {
	        graph.editorMode(true);
	        
	      }
	      graph.load();
	      sidebar.updateOntologyInformation(data, statistics);
	      exportMenu.setFilename(filename);
	      graph.updateZoomSliderValueFromOutside();
	      adjustSize();
	      
	      var flagOfCheckBox = d3.select("#editorModeModuleCheckbox").node().checked;
	      graph.editorMode(flagOfCheckBox);// update gui
	      
	    }
	  }
	  
	  function adjustSize(){
	    var graphContainer = d3.select(GRAPH_SELECTOR),
	      svg = graphContainer.select("svg"),
	      height = window.innerHeight - 40,
	      width = window.innerWidth - (window.innerWidth * 0.22);
	    
	    if ( sidebar.getSidebarVisibility() === "0" ) {
	      height = window.innerHeight - 40;
	      width = window.innerWidth;
	    }
	    
	    directInputMod.updateLayout();
	    d3.select("#blockGraphInteractions").style("width", window.innerWidth + "px");
	    d3.select("#blockGraphInteractions").style("height", window.innerHeight + "px");
	    
	    d3.select("#WarningErrorMessagesContainer").style("width", width + "px");
	    d3.select("#WarningErrorMessagesContainer").style("height", height + "px");
	    
	    d3.select("#WarningErrorMessages").style("max-height", (height - 12) + "px");
	    
	    graphContainer.style("height", height + "px");
	    svg.attr("width", width)
	      .attr("height", height);
	    
	    options.width(width)
	      .height(height);
	    
	    graph.updateStyle();
	    
	    if ( isTouchDevice() === true ) {
	      if ( graph.isEditorMode() === true )
	        d3.select("#modeOfOperationString").node().innerHTML = "touch able device detected";
	      graph.setTouchDevice(true);
	      
	    } else {
	      if ( graph.isEditorMode() === true )
	        d3.select("#modeOfOperationString").node().innerHTML = "point & click device detected";
	      graph.setTouchDevice(false);
	    }
	    
	    d3.select("#loadingInfo-container").style("height", 0.5 * (height - 80) + "px");
	    loadingModule.checkForScreenSize();
	    
	    adjustSliderSize();
	    // update also the padding options of loading and the logo positions;
	    var warningDiv = d3.select("#browserCheck");
	    if ( warningDiv.classed("hidden") === false ) {
	      var offset = 10 + warningDiv.node().getBoundingClientRect().height;
	      d3.select("#logo").style("padding", offset + "px 10px");
	    } else {
	      // remove the dynamic padding from the logo element;
	      d3.select("#logo").style("padding", "10px");
	    }
	    
	    // scrollbar tests;
	    var element = d3.select("#menuElementContainer").node();
	    var maxScrollLeft = element.scrollWidth - element.clientWidth;
	    var leftButton = d3.select("#scrollLeftButton");
	    var rightButton = d3.select("#scrollRightButton");
	    if ( maxScrollLeft > 0 ) {
	      // show both and then check how far is bar;
	      rightButton.classed("hidden", false);
	      leftButton.classed("hidden", false);
	      navigationMenu.updateScrollButtonVisibility();
	    } else {
	      // hide both;
	      rightButton.classed("hidden", true);
	      leftButton.classed("hidden", true);
	    }
	    
	    // adjust height of the leftSidebar element;
	    editSidebar.updateElementWidth();
	    
	    
	    var hs = d3.select("#drag_msg").node().getBoundingClientRect().height;
	    var ws = d3.select("#drag_msg").node().getBoundingClientRect().width;
	    d3.select("#drag_icon_group").attr("transform", "translate ( " + 0.25 * ws + " " + 0.25 * hs + ")");
	    
	  }
	  
	  function adjustSliderSize(){
	    // TODO: refactor and put this into the slider it self
	    var height = window.innerHeight - 40;
	    var fullHeight = height;
	    var zoomOutPos = height - 30;
	    var sliderHeight = 150;
	    
	    // assuming DOM elements are generated in the index.html
	    // todo: refactor for independent usage of graph and app
	    if ( fullHeight < 150 ) {
	      // hide the slider button;
	      d3.select("#zoomSliderParagraph").classed("hidden", true);
	      d3.select("#zoomOutButton").classed("hidden", true);
	      d3.select("#zoomInButton").classed("hidden", true);
	      d3.select("#centerGraphButton").classed("hidden", true);
	      return;
	    }
	    d3.select("#zoomSliderParagraph").classed("hidden", false);
	    d3.select("#zoomOutButton").classed("hidden", false);
	    d3.select("#zoomInButton").classed("hidden", false);
	    d3.select("#centerGraphButton").classed("hidden", false);
	    
	    var zoomInPos = zoomOutPos - 20;
	    var centerPos = zoomInPos - 20;
	    if ( fullHeight < 280 ) {
	      // hide the slider button;
	      d3.select("#zoomSliderParagraph").classed("hidden", true);//var sliderPos=zoomOutPos-sliderHeight;
	      d3.select("#zoomOutButton").style("top", zoomOutPos + "px");
	      d3.select("#zoomInButton").style("top", zoomInPos + "px");
	      d3.select("#centerGraphButton").style("top", centerPos + "px");
	      return;
	    }
	    
	    var sliderPos = zoomOutPos - sliderHeight;
	    zoomInPos = sliderPos - 20;
	    centerPos = zoomInPos - 20;
	    d3.select("#zoomSliderParagraph").classed("hidden", false);
	    d3.select("#zoomOutButton").style("top", zoomOutPos + "px");
	    d3.select("#zoomInButton").style("top", zoomInPos + "px");
	    d3.select("#centerGraphButton").style("top", centerPos + "px");
	    d3.select("#zoomSliderParagraph").style("top", sliderPos + "px");
	  }
	  
	  function isTouchDevice(){
	    try {
	      document.createEvent("TouchEvent");
	      return true;
	    } catch ( e ) {
	      return false;
	    }
	  }
	  
	  
	  function getInternetExplorerVersion(){
	    var ua,
	      re,
	      rv = -1;
	    
	    // check for edge
	    var isEdge = /(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:|\bEdge\/)(\d+)/.test(navigator.userAgent);
	    if ( isEdge ) {
	      rv = parseInt("12");
	      return rv;
	    }
	    
	    var isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
	    if ( isIE11 ) {
	      rv = parseInt("11");
	      return rv;
	    }
	    if ( navigator.appName === "Microsoft Internet Explorer" ) {
	      ua = navigator.userAgent;
	      re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
	      if ( re.exec(ua) !== null ) {
	        rv = parseFloat(RegExp.$1);
	      }
	    } else if ( navigator.appName === "Netscape" ) {
	      ua = navigator.userAgent;
	      re = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})");
	      if ( re.exec(ua) !== null ) {
	        rv = parseFloat(RegExp.$1);
	      }
	    }
	    return rv;
	  }
	  
	  return app;
	}
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the logic for the export button.
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var exportMenu = {},
	    exportSvgButton,
	    exportFilename,
	    exportJsonButton,
	    exportTurtleButton,
	    exportTexButton,
	    copyButton,
	    exportableJsonText;
	  
	  var exportTTLModule = __webpack_require__(324)(graph);
	  
	  
	  String.prototype.replaceAll = function ( search, replacement ){
	    var target = this;
	    return target.split(search).join(replacement);
	  };
	  
	  
	  /**
	   * Adds the export button to the website.
	   */
	  exportMenu.setup = function (){
	    exportSvgButton = d3.select("#exportSvg")
	      .on("click", exportSvg);
	    exportJsonButton = d3.select("#exportJson")
	      .on("click", exportJson);
	    
	    copyButton = d3.select("#copyBt")
	      .on("click", copyUrl);
	    
	    exportTexButton = d3.select("#exportTex")
	      .on("click", exportTex);
	    
	    exportTurtleButton = d3.select("#exportTurtle")
	      .on("click", exportTurtle);
	    
	    var menuEntry = d3.select("#m_export");
	    menuEntry.on("mouseover", function (){
	      var searchMenu = graph.options().searchMenu();
	      searchMenu.hideSearchEntries();
	      exportMenu.exportAsUrl();
	    });
	  };
	  function exportTurtle(){
	    var success = exportTTLModule.requestExport();
	    var result = exportTTLModule.resultingTTL_Content();
	    var ontoTitle = "NewOntology";
	    console.log("Exporter was successful: " + success);
	    if ( success ) {
	      // console.log("The result is : " + result);
	      // var ontoTitle=graph.options().getGeneralMetaObjectProperty('title');
	      // if (ontoTitle===undefined || ontoTitle.length===0)
	      // 	ontoTitle="NewOntology";
	      // else{
	      // 	// language object -.-
	      //    ontoTitle.replace(" ","_")
	      // }
	      
	      // TODO: show TEXT in warning module?
	      
	      
	      // // write the data
	      var dataURI = "data:text/json;charset=utf-8," + encodeURIComponent(result);
	      
	      exportTurtleButton.attr("href", dataURI)
	        .attr("download", ontoTitle + ".ttl");
	      
	      // okay restore old href?
	      //  exportTurtleButton.attr("href", oldHref);
	    } else {
	      console.log("ShowWarning!");
	      graph.options().warningModule().showExporterWarning();
	      console.log("Stay on the page! " + window.location.href);
	      exportTurtleButton.attr("href", window.location.href);
	      d3.event.preventDefault(); // prevent the href to be called ( reloads the page otherwise )
	    }
	  }
	  
	  exportMenu.setFilename = function ( filename ){
	    exportFilename = filename || "export";
	  };
	  
	  exportMenu.setJsonText = function ( jsonText ){
	    exportableJsonText = jsonText;
	  };
	  
	  function copyUrl(){
	    d3.select("#exportedUrl").node().focus();
	    d3.select("#exportedUrl").node().select();
	    document.execCommand("copy");
	    graph.options().navigationMenu().hideAllMenus();
	    d3.event.preventDefault(); // prevent the href to be called ( reloads the page otherwise )
	  }
	  
	  function prepareOptionString( defOpts, currOpts ){
	    var setOptions = 0;
	    var optsString = "opts=";
	    
	    for ( var name in defOpts ) {
	      // define key and value ;
	      if ( defOpts.hasOwnProperty(name) ) {// for travis warning
	        var def_value = defOpts[name];
	        var cur_value = currOpts[name];
	        if ( def_value !== cur_value ) {
	          optsString += name + "=" + cur_value + ";";
	          setOptions++;
	        }
	      }
	    }
	    optsString += "";
	    if ( setOptions === 0 ) {
	      return "";
	    }
	    return optsString;
	  }
	  
	  exportMenu.exportAsUrl = function (){
	    var currObj = {};
	    currObj.sidebar = graph.options().sidebar().getSidebarVisibility();
	    
	    // identify default value given by ontology;
	    var defOntValue = graph.options().filterMenu().getDefaultDegreeValue();
	    var currentValue = graph.options().filterMenu().getDegreeSliderValue();
	    if ( parseInt(defOntValue) === parseInt(currentValue) ) {
	      currObj.doc = -1;
	    } else {
	      currObj.doc = currentValue;
	    }
	    
	    currObj.cd = graph.options().classDistance();
	    currObj.dd = graph.options().datatypeDistance();
	    if ( graph.editorMode() === true ) {
	      currObj.editorMode = "true";
	    } else {
	      currObj.editorMode = "false";
	    }
	    currObj.filter_datatypes = String(graph.options().filterMenu().getCheckBoxValue("datatypeFilterCheckbox"));
	    currObj.filter_sco = String(graph.options().filterMenu().getCheckBoxValue("subclassFilterCheckbox"));
	    currObj.filter_disjoint = String(graph.options().filterMenu().getCheckBoxValue("disjointFilterCheckbox"));
	    currObj.filter_setOperator = String(graph.options().filterMenu().getCheckBoxValue("setoperatorFilterCheckbox"));
	    currObj.filter_objectProperties = String(graph.options().filterMenu().getCheckBoxValue("objectPropertyFilterCheckbox"));
	    currObj.mode_dynamic = String(graph.options().dynamicLabelWidth());
	    currObj.mode_scaling = String(graph.options().modeMenu().getCheckBoxValue("nodescalingModuleCheckbox"));
	    currObj.mode_compact = String(graph.options().modeMenu().getCheckBoxValue("compactnotationModuleCheckbox"));
	    currObj.mode_colorExt = String(graph.options().modeMenu().getCheckBoxValue("colorexternalsModuleCheckbox"));
	    currObj.mode_multiColor = String(graph.options().modeMenu().colorModeState());
	    currObj.mode_pnp = String(graph.options().modeMenu().getCheckBoxValue("pickandpinModuleCheckbox"));
	    currObj.debugFeatures = String(!graph.options().getHideDebugFeatures());
	    currObj.rect = 0;
	    
	    var defObj = graph.options().initialConfig();
	    var optsString = prepareOptionString(defObj, currObj);
	    var urlString = String(location);
	    var htmlElement;
	    // when everything is default then there is nothing to write
	    if ( optsString.length === 0 ) {
	      // building up parameter list;
	      
	      // remove the all options form location
	      var hashCode = location.hash;
	      urlString = urlString.split(hashCode)[0];
	      
	      var lPos = hashCode.lastIndexOf("#");
	      if ( lPos === -1 ) {
	        htmlElement = d3.select("#exportedUrl").node();
	        htmlElement.value = String(location);
	        htmlElement.title = String(location);
	        return;  // nothing to change in the location String
	      }
	      var newURL = hashCode.slice(lPos, hashCode.length);
	      htmlElement = d3.select("#exportedUrl").node();
	      htmlElement.value = urlString + newURL;
	      htmlElement.title = urlString + newURL;
	      return;
	    }
	    
	    // generate the options string;
	    var numParameters = (urlString.match(/#/g) || []).length;
	    var newUrlString;
	    if ( numParameters === undefined || numParameters === 0 ) {
	      newUrlString = urlString + "#" + optsString;
	    }
	    if ( numParameters > 0 ) {
	      var tokens = urlString.split("#");
	      var i;
	      if ( tokens[1].indexOf("opts=") >= 0 ) {
	        tokens[1] = optsString;
	        newUrlString = tokens[0];
	      } else {
	        newUrlString = tokens[0] + "#";
	        newUrlString += optsString;
	      }
	      // append parameters
	      for ( i = 1; i < tokens.length; i++ ) {
	        if ( tokens[i].length > 0 ) {
	          newUrlString += "#" + tokens[i];
	        }
	      }
	    }
	    // building up parameter list;
	    htmlElement = d3.select("#exportedUrl").node();
	    htmlElement.value = newUrlString;
	    htmlElement.title = newUrlString;
	    
	  };
	  
	  function exportSvg(){
	    graph.options().navigationMenu().hideAllMenus();
	    // Get the d3js SVG element
	    var graphSvg = d3.select(graph.options().graphContainerSelector()).select("svg"),
	      graphSvgCode,
	      escapedGraphSvgCode,
	      dataURI;
	    
	    // inline the styles, so that the exported svg code contains the css rules
	    inlineVowlStyles();
	    hideNonExportableElements();
	    
	    graphSvgCode = graphSvg.attr("version", 1.1)
	      .attr("xmlns", "http://www.w3.org/2000/svg")
	      .node().parentNode.innerHTML;
	    
	    // Insert the reference to VOWL
	    graphSvgCode = "<!-- Created with WebVOWL (version " + webvowl.version + ")" +
	      ", http://vowl.visualdataweb.org -->\n" + graphSvgCode;
	    
	    escapedGraphSvgCode = escapeUnicodeCharacters(graphSvgCode);
	    //btoa(); Creates a base-64 encoded ASCII string from a "string" of binary data.
	    dataURI = "data:image/svg+xml;base64," + btoa(escapedGraphSvgCode);
	    
	    
	    exportSvgButton.attr("href", dataURI)
	      .attr("download", exportFilename + ".svg");
	    
	    // remove graphic styles for interaction to go back to normal
	    removeVowlInlineStyles();
	    showNonExportableElements();
	    graph.lazyRefresh();
	  }
	  
	  function escapeUnicodeCharacters( text ){
	    var textSnippets = [],
	      i, textLength = text.length,
	      character,
	      charCode;
	    
	    for ( i = 0; i < textLength; i++ ) {
	      character = text.charAt(i);
	      charCode = character.charCodeAt(0);
	      
	      if ( charCode < 128 ) {
	        textSnippets.push(character);
	      } else {
	        textSnippets.push("&#" + charCode + ";");
	      }
	    }
	    
	    return textSnippets.join("");
	  }
	  
	  function inlineVowlStyles(){
	    setStyleSensitively(".text", [{ name: "font-family", value: "Helvetica, Arial, sans-serif" }, {
	      name: "font-size",
	      value: "12px"
	    }]);
	    setStyleSensitively(".subtext", [{ name: "font-size", value: "9px" }]);
	    setStyleSensitively(".text.instance-count", [{ name: "fill", value: "#666" }]);
	    setStyleSensitively(".external + text .instance-count", [{ name: "fill", value: "#aaa" }]);
	    setStyleSensitively(".cardinality", [{ name: "font-size", value: "10px" }]);
	    setStyleSensitively(".text, .embedded", [{ name: "pointer-events", value: "none" }]);
	    setStyleSensitively(".class, .object, .disjoint, .objectproperty, .disjointwith, .equivalentproperty, .transitiveproperty, .functionalproperty, .inversefunctionalproperty, .symmetricproperty, .allvaluesfromproperty, .somevaluesfromproperty", [{
	      name: "fill",
	      value: "#acf"
	    }]);
	    setStyleSensitively(".label .datatype, .datatypeproperty", [{ name: "fill", value: "#9c6" }]);
	    setStyleSensitively(".rdf, .rdfproperty", [{ name: "fill", value: "#c9c" }]);
	    setStyleSensitively(".literal, .node .datatype", [{ name: "fill", value: "#fc3" }]);
	    setStyleSensitively(".deprecated, .deprecatedproperty", [{ name: "fill", value: "#ccc" }]);
	    setStyleSensitively(".external, .externalproperty", [{ name: "fill", value: "#36c" }]);
	    setStyleSensitively("path, .nofill", [{ name: "fill", value: "none" }]);
	    setStyleSensitively("marker path", [{ name: "fill", value: "#000" }]);
	    setStyleSensitively(".class, path, line, .fineline", [{ name: "stroke", value: "#000" }]);
	    setStyleSensitively(".white, .subclass, .subclassproperty, .external + text", [{ name: "fill", value: "#fff" }]);
	    setStyleSensitively(".class.hovered, .property.hovered, .cardinality.hovered, .cardinality.focused, circle.pin, .filled.hovered, .filled.focused", [{
	      name: "fill",
	      value: "#f00"
	    }, { name: "cursor", value: "pointer" }]);
	    setStyleSensitively(".focused, path.hovered", [{ name: "stroke", value: "#f00" }]);
	    setStyleSensitively(".indirect-highlighting, .feature:hover", [{ name: "fill", value: "#f90" }]);
	    setStyleSensitively(".values-from", [{ name: "stroke", value: "#69c" }]);
	    setStyleSensitively(".symbol, .values-from.filled", [{ name: "fill", value: "#69c" }]);
	    setStyleSensitively(".class, path, line", [{ name: "stroke-width", value: "2" }]);
	    setStyleSensitively(".fineline", [{ name: "stroke-width", value: "1" }]);
	    setStyleSensitively(".dashed, .anonymous", [{ name: "stroke-dasharray", value: "8" }]);
	    setStyleSensitively(".dotted", [{ name: "stroke-dasharray", value: "3" }]);
	    setStyleSensitively("rect.focused, circle.focused", [{ name: "stroke-width", value: "4px" }]);
	    setStyleSensitively(".nostroke", [{ name: "stroke", value: "none" }]);
	    setStyleSensitively("marker path", [{ name: "stroke-dasharray", value: "100" }]);
	  }
	  
	  function setStyleSensitively( selector, styles ){
	    var elements = d3.selectAll(selector);
	    if ( elements.empty() ) {
	      return;
	    }
	    
	    styles.forEach(function ( style ){
	      elements.each(function (){
	        var element = d3.select(this);
	        if ( !shouldntChangeInlineCss(element, style.name) ) {
	          element.style(style.name, style.value);
	        }
	      });
	    });
	  }
	  
	  function shouldntChangeInlineCss( element, style ){
	    return style === "fill" && hasBackgroundColorSet(element);
	  }
	  
	  function hasBackgroundColorSet( element ){
	    var data = element.datum();
	    if ( data === undefined ) {
	      return false;
	    }
	    return data.backgroundColor && !!data.backgroundColor();
	  }
	  
	  /**
	   * For example the pin of the pick&pin module should be invisible in the exported graphic.
	   */
	  function hideNonExportableElements(){
	    d3.selectAll(".hidden-in-export").style("display", "none");
	  }
	  
	  function removeVowlInlineStyles(){
	    d3.selectAll(".text, .subtext, .text.instance-count, .external + text .instance-count, .cardinality, .text, .embedded, .class, .object, .disjoint, .objectproperty, .disjointwith, .equivalentproperty, .transitiveproperty, .functionalproperty, .inversefunctionalproperty, .symmetricproperty, .allvaluesfromproperty, .somevaluesfromproperty, .label .datatype, .datatypeproperty, .rdf, .rdfproperty, .literal, .node .datatype, .deprecated, .deprecatedproperty, .external, .externalproperty, path, .nofill, .symbol, .values-from.filled, marker path, .class, path, line, .fineline, .white, .subclass, .subclassproperty, .external + text, .class.hovered, .property.hovered, .cardinality.hovered, .cardinality.focused, circle.pin, .filled.hovered, .filled.focused, .focused, path.hovered, .indirect-highlighting, .feature:hover, .values-from, .class, path, line, .fineline, .dashed, .anonymous, .dotted, rect.focused, circle.focused, .nostroke, marker path")
	      .each(function (){
	        var element = d3.select(this);
	        
	        var inlineStyles = element.node().style;
	        for ( var styleName in inlineStyles ) {
	          if ( inlineStyles.hasOwnProperty(styleName) ) {
	            if ( shouldntChangeInlineCss(element, styleName) ) {
	              continue;
	            }
	            element.style(styleName, null);
	          }
	        }
	        
	        if ( element.datum && element.datum() !== undefined && element.datum().type ) {
	          if ( element.datum().type() === "rdfs:subClassOf" ) {
	            element.style("fill", null);
	          }
	        }
	      });
	    
	    // repair svg icons in the menu;
	    var scrollContainer = d3.select("#menuElementContainer").node();
	    var controlElements = scrollContainer.children;
	    var numEntries = controlElements.length;
	    
	    for ( var i = 0; i < numEntries; i++ ) {
	      var currentMenu = controlElements[i].id;
	      d3.select("#" + currentMenu).select("path").style("stroke-width", "0");
	      d3.select("#" + currentMenu).select("path").style("fill", "#fff");
	    }
	    
	    d3.select("#magnifyingGlass").style("stroke-width", "0");
	    d3.select("#magnifyingGlass").style("fill", "#666");
	    
	  }
	  
	  function showNonExportableElements(){
	    d3.selectAll(".hidden-in-export").style("display", null);
	  }
	  
	  exportMenu.createJSON_exportObject = function (){
	    var i, j, k; // an index variable for the for-loops
	    
	    /** get data for exporter **/
	      if (!graph.options().data()) {return {};} // return an empty json object
	      // extract onotology information;
	    var unfilteredData = graph.getUnfilteredData();
	    var ontologyComment = graph.options().data()._comment;
	    var metaObj = graph.options().getGeneralMetaObject();
	    var header = graph.options().data().header;
	    
	    if ( metaObj.iri && metaObj.iri !== header.iri ) {
	      header.iri = metaObj.iri;
	    }
	    if ( metaObj.title && metaObj.title !== header.title ) {
	      header.title = metaObj.title;
	    }
	    if ( metaObj.version && metaObj.version !== header.version ) {
	      header.version = metaObj.version;
	    }
	    if ( metaObj.author && metaObj.author !== header.author ) {
	      header.author = metaObj.author;
	    }
	    if ( metaObj.description && metaObj.description !== header.description ) {
	      header.description = metaObj.description;
	    }
	    
	    
	    var exportText = {};
	    exportText._comment = ontologyComment;
	    exportText.header = header;
	    exportText.namespace = graph.options().data().namespace;
	    if ( exportText.namespace === undefined ) {
	      exportText.namespace = []; // just an empty namespace array
	    }
	    // we do have now the unfiltered data which needs to be transfered to class/classAttribute and property/propertyAttribute
	    
	    
	    // var classAttributeString='classAttribute:[ \n';
	    var nodes = unfilteredData.nodes;
	    var nLen = nodes.length; // hope for compiler unroll
	    var classObjects = [];
	    var classAttributeObjects = [];
	    for ( i = 0; i < nLen; i++ ) {
	      var classObj = {};
	      var classAttr = {};
	      classObj.id = nodes[i].id();
	      classObj.type = nodes[i].type();
	      classObjects.push(classObj);
	      
	      // define the attributes object
	      classAttr.id = nodes[i].id();
	      classAttr.iri = nodes[i].iri();
	      classAttr.baseIri = nodes[i].baseIri();
	      classAttr.label = nodes[i].label();
	      
	      if ( nodes[i].attributes().length > 0 ) {
	        classAttr.attributes = nodes[i].attributes();
	      }
	      if ( nodes[i].comment() ) {
	        classAttr.comment = nodes[i].comment();
	      }
	      if ( nodes[i].annotations() ) {
	        classAttr.annotations = nodes[i].annotations();
	      }
	      if ( nodes[i].description() ) {
	        classAttr.description = nodes[i].description();
	      }
	      
	      
	      if ( nodes[i].individuals().length > 0 ) {
	        var classIndividualElements = [];
	        var nIndividuals = nodes[i].individuals();
	        for ( j = 0; j < nIndividuals.length; j++ ) {
	          var indObj = {};
	          indObj.iri = nIndividuals[j].iri();
	          indObj.baseIri = nIndividuals[j].baseIri();
	          indObj.labels = nIndividuals[j].label();
	          if ( nIndividuals[j].annotations() ) {
	            indObj.annotations = nIndividuals[j].annotations();
	          }
	          if ( nIndividuals[j].description() ) {
	            indObj.description = nIndividuals[j].description();
	          }
	          if ( nIndividuals[j].comment() ) {
	            indObj.comment = nIndividuals[j].comment();
	          }
	          classIndividualElements.push(indObj);
	        }
	        classAttr.individuals = classIndividualElements;
	      }
	      
	      var equalsForAttributes = undefined;
	      if ( nodes[i].equivalents().length > 0 ) {
	        equalsForAttributes = [];
	        var equals = nodes[i].equivalents();
	        for ( j = 0; j < equals.length; j++ ) {
	          var eqObj = {};
	          var eqAttr = {};
	          eqObj.id = equals[j].id();
	          equalsForAttributes.push(equals[j].id());
	          eqObj.type = equals[j].type();
	          classObjects.push(eqObj);
	          
	          eqAttr.id = equals[j].id();
	          eqAttr.iri = equals[j].iri();
	          eqAttr.baseIri = equals[j].baseIri();
	          eqAttr.label = equals[j].label();
	          
	          if ( equals[j].attributes().length > 0 ) {
	            eqAttr.attributes = equals[j].attributes();
	          }
	          if ( equals[j].comment() ) {
	            eqAttr.comment = equals[j].comment();
	          }
	          if ( equals[j].individuals().length > 0 ) {
	            eqAttr.individuals = equals[j].individuals();
	          }
	          if ( equals[j].annotations() ) {
	            eqAttr.annotations = equals[j].annotations();
	          }
	          if ( equals[j].description() ) {
	            eqAttr.description = equals[j].description();
	          }
	          
	          if ( equals[j].individuals().length > 0 ) {
	            var e_classIndividualElements = [];
	            var e_nIndividuals = equals[i].individuals();
	            for ( k = 0; k < e_nIndividuals.length; k++ ) {
	              var e_indObj = {};
	              e_indObj.iri = e_nIndividuals[k].iri();
	              e_indObj.baseIri = e_nIndividuals[k].baseIri();
	              e_indObj.labels = e_nIndividuals[k].label();
	              
	              if ( e_nIndividuals[k].annotations() ) {
	                e_indObj.annotations = e_nIndividuals[k].annotations();
	              }
	              if ( e_nIndividuals[k].description() ) {
	                e_indObj.description = e_nIndividuals[k].description();
	              }
	              if ( e_nIndividuals[k].comment() ) {
	                e_indObj.comment = e_nIndividuals[k].comment();
	              }
	              e_classIndividualElements.push(e_indObj);
	            }
	            eqAttr.individuals = e_classIndividualElements;
	          }
	          
	          classAttributeObjects.push(eqAttr);
	        }
	      }
	      if ( equalsForAttributes && equalsForAttributes.length > 0 ) {
	        classAttr.equivalent = equalsForAttributes;
	      }
	      
	      // classAttr.subClasses=nodes[i].subClasses(); // not needed
	      // classAttr.instances=nodes[i].instances();
	      
	      //
	      // .complement(element.complement)
	      // .disjointUnion(element.disjointUnion)
	      // .description(element.description)
	      // .equivalents(element.equivalent)
	      // .intersection(element.intersection)
	      // .type(element.type) Ignore, because we predefined it
	      // .union(element.union)
	      classAttributeObjects.push(classAttr);
	    }
	    
	    /** -- properties -- **/
	    var properties = unfilteredData.properties;
	    var pLen = properties.length; // hope for compiler unroll
	    var propertyObjects = [];
	    var propertyAttributeObjects = [];
	    
	    for ( i = 0; i < pLen; i++ ) {
	      var pObj = {};
	      var pAttr = {};
	      pObj.id = properties[i].id();
	      pObj.type = properties[i].type();
	      propertyObjects.push(pObj);
	      
	      // // define the attributes object
	      pAttr.id = properties[i].id();
	      pAttr.iri = properties[i].iri();
	      pAttr.baseIri = properties[i].baseIri();
	      pAttr.label = properties[i].label();
	      
	      if ( properties[i].attributes().length > 0 ) {
	        pAttr.attributes = properties[i].attributes();
	      }
	      if ( properties[i].comment() ) {
	        pAttr.comment = properties[i].comment();
	      }
	      
	      if ( properties[i].annotations() ) {
	        pAttr.annotations = properties[i].annotations();
	      }
	      if ( properties[i].maxCardinality() ) {
	        pAttr.maxCardinality = properties[i].maxCardinality();
	      }
	      if ( properties[i].minCardinality() ) {
	        pAttr.minCardinality = properties[i].minCardinality();
	      }
	      if ( properties[i].cardinality() ) {
	        pAttr.cardinality = properties[i].cardinality();
	      }
	      if ( properties[i].description() ) {
	        pAttr.description = properties[i].description();
	      }
	      
	      pAttr.domain = properties[i].domain().id();
	      pAttr.range = properties[i].range().id();
	      // sub properties;
	      if ( properties[i].subproperties() ) {
	        var subProps = properties[i].subproperties();
	        var subPropsIdArray = [];
	        for ( j = 0; j < subProps.length; j++ ) {
	          if ( subProps[j].id )
	            subPropsIdArray.push(subProps[j].id());
	        }
	        pAttr.subproperty = subPropsIdArray;
	      }
	      
	      // super properties
	      if ( properties[i].superproperties() ) {
	        var superProps = properties[i].superproperties();
	        var superPropsIdArray = [];
	        for ( j = 0; j < superProps.length; j++ ) {
	          if ( superProps[j].id )
	            superPropsIdArray.push(superProps[j].id());
	        }
	        pAttr.superproperty = superPropsIdArray;
	      }
	      
	      // check for inverse element
	      if ( properties[i].inverse() ) {
	        if ( properties[i].inverse().id )
	          pAttr.inverse = properties[i].inverse().id();
	      }
	      propertyAttributeObjects.push(pAttr);
	    }
	    
	    exportText.class = classObjects;
	    exportText.classAttribute = classAttributeObjects;
	    exportText.property = propertyObjects;
	    exportText.propertyAttribute = propertyAttributeObjects;
	    
	    
	    var nodeElements = graph.graphNodeElements();  // get visible nodes
	    var propElements = graph.graphLabelElements(); // get visible labels
	    // var jsonObj = JSON.parse(exportableJsonText);	   // reparse the original input json
	    
	    /** modify comment **/
	    var comment = exportText._comment;
	    var additionalString = " [Additional Information added by WebVOWL Exporter Version: " + "1.1.7" + "]";
	    // adding new string to comment only if it does not exist
	    if ( comment.indexOf(additionalString) === -1 ) {
	      exportText._comment = comment + " [Additional Information added by WebVOWL Exporter Version: " + "1.1.7" + "]";
	    }
	    
	    var classAttribute = exportText.classAttribute;
	    var propAttribute = exportText.propertyAttribute;
	    /**  remove previously stored variables **/
	    for ( i = 0; i < classAttribute.length; i++ ) {
	      var classObj_del = classAttribute[i];
	      delete classObj_del.pos;
	      delete classObj_del.pinned;
	    }
	    var propertyObj;
	    for ( i = 0; i < propAttribute.length; i++ ) {
	      propertyObj = propAttribute[i];
	      delete propertyObj.pos;
	      delete propertyObj.pinned;
	    }
	    /**  add new variables to jsonObj  **/
	    // class attribute variables
	    nodeElements.each(function ( node ){
	      var nodeId = node.id();
	      for ( i = 0; i < classAttribute.length; i++ ) {
	        var classObj = classAttribute[i];
	        if ( classObj.id === nodeId ) {
	          // store relative positions
	          classObj.pos = [parseFloat(node.x.toFixed(2)), parseFloat(node.y.toFixed(2))];
	          if ( node.pinned() )
	            classObj.pinned = true;
	          break;
	        }
	      }
	    });
	    // property attribute variables
	    for ( j = 0; j < propElements.length; j++ ) {
	      var correspondingProp = propElements[j].property();
	      for ( i = 0; i < propAttribute.length; i++ ) {
	        propertyObj = propAttribute[i];
	        if ( propertyObj.id === correspondingProp.id() ) {
	          propertyObj.pos = [parseFloat(propElements[j].x.toFixed(2)), parseFloat(propElements[j].y.toFixed(2))];
	          if ( propElements[j].pinned() )
	            propertyObj.pinned = true;
	          break;
	        }
	      }
	    }
	    /** create the variable for settings and set their values **/
	    exportText.settings = {};
	    
	    // Global Settings
	    var zoom = graph.scaleFactor();
	    var paused = graph.paused();
	    var translation = [parseFloat(graph.translation()[0].toFixed(2)), parseFloat(graph.translation()[1].toFixed(2))];
	    exportText.settings.global = {};
	    exportText.settings.global.zoom = zoom.toFixed(2);
	    exportText.settings.global.translation = translation;
	    exportText.settings.global.paused = paused;
	    
	    // shared variable declaration
	    var cb_text;
	    var isEnabled;
	    var cb_obj;
	    
	    // Gravity Settings
	    var classDistance = graph.options().classDistance();
	    var datatypeDistance = graph.options().datatypeDistance();
	    exportText.settings.gravity = {};
	    exportText.settings.gravity.classDistance = classDistance;
	    exportText.settings.gravity.datatypeDistance = datatypeDistance;
	    
	    // Filter Settings
	    var fMenu = graph.options().filterMenu();
	    var fContainer = fMenu.getCheckBoxContainer();
	    var cbCont = [];
	    for ( i = 0; i < fContainer.length; i++ ) {
	      cb_text = fContainer[i].checkbox.attr("id");
	      isEnabled = fContainer[i].checkbox.property("checked");
	      cb_obj = {};
	      cb_obj.id = cb_text;
	      cb_obj.checked = isEnabled;
	      cbCont.push(cb_obj);
	    }
	    var degreeSliderVal = fMenu.getDegreeSliderValue();
	    exportText.settings.filter = {};
	    exportText.settings.filter.checkBox = cbCont;
	    exportText.settings.filter.degreeSliderValue = degreeSliderVal;
	    
	    // Modes Settings
	    var mMenu = graph.options().modeMenu();
	    var mContainer = mMenu.getCheckBoxContainer();
	    var cb_modes = [];
	    for ( i = 0; i < mContainer.length; i++ ) {
	      cb_text = mContainer[i].attr("id");
	      isEnabled = mContainer[i].property("checked");
	      cb_obj = {};
	      cb_obj.id = cb_text;
	      cb_obj.checked = isEnabled;
	      cb_modes.push(cb_obj);
	    }
	    var colorSwitchState = mMenu.colorModeState();
	    exportText.settings.modes = {};
	    exportText.settings.modes.checkBox = cb_modes;
	    exportText.settings.modes.colorSwitchState = colorSwitchState;
	    
	    var exportObj = {};
	    // todo: [ ] find better way for ordering the objects
	    // hack for ordering of objects, so settings is after metrics
	    exportObj._comment = exportText._comment;
	    exportObj.header = exportText.header;
	    exportObj.namespace = exportText.namespace;
	    exportObj.metrics = exportText.metrics;
	    exportObj.settings = exportText.settings;
	    exportObj.class = exportText.class;
	    exportObj.classAttribute = exportText.classAttribute;
	    exportObj.property = exportText.property;
	    exportObj.propertyAttribute = exportText.propertyAttribute;
	    
	    return exportObj;
	  };
	  
	  function exportJson(){
	    graph.options().navigationMenu().hideAllMenus();
	    /**  check if there is data **/
	    if ( !exportableJsonText ) {
	      alert("No graph data available.");
	      // Stop the redirection to the path of the href attribute
	      d3.event.preventDefault();
	      return;
	    }
	    
	    var exportObj = exportMenu.createJSON_exportObject();
	    
	    // make a string again;
	    var exportText = JSON.stringify(exportObj, null, '  ');
	    // write the data
	    var dataURI = "data:text/json;charset=utf-8," + encodeURIComponent(exportText);
	    var jsonExportFileName = exportFilename;
	    
	    if ( !jsonExportFileName.endsWith(".json") )
	      jsonExportFileName += ".json";
	    exportJsonButton.attr("href", dataURI)
	      .attr("download", jsonExportFileName);
	  }
	  
	  var curveFunction = d3.svg.line()
	    .x(function ( d ){
	      return d.x;
	    })
	    .y(function ( d ){
	      return d.y;
	    })
	    .interpolate("cardinal");
	  var loopFunction = d3.svg.line()
	    .x(function ( d ){
	      return d.x;
	    })
	    .y(function ( d ){
	      return d.y;
	    })
	    .interpolate("cardinal")
	    .tension(-1);
	  
	  function exportTex(){
	    var zoom = graph.scaleFactor();
	    var grTranslate = graph.translation();
	    var bbox = graph.getBoundingBoxForTex();
	    var comment = " %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n";
	    comment += " %        Generated with the experimental alpha version of the TeX exporter of WebVOWL (version 1.1.3) %%% \n";
	    comment += " %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n";
	    comment += " %   The content can be used as import in other TeX documents. \n";
	    comment += " %   Parent document has to use the following packages   \n";
	    comment += " %   \\usepackage{tikz}  \n";
	    comment += " %   \\usepackage{helvet}  \n";
	    comment += " %   \\usetikzlibrary{decorations.markings,decorations.shapes,decorations,arrows,automata,backgrounds,petri,shapes.geometric}  \n";
	    comment += " %   \\usepackage{xcolor}  \n\n";
	    comment += " %%%%%%%%%%%%%%% Example Parent Document %%%%%%%%%%%%%%%%%%%%%%%\n";
	    comment += " %\\documentclass{article} \n";
	    comment += " %\\usepackage{tikz} \n";
	    comment += " %\\usepackage{helvet} \n";
	    comment += " %\\usetikzlibrary{decorations.markings,decorations.shapes,decorations,arrows,automata,backgrounds,petri,shapes.geometric} \n";
	    comment += " %\\usepackage{xcolor} \n\n";
	    comment += " %\\begin{document} \n";
	    comment += " %\\section{Example} \n";
	    comment += " %  This is an example. \n";
	    comment += " %  \\begin{figure} \n";
	    comment += " %    \\input{<THIS_FILE_NAME>} % << tex file name for the graph \n";
	    comment += " %    \\caption{A generated graph with TKIZ using alpha version of the TeX exporter of WebVOWL (version 1.1.3) } \n";
	    comment += " %  \\end{figure} \n";
	    comment += " %\\end{document} \n";
	    comment += " %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n";
	    
	    
	    var texString = comment + "\\definecolor{imageBGCOLOR}{HTML}{FFFFFF} \n" +
	      "\\definecolor{owlClassColor}{HTML}{AACCFF}\n" +
	      "\\definecolor{owlObjectPropertyColor}{HTML}{AACCFF}\n" +
	      "\\definecolor{owlExternalClassColor}{HTML}{AACCFF}\n" +
	      "\\definecolor{owlDatatypePropertyColor}{HTML}{99CC66}\n" +
	      "\\definecolor{owlDatatypeColor}{HTML}{FFCC33}\n" +
	      "\\definecolor{owlThingColor}{HTML}{FFFFFF}\n" +
	      "\\definecolor{valuesFrom}{HTML}{6699CC}\n" +
	      "\\definecolor{rdfPropertyColor}{HTML}{CC99CC}\n" +
	      "\\definecolor{unionColor}{HTML}{6699cc}\n" +
	      "\\begin{center} \n" +
	      "\\resizebox{\\linewidth}{!}{\n" +
	      
	      "\\begin{tikzpicture}[framed]\n" +
	      "\\clip (" + bbox[0] + "pt , " + bbox[1] + "pt ) rectangle (" + bbox[2] + "pt , " + bbox[3] + "pt);\n" +
	      "\\tikzstyle{dashed}=[dash pattern=on 4pt off 4pt] \n" +
	      "\\tikzstyle{dotted}=[dash pattern=on 2pt off 2pt] \n" +
	      "\\fontfamily{sans-serif}{\\fontsize{12}{12}\\selectfont}\n \n";
	    
	    
	    texString += "\\tikzset{triangleBlack/.style = {fill=black, draw=black, line width=1pt,scale=0.7,regular polygon, regular polygon sides=3} }\n";
	    texString += "\\tikzset{triangleWhite/.style = {fill=white, draw=black, line width=1pt,scale=0.7,regular polygon, regular polygon sides=3} }\n";
	    texString += "\\tikzset{triangleBlue/.style  = {fill=valuesFrom, draw=valuesFrom, line width=1pt,scale=0.7,regular polygon, regular polygon sides=3} }\n";
	    
	    texString += "\\tikzset{Diamond/.style = {fill=white, draw=black, line width=2pt,scale=1.2,regular polygon, regular polygon sides=4} }\n";
	    
	    
	    texString += "\\tikzset{Literal/.style={rectangle,align=center,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "black, draw=black, dashed, line width=1pt, fill=owlDatatypeColor, minimum width=80pt,\n" +
	      "minimum height = 20pt}}\n\n";
	    
	    texString += "\\tikzset{Datatype/.style={rectangle,align=center,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "black, draw=black, line width=1pt, fill=owlDatatypeColor, minimum width=80pt,\n" +
	      "minimum height = 20pt}}\n\n";
	    
	    
	    texString += "\\tikzset{owlClass/.style={circle, inner sep=0mm,align=center, \n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "black, draw=black, line width=1pt, fill=owlClassColor, minimum size=101pt}}\n\n";
	    
	    texString += "\\tikzset{anonymousClass/.style={circle, inner sep=0mm,align=center, \n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "black, dashed, draw=black, line width=1pt, fill=owlClassColor, minimum size=101pt}}\n\n";
	    
	    
	    texString += "\\tikzset{owlThing/.style={circle, inner sep=0mm,align=center,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "black, dashed, draw=black, line width=1pt, fill=owlThingColor, minimum size=62pt}}\n\n";
	    
	    
	    texString += "\\tikzset{owlObjectProperty/.style={rectangle,align=center,\n" +
	      "inner sep=0mm,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "fill=owlObjectPropertyColor, minimum width=80pt,\n" +
	      "minimum height = 25pt}}\n\n";
	    
	    texString += "\\tikzset{rdfProperty/.style={rectangle,align=center,\n" +
	      "inner sep=0mm,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "fill=rdfPropertyColor, minimum width=80pt,\n" +
	      "minimum height = 25pt}}\n\n";
	    
	    
	    texString += "\\tikzset{owlDatatypeProperty/.style={rectangle,align=center,\n" +
	      "fill=owlDatatypePropertyColor, minimum width=80pt,\n" +
	      "inner sep=0mm,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "minimum height = 25pt}}\n\n";
	    
	    texString += "\\tikzset{rdfsSubClassOf/.style={rectangle,align=center,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "inner sep=0mm,\n" +
	      "fill=imageBGCOLOR, minimum width=80pt,\n" +
	      "minimum height = 25pt}}\n\n";
	    
	    texString += "\\tikzset{unionOf/.style={circle, inner sep=0mm,align=center,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "black, draw=black, line width=1pt, fill=unionColor, minimum size=25pt}}\n\n";
	    
	    texString += "\\tikzset{disjointWith/.style={circle, inner sep=0mm,align=center,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "black, draw=black, line width=1pt, fill=unionColor, minimum size=20pt}}\n\n";
	    
	    
	    texString += "\\tikzset{owlEquivalentClass/.style={circle,align=center,\n" +
	      "font={\\fontsize{12pt}{12}\\selectfont \\sffamily },\n" +
	      "inner sep=0mm,\n" +
	      "black, solid, draw=black, line width=3pt, fill=owlExternalClassColor, minimum size=101pt,\n" +
	      "postaction = {draw,line width=1pt, white}}}\n\n";
	    
	    // draw a bounding box;
	    
	    // get bbox coordinates;
	    
	    
	    graph.options().navigationMenu().hideAllMenus();
	    /**  check if there is data **/
	    if ( !exportableJsonText ) {
	      alert("No graph data available.");
	      // Stop the redirection to the path of the href attribute
	      d3.event.preventDefault();
	      return;
	    }
	    
	    var i = 0, identifier;
	    
	    /** get data for exporter **/
	    var nodeElements = graph.graphNodeElements();  // get visible nodes
	    var propElements = graph.graphLabelElements(); // get visible labels
	    var links = graph.graphLinkElements();
	    
	    // export only nodes;
	    // draw Links;
	    for ( i = 0; i < links.length; i++ ) {
	      var link = links[i];
	      // console.log("\n****************\nInverstigating Link for property "+link.property().labelForCurrentLanguage());
	      
	      var prop = link.property();
	      var dx, dy, px, py, rx, ry;
	      var colorStr = "black";
	      var linkDomainIntersection;
	      var linkRangeIntersection;
	      var center;
	      var linkStyle = "";
	      var isLoop = "";
	      var curvePoint;
	      var pathStart;
	      var pathEnd;
	      var controlPoints;
	      var len;
	      var ahAngle;
	      var pathLen;
	      var markerOffset = 7;
	      
	      var arrowType = "triangleBlack";
	      var linkWidth = ",line width=2pt";
	      if ( prop.linkType ) {
	        if ( prop.linkType() === "dotted" ) {
	          //stroke-dasharray: 3;
	          linkStyle = ", dotted ";
	          arrowType = "triangleWhite";
	        }
	        if ( prop.linkType() === "dashed" ) {
	          //stroke-dasharray: 3;
	          linkStyle = ", dashed ";
	        }
	        
	        if ( prop.linkType() === "values-from" ) {
	          colorStr = "valuesFrom";
	        }
	        
	      }
	      
	      var startX, startY, endX, endY, normX, normY, lg;
	      
	      if ( link.layers().length === 1 && !link.loops() ) {
	        
	        linkDomainIntersection = graph.math().calculateIntersection(link.range(), link.domain(), 1);
	        linkRangeIntersection = graph.math().calculateIntersection(link.domain(), link.range(), 1);
	        center = graph.math().calculateCenter(linkDomainIntersection, linkRangeIntersection);
	        dx = linkDomainIntersection.x;
	        dy = -linkDomainIntersection.y;
	        px = center.x;
	        py = -center.y;
	        rx = linkRangeIntersection.x;
	        ry = -linkRangeIntersection.y;
	        
	        
	        pathStart = linkDomainIntersection;
	        curvePoint = center;
	        pathEnd = linkRangeIntersection;
	        
	        var nx = rx - px;
	        var ny = ry - py;
	        
	        // normalize ;
	        len = Math.sqrt(nx * nx + ny * ny);
	        
	        nx = nx / len;
	        ny = ny / len;
	        
	        ahAngle = Math.atan2(ny, nx) * (180 / Math.PI);
	        normX = nx;
	        normY = ny;
	      }
	      else {
	        if ( link.isLoop() ) {
	          isLoop = ", tension=3";
	          controlPoints = graph.math().calculateLoopPoints(link);
	          pathStart = controlPoints[0];
	          curvePoint = controlPoints[1];
	          pathEnd = controlPoints[2];
	        } else {
	          curvePoint = link.label();
	          pathStart = graph.math().calculateIntersection(curvePoint, link.domain(), 1);
	          pathEnd = graph.math().calculateIntersection(curvePoint, link.range(), 1);
	        }
	        dx = pathStart.x;
	        dy = -pathStart.y;
	        px = curvePoint.x;
	        py = -curvePoint.y;
	        rx = pathEnd.x;
	        ry = -pathEnd.y;
	      }
	      
	      texString += "\\draw [" + colorStr + linkStyle + linkWidth + isLoop + "] plot [smooth] coordinates {(" +
	        dx + "pt, " + dy + "pt) (" + px + "pt, " + py + "pt)  (" + rx + "pt, " + ry + "pt)};\n";
	      
	      
	      if ( link.property().markerElement() === undefined ) continue;
	      
	      // add arrow head;
	      
	      
	      if ( link.property().type() === "owl:someValuesFrom" || link.property().type() === "owl:allValuesFrom" ) {
	        arrowType = "triangleBlue";
	      }
	      
	      lg = link.pathObj();
	      pathLen = Math.floor(lg.node().getTotalLength());
	      var p1 = lg.node().getPointAtLength(pathLen - 4);
	      var p2 = lg.node().getPointAtLength(pathLen);
	      var markerCenter = lg.node().getPointAtLength(pathLen - 6);
	      
	      if ( link.property().type() === "setOperatorProperty" ) {
	        p1 = lg.node().getPointAtLength(4);
	        p2 = lg.node().getPointAtLength(0);
	        markerCenter = lg.node().getPointAtLength(8);
	        arrowType = "Diamond";
	      }
	      
	      startX = p1.x;
	      startY = p1.y;
	      endX = p2.x;
	      endY = p2.y;
	      normX = endX - startX;
	      normY = endY - startY;
	      len = Math.sqrt(normX * normX + normY * normY);
	      normX = normX / len;
	      normY = normY / len;
	      
	      ahAngle = -1.0 * Math.atan2(normY, normX) * (180 / Math.PI);
	      ahAngle -= 90;
	      if ( link.property().type() === "setOperatorProperty" ) {
	        ahAngle -= 45;
	      }
	      // console.log(link.property().labelForCurrentLanguage()+ ": "+normX+ " "+normY +"  "+ahAngle);
	      rx = markerCenter.x;
	      ry = markerCenter.y;
	      if ( link.layers().length === 1 && !link.loops() ) {
	        // markerOffset=-1*m
	        ry = -1 * ry;
	        texString += "\\node[" + arrowType + ", rotate=" + ahAngle + "] at (" + rx + "pt, " + ry + "pt)   (single_marker" + i + ") {};\n ";
	      } else {
	        ry = -1 * ry;
	        texString += "\\node[" + arrowType + ", rotate=" + ahAngle + "] at (" + rx + "pt, " + ry + "pt)   (marker" + i + ") {};\n ";
	      }
	      
	      // if   (link.isLoop()){
	      //    rotAngle=-10+angle * (180 / Math.PI);
	      // }
	      
	      // add cardinality;
	      var cardinalityText = link.property().generateCardinalityText();
	      if ( cardinalityText && cardinalityText.length > 0 ) {
	        var cardinalityCenter = lg.node().getPointAtLength(pathLen - 18);
	        var cx = cardinalityCenter.x - (10 * normY);
	        var cy = cardinalityCenter.y + (10 * normX); // using orthonormal y Coordinate
	        cy *= -1.0;
	        var textColor = "black";
	        if ( cardinalityText.indexOf("A") > -1 ) {
	          cardinalityText = "$\\forall$";
	        }
	        if ( cardinalityText.indexOf("E") > -1 ) {
	          cardinalityText = "$\\exists$";
	        }
	        
	        
	        texString += "\\node[font={\\fontsize{12pt}{12}\\selectfont \\sffamily },text=" + textColor + "] at (" + cx + "pt, " + cy + "pt)   (cardinalityText" + i + ") {" + cardinalityText + "};\n ";
	      }
	      
	      
	      if ( link.property().inverse() ) {
	        lg = link.pathObj();
	        pathLen = Math.floor(lg.node().getTotalLength());
	        var p1_inv = lg.node().getPointAtLength(4);
	        var p2_inv = lg.node().getPointAtLength(0);
	        var markerCenter_inv = lg.node().getPointAtLength(6);
	        startX = p1_inv.x;
	        startY = p1_inv.y;
	        endX = p2_inv.x;
	        endY = p2_inv.y;
	        normX = endX - startX;
	        normY = endY - startY;
	        len = Math.sqrt(normX * normX + normY * normY);
	        normX = normX / len;
	        normY = normY / len;
	        
	        ahAngle = -1.0 * Math.atan2(normY, normX) * (180 / Math.PI);
	        ahAngle -= 90;
	        //   console.log("INV>>\n "+link.property().inverse().labelForCurrentLanguage()+ ": "+normX+ " "+normY +"  "+ahAngle);
	        rx = markerCenter_inv.x;
	        ry = markerCenter_inv.y;
	        if ( link.layers().length === 1 && !link.loops() ) {
	          // markerOffset=-1*m
	          ry = -1 * ry;
	          texString += "\\node[" + arrowType + ", rotate=" + ahAngle + "] at (" + rx + "pt, " + ry + "pt)   (INV_single_marker" + i + ") {};\n ";
	        } else {
	          ry = -1 * ry;
	          texString += "\\node[" + arrowType + ", rotate=" + ahAngle + "] at (" + rx + "pt, " + ry + "pt)   (INV_marker" + i + ") {};\n ";
	        }
	      }
	      
	      
	    }
	    
	    
	    nodeElements.each(function ( node ){
	      
	      px = node.x;
	      py = -node.y;
	      identifier = node.labelForCurrentLanguage();
	      // console.log("Writing : "+ identifier);
	      if ( identifier === undefined ) identifier = "";
	      var qType = "owlClass";
	      if ( node.type() === "owl:Thing" || node.type() === "owl:Nothing" )
	        qType = "owlThing";
	      
	      if ( node.type() === "owl:equivalentClass" ) {
	        qType = "owlEquivalentClass";
	      }
	      var textColorStr = "";
	      if ( node.textBlock ) {
	        var txtColor = node.textBlock()._textBlock().style("fill");
	        if ( txtColor === "rgb(0, 0, 0)" ) {
	          textColorStr = ", text=black";
	        }
	        if ( txtColor === "rgb(255, 255, 255)" ) {
	          textColorStr = ", text=white";
	        }
	        
	        
	        var tspans = node.textBlock()._textBlock().node().children;
	        if ( tspans[0] ) {
	          identifier = tspans[0].innerHTML;
	          if ( node.individuals() && node.individuals().length === parseInt(tspans[0].innerHTML) ) {
	            identifier = "{\\color{gray} " + tspans[0].innerHTML + " }";
	          }
	          for ( var t = 1; t < tspans.length; t++ ) {
	            if ( node.individuals() && node.individuals().length === parseInt(tspans[t].innerHTML) ) {
	              identifier += "\\\\ {\\color{gray} " + tspans[t].innerHTML + " }";
	            } else {
	              identifier += "\\\\ {\\small " + tspans[t].innerHTML + " }";
	            }
	          }
	        }
	      }
	      if ( node.type() === "rdfs:Literal" ) {
	        qType = "Literal";
	      }
	      if ( node.type() === "rdfs:Datatype" ) {
	        qType = "Datatype";
	      }
	      if ( node.attributes().indexOf("anonymous") !== -1 ) {
	        qType = "anonymousClass";
	      }
	      
	      
	      if ( node.type() === "owl:unionOf" || node.type() === "owl:complementOf" || node.type() === "owl:disjointUnionOf" || node.type() === "owl:intersectionOf" )
	        qType = "owlClass";
	      
	      var bgColorStr = "";
	      var widthString = "";
	      
	      if ( node.type() === "rdfs:Literal" || node.type() === "rdfs:Datatype" ) {
	        var width = node.width();
	        widthString = ",minimum width=" + width + "pt";
	      }
	      else {
	        widthString = ",minimum size=" + 2 * node.actualRadius() + "pt";
	        
	      }
	      if ( node.backgroundColor() ) {
	        var bgColor = node.backgroundColor();
	        bgColor.toUpperCase();
	        bgColor = bgColor.slice(1, bgColor.length);
	        texString += "\\definecolor{Node" + i + "_COLOR}{HTML}{" + bgColor + "} \n ";
	        bgColorStr = ", fill=Node" + i + "_COLOR ";
	      }
	      if ( node.attributes().indexOf("deprecated") > -1 ) {
	        texString += "\\definecolor{Node" + i + "_COLOR}{HTML}{CCCCCC} \n ";
	        bgColorStr = ", fill=Node" + i + "_COLOR ";
	      }
	      
	      var leftPos = px - 7;
	      var rightPos = px + 7;
	      var txtOffset = py + 20;
	      if ( node.type() !== "owl:unionOf" || node.type() !== "owl:disjointUnionOf" ) {
	        texString += "\\node[" + qType + " " + widthString + " " + bgColorStr + " " + textColorStr + "] at (" + px + "pt, " + py + "pt)   (Node" + i + ") {" + identifier.replaceAll("_", "\\_ ") + "};\n";
	      }
	      if ( node.type() === "owl:unionOf" ) {
	        // add symbol to it;
	        texString += "\\node[" + qType + " " + widthString + " " + bgColorStr + " " + textColorStr + "] at (" + px + "pt, " + py + "pt)   (Node" + i + ") {};\n";
	        texString += "\\node[unionOf   , text=black] at (" + leftPos + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[unionOf   , text=black] at (" + rightPos + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[unionOf ,fill=none   , text=black] at (" + leftPos + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[text=black] at (" + px + "pt, " + py + "pt)  (unionText13) {$\\mathbf{\\cup}$};\n";
	        texString += "\\node[font={\\fontsize{12pt}{12}\\selectfont \\sffamily }" + textColorStr + "] at (" + px + "pt, " + txtOffset + "pt)   (Node_text" + i + ") {" + identifier.replaceAll("_", "\\_ ") + "};\n";
	      }
	      // OWL DISJOINT UNION OF
	      if ( node.type() === "owl:disjointUnionOf" ) {
	        texString += "\\node[" + qType + " " + widthString + " " + bgColorStr + " " + textColorStr + "] at (" + px + "pt, " + py + "pt)   (Node" + i + ") {};\n";
	        texString += "\\node[unionOf   , text=black] at (" + leftPos + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[unionOf   , text=black] at (" + rightPos + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[unionOf ,fill=none   , text=black] at (" + leftPos + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[font={\\fontsize{12pt}{12}\\selectfont \\sffamily }" + textColorStr + "] at (" + px + "pt, " + py + "pt)  (disjointUnoinText" + i + ") {1};\n";
	        texString += "\\node[font={\\fontsize{12pt}{12}\\selectfont \\sffamily }" + textColorStr + "] at (" + px + "pt, " + txtOffset + "pt)   (Node_text" + i + ") {" + identifier.replaceAll("_", "\\_ ") + "};\n";
	      }
	      // OWL COMPLEMENT OF
	      if ( node.type() === "owl:complementOf" ) {
	        // add symbol to it;
	        texString += "\\node[" + qType + " " + widthString + " " + bgColorStr + " " + textColorStr + "] at (" + px + "pt, " + py + "pt)   (Node" + i + ") {};\n";
	        texString += "\\node[unionOf   , text=black] at (" + px + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[font={\\fontsize{18pt}{18}\\selectfont \\sffamily }" + textColorStr + "] at (" + px + "pt, " + py + "pt)  (unionText13) {$\\neg$};\n";
	        texString += "\\node[font={\\fontsize{12pt}{12}\\selectfont \\sffamily }" + textColorStr + "] at (" + px + "pt, " + txtOffset + "pt)   (Node_text" + i + ") {" + identifier.replaceAll("_", "\\_ ") + "};\n";
	      }
	      // OWL INTERSECTION OF
	      if ( node.type() === "owl:intersectionOf" ) {
	        texString += "\\node[" + qType + " " + widthString + " " + bgColorStr + " " + textColorStr + "] at (" + px + "pt, " + py + "pt)   (Node" + i + ") {};\n";
	        texString += "\\node[unionOf   , text=black] at (" + leftPos + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[unionOf   , text=black] at (" + rightPos + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[unionOf ,fill=none   , text=black] at (" + leftPos + "pt, " + py + "pt)   (SymbolNode" + i + ") {};\n";
	        
	        // add now the outer colors;
	        texString += "\\filldraw[even odd rule,fill=owlClassColor,line width=1pt] (" + leftPos + "pt, " + py + "pt) circle (12.5pt)  (" + rightPos + "pt, " + py + "pt) circle (12.5pt);\n ";
	        
	        // add texts
	        texString += "\\node[font={\\fontsize{12pt}{12}\\selectfont \\sffamily }" + textColorStr + "] at (" + px + "pt, " + py + "pt)  (intersectionText" + i + ") {$\\cap$};\n";
	        texString += "\\node[font={\\fontsize{12pt}{12}\\selectfont \\sffamily }" + textColorStr + "] at (" + px + "pt, " + txtOffset + "pt)   (Node_text" + i + ") {" + identifier.replaceAll("_", "\\_ ") + "};\n";
	        
	      }
	      
	      
	      i++;
	      
	    });
	    for ( i = 0; i < propElements.length; i++ ) {
	      var correspondingProp = propElements[i].property();
	      var p_px = propElements[i].x;
	      var p_py = -propElements[i].y;
	      identifier = correspondingProp.labelForCurrentLanguage();
	      if ( identifier === undefined ) identifier = "";
	      var textColorStr = "";
	      if ( correspondingProp.textBlock && correspondingProp.textBlock() ) {
	        var txtColor = correspondingProp.textBlock()._textBlock().style("fill");
	        //  console.log("PropertyTextColor="+txtColor);
	        if ( txtColor === "rgb(0, 0, 0)" ) {
	          textColorStr = ", text=black";
	        }
	        if ( txtColor === "rgb(255, 255, 255)" ) {
	          textColorStr = ", text=white";
	        }
	        var tspans = correspondingProp.textBlock()._textBlock().node().children;
	        
	        // identifier=node.textBlock()._textBlock().text();
	        // console.log(tspans);
	        if ( tspans[0] ) {
	          identifier = tspans[0].innerHTML;
	          
	          for ( var t = 1; t < tspans.length; t++ ) {
	            var spanText = tspans[t].innerHTML;
	            if ( spanText.indexOf("(") > -1 ) {
	              identifier += "\\\\ {\\small " + tspans[t].innerHTML + " }";
	            }
	            else {
	              identifier += "\\\\ " + tspans[t].innerHTML;
	            }
	          }
	        }
	        else {
	        }
	      }
	      if ( correspondingProp.type() === "setOperatorProperty" ) {
	        continue; // this property does not have a label
	      }
	      var qType = "owlObjectProperty";
	      if ( correspondingProp.type() === "owl:DatatypeProperty" ) {
	        qType = "owlDatatypeProperty";
	      }
	      if ( correspondingProp.type() === "rdfs:subClassOf" ) {
	        qType = "rdfsSubClassOf";
	      }
	      if ( correspondingProp.type() === "rdf:Property" ) {
	        qType = "rdfProperty";
	      }
	      
	      
	      var bgColorStr = "";
	      if ( correspondingProp.backgroundColor() ) {
	        // console.log("Found backGround color");
	        var bgColor = correspondingProp.backgroundColor();
	        //console.log(bgColor);
	        bgColor.toUpperCase();
	        bgColor = bgColor.slice(1, bgColor.length);
	        texString += "\\definecolor{property" + i + "_COLOR}{HTML}{" + bgColor + "} \n ";
	        bgColorStr = ", fill=property" + i + "_COLOR ";
	      }
	      if ( correspondingProp.attributes().indexOf("deprecated") > -1 ) {
	        texString += "\\definecolor{property" + i + "_COLOR}{HTML}{CCCCCC} \n ";
	        bgColorStr = ", fill=property" + i + "_COLOR ";
	      }
	      
	      var widthString = "";
	      var width = correspondingProp.textWidth();
	      widthString = ",minimum width=" + width + "pt";
	      
	      
	      // OWL INTERSECTION OF
	      if ( correspondingProp.type() === "owl:disjointWith" ) {
	        var leftPos = p_px - 12;
	        var rightPos = p_px + 12;
	        var txtOffset = p_py - 20;
	        texString += "\\node[" + qType + " " + widthString + " " + bgColorStr + " " + textColorStr + "] at (" + p_px + "pt, " + p_py + "pt)   (Node" + i + ") {};\n";
	        texString += "\\node[disjointWith , text=black] at (" + leftPos + "pt, " + p_py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[disjointWith , text=black] at (" + rightPos + "pt, " + p_py + "pt)   (SymbolNode" + i + ") {};\n";
	        texString += "\\node[font={\\fontsize{12pt}{12}\\selectfont \\sffamily }" + textColorStr + "] at (" + p_px + "pt, " + txtOffset + "pt)   (Node_text" + i + ") {";
	        if ( graph.options().compactNotation() === false ) {
	          texString += "(disjoint)";
	        }
	        texString += "};\n";
	        continue;
	      }
	      
	      
	      if ( correspondingProp.inverse() ) {
	        var inv_correspondingProp = correspondingProp.inverse();
	        // create the rendering element for the inverse property;
	        var inv_identifier = inv_correspondingProp.labelForCurrentLanguage();
	        if ( inv_identifier === undefined ) inv_identifier = "";
	        var inv_textColorStr = "";
	        //console.log(inv_correspondingProp);
	        //console.log(inv_correspondingProp.textBlock());
	        
	        if ( inv_correspondingProp.textBlock && inv_correspondingProp.textBlock() ) {
	          
	          var inv_txtColor = inv_correspondingProp.textBlock()._textBlock().style("fill");
	          //  console.log("PropertyTextColor="+inv_txtColor);
	          if ( inv_txtColor === "rgb(0, 0, 0)" ) {
	            inv_textColorStr = ", text=black";
	          }
	          if ( inv_txtColor === "rgb(255, 255, 255)" ) {
	            inv_textColorStr = ", text=white";
	          }
	          var inv_tspans = inv_correspondingProp.textBlock()._textBlock().node().children;
	          
	          // identifier=node.textBlock()._textBlock().text();
	          //  console.log(inv_tspans);
	          if ( inv_tspans[0] ) {
	            inv_identifier = inv_tspans[0].innerHTML;
	            
	            for ( var inv_t = 1; inv_t < inv_tspans.length; inv_t++ ) {
	              var ispanText = inv_tspans[inv_t].innerHTML;
	              if ( ispanText.indexOf("(") > -1 ) {
	                inv_identifier += "\\\\ {\\small " + inv_tspans[inv_t].innerHTML + " }";
	              } else {
	                inv_identifier += "\\\\ " + inv_tspans[inv_t].innerHTML;
	              }
	            }
	          }
	        }
	        var inv_qType = "owlObjectProperty";
	        var inv_bgColorStr = "";
	        
	        if ( inv_correspondingProp.backgroundColor() ) {
	          //  console.log("Found backGround color");
	          var inv_bgColor = inv_correspondingProp.backgroundColor();
	          //   console.log(inv_bgColor);
	          inv_bgColor.toUpperCase();
	          inv_bgColor = inv_bgColor.slice(1, inv_bgColor.length);
	          texString += "\\definecolor{inv_property" + i + "_COLOR}{HTML}{" + inv_bgColor + "} \n ";
	          inv_bgColorStr = ", fill=inv_property" + i + "_COLOR ";
	        }
	        if ( inv_correspondingProp.attributes().indexOf("deprecated") > -1 ) {
	          texString += "\\definecolor{inv_property" + i + "_COLOR}{HTML}{CCCCCC} \n ";
	          inv_bgColorStr = ", fill=inv_property" + i + "_COLOR ";
	        }
	        
	        var inv_widthString = "";
	        var inv_width = inv_correspondingProp.textWidth();
	        
	        var pOY1 = p_py - 14;
	        var pOY2 = p_py + 14;
	        inv_widthString = ",minimum width=" + inv_width + "pt";
	        texString += "% Createing Inverse Property \n";
	        texString += "\\node[" + inv_qType + " " + inv_widthString + " " + inv_bgColorStr + " " + inv_textColorStr + "] at (" + p_px + "pt, " + pOY1 + "pt)   (property" + i + ") {" + inv_identifier.replaceAll("_", "\\_ ") + "};\n";
	        texString += "% " + inv_qType + " vs " + qType + "\n";
	        texString += "% " + inv_widthString + " vs " + widthString + "\n";
	        texString += "% " + inv_bgColorStr + " vs " + bgColorStr + "\n";
	        texString += "% " + inv_textColorStr + " vs " + textColorStr + "\n";
	        
	        texString += "\\node[" + qType + " " + widthString + " " + bgColorStr + " " + textColorStr + "] at (" + p_px + "pt, " + pOY2 + "pt)   (property" + i + ") {" + identifier.replaceAll("_", "\\_ ") + "};\n";
	        
	      } else {
	        texString += "\\node[" + qType + " " + widthString + " " + bgColorStr + " " + textColorStr + "] at (" + p_px + "pt, " + p_py + "pt)   (property" + i + ") {" + identifier.replaceAll("_", "\\_ ") + "};\n";
	      }
	    }
	    
	    texString += "\\end{tikzpicture}\n}\n \\end{center}\n";
	    
	    //   console.log("Tex Output\n"+ texString);
	    var dataURI = "data:text/json;charset=utf-8," + encodeURIComponent(texString);
	    exportTexButton.attr("href", dataURI)
	      .attr("download", exportFilename + ".tex");
	    
	    
	  }
	  
	  function calculateRadian( angle ){
	    angle = angle % 360;
	    if ( angle < 0 ) {
	      angle = angle + 360;
	    }
	    return (Math.PI * angle) / 180;
	  }
	  
	  function calculateAngle( radian ){
	    return radian * (180 / Math.PI);
	  }
	  
	  return exportMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 324:
/***/ (function(module, exports) {

	/**
	 * Contains the logic for the export button.
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  var exportTTLModule = {};
	  var resultingTTLContent = "";
	  var currentNodes;
	  var currentProperties;
	  var currentAxioms;
	  var Map_ID2Node = {};
	  var Map_ID2Prop = {};
	  var prefixModule = webvowl.util.prefixTools(graph);
	  
	  exportTTLModule.requestExport = function (){
	    prefixModule.updatePrefixModel();
	    resultingTTLContent = "";
	    currentNodes = graph.getClassDataForTtlExport();
	    var i;
	    for ( i = 0; i < currentNodes.length; i++ ) {
	      Map_ID2Node[currentNodes[i].id()] = currentNodes[i];
	    }
	    currentProperties = graph.getPropertyDataForTtlExport();
	    
	    for ( i = 0; i < currentProperties.length; i++ ) {
	      Map_ID2Prop[currentProperties[i].id()] = currentProperties[i];
	    }
	    
	    
	    prepareHeader();
	    preparePrefixList();
	    prepareOntologyDef();
	    resultingTTLContent += "#################################################################\r\n\r\n";
	    preparePrefixRepresentation();
	    var property_success = exportProperties();
	    var class_success = exportClasses();
	    currentNodes = null;
	    currentProperties = null;
	    Map_ID2Node = {};
	    Map_ID2Prop = {};
	    if ( property_success === false || class_success === false )
	      return false;
	    return true;
	    
	  };
	  
	  function preparePrefixRepresentation(){
	    var i;
	    var allNodes = graph.getUnfilteredData().nodes;
	    var allProps = graph.getUnfilteredData().properties;
	    for ( i = 0; i < allNodes.length; i++ ) {
	      var nodeIRI = prefixModule.getPrefixRepresentationForFullURI(allNodes[i].iri());
	      if ( prefixModule.validURL(nodeIRI) === true )
	        allNodes[i].prefixRepresentation = "<" + nodeIRI + ">";
	      else
	        allNodes[i].prefixRepresentation = nodeIRI;
	    }
	    for ( i = 0; i < allProps.length; i++ ) {
	      var propIRI = prefixModule.getPrefixRepresentationForFullURI(allProps[i].iri());
	      if ( prefixModule.validURL(propIRI) === true )
	        allProps[i].prefixRepresentation = "<" + propIRI + ">";
	      else
	        allProps[i].prefixRepresentation = propIRI;
	    }
	  }
	  
	  function exportProperties(){
	    if ( currentProperties.length === 0 ) return; // we dont need to write that
	    resultingTTLContent += "###  Property Definitions (Number of Property) " + currentProperties.length + " ###\r\n";
	    for ( var i = 0; i < currentProperties.length; i++ ) {
	      
	      resultingTTLContent += "#  --------------------------- Property " + i + "------------------------- \r\n";
	      var addedElement = extractPropertyDescription(currentProperties[i]);
	      resultingTTLContent += addedElement;
	      //@ workaround for not supported elements
	      if ( addedElement.indexOf("WHYEMPTYNAME") !== -1 ) {
	        return false;
	      }
	    }
	    return true;
	  }
	  
	  
	  function exportClasses(){
	    if ( currentNodes.length === 0 ) return; // we dont need to write that
	    resultingTTLContent += "###  Class Definitions (Number of Classes) " + currentNodes.length + " ###\r\n";
	    for ( var i = 0; i < currentNodes.length; i++ ) {
	      // check for node type here and return false
	      resultingTTLContent += "#  --------------------------- Class  " + i + "------------------------- \r\n";
	      var addedElement = extractClassDescription(currentNodes[i]);
	      resultingTTLContent += addedElement;
	      
	      if ( addedElement.indexOf("WHYEMPTYNAME") !== -1 ) {
	        return false;
	      }
	    }
	    return true;
	  }
	  
	  function getPresentAttribute( selectedElement, element ){
	    var attr = selectedElement.attributes();
	    return (attr.indexOf(element) >= 0);
	  }
	  
	  function extractClassDescription( node ){
	    var subject = node.prefixRepresentation;
	    var predicate = "rdf:type";
	    var object = node.type();
	    if ( node.type() === "owl:equivalentClass" )
	      object = "owl:Class";
	    if ( node.type() === "owl:disjointUnionOf" )
	      object = "owl:Class";
	    if ( node.type() === "owl:unionOf" )
	      object = "owl:Class";
	    var arrayOfNodes = [];
	    var arrayOfUnionNodes = [];
	    
	    if ( node.union() ) {
	      var union = node.union();
	      for ( var u = 0; u < union.length; u++ ) {
	        var u_node = Map_ID2Node[union[u]];
	        arrayOfUnionNodes.push(u_node);
	      }
	    }
	    
	    if ( node.disjointUnion() ) {
	      var distUnion = node.disjointUnion();
	      for ( var du = 0; du < distUnion.length; du++ ) {
	        var du_node = Map_ID2Node[distUnion[du]];
	        arrayOfNodes.push(du_node);
	      }
	    }
	    
	    var objectDef = subject + " " + predicate + " " + object;
	    if ( getPresentAttribute(node, "deprecated") === true ) {
	      objectDef += ", owl:DeprecatedProperty";
	    }
	    // equivalent class handeled using type itself!
	    
	    // check for equivalent classes;
	    var indent = getIndent(subject);
	    objectDef += "; \r\n";
	    for ( var e = 0; e < node.equivalents().length; e++ ) {
	      var eqIRI = prefixModule.getPrefixRepresentationForFullURI(node.equivalents()[e].iri());
	      var eqNode_prefRepresentation = "";
	      if ( prefixModule.validURL(eqIRI) === true )
	        eqNode_prefRepresentation = "<" + eqIRI + ">";
	      else
	        eqNode_prefRepresentation = eqIRI;
	      objectDef += indent + " owl:equivalentClass " + eqNode_prefRepresentation + " ;\r\n";
	    }
	    
	    // if (getPresentAttribute(node,"equivalent")===true){
	    //     objectDef+=", owl:EquivalentClass";
	    // }
	    
	    // add Comments
	    
	    if ( node.commentForCurrentLanguage() ) {
	      
	      objectDef += indent + " rdfs:comment \"" + node.commentForCurrentLanguage() + "\" ;\r\n";
	    }
	    
	    if ( node.annotations() ) {
	      var annotations = node.annotations();
	      for ( var an in annotations ) {
	        if ( annotations.hasOwnProperty(an) ) {
	          var anArrayObj = annotations[an];
	          var anObj = anArrayObj[0];
	          var an_ident = anObj.identifier;
	          var an_val = anObj.value;
	          
	          if ( an_ident === "isDefinedBy" ) {
	            objectDef += indent + " rdfs:isDefinedBy <" + an_val + "> ;\r\n";
	          }
	          if ( an_ident === "term_status" ) {
	            objectDef += indent + " vs:term_status \"" + an_val + "\" ;\r\n";
	          }
	        }
	      }
	    }
	    
	    
	    if ( arrayOfNodes.length > 0 ) {
	      // add disjoint unionOf
	      objectDef += indent + " owl:disjointUnionOf (";
	      for ( var duE = 0; duE < arrayOfNodes.length; duE++ ) {
	        var duIri = prefixModule.getPrefixRepresentationForFullURI(arrayOfNodes[duE].iri());
	        var duNode_prefRepresentation = "";
	        if ( prefixModule.validURL(duIri) === true )
	          duNode_prefRepresentation = "<" + duIri + ">";
	        else
	          duNode_prefRepresentation = duIri;
	        objectDef += indent + indent + duNode_prefRepresentation + " \n";
	      }
	      objectDef += ") ;\r\n";
	    }
	    
	    if ( arrayOfUnionNodes.length > 0 ) {
	      // add disjoint unionOf
	      objectDef += indent + " rdfs:subClassOf [ rdf:type owl:Class ; \r\n";
	      objectDef += indent + indent + " owl:unionOf ( ";
	      
	      for ( var uE = 0; uE < arrayOfUnionNodes.length; uE++ ) {
	        
	        if ( arrayOfUnionNodes[uE] && arrayOfUnionNodes[uE].iri() ) {
	          var uIri = prefixModule.getPrefixRepresentationForFullURI(arrayOfUnionNodes[uE].iri());
	          var uNode_prefRepresentation = "";
	          if ( prefixModule.validURL(uIri) === true )
	            uNode_prefRepresentation = "<" + uIri + ">";
	          else
	            uNode_prefRepresentation = uIri;
	          objectDef += indent + indent + indent + uNode_prefRepresentation + " \n";
	        }
	      }
	      objectDef += ") ;\r\n";
	      
	      
	    }
	    
	    
	    var allProps = graph.getUnfilteredData().properties;
	    var myProperties = [];
	    var i;
	    for ( i = 0; i < allProps.length; i++ ) {
	      if ( allProps[i].domain() === node &&
	        (   allProps[i].type() === "rdfs:subClassOf" ||
	        allProps[i].type() === "owl:allValuesFrom" ||
	        allProps[i].type() === "owl:someValuesFrom")
	      ) {
	        myProperties.push(allProps[i]);
	      }
	      // special case disjoint with>> both domain and range get that property
	      if ( (allProps[i].domain() === node) &&
	        allProps[i].type() === "owl:disjointWith" ) {
	        myProperties.push(allProps[i]);
	      }
	      
	    }
	    for ( i = 0; i < myProperties.length; i++ ) {
	      // depending on the property we have to do some things;
	      
	      // special case
	      if ( myProperties[i].type() === "owl:someValuesFrom" ) {
	        objectDef += indent + " rdfs:subClassOf [ rdf:type owl:Restriction ; \r\n";
	        objectDef += indent + "                   owl:onProperty " + myProperties[i].prefixRepresentation + ";\r\n";
	        if ( myProperties[i].range().type() !== "owl:Thing" ) {
	          objectDef += indent + "                   owl:someValuesFrom " + myProperties[i].range().prefixRepresentation + "\r\n";
	        }
	        objectDef += indent + "                 ];\r\n";
	        continue;
	      }
	      
	      if ( myProperties[i].type() === "owl:allValuesFrom" ) {
	        objectDef += indent + " rdfs:subClassOf [ rdf:type owl:Restriction ; \r\n";
	        objectDef += indent + "                   owl:onProperty " + myProperties[i].prefixRepresentation + ";\r\n";
	        if ( myProperties[i].range().type() !== "owl:Thing" ) {
	          objectDef += indent + "                   owl:allValuesFrom " + myProperties[i].range().prefixRepresentation + "\r\n";
	        }
	        objectDef += indent + "                 ];\r\n";
	        continue;
	      }
	      
	      if ( myProperties[i].range().type() !== "owl:Thing" ) {
	        objectDef += indent + " " + myProperties[i].prefixRepresentation +
	          " " + myProperties[i].range().prefixRepresentation + " ;\r\n";
	        
	        
	      }
	    }
	    
	    
	    objectDef += general_Label_languageExtractor(indent, node.label(), "rdfs:label", true);
	    return objectDef;
	    
	  }
	  
	  function extractPropertyDescription( property ){
	    var subject = property.prefixRepresentation;
	    if ( subject.length === 0 ) {
	      console.log("THIS SHOULD NOT HAPPEN");
	      var propIRI = prefixModule.getPrefixRepresentationForFullURI(property.iri());
	      console.log("FOUND " + propIRI);
	      
	      
	    }
	    var predicate = "rdf:type";
	    var object = property.type();
	    
	    var objectDef = subject + " " + predicate + " " + object;
	    if ( getPresentAttribute(property, "deprecated") === true ) {
	      objectDef += ", owl:DeprecatedProperty";
	    }
	    if ( getPresentAttribute(property, "functional") === true ) {
	      objectDef += ", owl:FunctionalProperty";
	    }
	    if ( getPresentAttribute(property, "inverse functional") === true ) {
	      objectDef += ", owl:InverseFunctionalProperty";
	    }
	    if ( getPresentAttribute(property, "symmetric") === true ) {
	      objectDef += ", owl:SymmetricProperty";
	    }
	    if ( getPresentAttribute(property, "transitive") === true ) {
	      objectDef += ", owl:TransitiveProperty";
	    }
	    var indent = getIndent(subject);
	    
	    if ( property.inverse() ) {
	      objectDef += "; \r\n";
	      objectDef += indent + " owl:inverseOf " + property.inverse().prefixRepresentation;
	    }
	    
	    // check for domain and range;
	    
	    
	    var closeStatement = false;
	    var domain = property.domain();
	    var range = property.range();
	    
	    
	    objectDef += " ;\r\n";
	    
	    
	    if ( property.commentForCurrentLanguage() ) {
	      
	      objectDef += indent + " rdfs:comment \"" + property.commentForCurrentLanguage() + "\" ;\r\n";
	    }
	    
	    if ( property.superproperties() ) {
	      var superProps = property.superproperties();
	      for ( var sP = 0; sP < superProps.length; sP++ ) {
	        var sPelement = superProps[sP];
	        objectDef += indent + "rdfs:subPropertyOf " + sPelement.prefixRepresentation + ";\r\n";
	      }
	      // for (var an in annotations){
	      //     if (annotations.hasOwnProperty(an)){
	      //         var anArrayObj=annotations[an];
	      //         var anObj=anArrayObj[0];
	      //         var an_ident=anObj.identifier;
	      //         var an_val=anObj.value;
	      //         console.log(an_ident + " "+ an_val);
	      //
	      //         if (an_ident==="isDefinedBy"){
	      //             objectDef+=indent+" rdfs:isDefinedBy <"+an_val+"> ;\r\n";
	      //         }
	      //         if (an_ident==="term_status"){
	      //             objectDef+=indent+" vs:term_status \""+an_val+"\" ;\r\n";
	      //         }
	      //     }
	      // }
	      
	    }
	    
	    if ( property.annotations() ) {
	      var annotations = property.annotations();
	      for ( var an in annotations ) {
	        if ( annotations.hasOwnProperty(an) ) {
	          var anArrayObj = annotations[an];
	          var anObj = anArrayObj[0];
	          var an_ident = anObj.identifier;
	          var an_val = anObj.value;
	          
	          if ( an_ident === "isDefinedBy" ) {
	            objectDef += indent + " rdfs:isDefinedBy <" + an_val + "> ;\r\n";
	          }
	          if ( an_ident === "term_status" ) {
	            objectDef += indent + " vs:term_status \"" + an_val + "\" ;\r\n";
	          }
	        }
	      }
	    }
	    
	    
	    if ( domain.type() === "owl:Thing" && range.type() === "owl:Thing" ) {
	      // we do not write domain and range
	      if ( typeof property.label() !== "object" && property.label().length === 0 ) {
	        closeStatement = true;
	      }
	    }
	    
	    
	    if ( closeStatement === true ) {
	      var uobjectDef = objectDef.substring(0, objectDef.length - 2);
	      objectDef = uobjectDef + " . \r\n";
	      return objectDef;
	    }
	    // objectDef+="; \r\n";
	    var labelDescription;
	    
	    
	    if ( domain.type() === "owl:Thing" && range.type() === "owl:Thing" ) {
	      labelDescription = general_Label_languageExtractor(indent, property.label(), "rdfs:label", true);
	      objectDef += labelDescription;
	    }
	    else {
	      // do not close the statement;
	      labelDescription = general_Label_languageExtractor(indent, property.label(), "rdfs:label");
	      objectDef += labelDescription;
	      if ( domain.type() !== "owl:Thing" ) {
	        objectDef += indent + " rdfs:domain " + domain.prefixRepresentation + ";\r\n";
	      }
	      if ( range.type() !== "owl:Thing" ) {
	        objectDef += indent + " rdfs:range " + range.prefixRepresentation + ";\r\n";
	      }
	      
	      // close statement now;
	      
	      var s_needUpdate = objectDef;
	      var s_lastPtr = s_needUpdate.lastIndexOf(";");
	      objectDef = s_needUpdate.substring(0, s_lastPtr) + " . \r\n";
	    }
	    
	    return objectDef;
	    
	  }
	  
	  
	  exportTTLModule.resultingTTL_Content = function (){
	    return resultingTTLContent;
	  };
	  
	  function getIndent( name ){
	    if ( name === undefined ) {
	      return "WHYEMPTYNAME?";
	    }
	    return new Array(name.length + 1).join(" ");
	  }
	  
	  function prepareHeader(){
	    resultingTTLContent += "#################################################################\r\n";
	    resultingTTLContent += "###  Generated with the experimental alpha version of the TTL exporter of WebVOWL (version 1.1.7) " +
	      " http://visualdataweb.de/webvowl/   ###\r\n";
	    resultingTTLContent += "#################################################################\r\n\r\n";
	    
	  }
	  
	  function preparePrefixList(){
	    var ontoIri = graph.options().getGeneralMetaObjectProperty('iri');
	    var prefixList = graph.options().prefixList();
	    var prefixDef = [];
	    prefixDef.push('@prefix : \t\t<' + ontoIri + '> .');
	    for ( var name in prefixList ) {
	      if ( prefixList.hasOwnProperty(name) ) {
	        prefixDef.push('@prefix ' + name + ': \t\t<' + prefixList[name] + '> .');
	      }
	    }
	    prefixDef.push('@base \t\t\t<' + ontoIri + '> .\r\n');
	    
	    for ( var i = 0; i < prefixDef.length; i++ ) {
	      resultingTTLContent += prefixDef[i] + '\r\n';
	    }
	  }
	  
	  function prepareOntologyDef(){
	    var ontoIri = graph.options().getGeneralMetaObjectProperty('iri');
	    var indent = getIndent('<' + ontoIri + '>');
	    resultingTTLContent += '<' + ontoIri + '> rdf:type owl:Ontology ;\r\n' +
	      getOntologyTitle(indent) +
	      getOntologyDescription(indent) +
	      getOntologyVersion(indent) +
	      getOntologyAuthor(indent);
	    
	    // close the statement;
	    var s_needUpdate = resultingTTLContent;
	    var s_lastPtr = s_needUpdate.lastIndexOf(";");
	    resultingTTLContent = s_needUpdate.substring(0, s_lastPtr) + " . \r\n";
	  }
	  
	  function getOntologyTitle( indent ){
	    return general_languageExtractor(indent, "title", "dc:title");
	  }
	  
	  function getOntologyDescription( indent ){
	    return general_languageExtractor(indent, "description", "dc:description");
	  }
	  
	  function getOntologyAuthor( indent ){
	    var languageElement = graph.options().getGeneralMetaObjectProperty('author');
	    if ( languageElement ) {
	      if ( typeof languageElement !== "object" ) {
	        if ( languageElement.length === 0 )
	          return ""; // an empty string
	        var aString = indent + " dc:creator " + '"' + languageElement + '";\r\n';
	        return aString;
	      }
	      // we assume this thing is an array;
	      var authorString = indent + " dc:creator " + '"';
	      for ( var i = 0; i < languageElement.length - 1; i++ ) {
	        authorString += languageElement[i] + ", ";
	      }
	      authorString += languageElement[languageElement.length - 1] + '";\r\n';
	      return authorString;
	    } else {
	      return ""; // an empty string
	    }
	  }
	  
	  function getOntologyVersion( indent ){
	    var languageElement = graph.options().getGeneralMetaObjectProperty('version');
	    if ( languageElement ) {
	      if ( typeof languageElement !== "object" ) {
	        if ( languageElement.length === 0 )
	          return ""; // an empty string
	      }
	      return general_languageExtractor(indent, "version", "owl:versionInfo");
	    } else return ""; // an empty string
	  }
	  
	  function general_languageExtractor( indent, metaObjectDescription, annotationDescription, endStatement ){
	    var languageElement = graph.options().getGeneralMetaObjectProperty(metaObjectDescription);
	    
	    if ( typeof languageElement === 'object' ) {
	      
	      var resultingLanguages = [];
	      for ( var name in languageElement ) {
	        if ( languageElement.hasOwnProperty(name) ) {
	          var content = languageElement[name];
	          if ( name === "undefined" ) {
	            resultingLanguages.push(indent + " " + annotationDescription + ' "' + content + '"@en; \r\n');
	          }
	          else {
	            resultingLanguages.push(indent + " " + annotationDescription + ' "' + content + '"@' + name + '; \r\n');
	          }
	        }
	      }
	      // create resulting titles;
	      
	      var resultingString = "";
	      for ( var i = 0; i < resultingLanguages.length; i++ ) {
	        resultingString += resultingLanguages[i];
	      }
	      if ( endStatement && endStatement === true ) {
	        var needUpdate = resultingString;
	        var lastPtr = needUpdate.lastIndexOf(";");
	        return needUpdate.substring(0, lastPtr) + ". \r\n";
	      } else {
	        return resultingString;
	      }
	      
	    } else {
	      if ( endStatement && endStatement === true ) {
	        var s_needUpdate = indent + " " + annotationDescription + ' "' + languageElement + '"@en; \r\n';
	        var s_lastPtr = s_needUpdate.lastIndexOf(";");
	        return s_needUpdate.substring(0, s_lastPtr) + " . \r\n";
	      }
	      return indent + " " + annotationDescription + ' "' + languageElement + '"@en;\r\n';
	    }
	  }
	  
	  function general_Label_languageExtractor( indent, label, annotationDescription, endStatement ){
	    var languageElement = label;
	    
	    if ( typeof languageElement === 'object' ) {
	      var resultingLanguages = [];
	      for ( var name in languageElement ) {
	        if ( languageElement.hasOwnProperty(name) ) {
	          var content = languageElement[name];
	          if ( name === "undefined" ) {
	            resultingLanguages.push(indent + " " + annotationDescription + ' "' + content + '"@en; \r\n');
	          }
	          else {
	            resultingLanguages.push(indent + " " + annotationDescription + ' "' + content + '"@' + name + '; \r\n');
	          }
	        }
	      }
	      // create resulting titles;
	      var resultingString = "";
	      for ( var i = 0; i < resultingLanguages.length; i++ ) {
	        resultingString += resultingLanguages[i];
	      }
	      if ( endStatement && endStatement === true ) {
	        var needUpdate = resultingString;
	        var lastPtr = needUpdate.lastIndexOf(";");
	        return needUpdate.substring(0, lastPtr) + " . \r\n";
	      } else {
	        return resultingString;
	      }
	      
	    } else {
	      if ( endStatement && endStatement === true ) {
	        var s_needUpdate = indent + " " + annotationDescription + ' "' + languageElement + '"@en; \r\n';
	        var s_lastPtr = s_needUpdate.lastIndexOf(";");
	        return s_needUpdate.substring(0, s_lastPtr) + " . \r\n";
	      }
	      return indent + " " + annotationDescription + ' "' + languageElement + '"@en; \r\n';
	    }
	  }
	  
	  return exportTTLModule;
	};


/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the logic for connecting the filters with the website.
	 *
	 * @param graph required for calling a refresh after a filter change
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var filterMenu = {},
	    checkboxData = [],
	    menuElement = d3.select("#m_filter"),
	    menuControl = d3.select("#c_filter a"),
	    nodeDegreeContainer = d3.select("#nodeDegreeFilteringOption"),
	    graphDegreeLevel,
	    defaultDegreeValue = 0,
	    degreeSlider;
	  
	  filterMenu.setDefaultDegreeValue = function ( val ){
	    defaultDegreeValue = val;
	  };
	  filterMenu.getDefaultDegreeValue = function (){
	    return defaultDegreeValue;
	  };
	  
	  filterMenu.getGraphObject = function (){
	    return graph;
	  };
	  /** some getter function  **/
	  filterMenu.getCheckBoxContainer = function (){
	    return checkboxData;
	  };
	  
	  filterMenu.getDegreeSliderValue = function (){
	    return degreeSlider.property("value");
	  };
	  /**
	   * Connects the website with graph filters.
	   * @param datatypeFilter filter for all datatypes
	   * @param objectPropertyFilter filter for all object properties
	   * @param subclassFilter filter for all subclasses
	   * @param disjointFilter filter for all disjoint with properties
	   * @param setOperatorFilter filter for all set operators with properties
	   * @param nodeDegreeFilter filters nodes by their degree
	   */
	  filterMenu.setup = function ( datatypeFilter, objectPropertyFilter, subclassFilter, disjointFilter, setOperatorFilter, nodeDegreeFilter ){
	    // TODO: is this here really necessarry? << new menu visualization style?
	    menuControl.on("mouseover", function (){
	      var searchMenu = graph.options().searchMenu();
	      searchMenu.hideSearchEntries();
	    });
	    menuControl.on("mouseleave", function (){
	      filterMenu.highlightForDegreeSlider(false);
	    });
	    
	    addFilterItem(datatypeFilter, "datatype", "Datatype properties", "#datatypeFilteringOption");
	    addFilterItem(objectPropertyFilter, "objectProperty", "Object properties", "#objectPropertyFilteringOption");
	    addFilterItem(subclassFilter, "subclass", "Solitary subclasses", "#subclassFilteringOption");
	    addFilterItem(disjointFilter, "disjoint", "Class disjointness", "#disjointFilteringOption");
	    addFilterItem(setOperatorFilter, "setoperator", "Set operators", "#setOperatorFilteringOption");
	    
	    addNodeDegreeFilter(nodeDegreeFilter, nodeDegreeContainer);
	    addAnimationFinishedListener();
	  };
	  
	  
	  function addFilterItem( filter, identifier, pluralNameOfFilteredItems, selector ){
	    var filterContainer,
	      filterCheckbox;
	    
	    filterContainer = d3.select(selector)
	      .append("div")
	      .classed("checkboxContainer", true);
	    
	    filterCheckbox = filterContainer.append("input")
	      .classed("filterCheckbox", true)
	      .attr("id", identifier + "FilterCheckbox")
	      .attr("type", "checkbox")
	      .property("checked", filter.enabled());
	    
	    // Store for easier resetting
	    checkboxData.push({ checkbox: filterCheckbox, defaultState: filter.enabled() });
	    
	    filterCheckbox.on("click", function ( silent ){
	      // There might be no parameters passed because of a manual
	      // invocation when resetting the filters
	      var isEnabled = filterCheckbox.property("checked");
	      filter.enabled(isEnabled);
	      if ( silent !== true ) {
	        // updating graph when silent is false or the parameter is not given.
	        graph.update();
	      }
	    });
	    
	    filterContainer.append("label")
	      .attr("for", identifier + "FilterCheckbox")
	      .text(pluralNameOfFilteredItems);
	  }
	  
	  function addNodeDegreeFilter( nodeDegreeFilter, container ){
	    nodeDegreeFilter.setMaxDegreeSetter(function ( maxDegree ){
	      degreeSlider.attr("max", maxDegree);
	      setSliderValue(degreeSlider, Math.min(maxDegree, degreeSlider.property("value")));
	    });
	    
	    nodeDegreeFilter.setDegreeGetter(function (){
	      return degreeSlider.property("value");
	    });
	    
	    nodeDegreeFilter.setDegreeSetter(function ( value ){
	      setSliderValue(degreeSlider, value);
	    });
	    
	    var sliderContainer,
	      sliderValueLabel;
	    
	    sliderContainer = container.append("div")
	      .classed("distanceSliderContainer", true);
	    
	    degreeSlider = sliderContainer.append("input")
	      .attr("id", "nodeDegreeDistanceSlider")
	      .attr("type", "range")
	      .attr("min", 0)
	      .attr("step", 1);
	    
	    sliderContainer.append("label")
	      .classed("description", true)
	      .attr("for", "nodeDegreeDistanceSlider")
	      .text("Degree of collapsing");
	    
	    sliderValueLabel = sliderContainer.append("label")
	      .classed("value", true)
	      .attr("for", "nodeDegreeDistanceSlider")
	      .text(0);
	    
	    
	    degreeSlider.on("change", function ( silent ){
	      if ( silent !== true ) {
	        graph.update();
	        graphDegreeLevel = degreeSlider.property("value");
	      }
	    });
	    
	    
	    degreeSlider.on("input", function (){
	      var degree = degreeSlider.property("value");
	      sliderValueLabel.text(degree);
	    });
	    
	    
	    // adding wheel events
	    degreeSlider.on("wheel", handleWheelEvent);
	    degreeSlider.on("focusout", function (){
	      if ( degreeSlider.property("value") !== graphDegreeLevel ) {
	        graph.update();
	      }
	    });
	  }
	  
	  function handleWheelEvent(){
	    var wheelEvent = d3.event;
	    
	    var offset;
	    if ( wheelEvent.deltaY < 0 ) offset = 1;
	    if ( wheelEvent.deltaY > 0 ) offset = -1;
	    var maxDeg = parseInt(degreeSlider.attr("max"));
	    var oldVal = parseInt(degreeSlider.property("value"));
	    var newSliderValue = oldVal + offset;
	    if ( oldVal !== newSliderValue && (newSliderValue >= 0 && newSliderValue <= maxDeg) ) {
	      // only update when they are different [reducing redundant updates]
	      // set the new value and emit an update signal
	      degreeSlider.property("value", newSliderValue);
	      degreeSlider.on("input")();// <<-- sets the text value
	      graph.update();
	    }
	    d3.event.preventDefault();
	  }
	  
	  function setSliderValue( slider, value ){
	    slider.property("value", value).on("input")();
	  }
	  
	  /**
	   * Resets the filters (and also filtered elements) to their default.
	   */
	  filterMenu.reset = function (){
	    checkboxData.forEach(function ( checkboxData ){
	      var checkbox = checkboxData.checkbox,
	        enabledByDefault = checkboxData.defaultState,
	        isChecked = checkbox.property("checked");
	      
	      if ( isChecked !== enabledByDefault ) {
	        checkbox.property("checked", enabledByDefault);
	        // Call onclick event handlers programmatically
	        checkbox.on("click")();
	      }
	    });
	    
	    setSliderValue(degreeSlider, 0);
	    degreeSlider.on("change")();
	  };
	  
	  function addAnimationFinishedListener(){
	    menuControl.node().addEventListener("animationend", function (){
	      menuControl.classed("buttonPulse", false);
	      menuControl.classed("filterMenuButtonHighlight", true);
	      
	    });
	  }
	  
	  filterMenu.killButtonAnimation = function (){
	    menuControl.classed("buttonPulse", false);
	    menuControl.classed("filterMenuButtonHighlight", false);
	  };
	  
	  
	  filterMenu.highlightForDegreeSlider = function ( enable ){
	    if ( !arguments.length ) {
	      enable = true;
	    }
	    menuControl.classed("highlighted", enable);
	    nodeDegreeContainer.classed("highlighted", enable);
	    // pulse button handling
	    if ( menuControl.classed("buttonPulse") === true && enable === true ) {
	      menuControl.classed("buttonPulse", false);
	      var timer = setTimeout(function (){
	        menuControl.classed("buttonPulse", enable);
	        clearTimeout(timer);
	        // after the time is done, remove the pulse but stay highlighted
	      }, 100);
	    } else {
	      menuControl.classed("buttonPulse", enable);
	      menuControl.classed("filterMenuButtonHighlight", enable);
	    }
	  };
	  
	  
	  /** importer functions **/
	  // setting manually the values of the filter
	  // no update of the gui settings, these are updated in updateSettings
	  filterMenu.setCheckBoxValue = function ( id, checked ){
	    for ( var i = 0; i < checkboxData.length; i++ ) {
	      var cbdId = checkboxData[i].checkbox.attr("id");
	      if ( cbdId === id ) {
	        checkboxData[i].checkbox.property("checked", checked);
	        break;
	      }
	    }
	  };
	  
	  filterMenu.getCheckBoxValue = function ( id ){
	    for ( var i = 0; i < checkboxData.length; i++ ) {
	      var cbdId = checkboxData[i].checkbox.attr("id");
	      if ( cbdId === id ) {
	        return checkboxData[i].checkbox.property("checked");
	        
	      }
	    }
	  };
	  // set the value of the slider
	  filterMenu.setDegreeSliderValue = function ( val ){
	    degreeSlider.property("value", val);
	  };
	  
	  filterMenu.getDegreeSliderValue = function (){
	    return degreeSlider.property("value");
	  };
	  
	  // update the gui without invoking graph update (calling silent onclick function)
	  filterMenu.updateSettings = function (){
	    var silent = true;
	    var sliderValue = degreeSlider.property("value");
	    if ( sliderValue > 0 ) {
	      filterMenu.highlightForDegreeSlider(true);
	    } else {
	      filterMenu.highlightForDegreeSlider(false);
	    }
	    checkboxData.forEach(function ( checkboxData ){
	      var checkbox = checkboxData.checkbox;
	      checkbox.on("click")(silent);
	    });
	    
	    degreeSlider.on("input")();
	    degreeSlider.on("change")();
	    
	  };
	  
	  return filterMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the logic for setting up the gravity sliders.
	 *
	 * @param graph the associated webvowl graph
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var gravityMenu = {},
	    sliders = [],
	    options = graph.graphOptions(),
	    defaultCharge = options.charge();
	  
	  
	  /**
	   * Adds the gravity sliders to the website.
	   */
	  gravityMenu.setup = function (){
	    var menuEntry = d3.select("#m_gravity");
	    menuEntry.on("mouseover", function (){
	      var searchMenu = graph.options().searchMenu();
	      searchMenu.hideSearchEntries();
	    });
	    addDistanceSlider("#classSliderOption", "class", "Class distance", options.classDistance);
	    addDistanceSlider("#datatypeSliderOption", "datatype", "Datatype distance", options.datatypeDistance);
	  };
	  
	  function addDistanceSlider( selector, identifier, label, distanceFunction ){
	    var defaultLinkDistance = distanceFunction();
	    
	    var sliderContainer,
	      sliderValueLabel;
	    
	    sliderContainer = d3.select(selector)
	      .append("div")
	      .datum({ distanceFunction: distanceFunction }) // connect the options-function with the slider
	      .classed("distanceSliderContainer", true);
	    
	    var slider = sliderContainer.append("input")
	      .attr("id", identifier + "DistanceSlider")
	      .attr("type", "range")
	      .attr("min", 10)
	      .attr("max", 600)
	      .attr("value", distanceFunction())
	      .attr("step", 10);
	    
	    sliderContainer.append("label")
	      .classed("description", true)
	      .attr("for", identifier + "DistanceSlider")
	      .text(label);
	    
	    sliderValueLabel = sliderContainer.append("label")
	      .classed("value", true)
	      .attr("for", identifier + "DistanceSlider")
	      .text(distanceFunction());
	    
	    // Store slider for easier resetting
	    sliders.push(slider);
	    
	    slider.on("focusout", function (){
	      graph.updateStyle();
	    });
	    
	    slider.on("input", function (){
	      var distance = slider.property("value");
	      distanceFunction(distance);
	      adjustCharge(defaultLinkDistance);
	      sliderValueLabel.text(distance);
	      graph.updateStyle();
	    });
	    
	    // add wheel event to the slider
	    slider.on("wheel", function (){
	      var wheelEvent = d3.event;
	      var offset;
	      if ( wheelEvent.deltaY < 0 ) offset = 10;
	      if ( wheelEvent.deltaY > 0 ) offset = -10;
	      var oldVal = parseInt(slider.property("value"));
	      var newSliderValue = oldVal + offset;
	      if ( newSliderValue !== oldVal ) {
	        slider.property("value", newSliderValue);
	        distanceFunction(newSliderValue);
	        slider.on("input")(); // << set text and update the graphStyles
	      }
	      d3.event.preventDefault();
	    });
	  }
	  
	  function adjustCharge( defaultLinkDistance ){
	    var greaterDistance = Math.max(options.classDistance(), options.datatypeDistance()),
	      ratio = greaterDistance / defaultLinkDistance,
	      newCharge = defaultCharge * ratio;
	    
	    options.charge(newCharge);
	  }
	  
	  /**
	   * Resets the gravity sliders to their default.
	   */
	  gravityMenu.reset = function (){
	    sliders.forEach(function ( slider ){
	      slider.property("value", function ( d ){
	        // Simply reload the distance from the options
	        return d.distanceFunction();
	      });
	      slider.on("input")();
	    });
	  };
	  
	  
	  return gravityMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the logic for connecting the modes with the website.
	 *
	 * @param graph the graph that belongs to these controls
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var SAME_COLOR_MODE = { text: "Multicolor", type: "same" };
	  var GRADIENT_COLOR_MODE = { text: "Multicolor", type: "gradient" };
	  
	  var modeMenu = {},
	    checkboxes = [],
	    colorModeSwitch;
	  
	  var dynamicLabelWidthCheckBox;
	  // getter and setter for the state of color modes
	  modeMenu.colorModeState = function ( s ){
	    if ( !arguments.length ) return colorModeSwitch.datum().active;
	    colorModeSwitch.datum().active = s;
	    return modeMenu;
	  };
	  
	  
	  modeMenu.setDynamicLabelWidth = function ( val ){
	    dynamicLabelWidthCheckBox.property("checked", val);
	  };
	  // getter for checkboxes
	  modeMenu.getCheckBoxContainer = function (){
	    return checkboxes;
	  };
	  // getter for the color switch [needed? ]
	  modeMenu.colorModeSwitch = function (){
	    return colorModeSwitch;
	  };
	  
	  /**
	   * Connects the website with the available graph modes.
	   */
	  modeMenu.setup = function ( pickAndPin, nodeScaling, compactNotation, colorExternals ){
	    var menuEntry = d3.select("#m_modes");
	    menuEntry.on("mouseover", function (){
	      var searchMenu = graph.options().searchMenu();
	      searchMenu.hideSearchEntries();
	    });
	    addCheckBoxD("labelWidth", "Dynamic label width", "#dynamicLabelWidth", graph.options().dynamicLabelWidth, 1);
	    addCheckBox("editorMode", "Editing ", "#editMode", graph.editorMode);
	    addModeItem(pickAndPin, "pickandpin", "Pick & pin", "#pickAndPinOption", false);
	    addModeItem(nodeScaling, "nodescaling", "Node scaling", "#nodeScalingOption", true);
	    addModeItem(compactNotation, "compactnotation", "Compact notation", "#compactNotationOption", true);
	    var container = addModeItem(colorExternals, "colorexternals", "Color externals", "#colorExternalsOption", true);
	    colorModeSwitch = addExternalModeSelection(container, colorExternals);
	  };
	  function addCheckBoxD( identifier, modeName, selector, onChangeFunc, updateLvl ){
	    var moduleOptionContainer = d3.select(selector)
	      .append("div")
	      .classed("checkboxContainer", true);
	    
	    var moduleCheckbox = moduleOptionContainer.append("input")
	      .classed("moduleCheckbox", true)
	      .attr("id", identifier + "ModuleCheckbox")
	      .attr("type", "checkbox")
	      .property("checked", onChangeFunc());
	    
	    moduleCheckbox.on("click", function ( d ){
	      var isEnabled = moduleCheckbox.property("checked");
	      onChangeFunc(isEnabled);
	      d3.select("#maxLabelWidthSlider").node().disabled = !isEnabled;
	      d3.select("#maxLabelWidthvalueLabel").classed("disabledLabelForSlider", !isEnabled);
	      d3.select("#maxLabelWidthDescriptionLabel").classed("disabledLabelForSlider", !isEnabled);
	      
	      if ( updateLvl > 0 ) {
	        graph.animateDynamicLabelWidth();
	        // graph.lazyRefresh();
	      }
	    });
	    moduleOptionContainer.append("label")
	      .attr("for", identifier + "ModuleCheckbox")
	      .text(modeName);
	    if ( identifier === "editorMode" ) {
	      moduleOptionContainer.append("label")
	        .attr("style", "font-size:10px;padding-top:3px")
	        .text("(experimental)");
	    }
	    
	    dynamicLabelWidthCheckBox = moduleCheckbox;
	  }
	  
	  function addCheckBox( identifier, modeName, selector, onChangeFunc ){
	    var moduleOptionContainer = d3.select(selector)
	      .append("div")
	      .classed("checkboxContainer", true);
	    
	    var moduleCheckbox = moduleOptionContainer.append("input")
	      .classed("moduleCheckbox", true)
	      .attr("id", identifier + "ModuleCheckbox")
	      .attr("type", "checkbox")
	      .property("checked", onChangeFunc());
	    
	    moduleCheckbox.on("click", function ( d ){
	      var isEnabled = moduleCheckbox.property("checked");
	      onChangeFunc(isEnabled);
	      if ( isEnabled === true )
	        graph.showEditorHintIfNeeded();
	    });
	    moduleOptionContainer.append("label")
	      .attr("for", identifier + "ModuleCheckbox")
	      .text(modeName);
	    if ( identifier === "editorMode" ) {
	      moduleOptionContainer.append("label")
	        .attr("style", "font-size:10px;padding-top:3px")
	        .text(" (experimental)");
	    }
	  }
	  
	  function addModeItem( module, identifier, modeName, selector, updateGraphOnClick ){
	    var moduleOptionContainer,
	      moduleCheckbox;
	    
	    moduleOptionContainer = d3.select(selector)
	      .append("div")
	      .classed("checkboxContainer", true)
	      .datum({ module: module, defaultState: module.enabled() });
	    
	    moduleCheckbox = moduleOptionContainer.append("input")
	      .classed("moduleCheckbox", true)
	      .attr("id", identifier + "ModuleCheckbox")
	      .attr("type", "checkbox")
	      .property("checked", module.enabled());
	    
	    // Store for easier resetting all modes
	    checkboxes.push(moduleCheckbox);
	    
	    moduleCheckbox.on("click", function ( d, silent ){
	      var isEnabled = moduleCheckbox.property("checked");
	      d.module.enabled(isEnabled);
	      if ( updateGraphOnClick && silent !== true ) {
	        graph.executeColorExternalsModule();
	        graph.executeCompactNotationModule();
	        graph.lazyRefresh();
	      }
	    });
	    
	    moduleOptionContainer.append("label")
	      .attr("for", identifier + "ModuleCheckbox")
	      .text(modeName);
	    
	    return moduleOptionContainer;
	  }
	  
	  function addExternalModeSelection( container, colorExternalsMode ){
	    var button = container.append("button").datum({ active: false }).classed("color-mode-switch", true);
	    applyColorModeSwitchState(button, colorExternalsMode);
	    
	    button.on("click", function ( silent ){
	      var data = button.datum();
	      data.active = !data.active;
	      applyColorModeSwitchState(button, colorExternalsMode);
	      if ( colorExternalsMode.enabled() && silent !== true ) {
	        graph.executeColorExternalsModule();
	        graph.lazyRefresh();
	      }
	    });
	    
	    return button;
	  }
	  
	  function applyColorModeSwitchState( element, colorExternalsMode ){
	    var isActive = element.datum().active;
	    var activeColorMode = getColorModeByState(isActive);
	    
	    element.classed("active", isActive)
	      .text(activeColorMode.text);
	    
	    if ( colorExternalsMode ) {
	      colorExternalsMode.colorModeType(activeColorMode.type);
	    }
	  }
	  
	  function getColorModeByState( isActive ){
	    return isActive ? GRADIENT_COLOR_MODE : SAME_COLOR_MODE;
	  }
	  
	  /**
	   * Resets the modes to their default.
	   */
	  modeMenu.reset = function (){
	    checkboxes.forEach(function ( checkbox ){
	      var defaultState = checkbox.datum().defaultState,
	        isChecked = checkbox.property("checked");
	      
	      if ( isChecked !== defaultState ) {
	        checkbox.property("checked", defaultState);
	        // Call onclick event handlers programmatically
	        checkbox.on("click")(checkbox.datum());
	      }
	      
	      // Reset the module that is connected with the checkbox
	      checkbox.datum().module.reset();
	    });
	    
	    // set the switch to active and simulate disabling
	    colorModeSwitch.datum().active = true;
	    colorModeSwitch.on("click")();
	  };
	  
	  /** importer functions **/
	  // setting manually the values of the filter
	  // no update of the gui settings, these are updated in updateSettings
	  modeMenu.setCheckBoxValue = function ( id, checked ){
	    for ( var i = 0; i < checkboxes.length; i++ ) {
	      var cbdId = checkboxes[i].attr("id");
	      
	      if ( cbdId === id ) {
	        checkboxes[i].property("checked", checked);
	        break;
	      }
	    }
	  };
	  modeMenu.getCheckBoxValue = function ( id ){
	    for ( var i = 0; i < checkboxes.length; i++ ) {
	      var cbdId = checkboxes[i].attr("id");
	      if ( cbdId === id ) {
	        return checkboxes[i].property("checked");
	      }
	    }
	  };
	  
	  modeMenu.setColorSwitchState = function ( state ){
	    // need the !state because we simulate later a click
	    modeMenu.colorModeState(!state);
	  };
	  modeMenu.setColorSwitchStateUsingURL = function ( state ){
	    // need the !state because we simulate later a click
	    modeMenu.colorModeState(!state);
	    colorModeSwitch.on("click")(true);
	  };
	  
	  
	  modeMenu.updateSettingsUsingURL = function (){
	    var silent = true;
	    checkboxes.forEach(function ( checkbox ){
	      checkbox.on("click")(checkbox.datum(), silent);
	    });
	  };
	  
	  modeMenu.updateSettings = function (){
	    var silent = true;
	    checkboxes.forEach(function ( checkbox ){
	      checkbox.on("click")(checkbox.datum(), silent);
	    });
	    // this simulates onclick and inverts its state
	    colorModeSwitch.on("click")(silent);
	  };
	  return modeMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  var debugMenu = {},
	    checkboxes = [];
	  
	  
	  var hoverFlag = false;
	  var specialCbx;
	  debugMenu.setup = function (){
	    var menuEntry = d3.select("#debugMenuHref");
	    
	    menuEntry.on("mouseover", function (){
	      if ( hoverFlag === false ) {
	        var searchMenu = graph.options().searchMenu();
	        searchMenu.hideSearchEntries();
	        specialCbx.on("click")(true);
	        if ( graph.editorMode() === false ) {
	          d3.select("#useAccuracyHelper").style("color", "#979797");
	          d3.select("#useAccuracyHelper").style("pointer-events", "none");
	          
	          // regardless the state on which useAccuracyHelper is , we are not in editing mode -> disable it
	          d3.select("#showDraggerObject").style("color", "#979797");
	          d3.select("#showDraggerObject").style("pointer-events", "none");
	        } else {
	          d3.select("#useAccuracyHelper").style("color", "#2980b9");
	          d3.select("#useAccuracyHelper").style("pointer-events", "auto");
	        }
	        hoverFlag = true;
	      }
	    });
	    menuEntry.on("mouseout", function (){
	      hoverFlag = false;
	    });
	    
	    
	    specialCbx = addCheckBox("useAccuracyHelper", "Use accuracy helper", "#useAccuracyHelper", graph.options().useAccuracyHelper,
	      function ( enabled, silent ){
	        if ( !enabled ) {
	          d3.select("#showDraggerObject").style("color", "#979797");
	          d3.select("#showDraggerObject").style("pointer-events", "none");
	          d3.select("#showDraggerObjectConfigCheckbox").node().checked = false;
	        } else {
	          d3.select("#showDraggerObject").style("color", "#2980b9");
	          d3.select("#showDraggerObject").style("pointer-events", "auto");
	        }
	        
	        if ( silent === true ) return;
	        graph.lazyRefresh();
	        graph.updateDraggerElements();
	      }
	    );
	    addCheckBox("showDraggerObject", "Show accuracy helper", "#showDraggerObject", graph.options().showDraggerObject,
	      function ( enabled, silent ){
	        if ( silent === true ) return;
	        graph.lazyRefresh();
	        graph.updateDraggerElements();
	      });
	    addCheckBox("showFPS_Statistics", "Show rendering statistics", "#showFPS_Statistics", graph.options().showRenderingStatistic,
	      function ( enabled, silent ){
	        
	        if ( graph.options().getHideDebugFeatures() === false ) {
	          d3.select("#FPS_Statistics").classed("hidden", !enabled);
	        } else {
	          d3.select("#FPS_Statistics").classed("hidden", true);
	        }
	        
	        
	      });
	    addCheckBox("showModeOfOperation", "Show input modality", "#showModeOfOperation", graph.options().showInputModality,
	      function ( enabled ){
	        if ( graph.options().getHideDebugFeatures() === false ) {
	          d3.select("#modeOfOperationString").classed("hidden", !enabled);
	        } else {
	          d3.select("#modeOfOperationString").classed("hidden", true);
	        }
	      });
	    
	    
	  };
	  
	  
	  function addCheckBox( identifier, modeName, selector, onChangeFunc, _callbackFunction ){
	    var configOptionContainer = d3.select(selector)
	      .append("div")
	      .classed("checkboxContainer", true);
	    var configCheckbox = configOptionContainer.append("input")
	      .classed("moduleCheckbox", true)
	      .attr("id", identifier + "ConfigCheckbox")
	      .attr("type", "checkbox")
	      .property("checked", onChangeFunc());
	    
	    
	    configCheckbox.on("click", function ( silent ){
	      var isEnabled = configCheckbox.property("checked");
	      onChangeFunc(isEnabled);
	      _callbackFunction(isEnabled, silent);
	      
	    });
	    checkboxes.push(configCheckbox);
	    configOptionContainer.append("label")
	      .attr("for", identifier + "ConfigCheckbox")
	      .text(modeName);
	    
	    return configCheckbox;
	  }
	  
	  debugMenu.setCheckBoxValue = function ( identifier, value ){
	    for ( var i = 0; i < checkboxes.length; i++ ) {
	      var cbdId = checkboxes[i].attr("id");
	      if ( cbdId === identifier ) {
	        checkboxes[i].property("checked", value);
	        break;
	      }
	    }
	  };
	  
	  debugMenu.getCheckBoxValue = function ( id ){
	    for ( var i = 0; i < checkboxes.length; i++ ) {
	      var cbdId = checkboxes[i].attr("id");
	      if ( cbdId === id ) {
	        return checkboxes[i].property("checked");
	      }
	    }
	  };
	  
	  debugMenu.updateSettings = function (){
	    d3.selectAll(".debugOption").classed("hidden", graph.options().getHideDebugFeatures());
	    
	    var silent = true;
	    checkboxes.forEach(function ( checkbox ){
	      checkbox.on("click")(silent);
	    });
	    if ( graph.editorMode() === false ) {
	      
	      d3.select("#useAccuracyHelper").style("color", "#979797");
	      d3.select("#useAccuracyHelper").style("pointer-events", "none");
	      
	      // regardless the state on which useAccuracyHelper is , we are not in editing mode -> disable it
	      d3.select("#showDraggerObject").style("color", "#979797");
	      d3.select("#showDraggerObject").style("pointer-events", "none");
	    } else {
	      
	      d3.select("#useAccuracyHelper").style("color", "#2980b9");
	      d3.select("#useAccuracyHelper").style("pointer-events", "auto");
	    }
	    
	  };
	  
	  return debugMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var unescape = __webpack_require__(330);

	module.exports = function ( graph ){
	  
	  var ontologyMenu = {},
	    loadingInfo = d3.select("#loading-info"),
	    loadingProgress = d3.select("#loading-progress"),
	    
	    ontologyMenuTimeout,
	    fileToLoad,
	    stopTimer = false,
	    loadingError = false,
	    loadingStatusTimer,
	    conversion_sessionId,
	    cachedConversions = {},
	    loadingModule,
	    loadOntologyFromText;
	  var currentLoadedOntologyName = "";
	  
	  String.prototype.beginsWith = function ( string ){
	    return (this.indexOf(string) === 0);
	  };
	  
	  ontologyMenu.getLoadingFunction = function (){
	    return loadOntologyFromText;
	  };
	  
	  ontologyMenu.clearCachedVersion = function (){
	    if ( cachedConversions[currentLoadedOntologyName] ) {
	      cachedConversions[currentLoadedOntologyName] = undefined;
	    }
	  };
	  
	  
	  ontologyMenu.reloadCachedOntology = function (){
	    ontologyMenu.clearCachedVersion();
	    graph.clearGraphData();
	    loadingModule.parseUrlAndLoadOntology(false);
	  };
	  
	  ontologyMenu.cachedOntology = function ( ontoName ){
	    currentLoadedOntologyName = ontoName;
	    if ( cachedConversions[ontoName] ) {
	      var locStr = String(location.hash);
	      d3.select("#reloadSvgIcon").node().disabled = false;
	      graph.showReloadButtonAfterLayoutOptimization(true);
	      if ( locStr.indexOf("#file") > -1 ) {
	        d3.select("#reloadSvgIcon").node().disabled = true;
	        d3.select("#reloadCachedOntology").node().title = "reloading original version not possible, please reload the file";
	        d3.select("#reloadSvgIcon").classed("disabledReloadElement", true);
	        d3.select("#svgStringText").style("fill", "gray");
	        d3.select("#svgStringText").classed("noselect", true);
	      }
	      else {
	        d3.select("#reloadCachedOntology").node().title = "generate new visualization and overwrite cached ontology";
	        d3.select("#reloadSvgIcon").classed("disabledReloadElement", false);
	        d3.select("#svgStringText").style("fill", "black");
	        d3.select("#svgStringText").classed("noselect", true);
	      }
	    } else {
	      graph.showReloadButtonAfterLayoutOptimization(false);
	      
	    }
	    return cachedConversions[ontoName];
	  };
	  ontologyMenu.setCachedOntology = function ( ontoName, ontoContent ){
	    cachedConversions[ontoName] = ontoContent;
	    currentLoadedOntologyName = ontoName;
	  };
	  
	  ontologyMenu.getErrorStatus = function (){
	    return loadingError;
	  };
	  
	  ontologyMenu.setup = function ( _loadOntologyFromText ){
	    loadOntologyFromText = _loadOntologyFromText;
	    loadingModule = graph.options().loadingModule();
	    var menuEntry = d3.select("#m_select");
	    menuEntry.on("mouseover", function (){
	      var searchMenu = graph.options().searchMenu();
	      searchMenu.hideSearchEntries();
	    });
	    
	    setupConverterButtons();
	    setupUploadButton();
	    
	    var descriptionButton = d3.select("#error-description-button").datum({ open: false });
	    descriptionButton.on("click", function ( data ){
	      var errorContainer = d3.select("#error-description-container");
	      var errorDetailsButton = d3.select(this);
	      
	      // toggle the state
	      data.open = !data.open;
	      var descriptionVisible = data.open;
	      if ( descriptionVisible ) {
	        errorDetailsButton.text("Hide error details");
	      } else {
	        errorDetailsButton.text("Show error details");
	      }
	      errorContainer.classed("hidden", !descriptionVisible);
	    });
	    
	    setupUriListener();
	    loadingModule.setOntologyMenu(ontologyMenu);
	  };
	  
	  
	  function setupUriListener(){
	    // reload ontology when hash parameter gets changed manually
	    d3.select(window).on("hashchange", function (){
	      var oldURL = d3.event.oldURL, newURL = d3.event.newURL;
	      if ( oldURL !== newURL ) {
	        // don't reload when just the hash parameter gets appended
	        if ( newURL === oldURL + "#" ) {
	          return;
	        }
	        updateNavigationHrefs();
	        loadingModule.parseUrlAndLoadOntology();
	      }
	    });
	    updateNavigationHrefs();
	  }
	  
	  ontologyMenu.stopLoadingTimer = function (){
	    stopTimer = true;
	    clearTimeout(loadingStatusTimer);
	  };
	  
	  /**
	   * Quick fix: update all anchor tags that are used as buttons because a click on them
	   * changes the url and this will load an other ontology.
	   */
	  function updateNavigationHrefs(){
	    d3.selectAll("#menuElementContainer > li > a").attr("href", location.hash || "#");
	  }
	  
	  ontologyMenu.setIriText = function ( text ){
	    d3.select("#iri-converter-input").node().value = text;
	    d3.select("#iri-converter-button").attr("disabled", false);
	    d3.select("#iri-converter-form").on("submit")();
	  };
	  
	  ontologyMenu.clearDetailInformation = function (){
	    var bpContainer = d3.select("#bulletPoint_container");
	    var htmlCollection = bpContainer.node().children;
	    var numEntries = htmlCollection.length;
	    
	    for ( var i = 0; i < numEntries; i++ ) {
	      htmlCollection[0].remove();
	    }
	  };
	  ontologyMenu.append_message = function ( msg ){
	    // forward call
	    append_message(msg);
	  };
	  function append_message( msg ){
	    var bpContainer = d3.select("#bulletPoint_container");
	    var div = bpContainer.append("div");
	    div.node().innerHTML = msg;
	    loadingModule.scrollDownDetails();
	  }
	  
	  ontologyMenu.append_message_toLastBulletPoint = function ( msg ){
	    // forward call
	    append_message_toLastBulletPoint(msg);
	  };
	  
	  ontologyMenu.append_bulletPoint = function ( msg ){
	    // forward call
	    append_bulletPoint(msg);
	  };
	  function append_message_toLastBulletPoint( msg ){
	    var bpContainer = d3.select("#bulletPoint_container");
	    var htmlCollection = bpContainer.node().getElementsByTagName("LI");
	    var lastItem = htmlCollection.length - 1;
	    if ( lastItem >= 0 ) {
	      var oldText = htmlCollection[lastItem].innerHTML;
	      htmlCollection[lastItem].innerHTML = oldText + msg;
	    }
	    loadingModule.scrollDownDetails();
	  }
	  
	  function append_bulletPoint( msg ){
	    var bp_container = d3.select("#bulletPoint_container");
	    var bp = bp_container.append("li");
	    bp.node().innerHTML = msg;
	    d3.select("#currentLoadingStep").node().innerHTML = msg;
	    loadingModule.scrollDownDetails();
	  }
	  
	  
	  function setupConverterButtons(){
	    var iriConverterButton = d3.select("#iri-converter-button");
	    var iriConverterInput = d3.select("#iri-converter-input");
	    
	    iriConverterInput.on("input", function (){
	      keepOntologySelectionOpenShortly();
	      
	      var inputIsEmpty = iriConverterInput.property("value") === "";
	      iriConverterButton.attr("disabled", inputIsEmpty || undefined);
	    }).on("click", function (){
	      keepOntologySelectionOpenShortly();
	    });
	    
	    d3.select("#iri-converter-form").on("submit", function (){
	      var inputName = iriConverterInput.property("value");
	      
	      // remove first spaces
	      var clearedName = inputName.replace(/%20/g, " ");
	      while ( clearedName.beginsWith(" ") ) {
	        clearedName = clearedName.substr(1, clearedName.length);
	      }
	      // remove ending spaces
	      while ( clearedName.endsWith(" ") ) {
	        clearedName = clearedName.substr(0, clearedName.length - 1);
	      }
	      // check if iri is actually an url for a json file (ends with .json)
	      // create lowercase filenames;
	      inputName = clearedName;
	      var lc_iri = inputName.toLowerCase();
	      if ( lc_iri.endsWith(".json") ) {
	        location.hash = "url=" + inputName;
	        iriConverterInput.property("value", "");
	        iriConverterInput.on("input")();
	      } else {
	        location.hash = "iri=" + inputName;
	        iriConverterInput.property("value", "");
	        iriConverterInput.on("input")();
	      }
	      d3.event.preventDefault();
	      return false;
	    });
	  }
	  
	  function setupUploadButton(){
	    var input = d3.select("#file-converter-input"),
	      inputLabel = d3.select("#file-converter-label"),
	      uploadButton = d3.select("#file-converter-button");
	    
	    input.on("change", function (){
	      var selectedFiles = input.property("files");
	      if ( selectedFiles.length <= 0 ) {
	        inputLabel.text("Select ontology file");
	        uploadButton.property("disabled", true);
	      } else {
	        inputLabel.text(selectedFiles[0].name);
	        fileToLoad = selectedFiles[0].name;
	        uploadButton.property("disabled", false);
	        uploadButton.node().click();
	        // close menu;
	        graph.options().navigationMenu().hideAllMenus();
	      }
	    });
	    
	    uploadButton.on("click", function (){
	      var selectedFile = input.property("files")[0];
	      if ( !selectedFile ) {
	        return false;
	      }
	      var newHashParameter = "file=" + selectedFile.name;
	      // Trigger the reupload manually, because the iri is not changing
	      if ( location.hash === "#" + newHashParameter ) {
	        loadingModule.parseUrlAndLoadOntology();
	      } else {
	        location.hash = newHashParameter;
	      }
	    });
	  }
	  
	  function setLoadingStatusInfo( message ){
	    // check if there is a owl2vowl li item;
	    var o2vConverterContainer = d3.select("#o2vConverterContainer");
	    if ( !o2vConverterContainer.node() ) {
	      var bp_container = d3.select("#bulletPoint_container");
	      var div = bp_container.append("div");
	      o2vConverterContainer = div.append("ul");
	      o2vConverterContainer.attr("id", "o2vConverterContainer");
	      o2vConverterContainer.style("margin-left", "-25px");
	    }
	    // clear o2vConverterContainer;
	    var htmlCollection = o2vConverterContainer.node().children;
	    var numEntries = htmlCollection.length;
	    for ( var i = 0; i < numEntries; i++ ) {
	      htmlCollection[0].remove();
	    }
	    // split tokens provided by o2v messages
	    var tokens = message.split("* ");
	    var liForToken;
	    for ( var t = 0; t < tokens.length; t++ ) {
	      var tokenMessage = tokens[t];
	      // create li for tokens;
	      if ( tokenMessage.length > 0 ) {
	        liForToken = o2vConverterContainer.append("li");
	        liForToken.attr("type", "disc");
	        liForToken.node().innerHTML = tokenMessage.replace(/\n/g, "<br>");
	      }
	    }
	    if ( liForToken )
	      liForToken.node().innerHTML += "<br>";
	    
	    loadingModule.scrollDownDetails();
	  }
	  
	  ontologyMenu.setLoadingStatusInfo = function ( message ){
	    // forward call
	    setLoadingStatusInfo(message);
	  };
	  
	  function getLoadingStatusOnceCallBacked( callback, parameter ){
	    d3.xhr("loadingStatus?sessionId=" + conversion_sessionId, "application/text", function ( error, request ){
	      if ( error ) {
	        console.log("ontologyMenu getLoadingStatusOnceCallBacked throws error");
	        console.log("---------Error -----------");
	        console.log(error);
	        console.log("---------Request -----------");
	        console.log(request);
	      }
	      setLoadingStatusInfo(request.responseText);
	      callback(parameter);
	    });
	  }
	  
	  function getLoadingStatusTimeLooped(){
	    d3.xhr("loadingStatus?sessionId=" + conversion_sessionId, "application/text", function ( error, request ){
	      if ( error ) {
	        console.log("ontologyMenu getLoadingStatusTimeLooped throws error");
	        console.log("---------Error -----------");
	        console.log(error);
	        console.log("---------Request -----------");
	        console.log(request);
	      }
	      if ( stopTimer === false ) {
	        setLoadingStatusInfo(request.responseText);
	        timedLoadingStatusLogger();
	      }
	    });
	  }
	  
	  function timedLoadingStatusLogger(){
	    clearTimeout(loadingStatusTimer);
	    if ( stopTimer === false ) {
	      loadingStatusTimer = setTimeout(function (){
	        getLoadingStatusTimeLooped();
	      }, 1000);
	    }
	  }
	  
	  function callbackUpdateLoadingMessage( msg ){
	    d3.xhr("loadingStatus", "application/text", function ( error, request ){
	      if ( request !== undefined ) {
	        setLoadingStatusInfo(request.responseText + "<br>" + msg);
	      } else {
	        append_message(msg);
	      }
	    });
	  }
	  
	  ontologyMenu.setConversionID = function ( id ){
	    conversion_sessionId = id;
	  };
	  
	  ontologyMenu.callbackLoad_Ontology_FromIRI = function ( parameter ){
	    var relativePath = parameter[0];
	    var ontoName = parameter[1];
	    var localThreadId = parameter[2];
	    stopTimer = false;
	    timedLoadingStatusLogger();
	    d3.xhr(relativePath, "application/json", function ( error, request ){
	      var loadingSuccessful = !error;
	      // check if error occurred or responseText is empty
	      if ( (error !== null && error.status === 500) || (request && request.responseText.length === 0) ) {
	        clearTimeout(loadingStatusTimer);
	        stopTimer = true;
	        getLoadingStatusOnceCallBacked(callbackFromIRI_URL_ERROR, [error, request, localThreadId]);
	      }
	      var jsonText;
	      if ( loadingSuccessful ) {
	        clearTimeout(loadingStatusTimer);
	        stopTimer = true;
	        jsonText = request.responseText;
	        getLoadingStatusOnceCallBacked(callbackFromIRI_Success, [jsonText, ontoName, localThreadId]);
	      }
	    });
	  };
	  
	  
	  ontologyMenu.callbackLoad_Ontology_From_DirectInput = function ( text, parameter ){
	    var input = text;
	    var sessionId = parameter[1];
	    stopTimer = false;
	    timedLoadingStatusLogger();
	    
	    var formData = new FormData();
	    formData.append("input", input);
	    formData.append("sessionId", sessionId);
	    var xhr = new XMLHttpRequest();
	    
	    xhr.open("POST", "directInput", true);
	    xhr.onload = function (){
	      clearTimeout(loadingStatusTimer);
	      stopTimer = true;
	      getLoadingStatusOnceCallBacked(callbackForConvert, [xhr, input, sessionId]);
	    };
	    timedLoadingStatusLogger();
	    xhr.send(formData);
	    
	  };
	  function callbackFromIRI_Success( parameter ){
	    var local_conversionId = parameter[2];
	    if ( local_conversionId !== conversion_sessionId ) {
	      console.log("The conversion process for file:" + parameter[1] + " has been canceled!");
	      ontologyMenu.conversionFinished(local_conversionId);
	      return;
	    }
	    loadingModule.loadFromOWL2VOWL(parameter[0], parameter[1]);
	    ontologyMenu.conversionFinished();
	    
	  }
	  
	  function callbackFromDirectInput_Success( parameter ){
	    var local_conversionId = parameter[1];
	    if ( local_conversionId !== conversion_sessionId ) {
	      console.log("The conversion process for file:" + parameter[1] + " has been canceled!");
	      ontologyMenu.conversionFinished(local_conversionId);
	      return;
	    }
	    loadingModule.loadFromOWL2VOWL(parameter[0], "DirectInputConversionID" + local_conversionId);
	    ontologyMenu.conversionFinished();
	    
	  }
	  
	  ontologyMenu.getConversionId = function (){
	    return conversion_sessionId;
	  };
	  
	  ontologyMenu.callbackLoad_JSON_FromURL = function ( parameter ){
	    var relativePath = parameter[0];
	    var ontoName = parameter[1];
	    var local_conversionId = parameter[2];
	    stopTimer = false;
	    timedLoadingStatusLogger();
	    d3.xhr(relativePath, "application/json", function ( error, request ){
	      var loadingSuccessful = !error;
	      // check if error occurred or responseText is empty
	      if ( (error !== null && error.status === 500) || (request && request.responseText.length === 0) ) {
	        clearTimeout(loadingStatusTimer);
	        stopTimer = true;
	        loadingSuccessful = false;
	        console.log(request);
	        console.log(request.responseText.length);
	        getLoadingStatusOnceCallBacked(callbackFromJSON_URL_ERROR, [error, request, local_conversionId]);
	      }
	      if ( loadingSuccessful ) {
	        clearTimeout(loadingStatusTimer);
	        stopTimer = true;
	        var jsonText = request.responseText;
	        getLoadingStatusOnceCallBacked(callbackFromJSON_Success, [jsonText, ontoName, local_conversionId]);
	      }
	    });
	  };
	  
	  function callbackFromJSON_Success( parameter ){
	    var local_conversionId = parameter[2];
	    if ( local_conversionId !== conversion_sessionId ) {
	      console.log("The conversion process for file:" + parameter[1] + " has been canceled!");
	      return;
	    }
	    loadingModule.loadFromOWL2VOWL(parameter[0], parameter[1]);
	  }
	  
	  function callbackFromJSON_URL_ERROR( parameter ){
	    var error = parameter[0];
	    var request = parameter[1];
	    var local_conversionId = parameter[2];
	    if ( local_conversionId !== conversion_sessionId ) {
	      console.log("This thread has been canceled!!");
	      ontologyMenu.conversionFinished(local_conversionId);
	      return;
	    }
	    callbackUpdateLoadingMessage("<br><span style='color:red'> Failed to convert the file.</span> " +
	      " Ontology could not be loaded.<br>Is it a valid OWL ontology? Please check with <a target=\"_blank\"" +
	      "href=\"http://visualdataweb.de/validator/\">OWL Validator</a>");
	    
	    if ( error !== null && error.status === 500 ) {
	      append_message("<span style='color:red'>Could not find ontology  at the URL</span>");
	    }
	    if ( request && request.responseText.length === 0 ) {
	      append_message("<span style='color:red'>Received empty graph</span>");
	    }
	    graph.handleOnLoadingError();
	    ontologyMenu.conversionFinished();
	  }
	  
	  
	  function callbackFromIRI_URL_ERROR( parameter ){
	    var error = parameter[0];
	    var request = parameter[1];
	    var local_conversionId = parameter[2];
	    if ( local_conversionId !== conversion_sessionId ) {
	      console.log("This thread has been canceled!!");
	      ontologyMenu.conversionFinished(local_conversionId);
	      return;
	    }
	    callbackUpdateLoadingMessage("<br><span style='color:red'> Failed to convert the file.</span> " +
	      " Ontology could not be loaded.<br>Is it a valid OWL ontology? Please check with <a target=\"_blank\"" +
	      "href=\"http://visualdataweb.de/validator/\">OWL Validator</a>");
	    
	    if ( error !== null && error.status === 500 ) {
	      append_message("<span style='color:red'>Could not find ontology  at the URL</span>");
	    }
	    if ( request && request.responseText.length === 0 ) {
	      append_message("<span style='color:red'>Received empty graph</span>");
	    }
	    graph.handleOnLoadingError();
	    ontologyMenu.conversionFinished();
	  }
	  
	  function callbackFromDirectInput_ERROR( parameter ){
	    
	    var error = parameter[0];
	    var request = parameter[1];
	    var local_conversionId = parameter[2];
	    if ( local_conversionId !== conversion_sessionId ) {
	      console.log("The loading process for direct input has been canceled!");
	      return;
	    }
	    // callbackUpdateLoadingMessage("<br> <span style='color:red'> Failed to convert the file.</span> "+
	    //     "Ontology could not be loaded.<br>Is it a valid OWL ontology? Please check with <a target=\"_blank\"" +
	    //     "href=\"http://visualdataweb.de/validator/\">OWL Validator</a>");
	    if ( error !== null && error.status === 500 ) {
	      append_message("<span style='color:red'>Could not convert direct input</span>");
	    }
	    if ( request && request.responseText.length === 0 ) {
	      append_message("<span style='color:red'>Received empty graph</span>");
	    }
	    
	    graph.handleOnLoadingError();
	    ontologyMenu.conversionFinished();
	  }
	  
	  ontologyMenu.callbackLoadFromOntology = function ( selectedFile, filename, local_threadId ){
	    callbackLoadFromOntology(selectedFile, filename, local_threadId);
	  };
	  
	  function callbackLoadFromOntology( selectedFile, filename, local_threadId ){
	    stopTimer = false;
	    timedLoadingStatusLogger();
	    
	    var formData = new FormData();
	    formData.append("ontology", selectedFile);
	    formData.append("sessionId", local_threadId);
	    var xhr = new XMLHttpRequest();
	    
	    xhr.open("POST", "convert", true);
	    xhr.onload = function (){
	      clearTimeout(loadingStatusTimer);
	      stopTimer = true;
	      console.log(xhr);
	      getLoadingStatusOnceCallBacked(callbackForConvert, [xhr, filename, local_threadId]);
	    };
	    timedLoadingStatusLogger();
	    xhr.send(formData);
	  }
	  
	  function callbackForConvert( parameter ){
	    var xhr = parameter[0];
	    var filename = parameter[1];
	    var local_threadId = parameter[2];
	    if ( local_threadId !== conversion_sessionId ) {
	      console.log("The conversion process for file:" + filename + " has been canceled!");
	      ontologyMenu.conversionFinished(local_threadId);
	      return;
	    }
	    if ( xhr.status === 200 ) {
	      loadingModule.loadFromOWL2VOWL(xhr.responseText, filename);
	      ontologyMenu.conversionFinished();
	    } else {
	      var uglyJson=xhr.responseText;
	      var jsonResut=JSON.parse(uglyJson);
	      var niceJSON=JSON.stringify(jsonResut, 'null', '  ');
	      niceJSON= niceJSON.replace(new RegExp('\r?\n','g'), '<br />');
	      callbackUpdateLoadingMessage("Failed to convert the file. " +
	          "<br />Server answer: <br />"+
	          "<hr>"+niceJSON+ "<hr>"+
	        "Ontology could not be loaded.<br />Is it a valid OWL ontology? Please check with <a target=\"_blank\"" +
	        "href=\"http://visualdataweb.de/validator/\">OWL Validator</a>");
	      
	      graph.handleOnLoadingError();
	      ontologyMenu.conversionFinished();
	    }
	  }
	  
	  ontologyMenu.conversionFinished = function ( id ){
	    var local_id = conversion_sessionId;
	    if ( id ) {
	      local_id = id;
	    }
	    d3.xhr("conversionDone?sessionId=" + local_id, "application/text", function ( error, request ){
	      if ( error ) {
	        console.log("ontologyMenu conversionFinished throws error");
	        console.log("---------Error -----------");
	        console.log(error);
	        console.log("---------Request -----------");
	        console.log(request);
	      }
	    });
	  };
	  
	  function keepOntologySelectionOpenShortly(){
	    // Events in the menu should not be considered
	    var ontologySelection = d3.select("#select .toolTipMenu");
	    ontologySelection.on("click", function (){
	      d3.event.stopPropagation();
	    }).on("keydown", function (){
	      d3.event.stopPropagation();
	    });
	    
	    ontologySelection.style("display", "block");
	    
	    function disableKeepingOpen(){
	      ontologySelection.style("display", undefined);
	      
	      clearTimeout(ontologyMenuTimeout);
	      d3.select(window).on("click", undefined).on("keydown", undefined);
	      ontologySelection.on("mouseover", undefined);
	    }
	    
	    // Clear the timeout to handle fast calls of this function
	    clearTimeout(ontologyMenuTimeout);
	    ontologyMenuTimeout = setTimeout(function (){
	      disableKeepingOpen();
	    }, 3000);
	    
	    // Disable forced open selection on interaction
	    d3.select(window).on("click", function (){
	      disableKeepingOpen();
	    }).on("keydown", function (){
	      disableKeepingOpen();
	    });
	    
	    ontologySelection.on("mouseover", function (){
	      disableKeepingOpen();
	    });
	  }
	  
	  ontologyMenu.showLoadingStatus = function ( visible ){
	    if ( visible === true ) {
	      displayLoadingIndicators();
	    }
	    else {
	      hideLoadingInformations();
	    }
	  };
	  
	  function displayLoadingIndicators(){
	    d3.select("#layoutLoadingProgressBarContainer").classed("hidden", false);
	    loadingInfo.classed("hidden", false);
	    loadingProgress.classed("hidden", false);
	  }
	  
	  function hideLoadingInformations(){
	    loadingInfo.classed("hidden", true);
	  }
	  
	  return ontologyMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(219),
	    unescapeHtmlChar = __webpack_require__(331);

	/** Used to match HTML entities and HTML characters. */
	var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
	    reHasEscapedHtml = RegExp(reEscapedHtml.source);

	/**
	 * The inverse of `_.escape`; this method converts the HTML entities
	 * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
	 * their corresponding characters.
	 *
	 * **Note:** No other HTML entities are unescaped. To unescape additional
	 * HTML entities use a third-party library like [_he_](https://mths.be/he).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.6.0
	 * @category String
	 * @param {string} [string=''] The string to unescape.
	 * @returns {string} Returns the unescaped string.
	 * @example
	 *
	 * _.unescape('fred, barney, &amp; pebbles');
	 * // => 'fred, barney, & pebbles'
	 */
	function unescape(string) {
	  string = toString(string);
	  return (string && reHasEscapedHtml.test(string))
	    ? string.replace(reEscapedHtml, unescapeHtmlChar)
	    : string;
	}

	module.exports = unescape;


/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

	var basePropertyOf = __webpack_require__(332);

	/** Used to map HTML entities to characters. */
	var htmlUnescapes = {
	  '&amp;': '&',
	  '&lt;': '<',
	  '&gt;': '>',
	  '&quot;': '"',
	  '&#39;': "'"
	};

	/**
	 * Used by `_.unescape` to convert HTML entities to characters.
	 *
	 * @private
	 * @param {string} chr The matched character to unescape.
	 * @returns {string} Returns the unescaped character.
	 */
	var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

	module.exports = unescapeHtmlChar;


/***/ }),

/***/ 332:
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = basePropertyOf;


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the logic for the pause and resume button.
	 *
	 * @param graph the associated webvowl graph
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var pauseMenu = {},
	    pauseButton;
	  
	  
	  /**
	   * Adds the pause button to the website.
	   */
	  pauseMenu.setup = function (){
	    var menuEntry = d3.select("#pauseOption");
	    menuEntry.on("mouseover", function (){
	      var searchMenu = graph.options().searchMenu();
	      searchMenu.hideSearchEntries();
	    });
	    pauseButton = d3.select("#pause-button")
	      .datum({ paused: false })
	      .on("click", function ( d ){
	        graph.paused(!d.paused);
	        d.paused = !d.paused;
	        updatePauseButton();
	        pauseButton.classed("highlighted", d.paused);
	      });
	    // Set these properties the first time manually
	    updatePauseButton();
	  };
	  
	  pauseMenu.setPauseValue = function ( value ){
	    pauseButton.datum().paused = value;
	    graph.paused(value);
	    pauseButton.classed("highlighted", value);
	    updatePauseButton();
	  };
	  
	  function updatePauseButton(){
	    updatePauseButtonClass();
	    updatePauseButtonText();
	  }
	  
	  function updatePauseButtonClass(){
	    pauseButton.classed("paused", function ( d ){
	      return d.paused;
	    });
	  }
	  
	  function updatePauseButtonText(){
	    if ( pauseButton.datum().paused ) {
	      pauseButton.text("Resume");
	    } else {
	      pauseButton.text("Pause");
	    }
	  }
	  
	  pauseMenu.reset = function (){
	    // resuming
	    pauseMenu.setPauseValue(false);
	  };
	  
	  
	  return pauseMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the logic for the reset button.
	 *
	 * @param graph the associated webvowl graph
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var resetMenu = {},
	    options = graph.graphOptions(),
	    resettableModules,
	    untouchedOptions = webvowl.options();
	  
	  
	  /**
	   * Adds the reset button to the website.
	   * @param _resettableModules modules that can be resetted
	   */
	  resetMenu.setup = function ( _resettableModules ){
	    resettableModules = _resettableModules;
	    d3.select("#reset-button").on("click", resetGraph);
	    var menuEntry = d3.select("#resetOption");
	    menuEntry.on("mouseover", function (){
	      var searchMenu = graph.options().searchMenu();
	      searchMenu.hideSearchEntries();
	    });
	  };
	  
	  function resetGraph(){
	    graph.resetSearchHighlight();
	    graph.options().searchMenu().clearText();
	    options.classDistance(untouchedOptions.classDistance());
	    options.datatypeDistance(untouchedOptions.datatypeDistance());
	    options.charge(untouchedOptions.charge());
	    options.gravity(untouchedOptions.gravity());
	    options.linkStrength(untouchedOptions.linkStrength());
	    graph.reset();
	    
	    resettableModules.forEach(function ( module ){
	      module.reset();
	    });
	    
	    graph.updateStyle();
	  }
	  
	  
	  return resetMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the search "engine"
	 *
	 * @param graph the associated webvowl graph
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  var searchMenu = {},
	    dictionary = [],
	    entryNames = [],
	    searchLineEdit,
	    mergedStringsList,
	    mergedIdList,
	    maxEntries = 6,
	    dictionaryUpdateRequired = true,
	    labelDictionary,
	    inputText,
	    viewStatusOfSearchEntries = false;
	  
	  var results = [];
	  var resultID = [];
	  var c_locate = d3.select("#locateSearchResult");
	  var c_search = d3.select("#c_search");
	  var m_search = d3.select("#m_search"); // << dropdown container;
	  
	  
	  String.prototype.beginsWith = function ( string ){
	    return (this.indexOf(string) === 0);
	  };
	  
	  searchMenu.requestDictionaryUpdate = function (){
	    dictionaryUpdateRequired = true;
	    // clear possible pre searched entries
	    var htmlCollection = m_search.node().children;
	    var numEntries = htmlCollection.length;
	    
	    for ( var i = 0; i < numEntries; i++ )
	      htmlCollection[0].remove();
	    searchLineEdit.node().value = "";
	  };
	  
	  
	  function updateSearchDictionary(){
	    labelDictionary = graph.getUpdateDictionary();
	    dictionaryUpdateRequired = false;
	    dictionary = [];
	    entryNames = [];
	    var idList = [];
	    var stringList = [];
	    
	    var i;
	    for ( i = 0; i < labelDictionary.length; i++ ) {
	      var lEntry = labelDictionary[i].labelForCurrentLanguage();
	      idList.push(labelDictionary[i].id());
	      stringList.push(lEntry);
	      // add all equivalents to the search space;
	      if ( labelDictionary[i].equivalents && labelDictionary[i].equivalents().length > 0 ) {
	        var eqs = labelDictionary[i].equivalentsString();
	        var eqsLabels = eqs.split(", ");
	        for ( var e = 0; e < eqsLabels.length; e++ ) {
	          idList.push(labelDictionary[i].id());
	          stringList.push(eqsLabels[e]);
	        }
	      }
	    }
	    
	    mergedStringsList = [];
	    mergedIdList = [];
	    var indexInStringList = -1;
	    var currentString;
	    var currentObjectId;
	    
	    for ( i = 0; i < stringList.length; i++ ) {
	      if ( i === 0 ) {
	        // just add the elements
	        mergedStringsList.push(stringList[i]);
	        mergedIdList.push([]);
	        mergedIdList[0].push(idList[i]);
	        continue;
	      }
	      else {
	        currentString = stringList[i];
	        currentObjectId = idList[i];
	        indexInStringList = mergedStringsList.indexOf(currentString);
	      }
	      if ( indexInStringList === -1 ) {
	        mergedStringsList.push(stringList[i]);
	        mergedIdList.push([]);
	        var lastEntry = mergedIdList.length;
	        mergedIdList[lastEntry - 1].push(currentObjectId);
	      } else {
	        mergedIdList[indexInStringList].push(currentObjectId);
	      }
	    }
	    
	    for ( i = 0; i < mergedStringsList.length; i++ ) {
	      var aString = mergedStringsList[i];
	      var correspondingIdList = mergedIdList[i];
	      var idListResult = "[ ";
	      for ( var j = 0; j < correspondingIdList.length; j++ ) {
	        idListResult = idListResult + correspondingIdList[j].toString();
	        idListResult = idListResult + ", ";
	      }
	      idListResult = idListResult.substring(0, idListResult.length - 2);
	      idListResult = idListResult + " ]";
	      
	      dictionary.push(aString);
	      entryNames.push(aString);
	    }
	  }
	  
	  searchMenu.setup = function (){
	    // clear dictionary;
	    dictionary = [];
	    searchLineEdit = d3.select("#search-input-text");
	    searchLineEdit.on("input", userInput);
	    searchLineEdit.on("keydown", userNavigation);
	    searchLineEdit.on("click", toggleSearchEntryView);
	    searchLineEdit.on("mouseover", hoverSearchEntryView);
	    
	    c_locate.on("click", function (){
	      graph.locateSearchResult();
	    });
	    
	    c_locate.on("mouseover", function (){
	      searchMenu.hideSearchEntries();
	    });
	    
	  };
	  
	  function hoverSearchEntryView(){
	    updateSelectionStatusFlags();
	    searchMenu.showSearchEntries();
	  }
	  
	  function toggleSearchEntryView(){
	    if ( viewStatusOfSearchEntries ) {
	      searchMenu.hideSearchEntries();
	    } else {
	      searchMenu.showSearchEntries();
	    }
	  }
	  
	  searchMenu.hideSearchEntries = function (){
	    m_search.style("display", "none");
	    viewStatusOfSearchEntries = false;
	  };
	  
	  searchMenu.showSearchEntries = function (){
	    m_search.style("display", "block");
	    viewStatusOfSearchEntries = true;
	  };
	  
	  function ValidURL( str ){
	    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	    return urlregex.test(str);
	    
	  }
	  
	  
	  function updateSelectionStatusFlags(){
	    if ( searchLineEdit.node().value.length === 0 ) {
	      createSearchEntries();
	      return;
	    }
	    handleAutoCompletion();
	  }
	  
	  function userNavigation(){
	    if ( dictionaryUpdateRequired ) {
	      updateSearchDictionary();
	    }
	    
	    var htmlCollection = m_search.node().children;
	    var numEntries = htmlCollection.length;
	    
	    
	    var move = 0;
	    var i;
	    var selectedEntry = -1;
	    for ( i = 0; i < numEntries; i++ ) {
	      var atr = htmlCollection[i].getAttribute('class');
	      if ( atr === "dbEntrySelected" ) {
	        selectedEntry = i;
	      }
	    }
	    if ( d3.event.keyCode === 13 ) {
	      if ( selectedEntry >= 0 && selectedEntry < numEntries ) {
	        // simulate onClick event
	        htmlCollection[selectedEntry].onclick();
	        searchMenu.hideSearchEntries();
	      }
	      else if ( numEntries === 0 ) {
	        inputText = searchLineEdit.node().value;
	        // check if input text ends or begins with with space
	        // remove first spaces
	        var clearedText = inputText.replace(/%20/g, " ");
	        while ( clearedText.beginsWith(" ") ) {
	          clearedText = clearedText.substr(1, clearedText.length);
	        }
	        // remove ending spaces
	        while ( clearedText.endsWith(" ") ) {
	          clearedText = clearedText.substr(0, clearedText.length - 1);
	        }
	        var iri = clearedText.replace(/ /g, "%20");
	        
	        var valid = ValidURL(iri);
	        // validate url:
	        if ( valid ) {
	          var ontM = graph.options().ontologyMenu();
	          ontM.setIriText(iri);
	          searchLineEdit.node().value = "";
	        }
	        else {
	          console.log(iri + " is not a valid URL!");
	        }
	      }
	    }
	    if ( d3.event.keyCode === 38 ) {
	      move = -1;
	      searchMenu.showSearchEntries();
	    }
	    if ( d3.event.keyCode === 40 ) {
	      move = +1;
	      searchMenu.showSearchEntries();
	    }
	    
	    var newSelection = selectedEntry + move;
	    if ( newSelection !== selectedEntry ) {
	      
	      if ( newSelection < 0 && selectedEntry <= 0 ) {
	        htmlCollection[0].setAttribute('class', "dbEntrySelected");
	      }
	      
	      if ( newSelection >= numEntries ) {
	        htmlCollection[selectedEntry].setAttribute('class', "dbEntrySelected");
	      }
	      if ( newSelection >= 0 && newSelection < numEntries ) {
	        htmlCollection[newSelection].setAttribute('class', "dbEntrySelected");
	        if ( selectedEntry >= 0 )
	          htmlCollection[selectedEntry].setAttribute('class', "dbEntry");
	      }
	    }
	  }
	  
	  searchMenu.getSearchString = function (){
	    return searchLineEdit.node().value;
	  };
	  
	  
	  function clearSearchEntries(){
	    var htmlCollection = m_search.node().children;
	    var numEntries = htmlCollection.length;
	    for ( var i = 0; i < numEntries; i++ ) {
	      htmlCollection[0].remove();
	    }
	    results = [];
	    resultID = [];
	    
	  }
	  
	  function createSearchEntries(){
	    inputText = searchLineEdit.node().value;
	    var i;
	    var lc_text = inputText.toLowerCase();
	    var token;
	    
	    for ( i = 0; i < dictionary.length; i++ ) {
	      var tokenElement = dictionary[i];
	      if ( tokenElement === undefined ) {
	        //@WORKAROUND : nodes with undefined labels are skipped
	        //@FIX: these nodes are now not added to the dictionary
	        continue;
	      }
	      token = dictionary[i].toLowerCase();
	      if ( token.indexOf(lc_text) > -1 ) {
	        results.push(dictionary[i]);
	        resultID.push(i);
	      }
	    }
	  }
	  
	  function measureTextWidth( text, textStyle ){
	    // Set a default value
	    if ( !textStyle ) {
	      textStyle = "text";
	    }
	    var d = d3.select("body")
	        .append("div")
	        .attr("class", textStyle)
	        .attr("id", "width-test") // tag this element to identify it
	        .attr("style", "position:absolute; float:left; white-space:nowrap; visibility:hidden;")
	        .text(text),
	      w = document.getElementById("width-test").offsetWidth;
	    d.remove();
	    return w;
	  }
	  
	  function cropText( input ){
	    var maxWidth = 250;
	    var textStyle = "dbEntry";
	    var truncatedText = input;
	    var textWidth;
	    var ratio;
	    var newTruncatedTextLength;
	    while ( true ) {
	      textWidth = measureTextWidth(truncatedText, textStyle);
	      if ( textWidth <= maxWidth ) {
	        break;
	      }
	      
	      ratio = textWidth / maxWidth;
	      newTruncatedTextLength = Math.floor(truncatedText.length / ratio);
	      
	      // detect if nothing changes
	      if ( truncatedText.length === newTruncatedTextLength ) {
	        break;
	      }
	      
	      truncatedText = truncatedText.substring(0, newTruncatedTextLength);
	    }
	    
	    if ( input.length > truncatedText.length ) {
	      return input.substring(0, truncatedText.length - 6);
	    }
	    return input;
	  }
	  
	  function createDropDownElements(){
	    var numEntries;
	    var copyRes = results;
	    var i;
	    var token;
	    var newResults = [];
	    var newResultsIds = [];
	    
	    var lc_text = searchLineEdit.node().value.toLowerCase();
	    // set the number of shown results to be maxEntries or less;
	    numEntries = results.length;
	    if ( numEntries > maxEntries )
	      numEntries = maxEntries;
	    
	    
	    for ( i = 0; i < numEntries; i++ ) {
	      // search for the best entry
	      var indexElement = 1000000;
	      var lengthElement = 1000000;
	      var bestElement = -1;
	      for ( var j = 0; j < copyRes.length; j++ ) {
	        token = copyRes[j].toLowerCase();
	        var tIe = token.indexOf(lc_text);
	        var tLe = token.length;
	        if ( tIe > -1 && tIe <= indexElement && tLe <= lengthElement ) {
	          bestElement = j;
	          indexElement = tIe;
	          lengthElement = tLe;
	        }
	      }
	      newResults.push(copyRes[bestElement]);
	      newResultsIds.push(resultID[bestElement]);
	      copyRes[bestElement] = "";
	    }
	    
	    // add the results to the entry menu
	    //******************************************
	    numEntries = results.length;
	    if ( numEntries > maxEntries )
	      numEntries = maxEntries;
	    
	    var filteredOutElements = 0;
	    for ( i = 0; i < numEntries; i++ ) {
	      //add results to the dropdown menu
	      var testEntry = document.createElement('li');
	      testEntry.setAttribute('elementID', newResultsIds[i]);
	      testEntry.onclick = handleClick(newResultsIds[i]);
	      testEntry.setAttribute('class', "dbEntry");
	      
	      var entries = mergedIdList[newResultsIds[i]];
	      var eLen = entries.length;
	      
	      var croppedText = cropText(newResults[i]);
	      
	      var el0 = entries[0];
	      var allSame = true;
	      var nodeMap = graph.getNodeMapForSearch();
	      var visible = eLen;
	      if ( eLen > 1 ) {
	        for ( var q = 0; q < eLen; q++ ) {
	          if ( nodeMap[entries[q]] === undefined ) {
	            visible--;
	          }
	        }
	      }
	      
	      for ( var a = 0; a < eLen; a++ ) {
	        if ( el0 !== entries[a] ) {
	          allSame = false;
	        }
	      }
	      if ( croppedText !== newResults[i] ) {
	        // append ...(#numElements) if needed
	        if ( eLen > 1 && allSame === false ) {
	          if ( eLen !== visible )
	            croppedText += "... (" + visible + "/" + eLen + ")";
	        }
	        else {
	          croppedText += "...";
	        }
	        testEntry.title = newResults[i];
	      }
	      else {
	        if ( eLen > 1 && allSame === false ) {
	          if ( eLen !== visible )
	            croppedText += " (" + visible + "/" + eLen + ")";
	          else
	            croppedText += " (" + eLen + ")";
	        }
	      }
	      
	      var searchEntryNode = d3.select(testEntry);
	      if ( eLen === 1 || allSame === true ) {
	        if ( nodeMap[entries[0]] === undefined ) {
	          searchEntryNode.style("color", "#979797");
	          testEntry.title = newResults[i] + "\nElement is filtered out.";
	          testEntry.onclick = function (){
	          };
	          d3.select(testEntry).style("cursor", "default");
	          filteredOutElements++;
	        }
	      } else {
	        if ( visible < 1 ) {
	          searchEntryNode.style("color", "#979797");
	          testEntry.onclick = function (){
	          };
	          testEntry.title = newResults[i] + "\nAll elements are filtered out.";
	          d3.select(testEntry).style("cursor", "default");
	          filteredOutElements++;
	        } else {
	          searchEntryNode.style("color", "");
	        }
	        if ( visible < eLen && visible > 1 ) {
	          testEntry.title = newResults[i] + "\n" + visible + "/" + eLen + " elements are visible.";
	        }
	      }
	      searchEntryNode.node().innerHTML = croppedText;
	      m_search.node().appendChild(testEntry);
	    }
	  }
	  
	  
	  function handleAutoCompletion(){
	    /**  pre condition: autoCompletion has already a valid text**/
	    clearSearchEntries();
	    createSearchEntries();
	    createDropDownElements();
	  }
	  
	  function userInput(){
	    c_locate.classed("highlighted", false);
	    c_locate.node().title = "Nothing to locate";
	    
	    if ( dictionaryUpdateRequired ) {
	      updateSearchDictionary();
	    }
	    graph.resetSearchHighlight();
	    
	    if ( dictionary.length === 0 ) {
	      console.log("dictionary is empty");
	      return;
	    }
	    inputText = searchLineEdit.node().value;
	    
	    clearSearchEntries();
	    if ( inputText.length !== 0 ) {
	      createSearchEntries();
	      createDropDownElements();
	    }
	    
	    searchMenu.showSearchEntries();
	  }
	  
	  function handleClick( elementId ){
	    
	    return function (){
	      var id = elementId;
	      var correspondingIds = mergedIdList[id];
	      
	      // autoComplete the text for the user
	      var autoComStr = entryNames[id];
	      searchLineEdit.node().value = autoComStr;
	      
	      graph.resetSearchHighlight();
	      graph.highLightNodes(correspondingIds);
	      c_locate.node().title = "Locate search term";
	      if ( autoComStr !== inputText ) {
	        handleAutoCompletion();
	      }
	      searchMenu.hideSearchEntries();
	    };
	  }
	  
	  searchMenu.clearText = function (){
	    searchLineEdit.node().value = "";
	    c_locate.classed("highlighted", false);
	    c_locate.node().title = "Nothing to locate";
	    var htmlCollection = m_search.node().children;
	    var numEntries = htmlCollection.length;
	    for ( var i = 0; i < numEntries; i++ ) {
	      htmlCollection[0].remove();
	    }
	  };
	  
	  return searchMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the navigation "engine"
	 *
	 * @param graph the associated webvowl graph
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  var navigationMenu = {},
	    scrollContainer = d3.select("#menuElementContainer").node(),
	    menuContainer = d3.select("#menuContainer").node(),
	    leftButton = d3.select("#scrollLeftButton"),
	    rightButton = d3.select("#scrollRightButton"),
	    scrolLeftValue,
	    scrollMax,
	    currentlyVisibleMenu,
	    currentlyHoveredEntry,
	    touchedElement = false,
	    t_scrollLeft,
	    t_scrollRight,
	    c_select = [],
	    m_select = [];
	  
	  
	  function clearAllTimers(){
	    cancelAnimationFrame(t_scrollLeft);
	    cancelAnimationFrame(t_scrollRight);
	  }
	  
	  function timed_scrollRight(){
	    scrolLeftValue += 5;
	    scrollContainer.scrollLeft = scrolLeftValue;
	    navigationMenu.updateScrollButtonVisibility();
	    if ( scrolLeftValue >= scrollMax ) {
	      clearAllTimers();
	      return;
	    }
	    t_scrollRight = requestAnimationFrame(timed_scrollRight);
	    
	  }
	  
	  function timed_scrollLeft(){
	    scrolLeftValue -= 5;
	    scrollContainer.scrollLeft = scrolLeftValue;
	    navigationMenu.updateScrollButtonVisibility();
	    if ( scrolLeftValue <= 0 ) {
	      clearAllTimers();
	      return;
	    }
	    t_scrollRight = requestAnimationFrame(timed_scrollLeft);
	  }
	  
	  // collect all menu entries and stuff;
	  function setupControlsAndMenus(){
	    // HEURISTIC : to match the menus and their controllers we remove the first 2 letters and match
	    c_select = [];
	    m_select = [];
	    
	    var c_temp = [];
	    var m_temp = [];
	    var i;
	    var controlElements = scrollContainer.children;
	    var numEntries = controlElements.length;
	    
	    for ( i = 0; i < numEntries; i++ ) {
	      c_temp.push(controlElements[i].id.slice(2));
	    }
	    
	    var menuElements = menuContainer.children;
	    numEntries = menuElements.length;
	    for ( i = 0; i < numEntries; i++ ) {
	      m_temp.push(menuElements[i].id.slice(2));
	    }
	    
	    numEntries = controlElements.length;
	    for ( i = 0; i < numEntries; i++ ) {
	      c_select[i] = "c_" + c_temp[i];
	      if ( m_temp.indexOf(c_temp[i]) > -1 ) {
	        m_select[i] = "m_" + c_temp[i];
	      } else {
	        m_select[i] = undefined;
	      }
	      // create custom behavior for click, touch, and hover
	      d3.select("#" + c_select[i]).on("mouseover", menuElementOnHovered);
	      d3.select("#" + c_select[i]).on("mouseout", menuElementOutHovered);
	      
	      d3.select("#" + c_select[i]).on("click", menuElementClicked);
	      d3.select("#" + c_select[i]).on("touchstart", menuElementTouched);
	      
	    }
	    
	    // connect to mouseWheel
	    d3.select("#menuElementContainer").on("wheel", function (){
	      var wheelEvent = d3.event;
	      var offset;
	      if ( wheelEvent.deltaY < 0 ) offset = 20;
	      if ( wheelEvent.deltaY > 0 ) offset = -20;
	      scrollContainer.scrollLeft += offset;
	      navigationMenu.hideAllMenus();
	      navigationMenu.updateScrollButtonVisibility();
	    });
	    
	    // connect scrollIndicator Buttons;
	    d3.select("#scrollRightButton").on("mousedown", function (){
	      scrolLeftValue = scrollContainer.scrollLeft;
	      navigationMenu.hideAllMenus();
	      t_scrollRight = requestAnimationFrame(timed_scrollRight);
	      
	    }).on("touchstart", function (){
	      scrolLeftValue = scrollContainer.scrollLeft;
	      navigationMenu.hideAllMenus();
	      t_scrollRight = requestAnimationFrame(timed_scrollRight);
	    }).on("mouseup", clearAllTimers)
	      .on("touchend", clearAllTimers)
	      .on("touchcancel", clearAllTimers);
	    
	    d3.select("#scrollLeftButton").on("mousedown", function (){
	      scrolLeftValue = scrollContainer.scrollLeft;
	      navigationMenu.hideAllMenus();
	      t_scrollLeft = requestAnimationFrame(timed_scrollLeft);
	    }).on("touchstart", function (){
	      scrolLeftValue = scrollContainer.scrollLeft;
	      navigationMenu.hideAllMenus();
	      t_scrollLeft = requestAnimationFrame(timed_scrollLeft);
	    }).on("mouseup", clearAllTimers)
	      .on("touchend", clearAllTimers)
	      .on("touchcancel", clearAllTimers);
	    
	    // connect the scroll functionality;
	    d3.select("#menuElementContainer").on("scroll", function (){
	      navigationMenu.updateScrollButtonVisibility();
	      navigationMenu.hideAllMenus();
	    });
	  }
	  
	  function menuElementOnHovered(){
	    navigationMenu.hideAllMenus();
	    if ( touchedElement ) {
	      return;
	    }
	    showSingleMenu(this.id);
	  }
	  
	  function menuElementOutHovered(){
	    hoveroutedControMenu(this.id);
	  }
	  
	  function menuElementClicked(){
	    var m_element = m_select[c_select.indexOf(this.id)];
	    if ( m_element ) {
	      var menuElement = d3.select("#" + m_element);
	      if ( menuElement ) {
	        if ( menuElement.style("display") === "block" ) {
	          menuElement.style("display", "none");// hide it
	        } else {
	          showSingleMenu(this.id);
	        }
	      }
	    }
	  }
	  
	  function menuElementTouched(){
	    // it sets a flag that we have touched it,
	    // since d3. propagates the event for touch as hover and then click, we block the hover event
	    touchedElement = true;
	  }
	  
	  
	  function hoveroutedControMenu( controllerID ){
	    currentlyHoveredEntry = d3.select("#" + controllerID);
	    if ( controllerID !== "c_search" ) {
	      d3.select("#" + controllerID).select("path").style("stroke-width", "0");
	      d3.select("#" + controllerID).select("path").style("fill", "#fff");
	    }
	    
	  }
	  
	  function showSingleMenu( controllerID ){
	    currentlyHoveredEntry = d3.select("#" + controllerID).node();
	    // get the corresponding menu element for this controller
	    var m_element = m_select[c_select.indexOf(controllerID)];
	    if ( m_element ) {
	      if ( controllerID !== "c_search" ) {
	        
	        d3.select("#" + controllerID).select("path").style("stroke-width", "0");
	        d3.select("#" + controllerID).select("path").style("fill", "#bdc3c7");
	      }
	      // show it if we have a menu
	      currentlyVisibleMenu = d3.select("#" + m_element);
	      currentlyVisibleMenu.style("display", "block");
	      if ( m_element === "m_export" )
	        graph.options().exportMenu().exportAsUrl();
	      updateMenuPosition();
	    }
	  }
	  
	  function updateMenuPosition(){
	    if ( currentlyHoveredEntry ) {
	      var leftOffset = currentlyHoveredEntry.offsetLeft;
	      var scrollOffset = scrollContainer.scrollLeft;
	      var totalOffset = leftOffset - scrollOffset;
	      var finalOffset = Math.max(0, totalOffset);
	      var fullContainer_width = scrollContainer.getBoundingClientRect().width;
	      var elementWidth = currentlyVisibleMenu.node().getBoundingClientRect().width;
	      // make priority > first check if we are right
	      if ( finalOffset + elementWidth > fullContainer_width ) {
	        finalOffset = fullContainer_width - elementWidth;
	      }
	      // fix priority;
	      finalOffset = Math.max(0, finalOffset);
	      currentlyVisibleMenu.style("left", finalOffset + "px");
	      
	      // // check if outside the viewport
	      // var menuWidth=currentlyHoveredEntry.getBoundingClientRect().width;
	      // var bt_width=36;
	      // if (totalOffset+menuWidth<bt_width || totalOffset+bt_width>fullContainer_width){
	      //     navigationMenu.hideAllMenus();
	      //     currentlyHoveredEntry=undefined;
	      // }
	    }
	  }
	  
	  navigationMenu.hideAllMenus = function (){
	    d3.selectAll(".toolTipMenu").style("display", "none"); // hiding all menus
	  };
	  
	  navigationMenu.updateScrollButtonVisibility = function (){
	    scrollMax = scrollContainer.scrollWidth - scrollContainer.clientWidth - 2;
	    if ( scrollContainer.scrollLeft === 0 ) {
	      leftButton.classed("hidden", true);
	    } else {
	      leftButton.classed("hidden", false);
	    }
	    
	    if ( scrollContainer.scrollLeft > scrollMax ) {
	      rightButton.classed("hidden", true);
	    } else {
	      rightButton.classed("hidden", false);
	    }
	    
	  };
	  
	  navigationMenu.setup = function (){
	    setupControlsAndMenus();
	    // make sure that the menu elements follow their controller and also their restrictions
	    // some hovering behavior -- lets the menu disappear when hovered in graph or sidebar;
	    d3.select("#graph").on("mouseover", function (){
	      navigationMenu.hideAllMenus();
	    });
	    d3.select("#generalDetails").on("mouseover", function (){
	      navigationMenu.hideAllMenus();
	    });
	  };
	  
	  return navigationMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/** The zoom Slider **/
	module.exports = function ( graph ){
	  var zoomSlider = {};
	  var minMag = graph.options().minMagnification(),
	    maxMag = graph.options().maxMagnification(),
	    defZoom,
	    t_zoomOut,
	    t_zoomIn,
	    zoomValue,
	    showSlider = true,
	    w = graph.options().width(),
	    h = graph.options().height(),
	    slider;
	  
	  defZoom = Math.min(w, h) / 1000;
	  
	  function clearAllTimers(){
	    cancelAnimationFrame(t_zoomOut);
	    cancelAnimationFrame(t_zoomIn);
	  }
	  
	  function timed_zoomOut(){
	    zoomValue = 0.98 * zoomValue;
	    // fail saves
	    if ( zoomValue < minMag ) {
	      zoomValue = minMag;
	    }
	    graph.setSliderZoom(zoomValue);
	    t_zoomOut = requestAnimationFrame(timed_zoomOut);
	  }
	  
	  function timed_zoomIn(){
	    zoomValue = 1.02 * zoomValue;
	    // fail saves
	    if ( zoomValue > maxMag ) {
	      zoomValue = maxMag;
	    }
	    graph.setSliderZoom(zoomValue);
	    t_zoomIn = requestAnimationFrame(timed_zoomIn);
	  }
	  
	  zoomSlider.setup = function (){
	    slider = d3.select("#zoomSliderParagraph").append("input")
	      .datum({})
	      .attr("id", "zoomSliderElement")
	      .attr("type", "range")
	      .attr("value", defZoom)
	      .attr("min", minMag)
	      .attr("max", maxMag)
	      .attr("step", (maxMag - minMag) / 40)
	      .attr("title", "zoom factor")
	      .on("input", function (){
	        zoomSlider.zooming();
	      });
	    
	    d3.select("#zoomOutButton").on("mousedown", function (){
	      graph.options().navigationMenu().hideAllMenus();
	      zoomValue = graph.scaleFactor();
	      t_zoomOut = requestAnimationFrame(timed_zoomOut);
	    })
	      .on("touchstart", function (){
	        graph.options().navigationMenu().hideAllMenus();
	        zoomValue = graph.scaleFactor();
	        t_zoomOut = requestAnimationFrame(timed_zoomOut);
	      })
	      .on("mouseup", clearAllTimers)
	      .on("touchend", clearAllTimers)
	      .on("touchcancel", clearAllTimers)
	      .attr("title", "zoom out");
	    
	    d3.select("#zoomInButton").on("mousedown", function (){
	      graph.options().navigationMenu().hideAllMenus();
	      zoomValue = graph.scaleFactor();
	      t_zoomIn = requestAnimationFrame(timed_zoomIn);
	    })
	      .on("touchstart", function (){
	        graph.options().navigationMenu().hideAllMenus();
	        zoomValue = graph.scaleFactor();
	        t_zoomIn = requestAnimationFrame(timed_zoomIn);
	      })
	      .on("mouseup", clearAllTimers)
	      .on("touchend", clearAllTimers)
	      .on("touchcancel", clearAllTimers)
	      .attr("title", "zoom in");
	    
	    d3.select("#centerGraphButton").on("click", function (){
	      graph.options().navigationMenu().hideAllMenus();
	      graph.forceRelocationEvent();
	    }).attr("title", "center graph");
	    
	  };
	  
	  zoomSlider.showSlider = function ( val ){
	    if ( !arguments.length ) return showSlider;
	    d3.select("#zoomSlider").classed("hidden", !val);
	    showSlider = val;
	  };
	  
	  zoomSlider.zooming = function (){
	    graph.options().navigationMenu().hideAllMenus();
	    var zoomValue = slider.property("value");
	    slider.attr("value", zoomValue);
	    graph.setSliderZoom(zoomValue);
	  };
	  
	  zoomSlider.updateZoomSliderValue = function ( val ){
	    if ( slider ) {
	      slider.attr("value", val);
	      slider.property("value", val);
	    }
	  };
	  
	  return zoomSlider;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the logic for the sidebar.
	 * @param graph the graph that belongs to these controls
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var sidebar = {},
	    languageTools = webvowl.util.languageTools(),
	    elementTools = webvowl.util.elementTools(),
	    // Required for reloading when the language changes
	    ontologyInfo,
	    visibleSidebar = 1,
	    lastSelectedElement,
	    
	    detailArea = d3.select("#detailsArea"),
	    graphArea = d3.select("#canvasArea"),
	    menuArea = d3.select("#swipeBarContainer"),
	    collapseButton = d3.select("#sidebarExpandButton");
	  
	  /**
	   * Setup the menu bar.
	   */
	  
	  
	  function setupCollapsing(){
	    // adapted version of this example: http://www.normansblog.de/simple-jquery-accordion/
	    function collapseContainers( containers ){
	      containers.classed("hidden", true);
	    }
	    
	    function expandContainers( containers ){
	      containers.classed("hidden", false);
	    }
	    
	    var triggers = d3.selectAll(".accordion-trigger");
	    
	    // Collapse all inactive triggers on startup
	    collapseContainers(d3.selectAll(".accordion-trigger:not(.accordion-trigger-active) + div"));
	    
	    triggers.on("click", function (){
	      var selectedTrigger = d3.select(this),
	        activeTriggers = d3.selectAll(".accordion-trigger-active");
	      
	      if ( selectedTrigger.classed("accordion-trigger-active") ) {
	        // Collapse the active (which is also the selected) trigger
	        collapseContainers(d3.select(selectedTrigger.node().nextElementSibling));
	        selectedTrigger.classed("accordion-trigger-active", false);
	      } else {
	        // Collapse the other trigger ...
	        collapseContainers(d3.selectAll(".accordion-trigger-active + div"));
	        activeTriggers.classed("accordion-trigger-active", false);
	        // ... and expand the selected one
	        expandContainers(d3.select(selectedTrigger.node().nextElementSibling));
	        selectedTrigger.classed("accordion-trigger-active", true);
	      }
	    });
	  }
	  
	  sidebar.clearOntologyInformation = function (){
	    
	    d3.select("#title").text("No title available");
	    d3.select("#about").attr("href", "#").attr("target", "_blank").text("not given");
	    d3.select("#version").text("--");
	    d3.select("#authors").text("--");
	    d3.select("#description").text("No description available.");
	    var container = d3.select("#ontology-metadata");
	    container.selectAll("*").remove();
	    d3.select("#classCount")
	      .text("0");
	    d3.select("#objectPropertyCount")
	      .text("0");
	    d3.select("#datatypePropertyCount")
	      .text("0");
	    d3.select("#individualCount")
	      .text("0");
	    d3.select("#nodeCount")
	      .text("0");
	    d3.select("#edgeCount")
	      .text("0");
	    
	    // clear selectedNode info
	    var isTriggerActive = d3.select("#selection-details-trigger").classed("accordion-trigger-active");
	    if ( isTriggerActive ) {
	      // close accordion
	      d3.select("#selection-details-trigger").node().click();
	    }
	    showSelectionAdvice();
	    
	  };
	  
	  /**
	   * Updates the information of the passed ontology.
	   * @param data the graph data
	   * @param statistics the statistics module
	   */
	  sidebar.updateOntologyInformation = function ( data, statistics ){
	    data = data || {};
	    ontologyInfo = data.header || {};
	    
	    updateGraphInformation();
	    displayGraphStatistics(undefined, statistics);
	    displayMetadata(ontologyInfo.other);
	    
	    // Reset the sidebar selection
	    sidebar.updateSelectionInformation(undefined);
	    
	    setLanguages(ontologyInfo.languages);
	  };
	  
	  function setLanguages( languages ){
	    languages = languages || [];
	    
	    // Put the default and unset label on top of the selection labels
	    languages.sort(function ( a, b ){
	      if ( a === webvowl.util.constants().LANG_IRIBASED ) {
	        return -1;
	      } else if ( b === webvowl.util.constants().LANG_IRIBASED ) {
	        return 1;
	      }
	      if ( a === webvowl.util.constants().LANG_UNDEFINED ) {
	        return -1;
	      } else if ( b === webvowl.util.constants().LANG_UNDEFINED ) {
	        return 1;
	      }
	      return a.localeCompare(b);
	    });
	    
	    var languageSelection = d3.select("#language")
	      .on("change", function (){
	        graph.language(d3.event.target.value);
	        updateGraphInformation();
	        sidebar.updateSelectionInformation(lastSelectedElement);
	      });
	    
	    languageSelection.selectAll("option").remove();
	    languageSelection.selectAll("option")
	      .data(languages)
	      .enter().append("option")
	      .attr("value", function ( d ){
	        return d;
	      })
	      .text(function ( d ){
	        return d;
	      });
	    
	    if ( !trySelectDefaultLanguage(languageSelection, languages, "en") ) {
	      if ( !trySelectDefaultLanguage(languageSelection, languages, webvowl.util.constants().LANG_UNDEFINED) ) {
	        trySelectDefaultLanguage(languageSelection, languages, webvowl.util.constants().LANG_IRIBASED);
	      }
	    }
	  }
	  
	  function trySelectDefaultLanguage( selection, languages, language ){
	    var langIndex = languages.indexOf(language);
	    if ( langIndex >= 0 ) {
	      selection.property("selectedIndex", langIndex);
	      graph.language(language);
	      return true;
	    }
	    
	    return false;
	  }
	  
	  function updateGraphInformation(){
	    var title = languageTools.textInLanguage(ontologyInfo.title, graph.language());
	    d3.select("#title").text(title || "No title available");
	    d3.select("#about").attr("href", ontologyInfo.iri).attr("target", "_blank").text(ontologyInfo.iri);
	    d3.select("#version").text(ontologyInfo.version || "--");
	    var authors = ontologyInfo.author;
	    if ( typeof authors === "string" ) {
	      // Stay compatible with author info as strings after change in january 2015
	      d3.select("#authors").text(authors);
	    } else if ( authors instanceof Array ) {
	      d3.select("#authors").text(authors.join(", "));
	    } else {
	      d3.select("#authors").text("--");
	    }
	    
	    var description = languageTools.textInLanguage(ontologyInfo.description, graph.language());
	    d3.select("#description").text(description || "No description available.");
	  }
	  
	  function displayGraphStatistics( deliveredMetrics, statistics ){
	    // Metrics are optional and may be undefined
	    deliveredMetrics = deliveredMetrics || {};
	    
	    d3.select("#classCount")
	      .text(deliveredMetrics.classCount || statistics.classCount());
	    d3.select("#objectPropertyCount")
	      .text(deliveredMetrics.objectPropertyCount || statistics.objectPropertyCount());
	    d3.select("#datatypePropertyCount")
	      .text(deliveredMetrics.datatypePropertyCount || statistics.datatypePropertyCount());
	    d3.select("#individualCount")
	      .text(deliveredMetrics.totalIndividualCount || statistics.totalIndividualCount());
	    d3.select("#nodeCount")
	      .text(statistics.nodeCount());
	    d3.select("#edgeCount")
	      .text(statistics.edgeCount());
	  }
	  
	  function displayMetadata( metadata ){
	    var container = d3.select("#ontology-metadata");
	    container.selectAll("*").remove();
	    
	    listAnnotations(container, metadata);
	    
	    if ( container.selectAll(".annotation").size() <= 0 ) {
	      container.append("p").text("No annotations available.");
	    }
	  }
	  
	  function listAnnotations( container, annotationObject ){
	    annotationObject = annotationObject || {};  //todo
	    
	    // Collect the annotations in an array for simpler processing
	    var annotations = [];
	    for ( var annotation in annotationObject ) {
	      if ( annotationObject.hasOwnProperty(annotation) ) {
	        annotations.push(annotationObject[annotation][0]);
	      }
	    }
	    
	    container.selectAll(".annotation").remove();
	    container.selectAll(".annotation").data(annotations).enter().append("p")
	      .classed("annotation", true)
	      .classed("statisticDetails", true)
	      .text(function ( d ){
	        return d.identifier + ":";
	      })
	      .append("span")
	      .each(function ( d ){
	        appendIriLabel(d3.select(this), d.value, d.type === "iri" ? d.value : undefined);
	      });
	  }
	  
	  /**
	   * Update the information of the selected node.
	   * @param selectedElement the selection or null if nothing is selected
	   */
	  sidebar.updateSelectionInformation = function ( selectedElement ){
	    lastSelectedElement = selectedElement;
	    
	    // Click event was prevented when dragging
	    if ( d3.event && d3.event.defaultPrevented ) {
	      return;
	    }
	    
	    var isTriggerActive = d3.select("#selection-details-trigger").classed("accordion-trigger-active");
	    if ( selectedElement && !isTriggerActive ) {
	      d3.select("#selection-details-trigger").node().click();
	    } else if ( !selectedElement && isTriggerActive ) {
	      showSelectionAdvice();
	      return;
	    }
	    
	    if ( elementTools.isProperty(selectedElement) ) {
	      displayPropertyInformation(selectedElement);
	    } else if ( elementTools.isNode(selectedElement) ) {
	      displayNodeInformation(selectedElement);
	    }
	  };
	  
	  function showSelectionAdvice(){
	    setSelectionInformationVisibility(false, false, true);
	  }
	  
	  function setSelectionInformationVisibility( showClasses, showProperties, showAdvice ){
	    d3.select("#classSelectionInformation").classed("hidden", !showClasses);
	    d3.select("#propertySelectionInformation").classed("hidden", !showProperties);
	    d3.select("#noSelectionInformation").classed("hidden", !showAdvice);
	  }
	  
	  function displayPropertyInformation( property ){
	    showPropertyInformations();
	    
	    setIriLabel(d3.select("#propname"), property.labelForCurrentLanguage(), property.iri());
	    d3.select("#typeProp").text(property.type());
	    
	    if ( property.inverse() !== undefined ) {
	      d3.select("#inverse").classed("hidden", false);
	      setIriLabel(d3.select("#inverse span"), property.inverse().labelForCurrentLanguage(), property.inverse().iri());
	    } else {
	      d3.select("#inverse").classed("hidden", true);
	    }
	    
	    var equivalentIriSpan = d3.select("#propEquivUri");
	    listNodeArray(equivalentIriSpan, property.equivalents());
	    
	    listNodeArray(d3.select("#subproperties"), property.subproperties());
	    listNodeArray(d3.select("#superproperties"), property.superproperties());
	    
	    if ( property.minCardinality() !== undefined ) {
	      d3.select("#infoCardinality").classed("hidden", true);
	      d3.select("#minCardinality").classed("hidden", false);
	      d3.select("#minCardinality span").text(property.minCardinality());
	      d3.select("#maxCardinality").classed("hidden", false);
	      
	      if ( property.maxCardinality() !== undefined ) {
	        d3.select("#maxCardinality span").text(property.maxCardinality());
	      } else {
	        d3.select("#maxCardinality span").text("*");
	      }
	      
	    } else if ( property.cardinality() !== undefined ) {
	      d3.select("#minCardinality").classed("hidden", true);
	      d3.select("#maxCardinality").classed("hidden", true);
	      d3.select("#infoCardinality").classed("hidden", false);
	      d3.select("#infoCardinality span").text(property.cardinality());
	    } else {
	      d3.select("#infoCardinality").classed("hidden", true);
	      d3.select("#minCardinality").classed("hidden", true);
	      d3.select("#maxCardinality").classed("hidden", true);
	    }
	    
	    setIriLabel(d3.select("#domain"), property.domain().labelForCurrentLanguage(), property.domain().iri());
	    setIriLabel(d3.select("#range"), property.range().labelForCurrentLanguage(), property.range().iri());
	    
	    displayAttributes(property.attributes(), d3.select("#propAttributes"));
	    
	    setTextAndVisibility(d3.select("#propDescription"), property.descriptionForCurrentLanguage());
	    setTextAndVisibility(d3.select("#propComment"), property.commentForCurrentLanguage());
	    
	    listAnnotations(d3.select("#propertySelectionInformation"), property.annotations());
	  }
	  
	  function showPropertyInformations(){
	    setSelectionInformationVisibility(false, true, false);
	  }
	  
	  function setIriLabel( element, name, iri ){
	    var parent = d3.select(element.node().parentNode);
	    
	    if ( name ) {
	      element.selectAll("*").remove();
	      appendIriLabel(element, name, iri);
	      parent.classed("hidden", false);
	    } else {
	      parent.classed("hidden", true);
	    }
	  }
	  
	  function appendIriLabel( element, name, iri ){
	    var tag;
	    
	    if ( iri ) {
	      tag = element.append("a")
	        .attr("href", iri)
	        .attr("title", iri)
	        .attr("target", "_blank");
	    } else {
	      tag = element.append("span");
	    }
	    tag.text(name);
	  }
	  
	  function displayAttributes( attributes, textSpan ){
	    var spanParent = d3.select(textSpan.node().parentNode);
	    
	    if ( attributes && attributes.length > 0 ) {
	      // Remove redundant redundant attributes for sidebar
	      removeElementFromArray("object", attributes);
	      removeElementFromArray("datatype", attributes);
	      removeElementFromArray("rdf", attributes);
	    }
	    
	    if ( attributes && attributes.length > 0 ) {
	      textSpan.text(attributes.join(", "));
	      
	      spanParent.classed("hidden", false);
	    } else {
	      spanParent.classed("hidden", true);
	    }
	  }
	  
	  function removeElementFromArray( element, array ){
	    var index = array.indexOf(element);
	    if ( index > -1 ) {
	      array.splice(index, 1);
	    }
	  }
	  
	  function displayNodeInformation( node ){
	    showClassInformations();
	    
	    setIriLabel(d3.select("#name"), node.labelForCurrentLanguage(), node.iri());
	    
	    /* Equivalent stuff. */
	    var equivalentIriSpan = d3.select("#classEquivUri");
	    listNodeArray(equivalentIriSpan, node.equivalents());
	    
	    d3.select("#typeNode").text(node.type());
	    listNodeArray(d3.select("#individuals"), node.individuals());
	    
	    /* Disjoint stuff. */
	    var disjointNodes = d3.select("#disjointNodes");
	    var disjointNodesParent = d3.select(disjointNodes.node().parentNode);
	    
	    if ( node.disjointWith() !== undefined ) {
	      disjointNodes.selectAll("*").remove();
	      
	      node.disjointWith().forEach(function ( element, index ){
	        if ( index > 0 ) {
	          disjointNodes.append("span").text(", ");
	        }
	        appendIriLabel(disjointNodes, element.labelForCurrentLanguage(), element.iri());
	      });
	      
	      disjointNodesParent.classed("hidden", false);
	    } else {
	      disjointNodesParent.classed("hidden", true);
	    }
	    
	    displayAttributes(node.attributes(), d3.select("#classAttributes"));
	    
	    setTextAndVisibility(d3.select("#nodeDescription"), node.descriptionForCurrentLanguage());
	    setTextAndVisibility(d3.select("#nodeComment"), node.commentForCurrentLanguage());
	    
	    listAnnotations(d3.select("#classSelectionInformation"), node.annotations());
	  }
	  
	  function showClassInformations(){
	    setSelectionInformationVisibility(true, false, false);
	  }
	  
	  function listNodeArray( textSpan, nodes ){
	    var spanParent = d3.select(textSpan.node().parentNode);
	    
	    if ( nodes && nodes.length ) {
	      textSpan.selectAll("*").remove();
	      nodes.forEach(function ( element, index ){
	        if ( index > 0 ) {
	          textSpan.append("span").text(", ");
	        }
	        appendIriLabel(textSpan, element.labelForCurrentLanguage(), element.iri());
	      });
	      
	      spanParent.classed("hidden", false);
	    } else {
	      spanParent.classed("hidden", true);
	    }
	  }
	  
	  function setTextAndVisibility( label, value ){
	    var parentNode = d3.select(label.node().parentNode);
	    var hasValue = !!value;
	    if ( value ) {
	      label.text(value);
	    }
	    parentNode.classed("hidden", !hasValue);
	  }
	  
	  /** Collapsible Sidebar functions; **/
	  
	  sidebar.showSidebar = function ( val, init ){
	    // make val to bool
	    if ( val === 1 ) {
	      visibleSidebar = true;
	      collapseButton.node().innerHTML = ">";
	      detailArea.classed("hidden", true);
	      if ( init === true ) {
	        detailArea.classed("hidden", !visibleSidebar);
	        graphArea.style("width", "78%");
	        graphArea.style("-webkit-animation-name", "none");
	        
	        menuArea.style("width", "78%");
	        menuArea.style("-webkit-animation-name", "none");
	        
	        d3.select("#WarningErrorMessagesContainer").style("width", "78%");
	        d3.select("#WarningErrorMessagesContainer").style("-webkit-animation-name", "none");
	      } else {
	        graphArea.style("width", "78%");
	        graphArea.style("-webkit-animation-name", "sbCollapseAnimation");
	        graphArea.style("-webkit-animation-duration", "0.5s");
	        
	        menuArea.style("width", "78%");
	        menuArea.style("-webkit-animation-name", "sbCollapseAnimation");
	        menuArea.style("-webkit-animation-duration", "0.5s");
	        
	        d3.select("#WarningErrorMessagesContainer").style("width", "78%");
	        d3.select("#WarningErrorMessagesContainer").style("-webkit-animation-name", "warn_ExpandRightBarAnimation");
	        d3.select("#WarningErrorMessagesContainer").style("-webkit-animation-duration", "0.5s");
	      }
	      graph.options().width(window.innerWidth - (window.innerWidth * 0.22));
	      graph.options().navigationMenu().updateScrollButtonVisibility();
	    }
	    if ( val === 0 ) {
	      visibleSidebar = false;
	      detailArea.classed("hidden", true);
	      
	      collapseButton.node().innerHTML = "<";
	      // adjust the layout
	      if ( init === true ) {
	        graphArea.style("width", "100%");
	        graphArea.style("-webkit-animation-name", "none");
	        
	        menuArea.style("width", "100%");
	        menuArea.style("-webkit-animation-name", "none");
	        
	        d3.select("#WarningErrorMessagesContainer").style("width", "100%");
	        d3.select("#WarningErrorMessagesContainer").style("-webkit-animation-name", "none");
	      } else {
	        graphArea.style("width", "100%");
	        graphArea.style("-webkit-animation-name", "sbExpandAnimation");
	        graphArea.style("-webkit-animation-duration", "0.5s");
	        
	        menuArea.style("width", "100%");
	        menuArea.style("-webkit-animation-name", "sbExpandAnimation");
	        menuArea.style("-webkit-animation-duration", "0.5s");
	        
	        d3.select("#WarningErrorMessagesContainer").style("width", "100%");
	        d3.select("#WarningErrorMessagesContainer").style("-webkit-animation-name", "warn_CollapseRightBarAnimation");
	        d3.select("#WarningErrorMessagesContainer").style("-webkit-animation-duration", "0.5s");
	        
	      }
	      graph.options().width(window.innerWidth);
	      graph.updateCanvasContainerSize();
	      graph.options().navigationMenu().updateScrollButtonVisibility();
	    }
	  };
	  
	  sidebar.isSidebarVisible = function (){
	    return visibleSidebar;
	  };
	  
	  sidebar.updateSideBarVis = function ( init ){
	    var vis = sidebar.getSidebarVisibility();
	    sidebar.showSidebar(parseInt(vis), init);
	  };
	  
	  sidebar.getSidebarVisibility = function (){
	    var isHidden = detailArea.classed("hidden");
	    if ( isHidden === false ) return String(1);
	    if ( isHidden === true ) return String(0);
	  };
	  
	  sidebar.initSideBarAnimation = function (){
	    graphArea.node().addEventListener("animationend", function (){
	      detailArea.classed("hidden", !visibleSidebar);
	      graph.updateCanvasContainerSize();
	      graph.options().navigationMenu().updateScrollButtonVisibility();
	    });
	  };
	  
	  sidebar.setup = function (){
	    setupCollapsing();
	    sidebar.initSideBarAnimation();
	    
	    collapseButton.on("click", function (){
	      graph.options().navigationMenu().hideAllMenus();
	      var settingValue = parseInt(sidebar.getSidebarVisibility());
	      if ( settingValue === 1 ) sidebar.showSidebar(0);
	      else                  sidebar.showSidebar(1);
	    });
	  };
	  
	  
	  sidebar.updateShowedInformation = function (){
	    var editMode = graph.editorMode();
	    d3.select("#generalDetails").classed("hidden", editMode);
	    d3.select("#generalDetailsEdit").classed("hidden", !editMode);
	    
	    // store the meta information in graph.options()
	    
	    // todo: update edit meta info
	    graph.options().editSidebar().updateGeneralOntologyInfo();
	    
	    // todo: update showed meta info;
	    graph.options().sidebar().updateGeneralOntologyInfo();
	    
	  };
	  
	  sidebar.updateGeneralOntologyInfo = function (){
	    // get it from graph.options
	    var generalMetaObj = graph.options().getGeneralMetaObject();
	    var preferredLanguage = graph && graph.language ? graph.language() : null;
	    if ( generalMetaObj.hasOwnProperty("title") ) {
	      // title has language to it -.-
	      if ( typeof generalMetaObj.title === "object" ) {
	        d3.select("#title").node().value = languageTools.textInLanguage(generalMetaObj.title, preferredLanguage);
	      } else {
	        d3.select("#title").node().innerHTML = generalMetaObj.title;
	      }
	      
	    }
	    if ( generalMetaObj.hasOwnProperty("iri") ) d3.select("#about").node().innerHTML = generalMetaObj.iri;
	    if ( generalMetaObj.hasOwnProperty("iri") ) d3.select("#about").node().href = generalMetaObj.iri;
	    if ( generalMetaObj.hasOwnProperty("version") ) d3.select("#version").node().innerHTML = generalMetaObj.version;
	    if ( generalMetaObj.hasOwnProperty("author") ) d3.select("#authors").node().innerHTML = generalMetaObj.author;
	    // this could also be an object >>
	    if ( generalMetaObj.hasOwnProperty("description") ) {
	      if ( typeof generalMetaObj.description === "object" ) {
	        d3.select("#description").node().innerHTML = languageTools.textInLanguage(generalMetaObj.description, preferredLanguage);
	      }
	      else {
	        d3.select("#description").node().innerHTML = generalMetaObj.description;
	      }
	    }
	  };
	  
	  
	  return sidebar;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the logic for the sidebar.
	 * @param graph the graph that belongs to these controls
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var leftSidebar = {},
	    languageTools = webvowl.util.languageTools(),
	    elementTools = webvowl.util.elementTools();
	  var collapseButton = d3.select("#leftSideBarCollapseButton");
	  var visibleSidebar = 0;
	  var backupVisibility = 0;
	  var sideBarContent = d3.select("#leftSideBarContent");
	  var sideBarContainer = d3.select("#containerForLeftSideBar");
	  var defaultClassSelectionContainers = [];
	  var defaultDatatypeSelectionContainers = [];
	  var defaultPropertySelectionContainers = [];
	  
	  leftSidebar.setup = function (){
	    setupCollapsing();
	    leftSidebar.initSideBarAnimation();
	    
	    collapseButton.on("click", function (){
	      graph.options().navigationMenu().hideAllMenus();
	      var settingValue = parseInt(leftSidebar.getSidebarVisibility());
	      if ( settingValue === 0 ) leftSidebar.showSidebar(1);
	      else                  leftSidebar.showSidebar(0);
	      backupVisibility = settingValue;
	    });
	    
	    setupSelectionContainers();
	    d3.select("#WarningErrorMessages").node().addEventListener("animationend", function (){
	      d3.select("#WarningErrorMessages").style("-webkit-animation-name", "none");
	    });
	    
	  };
	  
	  leftSidebar.hideCollapseButton = function ( val ){
	    sideBarContainer.classed("hidden", val);
	  };
	  
	  
	  function unselectAllElements( container ){
	    for ( var i = 0; i < container.length; i++ )
	      container[i].classed("defaultSelected", false);
	  }
	  
	  function selectThisDefaultElement( element ){
	    d3.select(element).classed("defaultSelected", true);
	  }
	  
	  function updateDefaultNameInAccordion( element, identifier ){
	    var elementDescription = "";
	    if ( identifier === "defaultClass" ) elementDescription = "Class: ";
	    if ( identifier === "defaultDatatype" ) elementDescription = "Datatype: ";
	    if ( identifier === "defaultProperty" ) elementDescription = "Property: ";
	    
	    d3.select("#" + identifier).node().innerHTML = elementDescription + element.innerHTML;
	    d3.select("#" + identifier).node().title = element.innerHTML;
	  }
	  
	  function classSelectorFunction(){
	    unselectAllElements(defaultClassSelectionContainers);
	    selectThisDefaultElement(this);
	    updateDefaultNameInAccordion(this, "defaultClass");
	  }
	  
	  function datatypeSelectorFunction(){
	    unselectAllElements(defaultDatatypeSelectionContainers);
	    selectThisDefaultElement(this);
	    updateDefaultNameInAccordion(this, "defaultDatatype");
	  }
	  
	  function propertySelectorFunction(){
	    unselectAllElements(defaultPropertySelectionContainers);
	    selectThisDefaultElement(this);
	    updateDefaultNameInAccordion(this, "defaultProperty");
	  }
	  
	  
	  function setupSelectionContainers(){
	    var classContainer = d3.select("#classContainer");
	    var datatypeContainer = d3.select("#datatypeContainer");
	    var propertyContainer = d3.select("#propertyContainer");
	    // create the supported elements
	    
	    var defaultClass = "owl:Class";
	    var defaultDatatype = "rdfs:Literal";
	    var defaultProperty = "owl:objectProperty";
	    
	    var supportedClasses = graph.options().supportedClasses();
	    var supportedDatatypes = graph.options().supportedDatatypes();
	    var supportedProperties = graph.options().supportedProperties();
	    var i;
	    
	    for ( i = 0; i < supportedClasses.length; i++ ) {
	      var aClassSelectionContainer;
	      aClassSelectionContainer = classContainer.append("div");
	      aClassSelectionContainer.classed("containerForDefaultSelection", true);
	      aClassSelectionContainer.classed("noselect", true);
	      aClassSelectionContainer.node().id = "selectedClass" + supportedClasses[i];
	      aClassSelectionContainer.node().innerHTML = supportedClasses[i];
	      
	      if ( supportedClasses[i] === defaultClass ) {
	        selectThisDefaultElement(aClassSelectionContainer.node());
	      }
	      aClassSelectionContainer.on("click", classSelectorFunction);
	      defaultClassSelectionContainers.push(aClassSelectionContainer);
	    }
	    
	    for ( i = 0; i < supportedDatatypes.length; i++ ) {
	      var aDTSelectionContainer = datatypeContainer.append("div");
	      aDTSelectionContainer.classed("containerForDefaultSelection", true);
	      aDTSelectionContainer.classed("noselect", true);
	      aDTSelectionContainer.node().id = "selectedDatatype" + supportedDatatypes[i];
	      aDTSelectionContainer.node().innerHTML = supportedDatatypes[i];
	      
	      if ( supportedDatatypes[i] === defaultDatatype ) {
	        selectThisDefaultElement(aDTSelectionContainer.node());
	      }
	      aDTSelectionContainer.on("click", datatypeSelectorFunction);
	      defaultDatatypeSelectionContainers.push(aDTSelectionContainer);
	    }
	    for ( i = 0; i < supportedProperties.length; i++ ) {
	      var aPropSelectionContainer = propertyContainer.append("div");
	      aPropSelectionContainer.classed("containerForDefaultSelection", true);
	      aPropSelectionContainer.classed("noselect", true);
	      aPropSelectionContainer.node().id = "selectedClass" + supportedProperties[i];
	      aPropSelectionContainer.node().innerHTML = supportedProperties[i];
	      aPropSelectionContainer.on("click", propertySelectorFunction);
	      if ( supportedProperties[i] === defaultProperty ) {
	        selectThisDefaultElement(aPropSelectionContainer.node());
	      }
	      defaultPropertySelectionContainers.push(aPropSelectionContainer);
	    }
	  }
	  
	  function setupCollapsing(){
	    // adapted version of this example: http://www.normansblog.de/simple-jquery-accordion/
	    function collapseContainers( containers ){
	      containers.classed("hidden", true);
	    }
	    
	    function expandContainers( containers ){
	      containers.classed("hidden", false);
	    }
	    
	    var triggers = d3.selectAll(".accordion-trigger");
	    
	    // Collapse all inactive triggers on startup
	    // collapseContainers(d3.selectAll(".accordion-trigger:not(.accordion-trigger-active) + div"));
	    
	    triggers.on("click", function (){
	      var selectedTrigger = d3.select(this);
	      if ( selectedTrigger.classed("accordion-trigger-active") ) {
	        // Collapse the active (which is also the selected) trigger
	        collapseContainers(d3.select(selectedTrigger.node().nextElementSibling));
	        selectedTrigger.classed("accordion-trigger-active", false);
	      } else {
	        // Collapse the other trigger ...
	        // collapseContainers(d3.selectAll(".accordion-trigger-active + div"));
	        // activeTriggers.classed("accordion-trigger-active", false);
	        // ... and expand the selected one
	        expandContainers(d3.select(selectedTrigger.node().nextElementSibling));
	        selectedTrigger.classed("accordion-trigger-active", true);
	      }
	    });
	  }
	  
	  
	  leftSidebar.isSidebarVisible = function (){
	    return visibleSidebar;
	  };
	  
	  leftSidebar.updateSideBarVis = function ( init ){
	    var vis = leftSidebar.getSidebarVisibility();
	    leftSidebar.showSidebar(parseInt(vis), init);
	  };
	  
	  leftSidebar.initSideBarAnimation = function (){
	    sideBarContainer.node().addEventListener("animationend", function (){
	      sideBarContent.classed("hidden", !visibleSidebar);
	      if ( visibleSidebar === true ) {
	        sideBarContainer.style("width", "200px");
	        sideBarContent.classed("hidden", false);
	        d3.select("#leftSideBarCollapseButton").style("left", "200px");
	        d3.select("#leftSideBarCollapseButton").classed("hidden", false);
	        d3.select("#WarningErrorMessages").style("left", "100px");
	      }
	      else {
	        sideBarContainer.style("width", "0px");
	        d3.select("#leftSideBarCollapseButton").style("left", "0px");
	        d3.select("#WarningErrorMessages").style("left", "0px");
	        d3.select("#leftSideBarCollapseButton").classed("hidden", false);
	        
	      }
	      graph.updateCanvasContainerSize();
	      graph.options().navigationMenu().updateScrollButtonVisibility();
	    });
	  };
	  
	  leftSidebar.showSidebar = function ( val, init ){
	    // make val to bool
	    var collapseButton = d3.select("#leftSideBarCollapseButton");
	    if ( init === true ) {
	      visibleSidebar = (backupVisibility === 0);
	      sideBarContent.classed("hidden", !visibleSidebar);
	      sideBarContainer.style("-webkit-animation-name", "none");
	      d3.select("#WarningErrorMessages").style("-webkit-animation-name", "none");
	      if ( visibleSidebar === true ) {
	        sideBarContainer.style("width", "200px");
	        sideBarContent.classed("hidden", false);
	        d3.select("#leftSideBarCollapseButton").style("left", "200px");
	        d3.select("#leftSideBarCollapseButton").classed("hidden", false);
	        d3.select("#WarningErrorMessages").style("left", "100px");
	        collapseButton.node().innerHTML = "<";
	      }
	      
	      else {
	        sideBarContainer.style("width", "0px");
	        d3.select("#WarningErrorMessages").style("left", "0px");
	        d3.select("#leftSideBarCollapseButton").style("left", "0px");
	        d3.select("#leftSideBarCollapseButton").classed("hidden", false);
	        collapseButton.node().innerHTML = ">";
	      }
	      
	      graph.updateCanvasContainerSize();
	      graph.options().navigationMenu().updateScrollButtonVisibility();
	      return;
	    }
	    
	    d3.select("#leftSideBarCollapseButton").classed("hidden", true);
	    
	    if ( val === 1 ) {
	      visibleSidebar = true;
	      collapseButton.node().innerHTML = "<";
	      // call expand animation;
	      sideBarContainer.style("-webkit-animation-name", "l_sbExpandAnimation");
	      sideBarContainer.style("-webkit-animation-duration", "0.5s");
	      // prepare the animation;
	      
	      d3.select("#WarningErrorMessages").style("-webkit-animation-name", "warn_ExpandLeftBarAnimation");
	      d3.select("#WarningErrorMessages").style("-webkit-animation-duration", "0.5s");
	      
	    }
	    if ( val === 0 ) {
	      visibleSidebar = false;
	      sideBarContent.classed("hidden", true);
	      collapseButton.node().innerHTML = ">";
	      // call collapse animation
	      sideBarContainer.style("-webkit-animation-name", "l_sbCollapseAnimation");
	      sideBarContainer.style("-webkit-animation-duration", "0.5s");
	      d3.select("#WarningErrorMessages").style("-webkit-animation-name", "warn_CollapseLeftBarAnimation");
	      d3.select("#WarningErrorMessages").style("-webkit-animation-duration", "0.5s");
	      d3.select("#WarningErrorMessages").style("left", "0");
	    }
	    
	  };
	  
	  leftSidebar.getSidebarVisibility = function (){
	    var isHidden = sideBarContent.classed("hidden");
	    if ( isHidden === false ) return String(1);
	    if ( isHidden === true ) return String(0);
	  };
	  
	  return leftSidebar;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains the logic for the sidebar.
	 * @param graph the graph that belongs to these controls
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var editSidebar = {},
	    languageTools = webvowl.util.languageTools(),
	    elementTools = webvowl.util.elementTools();
	  
	  var prefixModule = webvowl.util.prefixTools(graph);
	  var selectedElementForCharacteristics;
	  var oldPrefix, oldPrefixURL;
	  var prefix_editMode = false;
	  
	  
	  editSidebar.clearMetaObjectValue = function (){
	    d3.select("#titleEditor").node().value = "";
	    d3.select("#iriEditor").node().value = "";
	    d3.select("#versionEditor").node().value = "";
	    d3.select("#authorsEditor").node().value = "";
	    d3.select("#descriptionEditor").node().value = "";
	    // todo add clear description;
	  };
	  
	  
	  editSidebar.updatePrefixUi = function (){
	    editSidebar.updateElementWidth();
	    var prefixListContainer = d3.select("#prefixURL_Container");
	    while ( prefixListContainer.node().firstChild ) {
	      prefixListContainer.node().removeChild(prefixListContainer.node().firstChild);
	    }
	    setupPrefixList();
	  };
	  
	  editSidebar.setup = function (){
	    setupCollapsing();
	    setupPrefixList();
	    setupAddPrefixButton();
	    setupSupportedDatatypes();
	    
	    
	    d3.select("#titleEditor")
	      .on("change", function (){
	        graph.options().addOrUpdateGeneralObjectEntry("title", d3.select("#titleEditor").node().value);
	      })
	      .on("keydown", function (){
	        d3.event.stopPropagation();
	        if ( d3.event.keyCode === 13 ) {
	          d3.event.preventDefault();
	          graph.options().addOrUpdateGeneralObjectEntry("title", d3.select("#titleEditor").node().value);
	        }
	      });
	    d3.select("#iriEditor")
	      .on("change", function (){
	        if ( graph.options().addOrUpdateGeneralObjectEntry("iri", d3.select("#iriEditor").node().value) === false ) {
	          // restore value
	          d3.select("#iriEditor").node().value = graph.options().getGeneralMetaObjectProperty('iri');
	        }
	      })
	      .on("keydown", function (){
	        d3.event.stopPropagation();
	        if ( d3.event.keyCode === 13 ) {
	          d3.event.preventDefault();
	          if ( graph.options().addOrUpdateGeneralObjectEntry("iri", d3.select("#iriEditor").node().value) === false ) {
	            // restore value
	            d3.select("#iriEditor").node().value = graph.options().getGeneralMetaObjectProperty('iri');
	          }
	        }
	      });
	    d3.select("#versionEditor")
	      .on("change", function (){
	        graph.options().addOrUpdateGeneralObjectEntry("version", d3.select("#versionEditor").node().value);
	      })
	      .on("keydown", function (){
	        d3.event.stopPropagation();
	        if ( d3.event.keyCode === 13 ) {
	          d3.event.preventDefault();
	          graph.options().addOrUpdateGeneralObjectEntry("version", d3.select("#versionEditor").node().value);
	        }
	      });
	    d3.select("#authorsEditor")
	      .on("change", function (){
	        graph.options().addOrUpdateGeneralObjectEntry("author", d3.select("#authorsEditor").node().value);
	      })
	      .on("keydown", function (){
	        d3.event.stopPropagation();
	        if ( d3.event.keyCode === 13 ) {
	          d3.event.preventDefault();
	          graph.options().addOrUpdateGeneralObjectEntry("author", d3.select("#authorsEditor").node().value);
	        }
	      });
	    d3.select("#descriptionEditor")
	      .on("change", function (){
	        graph.options().addOrUpdateGeneralObjectEntry("description", d3.select("#descriptionEditor").node().value);
	      });
	    
	    editSidebar.updateElementWidth();
	    
	  };
	  
	  function setupSupportedDatatypes(){
	    var datatypeEditorSelection = d3.select("#typeEditor_datatype").node();
	    var supportedDatatypes = ["undefined", "xsd:boolean", "xsd:double", "xsd:integer", "xsd:string"];
	    for ( var i = 0; i < supportedDatatypes.length; i++ ) {
	      var optB = document.createElement('option');
	      optB.innerHTML = supportedDatatypes[i];
	      datatypeEditorSelection.appendChild(optB);
	    }
	  }
	  
	  function highlightDeleteButton( enable, name ){
	    var deletePath = d3.select("#del_pathFor_" + name);
	    var deleteRect = d3.select("#del_rectFor_" + name);
	    
	    if ( enable === false ) {
	      deletePath.node().style = "stroke: #f00;";
	      deleteRect.style("cursor", "auto");
	    } else {
	      deletePath.node().style = "stroke: #ff972d;";
	      deleteRect.style("cursor", "pointer");
	    }
	  }
	  
	  
	  function highlightEditButton( enable, name, fill ){
	    var editPath = d3.select("#pathFor_" + name);
	    var editRect = d3.select("#rectFor_" + name);
	    
	    if ( enable === false ) {
	      if ( fill )
	        editPath.node().style = "fill: #fff; stroke : #fff; stroke-width : 1px";
	      else
	        editPath.node().style = " stroke : #fff; stroke-width : 1px";
	      
	      editRect.style("cursor", "auto");
	    } else {
	      if ( fill )
	        editPath.node().style = "fill: #ff972d; stroke : #ff972d; stroke-width : 1px";
	      else
	        editPath.node().style = "stroke : #ff972d; stroke-width : 1px";
	      editRect.style("cursor", "pointer");
	    }
	    
	  }
	  
	  function setupAddPrefixButton(){
	    var btn = d3.select("#addPrefixButton");
	    btn.on("click", function (){
	      
	      // check if we are still in editMode?
	      if ( prefix_editMode === false ) {
	        // create new line entry;
	        var name = "emptyPrefixEntry";
	        var prefixListContainer = d3.select("#prefixURL_Container");
	        var prefixEditContainer = prefixListContainer.append("div");
	        prefixEditContainer.classed("prefixIRIElements", true);
	        prefixEditContainer.node().id = "prefixContainerFor_" + name;
	        
	        var IconContainer = prefixEditContainer.append("div");
	        IconContainer.style("position", "absolute");
	        IconContainer.node().id = "containerFor_" + name;
	        var editButton = IconContainer.append("svg");
	        editButton.style("width", "14px");
	        editButton.style("height", "20px");
	        //   editButton.classed("editPrefixButton", true);
	        editButton.classed("noselect", true);
	        //editButton.node().innerHTML = "\u2714";
	        editButton.node().id = "editButtonFor_" + name;
	        
	        editButton.node().elementStyle = "save";
	        editButton.node().selectorName = name;
	        var editIcon = editButton.append("g");
	        var editRect = editIcon.append("rect");
	        var editPath = editIcon.append("path");
	        editIcon.node().id = "iconFor_" + name;
	        editPath.node().id = "pathFor_" + name;
	        editRect.node().id = "rectFor_" + name;
	        
	        editIcon.node().selectorName = name;
	        editPath.node().selectorName = name;
	        editRect.node().selectorName = name;
	        IconContainer.node().title = "Save new prefix and IRI";
	        
	        editPath.classed("editPrefixIcon");
	        editPath.style("stroke", "#fff");
	        editPath.style("stroke-width", "1px");
	        editPath.style("fill", "#fff");
	        editRect.attr("width", "14px");
	        editRect.attr("height", "14px");
	        editRect.style("fill", "#18202A");
	        editRect.attr("transform", "matrix(1,0,0,1,-3,4)");
	        
	        editButton.selectAll("g").on("mouseover", function (){
	          highlightEditButton(true, this.selectorName, true);
	        });
	        editButton.selectAll("g").on("mouseout", function (){
	          highlightEditButton(false, this.selectorName, true);
	        });
	        // Check mark
	        // M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z
	        // pencil
	        // M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z
	        editPath.attr("d", "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z");
	        editPath.attr("transform", "matrix(0.45,0,0,0.45,0,5)");
	        
	        var prefInput = prefixEditContainer.append("input");
	        prefInput.classed("prefixInput", true);
	        prefInput.node().type = "text";
	        prefInput.node().id = "prefixInputFor_" + name;
	        prefInput.node().autocomplete = "off";
	        prefInput.node().value = "";
	        prefInput.style("margin-left", "14px");
	        
	        var prefURL = prefixEditContainer.append("input");
	        prefURL.classed("prefixURL", true);
	        prefURL.node().type = "text";
	        prefURL.node().id = "prefixURLFor_" + name;
	        prefURL.node().autocomplete = "off";
	        prefURL.node().value = "";
	        
	        prefInput.node().disabled = false;
	        prefURL.node().disabled = false;
	        prefix_editMode = true;
	        var deleteContainer = prefixEditContainer.append("div");
	        deleteContainer.style("float", "right");
	        var deleteButton = deleteContainer.append("svg");
	        deleteButton.node().id = "deleteButtonFor_" + name;
	        deleteContainer.node().title = "Delete prefix and IRI";
	        deleteButton.style("width", "10px");
	        deleteButton.style("height", "20px");
	        var deleteIcon = deleteButton.append("g");
	        var deleteRect = deleteIcon.append("rect");
	        var deletePath = deleteIcon.append("path");
	        deleteIcon.node().id = "del_iconFor_" + name;
	        deletePath.node().id = "del_pathFor_" + name;
	        deleteRect.node().id = "del_rectFor_" + name;
	        
	        deleteIcon.node().selectorName = name;
	        deletePath.node().selectorName = name;
	        deleteRect.node().selectorName = name;
	        
	        
	        deletePath.style("stroke", "#f00");
	        deleteRect.attr("width", "10px");
	        deleteRect.attr("height", "14px");
	        deleteRect.style("fill", "#18202A");
	        deleteRect.attr("transform", "matrix(1,0,0,1,-3,4)");
	        
	        
	        deletePath.attr("d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
	        deletePath.attr("transform", "matrix(0.45,0,0,0.45,0,5)");
	        
	        deleteButton.selectAll("g").on("mouseover", function (){
	          highlightDeleteButton(true, this.selectorName);
	        });
	        deleteButton.selectAll("g").on("mouseout", function (){
	          highlightDeleteButton(false, this.selectorName);
	        });
	        
	        
	        // connect the buttons;
	        editButton.on("click", enablePrefixEdit);
	        deleteButton.on("click", deletePrefixLine);
	        
	        editSidebar.updateElementWidth();
	        // swap focus to prefixInput
	        prefInput.node().focus();
	        oldPrefix = name;
	        oldPrefixURL = "";
	        d3.select("#addPrefixButton").node().innerHTML = "Save Prefix";
	      } else {
	        d3.select("#editButtonFor_emptyPrefixEntry").on("click")(d3.select("#editButtonFor_emptyPrefixEntry").node());
	      }
	      
	    });
	    
	  }
	  
	  function setupPrefixList(){
	    if ( graph.isEditorMode() === false ) return;
	    var prefixListContainer = d3.select("#prefixURL_Container");
	    var prefixElements = graph.options().prefixList();
	    for ( var name in prefixElements ) {
	      if ( prefixElements.hasOwnProperty(name) ) {
	        var prefixEditContainer = prefixListContainer.append("div");
	        prefixEditContainer.classed("prefixIRIElements", true);
	        prefixEditContainer.node().id = "prefixContainerFor_" + name;
	        
	        // create edit button which enables the input fields
	        var IconContainer = prefixEditContainer.append("div");
	        IconContainer.style("position", "absolute");
	        IconContainer.node().id = "containerFor_" + name;
	        var editButton = IconContainer.append("svg");
	        editButton.style("width", "14px");
	        editButton.style("height", "20px");
	        editButton.classed("noselect", true);
	        editButton.node().id = "editButtonFor_" + name;
	        IconContainer.node().title = "Edit prefix and IRI";
	        editButton.node().elementStyle = "save";
	        editButton.node().selectorName = name;
	        
	        editButton.node().id = "editButtonFor_" + name;
	        editButton.node().elementStyle = "edit";
	        var editIcon = editButton.append("g");
	        var editRect = editIcon.append("rect");
	        var editPath = editIcon.append("path");
	        editIcon.node().id = "iconFor_" + name;
	        editPath.node().id = "pathFor_" + name;
	        editRect.node().id = "rectFor_" + name;
	        
	        editIcon.node().selectorName = name;
	        editPath.node().selectorName = name;
	        editRect.node().selectorName = name;
	        
	        
	        editPath.classed("editPrefixIcon");
	        editPath.style("stroke", "#fff");
	        editPath.style("stroke-width", "1px");
	        editRect.attr("width", "14px");
	        editRect.attr("height", "14px");
	        editRect.style("fill", "#18202A");
	        editRect.attr("transform", "matrix(1,0,0,1,-3,4)");
	        
	        editButton.selectAll("g").on("mouseover", function (){
	          var sender = this;
	          var fill = false;
	          var enable = true;
	          var f_editPath = d3.select("#pathFor_" + sender.selectorName);
	          var f_editRect = d3.select("#rectFor_" + sender.selectorName);
	          
	          if ( enable === false ) {
	            if ( fill )
	              f_editPath.node().style = "fill: #fff; stroke : #fff; stroke-width : 1px";
	            else
	              f_editPath.node().style = " stroke : #fff; stroke-width : 1px";
	            
	            f_editRect.style("cursor", "auto");
	          } else {
	            if ( fill )
	              f_editPath.node().style = "fill: #ff972d; stroke : #ff972d; stroke-width : 1px";
	            else
	              f_editPath.node().style = "stroke : #ff972d; stroke-width : 1px";
	            f_editRect.style("cursor", "pointer");
	          }
	        });
	        editButton.selectAll("g").on("mouseout", function (){
	          var sender = this;
	          var fill = false;
	          var enable = false;
	          var f_editPath = d3.select("#pathFor_" + sender.selectorName);
	          var f_editRect = d3.select("#rectFor_" + sender.selectorName);
	          
	          if ( enable === false ) {
	            if ( fill )
	              f_editPath.node().style = "fill: #fff; stroke : #fff; stroke-width : 1px";
	            else
	              f_editPath.node().style = " stroke : #fff; stroke-width : 1px";
	            
	            f_editRect.style("cursor", "auto");
	          } else {
	            if ( fill )
	              f_editPath.node().style = "fill: #ff972d; stroke : #ff972d; stroke-width : 1px";
	            else
	              f_editPath.node().style = "stroke : #ff972d; stroke-width : 1px";
	            f_editRect.style("cursor", "pointer");
	          }
	        });
	        
	        editPath.attr("d", "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z");
	        editPath.attr("transform", "matrix(-0.45,0,0,0.45,10,5)");
	        
	        // create input field for prefix
	        var prefInput = prefixEditContainer.append("input");
	        prefInput.classed("prefixInput", true);
	        prefInput.node().type = "text";
	        prefInput.node().id = "prefixInputFor_" + name;
	        prefInput.node().autocomplete = "off";
	        prefInput.node().value = name;
	        prefInput.style("margin-left", "14px");
	        
	        // create input field for prefix url
	        var prefURL = prefixEditContainer.append("input");
	        prefURL.classed("prefixURL", true);
	        prefURL.node().type = "text";
	        prefURL.node().id = "prefixURLFor_" + name;
	        prefURL.node().autocomplete = "off";
	        prefURL.node().value = prefixElements[name];
	        prefURL.node().title = prefixElements[name];
	        // disable the input fields (already defined elements can be edited later)
	        prefInput.node().disabled = true;
	        prefURL.node().disabled = true;
	        
	        // create the delete button
	        var deleteContainer = prefixEditContainer.append("div");
	        deleteContainer.style("float", "right");
	        var deleteButton = deleteContainer.append("svg");
	        deleteButton.node().id = "deleteButtonFor_" + name;
	        deleteContainer.node().title = "Delete prefix and IRI";
	        deleteButton.style("width", "10px");
	        deleteButton.style("height", "20px");
	        var deleteIcon = deleteButton.append("g");
	        var deleteRect = deleteIcon.append("rect");
	        var deletePath = deleteIcon.append("path");
	        deleteIcon.node().id = "del_iconFor_" + name;
	        deletePath.node().id = "del_pathFor_" + name;
	        deleteRect.node().id = "del_rectFor_" + name;
	        
	        deleteIcon.node().selectorName = name;
	        deletePath.node().selectorName = name;
	        deleteRect.node().selectorName = name;
	        
	        
	        deletePath.style("stroke", "#f00");
	        deleteRect.attr("width", "10px");
	        deleteRect.attr("height", "14px");
	        deleteRect.style("fill", "#18202A");
	        deleteRect.attr("transform", "matrix(1,0,0,1,-3,4)");
	        
	        
	        deletePath.attr("d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
	        deletePath.attr("transform", "matrix(0.45,0,0,0.45,0,5)");
	        
	        deleteButton.selectAll("g").on("mouseover", function (){
	          var selector = this;
	          var enable = true;
	          var f_deletePath = d3.select("#del_pathFor_" + selector.selectorName);
	          var f_deleteRect = d3.select("#del_rectFor_" + selector.selectorName);
	          
	          if ( enable === false ) {
	            f_deletePath.node().style = "stroke: #f00;";
	            f_deleteRect.style("cursor", "auto");
	          } else {
	            f_deletePath.node().style = "stroke: #ff972d;";
	            f_deleteRect.style("cursor", "pointer");
	          }
	        });
	        deleteButton.selectAll("g").on("mouseout", function (){
	          var selector = this;
	          var enable = false;
	          var f_deletePath = d3.select("#del_pathFor_" + selector.selectorName);
	          var f_deleteRect = d3.select("#del_rectFor_" + selector.selectorName);
	          
	          if ( enable === false ) {
	            f_deletePath.node().style = "stroke: #f00;";
	            f_deleteRect.style("cursor", "auto");
	          } else {
	            f_deletePath.node().style = "stroke: #ff972d;";
	            f_deleteRect.style("cursor", "pointer");
	          }
	        });
	        
	        
	        editButton.on("click", enablePrefixEdit);
	        deleteButton.on("click", deletePrefixLine);
	        
	        // EXPERIMENTAL
	        
	        if ( name === "rdf" ||
	          name === "rdfs" ||
	          name === "xsd" || name === "dc" ||
	          name === "owl"
	        ) {
	          // make them invis so the spacing does not change
	          IconContainer.classed("hidden", true);
	          deleteContainer.classed("hidden", true);
	        }
	      }
	    }
	    prefixModule.updatePrefixModel();
	  }
	  
	  function deletePrefixLine(){
	    if ( this.disabled === true ) return;
	    d3.select("#addPrefixButton").node().innerHTML = "Add Prefix";
	    var selector = this.id.split("_")[1];
	    d3.select("#prefixContainerFor_" + selector).remove();
	    graph.options().removePrefix(selector);
	    prefix_editMode = false; // <<TODO make some sanity checks
	    prefixModule.updatePrefixModel();
	  }
	  
	  function enablePrefixEdit( item ){
	    
	    var agent = this;
	    if ( item )
	      agent = item;
	    
	    if ( agent.disabled === true ) return;
	    var selector = agent.id.split("_")[1];
	    var stl = agent.elementStyle;
	    if ( stl === "edit" ) {
	      d3.select("#prefixInputFor_" + selector).node().disabled = false;
	      d3.select("#prefixURLFor_" + selector).node().disabled = false;
	      // change the button content
	      //  this.innerHTML = "\u2714";
	      agent.elementStyle = "save";
	      oldPrefix = d3.select("#prefixInputFor_" + selector).node().value;
	      oldPrefixURL = d3.select("#prefixURLFor_" + selector).node().value;
	      prefix_editMode = true;
	      if ( d3.select("#containerFor_" + selector).node() )
	        d3.select("#containerFor_" + selector).node().title = "Save new prefix and IRI";
	      
	      var editButton = d3.select(agent);
	      editButton.selectAll("g").on("mouseover", function (){
	        
	        highlightEditButton(true, agent.selectorName, true);
	      });
	      editButton.selectAll("g").on("mouseout", function (){
	        highlightEditButton(false, agent.selectorName, true);
	      });
	      
	      var editPath = d3.select("#pathFor_" + agent.selectorName);
	      editPath.attr("d", "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z");
	      editPath.attr("transform", "matrix(0.45,0,0,0.45,0,5)");
	      
	      highlightEditButton(true, agent.selectorName, true);
	      
	      
	    }
	    if ( stl === "save" ) {
	      var newPrefixURL = d3.select("#prefixURLFor_" + selector).node().value;
	      var newPrefix = d3.select("#prefixInputFor_" + selector).node().value;
	      
	      
	      if ( graph.options().updatePrefix(oldPrefix, newPrefix, oldPrefixURL, newPrefixURL) === true ) {
	        d3.select("#prefixInputFor_" + newPrefix).node().disabled = true;
	        d3.select("#prefixURLFor_" + newPrefix).node().disabled = true;
	        d3.select("#addPrefixButton").node().innerHTML = "Add Prefix";
	        if ( d3.select("#containerFor_" + selector).node() )
	          d3.select("#containerFor_" + selector).node().title = "Edit prefix and IRI";
	        
	        // change the button content
	        
	        agent.elementStyle = "edit";
	        prefix_editMode = false;
	        prefixModule.updatePrefixModel();
	        var saveButton = d3.select(agent);
	        saveButton.selectAll("g").on("mouseover", function (){
	          highlightEditButton(true, agent.selectorName, false);
	        });
	        saveButton.selectAll("g").on("mouseout", function (){
	          highlightEditButton(false, agent.selectorName, false);
	        });
	        
	        var savePath = d3.select("#pathFor_" + agent.selectorName);
	        savePath.attr("d", "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z");
	        savePath.attr("transform", "matrix(-0.45,0,0,0.45,10,5)");
	        highlightEditButton(true, agent.selectorName, false);
	      }
	    }
	  }
	  
	  function changeDatatypeType( element ){
	    var datatypeEditorSelection = d3.select("#typeEditor_datatype").node();
	    var givenName = datatypeEditorSelection.value;
	    var identifier = givenName.split(":")[1];
	    
	    if ( datatypeEditorSelection.value !== "undefined" ) {
	      d3.select("#element_iriEditor").node().disabled = true;
	      d3.select("#element_labelEditor").node().disabled = true;
	    } else {
	      identifier = "undefined";
	      d3.select("#element_iriEditor").node().disabled = false;
	      d3.select("#element_labelEditor").node().disabled = false;
	    }
	    element.label(identifier);
	    element.dType(givenName);
	    element.iri("http://www.w3.org/2001/XMLSchema#" + identifier);
	    element.baseIri("http://www.w3.org/2001/XMLSchema#");
	    element.redrawLabelText();
	    
	    d3.select("#element_iriEditor").node().value = prefixModule.getPrefixRepresentationForFullURI(element.iri());
	    d3.select("#element_iriEditor").node().title = element.iri();
	    d3.select("#element_labelEditor").node().value = element.labelForCurrentLanguage();
	  }
	  
	  
	  function identifyExternalCharacteristicForElement( ontoIRI, elementIRI ){
	    return (elementIRI.indexOf(ontoIRI) === -1);
	    
	  }
	  
	  function defaultIriValue( element ){
	    // get the iri of that element;
	    if ( graph.options().getGeneralMetaObject().iri ) {
	      var str2Compare = graph.options().getGeneralMetaObject().iri + element.id();
	      return element.iri() === str2Compare;
	    }
	    return false;
	  }
	  
	  function getURLFROMPrefixedVersion( element ){
	    var url = d3.select("#element_iriEditor").node().value;
	    var base = graph.options().getGeneralMetaObjectProperty("iri");
	    if ( validURL(url) === false ) {
	      
	      // make better usability
	      // try to split element;
	      var tokens = url.split(":");
	      
	      //console.log("try to split the input into prefix:name")
	      console.log("Tokens");
	      console.log(tokens);
	      console.log("---------------");
	      // TODO MORE VALIDATION TESTS
	      if ( tokens.length === 2 ) {
	        var pr = tokens[0];
	        var name = tokens[1];
	        if ( pr.length > 0 ) {
	          var basePref = graph.options().prefixList()[pr];
	          if ( basePref === undefined ) {
	            console.log("ERROR __________________");
	            graph.options().warningModule().showWarning("Invalid Element IRI",
	              "Could not resolve prefix '" + basePref + "'",
	              "Restoring previous IRI for Element" + element.iri(), 1, false);
	            d3.select("#element_iriEditor").node().value = element.iri();
	            return;
	            
	          }
	          // check if url is not empty
	          
	          if ( name.length === 0 ) {
	            graph.options().warningModule().showWarning("Invalid Element IRI",
	              "Input IRI is EMPTY",
	              "Restoring previous IRI for Element" + element.iri(), 1, false);
	            console.log("NO INPUT PROVIDED");
	            d3.select("#element_iriEditor").node().value = element.iri();
	            return;
	            
	          }
	          url = basePref + name;
	        }
	        else {
	          url = base + name;
	        }
	      } else {
	        if ( url.length === 0 ) {
	          //
	          console.log("NO INPUT PROVIDED");
	          d3.select("#element_iriEditor").node().value = element.iri();
	          return;
	        }
	        // failed to identify anything useful
	        console.log("Tryig to use the input!");
	        url = base + url;
	      }
	    }
	    return url;
	  }
	  
	  function changeIriForElement( element ){
	    var url = getURLFROMPrefixedVersion(element);
	    var base = graph.options().getGeneralMetaObjectProperty("iri");
	    var sanityCheckResult;
	    if ( elementTools.isNode(element) ) {
	      
	      sanityCheckResult = graph.checkIfIriClassAlreadyExist(url);
	      if ( sanityCheckResult === false ) {
	        element.iri(url);
	      } else {
	        // throw warnign
	        graph.options().warningModule().showWarning("Already seen this class",
	          "Input IRI: " + url + " for element: " + element.labelForCurrentLanguage() + " already been set",
	          "Restoring previous IRI for Element : " + element.iri(), 2, false, sanityCheckResult);
	        
	        editSidebar.updateSelectionInformation(element);
	        return;
	        
	      }
	    }
	    if ( elementTools.isProperty(element) === true ) {
	      sanityCheckResult = editSidebar.checkProperIriChange(element, url);
	      if ( sanityCheckResult !== false ) {
	        graph.options().warningModule().showWarning("Already seen this property",
	          "Input IRI: " + url + " for element: " + element.labelForCurrentLanguage() + " already been set",
	          "Restoring previous IRI for Element : " + element.iri(), 1, false, sanityCheckResult);
	        
	        editSidebar.updateSelectionInformation(element);
	        return;
	      }
	    }
	    
	    // if (element.existingPropertyIRI(url)===true){
	    //     console.log("I Have seen this Particular URL already "+url);
	    //     graph.options().warningModule().showWarning("Already Seen This one ",
	    //         "Input IRI For Element"+ element.labelForCurrentLanguage()+" already been set  ",
	    //         "Restoring previous IRI for Element"+element.iri(),1,false);
	    //     d3.select("#element_iriEditor").node().value=graph.options().prefixModule().getPrefixRepresentationForFullURI(element.iri());
	    //     editSidebar.updateSelectionInformation(element);
	    //     return;
	    // }
	    
	    element.iri(url);
	    if ( identifyExternalCharacteristicForElement(base, url) === true ) {
	      addAttribute(element, "external");
	      // background color for external element;
	      element.backgroundColor("#36C");
	      element.redrawElement();
	      element.redrawLabelText();
	      // handle visual selection
	      
	    } else {
	      removeAttribute(element, "external");
	      // background color for external element;
	      element.backgroundColor(undefined);
	      element.redrawElement();
	      element.redrawLabelText();
	      
	    }
	    
	    if ( element.focused() ) {
	      graph.options().focuserModule().handle(element, true); // unfocus
	      graph.options().focuserModule().handle(element, true); // focus
	    }
	    // graph.options().focuserModule().handle(undefined);
	    
	    
	    d3.select("#element_iriEditor").node().value = prefixModule.getPrefixRepresentationForFullURI(url);
	    editSidebar.updateSelectionInformation(element);
	  }
	  
	  function validURL( str ){
	    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	    return urlregex.test(str);
	  }
	  
	  
	  function changeLabelForElement( element ){
	    element.label(d3.select("#element_labelEditor").node().value);
	    element.redrawLabelText();
	  }
	  
	  editSidebar.updateEditDeleteButtonIds = function ( oldPrefix, newPrefix ){
	    d3.select("#prefixInputFor_" + oldPrefix).node().id = "prefixInputFor_" + newPrefix;
	    d3.select("#prefixURLFor_" + oldPrefix).node().id = "prefixURLFor_" + newPrefix;
	    d3.select("#deleteButtonFor_" + oldPrefix).node().id = "deleteButtonFor_" + newPrefix;
	    d3.select("#editButtonFor_" + oldPrefix).node().id = "editButtonFor_" + newPrefix;
	    
	    d3.select("#prefixContainerFor_" + oldPrefix).node().id = "prefixContainerFor_" + newPrefix;
	  };
	  
	  editSidebar.checkForExistingURL = function ( url ){
	    var i;
	    var allProps = graph.getUnfilteredData().properties;
	    for ( i = 0; i < allProps.length; i++ ) {
	      if ( allProps[i].iri() === url ) return true;
	    }
	    return false;
	    
	  };
	  editSidebar.checkProperIriChange = function ( element, url ){
	    console.log("Element changed Label");
	    console.log("Testing URL " + url);
	    if ( element.type() === "rdfs:subClassOf" || element.type() === "owl:disjointWith" ) {
	      console.log("ignore this for now, already handled in the type and domain range changer");
	    } else {
	      var i;
	      var allProps = graph.getUnfilteredData().properties;
	      for ( i = 0; i < allProps.length; i++ ) {
	        if ( allProps[i] === element ) continue;
	        if ( allProps[i].iri() === url ) return allProps[i];
	      }
	    }
	    return false;
	  };
	  
	  editSidebar.updateSelectionInformation = function ( element ){
	    
	    if ( element === undefined ) {
	      // show hint;
	      d3.select("#selectedElementProperties").classed("hidden", true);
	      d3.select("#selectedElementPropertiesEmptyHint").classed("hidden", false);
	      selectedElementForCharacteristics = null;
	      editSidebar.updateElementWidth();
	    }
	    else {
	      d3.select("#selectedElementProperties").classed("hidden", false);
	      d3.select("#selectedElementPropertiesEmptyHint").classed("hidden", true);
	      d3.select("#typeEditForm_datatype").classed("hidden", true);
	      
	      // set the element IRI, and labels
	      d3.select("#element_iriEditor").node().value = element.iri();
	      d3.select("#element_labelEditor").node().value = element.labelForCurrentLanguage();
	      d3.select("#element_iriEditor").node().title = element.iri();
	      
	      d3.select("#element_iriEditor")
	        .on("change", function (){
	          var elementIRI = element.iri();
	          var prefixed = graph.options().prefixModule().getPrefixRepresentationForFullURI(elementIRI);
	          if ( prefixed === d3.select("#element_iriEditor").node().value ) {
	            console.log("Iri is identical, nothing has changed!");
	            return;
	          }
	          
	          changeIriForElement(element);
	        })
	        .on("keydown", function (){
	          d3.event.stopPropagation();
	          if ( d3.event.keyCode === 13 ) {
	            d3.event.preventDefault();
	            console.log("IRI CHANGED Via ENTER pressed");
	            changeIriForElement(element);
	            d3.select("#element_iriEditor").node().title = element.iri();
	          }
	        });
	      
	      var forceIRISync = defaultIriValue(element);
	      d3.select("#element_labelEditor")
	        .on("change", function (){
	          var sanityCheckResult;
	          console.log("Element changed Label");
	          var url = getURLFROMPrefixedVersion(element);
	          if ( element.iri() !== url ) {
	            if ( elementTools.isProperty(element) === true ) {
	              sanityCheckResult = editSidebar.checkProperIriChange(element, url);
	              if ( sanityCheckResult !== false ) {
	                graph.options().warningModule().showWarning("Already seen this property",
	                  "Input IRI: " + url + " for element: " + element.labelForCurrentLanguage() + " already been set",
	                  "Continuing with duplicate property!", 1, false, sanityCheckResult);
	                editSidebar.updateSelectionInformation(element);
	                return;
	              }
	            }
	            
	            if ( elementTools.isNode(element) === true ) {
	              sanityCheckResult = graph.checkIfIriClassAlreadyExist(url);
	              if ( sanityCheckResult !== false ) {
	                graph.options().warningModule().showWarning("Already seen this Class",
	                  "Input IRI: " + url + " for element: " + element.labelForCurrentLanguage() + " already been set",
	                  "Restoring previous IRI for Element : " + element.iri(), 2, false, sanityCheckResult);
	                
	                editSidebar.updateSelectionInformation(element);
	                return;
	              }
	            }
	            element.iri(url);
	          }
	          changeLabelForElement(element);
	          editSidebar.updateSelectionInformation(element); // prevents that it will be changed if node is still active
	        })
	        .on("keydown", function (){
	          d3.event.stopPropagation();
	          if ( d3.event.keyCode === 13 ) {
	            d3.event.preventDefault();
	            var sanityCheckResult;
	            console.log("Element changed Label");
	            var url = getURLFROMPrefixedVersion(element);
	            if ( element.iri() !== url ) {
	              if ( elementTools.isProperty(element) === true ) {
	                sanityCheckResult = editSidebar.checkProperIriChange(element, url);
	                if ( sanityCheckResult !== false ) {
	                  graph.options().warningModule().showWarning("Already seen this property",
	                    "Input IRI: " + url + " for element: " + element.labelForCurrentLanguage() + " already been set",
	                    "Continuing with duplicate property!", 1, false, sanityCheckResult);
	                  
	                  editSidebar.updateSelectionInformation(element);
	                  return;
	                }
	              }
	              
	              if ( elementTools.isNode(element) === true ) {
	                sanityCheckResult = graph.checkIfIriClassAlreadyExist(url);
	                if ( sanityCheckResult !== false ) {
	                  graph.options().warningModule().showWarning("Already seen this Class",
	                    "Input IRI: " + url + " for element: " + element.labelForCurrentLanguage() + " already been set",
	                    "Restoring previous IRI for Element : " + element.iri(), 2, false, sanityCheckResult);
	                  
	                  editSidebar.updateSelectionInformation(element);
	                  return;
	                }
	              }
	              element.iri(url);
	            }
	            changeLabelForElement(element);
	          }
	        })
	        .on("keyup", function (){
	          if ( forceIRISync ) {
	            var labelName = d3.select("#element_labelEditor").node().value;
	            var resourceName = labelName.replaceAll(" ", "_");
	            var syncedIRI = element.baseIri() + resourceName;
	            
	            //element.iri(syncedIRI);
	            d3.select("#element_iriEditor").node().title = element.iri();
	            d3.select("#element_iriEditor").node().value = prefixModule.getPrefixRepresentationForFullURI(syncedIRI);
	          }
	        });
	      // check if we are allowed to change IRI OR LABEL
	      d3.select("#element_iriEditor").node().disabled = false;
	      d3.select("#element_labelEditor").node().disabled = false;
	      
	      if ( element.type() === "rdfs:subClassOf" ) {
	        d3.select("#element_iriEditor").node().value = "http://www.w3.org/2000/01/rdf-schema#subClassOf";
	        d3.select("#element_iriEditor").node().title = "http://www.w3.org/2000/01/rdf-schema#subClassOf";
	        d3.select("#element_labelEditor").node().value = "Subclass of";
	        d3.select("#element_iriEditor").node().disabled = true;
	        d3.select("#element_labelEditor").node().disabled = true;
	      }
	      if ( element.type() === "owl:Thing" ) {
	        d3.select("#element_iriEditor").node().value = "http://www.w3.org/2002/07/owl#Thing";
	        d3.select("#element_iriEditor").node().title = "http://www.w3.org/2002/07/owl#Thing";
	        d3.select("#element_labelEditor").node().value = "Thing";
	        d3.select("#element_iriEditor").node().disabled = true;
	        d3.select("#element_labelEditor").node().disabled = true;
	      }
	      
	      if ( element.type() === "owl:disjointWith" ) {
	        d3.select("#element_iriEditor").node().value = "http://www.w3.org/2002/07/owl#disjointWith";
	        d3.select("#element_iriEditor").node().title = "http://www.w3.org/2002/07/owl#disjointWith";
	        d3.select("#element_iriEditor").node().disabled = true;
	        d3.select("#element_labelEditor").node().disabled = true;
	      }
	      
	      if ( element.type() === "rdfs:Literal" ) {
	        d3.select("#element_iriEditor").node().value = "http://www.w3.org/2000/01/rdf-schema#Literal";
	        d3.select("#element_iriEditor").node().title = "http://www.w3.org/2000/01/rdf-schema#Literal";
	        d3.select("#element_iriEditor").node().disabled = true;
	        d3.select("#element_labelEditor").node().disabled = true;
	        element.iri("http://www.w3.org/2000/01/rdf-schema#Literal");
	      }
	      if ( element.type() === "rdfs:Datatype" ) {
	        var datatypeEditorSelection = d3.select("#typeEditor_datatype");
	        d3.select("#typeEditForm_datatype").classed("hidden", false);
	        element.iri("http://www.w3.org/2000/01/rdf-schema#Datatype");
	        d3.select("#element_iriEditor").node().value = "http://www.w3.org/2000/01/rdf-schema#Datatype";
	        d3.select("#element_iriEditor").node().title = "http://www.w3.org/2000/01/rdf-schema#Datatype";
	        d3.select("#element_iriEditor").node().disabled = true;
	        d3.select("#element_labelEditor").node().disabled = true;
	        
	        datatypeEditorSelection.node().value = element.dType();
	        if ( datatypeEditorSelection.node().value === "undefined" ) {
	          d3.select("#element_iriEditor").node().disabled = true; // always prevent IRI modifications
	          d3.select("#element_labelEditor").node().disabled = false;
	        }
	        // reconnect the element
	        datatypeEditorSelection.on("change", function (){
	          changeDatatypeType(element);
	        });
	      }
	      
	      // add type selector
	      var typeEditorSelection = d3.select("#typeEditor").node();
	      var htmlCollection = typeEditorSelection.children;
	      var numEntries = htmlCollection.length;
	      var i;
	      var elementPrototypes = getElementPrototypes(element);
	      for ( i = 0; i < numEntries; i++ )
	        typeEditorSelection.removeChild(htmlCollection[0]);
	      
	      for ( i = 0; i < elementPrototypes.length; i++ ) {
	        var optA = document.createElement('option');
	        optA.innerHTML = elementPrototypes[i];
	        typeEditorSelection.appendChild(optA);
	      }
	      // set the proper value in the selection
	      typeEditorSelection.value = element.type();
	      d3.select("#typeEditor").on("change", function (){
	        elementTypeSelectionChanged(element);
	      });
	      
	      
	      // add characteristics selection
	      var needChar = elementNeedsCharacteristics(element);
	      d3.select("#property_characteristics_Container").classed("hidden", !needChar);
	      if ( needChar === true ) {
	        addElementsCharacteristics(element);
	      }
	      var fullURI = d3.select("#element_iriEditor").node().value;
	      d3.select("#element_iriEditor").node().value = prefixModule.getPrefixRepresentationForFullURI(fullURI);
	      d3.select("#element_iriEditor").node().title = fullURI;
	      editSidebar.updateElementWidth();
	    }
	    
	  };
	  
	  editSidebar.updateGeneralOntologyInfo = function (){
	    var preferredLanguage = graph && graph.language ? graph.language() : null;
	    
	    // get it from graph.options
	    var generalMetaObj = graph.options().getGeneralMetaObject();
	    if ( generalMetaObj.hasOwnProperty("title") ) {
	      // title has language to it -.-
	      if ( typeof generalMetaObj.title === "object" ) {
	        d3.select("#titleEditor").node().value = languageTools.textInLanguage(generalMetaObj.title, preferredLanguage);
	      } else
	        d3.select("#titleEditor").node().value = generalMetaObj.title;
	    }
	    if ( generalMetaObj.hasOwnProperty("iri") ) d3.select("#iriEditor").node().value = generalMetaObj.iri;
	    if ( generalMetaObj.hasOwnProperty("version") ) d3.select("#versionEditor").node().value = generalMetaObj.version;
	    if ( generalMetaObj.hasOwnProperty("author") ) d3.select("#authorsEditor").node().value = generalMetaObj.author;
	    
	    
	    if ( generalMetaObj.hasOwnProperty("description") ) {
	      
	      if ( typeof generalMetaObj.description === "object" )
	        d3.select("#descriptionEditor").node().value =
	          languageTools.textInLanguage(generalMetaObj.description, preferredLanguage);
	      else
	        d3.select("#descriptionEditor").node().value = generalMetaObj.description;
	    }
	    else
	      d3.select("#descriptionEditor").node().value = "No Description";
	  };
	  
	  editSidebar.updateElementWidth = function (){
	    var height = window.innerHeight - 40;
	    var lsb_offset = d3.select("#logo").node().getBoundingClientRect().height + 5;
	    var lsb_height = height - lsb_offset;
	    d3.select("#containerForLeftSideBar").style("top", lsb_offset + "px");
	    d3.select("#leftSideBarCollapseButton").style("top", lsb_offset + "px");
	    d3.select("#containerForLeftSideBar").style("height", lsb_height + "px");
	    
	    var div_width = d3.select("#generalDetailsEdit").node().getBoundingClientRect().width;
	    div_width += 10;
	    
	    var title_labelWidth = d3.select("#titleEditor-label").node().getBoundingClientRect().width + 20;
	    var iri_labelWidth = d3.select("#iriEditor-label").node().getBoundingClientRect().width + 20;
	    var version_labelWidth = d3.select("#versionEditor-label").node().getBoundingClientRect().width + 20;
	    var author_labelWidth = d3.select("#authorsEditor-label").node().getBoundingClientRect().width + 20;
	    //find max width;
	    var maxW = 0;
	    maxW = Math.max(maxW, title_labelWidth);
	    maxW = Math.max(maxW, iri_labelWidth);
	    maxW = Math.max(maxW, version_labelWidth);
	    maxW = Math.max(maxW, author_labelWidth);
	    
	    var meta_inputWidth = div_width - maxW - 10;
	    
	    d3.select("#titleEditor").style("width", meta_inputWidth + "px");
	    d3.select("#iriEditor").style("width", meta_inputWidth + "px");
	    d3.select("#versionEditor").style("width", meta_inputWidth + "px");
	    d3.select("#authorsEditor").style("width", meta_inputWidth + "px");
	    
	    
	    var elementIri_width = d3.select("#element_iriEditor-label").node().getBoundingClientRect().width + 20;
	    var elementLabel_width = d3.select("#element_labelEditor-label").node().getBoundingClientRect().width + 20;
	    var elementType_width = d3.select("#typeEditor-label").node().getBoundingClientRect().width + 20;
	    var elementDType_width = d3.select("#typeEditor_datatype-label").node().getBoundingClientRect().width + 20;
	    
	    maxW = 0;
	    maxW = Math.max(maxW, elementIri_width);
	    maxW = Math.max(maxW, elementLabel_width);
	    maxW = Math.max(maxW, elementType_width);
	    maxW = Math.max(maxW, elementDType_width);
	    var selectedElement_inputWidth = div_width - maxW - 10;
	    
	    d3.select("#element_iriEditor").style("width", selectedElement_inputWidth + "px");
	    d3.select("#element_labelEditor").style("width", selectedElement_inputWidth + "px");
	    d3.select("#typeEditor").style("width", selectedElement_inputWidth + 4 + "px");
	    d3.select("#typeEditor_datatype").style("width", selectedElement_inputWidth + 4 + "px");
	    
	    // update prefix Element width;
	    var containerWidth = d3.select("#containerForPrefixURL").node().getBoundingClientRect().width;
	    if ( containerWidth !== 0 ) {
	      var inputs = d3.selectAll(".prefixInput");
	      if ( inputs.node() ) {
	        var prefixWidth = d3.selectAll(".prefixInput").node().getBoundingClientRect().width;
	        d3.selectAll(".prefixURL").style("width", containerWidth - prefixWidth - 45 + "px");
	      }
	    }
	  };
	  
	  function addElementsCharacteristics( element ){
	    // save selected element for checkbox handler
	    selectedElementForCharacteristics = element;
	    var i;
	    // KILL old elements
	    var charSelectionNode = d3.select("#property_characteristics_Selection");
	    var htmlCollection = charSelectionNode.node().children;
	    if ( htmlCollection ) {
	      var numEntries = htmlCollection.length;
	      for ( var q = 0; q < numEntries; q++ ) {
	        charSelectionNode.node().removeChild(htmlCollection[0]);
	      }
	    }
	    // datatypes kind of ignored by the elementsNeedCharacteristics function
	    // so we need to check if we are a node or not
	    if ( element.attributes().indexOf("external") > -1 ) {
	      // add external span to the div;
	      var externalCharSpan = charSelectionNode.append("span");
	      externalCharSpan.classed("spanForCharSelection", true);
	      externalCharSpan.node().innerHTML = "external";
	    }
	    var filterContainer,
	      filterCheckbox;
	    if ( elementTools.isNode(element) === true ) {
	      // add the deprecated characteristic;
	      var arrayOfNodeChars = ["deprecated"];
	      for ( i = 0; i < arrayOfNodeChars.length; i++ ) {
	        filterContainer = charSelectionNode
	          .append("div")
	          .classed("checkboxContainer", true)
	          .style("padding-top", "2px");
	        
	        filterCheckbox = filterContainer.append("input")
	          .classed("filterCheckbox", true)
	          .attr("id", "CharacteristicsCheckbox" + i)
	          .attr("type", "checkbox")
	          .attr("characteristics", arrayOfNodeChars[i])
	          .property("checked", getPresentAttribute(element, arrayOfNodeChars[i]));
	        //
	        filterContainer.append("label")
	          .attr("for", "CharacteristicsCheckbox" + i)
	          .text(arrayOfNodeChars[i]);
	        
	        filterCheckbox.on("click", handleCheckBoxClick);
	        
	      }
	    }
	    
	    else {
	      // add the deprecated characteristic;
	      var arrayOfPropertyChars = ["deprecated", "inverse functional", "functional", "transitive"];
	      if ( elementTools.isDatatypeProperty(element) === true ) {
	        arrayOfPropertyChars = ["deprecated", "functional"];
	      }
	      for ( i = 0; i < arrayOfPropertyChars.length; i++ ) {
	        filterContainer = charSelectionNode
	          .append("div")
	          .classed("checkboxContainer", true)
	          .style("padding-top", "2px");
	        
	        filterCheckbox = filterContainer.append("input")
	          .classed("filterCheckbox", true)
	          .attr("id", "CharacteristicsCheckbox" + i)
	          .attr("type", "checkbox")
	          .attr("characteristics", arrayOfPropertyChars[i])
	          .property("checked", getPresentAttribute(element, arrayOfPropertyChars[i]));
	        //
	        filterContainer.append("label")
	          .attr("for", "CharacteristicsCheckbox" + i)
	          .text(arrayOfPropertyChars[i]);
	        
	        filterCheckbox.on("click", handleCheckBoxClick);
	        
	      }
	    }
	    
	    
	  }
	  
	  function getPresentAttribute( selectedElement, element ){
	    return (selectedElement.attributes().indexOf(element) >= 0);
	  }
	  
	  function handleCheckBoxClick(){
	    var checked = this.checked;
	    var char = this.getAttribute("characteristics");
	    if ( checked === true ) {
	      addAttribute(selectedElementForCharacteristics, char);
	    } else {
	      removeAttribute(selectedElementForCharacteristics, char);
	    }
	    // graph.executeColorExternalsModule();
	    selectedElementForCharacteristics.redrawElement();
	    // workaround to have the node still be focused as rendering element
	    selectedElementForCharacteristics.focused(false);
	    selectedElementForCharacteristics.toggleFocus();
	    
	  }
	  
	  
	  function addAttribute( selectedElement, char ){
	    if ( selectedElement.attributes().indexOf(char) === -1 ) {
	      // not found add it
	      var attr = selectedElement.attributes();
	      attr.push(char);
	      selectedElement.attributes(attr);
	    }// indications string update;
	    if ( selectedElement.indications().indexOf(char) === -1 ) {
	      var indications = selectedElement.indications();
	      indications.push(char);
	      selectedElement.indications(indications);
	    }
	    // add visual attributes
	    var visAttr;
	    if ( selectedElement.visualAttributes().indexOf(char) === -1 ) {
	      visAttr = selectedElement.visualAttributes();
	      visAttr.push(char);
	      selectedElement.visualAttributes(visAttr);
	    }
	    if ( getPresentAttribute(selectedElement, "external") && getPresentAttribute(selectedElement, "deprecated") ) {
	      visAttr = selectedElement.visualAttributes();
	      var visInd = visAttr.indexOf("external");
	      if ( visInd > -1 ) {
	        visAttr.splice(visInd, 1);
	      }
	      selectedElement.visualAttributes(visAttr);
	    }
	    
	  }
	  
	  function removeAttribute( selectedElement, element ){
	    var attr = selectedElement.attributes();
	    var indications = selectedElement.indications();
	    var visAttr = selectedElement.visualAttributes();
	    var attrInd = attr.indexOf(element);
	    if ( attrInd >= 0 ) {
	      attr.splice(attrInd, 1);
	    }
	    var indInd = indications.indexOf(element);
	    if ( indInd > -1 ) {
	      indications.splice(indInd, 1);
	    }
	    var visInd = visAttr.indexOf(element);
	    if ( visInd > -1 ) {
	      visAttr.splice(visInd, 1);
	    }
	    selectedElement.attributes(attr);
	    selectedElement.indications(indications);
	    selectedElement.visualAttributes(visAttr);
	    if ( element === "deprecated" ) {
	      // set its to its original Style
	      //typeBaseThign
	      // todo : fix all different types
	      if ( selectedElement.type() === "owl:Class" ) selectedElement.styleClass("class");
	      if ( selectedElement.type() === "owl:DatatypeProperty" ) selectedElement.styleClass("datatypeproperty");
	      if ( selectedElement.type() === "owl:ObjectProperty" ) selectedElement.styleClass("objectproperty");
	      if ( selectedElement.type() === "owl:disjointWith" ) selectedElement.styleClass("disjointwith");
	    }
	  }
	  
	  
	  function elementNeedsCharacteristics( element ){
	    //TODO: Add more types
	    if ( element.type() === "owl:Thing" ||
	      element.type() === "rdfs:subClassOf" ||
	      element.type() === "rdfs:Literal" ||
	      element.type() === "rdfs:Datatype" ||
	      element.type() === "rdfs:disjointWith" )
	      return false;
	    
	    // if (element.attributes().indexOf("external")||
	    //     element.attributes().indexOf("deprecated"))
	    //     return true;
	    return true;
	    
	  }
	  
	  function elementTypeSelectionChanged( element ){
	    if ( elementTools.isNode(element) ) {
	      if ( graph.changeNodeType(element) === false ) {
	        //restore old value
	        
	        if ( elementTools.isDatatype(element) === true ) {
	          
	        }
	        editSidebar.updateSelectionInformation(element);
	      }
	    }
	    
	    if ( elementTools.isProperty(element) ) {
	      if ( graph.changePropertyType(element) === false ) {
	        //restore old value
	        editSidebar.updateSelectionInformation(element);
	        
	      }
	    }
	    
	  }
	  
	  function getElementPrototypes( selectedElement ){
	    var availiblePrototypes = [];
	    // TODO the text should be also complied with the prefixes loaded into the ontology
	    if ( elementTools.isProperty(selectedElement) ) {
	      if ( selectedElement.type() === "owl:DatatypeProperty" )
	        availiblePrototypes.push("owl:DatatypeProperty");
	      else {
	        availiblePrototypes.push("owl:ObjectProperty");
	        // handling loops !
	        if ( selectedElement.domain() !== selectedElement.range() ) {
	          availiblePrototypes.push("rdfs:subClassOf");
	        }
	        availiblePrototypes.push("owl:disjointWith");
	        availiblePrototypes.push("owl:allValuesFrom");
	        availiblePrototypes.push("owl:someValuesFrom");
	      }
	      return availiblePrototypes;
	    }
	    if ( selectedElement.renderType() === "rect" ) {
	      availiblePrototypes.push("rdfs:Literal");
	      availiblePrototypes.push("rdfs:Datatype");
	    } else {
	      availiblePrototypes.push("owl:Class");
	      availiblePrototypes.push("owl:Thing");
	      //  TODO: ADD MORE TYPES
	      // availiblePrototypes.push("owl:complementOf");
	      // availiblePrototypes.push("owl:disjointUnionOf");
	    }
	    return availiblePrototypes;
	  }
	  
	  
	  function setupCollapsing(){
	    // TODO : Decision , for now I want to have the control over the collapse expand operation of the
	    // TODO : elements, otherwise the old approach will also randomly collapse other containers
	    
	    // adapted version of this example: http://www.normansblog.de/simple-jquery-accordion/
	    function collapseContainers( containers ){
	      containers.classed("hidden", true);
	    }
	    
	    function expandContainers( containers ){
	      containers.classed("hidden", false);
	    }
	    
	    var triggers = d3.selectAll(".accordion-trigger");
	    
	    // Collapse all inactive triggers on startup
	    // collapseContainers(d3.selectAll(".accordion-trigger:not(.accordion-trigger-active) + div"));
	    
	    triggers.on("click", function (){
	      var selectedTrigger = d3.select(this);
	      if ( selectedTrigger.classed("accordion-trigger-active") ) {
	        // Collapse the active (which is also the selected) trigger
	        collapseContainers(d3.select(selectedTrigger.node().nextElementSibling));
	        selectedTrigger.classed("accordion-trigger-active", false);
	      } else {
	        // Collapse the other trigger ...
	        // collapseContainers(d3.selectAll(".accordion-trigger-active + div"));
	        
	        // ... and expand the selected one
	        expandContainers(d3.select(selectedTrigger.node().nextElementSibling));
	        selectedTrigger.classed("accordion-trigger-active", true);
	      }
	      editSidebar.updateElementWidth();
	    });
	  }
	  
	  return editSidebar;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  var configMenu = {},
	    checkboxes = [];
	  
	  
	  configMenu.setup = function (){
	    var menuEntry = d3.select("#m_modes");
	    menuEntry.on("mouseover", function (){
	      var searchMenu = graph.options().searchMenu();
	      searchMenu.hideSearchEntries();
	    });
	    
	    addCheckBox("showZoomSlider", "Zoom controls", "#zoomSliderOption", graph.options().zoomSlider().showSlider, 0);
	    addLabelWidthSlider("#maxLabelWidthSliderOption", "maxLabelWidth", "Max label width", graph.options().maxLabelWidth);
	  };
	  
	  
	  function addLabelWidthSlider( selector, identifier, label, onChangeFunction ){
	    var sliderContainer,
	      sliderValueLabel;
	    
	    sliderContainer = d3.select(selector)
	      .append("div")
	      .classed("distanceSliderContainer", true);
	    
	    var slider = sliderContainer.append("input")
	      .attr("id", identifier + "Slider")
	      .attr("type", "range")
	      .attr("min", 20)
	      .attr("max", 600)
	      .attr("value", onChangeFunction())
	      .attr("step", 10);
	    sliderContainer.append("label")
	      .classed("description", true)
	      .attr("for", identifier + "Slider")
	      .attr("id", identifier + "DescriptionLabel")
	      .text(label);
	    sliderValueLabel = sliderContainer.append("label")
	      .classed("value", true)
	      .attr("for", identifier + "Slider")
	      .attr("id", identifier + "valueLabel")
	      .text(onChangeFunction());
	    
	    slider.on("input", function (){
	      var value = slider.property("value");
	      onChangeFunction(value);
	      sliderValueLabel.text(value);
	      if ( graph.options().dynamicLabelWidth() === true )
	        graph.animateDynamicLabelWidth();
	    });
	    
	    // add wheel event to the slider
	    slider.on("wheel", function (){
	      if ( slider.node().disabled === true ) return;
	      var wheelEvent = d3.event;
	      var offset;
	      if ( wheelEvent.deltaY < 0 ) offset = 10;
	      if ( wheelEvent.deltaY > 0 ) offset = -10;
	      var oldVal = parseInt(slider.property("value"));
	      var newSliderValue = oldVal + offset;
	      if ( newSliderValue !== oldVal ) {
	        slider.property("value", newSliderValue);
	        onChangeFunction(newSliderValue);
	        slider.on("input")(); // << set text and update the graphStyles
	      }
	      d3.event.preventDefault();
	    });
	  }
	  
	  function addCheckBox( identifier, modeName, selector, onChangeFunc, updateLvl ){
	    var configOptionContainer = d3.select(selector)
	      .append("div")
	      .classed("checkboxContainer", true);
	    var configCheckbox = configOptionContainer.append("input")
	      .classed("moduleCheckbox", true)
	      .attr("id", identifier + "ConfigCheckbox")
	      .attr("type", "checkbox")
	      .property("checked", onChangeFunc());
	    
	    
	    configCheckbox.on("click", function ( silent ){
	      var isEnabled = configCheckbox.property("checked");
	      onChangeFunc(isEnabled);
	      if ( silent !== true ) {
	        // updating graph when silent is false or the parameter is not given.
	        if ( updateLvl === 1 ) {
	          graph.lazyRefresh();
	          //graph.redrawWithoutForce
	        }
	        if ( updateLvl === 2 ) {
	          graph.update();
	        }
	        
	        if ( updateLvl === 3 ) {
	          graph.updateDraggerElements();
	        }
	      }
	      
	    });
	    checkboxes.push(configCheckbox);
	    configOptionContainer.append("label")
	      .attr("for", identifier + "ConfigCheckbox")
	      .text(modeName);
	  }
	  
	  configMenu.setCheckBoxValue = function ( identifier, value ){
	    for ( var i = 0; i < checkboxes.length; i++ ) {
	      var cbdId = checkboxes[i].attr("id");
	      if ( cbdId === identifier ) {
	        checkboxes[i].property("checked", value);
	        break;
	      }
	    }
	  };
	  
	  configMenu.getCheckBoxValue = function ( id ){
	    for ( var i = 0; i < checkboxes.length; i++ ) {
	      var cbdId = checkboxes[i].attr("id");
	      if ( cbdId === id ) {
	        return checkboxes[i].property("checked");
	      }
	    }
	  };
	  
	  configMenu.updateSettings = function (){
	    var silent = true;
	    checkboxes.forEach(function ( checkbox ){
	      checkbox.on("click")(silent);
	    });
	  };
	  
	  return configMenu;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  /** some constants **/
	  var PREDEFINED = 0,
	    FILE_UPLOAD = 1,
	    JSON_URL = 2,
	    IRI_URL = 3;
	  
	  var PROGRESS_BAR_ERROR = 0,
	    PROGRESS_BAR_BUSY = 1,
	    PROGRESS_BAR_PERCENT = 2,
	    progressBarMode = 1;
	  
	  var loadingWasSuccessFul = false;
	  var missingImportsWarning = false;
	  var showLoadingDetails = false;
	  var visibilityStatus = true;
	  
	  var DEFAULT_JSON_NAME = "ontology"; // This file is loaded by default
	  var conversion_sessionId;
	  
	  /** variable defs **/
	  var loadingModule = {},
	    menuContainer = d3.select("#loading-info"),
	    loadingInfoContainer = d3.select("#loadingInfo-container"),
	    detailsButton = d3.select("#show-loadingInfo-button"),
	    closeButton = d3.select("#loadingIndicator_closeButton"),
	    ontologyMenu,
	    ontologyIdentifierFromURL;
	  
	  /** functon defs **/
	  loadingModule.checkForScreenSize = function (){
	    // checks for window size and adjusts the loading indicator
	    var w = graph.options().width(),
	      h = graph.options().height();
	    
	    if ( w < 270 ) {
	      d3.select("#loading-info").classed("hidden", true);
	    } else {
	      // check if it should be visible
	      if ( visibilityStatus === true ) {
	        d3.select("#loading-info").classed("hidden", false);
	      } else {
	        d3.select("#loading-info").classed("hidden", true);
	      }
	    }
	    if ( h < 150 ) {
	      d3.select("#loadingInfo_msgBox").classed("hidden", true);
	    } else {
	      d3.select("#loadingInfo_msgBox").classed("hidden", false);
	    }
	    if ( h < 80 ) {
	      d3.select("#progressBarContext").classed("hidden", true);
	      d3.select("#layoutLoadingProgressBarContainer").style("height", "20px");
	    } else {
	      d3.select("#progressBarContext").classed("hidden", false);
	      d3.select("#layoutLoadingProgressBarContainer").style("height", "50px");
	    }
	  };
	  
	  loadingModule.getMessageVisibilityStatus = function (){
	    return visibilityStatus;
	  };
	  
	  loadingModule.getProgressBarMode = function (){
	    return progressBarMode;
	  };
	  
	  loadingModule.successfullyLoadedOntology = function (){
	    return loadingWasSuccessFul;
	  };
	  
	  loadingModule.missingImportsWarning = function (){
	    return missingImportsWarning;
	  };
	  
	  loadingModule.setOntologyMenu = function ( m ){
	    ontologyMenu = m;
	  };
	  
	  loadingModule.showErrorDetailsMessage = function (){
	    loadingModule.showLoadingIndicator();
	    loadingModule.expandDetails();
	    d3.select("#loadingIndicator_closeButton").classed("hidden", true);
	    loadingModule.scrollDownDetails();
	  };
	  
	  loadingModule.showWarningDetailsMessage = function (){
	    d3.select("#currentLoadingStep").style("color", "#ff0");
	    loadingModule.showLoadingIndicator();
	    loadingModule.expandDetails();
	    d3.select("#loadingIndicator_closeButton").classed("hidden", false);
	    loadingModule.scrollDownDetails();
	  };
	  
	  loadingModule.scrollDownDetails = function (){
	    var scrollingElement = d3.select("#loadingInfo-container").node();
	    scrollingElement.scrollTop = scrollingElement.scrollHeight;
	  };
	  
	  loadingModule.hideLoadingIndicator = function (){
	    d3.select("#loading-info").classed("hidden", true);
	    visibilityStatus = false;
	  };
	  
	  loadingModule.showLoadingIndicator = function (){
	    d3.select("#loading-info").classed("hidden", false);
	    visibilityStatus = true;
	    
	  };
	  
	  /** -- SETUP -- **/
	  loadingModule.setup = function (){
	    // create connections for close and details button;
	    loadingInfoContainer.classed("hidden", !showLoadingDetails);
	    detailsButton.on("click", function (){
	      showLoadingDetails = !showLoadingDetails;
	      loadingInfoContainer.classed("hidden", !showLoadingDetails);
	      detailsButton.classed("accordion-trigger-active", showLoadingDetails);
	    });
	    
	    closeButton.on("click", function (){
	      menuContainer.classed("hidden", true);
	    });
	    loadingModule.setBusyMode();
	  };
	  
	  loadingModule.updateSize = function (){
	    showLoadingDetails = !(loadingInfoContainer.classed("hidden"));
	    loadingInfoContainer.classed("hidden", !showLoadingDetails);
	    detailsButton.classed("accordion-trigger-active", showLoadingDetails);
	  };
	  
	  loadingModule.getDetailsState = function (){
	    return showLoadingDetails;
	  };
	  
	  loadingModule.expandDetails = function (){
	    showLoadingDetails = true;
	    loadingInfoContainer.classed("hidden", !showLoadingDetails);
	    detailsButton.classed("accordion-trigger-active", showLoadingDetails);
	  };
	  
	  loadingModule.collapseDetails = function (){
	    showLoadingDetails = false;
	    loadingInfoContainer.classed("hidden", !showLoadingDetails);
	    detailsButton.classed("accordion-trigger-active", showLoadingDetails);
	  };
	  
	  loadingModule.setBusyMode = function (){
	    d3.select("#currentLoadingStep").style("color", "#fff");
	    d3.select("#progressBarValue").node().innherHTML = "";
	    d3.select("#progressBarValue").style("width", "20%");
	    d3.select("#progressBarValue").classed("busyProgressBar", true);
	    progressBarMode = PROGRESS_BAR_BUSY;
	  };
	  
	  loadingModule.setSuccessful = function (){
	    d3.select("#currentLoadingStep").style("color", "#0f0");
	  };
	  
	  loadingModule.setErrorMode = function (){
	    d3.select("#currentLoadingStep").style("color", "#f00");
	    d3.select("#progressBarValue").style("width", "0%");
	    d3.select("#progressBarValue").classed("busyProgressBar", false);
	    d3.select("#progressBarValue").node().innherHTML = "";
	    progressBarMode = PROGRESS_BAR_ERROR;
	  };
	  
	  loadingModule.setPercentMode = function (){
	    d3.select("#currentLoadingStep").style("color", "#fff");
	    d3.select("#progressBarValue").classed("busyProgressBar", false);
	    d3.select("#progressBarValue").node().innherHTML = "0%";
	    d3.select("#progressBarValue").style("width", "0%");
	    progressBarMode = PROGRESS_BAR_PERCENT;
	  };
	  
	  loadingModule.setPercentValue = function ( val ){
	    d3.select("#progressBarValue").node().innherHTML = val;
	  };
	  
	  loadingModule.emptyGraphContentError = function (){
	    graph.clearGraphData();
	    ontologyMenu.append_message_toLastBulletPoint("<span style='color:red;'>failed</span>");
	    ontologyMenu.append_message_toLastBulletPoint("<br><span style=\"color:red;\">Error: Received empty graph</span>");
	    loadingWasSuccessFul = false;
	    graph.handleOnLoadingError();
	    loadingModule.setErrorMode();
	  };
	  
	  loadingModule.isThreadCanceled = function (){
	    
	  };
	  
	  loadingModule.initializeLoader = function ( storeCache ){
	    if ( storeCache === true && graph.getCachedJsonObj() !== null ) {
	      // save cached ontology;
	      var cachedContent = JSON.stringify(graph.getCachedJsonObj());
	      var cachedName = ontologyIdentifierFromURL;
	      ontologyMenu.setCachedOntology(cachedName, cachedContent);
	    }
	    conversion_sessionId = -10000;
	    ontologyMenu.setConversionID(conversion_sessionId);
	    ontologyMenu.stopLoadingTimer();
	    graph.clearGraphData();
	    loadingModule.setBusyMode();
	    loadingModule.showLoadingIndicator();
	    loadingModule.collapseDetails();
	    missingImportsWarning = false;
	    d3.select("#loadingIndicator_closeButton").classed("hidden", true);
	    ontologyMenu.clearDetailInformation();
	  };
	  
	  /** ------------------ URL Interpreter -------------- **/
	  loadingModule.parseUrlAndLoadOntology = function ( storeCache ){
	    var autoStore = true;
	    if ( storeCache === false ) {
	      autoStore = false;
	    }
	    
	    graph.clearAllGraphData();
	    loadingModule.initializeLoader(autoStore);
	    var urlString = String(location);
	    var parameterArray = identifyParameter(urlString);
	    ontologyIdentifierFromURL = DEFAULT_JSON_NAME;
	    loadGraphOptions(parameterArray); // identifies and loads configuration values
	    var loadingMethod = identifyOntologyLoadingMethod(ontologyIdentifierFromURL);
	    d3.select("#progressBarValue").node().innerHTML = " ";
	    switch ( loadingMethod ) {
	      case 0:
	        loadingModule.from_presetOntology(ontologyIdentifierFromURL);
	        break;
	      case 1:
	        loadingModule.from_FileUpload(ontologyIdentifierFromURL);
	        break;
	      case 2:
	        loadingModule.from_JSON_URL(ontologyIdentifierFromURL);
	        break;
	      case 3:
	        loadingModule.from_IRI_URL(ontologyIdentifierFromURL);
	        break;
	      default:
	        console.log("Could not identify loading method , or not IMPLEMENTED YET");
	    }
	  };
	  
	  /** ------------------- LOADING --------------------- **/
	  // the loading module splits into 3 branches
	  // 1] PresetOntology Loading
	  // 2] File Upload
	  // 3] Load From URL / IRI
	  
	  loadingModule.from_JSON_URL = function ( fileName ){
	    var filename = decodeURIComponent(fileName.slice("url=".length));
	    ontologyIdentifierFromURL = filename;
	    
	    var ontologyContent = "";
	    if ( ontologyMenu.cachedOntology(filename) ) {
	      ontologyMenu.append_bulletPoint("Loading already cached ontology: " + filename);
	      ontologyContent = ontologyMenu.cachedOntology(filename);
	      loadingWasSuccessFul = true; // cached Ontology should be true;
	      parseOntologyContent(ontologyContent);
	      
	    } else {
	      // involve the o2v conveter;
	      ontologyMenu.append_message("Retrieving ontology from JSON URL " + filename);
	      requestServerTimeStampForJSON_URL(ontologyMenu.callbackLoad_JSON_FromURL, ["read?json=" + filename, filename]);
	    }
	  };
	  
	  function requestServerTimeStampForJSON_URL( callback, parameter ){
	    d3.xhr("serverTimeStamp", "application/text", function ( error, request ){
	      if ( error ) {
	        // could not get server timestamp -> no connection to owl2vowl
	        ontologyMenu.append_bulletPoint("Could not establish connection to OWL2VOWL service");
	        fallbackForJSON_URL(callback, parameter);
	      } else {
	        conversion_sessionId = request.responseText;
	        ontologyMenu.setConversionID(conversion_sessionId);
	        parameter.push(conversion_sessionId);
	        callback(parameter);
	      }
	    });
	    
	  }
	  
	  loadingModule.requestServerTimeStampForDirectInput = function ( callback, text ){
	    d3.xhr("serverTimeStamp", "application/text", function ( error, request ){
	      if ( error ) {
	        // could not get server timestamp -> no connection to owl2vowl
	        ontologyMenu.append_bulletPoint("Could not establish connection to OWL2VOWL service");
	        loadingModule.setErrorMode();
	        ontologyMenu.append_message_toLastBulletPoint("<br><span style='color:red'>Could not connect to OWL2VOWL service </span>");
	        loadingModule.showErrorDetailsMessage();
	        d3.select("#progressBarValue").style("width", "0%");
	        d3.select("#progressBarValue").classed("busyProgressBar", false);
	        d3.select("#progressBarValue").text("0%");
	        
	      } else {
	        conversion_sessionId = request.responseText;
	        ontologyMenu.setConversionID(conversion_sessionId);
	        callback(text, ["conversionID" + conversion_sessionId, conversion_sessionId]);
	      }
	    });
	  };
	  
	  loadingModule.from_IRI_URL = function ( fileName ){
	    // owl2vowl converters the given ontology url and returns json file;
	    var filename = decodeURIComponent(fileName.slice("iri=".length));
	    ontologyIdentifierFromURL = filename;
	    
	    var ontologyContent = "";
	    if ( ontologyMenu.cachedOntology(filename) ) {
	      ontologyMenu.append_bulletPoint("Loading already cached ontology: " + filename);
	      ontologyContent = ontologyMenu.cachedOntology(filename);
	      loadingWasSuccessFul = true; // cached Ontology should be true;
	      parseOntologyContent(ontologyContent);
	    } else {
	      // involve the o2v conveter;
	      var encoded = encodeURIComponent(filename);
	      ontologyMenu.append_bulletPoint("Retrieving ontology from IRI: " + filename);
	      requestServerTimeStampForIRI_Converte(ontologyMenu.callbackLoad_Ontology_FromIRI, ["convert?iri=" + encoded, filename]);
	    }
	  };
	  
	  loadingModule.fromFileDrop = function ( fileName, file ){
	    d3.select("#progressBarValue").node().innerHTML = " ";
	    loadingModule.initializeLoader(false);
	    
	    ontologyMenu.append_bulletPoint("Retrieving ontology from dropped file: " + fileName);
	    var ontologyContent = "";
	    
	    // two options here
	    //1] Direct Json Upload
	    if ( fileName.match(/\.json$/) ) {
	      ontologyMenu.setConversionID(-10000);
	      var reader = new FileReader();
	      reader.readAsText(file);
	      reader.onload = function (){
	        ontologyContent = reader.result;
	        ontologyIdentifierFromURL = fileName;
	        parseOntologyContent(ontologyContent);
	      };
	    } else {
	      //2] File Upload to OWL2VOWL Converter
	      // 1) check if we can get a timeStamp;
	      var parameterArray = [file, fileName];
	      requestServerTimeStamp(ontologyMenu.callbackLoadFromOntology, parameterArray);
	    }
	  };
	  
	  
	  loadingModule.from_FileUpload = function ( fileName ){
	    loadingModule.setBusyMode();
	    var filename = decodeURIComponent(fileName.slice("file=".length));
	    ontologyIdentifierFromURL = filename;
	    var ontologyContent = "";
	    if ( ontologyMenu.cachedOntology(filename) ) {
	      ontologyMenu.append_bulletPoint("Loading already cached ontology: " + filename);
	      ontologyContent = ontologyMenu.cachedOntology(filename);
	      loadingWasSuccessFul = true; // cached Ontology should be true;
	      parseOntologyContent(ontologyContent);
	      
	    } else {
	      // d3.select("#currentLoadingStep").node().innerHTML="Loading ontology from file "+ filename;
	      ontologyMenu.append_bulletPoint("Retrieving ontology from file: " + filename);
	      // get the file
	      var selectedFile = d3.select("#file-converter-input").property("files")[0];
	      // No selection -> this was triggered by the iri. Unequal names -> reuploading another file
	      if ( !selectedFile || (filename && (filename !== selectedFile.name)) ) {
	        ontologyMenu.append_message_toLastBulletPoint("<br><span style=\"color:red;\">No cached version of \"" + filename + "\" was found.</span><br>Please reupload the file.");
	        loadingModule.setErrorMode();
	        d3.select("#progressBarValue").classed("busyProgressBar", false);
	        graph.handleOnLoadingError();
	        return;
	      } else {
	        filename = selectedFile.name;
	      }


	// two options here
	//1] Direct Json Upload
	      if ( filename.match(/\.json$/) ) {
	        ontologyMenu.setConversionID(-10000);
	        var reader = new FileReader();
	        reader.readAsText(selectedFile);
	        reader.onload = function (){
	          ontologyContent = reader.result;
	          ontologyIdentifierFromURL = filename;
	          parseOntologyContent(ontologyContent);
	        };
	      } else {
	//2] File Upload to OWL2VOWL Converter
	        // 1) check if we can get a timeStamp;
	        var parameterArray = [selectedFile, filename];
	        requestServerTimeStamp(ontologyMenu.callbackLoadFromOntology, parameterArray);
	      }
	    }
	  };
	  
	  function fallbackForJSON_URL( callback, parameter ){
	    ontologyMenu.append_message_toLastBulletPoint("<br>Trying to convert with other communication protocol.");
	    callback(parameter);
	    
	  }
	  
	  function fallbackConversion( parameter ){
	    ontologyMenu.append_message_toLastBulletPoint("<br>Trying to convert with other communication protocol.");
	    var file = parameter[0];
	    var name = parameter[1];
	    var formData = new FormData();
	    formData.append("ontology", file);
	    
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", "convert", true);
	    var ontologyContent = "";
	    xhr.onload = function (){
	      if ( xhr.status === 200 ) {
	        ontologyContent = xhr.responseText;
	        ontologyMenu.setCachedOntology(name, ontologyContent);
	        ontologyIdentifierFromURL = name;
	        missingImportsWarning = true; // using this variable for warnings
	        ontologyMenu.append_message_toLastBulletPoint("<br>Success, <span style='color:yellow'>but you are using a deprecated OWL2VOWL service!<span>");
	        parseOntologyContent(ontologyContent);
	      }
	    };
	    
	    // check what this thing is doing;
	    xhr.onreadystatechange = function (){
	      if ( xhr.readyState === 4 && xhr.status === 0 ) {
	        ontologyMenu.append_message_toLastBulletPoint("<br>Old protocol also failed to establish connection to OWL2VOWL service!");
	        loadingModule.setErrorMode();
	        ontologyMenu.append_bulletPoint("Failed to load ontology");
	        ontologyMenu.append_message_toLastBulletPoint("<br><span style='color:red'>Could not connect to OWL2VOWL service </span>");
	        loadingModule.showErrorDetailsMessage();
	      }
	    };
	    xhr.send(formData);
	  }
	  
	  function requestServerTimeStampForIRI_Converte( callback, parameterArray ){
	    d3.xhr("serverTimeStamp", "application/text", function ( error, request ){
	      loadingModule.setBusyMode();
	      if ( error ) {
	        // could not get server timestamp -> no connection to owl2vowl
	        ontologyMenu.append_bulletPoint("Could not establish connection to OWL2VOWL service");
	        loadingModule.setErrorMode();
	        ontologyMenu.append_bulletPoint("Failed to load ontology");
	        ontologyMenu.append_message_toLastBulletPoint("<br><span style='color:red'>Could not connect to OWL2VOWL service </span>");
	        loadingModule.showErrorDetailsMessage();
	      } else {
	        conversion_sessionId = request.responseText;
	        ontologyMenu.setConversionID(conversion_sessionId);
	        // update paramater for new communication paradigm
	        parameterArray[0] = parameterArray[0] + "&sessionId=" + conversion_sessionId;
	        parameterArray.push(conversion_sessionId);
	        callback(parameterArray);
	      }
	    });
	  }
	  
	  function requestServerTimeStamp( callback, parameterArray ){
	    d3.xhr("serverTimeStamp", "application/text", function ( error, request ){
	      if ( error ) {
	        // could not get server timestamp -> no connection to owl2vowl
	        ontologyMenu.append_bulletPoint("Could not establish connection to OWL2VOWL service");
	        fallbackConversion(parameterArray); // tries o2v version0.3.4 communication
	      } else {
	        conversion_sessionId = request.responseText;
	        ontologyMenu.setConversionID(conversion_sessionId);
	        console.log("Request Session ID:" + conversion_sessionId);
	        callback(parameterArray[0], parameterArray[1], conversion_sessionId);
	      }
	    });
	  }
	  
	  loadingModule.directInput = function ( text ){
	    ontologyMenu.clearDetailInformation();
	    parseOntologyContent(text);
	  };
	  
	  loadingModule.loadFromOWL2VOWL = function ( ontoContent, filename ){
	    loadingWasSuccessFul = false;
	    
	    var old = d3.select("#bulletPoint_container").node().innerHTML;
	    if ( old.indexOf("(with warnings)") !== -1 ) {
	      missingImportsWarning = true;
	    }
	    
	    if ( ontologyMenu.cachedOntology(ontoContent) ) {
	      ontologyMenu.append_bulletPoint("Loading already cached ontology: " + filename);
	      parseOntologyContent(ontoContent);
	    } else { // set parse the ontology content;
	      parseOntologyContent(ontoContent);
	    }
	  };
	  
	  loadingModule.from_presetOntology = function ( selectedOntology ){
	    ontologyMenu.append_bulletPoint("Retrieving ontology: " + selectedOntology);
	    loadPresetOntology(selectedOntology);
	  };
	  
	  function loadPresetOntology( ontology ){
	    // check if already cached in ontology menu?
	    var f2r;
	    var loadingNewOntologyForEditor=false;
	    if ( ontology.indexOf("new_ontology") !== -1 ) {
	      loadingModule.hideLoadingIndicator();
	      graph.showEditorHintIfNeeded();
	      f2r = "./data/new_ontology.json";
	      loadingNewOntologyForEditor=true;
	    }
	    
	    loadingWasSuccessFul = false;
	    var ontologyContent = "";
	    if ( ontologyMenu.cachedOntology(ontology) ) {
	      ontologyMenu.append_bulletPoint("Loading already cached ontology: " + ontology);
	      ontologyContent = ontologyMenu.cachedOntology(ontology);
	      loadingWasSuccessFul = true; // cached Ontology should be true;
	      loadingModule.showLoadingIndicator();
	      parseOntologyContent(ontologyContent);
	      
	    } else {
	      // read the file name
	      
	      var fileToRead = "./data/" + ontology + ".json";
	      if ( f2r ) {
	        fileToRead = f2r;
	      } // overwrite the newOntology Index
	      // read file
	      d3.xhr(fileToRead, "application/json", function ( error, request ){
	        var loadingSuccessful = !error;
	        if ( loadingSuccessful ) {
	          ontologyContent = request.responseText;
	          parseOntologyContent(ontologyContent);
	        } else {

	          if (loadingNewOntologyForEditor){
	            ontologyContent = '{\n' +
	              '  "_comment": "Empty ontology for WebVOWL Editor",\n' +
	              '  "header": {\n' +
	              '    "languages": [\n' +
	              '      "en"\n' +
	              '    ],\n' +
	              '    "baseIris": [\n' +
	              '      "http://www.w3.org/2000/01/rdf-schema"\n' +
	              '    ],\n' +
	              '    "iri": "http://visualdataweb.org/newOntology/",\n' +
	              '    "title": {\n' +
	              '      "en": "New ontology"\n' +
	              '    },\n' +
	              '    "description": {\n' +
	              '      "en": "New ontology description"\n' +
	              '    }\n' +
	              '  },\n' +
	              '  "namespace": [],\n' +
	              '  "metrics": {\n' +
	              '    "classCount": 0,\n' +
	              '    "datatypeCount": 0,\n' +
	              '    "objectPropertyCount": 0,\n' +
	              '    "datatypePropertyCount": 0,\n' +
	              '    "propertyCount": 0,\n' +
	              '    "nodeCount": 0,\n' +
	              '    "individualCount": 0\n' +
	              '  }\n' +
	              '}\n';
	            parseOntologyContent(ontologyContent);
	          }else{
	          // some error occurred
	          ontologyMenu.append_bulletPoint("Failed to load: " + ontology);
	          if (error.status===0){ // assumption this is CORS error when running locally (error status == 0)
	            ontologyMenu.append_message_toLastBulletPoint(" <span style='color: red'>ERROR STATUS:</span> " + error.status);
	            if (window.location.toString().startsWith("file:/")){
	              ontologyMenu.append_message_toLastBulletPoint("<br><p>WebVOWL runs in a local instance.</p>");
	              ontologyMenu.append_message_toLastBulletPoint("<p>CORS prevents to automatically load files on host system.</p>");
	              ontologyMenu.append_message_toLastBulletPoint("<p>You can load preprocessed ontologies (i.e. VOWL-JSON files) using the upload feature in the ontology menu or by dragging the files and dropping them on the canvas.</p>");
	              ontologyMenu.append_message_toLastBulletPoint("<p><i>Hint: </i>Note that the conversion of ontologies into the VOWL-JSON format is not part of WebVOWL but requires an additional converter such as OWL2VOWL.</p>");
	              ontologyMenu.append_message_toLastBulletPoint("<p>Ontologies can be created using the editor mode (i.e. activate editing mode in <b>Modes</b> menu and create a new ontology using the <b>Ontology</b> menu.</p>");
	            }
	          }else {
	            ontologyMenu.append_message_toLastBulletPoint(" <span style='color: red'>ERROR STATUS:</span> " + error.status);
	          }



	          graph.handleOnLoadingError();
	          loadingModule.setErrorMode();
	          }
	        }
	      });
	    }
	  }
	  
	  
	  /** -- PARSE JSON CONTENT -- **/
	  function parseOntologyContent( content ){
	    
	    ontologyMenu.append_bulletPoint("Reading ontology graph ... ");
	    var _loader = ontologyMenu.getLoadingFunction();
	    _loader(content, ontologyIdentifierFromURL, "noAlternativeNameYet");
	  }
	  
	  loadingModule.notValidJsonFile = function (){
	    graph.clearGraphData();
	    ontologyMenu.append_message_toLastBulletPoint(" <span style='color:red;'>failed</span>");
	    ontologyMenu.append_message_toLastBulletPoint("<br><span style='color:red;'>Error: Received empty graph</span>");
	    loadingWasSuccessFul = false;
	    graph.handleOnLoadingError();
	    
	  };
	  
	  loadingModule.validJsonFile = function (){
	    ontologyMenu.append_message_toLastBulletPoint("done");
	    loadingWasSuccessFul = true;
	  };
	  
	  
	  /** --- HELPER FUNCTIONS **/
	  
	  function identifyParameter( url ){
	    var numParameters = (url.match(/#/g) || []).length;
	    // create parameters array
	    var paramArray = [];
	    if ( numParameters > 0 ) {
	      var tokens = url.split("#");
	      // skip the first token since it is the address of the server
	      for ( var i = 1; i < tokens.length; i++ ) {
	        if ( tokens[i].length === 0 ) {
	          // this token belongs actually to the last paramArray
	          paramArray[paramArray.length - 1] = paramArray[paramArray.length - 1] + "#";
	        } else {
	          paramArray.push(tokens[i]);
	        }
	      }
	    }
	    return paramArray;
	  }
	  
	  
	  function loadGraphOptions( parameterArray ){
	    var optString = "opts=";
	    
	    function loadDefaultConfig(){
	      graph.options().setOptionsFromURL(graph.options().defaultConfig(), false);
	    }
	    
	    function loadCustomConfig( opts ){
	      var changeEditingFlag = false;
	      var defObj = graph.options().defaultConfig();
	      for ( var i = 0; i < opts.length; i++ ) {
	        var keyVal = opts[i].split('=');
	        if ( keyVal[0] === "editorMode" ) {
	          changeEditingFlag = true;
	        }
	        defObj[keyVal[0]] = keyVal[1];
	      }
	      graph.options().setOptionsFromURL(defObj, changeEditingFlag);
	    }
	    
	    function identifyOptions( paramArray ){
	      if ( paramArray[0].indexOf(optString) >= 0 ) {
	        // parse the parameters;
	        var parameterLength = paramArray[0].length;
	        var givenOptionsStr = paramArray[0].substr(5, parameterLength - 6);
	        var optionsArray = givenOptionsStr.split(';');
	        loadCustomConfig(optionsArray);
	      } else {
	        ontologyIdentifierFromURL = paramArray[0];
	        loadDefaultConfig();
	      }
	    }
	    
	    function identifyOptionsAndOntology( paramArray ){
	      
	      if ( paramArray[0].indexOf(optString) >= 0 ) {
	        // parse the parameters;
	        var parameterLength = paramArray[0].length;
	        var givenOptionsStr = paramArray[0].substr(5, parameterLength - 6);
	        var optionsArray = givenOptionsStr.split(';');
	        loadCustomConfig(optionsArray);
	      } else {
	        loadDefaultConfig();
	      }
	      ontologyIdentifierFromURL = paramArray[1];
	    }
	    
	    switch ( parameterArray.length ) {
	      case 0:
	        loadDefaultConfig();
	        break;
	      case 1:
	        identifyOptions(parameterArray);
	        break;
	      case 2:
	        identifyOptionsAndOntology(parameterArray);
	        break;
	      default :
	        console.log("To many input parameters , loading default config");
	        loadDefaultConfig();
	        ontologyIdentifierFromURL = "ERROR_TO_MANY_INPUT_PARAMETERS";
	    }
	  }
	  
	  
	  function identifyOntologyLoadingMethod( url ){
	    var iriKey = "iri=";
	    var urlKey = "url=";
	    var fileKey = "file=";
	    
	    var method = -1;
	    if ( url.substr(0, fileKey.length) === fileKey ) {
	      method = FILE_UPLOAD;
	    } else if ( url.substr(0, urlKey.length) === urlKey ) {
	      method = JSON_URL;
	    } else if ( url.substr(0, iriKey.length) === iriKey ) {
	      method = IRI_URL;
	    } else {
	      method = PREDEFINED;
	    }
	    return method;
	  }
	  
	  return loadingModule;
	}
	;



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  /** variable defs **/
	  var warningModule = {};
	  var superContainer = d3.select("#WarningErrorMessages");
	  var _messageContainers = [];
	  var _messageContext = [];
	  var _visibleStatus = [];
	  
	  var _filterHintId;
	  var _editorHintId;
	  var _messageId = -1;
	  superContainer.style("display", "inline-block");
	  var cssStyleIndex = 0;
	  var styleSelectorIndex = 2;
	  

	  // helper for standalone webvowl in chrome
	  function createCSSSelector( name, rules ){
	    var style = document.createElement('style');
	    style.type = 'text/css';
	    document.getElementsByTagName('head')[0].appendChild(style);
	    if ( !(style.sheet || {}).insertRule )
	      (style.styleSheet || style.sheet).addRule(name, rules);
	    else
	      style.sheet.insertRule(name + "{" + rules + "}", 0);
	  }
	  
	  
	  function findCSS_Index(){
	    createCSSSelector("@keyframes msg_CollapseAnimation", " 0% { top: 0; } 100% { top: -400px;}");
	    console.log(document.styleSheets );
	  }
	  
	  findCSS_Index();
	  
	  warningModule.addMessageBox = function (){
	    
	    // add a container;
	    _messageId++;
	    var messageContainer = d3.select("#WarningErrorMessages").append("div");
	    messageContainer.node().id = "messageContainerId_" + _messageId;
	    
	    var messageContext = messageContainer.append("div");
	    messageContext.node().id = "messageContextId_" + _messageId;
	    messageContext.style("top", "0");
	    messageContainer.style("position", "relative");
	    messageContainer.style("width", "100%");
	    //save in array
	    _messageContainers.push(messageContainer);
	    _messageContext.push(messageContext);
	    
	    // add animation to the container
	    messageContainer.node().addEventListener("animationend", _msgContainer_animationEnd);
	    
	    // set visible flag that is used in end of animation
	    _visibleStatus[_messageId] = true;
	    return _messageId;
	  };
	  
	  function _msgContainer_animationEnd(){
	    var containerId = this.id;
	    var tokens = containerId.split("_")[1];
	    var mContainer = d3.select("#" + containerId);
	    // get number of children
	    mContainer.classed("hidden", !_visibleStatus[tokens]);
	    // clean up DOM
	    if ( !_visibleStatus[tokens] ) {
	      mContainer.remove();
	      _messageContext[tokens] = null;
	      _messageContainers[tokens] = null;
	    }
	    // remove event listener
	    var c = d3.select(this);
	    // c.node().removeEventListener("animationend",_msgContainer_animationEnd);
	  }
	  
	  warningModule.createMessageContext = function ( id ){
	    var warningContainer = _messageContext[id];
	    var moduleContainer = _messageContainers[id];
	    var generalHint = warningContainer.append('div');
	    generalHint.node().innerHTML = "";
	    _editorHintId = id;
	    /** Editing mode activated. You can now modify an existing ontology or create a new one via the <em>ontology</em> menu. You can save any ontology using the <em>export</em> menu (and exporting it as TTL file).**/
	    generalHint.node().innerHTML += "Editing mode activated.<br>" +
	      "You can now modify an existing ontology or create a new one via the <em>ontology</em> menu.<br>" +
	      "You can save any ontology using the <em>export</em> menu (and exporting it as TTL file).";
	    
	    generalHint.style("padding", "5px");
	    generalHint.style("line-height", "1.2em");
	    generalHint.style("font-size", "1.2em");
	    
	    
	    var ul = warningContainer.append('ul');
	    ul.append('li').node().innerHTML = "Create a class with <b>double click / tap</b> on empty canvas area.";
	    ul.append('li').node().innerHTML = "Edit names with <b>double click / tap</b> on element.</li>";
	    ul.append('li').node().innerHTML = "Selection of default constructors is provided in the left sidebar.";
	    ul.append('li').node().innerHTML = "Additional editing functionality is provided in the right sidebar.";
	    
	    
	    var gotItButton = warningContainer.append("label");
	    gotItButton.node().id = "killWarningErrorMessages_" + id;
	    gotItButton.node().innerHTML = "Got It";
	    gotItButton.on("click", warningModule.closeMessage);
	    
	    moduleContainer.classed("hidden", false);
	    moduleContainer.style("-webkit-animation-name", "warn_ExpandAnimation");
	    moduleContainer.style("-webkit-animation-duration", "0.5s");
	  };
	  
	  warningModule.showMessage = function ( id ){
	    var moduleContainer = _messageContainers[id];
	    moduleContainer.classed("hidden", false);
	    moduleContainer.style("-webkit-animation-name", "warn_ExpandAnimation");
	    moduleContainer.style("-webkit-animation-duration", "0.5s");
	  };
	  
	  warningModule.closeMessage = function ( id ){
	    var nId;
	    if ( id === undefined ) {
	      var givenId = this.id;
	      nId = givenId.split("_")[1];
	    } else {
	      nId = id;
	    }
	    if ( id && id.indexOf("_") !== -1 ) {
	      nId = id.split("_")[1];
	    }
	    _visibleStatus[nId] = false;
	    // get module;
	    var moduleContainer = _messageContainers[nId];
	    moduleContainer.style("-webkit-animation-name", "warn_CollapseAnimation");
	    moduleContainer.style("-webkit-animation-duration", "0.5s");
	    
	    var m_height = moduleContainer.node().getBoundingClientRect().height;
	    
	    // find my id in the children
	    var pNode = moduleContainer.node().parentNode;
	    
	    var followingChildren = [];
	    var pChild = pNode.children;
	    var pChild_len = pChild.length;
	    var containerId = moduleContainer.node().id;
	    var found_me = false;
	    for ( var i = 0; i < pChild_len; i++ ) {
	      if ( found_me === true ) {
	        followingChildren.push(pChild[i].id);
	      }
	      
	      if ( containerId === pChild[i].id ) {
	        found_me = true;
	      }
	    }
	    
	    for ( var fc = 0; fc < followingChildren.length; fc++ ) {
	      var child = d3.select("#" + followingChildren[fc]);
	      // get the document style and overwrite it;
	      var superCss = document.styleSheets[styleSelectorIndex].cssRules[cssStyleIndex];
	      // remove the existing 0% and 100% rules
	      superCss.deleteRule("0%");
	      superCss.deleteRule("100%");
	      
	      superCss.appendRule("0%   {top: 0;}");
	      superCss.appendRule("100% {top: -" + m_height + "px;");
	      
	      child.style("-webkit-animation-name", "msg_CollapseAnimation");
	      child.style("-webkit-animation-duration", "0.5s");
	      child.node().addEventListener("animationend", _child_animationEnd);
	    }
	  };
	  
	  function _child_animationEnd(){
	    var c = d3.select(this);
	    c.style("-webkit-animation-name", "");
	    c.style("-webkit-animation-duration", "");
	    c.node().removeEventListener("animationend", _child_animationEnd);
	  }
	  
	  warningModule.closeFilterHint = function (){
	    if ( _messageContainers[_filterHintId] ) {
	      _messageContainers[_filterHintId].classed("hidden", true);
	      _messageContainers[_filterHintId].remove();
	      _messageContainers[_filterHintId] = null;
	      _messageContext[_filterHintId] = null;
	      _visibleStatus[_filterHintId] = false;
	    }
	  };
	  
	  warningModule.showEditorHint = function (){
	    var id = warningModule.addMessageBox();
	    warningModule.createMessageContext(id);
	  };

	  warningModule.showExporterWarning=function (){
	    warningModule.showWarning("Can not export ontology", "Detected unsupported ontology axioms, (e.g. owl:Union)", "Ontology is not exported", 1, false);
	  };

	  
	  
	  warningModule.responseWarning = function ( header, reason, action, callback, parameterArray, forcedWarning ){
	    var id = warningModule.addMessageBox();
	    var warningContainer = _messageContext[id];
	    var moduleContainer = _messageContainers[id];
	    _visibleStatus[id] = true;
	    d3.select("#blockGraphInteractions").classed("hidden", false);
	    var graphWidth = 0.5 * graph.options().width();
	    
	    if ( header.length > 0 ) {
	      var head = warningContainer.append("div");
	      head.style("padding", "5px");
	      var titleHeader = head.append("div");
	      // some classes
	      titleHeader.style("display", "inline-flex");
	      titleHeader.node().innerHTML = "<b>Warning:</b>";
	      titleHeader.style("padding-right", "3px");
	      var msgHeader = head.append("div");
	      // some classes
	      msgHeader.style("display", "inline-flex");
	      msgHeader.style("max-width", graphWidth + "px");
	      
	      msgHeader.node().innerHTML = header;
	    }
	    if ( reason.length > 0 ) {
	      var reasonContainer = warningContainer.append("div");
	      reasonContainer.style("padding", "5px");
	      var reasonHeader = reasonContainer.append("div");
	      // some classes
	      reasonHeader.style("display", "inline-flex");
	      reasonHeader.style("padding-right", "3px");
	      
	      reasonHeader.node().innerHTML = "<b>Reason:</b>";
	      var msgReason = reasonContainer.append("div");
	      // some classes
	      msgReason.style("display", "inline-flex");
	      msgReason.style("max-width", graphWidth + "px");
	      msgReason.node().innerHTML = reason;
	    }
	    if ( action.length > 0 ) {
	      var actionContainer = warningContainer.append("div");
	      actionContainer.style("padding", "5px");
	      var actionHeader = actionContainer.append("div");
	      // some classes
	      actionHeader.style("display", "inline-flex");
	      actionHeader.style("padding-right", "8px");
	      actionHeader.node().innerHTML = "<b>Action:</b>";
	      var msgAction = actionContainer.append("div");
	      // some classes
	      msgAction.style("display", "inline-flex");
	      msgAction.style("max-width", graphWidth + "px");
	      msgAction.node().innerHTML = action;
	    }
	    
	    var gotItButton = warningContainer.append("label");
	    gotItButton.node().id = "killWarningErrorMessages_" + id;
	    gotItButton.node().innerHTML = "Continue";
	    gotItButton.on("click", function (){
	      warningModule.closeMessage(this.id);
	      d3.select("#blockGraphInteractions").classed("hidden", true);
	      callback(parameterArray[0], parameterArray[1], parameterArray[2], parameterArray[3]);
	    });
	    warningContainer.append("span").node().innerHTML = "|";
	    var cancelButton = warningContainer.append("label");
	    cancelButton.node().id = "cancelButton_" + id;
	    cancelButton.node().innerHTML = "Cancel";
	    cancelButton.on("click", function (){
	      warningModule.closeMessage(this.id);
	      d3.select("#blockGraphInteractions").classed("hidden", true);
	    });
	    moduleContainer.classed("hidden", false);
	    moduleContainer.style("-webkit-animation-name", "warn_ExpandAnimation");
	    moduleContainer.style("-webkit-animation-duration", "0.5s");
	  };
	  
	  warningModule.showFilterHint = function (){
	    var id = warningModule.addMessageBox();
	    var warningContainer = _messageContext[id];
	    var moduleContainer = _messageContainers[id];
	    _visibleStatus[id] = true;
	    
	    _filterHintId = id;
	    var generalHint = warningContainer.append('div');
	    /** Editing mode activated. You can now modify an existing ontology or create a new one via the <em>ontology</em> menu. You can save any ontology using the <em>export</em> menu (and exporting it as TTL file).**/
	    generalHint.node().innerHTML = "Collapsing filter activated.<br>" +
	      "The number of visualized elements has been automatically reduced.<br>" +
	      "Use the degree of collapsing slider in the <em>filter</em> menu to adjust the visualization.<br><br>" +
	      "<em>Note:</em> A performance decrease could be experienced with a growing amount of visual elements in the graph.";
	    
	    
	    generalHint.style("padding", "5px");
	    generalHint.style("line-height", "1.2em");
	    generalHint.style("font-size", "1.2em");
	    
	    var gotItButton = warningContainer.append("label");
	    gotItButton.node().id = "killFilterMessages_" + id;
	    gotItButton.node().innerHTML = "Got It";
	    gotItButton.on("click", warningModule.closeMessage);
	    
	    moduleContainer.classed("hidden", false);
	    moduleContainer.style("-webkit-animation-name", "warn_ExpandAnimation");
	    moduleContainer.style("-webkit-animation-duration", "0.5s");
	  };
	  
	  warningModule.showMultiFileUploadWarning = function (){
	    var id = warningModule.addMessageBox();
	    var warningContainer = _messageContext[id];
	    var moduleContainer = _messageContainers[id];
	    _visibleStatus[id] = true;
	    
	    _filterHintId = id;
	    var generalHint = warningContainer.append('div');
	    
	    generalHint.node().innerHTML = "Uploading multiple files is not supported.<br>";
	    
	    generalHint.style("padding", "5px");
	    generalHint.style("line-height", "1.2em");
	    generalHint.style("font-size", "1.2em");
	    
	    var gotItButton = warningContainer.append("label");
	    gotItButton.node().id = "killFilterMessages_" + id;
	    gotItButton.node().innerHTML = "Got It";
	    gotItButton.on("click", warningModule.closeMessage);
	    
	    moduleContainer.classed("hidden", false);
	    moduleContainer.style("-webkit-animation-name", "warn_ExpandAnimation");
	    moduleContainer.style("-webkit-animation-duration", "0.5s");
	  };
	  
	  warningModule.showWarning = function ( header, reason, action, type, forcedWarning, additionalOpts ){
	    var id = warningModule.addMessageBox();
	    var warningContainer = _messageContext[id];
	    var moduleContainer = _messageContainers[id];
	    _visibleStatus[id] = true;
	    
	    // add new one;
	    var graphWidth = 0.5 * graph.options().width();
	    
	    if ( header.length > 0 ) {
	      var head = warningContainer.append("div");
	      head.style("padding", "5px");
	      var titleHeader = head.append("div");
	      // some classes
	      titleHeader.style("display", "inline-flex");
	      titleHeader.node().innerHTML = "<b>Warning:</b>";
	      titleHeader.style("padding-right", "3px");
	      var msgHeader = head.append("div");
	      // some classes
	      msgHeader.style("display", "inline-flex");
	      msgHeader.style("max-width", graphWidth + "px");
	      
	      msgHeader.node().innerHTML = header;
	    }
	    if ( reason.length > 0 ) {
	      var reasonContainer = warningContainer.append("div");
	      reasonContainer.style("padding", "5px");
	      var reasonHeader = reasonContainer.append("div");
	      // some classes
	      reasonHeader.style("display", "inline-flex");
	      reasonHeader.style("padding-right", "3px");
	      
	      reasonHeader.node().innerHTML = "<b>Reason:</b>";
	      var msgReason = reasonContainer.append("div");
	      // some classes
	      msgReason.style("display", "inline-flex");
	      msgReason.style("max-width", graphWidth + "px");
	      msgReason.node().innerHTML = reason;
	    }
	    if ( action.length > 0 ) {
	      var actionContainer = warningContainer.append("div");
	      actionContainer.style("padding", "5px");
	      var actionHeader = actionContainer.append("div");
	      // some classes
	      actionHeader.style("display", "inline-flex");
	      actionHeader.style("padding-right", "8px");
	      actionHeader.node().innerHTML = "<b>Action:</b>";
	      var msgAction = actionContainer.append("div");
	      // some classes
	      msgAction.style("display", "inline-flex");
	      msgAction.style("max-width", graphWidth + "px");
	      msgAction.node().innerHTML = action;
	    }
	    
	    var gotItButton;
	    if ( type === 1 ) {
	      gotItButton = warningContainer.append("label");
	      gotItButton.node().id = "killWarningErrorMessages_" + id;
	      gotItButton.node().innerHTML = "Got It";
	      gotItButton.on("click", warningModule.closeMessage);
	    }
	    
	    if ( type === 2 ) {
	      gotItButton = warningContainer.append("label");
	      gotItButton.node().id = "killWarningErrorMessages_" + id;
	      gotItButton.node().innerHTML = "Got It";
	      gotItButton.on("click", warningModule.closeMessage);
	      warningContainer.append("span").node().innerHTML = "|";
	      var zoomToElementButton = warningContainer.append("label");
	      zoomToElementButton.node().id = "zoomElementThing_" + id;
	      zoomToElementButton.node().innerHTML = "Zoom to element ";
	      zoomToElementButton.on("click", function (){
	        // assume the additional Element is for halo;
	        graph.zoomToElementInGraph(additionalOpts);
	      });
	      warningContainer.append("span").node().innerHTML = "|";
	      var ShowElementButton = warningContainer.append("label");
	      ShowElementButton.node().id = "showElementThing_" + id;
	      ShowElementButton.node().innerHTML = "Indicate element";
	      ShowElementButton.on("click", function (){
	        // assume the additional Element is for halo;
	        if ( additionalOpts.halo() === false ) {
	          additionalOpts.drawHalo();
	          graph.updatePulseIds([additionalOpts.id()]);
	        } else {
	          additionalOpts.removeHalo();
	          additionalOpts.drawHalo();
	          graph.updatePulseIds([additionalOpts.id()]);
	        }
	      });
	    }
	    moduleContainer.classed("hidden", false);
	    moduleContainer.style("-webkit-animation-name", "warn_ExpandAnimation");
	    moduleContainer.style("-webkit-animation-duration", "0.5s");
	    moduleContainer.classed("hidden", false);
	  };
	  
	  return warningModule;
	};



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  /** variable defs **/
	  var directInputModule = {};
	  var inputContainer = d3.select("#DirectInputContent");
	  inputContainer.style("top", "0");
	  inputContainer.style("position", "absolute");
	  var textArea = d3.select("#directInputTextArea");
	  var visibleContainer = false;
	  
	  inputContainer.style("border", "1px solid black");
	  inputContainer.style("padding", "5px");
	  inputContainer.style("background", "#fff");
	  
	  
	  // connect upload and close button;
	  directInputModule.handleDirectUpload = function (){
	    
	    var text = textArea.node().value;
	    var jsonOBJ;
	    try {
	      jsonOBJ = JSON.parse(text);
	      graph.options().loadingModule().directInput(text);
	      // close if successful
	      if ( jsonOBJ.class.length > 0 ) {
	        directInputModule.setDirectInputMode(false);
	      }
	    }
	    catch ( e ) {
	      try {
	        // Initialize;
	        graph.options().loadingModule().initializeLoader();
	        graph.options().loadingModule().requestServerTimeStampForDirectInput(
	          graph.options().ontologyMenu().callbackLoad_Ontology_From_DirectInput, text
	        );
	      } catch ( error2 ) {
	        console.log("Error " + error2);
	        d3.select("#Error_onLoad").classed("hidden", false);
	        d3.select("#Error_onLoad").node().innerHTML = "Failed to convert the input!";
	      }
	    }
	  };
	  
	  directInputModule.handleCloseButton = function (){
	    directInputModule.setDirectInputMode(false);
	  };
	  
	  directInputModule.updateLayout = function (){
	    var w = graph.options().width();
	    var h = graph.options().height();
	    textArea.style("width", 0.4 * w + "px");
	    textArea.style("height", 0.7 * h + "px");
	  };
	  
	  directInputModule.setDirectInputMode = function ( val ){
	    if ( !val ) {
	      visibleContainer = !visibleContainer;
	    }
	    else {
	      visibleContainer = val;
	    }
	    // update visibility;
	    directInputModule.updateLayout();
	    d3.select("#Error_onLoad").classed("hidden", true);
	    inputContainer.classed("hidden", !visibleContainer);
	  };
	  
	  
	  d3.select("#directUploadBtn").on("click", directInputModule.handleDirectUpload);
	  d3.select("#close_directUploadBtn").on("click", directInputModule.handleCloseButton);
	  
	  return directInputModule;
	};



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ })

/******/ });
