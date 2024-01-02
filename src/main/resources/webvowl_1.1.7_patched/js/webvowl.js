webvowl =
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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var nodeMap = __webpack_require__(5)();
	var propertyMap = __webpack_require__(40)();


	var webvowl = {};
	webvowl.graph = __webpack_require__(57);
	webvowl.options = __webpack_require__(64);
	webvowl.version = "1.1.7";

	webvowl.util = {};
	webvowl.util.constants = __webpack_require__(12);
	webvowl.util.languageTools = __webpack_require__(11);
	webvowl.util.elementTools = __webpack_require__(63);
	webvowl.util.prefixTools = __webpack_require__(72);
	webvowl.modules = {};
	webvowl.modules.colorExternalsSwitch = __webpack_require__(73);
	webvowl.modules.compactNotationSwitch = __webpack_require__(74);
	webvowl.modules.datatypeFilter = __webpack_require__(75);
	webvowl.modules.disjointFilter = __webpack_require__(77);
	webvowl.modules.focuser = __webpack_require__(78);
	webvowl.modules.emptyLiteralFilter = __webpack_require__(79);
	webvowl.modules.nodeDegreeFilter = __webpack_require__(80);
	webvowl.modules.nodeScalingSwitch = __webpack_require__(81);
	webvowl.modules.objectPropertyFilter = __webpack_require__(82);
	webvowl.modules.pickAndPin = __webpack_require__(83);
	webvowl.modules.selectionDetailsDisplayer = __webpack_require__(315);
	webvowl.modules.setOperatorFilter = __webpack_require__(316);
	webvowl.modules.statistics = __webpack_require__(317);
	webvowl.modules.subclassFilter = __webpack_require__(318);


	webvowl.nodes = {};
	nodeMap.entries().forEach(function ( entry ){
	  mapEntryToIdentifier(webvowl.nodes, entry);
	});

	webvowl.properties = {};
	propertyMap.entries().forEach(function ( entry ){
	  mapEntryToIdentifier(webvowl.properties, entry);
	});

	function mapEntryToIdentifier( map, entry ){
	  var identifier = entry.key.replace(":", "").toLowerCase();
	  map[identifier] = entry.value;
	}


	module.exports = webvowl;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var nodes = [];
	nodes.push(__webpack_require__(7));
	nodes.push(__webpack_require__(18));
	nodes.push(__webpack_require__(19));
	nodes.push(__webpack_require__(26));
	nodes.push(__webpack_require__(27));
	nodes.push(__webpack_require__(28));
	nodes.push(__webpack_require__(29));
	nodes.push(__webpack_require__(30));
	nodes.push(__webpack_require__(31));
	nodes.push(__webpack_require__(32));
	nodes.push(__webpack_require__(33));
	nodes.push(__webpack_require__(34));
	nodes.push(__webpack_require__(38));
	nodes.push(__webpack_require__(39));

	var map = d3.map(nodes, function ( Prototype ){
	  return new Prototype().type();
	});

	module.exports = function (){
	  return map;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = d3;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    this.attributes(["external"])
	      .type("ExternalClass");
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseNode = __webpack_require__(9);
	var CenteringTextElement = __webpack_require__(14);
	var drawTools = __webpack_require__(17)();

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseNode.apply(this, arguments);
	    
	    var that = this,
	      collapsible = false,
	      radius = 50,
	      collapsingGroupElement,
	      pinGroupElement,
	      haloGroupElement = null,
	      rectangularRepresentation = false,
	      renderingElement,
	      textBlock;
	    
	    this.setRectangularRepresentation = function ( val ){
	      rectangularRepresentation = val;
	    };
	    this.getRectangularRepresentation = function (){
	      return rectangularRepresentation;
	    };
	    
	    this.getHalos = function (){
	      return haloGroupElement;
	    };
	    
	    // Properties
	    this.collapsible = function ( p ){
	      if ( !arguments.length ) return collapsible;
	      collapsible = p;
	      return this;
	    };
	    
	    this.textBlock = function ( p ){
	      if ( !arguments.length ) return textBlock;
	      textBlock = p;
	      return this;
	    };
	    
	    /**
	     * This might not be equal to the actual radius, because the instance count is used for its calculation.
	     * @param p
	     * @returns {*}
	     */
	    this.radius = function ( p ){
	      if ( !arguments.length ) return radius;
	      radius = p;
	      return this;
	    };
	    
	    
	    // Functions
	    this.setHoverHighlighting = function ( enable ){
	      that.nodeElement().selectAll("circle").classed("hovered", enable);
	    };
	    
	    this.textWidth = function ( yOffset ){
	      var availableWidth = this.actualRadius() * 2;
	      
	      // if the text is not placed in the center of the circle, it can't have the full width
	      if ( yOffset ) {
	        var relativeOffset = Math.abs(yOffset) / this.actualRadius();
	        var isOffsetInsideOfNode = relativeOffset <= 1;
	        
	        if ( isOffsetInsideOfNode ) {
	          availableWidth = Math.cos(relativeOffset) * availableWidth;
	        } else {
	          availableWidth = 0;
	        }
	      }
	      
	      return availableWidth;
	    };
	    
	    this.toggleFocus = function (){
	      that.focused(!that.focused());
	      if ( that.nodeElement() )
	        that.nodeElement().select("circle").classed("focused", that.focused());
	      graph.resetSearchHighlight();
	      graph.options().searchMenu().clearText();
	      
	    };
	    
	    this.actualRadius = function (){
	      if ( !graph.options().scaleNodesByIndividuals() || that.individuals().length <= 0 ) {
	        return that.radius();
	      } else {
	        // we could "listen" for radius and maxIndividualCount changes, but this is easier
	        var MULTIPLIER = 8,
	          additionalRadius = Math.log(that.individuals().length + 1) * MULTIPLIER + 5;
	        
	        return that.radius() + additionalRadius;
	      }
	    };
	    
	    this.distanceToBorder = function (){
	      return that.actualRadius();
	    };
	    
	    this.removeHalo = function (){
	      if ( that.halo() ) {
	        that.halo(false);
	        if ( haloGroupElement ) {
	          haloGroupElement.remove();
	        }
	      }
	    };
	    
	    this.drawHalo = function ( pulseAnimation ){
	      that.halo(true);
	      if ( rectangularRepresentation === true ) {
	        haloGroupElement = drawTools.drawRectHalo(that.nodeElement(), 80, 80, 5);
	      } else {
	        haloGroupElement = drawTools.drawHalo(that.nodeElement(), that.actualRadius(), this.removeHalo);
	      }
	      if ( pulseAnimation === false ) {
	        var pulseItem = haloGroupElement.selectAll(".searchResultA");
	        pulseItem.classed("searchResultA", false);
	        pulseItem.classed("searchResultB", true);
	        pulseItem.attr("animationRunning", false);
	      }
	    };
	    
	    /**
	     * Draws the pin on a round node on a position depending on its radius.
	     */
	    this.drawPin = function (){
	      that.pinned(true);
	      var dx = (-3.5 / 5) * that.actualRadius(),
	        dy = (-7 / 10) * that.actualRadius();
	      pinGroupElement = drawTools.drawPin(that.nodeElement(), dx, dy, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	      
	      
	    };
	    
	    /**
	     * Removes the pin and refreshs the graph to update the force layout.
	     */
	    this.removePin = function (){
	      that.pinned(false);
	      if ( pinGroupElement ) {
	        pinGroupElement.remove();
	      }
	      graph.updateStyle();
	    };
	    
	    this.drawCollapsingButton = function (){
	      
	      collapsingGroupElement = that.nodeElement()
	        .append("g")
	        .classed("hidden-in-export", true)
	        .attr("transform", function (){
	          var dx = (-2 / 5) * that.actualRadius(),
	            dy = (1 / 2) * that.actualRadius();
	          return "translate(" + dx + "," + dy + ")";
	        });
	      
	      collapsingGroupElement.append("rect")
	        .classed("class pin feature", true)
	        .attr("x", 0)
	        .attr("y", 0)
	        .attr("width", 40)
	        .attr("height", 24);
	      
	      collapsingGroupElement.append("line")
	        .attr("x1", 13)
	        .attr("y1", 12)
	        .attr("x2", 27)
	        .attr("y2", 12);
	      
	      collapsingGroupElement.append("line")
	        .attr("x1", 20)
	        .attr("y1", 6)
	        .attr("x2", 20)
	        .attr("y2", 18);
	    };
	    
	    /**
	     * Draws a circular node.
	     * @param parentElement the element to which this node will be appended
	     * @param [additionalCssClasses] additional css classes
	     */
	    this.draw = function ( parentElement, additionalCssClasses ){
	      var cssClasses = that.collectCssClasses();
	      that.nodeElement(parentElement);
	      
	      var bgColor = that.backgroundColor();
	      if ( bgColor === null ) bgColor = undefined;
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      if ( additionalCssClasses instanceof Array ) {
	        cssClasses = cssClasses.concat(additionalCssClasses);
	      }
	      if ( rectangularRepresentation === true ) {
	        renderingElement = drawTools.appendRectangularClass(parentElement, 80, 80, cssClasses, that.labelForCurrentLanguage(), bgColor);
	      } else {
	        renderingElement = drawTools.appendCircularClass(parentElement, that.actualRadius(), cssClasses, that.labelForCurrentLanguage(), bgColor);
	      }
	      that.postDrawActions(parentElement);
	    };
	    
	    this.redrawElement = function (){
	      renderingElement.remove();
	      textBlock.remove();
	      var bgColor = that.backgroundColor();
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      
	      var cssClasses = that.collectCssClasses();
	      
	      if ( rectangularRepresentation === true ) {
	        renderingElement = drawTools.appendRectangularClass(that.nodeElement(), 80, 80, cssClasses, that.labelForCurrentLanguage(), bgColor);
	      } else {
	        renderingElement = drawTools.appendCircularClass(that.nodeElement(), that.actualRadius(), cssClasses, that.labelForCurrentLanguage(), bgColor);
	      }
	      that.postDrawActions(that.nodeElement());
	    };
	    /**
	     * Common actions that should be invoked after drawing a node.
	     */
	    this.postDrawActions = function (){
	      that.textBlock(createTextBlock());
	      
	      that.addMouseListeners();
	      if ( that.pinned() ) {
	        that.drawPin();
	      }
	      if ( that.halo() ) {
	        that.drawHalo(false);
	      }
	      if ( that.collapsible() ) {
	        that.drawCollapsingButton();
	      }
	    };
	    
	    this.redrawLabelText = function (){
	      that.textBlock().remove();
	      that.textBlock(createTextBlock());
	      renderingElement.select("title").text(that.labelForCurrentLanguage());
	    };
	    function createTextBlock(){
	      var bgColor = that.backgroundColor();
	      if ( that.attributes().indexOf("deprecated") > -1 )
	        bgColor = undefined;
	      
	      var textBlock = new CenteringTextElement(that.nodeElement(), bgColor);
	      
	      var equivalentsString = that.equivalentsString();
	      var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      
	      textBlock.addText(that.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	      textBlock.addEquivalents(equivalentsString);
	      if ( !graph.options().compactNotation() ) {
	        textBlock.addSubText(that.indicationString());
	      }
	      textBlock.addInstanceCount(that.individuals().length);
	      
	      return textBlock;
	    }
	    
	    this.equivalentsString = function (){
	      var equivalentClasses = that.equivalents();
	      if ( !equivalentClasses ) {
	        return;
	      }
	      
	      return equivalentClasses
	        .map(function ( node ){
	          return node.labelForCurrentLanguage();
	        })
	        .join(", ");
	    };
	  };
	  o.prototype = Object.create(BaseNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var BaseElement = __webpack_require__(10);
	var forceLayoutNodeFunctions = __webpack_require__(13)();

	module.exports = (function (){
	  
	  var Base = function ( graph ){
	    BaseElement.apply(this, arguments);
	    
	    var that = this,
	      // Basic attributes
	      complement,
	      disjointUnion,
	      disjointWith,
	      individuals = [],
	      intersection,
	      union,
	      links,
	      rendertype = "round",
	      // Additional attributes
	      maxIndividualCount,
	      fobj, // foreigner object for editing
	      ignoreLocalHoverEvents = false,
	      backupFullIri,
	      // Element containers
	      nodeElement;
	    
	    // array to store my properties; // we will need this also later for semantic zooming stuff
	    var assignedProperties = [];
	    that.editingTextElement = false;
	    
	    this.isPropertyAssignedToThisElement = function ( property ){
	      // this goes via IRIS
	      console.log("Element IRI :" + property.iri());
	      if ( property.type() === "rdfs:subClassOf" )
	        for ( var i = 0; i < assignedProperties.length; i++ ) {
	          var iriEl = assignedProperties[i].iri();
	          if ( property.iri() === iriEl ) {
	            return true;
	          }
	          if ( property.type() === "rdfs:subClassOf" && assignedProperties[i].type() === "rdfs:subClassOf" )
	            return true;
	          if ( property.type() === "owl:disjointWith" && assignedProperties[i].type() === "owl:disjointWith" )
	            return true;
	          
	        }
	      return false;
	    };
	    
	    
	    this.existingPropertyIRI = function ( url ){
	      // this goes via IRIS
	      for ( var i = 0; i < assignedProperties.length; i++ ) {
	        var iriEl = assignedProperties[i].iri();
	        if ( iriEl === url ) {
	          return true;
	        }
	      }
	      return false;
	    };
	    
	    this.addProperty = function ( property ){
	      if ( assignedProperties.indexOf(property) === -1 ) {
	        assignedProperties.push(property);
	      }
	    };
	    
	    this.removePropertyElement = function ( property ){
	      // console.log("Calling removing old property!"+ property.iri());
	      if ( assignedProperties.indexOf(property) !== -1 ) {
	        // console.log("Found it!");
	        assignedProperties.splice(assignedProperties.indexOf(property), 1);
	      }
	    };
	    this.getMyProperties = function (){
	      return assignedProperties;
	    };
	    this.copyOtherProperties = function ( otherProperties ){
	      assignedProperties = otherProperties;
	    };
	    
	    this.copyInformation = function ( other ){
	      console.log(other.labelForCurrentLanguage());
	      if ( other.type() !== "owl:Thing" )
	        that.label(other.label());
	      that.complement(other.complement());
	      that.iri(other.iri());
	      that.copyOtherProperties(other.getMyProperties());
	      that.baseIri(other.baseIri());
	      if ( other.type() === "owl:Class" ) {
	        that.backupLabel(other.label());
	        // console.log("copied backup label"+that.backupLabel());
	      }
	      if ( other.backupLabel() !== undefined ) {
	        that.backupLabel(other.backupLabel());
	      }
	    };
	    
	    this.enableEditing = function ( autoEditing ){
	      if ( autoEditing === false )
	        return;
	      that.raiseDoubleClickEdit(true);
	    };
	    
	    this.raiseDoubleClickEdit = function ( forceIRISync ){
	      d3.selectAll(".foreignelements").remove();
	      if ( nodeElement === undefined || this.type() === "owl:Thing" || this.type() === "rdfs:Literal" ) {
	        console.log("No Container found");
	        return;
	      }
	      if ( fobj !== undefined ) {
	        nodeElement.selectAll(".foreignelements").remove();
	      }
	      
	      backupFullIri = undefined;
	      graph.options().focuserModule().handle(undefined);
	      graph.options().focuserModule().handle(that);
	      // add again the editing elements to that one
	      if ( graph.isTouchDevice() === true ) {
	        graph.activateHoverElements(true, that, true);
	      }
	      that.editingTextElement = true;
	      ignoreLocalHoverEvents = true;
	      that.nodeElement().selectAll("circle").classed("hoveredForEditing", true);
	      graph.killDelayedTimer();
	      graph.ignoreOtherHoverEvents(false);
	      fobj = nodeElement.append("foreignObject")
	        .attr("x", -0.5 * (that.textWidth() - 2))
	        .attr("y", -12)
	        .attr("height", 30)
	        .attr("class", "foreignelements")
	        .on("dragstart", function (){
	          return false;
	        }) // remove drag operations of text element)
	        .attr("width", that.textWidth() - 2);
	      
	      var editText = fobj.append("xhtml:input")
	        .attr("class", "nodeEditSpan")
	        .attr("id", that.id())
	        .attr("align", "center")
	        .attr("contentEditable", "true")
	        .on("dragstart", function (){
	          return false;
	        }); // remove drag operations of text element)
	      
	      var bgColor = '#f00';
	      var txtWidth = that.textWidth() - 2;
	      editText.style({
	        
	        'align': 'center',
	        'color': 'black',
	        'width': txtWidth + "px",
	        'height': '15px',
	        'background-color': bgColor,
	        'border-bottom': '2px solid black'
	      });
	      var txtNode = editText.node();
	      txtNode.value = that.labelForCurrentLanguage();
	      txtNode.focus();
	      txtNode.select();
	      that.frozen(true); // << releases the not after selection
	      that.locked(true);
	      
	      
	      d3.event.stopPropagation();
	      // ignoreNodeHoverEvent=true;
	      // // add some events that relate to this object
	      editText.on("click", function (){
	        d3.event.stopPropagation();
	      });
	      // // remove hover Events for now;
	      editText.on("mouseout", function (){
	        d3.event.stopPropagation();
	        
	        
	      });
	      editText.on("mousedown", function (){
	        d3.event.stopPropagation();
	      })
	        .on("keydown", function (){
	          d3.event.stopPropagation();
	          if ( d3.event.keyCode === 13 ) {
	            this.blur();
	            that.frozen(false); // << releases the not after selection
	            that.locked(false);
	          }
	        })
	        .on("keyup", function (){
	          if ( forceIRISync ) {
	            var labelName = editText.node().value;
	            var resourceName = labelName.replaceAll(" ", "_");
	            var syncedIRI = that.baseIri() + resourceName;
	            backupFullIri = syncedIRI;
	            
	            d3.select("#element_iriEditor").node().title = syncedIRI;
	            d3.select("#element_iriEditor").node().value = graph.options().prefixModule().getPrefixRepresentationForFullURI(syncedIRI);
	          }
	          d3.select("#element_labelEditor").node().value = editText.node().value;
	          
	        })
	        .on("blur", function (){
	          that.editingTextElement = false;
	          ignoreLocalHoverEvents = false;
	          that.nodeElement().selectAll("circle").classed("hoveredForEditing", false);
	          var newLabel = editText.node().value;
	          nodeElement.selectAll(".foreignelements").remove();
	          // that.setLabelForCurrentLanguage(classNameConvention(editText.node().value));
	          that.label(newLabel);
	          that.backupLabel(newLabel);
	          that.redrawLabelText();
	          that.frozen(graph.paused());
	          that.locked(graph.paused());
	          graph.ignoreOtherHoverEvents(false);
	          // console.log("Calling blur on Node!");
	          if ( backupFullIri ) {
	            var sanityCheckResult = graph.checkIfIriClassAlreadyExist(backupFullIri);
	            if ( sanityCheckResult === false ) {
	              that.iri(backupFullIri);
	            } else {
	              // throw warnign
	              graph.options().warningModule().showWarning("Already seen this class",
	                "Input IRI: " + backupFullIri + " for element: " + that.labelForCurrentLanguage() + " already been set",
	                "Restoring previous IRI for Element : " + that.iri(), 2, false, sanityCheckResult);
	              
	            }
	          }
	          if ( graph.isADraggerActive() === false ) {
	            graph.options().focuserModule().handle(undefined);
	            graph.options().focuserModule().handle(that);
	          }
	        });	// add a foreiner element to this thing;
	    };
	    
	    
	    this.renderType = function ( t ){
	      if ( !arguments.length ) return rendertype;
	      rendertype = t;
	      return this;
	    };
	    // Properties
	    this.complement = function ( p ){
	      if ( !arguments.length ) return complement;
	      complement = p;
	      return this;
	    };
	    
	    this.disjointUnion = function ( p ){
	      if ( !arguments.length ) return disjointUnion;
	      disjointUnion = p;
	      return this;
	    };
	    
	    this.disjointWith = function ( p ){
	      if ( !arguments.length ) return disjointWith;
	      disjointWith = p;
	      return this;
	    };
	    
	    this.individuals = function ( p ){
	      if ( !arguments.length ) return individuals;
	      individuals = p || [];
	      return this;
	    };
	    
	    this.intersection = function ( p ){
	      if ( !arguments.length ) return intersection;
	      intersection = p;
	      return this;
	    };
	    
	    this.links = function ( p ){
	      if ( !arguments.length ) return links;
	      links = p;
	      return this;
	    };
	    
	    this.maxIndividualCount = function ( p ){
	      if ( !arguments.length ) return maxIndividualCount;
	      maxIndividualCount = p;
	      return this;
	    };
	    
	    this.nodeElement = function ( p ){
	      if ( !arguments.length ) return nodeElement;
	      nodeElement = p;
	      return this;
	    };
	    
	    this.union = function ( p ){
	      if ( !arguments.length ) return union;
	      union = p;
	      return this;
	    };
	    
	    
	    /**
	     * Returns css classes generated from the data of this object.
	     * @returns {Array}
	     */
	    that.collectCssClasses = function (){
	      var cssClasses = [];
	      
	      if ( typeof that.styleClass() === "string" ) {
	        cssClasses.push(that.styleClass());
	      }
	      
	      cssClasses = cssClasses.concat(that.visualAttributes());
	      
	      return cssClasses;
	    };
	    
	    
	    // Reused functions TODO refactor
	    this.addMouseListeners = function (){
	      // Empty node
	      if ( !that.nodeElement() ) {
	        console.warn(this);
	        return;
	      }
	      
	      that.nodeElement().selectAll("*")
	        .on("mouseover", onMouseOver)
	        .on("mouseout", onMouseOut);
	    };
	    
	    this.animationProcess = function (){
	      var animRuns = false;
	      if ( that.getHalos() ) {
	        var haloGr = that.getHalos();
	        var haloEls = haloGr.selectAll(".searchResultA");
	        animRuns = haloGr.attr("animationRunning");
	        if ( typeof animRuns !== "boolean" ) {
	          // parse this to a boolean value
	          animRuns = (animRuns === 'true');
	        }
	        if ( animRuns === false ) {
	          haloEls.classed("searchResultA", false);
	          haloEls.classed("searchResultB", true);
	        }
	      }
	      return animRuns;
	    };
	    
	    this.foreground = function (){
	      var selectedNode = that.nodeElement().node(),
	        nodeContainer = selectedNode.parentNode;
	      // check if the halo is present and an animation is running
	      if ( that.animationProcess() === false ) {
	        // Append hovered element as last child to the container list.
	        nodeContainer.appendChild(selectedNode);
	      }
	      
	    };
	    
	    function onMouseOver(){
	      if ( that.mouseEntered() || ignoreLocalHoverEvents === true ) {
	        return;
	      }
	      
	      var selectedNode = that.nodeElement().node(),
	        nodeContainer = selectedNode.parentNode;
	      
	      // Append hovered element as last child to the container list.
	      if ( that.animationProcess() === false ) {
	        nodeContainer.appendChild(selectedNode);
	      }
	      if ( graph.isTouchDevice() === false ) {
	        that.setHoverHighlighting(true);
	        that.mouseEntered(true);
	        if ( graph.editorMode() === true && graph.ignoreOtherHoverEvents() === false ) {
	          graph.activateHoverElements(true, that);
	        }
	      } else {
	        if ( graph.editorMode() === true && graph.ignoreOtherHoverEvents() === false ) {
	          graph.activateHoverElements(true, that, true);
	        }
	        
	      }
	      
	      
	    }
	    
	    function onMouseOut(){
	      that.setHoverHighlighting(false);
	      that.mouseEntered(false);
	      if ( graph.editorMode() === true && graph.ignoreOtherHoverEvents() === false ) {
	        graph.activateHoverElements(false);
	      }
	    }
	    
	    
	    forceLayoutNodeFunctions.addTo(this);
	  };
	  
	  Base.prototype = Object.create(BaseElement.prototype);
	  Base.prototype.constructor = Base;
	  
	  
	  return Base;
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * The base element for all visual elements of webvowl.
	 */
	module.exports = (function (){
	  
	  var Base = function ( graph ){
	    // Basic attributes
	    var equivalents = [],
	      id,
	      label,
	      type,
	      iri,
	      baseIri,
	      // Additional attributes
	      annotations,
	      attributes = [],
	      backgroundColor,
	      comment,
	      description,
	      equivalentBase,
	      visualAttributes = [],
	      // Style attributes
	      focused = false,
	      indications = [],
	      mouseEntered = false,
	      styleClass,
	      visible = true,
	      
	      backupLabel,
	      // Other
	      languageTools = __webpack_require__(11)();
	    
	    
	    this.backupLabel = function ( label ){
	      if ( !arguments.length ) return backupLabel;
	      backupLabel = label;
	    };
	    // Properties
	    this.attributes = function ( p ){
	      if ( !arguments.length ) return attributes;
	      attributes = p;
	      return this;
	    };
	    
	    this.annotations = function ( p ){
	      if ( !arguments.length ) return annotations;
	      annotations = p;
	      return this;
	    };
	    
	    this.redrawElement = function (){
	      // TODO: OVERLOADED BY INDIVIDUAL ELEMENTS
	    };
	    
	    this.backgroundColor = function ( p ){
	      if ( !arguments.length ) return backgroundColor;
	      backgroundColor = p;
	      return this;
	    };
	    
	    this.baseIri = function ( p ){
	      if ( !arguments.length ) return baseIri;
	      baseIri = p;
	      return this;
	    };
	    
	    this.comment = function ( p ){
	      if ( !arguments.length ) return comment;
	      comment = p;
	      return this;
	    };
	    
	    this.description = function ( p ){
	      if ( !arguments.length ) return description;
	      description = p;
	      return this;
	    };
	    
	    this.equivalents = function ( p ){
	      if ( !arguments.length ) return equivalents;
	      equivalents = p || [];
	      return this;
	    };
	    
	    this.equivalentBase = function ( p ){
	      if ( !arguments.length ) return equivalentBase;
	      equivalentBase = p;
	      return this;
	    };
	    
	    this.focused = function ( p ){
	      if ( !arguments.length ) return focused;
	      focused = p;
	      return this;
	    };
	    
	    this.id = function ( p ){
	      if ( !arguments.length ) return id;
	      id = p;
	      return this;
	    };
	    
	    this.indications = function ( p ){
	      if ( !arguments.length ) return indications;
	      indications = p;
	      return this;
	    };
	    
	    this.iri = function ( p ){
	      if ( !arguments.length ) return iri;
	      iri = p;
	      return this;
	    };
	    
	    this.label = function ( p ){
	      if ( !arguments.length ) return label;
	      label = p;
	      return this;
	    };
	    
	    this.mouseEntered = function ( p ){
	      if ( !arguments.length ) return mouseEntered;
	      mouseEntered = p;
	      return this;
	    };
	    
	    this.styleClass = function ( p ){
	      if ( !arguments.length ) return styleClass;
	      styleClass = p;
	      return this;
	    };
	    
	    this.type = function ( p ){
	      if ( !arguments.length ) return type;
	      type = p;
	      return this;
	    };
	    
	    this.visible = function ( p ){
	      if ( !arguments.length ) return visible;
	      visible = p;
	      return this;
	    };
	    
	    this.visualAttributes = function ( p ){
	      if ( !arguments.length ) return visualAttributes;
	      visualAttributes = p;
	      return this;
	    };
	    
	    
	    this.commentForCurrentLanguage = function (){
	      return languageTools.textInLanguage(this.comment(), graph.language());
	    };
	    
	    /**
	     * @returns {string} the css class of this node..
	     */
	    this.cssClassOfNode = function (){
	      return "node" + this.id();
	    };
	    
	    this.descriptionForCurrentLanguage = function (){
	      return languageTools.textInLanguage(this.description(), graph.language());
	    };
	    
	    this.defaultLabel = function (){
	      return languageTools.textInLanguage(this.label(), "default");
	    };
	    
	    this.indicationString = function (){
	      return this.indications().join(", ");
	    };
	    
	    this.labelForCurrentLanguage = function (){
	      var preferredLanguage = graph && graph.language ? graph.language() : null;
	      return languageTools.textInLanguage(this.label(), preferredLanguage);
	    };
	  };
	  
	  Base.prototype.constructor = Base;
	  
	  Base.prototype.equals = function ( other ){
	    return other instanceof Base && this.id() === other.id();
	  };
	  
	  Base.prototype.toString = function (){
	    return this.labelForCurrentLanguage() + " (" + this.type() + ")";
	  };
	  
	  
	  return Base;
	}());


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(12)();

	/**
	 * Encapsulates methods which return a label in a specific language for a preferred language.
	 */
	module.exports = (function (){
	  
	  var languageTools = {};
	  
	  
	  languageTools.textInLanguage = function ( textObject, preferredLanguage ){
	    if ( typeof textObject === "undefined" ) {
	      return undefined;
	    }
	    
	    if ( typeof textObject === "string" ) {
	      return textObject;
	    }
	    
	    if ( preferredLanguage && textObject.hasOwnProperty(preferredLanguage) ) {
	      return textObject[preferredLanguage];
	    }
	    
	    var textForLanguage = searchLanguage(textObject, "en");
	    if ( textForLanguage ) {
	      return textForLanguage;
	    }
	    textForLanguage = searchLanguage(textObject, constants.LANG_UNDEFINED);
	    if ( textForLanguage ) {
	      return textForLanguage;
	    }
	    
	    return textObject[constants.LANG_IRIBASED];
	  };
	  
	  
	  function searchLanguage( textObject, preferredLanguage ){
	    for ( var language in textObject ) {
	      if ( language === preferredLanguage && textObject.hasOwnProperty(language) ) {
	        return textObject[language];
	      }
	    }
	  }
	  
	  return function (){
	    /* Use a function here to keep a consistent style like webvowl.path.to.module()
	     * despite having just a single languageTools object. */
	    return languageTools;
	  };
	})();


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = (function (){
	  
	  var constants = {};
	  
	  constants.LANG_IRIBASED = "IRI-based";
	  constants.LANG_UNDEFINED = "undefined";
	  
	  return function (){
	    /* Use a function here to keep a consistent style like webvowl.path.to.module()
	     * despite having just a single object. */
	    return constants;
	  };
	})();


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/**
	 * The functions for controlling attributes of nodes of the force layout can't be modelled to the element hierarchy,
	 * which is used for inheriting visual and OWL-like attributes.
	 *
	 * To reduce code redundancy the common functions for controlling the force layout node attributes are excluded into this
	 * module, which can add them to the node objects.
	 *
	 * @type {{}}
	 */
	var nodeFunctions = {};
	module.exports = function (){
	  return nodeFunctions;
	};


	nodeFunctions.addTo = function ( node ){
	  addFixedLocationFunctions(node);
	};

	function addFixedLocationFunctions( node ){
	  var locked = false,
	    frozen = false,
	    halo = false,
	    pinned = false;
	  
	  node.locked = function ( p ){
	    if ( !arguments.length ) {
	      return locked;
	    }
	    locked = p;
	    applyFixedLocationAttributes();
	    return node;
	  };
	  
	  node.frozen = function ( p ){
	    if ( !arguments.length ) {
	      return frozen;
	    }
	    frozen = p;
	    applyFixedLocationAttributes();
	    return node;
	  };
	  
	  node.halo = function ( p ){
	    if ( !arguments.length ) {
	      return halo;
	    }
	    halo = p;
	    applyFixedLocationAttributes();
	    return node;
	  };
	  
	  node.pinned = function ( p ){
	    if ( !arguments.length ) {
	      return pinned;
	    }
	    pinned = p;
	    applyFixedLocationAttributes();
	    return node;
	  };
	  
	  function applyFixedLocationAttributes(){
	    if ( node.locked() || node.frozen() || node.pinned() ) {
	      node.fixed = true;
	    } else {
	      node.fixed = false;
	    }
	  }
	}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var textTools = __webpack_require__(15)();
	var AbstractTextElement = __webpack_require__(16);

	module.exports = CenteringTextElement;
	function CenteringTextElement( container, backgroundColor ){
	  AbstractTextElement.apply(this, arguments);
	  this.storedFullTextLines = [];
	  this.storedSpanArrays = [];
	  this.storedStyle = [];
	  
	}

	CenteringTextElement.prototype = Object.create(AbstractTextElement.prototype);
	CenteringTextElement.prototype.constructor = CenteringTextElement;

	CenteringTextElement.prototype.addText = function ( text, prefix, suffix ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.default, prefix, suffix);
	  }
	};

	CenteringTextElement.prototype.addSubText = function ( text ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.subtext, "(", ")");
	  }
	};

	CenteringTextElement.prototype.addEquivalents = function ( text ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.default);
	  }
	};

	CenteringTextElement.prototype.addInstanceCount = function ( instanceCount ){
	  if ( instanceCount ) {
	    this.addTextline(instanceCount.toString(), this.CSS_CLASSES.instanceCount);
	  }
	};
	CenteringTextElement.prototype.saveCorrespondingSpan = function ( correspondingSpan ){
	  this.storedSpanArrays.push(correspondingSpan);
	};
	CenteringTextElement.prototype.saveFullTextLine = function ( fullText ){
	  this.storedFullTextLines.push(fullText);
	};
	CenteringTextElement.prototype.saveStyle = function ( style ){
	  this.storedStyle.push(style);
	};

	CenteringTextElement.prototype.updateAllTextElements = function (){
	  // TODO : TEST THIS postPrefix >>>  _applyPreAndPostFix
	  for ( var i = 0; i < this.storedSpanArrays.length; i++ ) {
	    var truncatedText = textTools.truncate(this.storedFullTextLines[i], this._textBlock().datum().textWidth(), this.storedStyle[i]);
	    this.storedSpanArrays[i].text(truncatedText);
	  }
	};


	CenteringTextElement.prototype.addTextline = function ( text, style, prefix, postfix ){
	  var truncatedText = textTools.truncate(text, this._textBlock().datum().textWidth(), style);
	  this.saveFullTextLine(text);
	  this.saveStyle(style);
	  var tspan = this._textBlock().append("tspan")
	    .classed(this.CSS_CLASSES.default, true)
	    .classed(style, true)
	    .text(this._applyPreAndPostFix(truncatedText, prefix, postfix))
	    .attr("x", 0);
	  this._repositionTextLine(tspan);
	  this.saveCorrespondingSpan(tspan);
	  
	  this._repositionTextBlock();
	};

	CenteringTextElement.prototype._repositionTextLine = function ( tspan ){
	  var fontSizeProperty = window.getComputedStyle(tspan.node()).getPropertyValue("font-size");
	  var fontSize = parseFloat(fontSizeProperty);
	  
	  var siblingCount = this._lineCount() - 1;
	  var lineDistance = siblingCount > 0 ? this.LINE_DISTANCE : 0;
	  
	  tspan.attr("dy", fontSize + lineDistance + "px");
	};

	CenteringTextElement.prototype.getTextBox = function (){
	  return this._textBlock();
	};


	CenteringTextElement.prototype._repositionTextBlock = function (){
	  // Nothing to do if no child elements exist
	  var lineCount = this._lineCount();
	  if ( lineCount < 1 ) {
	    this._textBlock().attr("y", 0);
	    return;
	  }
	  
	  var textBlockHeight = this._textBlock().node().getBBox().height;
	  this._textBlock().attr("y", -textBlockHeight * 0.5 + "px");
	};

	CenteringTextElement.prototype._lineCount = function (){
	  return this._textBlock().property("childElementCount");
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var ADDITIONAL_TEXT_SPACE = 4;

	var tools = {};

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

	tools.truncate = function ( text, maxWidth, textStyle, additionalTextSpace ){
	  maxWidth -= isNaN(additionalTextSpace) ? ADDITIONAL_TEXT_SPACE : additionalTextSpace;
	  if ( isNaN(maxWidth) || maxWidth <= 0 ) {
	    return text;
	  }
	  
	  var truncatedText = text,
	    newTruncatedTextLength,
	    textWidth,
	    ratio;
	  
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
	  
	  if ( text.length > truncatedText.length ) {
	    return text.substring(0, truncatedText.length - 3) + "...";
	  }
	  return text;
	};


	module.exports = function (){
	  return tools;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = AbstractTextElement;

	function AbstractTextElement( container, backgroundColor ){
	  var textBlock = container.append("text")
	    .classed("text", true)
	    .style("fill", this._getTextColor(backgroundColor))
	    .attr("text-anchor", "middle");
	  
	  this._textBlock = function (){
	    return textBlock;
	  };
	}

	AbstractTextElement.prototype.LINE_DISTANCE = 1;
	AbstractTextElement.prototype.CSS_CLASSES = {
	  default: "text",
	  subtext: "subtext",
	  instanceCount: "instance-count"
	};
	AbstractTextElement.prototype.DARK_TEXT_COLOR = "#000";
	AbstractTextElement.prototype.LIGHT_TEXT_COLOR = "#fff";

	AbstractTextElement.prototype.translation = function ( x, y ){
	  this._textBlock().attr("transform", "translate(" + x + ", " + y + ")");
	  return this;
	};

	AbstractTextElement.prototype.remove = function (){
	  this._textBlock().remove();
	  return this;
	};

	AbstractTextElement.prototype._applyPreAndPostFix = function ( text, prefix, postfix ){
	  if ( prefix ) {
	    text = prefix + text;
	  }
	  if ( postfix ) {
	    text += postfix;
	  }
	  return text;
	};

	AbstractTextElement.prototype._getTextColor = function ( rawBackgroundColor ){
	  if ( !rawBackgroundColor ) {
	    return AbstractTextElement.prototype.DARK_TEXT_COLOR;
	  }
	  
	  var backgroundColor = d3.rgb(rawBackgroundColor);
	  if ( calculateLuminance(backgroundColor) > 0.5 ) {
	    return AbstractTextElement.prototype.DARK_TEXT_COLOR;
	  } else {
	    return AbstractTextElement.prototype.LIGHT_TEXT_COLOR;
	  }
	};

	function calculateLuminance( color ){
	  return 0.3 * (color.r / 255) + 0.59 * (color.g / 255) + 0.11 * (color.b / 255);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains reusable function for drawing nodes.
	 */
	module.exports = (function (){
	  
	  var tools = {};
	  
	  /**
	   * Append a circular class node with the passed attributes.
	   * @param parent the parent element to which the circle will be appended
	   * @param radius
	   * @param [cssClasses] an array of additional css classes
	   * @param [tooltip]
	   * @param [backgroundColor]
	   * @returns {*}
	   */
	  tools.appendCircularClass = function ( parent, radius, cssClasses, tooltip, backgroundColor ){
	    var circle = parent.append("circle")
	      .classed("class", true)
	      .attr("r", radius);
	    
	    addCssClasses(circle, cssClasses);
	    addToolTip(circle, tooltip);
	    addBackgroundColor(circle, backgroundColor);
	    
	    return circle;
	  };
	  
	  function addCssClasses( element, cssClasses ){
	    if ( cssClasses instanceof Array ) {
	      cssClasses.forEach(function ( cssClass ){
	        element.classed(cssClass, true);
	      });
	    }
	  }
	  
	  function addToolTip( element, tooltip ){
	    if ( tooltip ) {
	      element.append("title").text(tooltip);
	    }
	  }
	  
	  function addBackgroundColor( element, backgroundColor ){
	    if ( backgroundColor ) {
	      element.style("fill", backgroundColor);
	    }
	  }
	  
	  /**
	   * Appends a rectangular class node with the passed attributes.
	   * @param parent the parent element to which the rectangle will be appended
	   * @param width
	   * @param height
	   * @param [cssClasses] an array of additional css classes
	   * @param [tooltip]
	   * @param [backgroundColor]
	   * @returns {*}
	   */
	  tools.appendRectangularClass = function ( parent, width, height, cssClasses, tooltip, backgroundColor ){
	    var rectangle = parent.append("rect")
	      .classed("class", true)
	      .attr("x", -width / 2)
	      .attr("y", -height / 2)
	      .attr("width", width)
	      .attr("height", height);
	    
	    addCssClasses(rectangle, cssClasses);
	    addToolTip(rectangle, tooltip);
	    addBackgroundColor(rectangle, backgroundColor);
	    
	    return rectangle;
	  };
	  
	  tools.drawPin = function ( container, dx, dy, onClick, accuraciesHelperFunction, useAccuracyHelper ){
	    var pinGroupElement = container
	      .append("g")
	      .classed("hidden-in-export", true)
	      .attr("transform", "translate(" + dx + "," + dy + ")");
	    
	    var base = pinGroupElement.append("circle")
	      .classed("class pin feature", true)
	      .attr("r", 12)
	      .on("click", function (){
	        if ( onClick ) {
	          onClick();
	        }
	        d3.event.stopPropagation();
	      });
	    
	    pinGroupElement.append("line")
	      .attr("x1", 0)
	      .attr("x2", 0)
	      .attr("y1", 12)
	      .attr("y2", 16);
	    
	    if ( useAccuracyHelper === true ) {
	      pinGroupElement.append("circle")
	        .attr("r", 15)
	        .attr("cx", -7)
	        .attr("cy", -7)
	        .classed("superHiddenElement ", true)
	        .classed("superOpacityElement", !accuraciesHelperFunction())
	        .on("click", function (){
	          if ( onClick ) {
	            onClick();
	          }
	          d3.event.stopPropagation();
	        })
	        .on("mouseover", function (){
	          base.classed("feature_hover", true);
	        })
	        .on("mouseout", function (){
	          base.classed("feature_hover", false);
	        })
	      ;
	      
	    }
	    
	    
	    return pinGroupElement;
	  };
	  
	  tools.drawRectHalo = function ( node, width, height, offset ){
	    var container;
	    if ( node.nodeElement )
	      container = node.nodeElement();
	    else
	      container = node.labelElement();
	    
	    if ( !container ) {
	      // console.log("no container found");
	      return;
	    }
	    
	    var haloGroupElement = container
	      .append("g")
	      .classed("hidden-in-export", true);
	    
	    haloGroupElement.append("rect")
	      .classed("searchResultA", true)
	      .attr("x", (-width - offset) / 2)
	      .attr("y", (-offset - height) / 2)
	      .attr("width", width + offset)
	      .attr("height", height + offset);
	    haloGroupElement.attr("animationRunning", true);
	    
	    haloGroupElement.node().addEventListener("webkitAnimationEnd", function (){
	      var test = haloGroupElement.selectAll(".searchResultA");
	      test.classed("searchResultA", false)
	        .classed("searchResultB", true);
	      haloGroupElement.attr("animationRunning", false);
	    });
	    haloGroupElement.node().addEventListener("animationend", function (){
	      var test = haloGroupElement.selectAll(".searchResultA");
	      test.classed("searchResultA", false)
	        .classed("searchResultB", true);
	      haloGroupElement.attr("animationRunning", false);
	    });
	    
	    
	    return haloGroupElement;
	    
	  };
	  tools.drawHalo = function ( container, radius ){
	    if ( container === undefined ) {
	      return null;
	      // there is no element to add the halo to;
	      // this means the node was not rendered previously
	    }
	    
	    var haloGroupElement = container
	      .append("g")
	      .classed("hidden-in-export", true);
	    
	    
	    haloGroupElement.append("circle", ":first-child")
	      .classed("searchResultA", true)
	      .attr("r", radius + 15);
	    haloGroupElement.attr("animationRunning", true);
	    
	    
	    haloGroupElement.node().addEventListener("webkitAnimationEnd", function (){
	      var test = haloGroupElement.selectAll(".searchResultA");
	      test.classed("searchResultA", false)
	        .classed("searchResultB", true)
	        .attr("animationRunning", false);
	      haloGroupElement.attr("animationRunning", false);
	    });
	    haloGroupElement.node().addEventListener("animationend", function (){
	      var test = haloGroupElement.selectAll(".searchResultA");
	      test.classed("searchResultA", false)
	        .classed("searchResultB", true)
	        .attr("animationRunning", false);
	      haloGroupElement.attr("animationRunning", false);
	    });
	    
	    return haloGroupElement;
	  };
	  
	  return function (){
	    // Encapsulate into function to maintain default.module.path()
	    return tools;
	  };
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    this.type("owl:Class");
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    SetOperatorNode.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw;
	    
	    this.styleClass("complementof")
	      .type("owl:complementOf");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element);
	      
	      var symbol = element.append("g").classed("embedded", true);
	      
	      symbol.append("circle")
	        .attr("class", "symbol")
	        .classed("fineline", true)
	        .attr("r", 10);
	      symbol.append("path")
	        .attr("class", "nofill")
	        .attr("d", "m -7,-1.5 12,0 0,6")
	        .attr("transform", "scale(.5)");
	      
	      symbol.attr("transform",
	        "translate(-" + (that.radius() - 15) / 100 + ",-" + (that.radius() - 15) / 100 + ")");
	      
	      that.postDrawActions();
	    };
	  };
	  o.prototype = Object.create(SetOperatorNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var AbsoluteTextElement = __webpack_require__(21);
	var BoxArrowLink = __webpack_require__(22);
	var RoundNode = __webpack_require__(8);
	var drawTools = __webpack_require__(17)();

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    var that = this,
	      superHoverHighlightingFunction = that.setHoverHighlighting,
	      superPostDrawActions = that.postDrawActions;
	    
	    this.setHoverHighlighting = function ( enable ){
	      superHoverHighlightingFunction(enable);
	      
	      // Highlight links pointing to included nodes when hovering the set operator
	      that.links()
	        .filter(function ( link ){
	          return link instanceof BoxArrowLink;
	        })
	        .filter(function ( link ){
	          return link.domain().equals(that);
	        })
	        .forEach(function ( link ){
	          link.property().setHighlighting(enable);
	        });
	    };
	    
	    this.draw = function ( element ){
	      that.nodeElement(element);
	      
	      drawTools.appendCircularClass(element, that.actualRadius(),
	        that.collectCssClasses().join(" "),
	        that.labelForCurrentLanguage(), that.backgroundColor());
	    };
	    
	    this.postDrawActions = function (){
	      superPostDrawActions();
	      that.textBlock().remove();
	      
	      var textElement = new AbsoluteTextElement(that.nodeElement(), that.backgroundColor());
	      
	      var equivalentsString = that.equivalentsString();
	      var offsetForFollowingEquivalents = equivalentsString ? -30 : -17;
	      var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      textElement.addText(that.labelForCurrentLanguage(), offsetForFollowingEquivalents, "",
	        suffixForFollowingEquivalents);
	      
	      textElement.addEquivalents(equivalentsString, -17);
	      
	      
	      if ( !graph.options().compactNotation() ) {
	        
	        if ( that.indicationString().length > 0 ) {
	          textElement.addSubText(that.indicationString(), 17);
	          textElement.addInstanceCount(that.individuals().length, 30);
	        } else {
	          textElement.addInstanceCount(that.individuals().length, 17);
	        }
	      } else {
	        textElement.addInstanceCount(that.individuals().length, 17);
	      }
	      
	      that.textBlock(textElement);
	    };
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var textTools = __webpack_require__(15)();
	var AbstractTextElement = __webpack_require__(16);

	module.exports = AbsoluteTextElement;
	function AbsoluteTextElement( container, backgroundColor ){
	  AbstractTextElement.apply(this, arguments);
	}

	AbsoluteTextElement.prototype = Object.create(AbstractTextElement.prototype);
	AbsoluteTextElement.prototype.constructor = AbsoluteTextElement;

	AbsoluteTextElement.prototype.addText = function ( text, yShift, prefix, suffix ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.default, yShift, prefix, suffix);
	  }
	};

	AbsoluteTextElement.prototype.addSubText = function ( text, yShift ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.subtext, yShift, "(", ")");
	  }
	};

	AbsoluteTextElement.prototype.addEquivalents = function ( text, yShift ){
	  if ( text ) {
	    this.addTextline(text, this.CSS_CLASSES.default, yShift);
	  }
	};

	AbsoluteTextElement.prototype.addInstanceCount = function ( instanceCount, yShift ){
	  if ( instanceCount ) {
	    this.addTextline(instanceCount.toString(), this.CSS_CLASSES.instanceCount, yShift);
	  }
	};


	AbsoluteTextElement.prototype.addTextline = function ( text, style, yShift, prefix, postfix ){
	  var truncatedText = textTools.truncate(text, this._textBlock().datum().textWidth(yShift), style);
	  
	  var tspan = this._textBlock().append("tspan")
	    .classed(this.CSS_CLASSES.default, true)
	    .classed(style, true)
	    .text(this._applyPreAndPostFix(truncatedText, prefix, postfix))
	    .attr("x", 0);
	  this._repositionTextLine(tspan, yShift);
	};

	AbsoluteTextElement.prototype._repositionTextLine = function ( tspan, yShift ){
	  var fontSizeProperty = window.getComputedStyle(tspan.node()).getPropertyValue("font-size");
	  var fontSize = parseFloat(fontSizeProperty);
	  
	  /* BBox height is not supported in Firefox for tspans and dominant-baseline doesn't work in some SVG editors */
	  var approximatedShiftForVerticalCentering = (1 / 3) * fontSize;
	  
	  tspan.attr("y", approximatedShiftForVerticalCentering + (yShift || 0) + "px");
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var PlainLink = __webpack_require__(23);


	module.exports = BoxArrowLink;

	function BoxArrowLink( domain, range, property ){
	  PlainLink.apply(this, arguments);
	}

	BoxArrowLink.prototype = Object.create(PlainLink.prototype);
	BoxArrowLink.prototype.constructor = BoxArrowLink;


	BoxArrowLink.prototype.draw = function ( linkGroup, markerContainer ){
	  var property = this.label().property();
	  var inverse = this.label().inverse();
	  
	  createPropertyMarker(markerContainer, property);
	  if ( inverse ) {
	    createInverseMarker(markerContainer, inverse);
	  }
	  
	  PlainLink.prototype.draw.apply(this, arguments);
	  
	  // attach the markers to the link
	  linkGroup.attr("marker-start", "url(#" + property.markerId() + ")");
	  if ( inverse ) {
	    linkGroup.attr("marker-end", "url(#" + inverse.markerId() + ")");
	  }
	};


	function createPropertyMarker( markerContainer, inverse ){
	  var inverseMarker = appendBasicMarker(markerContainer, inverse);
	  inverseMarker.attr("refX", -8);
	  inverseMarker.append("path")
	    .attr("d", "M0,-8L8,0L0,8L-8,0L0,-8L8,0")
	    .classed(inverse.markerType(), true);
	  
	  inverse.markerElement(inverseMarker);
	}

	function createInverseMarker( markerContainer, property ){
	  var marker = appendBasicMarker(markerContainer, property);
	  marker.attr("refX", 8);
	  marker.append("path")
	    .attr("d", "M0,-8L8,0L0,8L-8,0L0,-8L8,0")
	    .classed(property.markerType(), true);
	  
	  property.markerElement(marker);
	}

	function appendBasicMarker( markerContainer, property ){
	  return markerContainer.append("marker")
	    .datum(property)
	    .attr("id", property.markerId())
	    .attr("viewBox", "-10 -10 20 20")
	    .attr("markerWidth", 20)
	    .attr("markerHeight", 20)
	    .attr("markerUnits", "userSpaceOnUse")
	    .attr("orient", "auto");
	}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var Label = __webpack_require__(24);


	module.exports = PlainLink;

	/**
	 * A link connects at least two VOWL nodes.
	 * The properties connecting the VOWL nodes are stored separately into the label.
	 * @param domain
	 * @param range
	 * @param property
	 */
	function PlainLink( domain, range, property ){
	  var layers,
	    layerIndex,
	    loops,
	    loopIndex,
	    pathEl,
	    label = new Label(property, this);
	  
	  var backPart = __webpack_require__(25)(domain, label, this),
	    frontPart = __webpack_require__(25)(label, range, this);
	  
	  
	  this.layers = function ( p ){
	    if ( !arguments.length ) return layers;
	    layers = p;
	    return this;
	  };
	  
	  this.layerIndex = function ( p ){
	    if ( !arguments.length ) return layerIndex;
	    layerIndex = p;
	    return this;
	  };
	  
	  this.loops = function ( p ){
	    if ( !arguments.length ) return loops;
	    loops = p;
	    return this;
	  };
	  
	  this.loopIndex = function ( p ){
	    if ( !arguments.length ) return loopIndex;
	    loopIndex = p;
	    return this;
	  };
	  
	  
	  this.domain = function (){
	    return domain;
	  };
	  
	  this.label = function (){
	    return label;
	  };
	  
	  this.linkParts = function (){
	    return [frontPart, backPart];
	  };
	  
	  this.range = function (){
	    return range;
	  };
	  this.pathObj = function ( pE ){
	    if ( !arguments.length ) {
	      return pathEl;
	    }
	    pathEl = pE;
	  };
	}


	PlainLink.prototype.draw = function ( linkGroup ){
	  var property = this.label().property();
	  var inverse = this.label().inverse();
	  
	  property.linkGroup(linkGroup);
	  if ( inverse ) {
	    inverse.linkGroup(linkGroup);
	  }
	  
	  var pathElement = linkGroup.append("path");
	  pathElement.classed("link-path", true)
	    .classed(this.domain().cssClassOfNode(), true)
	    .classed(this.range().cssClassOfNode(), true)
	    .classed(property.linkType(), true);
	  this.pathObj(pathElement);
	  
	};


	PlainLink.prototype.inverse = function (){
	  return this.label().inverse();
	};

	PlainLink.prototype.isLoop = function (){
	  return this.domain().equals(this.range());
	};

	PlainLink.prototype.property = function (){
	  return this.label().property();
	};



/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = Label;

	/**
	 * A label represents the element(s) which further describe a link.
	 * It encapsulates the property and its inverse property.
	 * @param property the property; the inverse is inferred
	 * @param link the link this label belongs to
	 */
	function Label( property, link ){
	  this.link = function (){
	    return link;
	  };
	  
	  this.property = function (){
	    return property;
	  };
	  
	  // "Forward" the fixed value set on the property to avoid having to access this container
	  Object.defineProperty(this, "fixed", {
	    get: function (){
	      var inverseFixed = property.inverse() ? property.inverse().fixed : false;
	      return property.fixed || inverseFixed;
	    },
	    set: function ( v ){
	      property.fixed = v;
	      if ( property.inverse() ) property.inverse().fixed = v;
	    }
	  });
	  this.frozen = property.frozen;
	  this.locked = property.locked;
	  this.pinned = property.pinned;
	}

	Label.prototype.actualRadius = function (){
	  return this.property().actualRadius();
	};

	Label.prototype.draw = function ( container ){
	  return this.property().draw(container);
	};

	Label.prototype.inverse = function (){
	  return this.property().inverse();
	};

	Label.prototype.equals = function ( other ){
	  if ( !other ) {
	    return false;
	  }
	  
	  var instance = other instanceof Label;
	  var equalProperty = this.property().equals(other.property());
	  
	  var equalInverse = false;
	  if ( this.inverse() ) {
	    equalInverse = this.inverse().equals(other.inverse());
	  } else if ( !other.inverse() ) {
	    equalInverse = true;
	  }
	  
	  return instance && equalProperty && equalInverse;
	};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	/**
	 * A linkPart connects two force layout nodes.
	 * It reprents a link which can be used in d3's force layout.
	 * @param _domain
	 * @param _range
	 * @param _link
	 */
	module.exports = function ( _domain, _range, _link ){
	  var linkPart = {},
	    domain = _domain,
	    link = _link,
	    range = _range;
	  
	  // Define d3 properties
	  Object.defineProperties(linkPart, {
	    "source": { value: domain, writable: true },
	    "target": { value: range, writable: true }
	  });
	  
	  
	  linkPart.domain = function (){
	    return domain;
	  };
	  
	  linkPart.link = function (){
	    return link;
	  };
	  
	  linkPart.range = function (){
	    return range;
	  };
	  
	  
	  return linkPart;
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    this.attributes(["deprecated"])
	      .type("owl:DeprecatedClass")
	      .styleClass("deprecated")
	      .indications(["deprecated"]);
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    SetOperatorNode.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw;
	    
	    this.styleClass("disjointunionof")
	      .type("owl:disjointUnionOf");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element);
	      
	      var symbol = element.append("g").classed("embedded", true);
	      
	      var symbolRadius = 10;
	      symbol.append("circle")
	        .attr("class", "symbol")
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("cx", 10)
	        .attr("class", "symbol")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("class", "nofill")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("text")
	        .attr("class", "link")
	        .text("1")
	        .attr("transform", "scale(.7)translate(3,5)");
	      
	      symbol.attr("transform", "translate(-" + (that.radius() - 15) / 7 + ",-" + (that.radius() - 15) / 100 + ")");
	      
	      that.postDrawActions();
	    };
	  };
	  o.prototype = Object.create(SetOperatorNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);
	var drawTools = __webpack_require__(17)();

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    var CIRCLE_SIZE_DIFFERENCE = 4;
	    var renderingElement;
	    var that = this,
	      superActualRadiusFunction = that.actualRadius;
	    
	    this.styleClass("equivalentclass")
	      .type("owl:equivalentClass");
	    
	    this.actualRadius = function (){
	      return superActualRadiusFunction() + CIRCLE_SIZE_DIFFERENCE;
	    };
	    
	    this.redrawElement = function (){
	      renderingElement.remove();
	      that.textBlock().remove();
	      var bgColor = that.backgroundColor();
	      
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      var cssClasses = that.collectCssClasses();
	      renderingElement = that.nodeElement().append("g");
	      
	      if ( that.getRectangularRepresentation() === true ) {
	        drawTools.appendRectangularClass(renderingElement, 84, 84, ["white", "embedded"]);
	        drawTools.appendRectangularClass(renderingElement, 80 - CIRCLE_SIZE_DIFFERENCE, 80 - CIRCLE_SIZE_DIFFERENCE, cssClasses, that.labelForCurrentLanguage(), bgColor);
	      } else {
	        drawTools.appendCircularClass(renderingElement, that.actualRadius(), ["white", "embedded"]);
	        console.log(cssClasses);
	        console.log(that.attributes());
	        console.log("what is bgColor" + bgColor);
	        drawTools.appendCircularClass(renderingElement, that.actualRadius() - CIRCLE_SIZE_DIFFERENCE, cssClasses, that.labelForCurrentLanguage(), bgColor);
	        
	      }
	      that.postDrawActions(that.nodeElement());
	      
	    };
	    this.draw = function ( parentElement ){
	      var cssClasses = that.collectCssClasses();
	      
	      that.nodeElement(parentElement);
	      renderingElement = parentElement.append("g");
	      var bgColor = that.backgroundColor();
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      // draw the outer circle at first and afterwards the inner circle
	      if ( that.getRectangularRepresentation() === true ) {
	        drawTools.appendRectangularClass(renderingElement, 84, 84, ["white", "embedded"]);
	        drawTools.appendRectangularClass(renderingElement, 80 - CIRCLE_SIZE_DIFFERENCE, 80 - CIRCLE_SIZE_DIFFERENCE, cssClasses, that.labelForCurrentLanguage(), bgColor);
	      } else {
	        drawTools.appendCircularClass(renderingElement, that.actualRadius(), ["white", "embedded"]);
	        drawTools.appendCircularClass(renderingElement, that.actualRadius() - CIRCLE_SIZE_DIFFERENCE, cssClasses, that.labelForCurrentLanguage(), bgColor);
	        
	      }
	      
	      that.postDrawActions();
	    };
	    
	    /**
	     * Sets the hover highlighting of this node.
	     * @param enable
	     */
	    that.setHoverHighlighting = function ( enable ){
	      that.nodeElement().selectAll("circle:last-of-type").classed("hovered", enable);
	    };
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    SetOperatorNode.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw,
	      INTERSECTION_BACKGROUND_PATH = createIntersectionPath();
	    
	    this.styleClass("intersectionof")
	      .type("owl:intersectionOf");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element);
	      
	      var symbol = element.append("g").classed("embedded", true);
	      
	      var symbolRadius = 10;
	      symbol.append("path")
	        .attr("class", "nostroke")
	        .classed("symbol", true)
	        .attr("d", INTERSECTION_BACKGROUND_PATH);
	      symbol.append("circle")
	        .attr("class", "nofill")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("cx", 10)
	        .attr("class", "nofill")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("path")
	        .attr("class", "nofill")
	        .attr("d", "m 9,5 c 0,-2 0,-4 0,-6 0,0 0,0 0,0 0,0 0,-1.8 -1,-2.3 -0.7,-0.6 -1.7,-0.8 -2.9," +
	          "-0.8 -1.2,0 -2,0 -3,0.8 -0.7,0.5 -1,1.4 -1,2.3 0,2 0,4 0,6")
	        .attr("transform", "scale(.5)translate(5,0)");
	      
	      symbol.attr("transform",
	        "translate(-" + (that.radius() - 15) / 7 + ",-" + (that.radius() - 15) / 100 + ")");
	      
	      that.postDrawActions();
	    };
	    
	    function createIntersectionPath(){
	      var height = 18;
	      
	      var offsetX = 5;
	      var offsetY = -(height / 2);
	      
	      var bezierX = 7;
	      var bezierY = 5;
	      var bottomBezierY = height - bezierY;
	      
	      var startPosition = "M" + offsetX + "," + offsetY;
	      var rightSide = "c" + bezierX + "," + bezierY + " " + bezierX + "," + bottomBezierY + " 0," + height;
	      var leftSide = "c" + -bezierX + "," + -bezierY + " " + -bezierX + "," + -bottomBezierY + " 0," + -height;
	      
	      return startPosition + rightSide + leftSide;
	    }
	  };
	  o.prototype = Object.create(SetOperatorNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var OwlThing = __webpack_require__(31);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    OwlThing.apply(this, arguments);
	    
	    this.label("Nothing")
	      .type("owl:Nothing")
	      .iri("http://www.w3.org/2002/07/owl#Nothing");
	  };
	  o.prototype = Object.create(OwlThing.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    var superDrawFunction = this.draw;
	    
	    this.label("Thing")
	      .type("owl:Thing")
	      .iri("http://www.w3.org/2002/07/owl#Thing")
	      .radius(30);
	    
	    this.draw = function ( element ){
	      superDrawFunction(element, ["white", "dashed"]);
	    };
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    SetOperatorNode.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw;
	    
	    this.styleClass("unionof")
	      .type("owl:unionOf");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element);
	      
	      var symbol = element.append("g").classed("embedded", true);
	      
	      var symbolRadius = 10;
	      symbol.append("circle")
	        .attr("class", "symbol")
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("cx", 10)
	        .attr("class", "symbol")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("circle")
	        .attr("class", "nofill")
	        .classed("fineline", true)
	        .attr("r", symbolRadius);
	      symbol.append("path")
	        .attr("class", "link")
	        .attr("d", "m 1,-3 c 0,2 0,4 0,6 0,0 0,0 0,0 0,2 2,3 4,3 2,0 4,-1 4,-3 0,-2 0,-4 0,-6")
	        .attr("transform", "scale(.5)translate(5,0)");
	      
	      symbol.attr("transform", "translate(-" + (that.radius() - 15) / 7 + ",-" + (that.radius() - 15) / 100 + ")");
	      
	      that.postDrawActions();
	    };
	  };
	  o.prototype = Object.create(SetOperatorNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    this.attributes(["rdf"])
	      .type("rdfs:Class");
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var DatatypeNode = __webpack_require__(35);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    DatatypeNode.apply(this, arguments);
	    var dTypeString = "undefined";
	    this.attributes(["datatype"])
	      .type("rdfs:Datatype")
	      .styleClass("datatype");
	    this.dType = function ( val ){
	      if ( !arguments.length ) return dTypeString;
	      dTypeString = val;
	      
	    };
	  };
	  o.prototype = Object.create(DatatypeNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var RectangularNode = __webpack_require__(36);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RectangularNode.apply(this, arguments);
	  };
	  o.prototype = Object.create(RectangularNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var BaseNode = __webpack_require__(9);
	var CenteringTextElement = __webpack_require__(14);
	var drawTools = __webpack_require__(17)();
	var rectangularElementTools = __webpack_require__(37)();

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseNode.apply(this, arguments);
	    
	    var that = this,
	      height = 20,
	      width = 60,
	      pinGroupElement,
	      haloGroupElement,
	      labelWidth = 80,
	      myWidth = 80,
	      defaultWidth = 80,
	      shapeElement,
	      textBlock,
	      smallestRadius = height / 2;
	    
	    that.renderType("rect");
	    // Properties
	    this.height = function ( p ){
	      if ( !arguments.length ) return height;
	      height = p;
	      return this;
	    };
	    
	    this.width = function ( p ){
	      if ( !arguments.length ) return width;
	      width = p;
	      return this;
	    };
	    
	    this.getHalos = function (){
	      return haloGroupElement;
	    };
	    
	    // Functions
	    // for compatibility reasons // TODO resolve
	    this.actualRadius = function (){
	      return smallestRadius;
	    };
	    
	    this.distanceToBorder = function ( dx, dy ){
	      return rectangularElementTools.distanceToBorder(that, dx, dy);
	    };
	    
	    this.setHoverHighlighting = function ( enable ){
	      that.nodeElement().selectAll("rect").classed("hovered", enable);
	      
	      var haloGroup = that.getHalos();
	      if ( haloGroup ) {
	        var test = haloGroup.selectAll(".searchResultA");
	        test.classed("searchResultA", false);
	        test.classed("searchResultB", true);
	      }
	      
	    };
	    
	    
	    // overwrite the labelWith;
	    
	    
	    this.textWidth = function (){
	      return labelWidth;
	    };
	    this.width = function (){
	      return labelWidth;
	    };
	    
	    this.getMyWidth = function (){
	      // use a simple heuristic
	      var text = that.labelForCurrentLanguage();
	      myWidth = measureTextWidth(text, "text") + 20;
	      
	      // check for sub names;
	      var indicatorText = that.indicationString();
	      var indicatorWidth = measureTextWidth(indicatorText, "subtext") + 20;
	      if ( indicatorWidth > myWidth )
	        myWidth = indicatorWidth;
	      
	      return myWidth;
	    };
	    
	    this.textWidth = function (){
	      return that.width();
	    };
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
	    
	    this.toggleFocus = function (){
	      that.focused(!that.focused());
	      that.nodeElement().select("rect").classed("focused", that.focused());
	      graph.resetSearchHighlight();
	      graph.options().searchMenu().clearText();
	    };
	    
	    /**
	     * Draws the rectangular node.
	     * @param parentElement the element to which this node will be appended
	     * @param [additionalCssClasses] additional css classes
	     */
	    this.draw = function ( parentElement, additionalCssClasses ){
	      var cssClasses = that.collectCssClasses();
	      
	      that.nodeElement(parentElement);
	      
	      if ( additionalCssClasses instanceof Array ) {
	        cssClasses = cssClasses.concat(additionalCssClasses);
	      }
	      
	      // set the value for that.width()
	      // update labelWidth Value;
	      if ( graph.options().dynamicLabelWidth() === true ) labelWidth = Math.min(that.getMyWidth(), graph.options().maxLabelWidth());
	      else                              labelWidth = defaultWidth;
	      
	      width = labelWidth;
	      shapeElement = drawTools.appendRectangularClass(parentElement, that.width(), that.height(), cssClasses, that.labelForCurrentLanguage(), that.backgroundColor());
	      
	      textBlock = new CenteringTextElement(parentElement, that.backgroundColor());
	      textBlock.addText(that.labelForCurrentLanguage());
	      
	      that.addMouseListeners();
	      
	      if ( that.pinned() ) {
	        that.drawPin();
	      }
	      if ( that.halo() ) {
	        that.drawHalo(false);
	      }
	    };
	    
	    this.drawPin = function (){
	      that.pinned(true);
	      // if (graph.options().dynamicLabelWidth()===true) labelWidth=that.getMyWidth();
	      // else                							labelWidth=defaultWidth;
	      // width=labelWidth;
	      // console.log("this element label Width is "+labelWidth);
	      var dx = -0.5 * labelWidth + 5,
	        dy = -1.1 * height;
	      
	      pinGroupElement = drawTools.drawPin(that.nodeElement(), dx, dy, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	      
	    };
	    
	    this.removePin = function (){
	      that.pinned(false);
	      if ( pinGroupElement ) {
	        pinGroupElement.remove();
	      }
	      graph.updateStyle();
	    };
	    
	    this.removeHalo = function (){
	      that.halo(false);
	      if ( haloGroupElement ) {
	        haloGroupElement.remove();
	        haloGroupElement = null;
	      }
	    };
	    
	    this.drawHalo = function ( pulseAnimation ){
	      that.halo(true);
	      
	      var offset = 0;
	      haloGroupElement = drawTools.drawRectHalo(that, this.width(), this.height(), offset);
	      
	      if ( pulseAnimation === false ) {
	        var pulseItem = haloGroupElement.selectAll(".searchResultA");
	        pulseItem.classed("searchResultA", false);
	        pulseItem.classed("searchResultB", true);
	        pulseItem.attr("animationRunning", false);
	      }
	      
	      if ( that.pinned() ) {
	        var selectedNode = pinGroupElement.node();
	        var nodeContainer = selectedNode.parentNode;
	        nodeContainer.appendChild(selectedNode);
	      }
	      
	    };
	    
	    this.updateTextElement = function (){
	      textBlock.updateAllTextElements();
	      
	    };
	    
	    this.textBlock = function (){
	      return textBlock;
	    };
	    
	    this.redrawLabelText = function (){
	      textBlock.remove();
	      textBlock = new CenteringTextElement(that.nodeElement(), that.backgroundColor());
	      textBlock.addText(that.labelForCurrentLanguage());
	      that.animateDynamicLabelWidth(graph.options().dynamicLabelWidth());
	      shapeElement.select("title").text(that.labelForCurrentLanguage());
	    };
	    
	    this.animateDynamicLabelWidth = function ( dynamic ){
	      that.removeHalo();
	      var height = that.height();
	      if ( dynamic === true ) {
	        labelWidth = Math.min(that.getMyWidth(), graph.options().maxLabelWidth());
	        shapeElement.transition().tween("attr", function (){
	        })
	          .ease('linear')
	          .duration(100)
	          .attr({ x: -labelWidth / 2, y: -height / 2, width: labelWidth, height: height })
	          .each("end", function (){
	            that.updateTextElement();
	          });
	        
	      } else {
	        labelWidth = defaultWidth;
	        that.updateTextElement();
	        shapeElement.transition().tween("attr", function (){
	        })
	          .ease('linear')
	          .duration(100)
	          .attr({ x: -labelWidth / 2, y: -height / 2, width: labelWidth, height: height });
	        
	      }
	      
	      // for the pin we dont need to differ between different widths -- they are already set
	      if ( that.pinned() === true && pinGroupElement ) {
	        
	        var dx = 0.5 * labelWidth - 10,
	          dy = -1.1 * height;
	        
	        pinGroupElement.transition()
	          .tween("attr.translate", function (){
	          })
	          .attr("transform", "translate(" + dx + "," + dy + ")")
	          .ease('linear')
	          .duration(100);
	      }
	    };
	    
	    this.addTextLabelElement = function (){
	      var parentElement = that.nodeElement();
	      textBlock = new CenteringTextElement(parentElement, this.backgroundColor());
	      textBlock.addText(that.labelForCurrentLanguage());
	    };
	    
	    
	  };
	  o.prototype = Object.create(BaseNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	var tools = {};
	module.exports = function (){
	  return tools;
	};

	tools.distanceToBorder = function ( rect, dx, dy ){
	  var width = rect.width(),
	    height = rect.height();
	  
	  var innerDistance,
	    m_link = Math.abs(dy / dx),
	    m_rect = height / width;
	  
	  if ( m_link <= m_rect ) {
	    var timesX = dx / (width / 2),
	      rectY = dy / timesX;
	    innerDistance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(rectY, 2));
	  } else {
	    var timesY = dy / (height / 2),
	      rectX = dx / timesY;
	    innerDistance = Math.sqrt(Math.pow(height / 2, 2) + Math.pow(rectX, 2));
	  }
	  
	  return innerDistance;
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var DatatypeNode = __webpack_require__(35);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    DatatypeNode.apply(this, arguments);
	    
	    var superDrawFunction = this.draw,
	      superLabelFunction = this.label;
	    
	    this.attributes(["datatype"])
	      .label("Literal")
	      .styleClass("literal")
	      .type("rdfs:Literal")
	      .iri("http://www.w3.org/2000/01/rdf-schema#Literal");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element, ["dashed"]);
	    };
	    
	    this.label = function ( p ){
	      if ( !arguments.length ) return superLabelFunction();
	      return this;
	    };
	  };
	  o.prototype = Object.create(DatatypeNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var RoundNode = __webpack_require__(8);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    RoundNode.apply(this, arguments);
	    
	    var superDrawFunction = this.draw;
	    
	    this.attributes(["rdf"])
	      .label("Resource")
	      .radius(30)
	      .styleClass("rdfsresource")
	      .type("rdfs:Resource");
	    
	    this.draw = function ( element ){
	      superDrawFunction(element, ["rdf", "dashed"]);
	    };
	  };
	  o.prototype = Object.create(RoundNode.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var properties = [];
	properties.push(__webpack_require__(41));
	properties.push(__webpack_require__(44));
	properties.push(__webpack_require__(45));
	properties.push(__webpack_require__(46));
	properties.push(__webpack_require__(47));
	properties.push(__webpack_require__(48));
	properties.push(__webpack_require__(49));
	properties.push(__webpack_require__(50));
	properties.push(__webpack_require__(51));
	properties.push(__webpack_require__(52));
	properties.push(__webpack_require__(53));
	properties.push(__webpack_require__(54));
	properties.push(__webpack_require__(55));
	properties.push(__webpack_require__(56));

	var map = d3.map(properties, function ( Prototype ){
	  return new Prototype().type();
	});

	module.exports = function (){
	  return map;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    var superGenerateCardinalityText = this.generateCardinalityText;
	    
	    this.linkType("values-from")
	      .markerType("filled values-from")
	      .styleClass("allvaluesfromproperty")
	      .type("owl:allValuesFrom");
	    
	    this.generateCardinalityText = function (){
	      var cardinalityText = "A";
	      
	      var superCardinalityText = superGenerateCardinalityText();
	      if ( superCardinalityText ) {
	        cardinalityText += ", " + superCardinalityText;
	      }
	      
	      return cardinalityText;
	    };
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());




/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var BaseElement = __webpack_require__(10);
	var CenteringTextElement = __webpack_require__(14);
	var drawTools = __webpack_require__(17)();
	var forceLayoutNodeFunctions = __webpack_require__(13)();
	var rectangularElementTools = __webpack_require__(37)();
	var math = __webpack_require__(43)();

	module.exports = (function (){
	  
	  // Static variables
	  var labelHeight = 28,
	    labelWidth = 80,
	    smallestRadius = labelHeight / 2;
	  
	  
	  // Constructor, private variables and privileged methods
	  var Base = function ( graph ){
	    BaseElement.apply(this, arguments);
	    
	    var that = this,
	      // Basic attributes
	      cardinality,
	      domain,
	      inverse,
	      link,
	      minCardinality,
	      maxCardinality,
	      range,
	      subproperties,
	      superproperties,
	      // Style attributes
	      linkType = "normal",
	      markerType = "filled",
	      labelVisible = true,
	      // Element containers
	      cardinalityElement,
	      labelElement,
	      linkGroup,
	      markerElement,
	      // Other
	      ignoreLocalHoverEvents,
	      fobj,
	      pinGroupElement,
	      haloGroupElement,
	      myWidth = 80,
	      defaultWidth = 80,
	      shapeElement,
	      textElement,
	      parent_labelObject,
	      backupFullIri,
	      
	      redundantProperties = [];
	    
	    
	    this.existingPropertyIRI = function ( url ){
	      return graph.options().editSidebar().checkForExistingURL(url);
	    };
	    
	    this.getHalos = function (){
	      return haloGroupElement;
	    };
	    
	    this.getPin = function (){
	      return pinGroupElement;
	    };
	    this.labelObject = function ( lo, once ){
	      if ( !arguments.length ) {
	        return parent_labelObject;
	      }
	      else {
	        parent_labelObject = lo;
	        if ( that.inverse() && once !== true ) {
	          that.inverse().labelObject(lo, true);
	        }
	        
	      }
	    };
	    this.hide = function ( val ){
	      that.labelElement().classed("hidden", val);
	      that.linkGroup().classed("hidden", val);
	      if ( that.cardinalityElement() )
	        that.cardinalityElement().classed("hidden", val);
	    };
	    
	    // Properties
	    this.cardinality = function ( p ){
	      if ( !arguments.length ) return cardinality;
	      cardinality = p;
	      return this;
	    };
	    
	    this.cardinalityElement = function ( p ){
	      if ( !arguments.length ) return cardinalityElement;
	      cardinalityElement = p;
	      return this;
	    };
	    
	    this.domain = function ( p ){
	      if ( !arguments.length ) return domain;
	      domain = p;
	      return this;
	    };
	    
	    this.inverse = function ( p ){
	      if ( !arguments.length ) return inverse;
	      inverse = p;
	      return this;
	    };
	    
	    this.labelElement = function ( p ){
	      if ( !arguments.length ) return labelElement;
	      labelElement = p;
	      return this;
	    };
	    
	    this.labelVisible = function ( p ){
	      if ( !arguments.length ) return labelVisible;
	      labelVisible = p;
	      return this;
	    };
	    
	    this.link = function ( p ){
	      if ( !arguments.length ) return link;
	      link = p;
	      return this;
	    };
	    
	    this.linkGroup = function ( p ){
	      if ( !arguments.length ) return linkGroup;
	      linkGroup = p;
	      return this;
	    };
	    
	    this.linkType = function ( p ){
	      if ( !arguments.length ) return linkType;
	      linkType = p;
	      return this;
	    };
	    
	    this.markerElement = function ( p ){
	      if ( !arguments.length ) return markerElement;
	      markerElement = p;
	      return this;
	    };
	    
	    this.markerType = function ( p ){
	      if ( !arguments.length ) return markerType;
	      markerType = p;
	      return this;
	    };
	    
	    this.maxCardinality = function ( p ){
	      if ( !arguments.length ) return maxCardinality;
	      maxCardinality = p;
	      return this;
	    };
	    
	    this.minCardinality = function ( p ){
	      if ( !arguments.length ) return minCardinality;
	      minCardinality = p;
	      return this;
	    };
	    
	    this.range = function ( p ){
	      if ( !arguments.length ) return range;
	      range = p;
	      return this;
	    };
	    
	    this.redundantProperties = function ( p ){
	      if ( !arguments.length ) return redundantProperties;
	      redundantProperties = p;
	      return this;
	    };
	    
	    this.subproperties = function ( p ){
	      if ( !arguments.length ) return subproperties;
	      subproperties = p;
	      return this;
	    };
	    
	    this.superproperties = function ( p ){
	      if ( !arguments.length ) return superproperties;
	      superproperties = p;
	      return this;
	    };
	    
	    
	    // Functions
	    this.distanceToBorder = function ( dx, dy ){
	      return rectangularElementTools.distanceToBorder(that, dx, dy);
	    };
	    
	    this.linkHasMarker = function (){
	      return linkType !== "dashed";
	    };
	    
	    this.markerId = function (){
	      return "marker" + that.id();
	    };
	    
	    this.toggleFocus = function (){
	      that.focused(!that.focused());
	      labelElement.select("rect").classed("focused", that.focused());
	      graph.resetSearchHighlight();
	      graph.options().searchMenu().clearText();
	    };
	    this.getShapeElement = function (){
	      return shapeElement;
	    };
	    
	    this.textBlock = function (){
	      return textElement;
	    };
	    
	    this.redrawElement = function (){
	      shapeElement.remove();
	      textElement.remove();
	      
	      that.drawLabel(that.labelElement());
	      that.animateDynamicLabelWidth(graph.options().dynamicLabelWidth());
	      
	      
	      // shapeElement=this.addRect(that.labelElement());
	      //
	      // var equivalentsString = that.equivalentsString();
	      // var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      //
	      // textElement = new CenteringTextElement(labelContainer, this.backgroundColor());
	      // textElement.addText(this.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	      // textElement.addEquivalents(equivalentsString);
	      // textElement.addSubText(this.indicationString());
	      
	    };
	    
	    // Reused functions TODO refactor
	    this.draw = function ( labelGroup ){
	      function attachLabel( property ){
	        var labelContainer = labelGroup.append("g")
	          .datum(property)
	          .classed("label", true)
	          .attr("id", property.id());
	        
	        property.drawLabel(labelContainer);
	        return labelContainer;
	      }
	      
	      if ( !that.labelVisible() ) {
	        return undefined;
	      }
	      if ( graph.options().dynamicLabelWidth() === true ) myWidth = Math.min(that.getMyWidth(), graph.options().maxLabelWidth());
	      else                              myWidth = defaultWidth;
	      
	      that.labelElement(attachLabel(that));
	      // Draw an inverse label and reposition both labels if necessary
	      if ( that.inverse() ) {
	        var yTransformation = (that.height() / 2) + 1 /* additional space */;
	        that.inverse()
	          .labelElement(attachLabel(that.inverse()));
	        
	        that.labelElement()
	          .attr("transform", "translate(" + 0 + ",-" + yTransformation + ")");
	        that.inverse()
	          .labelElement()
	          .attr("transform", "translate(" + 0 + "," + yTransformation + ")");
	      }
	      
	      if ( that.pinned() ) {
	        that.drawPin();
	      } else if ( that.inverse() && that.inverse().pinned() ) {
	        that.inverse().drawPin();
	      }
	      
	      if ( that.halo() )
	        that.drawHalo(false);
	      
	      return that.labelElement();
	    };
	    
	    this.addRect = function ( labelContainer ){
	      var rect = labelContainer.append("rect")
	        .classed(that.styleClass(), true)
	        .classed("property", true)
	        .attr("x", -that.width() / 2)
	        .attr("y", -that.height() / 2)
	        .attr("width", that.width())
	        .attr("height", that.height())
	        .on("mouseover", function (){
	          onMouseOver();
	        })
	        .on("mouseout", function (){
	          onMouseOut();
	        });
	      
	      rect.append("title")
	        .text(that.labelForCurrentLanguage());
	      
	      if ( that.visualAttributes() ) {
	        rect.classed(that.visualAttributes(), true);
	      }
	      
	      var bgColor = that.backgroundColor();
	      
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	        rect.classed("deprecatedproperty", true);
	      } else {
	        rect.classed("deprecatedproperty", false);
	      }
	      rect.style("fill", bgColor);
	      
	      return rect;
	    };
	    this.drawLabel = function ( labelContainer ){
	      shapeElement = this.addRect(labelContainer);
	      
	      var equivalentsString = that.equivalentsString();
	      var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      
	      var bgColor = that.backgroundColor();
	      if ( that.attributes().indexOf("deprecated") > -1 ) {
	        bgColor = undefined;
	      }
	      textElement = new CenteringTextElement(labelContainer, bgColor);
	      textElement.addText(this.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	      textElement.addEquivalents(equivalentsString);
	      textElement.addSubText(this.indicationString());
	    };
	    
	    this.equivalentsString = function (){
	      var equivalentProperties = that.equivalents();
	      if ( !equivalentProperties ) {
	        return;
	      }
	      
	      return equivalentProperties
	        .map(function ( property ){
	          if ( property === undefined || typeof(property) === "string" ) { // @WORKAROUND
	            return "ERROR";
	          }
	          return property.labelForCurrentLanguage();
	        })
	        .join(", ");
	    };
	    
	    this.drawCardinality = function ( container ){
	      var cardinalityText = this.generateCardinalityText();
	      
	      if ( cardinalityText ) {
	        that.cardinalityElement(container);
	        if ( cardinalityText.indexOf("A") === 0 && cardinalityText.length === 1 ) {
	          
	          // replacing text elements to svg elements;
	          container.classed("cardinality", true)
	            .attr("text-anchor", "middle")
	            .append("path")
	            .classed("cardinality", true)
	            .attr("d", "m -8.8832678,-11.303355 -7.97e-4,0 0.717374,1.833297 8.22987151,21.371761 8.66826659,-21.2123526 0.797082,-1.9927054 0.02471,0 -0.8218553,1.9927054 -2.2517565,5.4201577 -12.4444429,8e-6 -2.2019394,-5.5795821 z")
	            .style("fill", "none")
	            .attr("transform", "matrix(0.5,0,0,0.5,0.5,0.5)");
	          return true;
	        } else if ( cardinalityText.indexOf("E") === 0 && cardinalityText.length === 1 ) {
	          container.classed("cardinality", true)
	            .attr("text-anchor", "middle")
	            .append("path")
	            .classed("cardinality", true)
	            .attr("d", "m -5.5788451,-8.0958763 10.8749368,0 0,8.34681523 -9.5707468,0.040132 9.5707468,-0.040132 0,8.42707237 -10.9150654,0")
	            .style("fill", "none")
	            .attr("transform", "matrix(0.5,0,0,0.5,0.5,0.5)");
	          return true;
	        }
	        else {
	          container.append("text")
	            .classed("cardinality", true)
	            .attr("text-anchor", "middle")
	            .attr("dy", "0.5ex")
	            .text(cardinalityText);
	          return true; // drawing successful
	        }
	      } else {
	        return false;
	      }
	    };
	    
	    this.generateCardinalityText = function (){
	      if ( that.cardinality() ) {
	        return that.cardinality();
	      } else if ( that.minCardinality() || that.maxCardinality() ) {
	        var minBoundary = that.minCardinality() || "*";
	        var maxBoundary = that.maxCardinality() || "*";
	        return minBoundary + ".." + maxBoundary;
	      }
	    };
	    
	    that.setHighlighting = function ( enable ){
	      if ( that.labelElement && that.labelElement() ) {
	        that.labelElement().select("rect").classed("hovered", enable);
	      }
	      that.linkGroup().selectAll("path, text").classed("hovered", enable);
	      if ( that.markerElement() ) {
	        that.markerElement().select("path").classed("hovered", enable);
	        if ( that.cardinalityElement() ) {
	          that.cardinalityElement().selectAll("path").classed("hovered-MathSymbol", enable);
	          that.cardinalityElement().classed("hovered", enable);
	        }
	      }
	      var subAndSuperProperties = getSubAndSuperProperties();
	      subAndSuperProperties.forEach(function ( property ){
	        
	        if ( property.labelElement && property.labelElement() ) {
	          property.labelElement().select("rect")
	            .classed("indirect-highlighting", enable);
	        }
	        
	      });
	      var inversed = false;
	      
	      if ( graph.ignoreOtherHoverEvents() === false ) {
	        if ( that.inverse() ) {
	          inversed = true;
	        }
	        
	        if ( graph.isTouchDevice() === false ) {
	          graph.activateHoverElementsForProperties(enable, that, inversed);
	        }
	        else {
	          that.labelElement().select("rect").classed("hovered", false);
	          that.linkGroup().selectAll("path, text").classed("hovered", false);
	          if ( that.markerElement() ) {
	            that.markerElement().select("path").classed("hovered", false);
	            if ( that.cardinalityElement() ) {
	              that.cardinalityElement().classed("hovered", false);
	            }
	          }
	          graph.activateHoverElementsForProperties(enable, that, inversed, true);
	        }
	      }
	    };
	    
	    /**
	     * Combines the sub- and superproperties into a single array, because
	     * they're often used equivalently.
	     * @returns {Array}
	     */
	    function getSubAndSuperProperties(){
	      var properties = [];
	      
	      if ( that.subproperties() ) {
	        properties = properties.concat(that.subproperties());
	      }
	      if ( that.superproperties() ) {
	        properties = properties.concat(that.superproperties());
	      }
	      
	      return properties;
	    }
	    
	    /**
	     * Foregrounds the property, its inverse and the link.
	     */
	    this.foreground = function (){
	      // check for additional objects that we can highlight
	      if ( !that.labelElement() )
	        return;
	      if ( that.labelElement().node().parentNode === null ) {
	        return;
	      }
	      var selectedLabelGroup = that.labelElement().node().parentNode,
	        labelContainer = selectedLabelGroup.parentNode,
	        selectedLinkGroup = that.linkGroup().node(),
	        linkContainer = that.linkGroup().node().parentNode;
	      if ( that.animationProcess() === false ) {
	        labelContainer.appendChild(selectedLabelGroup);
	      }
	      linkContainer.appendChild(selectedLinkGroup);
	    };
	    
	    /**
	     * Foregrounds the sub- and superproperties of this property.
	     * This is separated from the foreground-function to prevent endless loops.
	     */
	    function foregroundSubAndSuperProperties(){
	      var subAndSuperProperties = getSubAndSuperProperties();
	      
	      subAndSuperProperties.forEach(function ( property ){
	        if ( property.foreground ) property.foreground();
	      });
	    }
	    
	    function onMouseOver(){
	      if ( that.mouseEntered() || ignoreLocalHoverEvents === true ) {
	        return;
	      }
	      that.mouseEntered(true);
	      that.setHighlighting(true);
	      that.foreground();
	      foregroundSubAndSuperProperties();
	    }
	    
	    function onMouseOut(){
	      that.mouseEntered(false);
	      that.setHighlighting(false);
	    }
	    
	    this.drawPin = function (){
	      that.pinned(true);
	      if ( graph.options().dynamicLabelWidth() === true ) myWidth = that.getMyWidth();
	      else                              myWidth = defaultWidth;
	      
	      if ( that.inverse() ) {
	        // check which element is rendered on top and add a pin to it
	        var tr_that = that.labelElement().attr("transform");
	        var tr_inv = that.inverse().labelElement().attr("transform");
	        
	        var thatY = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(tr_that)[2];
	        var invY = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(tr_inv)[2];
	        
	        if ( thatY < invY )
	          pinGroupElement = drawTools.drawPin(that.labelElement(), -0.5 * that.width() + 10, -25, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	        else
	          pinGroupElement = drawTools.drawPin(that.inverse().labelElement(), -0.5 * that.inverse().width() + 10, -25, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	        
	      }
	      else {
	        pinGroupElement = drawTools.drawPin(that.labelElement(), -0.5 * that.width() + 10, -25, this.removePin, graph.options().showDraggerObject, graph.options().useAccuracyHelper());
	      }
	      
	      
	    };
	    
	    /**
	     * Removes the pin and refreshs the graph to update the force layout.
	     */
	    this.removePin = function (){
	      that.pinned(false);
	      if ( pinGroupElement ) {
	        pinGroupElement.remove();
	      }
	      graph.updateStyle();
	    };
	    
	    this.removeHalo = function (){
	      that.halo(false);
	      if ( haloGroupElement ) {
	        haloGroupElement.remove();
	        haloGroupElement = null;
	      }
	    };
	    
	    this.animationProcess = function (){
	      var animRuns = false;
	      if ( that.getHalos() ) {
	        var haloGr = that.getHalos();
	        var haloEls = haloGr.selectAll(".searchResultA");
	        animRuns = haloGr.attr("animationRunning");
	        
	        if ( typeof animRuns !== "boolean" ) {
	          // parse this to a boolean value
	          animRuns = (animRuns === 'true');
	        }
	        if ( animRuns === false ) {
	          haloEls.classed("searchResultA", false);
	          haloEls.classed("searchResultB", true);
	        }
	      }
	      return animRuns;
	    };
	    
	    this.drawHalo = function ( pulseAnimation ){
	      that.halo(true);
	      var offset = 0;
	      if ( that.labelElement() && that.labelElement().node() ) {
	        var labelNode = that.labelElement().node();
	        var labelContainer = labelNode.parentNode;
	        // do this only if animation is not running
	        if ( that.animationProcess() === false )
	          labelContainer.appendChild(labelNode);
	      }
	      haloGroupElement = drawTools.drawRectHalo(that, that.width(), that.height(), offset);
	      if ( haloGroupElement ) {
	        var haloNode = haloGroupElement.node();
	        var haloContainer = haloNode.parentNode;
	        haloContainer.appendChild(haloNode);
	      }
	      var selectedNode;
	      var nodeContainer;
	      if ( that.pinned() ) {
	        selectedNode = pinGroupElement.node();
	        nodeContainer = selectedNode.parentNode;
	        nodeContainer.appendChild(selectedNode);
	      }
	      if ( that.inverse() && that.inverse().pinned() ) {
	        if ( that.inverse().getPin() ) {
	          selectedNode = that.inverse().getPin().node();
	          nodeContainer = selectedNode.parentNode;
	          nodeContainer.appendChild(selectedNode);
	        }
	      }
	      if ( pulseAnimation === false ) {
	        var pulseItem = haloGroupElement.selectAll(".searchResultA");
	        pulseItem.classed("searchResultA", false);
	        pulseItem.classed("searchResultB", true);
	        pulseItem.attr("animationRunning", false);
	      }
	    };
	    
	    this.getMyWidth = function (){
	      var text = that.labelForCurrentLanguage();
	      myWidth = measureTextWidth(text, "text") + 20;
	      // check for sub names;
	      var indicatorText = that.indicationString();
	      var indicatorWidth = measureTextWidth(indicatorText, "subtext") + 20;
	      if ( indicatorWidth > myWidth )
	        myWidth = indicatorWidth;
	      
	      return myWidth;
	    };
	    
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
	    
	    this.textWidth = function (){
	      return myWidth;
	    };
	    this.width = function (){
	      return myWidth;
	    };
	    
	    this.animateDynamicLabelWidth = function ( dynamic ){
	      that.removeHalo();
	      if ( shapeElement === undefined ) {// this handles setOperatorProperties which dont have a shapeElement!
	        return;
	      }
	      
	      var h = that.height();
	      if ( dynamic === true ) {
	        myWidth = Math.min(that.getMyWidth(), graph.options().maxLabelWidth());
	        shapeElement.transition().tween("attr", function (){
	        })
	          .ease('linear')
	          .duration(100)
	          .attr({ x: -myWidth / 2, y: -h / 2, width: myWidth, height: h })
	          .each("end", function (){
	            that.updateTextElement();
	          });
	      } else {
	        // Static width for property labels = 80
	        myWidth = defaultWidth;
	        that.updateTextElement();
	        shapeElement.transition().tween("attr", function (){
	        })
	          .ease('linear')
	          .duration(100)
	          .attr({ x: -myWidth / 2, y: -h / 2, width: myWidth, height: h });
	      }
	      if ( that.pinned() === true && pinGroupElement ) {
	        var dx = -0.5 * myWidth + 10,
	          dy = -25;
	        pinGroupElement.transition()
	          .tween("attr.translate", function (){
	          })
	          .attr("transform", "translate(" + dx + "," + dy + ")")
	          .ease('linear')
	          .duration(100);
	      }
	    };
	    
	    this.redrawLabelText = function (){
	      textElement.remove();
	      that.addTextLabelElement();
	      that.animateDynamicLabelWidth(graph.options().dynamicLabelWidth());
	      shapeElement.select("title").text(that.labelForCurrentLanguage());
	    };
	    
	    this.addTextLabelElement = function (){
	      var labelContainer = that.labelElement();
	      
	      var equivalentsString = that.equivalentsString();
	      var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	      
	      textElement = new CenteringTextElement(labelContainer, this.backgroundColor());
	      textElement.addText(this.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	      textElement.addEquivalents(equivalentsString);
	      textElement.addSubText(this.indicationString());
	    };
	    
	    this.updateTextElement = function (){
	      textElement.updateAllTextElements();
	    };
	    this.enableEditing = function ( autoEditing ){
	      if ( autoEditing === false )
	        return;
	      that.raiseDoubleClickEdit(true);
	    };
	    
	    this.raiseDoubleClickEdit = function ( forceIRISync ){
	      d3.selectAll(".foreignelements").remove();
	      if ( that.labelElement() === undefined || this.type() === "owl:disjointWith" || this.type() === "rdfs:subClassOf" ) {
	        console.log("No Container found");
	        return;
	      }
	      if ( fobj !== undefined ) {
	        that.labelElement().selectAll(".foreignelements").remove();
	      }
	      backupFullIri = undefined;
	      graph.options().focuserModule().handle(undefined);
	      graph.options().focuserModule().handle(that);
	      that.editingTextElement = true;
	      ignoreLocalHoverEvents = true;
	      that.labelElement().selectAll("rect").classed("hoveredForEditing", true);
	      that.frozen(true);
	      graph.killDelayedTimer();
	      graph.ignoreOtherHoverEvents(false);
	      fobj = that.labelElement().append("foreignObject")
	        .attr("x", -0.5 * that.textWidth())
	        .attr("y", -13)
	        .attr("height", 25)
	        .attr("class", "foreignelements")
	        .on("dragstart", function (){
	          return false;
	        }) // remove drag operations of text element)
	        .attr("width", that.textWidth() - 2);
	      // adding a Style to the fObject
	      //
	      //
	      //
	      var editText = fobj.append("xhtml:input")
	        .attr("class", "nodeEditSpan")
	        .attr("id", that.id())
	        .attr("align", "center")
	        .attr("contentEditable", "true")
	        .on("dragstart", function (){
	          return false;
	        }); // remove drag operations of text element)
	      
	      var bgColor = '#f00';
	      var txtWidth = that.textWidth() - 2;
	      editText.style({
	        // 'line-height': '30px',
	        'align': 'center',
	        'color': 'black',
	        'width': txtWidth + "px",
	        'background-color': bgColor,
	        'border-bottom': '2px solid black'
	      });
	      var txtNode = editText.node();
	      txtNode.value = that.labelForCurrentLanguage();
	      txtNode.focus();
	      txtNode.select();
	      if ( d3.event.stopPropagation ) d3.event.stopPropagation();
	      if ( d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation ) d3.event.sourceEvent.stopPropagation();
	      
	      // add some events that relate to this object
	      editText.on("click", function (){
	        if ( d3.event.stopPropagation ) d3.event.stopPropagation();
	        if ( d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation ) d3.event.sourceEvent.stopPropagation();
	        
	      });
	      // // remove hover Events for now;
	      editText.on("mouseout", function (){
	        if ( d3.event.stopPropagation ) d3.event.stopPropagation();
	        if ( d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation ) d3.event.sourceEvent.stopPropagation();
	      });
	      editText.on("mousedown", function (){
	        if ( d3.event.stopPropagation ) d3.event.stopPropagation();
	        if ( d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation ) d3.event.sourceEvent.stopPropagation();
	      })
	        .on("keydown", function (){
	          
	          if ( d3.event.keyCode === 13 ) {
	            this.blur();
	            that.frozen(false); // << releases the not after selection
	            that.locked(false);
	          }
	        })
	        .on("keyup", function (){
	          if ( forceIRISync ) {
	            var labelName = editText.node().value;
	            var resourceName = labelName.replaceAll(" ", "_");
	            var syncedIRI = that.baseIri() + resourceName;
	            backupFullIri = syncedIRI;
	            
	            d3.select("#element_iriEditor").node().title = syncedIRI;
	            d3.select("#element_iriEditor").node().value = graph.options().prefixModule().getPrefixRepresentationForFullURI(syncedIRI);
	          }
	          d3.select("#element_labelEditor").node().value = editText.node().value;
	          
	        })
	        .on("blur", function (){
	          
	          
	          that.editingTextElement = false;
	          ignoreLocalHoverEvents = false;
	          that.labelElement().selectAll("rect").classed("hoveredForEditing", false);
	          var newLabel = editText.node().value;
	          that.labelElement().selectAll(".foreignelements").remove();
	          // that.setLabelForCurrentLanguage(classNameConvention(editText.node().value));
	          that.label(newLabel);
	          that.backupLabel(newLabel);
	          that.redrawLabelText();
	          updateHoverElements(true);
	          graph.showHoverElementsAfterAnimation(that, false);
	          graph.ignoreOtherHoverEvents(false);
	          
	          
	          that.frozen(graph.paused());
	          that.locked(graph.paused());
	          that.domain().frozen(graph.paused());
	          that.domain().locked(graph.paused());
	          that.range().frozen(graph.paused());
	          that.range().locked(graph.paused());
	          graph.removeEditElements();
	          if ( backupFullIri ) {
	            // console.log("Checking if element is Identical ?");
	            var sanityCheckResult = graph.options().editSidebar().checkProperIriChange(that, backupFullIri);
	            if ( sanityCheckResult !== false ) {
	              graph.options().warningModule().showWarning("Already seen this property",
	                "Input IRI: " + backupFullIri + " for element: " + that.labelForCurrentLanguage() + " already been set",
	                "Continuing with duplicate property!", 1, false, sanityCheckResult);
	            }
	            that.iri(backupFullIri);
	          }
	          graph.options().focuserModule().handle(undefined);
	          graph.options().focuserModule().handle(that);
	          graph.updatePropertyDraggerElements(that);
	          
	          
	        });	// add a foreiner element to this thing;
	      
	    };
	    
	    // update hover elements
	    function updateHoverElements( enable ){
	      if ( graph.ignoreOtherHoverEvents() === false ) {
	        var inversed = false;
	        if ( that.inverse() ) {
	          inversed = true;
	        }
	        if ( enable === true ) {
	          graph.activateHoverElementsForProperties(enable, that, inversed);
	        }
	      }
	    }
	    
	    that.copyInformation = function ( other ){
	      that.label(other.label());
	      that.iri(other.iri());
	      that.baseIri(other.baseIri());
	      if ( other.type() === "owl:ObjectProperty" ||
	        other.type() === "owl:DatatypeProperty" ) {
	        that.backupLabel(other.label());
	        // console.log("copied backup label"+that.backupLabel());
	      }
	      if ( other.backupLabel() !== undefined ) {
	        that.backupLabel(other.backupLabel());
	      }
	    };
	    
	    forceLayoutNodeFunctions.addTo(this);
	  };
	  
	  Base.prototype = Object.create(BaseElement.prototype);
	  Base.prototype.constructor = Base;
	  
	  Base.prototype.height = function (){
	    return labelHeight;
	  };
	  
	  Base.prototype.width = function (){
	    return labelWidth;
	  };
	  
	  Base.prototype.actualRadius = function (){
	    return smallestRadius;
	  };
	  
	  Base.prototype.textWidth = Base.prototype.width;
	  
	  
	  return Base;
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * Contains a collection of mathematical functions with some additional data
	 * used for WebVOWL.
	 */
	module.exports = (function (){
	  
	  var math = {},
	    loopFunction = d3.svg.line()
	      .x(function ( d ){
	        return d.x;
	      })
	      .y(function ( d ){
	        return d.y;
	      })
	      .interpolate("cardinal")
	      .tension(-1);
	  
	  
	  /**
	   * Calculates the normal vector of the path between the two nodes.
	   * @param source the first node
	   * @param target the second node
	   * @param length the length of the calculated normal vector
	   * @returns {{x: number, y: number}}
	   */
	  math.calculateNormalVector = function ( source, target, length ){
	    var dx = target.x - source.x,
	      dy = target.y - source.y;
	    
	    var nx = -dy,
	      ny = dx;
	    
	    var vlength = Math.sqrt(nx * nx + ny * ny);
	    
	    var ratio = vlength !== 0 ? length / vlength : 0;
	    
	    return { "x": nx * ratio, "y": ny * ratio };
	  };
	  
	  /**
	   * Calculates the path for a link, if it is a loop. Currently only working for circlular nodes.
	   * @param link the link
	   * @returns {*}
	   */
	  
	  
	  
	  math.getLoopPoints = function ( link ){
	    var node = link.domain(),
	      label = link.label();
	    
	    var fairShareLoopAngle = 360 / link.loops().length,
	      fairShareLoopAngleWithMargin = fairShareLoopAngle * 0.8,
	      loopAngle = Math.min(60, fairShareLoopAngleWithMargin);
	    
	    if ( label.increasedLoopAngle === true )
	      loopAngle = 120;
	    
	    
	    var dx = label.x - node.x,
	      dy = label.y - node.y,
	      labelRadian = Math.atan2(dy, dx),
	      labelAngle = calculateAngle(labelRadian);
	    
	    var startAngle = labelAngle - loopAngle / 2,
	      endAngle = labelAngle + loopAngle / 2;
	    
	    
	    var arcFrom = calculateRadian(startAngle),
	      arcTo = calculateRadian(endAngle),
	      
	      x1 = Math.cos(arcFrom) * node.actualRadius(),
	      y1 = Math.sin(arcFrom) * node.actualRadius(),
	      
	      x2 = Math.cos(arcTo) * node.actualRadius(),
	      y2 = Math.sin(arcTo) * node.actualRadius(),
	      
	      fixPoint1 = { "x": node.x + x1, "y": node.y + y1 },
	      fixPoint2 = { "x": node.x + x2, "y": node.y + y2 };
	    
	    return [fixPoint1, fixPoint2];
	  };
	  math.calculateLoopPath = function ( link ){
	    var node = link.domain(),
	      label = link.label();
	    
	    
	    var fairShareLoopAngle = 360 / link.loops().length,
	      fairShareLoopAngleWithMargin = fairShareLoopAngle * 0.8,
	      loopAngle = Math.min(60, fairShareLoopAngleWithMargin);
	    
	    if ( label.increasedLoopAngle === true )
	      loopAngle = 120;
	    
	    var dx = label.x - node.x,
	      dy = label.y - node.y,
	      labelRadian = Math.atan2(dy, dx),
	      labelAngle = calculateAngle(labelRadian);
	    
	    var startAngle = labelAngle - loopAngle / 2,
	      endAngle = labelAngle + loopAngle / 2;
	    
	    var arcFrom = calculateRadian(startAngle),
	      arcTo = calculateRadian(endAngle),
	      
	      x1 = Math.cos(arcFrom) * node.actualRadius(),
	      y1 = Math.sin(arcFrom) * node.actualRadius(),
	      
	      x2 = Math.cos(arcTo) * node.actualRadius(),
	      y2 = Math.sin(arcTo) * node.actualRadius(),
	      
	      fixPoint1 = { "x": node.x + x1, "y": node.y + y1 },
	      fixPoint2 = { "x": node.x + x2, "y": node.y + y2 };
	    
	    return loopFunction([fixPoint1, link.label(), fixPoint2]);
	  };
	  
	  math.calculateLoopPoints = function ( link ){
	    var node = link.domain(),
	      label = link.label();
	    
	    var fairShareLoopAngle = 360 / link.loops().length,
	      fairShareLoopAngleWithMargin = fairShareLoopAngle * 0.8,
	      loopAngle = Math.min(60, fairShareLoopAngleWithMargin);
	    
	    var dx = label.x - node.x,
	      dy = label.y - node.y,
	      labelRadian = Math.atan2(dy, dx),
	      labelAngle = calculateAngle(labelRadian);
	    
	    var startAngle = labelAngle - loopAngle / 2,
	      endAngle = labelAngle + loopAngle / 2;
	    
	    var arcFrom = calculateRadian(startAngle),
	      arcTo = calculateRadian(endAngle),
	      
	      x1 = Math.cos(arcFrom) * node.actualRadius(),
	      y1 = Math.sin(arcFrom) * node.actualRadius(),
	      
	      x2 = Math.cos(arcTo) * (node.actualRadius()),
	      y2 = Math.sin(arcTo) * (node.actualRadius()),
	      
	      fixPoint1 = { "x": node.x + x1, "y": node.y + y1 },
	      fixPoint2 = { "x": node.x + x2, "y": node.y + y2 };
	    
	    return [fixPoint1, link.label(), fixPoint2];
	  };
	  
	  /**
	   * @param angle
	   * @returns {number} the radian of the angle
	   */
	  function calculateRadian( angle ){
	    angle = angle % 360;
	    if ( angle < 0 ) {
	      angle = angle + 360;
	    }
	    return (Math.PI * angle) / 180;
	  }
	  
	  /**
	   * @param radian
	   * @returns {number} the angle of the radian
	   */
	  function calculateAngle( radian ){
	    return radian * (180 / Math.PI);
	  }
	  
	  /**
	   * Calculates the point where the link between the source and target node
	   * intersects the border of the target node.
	   * @param source the source node
	   * @param target the target node
	   * @param additionalDistance additional distance the
	   * @returns {{x: number, y: number}}
	   */
	  math.calculateIntersection = function ( source, target, additionalDistance ){
	    var dx = target.x - source.x,
	      dy = target.y - source.y,
	      length = Math.sqrt(dx * dx + dy * dy);
	    
	    if ( length === 0 ) {
	      return { x: source.x, y: source.y };
	    }
	    
	    var innerDistance = target.distanceToBorder(dx, dy);
	    
	    var ratio = (length - (innerDistance + additionalDistance)) / length,
	      x = dx * ratio + source.x,
	      y = dy * ratio + source.y;
	    
	    return { x: x, y: y };
	  };
	  
	  /**
	   * Calculates the position between the two points.
	   * @param firstPoint
	   * @param secondPoint
	   * @returns {{x: number, y: number}}
	   */
	  math.calculateCenter = function ( firstPoint, secondPoint ){
	    return {
	      x: (firstPoint.x + secondPoint.x) / 2,
	      y: (firstPoint.y + secondPoint.y) / 2
	    };
	  };
	  
	  
	  return function (){
	    /* Use a function here to keep a consistent style like webvowl.path.to.module()
	     * despite having just a single math object. */
	    return math;
	  };
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["datatype"])
	      .styleClass("datatypeproperty")
	      .type("owl:DatatypeProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["deprecated"])
	      .styleClass("deprecatedproperty")
	      .type("owl:DeprecatedProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);
	var CenteringTextElement = __webpack_require__(14);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    var label = "Disjoint With";
	    var shapeElement;
	    // Disallow overwriting the label
	    this.label = function ( p ){
	      if ( !arguments.length ) return label;
	      return this;
	    };
	    
	    this.linkType("dashed")
	      .styleClass("disjointwith")
	      .type("owl:disjointWith");
	    
	    this.drawLabel = function ( labelContainer ){
	      shapeElement = this.addRect(labelContainer);
	      
	      labelContainer.append("circle")
	        .classed("symbol", true)
	        .classed("fineline", true)
	        .classed("embedded", true)
	        .attr("cx", -12.5)
	        .attr("r", 10);
	      
	      labelContainer.append("circle")
	        .classed("symbol", true)
	        .classed("fineline", true)
	        .classed("embedded", true)
	        .attr("cx", 12.5)
	        .attr("r", 10);
	      
	      var textElement = new CenteringTextElement(labelContainer, this.backgroundColor());
	      if ( !graph.options().compactNotation() ) {
	        textElement.addSubText("disjoint");
	      }
	      textElement.translation(0, 20);
	    };
	    this.getShapeElement = function (){
	      return shapeElement;
	    };
	    this.markerElement = function (){
	      return undefined;
	    };
	    
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.styleClass("equivalentproperty")
	      .type("owl:equivalentProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["functional"])
	      .styleClass("functionalproperty")
	      .type("owl:FunctionalProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["inverse functional"])
	      .styleClass("inversefunctionalproperty")
	      .type("owl:InverseFunctionalProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["object"])
	      .styleClass("objectproperty")
	      .type("owl:ObjectProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());




/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    var superGenerateCardinalityText = this.generateCardinalityText;
	    
	    this.linkType("values-from")
	      .markerType("filled values-from")
	      .styleClass("somevaluesfromproperty")
	      .type("owl:someValuesFrom");
	    
	    this.generateCardinalityText = function (){
	      var cardinalityText = "E";
	      
	      var superCardinalityText = superGenerateCardinalityText();
	      if ( superCardinalityText ) {
	        cardinalityText += ", " + superCardinalityText;
	      }
	      
	      return cardinalityText;
	    };
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());




/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["symmetric"])
	      .styleClass("symmetricproperty")
	      .type("owl:SymmetricProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["transitive"])
	      .styleClass("transitiveproperty")
	      .type("owl:TransitiveProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.attributes(["rdf"])
	      .styleClass("rdfproperty")
	      .type("rdf:Property");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    var that = this,
	      superDrawFunction = that.draw,
	      label = "Subclass of";
	    
	    this.draw = function ( labelGroup ){
	      that.labelVisible(!graph.options().compactNotation());
	      return superDrawFunction(labelGroup);
	    };
	    
	    // Disallow overwriting the label
	    this.label = function ( p ){
	      if ( !arguments.length ) return label;
	      return this;
	    };
	    
	    this.linkType("dotted")
	      .markerType("white")
	      .styleClass("subclass")
	      .type("rdfs:subClassOf");
	    
	    that.baseIri("http://www.w3.org/2000/01/rdf-schema#");
	    that.iri("http://www.w3.org/2000/01/rdf-schema#subClassOf");
	    
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);

	module.exports = (function (){
	  
	  var o = function ( graph ){
	    BaseProperty.apply(this, arguments);
	    
	    this.labelVisible(false)
	      .linkType("dashed")
	      .markerType("white")
	      .styleClass("setoperatorproperty")
	      .type("setOperatorProperty");
	  };
	  o.prototype = Object.create(BaseProperty.prototype);
	  o.prototype.constructor = o;
	  
	  return o;
	}());


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var _ = __webpack_require__(58);
	var math = __webpack_require__(43)();
	var linkCreator = __webpack_require__(60)();
	var elementTools = __webpack_require__(63)();
	// add some maps for nodes and properties -- used for object generation
	var nodePrototypeMap = __webpack_require__(5)();
	var propertyPrototypeMap = __webpack_require__(40)();


	module.exports = function ( graphContainerSelector ){
	  var graph = {},
	    CARDINALITY_HDISTANCE = 20,
	    CARDINALITY_VDISTANCE = 10,
	    curveFunction = d3.svg.line()
	      .x(function ( d ){
	        return d.x;
	      })
	      .y(function ( d ){
	        return d.y;
	      })
	      .interpolate("cardinal"),
	    options = __webpack_require__(64)(),
	    parser = __webpack_require__(65)(graph),
	    language = "default",
	    paused = false,
	    // Container for visual elements
	    graphContainer,
	    nodeContainer,
	    labelContainer,
	    cardinalityContainer,
	    linkContainer,
	    // Visual elements
	    nodeElements,
	    initialLoad = true,
	    updateRenderingDuringSimulation = false,
	    labelGroupElements,
	    linkGroups,
	    linkPathElements,
	    cardinalityElements,
	    // Internal data
	    classNodes,
	    labelNodes,
	    links,
	    properties,
	    unfilteredData,
	    // Graph behaviour
	    force,
	    dragBehaviour,
	    zoomFactor = 1.0,
	    centerGraphViewOnLoad = false,
	    transformAnimation = false,
	    graphTranslation = [0, 0],
	    graphUpdateRequired = false,
	    pulseNodeIds = [],
	    nodeArrayForPulse = [],
	    nodeMap = [],
	    locationId = 0,
	    defaultZoom = 1.0,
	    defaultTargetZoom = 0.8,
	    global_dof = -1,
	    touchDevice = false,
	    last_touch_time,
	    originalD3_dblClickFunction = null,
	    originalD3_touchZoomFunction = null,
	    
	    // editing elements
	    deleteGroupElement,
	    addDataPropertyGroupElement,
	    editContainer,
	    draggerLayer = null,
	    draggerObjectsArray = [],
	    delayedHider,
	    nodeFreezer,
	    hoveredNodeElement = null,
	    currentlySelectedNode = null,
	    hoveredPropertyElement = null,
	    draggingStarted = false,
	    frozenDomainForPropertyDragger,
	    frozenRangeForPropertyDragger,
	    
	    eP = 0, // id for new properties
	    eN = 0, // id for new Nodes
	    editMode = true,
	    debugContainer = d3.select("#FPS_Statistics"),
	    finishedLoadingSequence = false,
	    
	    ignoreOtherHoverEvents = false,
	    forceNotZooming = false,
	    now, then, // used for fps computation
	    showFPS = false,
	    seenEditorHint = false,
	    seenFilterWarning = false,
	    showFilterWarning = false,
	    
	    keepDetailsCollapsedOnLoading = true,
	    adjustingGraphSize = false,
	    showReloadButtonAfterLayoutOptimization = false,
	    zoom;
	  //var prefixModule=require("./prefixRepresentationModule")(graph);
	  var NodePrototypeMap = createLowerCasePrototypeMap(nodePrototypeMap);
	  var PropertyPrototypeMap = createLowerCasePrototypeMap(propertyPrototypeMap);
	  var classDragger = __webpack_require__(68)(graph);
	  var rangeDragger = __webpack_require__(69)(graph);
	  var domainDragger = __webpack_require__(70)(graph);
	  var shadowClone = __webpack_require__(71)(graph);
	  
	  graph.math = function (){
	    return math;
	  };
	  /** --------------------------------------------------------- **/
	  /** -- getter and setter definitions                       -- **/
	  /** --------------------------------------------------------- **/
	  graph.isEditorMode = function (){
	    return editMode;
	  };
	  graph.getGlobalDOF = function (){
	    return global_dof;
	  };
	  graph.setGlobalDOF = function ( val ){
	    global_dof = val;
	  };
	  
	  graph.updateZoomSliderValueFromOutside = function (){
	    graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	  };
	  
	  graph.setDefaultZoom = function ( val ){
	    defaultZoom = val;
	    graph.reset();
	    graph.options().zoomSlider().updateZoomSliderValue(defaultZoom);
	  };
	  graph.setTargetZoom = function ( val ){
	    defaultTargetZoom = val;
	  };
	  graph.graphOptions = function (){
	    return options;
	  };
	  
	  graph.scaleFactor = function (){
	    return zoomFactor;
	  };
	  graph.translation = function (){
	    return graphTranslation;
	  };
	  
	  // Returns the visible nodes
	  graph.graphNodeElements = function (){
	    return nodeElements;
	  };
	  // Returns the visible Label Nodes
	  graph.graphLabelElements = function (){
	    return labelNodes;
	  };
	  
	  graph.graphLinkElements = function (){
	    return links;
	  };
	  
	  graph.setSliderZoom = function ( val ){
	    
	    var cx = 0.5 * graph.options().width();
	    var cy = 0.5 * graph.options().height();
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    var sP = [cp.x, cp.y, graph.options().height() / zoomFactor];
	    var eP = [cp.x, cp.y, graph.options().height() / val];
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(1)
	      .attrTween("transform", function (){
	        return function ( t ){
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	      });
	  };
	  
	  
	  graph.setZoom = function ( value ){
	    zoom.scale(value);
	  };
	  
	  graph.setTranslation = function ( translation ){
	    zoom.translate([translation[0], translation[1]]);
	  };
	  
	  graph.options = function (){
	    return options;
	  };
	  // search functionality
	  graph.getUpdateDictionary = function (){
	    return parser.getDictionary();
	  };
	  
	  graph.language = function ( newLanguage ){
	    if ( !arguments.length ) return language;
	    
	    // Just update if the language changes
	    if ( language !== newLanguage ) {
	      language = newLanguage || "default";
	      redrawContent();
	      recalculatePositions();
	      graph.options().searchMenu().requestDictionaryUpdate();
	      graph.resetSearchHighlight();
	    }
	    return graph;
	  };
	  
	  
	  /** --------------------------------------------------------- **/
	  /** graph / rendering  related functions                      **/
	  /** --------------------------------------------------------- **/
	  
	  // Initializes the graph.
	  function initializeGraph(){
	    
	    options.graphContainerSelector(graphContainerSelector);
	    var moved = false;
	    force = d3.layout.force()
	      .on("tick", hiddenRecalculatePositions);
	    
	    dragBehaviour = d3.behavior.drag()
	      .origin(function ( d ){
	        return d;
	      })
	      .on("dragstart", function ( d ){
	        d3.event.sourceEvent.stopPropagation(); // Prevent panning
	        graph.ignoreOtherHoverEvents(true);
	        if ( d.type && d.type() === "Class_dragger" ) {
	          classDragger.mouseButtonPressed = true;
	          clearTimeout(delayedHider);
	          classDragger.selectedViaTouch(true);
	          d.parentNode().locked(true);
	          draggingStarted = true;
	        } else if ( d.type && d.type() === "Range_dragger" ) {
	          graph.ignoreOtherHoverEvents(true);
	          clearTimeout(delayedHider);
	          frozenDomainForPropertyDragger = shadowClone.parentNode().domain();
	          frozenRangeForPropertyDragger = shadowClone.parentNode().range();
	          shadowClone.setInitialPosition();
	          shadowClone.hideClone(false);
	          shadowClone.hideParentProperty(true);
	          shadowClone.updateElement();
	          deleteGroupElement.classed("hidden", true);
	          addDataPropertyGroupElement.classed("hidden", true);
	          frozenDomainForPropertyDragger.frozen(true);
	          frozenDomainForPropertyDragger.locked(true);
	          frozenRangeForPropertyDragger.frozen(true);
	          frozenRangeForPropertyDragger.locked(true);
	          domainDragger.updateElement();
	          domainDragger.mouseButtonPressed = true;
	          rangeDragger.updateElement();
	          rangeDragger.mouseButtonPressed = true;
	          //  shadowClone.setPosition(d.x, d.y);
	          
	          
	        } else if ( d.type && d.type() === "Domain_dragger" ) {
	          graph.ignoreOtherHoverEvents(true);
	          clearTimeout(delayedHider);
	          frozenDomainForPropertyDragger = shadowClone.parentNode().domain();
	          frozenRangeForPropertyDragger = shadowClone.parentNode().range();
	          shadowClone.setInitialPosition();
	          shadowClone.hideClone(false);
	          shadowClone.hideParentProperty(true);
	          shadowClone.updateElement();
	          deleteGroupElement.classed("hidden", true);
	          addDataPropertyGroupElement.classed("hidden", true);
	          
	          frozenDomainForPropertyDragger.frozen(true);
	          frozenDomainForPropertyDragger.locked(true);
	          frozenRangeForPropertyDragger.frozen(true);
	          frozenRangeForPropertyDragger.locked(true);
	          domainDragger.updateElement();
	          domainDragger.mouseButtonPressed = true;
	          rangeDragger.updateElement();
	          rangeDragger.mouseButtonPressed = true;
	        }
	        else {
	          d.locked(true);
	          moved = false;
	        }
	      })
	      .on("drag", function ( d ){
	        
	        if ( d.type && d.type() === "Class_dragger" ) {
	          clearTimeout(delayedHider);
	          classDragger.setPosition(d3.event.x, d3.event.y);
	        } else if ( d.type && d.type() === "Range_dragger" ) {
	          clearTimeout(delayedHider);
	          rangeDragger.setPosition(d3.event.x, d3.event.y);
	          shadowClone.setPosition(d3.event.x, d3.event.y);
	          domainDragger.updateElementViaRangeDragger(d3.event.x, d3.event.y);
	        }
	        else if ( d.type && d.type() === "Domain_dragger" ) {
	          clearTimeout(delayedHider);
	          domainDragger.setPosition(d3.event.x, d3.event.y);
	          shadowClone.setPositionDomain(d3.event.x, d3.event.y);
	          rangeDragger.updateElementViaDomainDragger(d3.event.x, d3.event.y);
	        }
	        
	        else {
	          d.px = d3.event.x;
	          d.py = d3.event.y;
	          force.resume();
	          updateHaloRadius();
	          moved = true;
	          if ( d.renderType && d.renderType() === "round" ) {
	            classDragger.setParentNode(d);
	          }
	          
	        }
	      })
	      .on("dragend", function ( d ){
	        graph.ignoreOtherHoverEvents(false);
	        if ( d.type && d.type() === "Class_dragger" ) {
	          var nX = classDragger.x;
	          var nY = classDragger.y;
	          clearTimeout(delayedHider);
	          classDragger.mouseButtonPressed = false;
	          classDragger.selectedViaTouch(false);
	          d.setParentNode(d.parentNode());
	          
	          var draggerEndPos = [nX, nY];
	          var targetNode = graph.getTargetNode(draggerEndPos);
	          if ( targetNode ) {
	            createNewObjectProperty(d.parentNode(), targetNode, draggerEndPos);
	          }
	          if ( touchDevice === false ) {
	            editElementHoverOut();
	          }
	          draggingStarted = false;
	        } else if ( d.type && d.type() === "Range_dragger" ) {
	          graph.ignoreOtherHoverEvents(false);
	          frozenDomainForPropertyDragger.frozen(false);
	          frozenDomainForPropertyDragger.locked(false);
	          frozenRangeForPropertyDragger.frozen(false);
	          frozenRangeForPropertyDragger.locked(false);
	          rangeDragger.mouseButtonPressed = false;
	          domainDragger.mouseButtonPressed = false;
	          domainDragger.updateElement();
	          rangeDragger.updateElement();
	          shadowClone.hideClone(true);
	          var rX = rangeDragger.x;
	          var rY = rangeDragger.y;
	          var rangeDraggerEndPos = [rX, rY];
	          var targetRangeNode = graph.getTargetNode(rangeDraggerEndPos);
	          if ( elementTools.isDatatype(targetRangeNode) === true ) {
	            targetRangeNode = null;
	            console.log("---------------TARGET NODE IS A DATATYPE/ LITERAL ------------");
	          }
	          
	          if ( targetRangeNode === null ) {
	            d.reDrawEverthing();
	            shadowClone.hideParentProperty(false);
	          }
	          else {
	            d.updateRange(targetRangeNode);
	            graph.update();
	            shadowClone.hideParentProperty(false);
	          }
	        } else if ( d.type && d.type() === "Domain_dragger" ) {
	          graph.ignoreOtherHoverEvents(false);
	          frozenDomainForPropertyDragger.frozen(false);
	          frozenDomainForPropertyDragger.locked(false);
	          frozenRangeForPropertyDragger.frozen(false);
	          frozenRangeForPropertyDragger.locked(false);
	          rangeDragger.mouseButtonPressed = false;
	          domainDragger.mouseButtonPressed = false;
	          domainDragger.updateElement();
	          rangeDragger.updateElement();
	          shadowClone.hideClone(true);
	          
	          var dX = domainDragger.x;
	          var dY = domainDragger.y;
	          var domainDraggerEndPos = [dX, dY];
	          var targetDomainNode = graph.getTargetNode(domainDraggerEndPos);
	          if ( elementTools.isDatatype(targetDomainNode) === true ) {
	            targetDomainNode = null;
	            console.log("---------------TARGET NODE IS A DATATYPE/ LITERAL ------------");
	          }
	          shadowClone.hideClone(true);
	          if ( targetDomainNode === null ) {
	            d.reDrawEverthing();
	            shadowClone.hideParentProperty(false);
	          }
	          else {
	            d.updateDomain(targetDomainNode);
	            graph.update();
	            shadowClone.hideParentProperty(false);
	          }
	        }
	        
	        else {
	          d.locked(false);
	          var pnp = graph.options().pickAndPinModule();
	          if ( pnp.enabled() === true && moved === true ) {
	            if ( d.id ) { // node
	              pnp.handle(d, true);
	            }
	            if ( d.property ) {
	              pnp.handle(d.property(), true);
	            }
	          }
	        }
	      });
	    
	    // Apply the zooming factor.
	    zoom = d3.behavior.zoom()
	      .duration(150)
	      .scaleExtent([options.minMagnification(), options.maxMagnification()])
	      .on("zoom", zoomed);
	    
	    draggerObjectsArray.push(classDragger);
	    draggerObjectsArray.push(rangeDragger);
	    draggerObjectsArray.push(domainDragger);
	    draggerObjectsArray.push(shadowClone);
	    force.stop();
	  }
	  
	  graph.lazyRefresh = function (){
	    redrawContent();
	    recalculatePositions();
	  };
	  
	  graph.adjustingGraphSize = function ( val ){
	    adjustingGraphSize = val;
	  };
	  
	  graph.showReloadButtonAfterLayoutOptimization = function ( show ){
	    showReloadButtonAfterLayoutOptimization = show;
	  };
	  
	  
	  function hiddenRecalculatePositions(){
	    finishedLoadingSequence = false;
	    if ( graph.options().loadingModule().successfullyLoadedOntology() === false ) {
	      force.stop();
	      d3.select("#progressBarValue").node().innerHTML = "";
	      graph.updateProgressBarMode();
	      graph.options().loadingModule().showErrorDetailsMessage(hiddenRecalculatePositions);
	      if ( keepDetailsCollapsedOnLoading && adjustingGraphSize === false ) {
	        graph.options().loadingModule().collapseDetails("hiddenRecalculatePositions");
	      }
	      return;
	    }
	    if ( updateRenderingDuringSimulation === false ) {
	      var value = 1.0 - 10 * force.alpha();
	      var percent = parseInt(200 * value) + "%";
	      graph.options().loadingModule().setPercentValue(percent);
	      d3.select("#progressBarValue").style("width", percent);
	      d3.select("#progressBarValue").node().innerHTML = percent;
	      
	      if ( value > 0.49 ) {
	        updateRenderingDuringSimulation = true;
	        // show graph container;
	        if ( graphContainer ) {
	          graphContainer.style("opacity", "1");
	          percent = "100%";
	          d3.select("#progressBarValue").style("width", percent);
	          d3.select("#progressBarValue").node().innerHTML = percent;
	          graph.options().ontologyMenu().append_message_toLastBulletPoint("done");
	          d3.select("#reloadCachedOntology").classed("hidden", !showReloadButtonAfterLayoutOptimization);
	          if ( showFilterWarning === true && seenFilterWarning === false ) {
	            graph.options().warningModule().showFilterHint();
	            seenFilterWarning = true;
	          }
	        }
	        
	        if ( initialLoad ) {
	          if ( graph.paused() === false )
	            force.resume(); // resume force
	          initialLoad = false;
	          
	        }
	        
	        
	        finishedLoadingSequence = true;
	        if ( showFPS === true ) {
	          force.on("tick", recalculatePositionsWithFPS);
	          recalculatePositionsWithFPS();
	        }
	        else {
	          force.on("tick", recalculatePositions);
	          recalculatePositions();
	        }
	        
	        if ( centerGraphViewOnLoad === true && force.nodes().length > 0 ) {
	          if ( force.nodes().length < 10 ) graph.forceRelocationEvent(true); // uses dynamic zoomer;
	          else graph.forceRelocationEvent();
	          centerGraphViewOnLoad = false;
	          // console.log("--------------------------------------")
	        }
	        
	        
	        graph.showEditorHintIfNeeded();
	        
	        if ( graph.options().loadingModule().missingImportsWarning() === false ) {
	          graph.options().loadingModule().hideLoadingIndicator();
	          graph.options().ontologyMenu().append_bulletPoint("Successfully loaded ontology");
	          graph.options().loadingModule().setSuccessful();
	        } else {
	          graph.options().loadingModule().showWarningDetailsMessage();
	          graph.options().ontologyMenu().append_bulletPoint("Loaded ontology with warnings");
	        }
	      }
	    }
	  }
	  
	  graph.showEditorHintIfNeeded = function (){
	    if ( seenEditorHint === false && editMode === true ) {
	      seenEditorHint = true;
	      graph.options().warningModule().showEditorHint();
	    }
	  };
	  
	  graph.setForceTickFunctionWithFPS = function (){
	    showFPS = true;
	    if ( force && finishedLoadingSequence === true ) {
	      force.on("tick", recalculatePositionsWithFPS);
	    }
	    
	  };
	  graph.setDefaultForceTickFunction = function (){
	    showFPS = false;
	    if ( force && finishedLoadingSequence === true ) {
	      force.on("tick", recalculatePositions);
	    }
	  };
	  function recalculatePositionsWithFPS(){
	    // compute the fps
	    
	    recalculatePositions();
	    now = Date.now();
	    var diff = now - then;
	    var fps = (1000 / (diff)).toFixed(2);
	    
	    debugContainer.node().innerHTML = "FPS: " + fps + "<br>" + "Nodes: " + force.nodes().length + "<br>" + "Links: " + force.links().length;
	    then = Date.now();
	    
	  }
	  
	  function recalculatePositions(){
	    // Set node positions
	    
	    
	    // add switch for edit mode to make this faster;
	    if ( !editMode ) {
	      nodeElements.attr("transform", function ( node ){
	        return "translate(" + node.x + "," + node.y + ")";
	      });
	      
	      // Set label group positions
	      labelGroupElements.attr("transform", function ( label ){
	        var position;
	        
	        // force centered positions on single-layered links
	        var link = label.link();
	        if ( link.layers().length === 1 && !link.loops() ) {
	          var linkDomainIntersection = math.calculateIntersection(link.range(), link.domain(), 0);
	          var linkRangeIntersection = math.calculateIntersection(link.domain(), link.range(), 0);
	          position = math.calculateCenter(linkDomainIntersection, linkRangeIntersection);
	          label.x = position.x;
	          label.y = position.y;
	        }
	        return "translate(" + label.x + "," + label.y + ")";
	      });
	      // Set link paths and calculate additional information
	      linkPathElements.attr("d", function ( l ){
	        if ( l.isLoop() ) {
	          return math.calculateLoopPath(l);
	        }
	        var curvePoint = l.label();
	        var pathStart = math.calculateIntersection(curvePoint, l.domain(), 1);
	        var pathEnd = math.calculateIntersection(curvePoint, l.range(), 1);
	        
	        return curveFunction([pathStart, curvePoint, pathEnd]);
	      });
	      
	      // Set cardinality positions
	      cardinalityElements.attr("transform", function ( property ){
	        
	        var label = property.link().label(),
	          pos = math.calculateIntersection(label, property.range(), CARDINALITY_HDISTANCE),
	          normalV = math.calculateNormalVector(label, property.range(), CARDINALITY_VDISTANCE);
	        
	        return "translate(" + (pos.x + normalV.x) + "," + (pos.y + normalV.y) + ")";
	      });
	      
	      
	      updateHaloRadius();
	      return;
	    }
	    
	    // TODO: this is Editor redraw function // we need to make this faster!!
	    
	    
	    nodeElements.attr("transform", function ( node ){
	      return "translate(" + node.x + "," + node.y + ")";
	    });
	    
	    // Set label group positions
	    labelGroupElements.attr("transform", function ( label ){
	      var position;
	      
	      // force centered positions on single-layered links
	      var link = label.link();
	      if ( link.layers().length === 1 && !link.loops() ) {
	        var linkDomainIntersection = math.calculateIntersection(link.range(), link.domain(), 0);
	        var linkRangeIntersection = math.calculateIntersection(link.domain(), link.range(), 0);
	        position = math.calculateCenter(linkDomainIntersection, linkRangeIntersection);
	        label.x = position.x;
	        label.y = position.y;
	        label.linkRangeIntersection = linkRangeIntersection;
	        label.linkDomainIntersection = linkDomainIntersection;
	        if ( link.property().focused() === true || hoveredPropertyElement !== undefined ) {
	          rangeDragger.updateElement();
	          domainDragger.updateElement();
	          // shadowClone.setPosition(link.property().range().x,link.property().range().y);
	          // shadowClone.setPositionDomain(link.property().domain().x,link.property().domain().y);
	        }
	      } else {
	        label.linkDomainIntersection = math.calculateIntersection(link.label(), link.domain(), 0);
	        label.linkRangeIntersection = math.calculateIntersection(link.label(), link.range(), 0);
	        if ( link.property().focused() === true || hoveredPropertyElement !== undefined ) {
	          rangeDragger.updateElement();
	          domainDragger.updateElement();
	          // shadowClone.setPosition(link.property().range().x,link.property().range().y);
	          // shadowClone.setPositionDomain(link.property().domain().x,link.property().domain().y);
	        }
	        
	      }
	      return "translate(" + label.x + "," + label.y + ")";
	    });
	    // Set link paths and calculate additional information
	    linkPathElements.attr("d", function ( l ){
	      if ( l.isLoop() ) {
	        
	        var ptrAr = math.getLoopPoints(l);
	        l.label().linkRangeIntersection = ptrAr[1];
	        l.label().linkDomainIntersection = ptrAr[0];
	        
	        if ( l.property().focused() === true || hoveredPropertyElement !== undefined ) {
	          rangeDragger.updateElement();
	          domainDragger.updateElement();
	        }
	        return math.calculateLoopPath(l);
	      }
	      var curvePoint = l.label();
	      var pathStart = math.calculateIntersection(curvePoint, l.domain(), 1);
	      var pathEnd = math.calculateIntersection(curvePoint, l.range(), 1);
	      l.linkRangeIntersection = pathStart;
	      l.linkDomainIntersection = pathEnd;
	      if ( l.property().focused() === true || hoveredPropertyElement !== undefined ) {
	        domainDragger.updateElement();
	        rangeDragger.updateElement();
	        // shadowClone.setPosition(l.property().range().x,l.property().range().y);
	        // shadowClone.setPositionDomain(l.property().domain().x,l.property().domain().y);
	      }
	      return curveFunction([pathStart, curvePoint, pathEnd]);
	    });
	    
	    // Set cardinality positions
	    cardinalityElements.attr("transform", function ( property ){
	      
	      var label = property.link().label(),
	        pos = math.calculateIntersection(label, property.range(), CARDINALITY_HDISTANCE),
	        normalV = math.calculateNormalVector(label, property.range(), CARDINALITY_VDISTANCE);
	      
	      return "translate(" + (pos.x + normalV.x) + "," + (pos.y + normalV.y) + ")";
	    });
	    
	    if ( hoveredNodeElement ) {
	      setDeleteHoverElementPosition(hoveredNodeElement);
	      setAddDataPropertyHoverElementPosition(hoveredNodeElement);
	      if ( draggingStarted === false ) {
	        classDragger.setParentNode(hoveredNodeElement);
	      }
	    }
	    if ( hoveredPropertyElement ) {
	      setDeleteHoverElementPositionProperty(hoveredPropertyElement);
	    }
	    
	    updateHaloRadius();
	  }
	  
	  graph.updatePropertyDraggerElements = function ( property ){
	    if ( property.type() !== "owl:DatatypeProperty" ) {
	      
	      shadowClone.setParentProperty(property);
	      rangeDragger.setParentProperty(property);
	      rangeDragger.hideDragger(false);
	      rangeDragger.addMouseEvents();
	      domainDragger.setParentProperty(property);
	      domainDragger.hideDragger(false);
	      domainDragger.addMouseEvents();
	      
	    }
	    else {
	      rangeDragger.hideDragger(true);
	      domainDragger.hideDragger(true);
	      shadowClone.hideClone(true);
	    }
	  };
	  
	  function addClickEvents(){
	    function executeModules( selectedElement ){
	      options.selectionModules().forEach(function ( module ){
	        module.handle(selectedElement);
	      });
	    }
	    
	    nodeElements.on("click", function ( clickedNode ){
	      
	      // manaual double clicker // helper for iphone 6 etc...
	      if ( touchDevice === true && doubletap() === true ) {
	        d3.event.stopPropagation();
	        if ( editMode === true ) {
	          clickedNode.raiseDoubleClickEdit(defaultIriValue(clickedNode));
	        }
	      }
	      else {
	        executeModules(clickedNode);
	      }
	    });
	    
	    nodeElements.on("dblclick", function ( clickedNode ){
	      
	      d3.event.stopPropagation();
	      if ( editMode === true ) {
	        clickedNode.raiseDoubleClickEdit(defaultIriValue(clickedNode));
	      }
	    });
	    
	    labelGroupElements.selectAll(".label").on("click", function ( clickedProperty ){
	      executeModules(clickedProperty);
	      
	      // this is for enviroments that do not define dblClick function;
	      if ( touchDevice === true && doubletap() === true ) {
	        d3.event.stopPropagation();
	        if ( editMode === true ) {
	          clickedProperty.raiseDoubleClickEdit(defaultIriValue(clickedProperty));
	        }
	      }
	      
	      // currently removed the selection of an element to invoke the dragger
	      // if (editMode===true && clickedProperty.editingTextElement!==true) {
	      //     return;
	      //      // We say that Datatype properties are not allowed to have domain range draggers
	      //      if (clickedProperty.focused() && clickedProperty.type() !== "owl:DatatypeProperty") {
	      //          shadowClone.setParentProperty(clickedProperty);
	      //          rangeDragger.setParentProperty(clickedProperty);
	      //          rangeDragger.hideDragger(false);
	      //          rangeDragger.addMouseEvents();
	      //          domainDragger.setParentProperty(clickedProperty);
	      //          domainDragger.hideDragger(false);
	      //          domainDragger.addMouseEvents();
	      //
	      //          if (clickedProperty.domain()===clickedProperty.range()){
	      //              clickedProperty.labelObject().increasedLoopAngle=true;
	      //              recalculatePositions();
	      //
	      //          }
	      //
	      //      } else if (clickedProperty.focused() && clickedProperty.type() === "owl:DatatypeProperty") {
	      //          shadowClone.setParentProperty(clickedProperty);
	      //          rangeDragger.setParentProperty(clickedProperty);
	      //          rangeDragger.hideDragger(true);
	      //          rangeDragger.addMouseEvents();
	      //          domainDragger.setParentProperty(clickedProperty);
	      //          domainDragger.hideDragger(false);
	      //          domainDragger.addMouseEvents();
	      //
	      //      }
	      //      else {
	      //          rangeDragger.hideDragger(true);
	      //          domainDragger.hideDragger(true);
	      //          if (clickedProperty.domain()===clickedProperty.range()){
	      //              clickedProperty.labelObject().increasedLoopAngle=false;
	      //              recalculatePositions();
	      //
	      //          }
	      //      }
	      //  }
	    });
	    labelGroupElements.selectAll(".label").on("dblclick", function ( clickedProperty ){
	      d3.event.stopPropagation();
	      if ( editMode === true ) {
	        clickedProperty.raiseDoubleClickEdit(defaultIriValue(clickedProperty));
	      }
	      
	    });
	  }
	  
	  function defaultIriValue( element ){
	    // get the iri of that element;
	    if ( graph.options().getGeneralMetaObject().iri ) {
	      var str2Compare = graph.options().getGeneralMetaObject().iri + element.id();
	      return element.iri() === str2Compare;
	    }
	    return false;
	  }
	  
	  /** Adjusts the containers current scale and position. */
	  function zoomed(){
	    if ( forceNotZooming === true ) {
	      zoom.translate(graphTranslation);
	      zoom.scale(zoomFactor);
	      return;
	    }
	    
	    
	    var zoomEventByMWheel = false;
	    if ( d3.event.sourceEvent ) {
	      if ( d3.event.sourceEvent.deltaY ) zoomEventByMWheel = true;
	    }
	    if ( zoomEventByMWheel === false ) {
	      if ( transformAnimation === true ) {
	        return;
	      }
	      zoomFactor = d3.event.scale;
	      graphTranslation = d3.event.translate;
	      graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	      updateHaloRadius();
	      graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	      return;
	    }
	    /** animate the transition **/
	    zoomFactor = d3.event.scale;
	    graphTranslation = d3.event.translate;
	    graphContainer.transition()
	      .tween("attr.translate", function (){
	        return function ( t ){
	          transformAnimation = true;
	          var tr = d3.transform(graphContainer.attr("transform"));
	          graphTranslation[0] = tr.translate[0];
	          graphTranslation[1] = tr.translate[1];
	          zoomFactor = tr.scale[0];
	          updateHaloRadius();
	          graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	        };
	      })
	      .each("end", function (){
	        transformAnimation = false;
	      })
	      .attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")")
	      .ease('linear')
	      .duration(250);
	  }// end of zoomed function
	  
	  function redrawGraph(){
	    remove();
	    
	    graphContainer = d3.selectAll(options.graphContainerSelector())
	      .append("svg")
	      .classed("vowlGraph", true)
	      .attr("width", options.width())
	      .attr("height", options.height())
	      .call(zoom)
	      .append("g");
	    // add touch and double click functions
	    
	    var svgGraph = d3.selectAll(".vowlGraph");
	    originalD3_dblClickFunction = svgGraph.on("dblclick.zoom");
	    originalD3_touchZoomFunction = svgGraph.on("touchstart");
	    svgGraph.on("touchstart", touchzoomed);
	    if ( editMode === true ) {
	      svgGraph.on("dblclick.zoom", graph.modified_dblClickFunction);
	    }
	    else {
	      svgGraph.on("dblclick.zoom", originalD3_dblClickFunction);
	    }
	    
	  }
	  
	  function generateEditElements(){
	    addDataPropertyGroupElement = editContainer.append('g')
	      .classed("hidden-in-export", true)
	      .classed("hidden", true)
	      .classed("addDataPropertyElement", true)
	      .attr("transform", "translate(" + 0 + "," + 0 + ")");
	    
	    
	    addDataPropertyGroupElement.append("circle")
	    // .classed("deleteElement", true)
	      .attr("r", 12)
	      .attr("cx", 0)
	      .attr("cy", 0)
	      .append("title").text("Add Datatype Property");
	    
	    addDataPropertyGroupElement.append("line")
	    // .classed("deleteElementIcon ",true)
	      .attr("x1", -8)
	      .attr("y1", 0)
	      .attr("x2", 8)
	      .attr("y2", 0)
	      .append("title").text("Add Datatype Property");
	    
	    addDataPropertyGroupElement.append("line")
	    // .classed("deleteElementIcon",true)
	      .attr("x1", 0)
	      .attr("y1", -8)
	      .attr("x2", 0)
	      .attr("y2", 8)
	      .append("title").text("Add Datatype Property");
	    
	    if ( graph.options().useAccuracyHelper() ) {
	      addDataPropertyGroupElement.append("circle")
	        .attr("r", 15)
	        .attr("cx", -7)
	        .attr("cy", 7)
	        .classed("superHiddenElement", true)
	        .classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	    deleteGroupElement = editContainer.append('g')
	      .classed("hidden-in-export", true)
	      .classed("hidden", true)
	      .classed("deleteParentElement", true)
	      .attr("transform", "translate(" + 0 + "," + 0 + ")");
	    
	    deleteGroupElement.append("circle")
	      .attr("r", 12)
	      .attr("cx", 0)
	      .attr("cy", 0)
	      .append("title").text("Delete This Node");
	    
	    var crossLen = 5;
	    deleteGroupElement.append("line")
	      .attr("x1", -crossLen)
	      .attr("y1", -crossLen)
	      .attr("x2", crossLen)
	      .attr("y2", crossLen)
	      .append("title").text("Delete This Node");
	    
	    deleteGroupElement.append("line")
	      .attr("x1", crossLen)
	      .attr("y1", -crossLen)
	      .attr("x2", -crossLen)
	      .attr("y2", crossLen)
	      .append("title").text("Delete This Node");
	    
	    if ( graph.options().useAccuracyHelper() ) {
	      deleteGroupElement.append("circle")
	        .attr("r", 15)
	        .attr("cx", 7)
	        .attr("cy", -7)
	        .classed("superHiddenElement", true)
	        .classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	  }
	  
	  graph.getUnfilteredData = function (){
	    return unfilteredData;
	  };
	  
	  graph.getClassDataForTtlExport = function (){
	    var allNodes = unfilteredData.nodes;
	    var nodeData = [];
	    for ( var i = 0; i < allNodes.length; i++ ) {
	      if ( allNodes[i].type() !== "rdfs:Literal" &&
	        allNodes[i].type() !== "rdfs:Datatype" &&
	        allNodes[i].type() !== "owl:Thing" ) {
	        nodeData.push(allNodes[i]);
	      }
	    }
	    return nodeData;
	  };
	  
	  graph.getPropertyDataForTtlExport = function (){
	    var propertyData = [];
	    var allProperties = unfilteredData.properties;
	    for ( var i = 0; i < allProperties.length; i++ ) {
	      // currently using only the object properties
	      if ( allProperties[i].type() === "owl:ObjectProperty" ||
	        allProperties[i].type() === "owl:DatatypeProperty" ||
	        allProperties[i].type() === "owl:ObjectProperty"
	      
	      ) {
	        propertyData.push(allProperties[i]);
	      } else {
	        if ( allProperties[i].type() === "rdfs:subClassOf" ) {
	          allProperties[i].baseIri("http://www.w3.org/2000/01/rdf-schema#");
	          allProperties[i].iri("http://www.w3.org/2000/01/rdf-schema#subClassOf");
	        }
	        if ( allProperties[i].type() === "owl:disjointWith" ) {
	          allProperties[i].baseIri("http://www.w3.org/2002/07/owl#");
	          allProperties[i].iri("http://www.w3.org/2002/07/owl#disjointWith");
	        }
	      }
	    }
	    return propertyData;
	  };
	  
	  graph.getAxiomsForTtlExport = function (){
	    var axioms = [];
	    var allProperties = unfilteredData.properties;
	    for ( var i = 0; i < allProperties.length; i++ ) {
	      // currently using only the object properties
	      if ( allProperties[i].type() === "owl:ObjectProperty" ||
	        allProperties[i].type() === "owl:DatatypeProperty" ||
	        allProperties[i].type() === "owl:ObjectProperty" ||
	        allProperties[i].type() === "rdfs:subClassOf"
	      ) {
	      } else {
	      }
	    }
	    return axioms;
	  };
	  
	  
	  graph.getUnfilteredData = function (){
	    return unfilteredData;
	  };
	  
	  graph.getClassDataForTtlExport = function (){
	    var allNodes = unfilteredData.nodes;
	    var nodeData = [];
	    for ( var i = 0; i < allNodes.length; i++ ) {
	      if ( allNodes[i].type() !== "rdfs:Literal" &&
	        allNodes[i].type() !== "rdfs:Datatype" &&
	        allNodes[i].type() !== "owl:Thing" ) {
	        nodeData.push(allNodes[i]);
	      }
	    }
	    return nodeData;
	  };
	  
	  
	  function redrawContent(){
	    var markerContainer;
	    
	    if ( !graphContainer ) {
	      return;
	    }
	    
	    // Empty the graph container
	    graphContainer.selectAll("*").remove();
	    
	    // Last container -> elements of this container overlap others
	    linkContainer = graphContainer.append("g").classed("linkContainer", true);
	    cardinalityContainer = graphContainer.append("g").classed("cardinalityContainer", true);
	    labelContainer = graphContainer.append("g").classed("labelContainer", true);
	    nodeContainer = graphContainer.append("g").classed("nodeContainer", true);
	    
	    // adding editing Elements
	    var draggerPathLayer = graphContainer.append("g").classed("linkContainer", true);
	    draggerLayer = graphContainer.append("g").classed("editContainer", true);
	    editContainer = graphContainer.append("g").classed("editContainer", true);
	    
	    draggerPathLayer.classed("hidden-in-export", true);
	    editContainer.classed("hidden-in-export", true);
	    draggerLayer.classed("hidden-in-export", true);
	    
	    // Add an extra container for all markers
	    markerContainer = linkContainer.append("defs");
	    var drElement = draggerLayer.selectAll(".node")
	      .data(draggerObjectsArray).enter()
	      .append("g")
	      .classed("node", true)
	      .classed("hidden-in-export", true)
	      .attr("id", function ( d ){
	        return d.id();
	      })
	      .call(dragBehaviour);
	    drElement.each(function ( node ){
	      node.svgRoot(d3.select(this));
	      node.svgPathLayer(draggerPathLayer);
	      if ( node.type() === "shadowClone" ) {
	        node.drawClone();
	        node.hideClone(true);
	      } else {
	        node.drawNode();
	        node.hideDragger(true);
	      }
	    });
	    generateEditElements();
	    
	    
	    // Add an extra container for all markers
	    markerContainer = linkContainer.append("defs");
	    
	    // Draw nodes
	    
	    if ( classNodes === undefined ) classNodes = [];
	    
	    nodeElements = nodeContainer.selectAll(".node")
	      .data(classNodes).enter()
	      .append("g")
	      .classed("node", true)
	      .attr("id", function ( d ){
	        return d.id();
	      })
	      .call(dragBehaviour);
	    nodeElements.each(function ( node ){
	      node.draw(d3.select(this));
	    });
	    
	    
	    if ( labelNodes === undefined ) labelNodes = [];
	    
	    // Draw label groups (property + inverse)
	    labelGroupElements = labelContainer.selectAll(".labelGroup")
	      .data(labelNodes).enter()
	      .append("g")
	      .classed("labelGroup", true)
	      .call(dragBehaviour);
	    
	    labelGroupElements.each(function ( label ){
	      var success = label.draw(d3.select(this));
	      label.property().labelObject(label);
	      // Remove empty groups without a label.
	      if ( !success ) {
	        d3.select(this).remove();
	      }
	    });
	    // Place subclass label groups on the bottom of all labels
	    labelGroupElements.each(function ( label ){
	      // the label might be hidden e.g. in compact notation
	      if ( !this.parentNode ) {
	        return;
	      }
	      
	      if ( elementTools.isRdfsSubClassOf(label.property()) ) {
	        var parentNode = this.parentNode;
	        parentNode.insertBefore(this, parentNode.firstChild);
	      }
	    });
	    if ( properties === undefined ) properties = [];
	    // Draw cardinality elements
	    cardinalityElements = cardinalityContainer.selectAll(".cardinality")
	      .data(properties).enter()
	      .append("g")
	      .classed("cardinality", true);
	    
	    cardinalityElements.each(function ( property ){
	      var success = property.drawCardinality(d3.select(this));
	      
	      // Remove empty groups without a label.
	      if ( !success ) {
	        d3.select(this).remove();
	      }
	    });
	    // Draw links
	    if ( links === undefined ) links = [];
	    linkGroups = linkContainer.selectAll(".link")
	      .data(links).enter()
	      .append("g")
	      .classed("link", true);
	    
	    linkGroups.each(function ( link ){
	      link.draw(d3.select(this), markerContainer);
	    });
	    linkPathElements = linkGroups.selectAll("path");
	    // Select the path for direct access to receive a better performance
	    addClickEvents();
	  }
	  
	  function remove(){
	    if ( graphContainer ) {
	      // Select the parent element because the graph container is a group (e.g. for zooming)
	      d3.select(graphContainer.node().parentNode).remove();
	    }
	  }
	  
	  initializeGraph(); // << call the initialization function
	  
	  graph.updateCanvasContainerSize = function (){
	    if ( graphContainer ) {
	      var svgElement = d3.selectAll(".vowlGraph");
	      svgElement.attr("width", options.width());
	      svgElement.attr("height", options.height());
	      graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	    }
	  };
	  
	  // Loads all settings, removes the old graph (if it exists) and draws a new one.
	  graph.start = function (){
	    force.stop();
	    loadGraphData(true);
	    redrawGraph();
	    graph.update(true);
	    
	    if ( graph.options().loadingModule().successfullyLoadedOntology() === false ) {
	      graph.options().loadingModule().setErrorMode();
	    }
	    
	  };
	  
	  // Updates only the style of the graph.
	  graph.updateStyle = function (){
	    refreshGraphStyle();
	    if ( graph.options().loadingModule().successfullyLoadedOntology() === false ) {
	      force.stop();
	    } else {
	      force.start();
	    }
	  };
	  
	  graph.reload = function (){
	    loadGraphData();
	    graph.update();
	    
	  };
	  
	  graph.load = function (){
	    force.stop();
	    loadGraphData();
	    refreshGraphData();
	    for ( var i = 0; i < labelNodes.length; i++ ) {
	      var label = labelNodes[i];
	      if ( label.property().x && label.property().y ) {
	        label.x = label.property().x;
	        label.y = label.property().y;
	        // also set the prev position of the label
	        label.px = label.x;
	        label.py = label.y;
	      }
	    }
	    graph.update();
	  };
	  
	  graph.fastUpdate = function (){
	    // fast update function for editor calls;
	    // -- experimental ;
	    quick_refreshGraphData();
	    updateNodeMap();
	    force.start();
	    redrawContent();
	    graph.updatePulseIds(nodeArrayForPulse);
	    refreshGraphStyle();
	    updateHaloStyles();
	    
	  };
	  
	  graph.getNodeMapForSearch = function (){
	    return nodeMap;
	  };
	  function updateNodeMap(){
	    nodeMap = [];
	    var node;
	    for ( var j = 0; j < force.nodes().length; j++ ) {
	      node = force.nodes()[j];
	      if ( node.id ) {
	        nodeMap[node.id()] = j;
	        // check for equivalents
	        var eqs = node.equivalents();
	        if ( eqs.length > 0 ) {
	          for ( var e = 0; e < eqs.length; e++ ) {
	            var eqObject = eqs[e];
	            nodeMap[eqObject.id()] = j;
	          }
	        }
	      }
	      if ( node.property ) {
	        nodeMap[node.property().id()] = j;
	        var inverse = node.inverse();
	        if ( inverse ) {
	          nodeMap[inverse.id()] = j;
	        }
	      }
	    }
	  }
	  
	  function updateHaloStyles(){
	    var haloElement;
	    var halo;
	    var node;
	    for ( var j = 0; j < force.nodes().length; j++ ) {
	      node = force.nodes()[j];
	      if ( node.id ) {
	        haloElement = node.getHalos();
	        if ( haloElement ) {
	          halo = haloElement.selectAll(".searchResultA");
	          halo.classed("searchResultA", false);
	          halo.classed("searchResultB", true);
	        }
	      }
	      
	      if ( node.property ) {
	        haloElement = node.property().getHalos();
	        if ( haloElement ) {
	          halo = haloElement.selectAll(".searchResultA");
	          halo.classed("searchResultA", false);
	          halo.classed("searchResultB", true);
	        }
	      }
	    }
	  }
	  
	  // Updates the graphs displayed data and style.
	  graph.update = function ( init ){
	    var validOntology = graph.options().loadingModule().successfullyLoadedOntology();
	    if ( validOntology === false && (init && init === true) ) {
	      graph.options().loadingModule().collapseDetails();
	      return;
	    }
	    if ( validOntology === false ) {
	      return;
	    }
	    
	    keepDetailsCollapsedOnLoading = false;
	    refreshGraphData();
	    // update node map
	    updateNodeMap();
	    
	    force.start();
	    redrawContent();
	    graph.updatePulseIds(nodeArrayForPulse);
	    refreshGraphStyle();
	    updateHaloStyles();
	  };
	  
	  graph.paused = function ( p ){
	    if ( !arguments.length ) return paused;
	    paused = p;
	    graph.updateStyle();
	    return graph;
	  };
	  // resetting the graph
	  graph.reset = function (){
	    // window size
	    var w = 0.5 * graph.options().width();
	    var h = 0.5 * graph.options().height();
	    // computing initial translation for the graph due tue the dynamic default zoom level
	    var tx = w - defaultZoom * w;
	    var ty = h - defaultZoom * h;
	    zoom.translate([tx, ty])
	      .scale(defaultZoom);
	  };
	  
	  
	  graph.zoomOut = function (){
	    
	    var minMag = options.minMagnification(),
	      maxMag = options.maxMagnification();
	    var stepSize = (maxMag - minMag) / 10;
	    var val = zoomFactor - stepSize;
	    if ( val < minMag ) val = minMag;
	    
	    var cx = 0.5 * graph.options().width();
	    var cy = 0.5 * graph.options().height();
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    var sP = [cp.x, cp.y, graph.options().height() / zoomFactor];
	    var eP = [cp.x, cp.y, graph.options().height() / val];
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(250)
	      .attrTween("transform", function (){
	        return function ( t ){
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        updateHaloRadius();
	        options.zoomSlider().updateZoomSliderValue(zoomFactor);
	      });
	    
	  };
	  
	  graph.zoomIn = function (){
	    var minMag = options.minMagnification(),
	      maxMag = options.maxMagnification();
	    var stepSize = (maxMag - minMag) / 10;
	    var val = zoomFactor + stepSize;
	    if ( val > maxMag ) val = maxMag;
	    var cx = 0.5 * graph.options().width();
	    var cy = 0.5 * graph.options().height();
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    var sP = [cp.x, cp.y, graph.options().height() / zoomFactor];
	    var eP = [cp.x, cp.y, graph.options().height() / val];
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(250)
	      .attrTween("transform", function (){
	        return function ( t ){
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        updateHaloRadius();
	        options.zoomSlider().updateZoomSliderValue(zoomFactor);
	      });
	    
	    
	  };
	  
	  /** --------------------------------------------------------- **/
	  /** -- data related handling                               -- **/
	  /** --------------------------------------------------------- **/
	  
	  var cachedJsonOBJ = null;
	  graph.clearAllGraphData = function (){
	    if ( graph.graphNodeElements() && graph.graphNodeElements().length > 0 ) {
	      cachedJsonOBJ = graph.options().exportMenu().createJSON_exportObject();
	    } else {
	      cachedJsonOBJ = null;
	    }
	    force.stop();
	    if ( unfilteredData ) {
	      unfilteredData.nodes = [];
	      unfilteredData.properties = [];
	    }
	  };
	  graph.getCachedJsonObj = function (){
	    return cachedJsonOBJ;
	  };
	  
	  // removes data when data could not be loaded
	  graph.clearGraphData = function (){
	    force.stop();
	    var sidebar = graph.options().sidebar();
	    if ( sidebar )
	      sidebar.clearOntologyInformation();
	    if ( graphContainer )
	      redrawGraph();
	  };
	  
	  function generateDictionary( data ){
	    var i;
	    var originalDictionary = [];
	    var nodes = data.nodes;
	    for ( i = 0; i < nodes.length; i++ ) {
	      // check if node has a label
	      if ( nodes[i].labelForCurrentLanguage() !== undefined )
	        originalDictionary.push(nodes[i]);
	    }
	    var props = data.properties;
	    for ( i = 0; i < props.length; i++ ) {
	      if ( props[i].labelForCurrentLanguage() !== undefined )
	        originalDictionary.push(props[i]);
	    }
	    parser.setDictionary(originalDictionary);
	    
	    var literFilter = graph.options().literalFilter();
	    var idsToRemove = literFilter.removedNodes();
	    var originalDict = parser.getDictionary();
	    var newDict = [];
	    
	    // go through the dictionary and remove the ids;
	    for ( i = 0; i < originalDict.length; i++ ) {
	      var dictElement = originalDict[i];
	      var dictElementId;
	      if ( dictElement.property )
	        dictElementId = dictElement.property().id();
	      else
	        dictElementId = dictElement.id();
	      // compare against the removed ids;
	      var addToDictionary = true;
	      for ( var j = 0; j < idsToRemove.length; j++ ) {
	        var currentId = idsToRemove[j];
	        if ( currentId === dictElementId ) {
	          addToDictionary = false;
	        }
	      }
	      if ( addToDictionary === true ) {
	        newDict.push(dictElement);
	      }
	    }
	    // tell the parser that the dictionary is updated
	    parser.setDictionary(newDict);
	    
	  }
	  
	  graph.updateProgressBarMode = function (){
	    var loadingModule = graph.options().loadingModule();
	    
	    var state = loadingModule.getProgressBarMode();
	    switch ( state ) {
	      case  0:
	        loadingModule.setErrorMode();
	        break;
	      case  1:
	        loadingModule.setBusyMode();
	        break;
	      case  2:
	        loadingModule.setPercentMode();
	        break;
	      default:
	        loadingModule.setPercentMode();
	    }
	  };
	  
	  graph.setFilterWarning = function ( val ){
	    showFilterWarning = val;
	  };
	  function loadGraphData( init ){
	    // reset the locate button and previously selected locations and other variables
	    
	    var loadingModule = graph.options().loadingModule();
	    force.stop();
	    
	    force.nodes([]);
	    force.links([]);
	    nodeArrayForPulse = [];
	    pulseNodeIds = [];
	    locationId = 0;
	    d3.select("#locateSearchResult").classed("highlighted", false);
	    d3.select("#locateSearchResult").node().title = "Nothing to locate";
	    graph.clearGraphData();
	    
	    if ( init ) {
	      force.stop();
	      return;
	    }
	    
	    showFilterWarning = false;
	    parser.parse(options.data());
	    unfilteredData = {
	      nodes: parser.nodes(),
	      properties: parser.properties()
	    };
	    // fixing class and property id counter for the editor
	    eN = unfilteredData.nodes.length + 1;
	    eP = unfilteredData.properties.length + 1;
	    
	    initialLoad = true;
	    graph.options().warningModule().closeFilterHint();
	    
	    // loading handler
	    updateRenderingDuringSimulation = true;
	    var validOntology = graph.options().loadingModule().successfullyLoadedOntology();
	    if ( graphContainer && validOntology === true ) {
	      
	      updateRenderingDuringSimulation = false;
	      graph.options().ontologyMenu().append_bulletPoint("Generating visualization ... ");
	      loadingModule.setPercentMode();
	      
	      if ( unfilteredData.nodes.length > 0 ) {
	        graphContainer.style("opacity", "0");
	        force.on("tick", hiddenRecalculatePositions);
	      } else {
	        graphContainer.style("opacity", "1");
	        if ( showFPS === true ) {
	          force.on("tick", recalculatePositionsWithFPS);
	        }
	        else {
	          force.on("tick", recalculatePositions);
	        }
	      }
	      
	      force.start();
	    } else {
	      force.stop();
	      graph.options().ontologyMenu().append_bulletPoint("Failed to load ontology");
	      loadingModule.setErrorMode();
	    }
	    // update prefixList(
	    // update general MetaOBJECT
	    graph.options().clearMetaObject();
	    graph.options().clearGeneralMetaObject();
	    graph.options().editSidebar().clearMetaObjectValue();
	    if ( options.data() !== undefined ) {
	      var header = options.data().header;
	      if ( header ) {
	        if ( header.iri ) {
	          graph.options().addOrUpdateGeneralObjectEntry("iri", header.iri);
	        }
	        if ( header.title ) {
	          graph.options().addOrUpdateGeneralObjectEntry("title", header.title);
	        }
	        if ( header.author ) {
	          graph.options().addOrUpdateGeneralObjectEntry("author", header.author);
	        }
	        if ( header.version ) {
	          graph.options().addOrUpdateGeneralObjectEntry("version", header.version);
	        }
	        if ( header.description ) {
	          graph.options().addOrUpdateGeneralObjectEntry("description", header.description);
	        }
	        if ( header.prefixList ) {
	          var pL = header.prefixList;
	          for ( var pr in pL ) {
	            if ( pL.hasOwnProperty(pr) ) {
	              var val = pL[pr];
	              graph.options().addPrefix(pr, val);
	            }
	          }
	        }
	        // get other metadata;
	        if ( header.other ) {
	          var otherObjects = header.other;
	          for ( var name in otherObjects ) {
	            if ( otherObjects.hasOwnProperty(name) ) {
	              var otherObj = otherObjects[name];
	              if ( otherObj.hasOwnProperty("identifier") && otherObj.hasOwnProperty("value") ) {
	                graph.options().addOrUpdateMetaObjectEntry(otherObj.identfier, otherObj.value);
	              }
	            }
	          }
	        }
	      }
	    }
	    // update more meta OBJECT
	    // Initialize filters with data to replicate consecutive filtering
	    var initializationData = _.clone(unfilteredData);
	    options.filterModules().forEach(function ( module ){
	      initializationData = filterFunction(module, initializationData, true);
	    });
	    // generate dictionary here ;
	    generateDictionary(unfilteredData);
	    
	    parser.parseSettings();
	    graphUpdateRequired = parser.settingsImported();
	    centerGraphViewOnLoad = true;
	    if ( parser.settingsImportGraphZoomAndTranslation() === true ) {
	      centerGraphViewOnLoad = false;
	    }
	    graph.options().searchMenu().requestDictionaryUpdate();
	    graph.options().editSidebar().updateGeneralOntologyInfo();
	    graph.options().editSidebar().updatePrefixUi();
	    graph.options().editSidebar().updateElementWidth();
	  }
	  
	  graph.handleOnLoadingError = function (){
	    force.stop();
	    graph.clearGraphData();
	    graph.options().ontologyMenu().append_bulletPoint("Failed to load ontology");
	    d3.select("#progressBarValue").node().innherHTML = "";
	    d3.select("#progressBarValue").classed("busyProgressBar", false);
	    graph.options().loadingModule().setErrorMode();
	    graph.options().loadingModule().showErrorDetailsMessage();
	  };
	  
	  function quick_refreshGraphData(){
	    links = linkCreator.createLinks(properties);
	    labelNodes = links.map(function ( link ){
	      return link.label();
	    });
	    
	    storeLinksOnNodes(classNodes, links);
	    setForceLayoutData(classNodes, labelNodes, links);
	  }
	  
	  //Applies the data of the graph options object and parses it. The graph is not redrawn.
	  function refreshGraphData(){
	    var shouldExecuteEmptyFilter = options.literalFilter().enabled();
	    graph.executeEmptyLiteralFilter();
	    options.literalFilter().enabled(shouldExecuteEmptyFilter);
	    
	    var preprocessedData = _.clone(unfilteredData);
	    
	    // Filter the data
	    options.filterModules().forEach(function ( module ){
	      preprocessedData = filterFunction(module, preprocessedData);
	    });
	    options.focuserModule().handle(undefined, true);
	    classNodes = preprocessedData.nodes;
	    properties = preprocessedData.properties;
	    links = linkCreator.createLinks(properties);
	    labelNodes = links.map(function ( link ){
	      return link.label();
	    });
	    storeLinksOnNodes(classNodes, links);
	    setForceLayoutData(classNodes, labelNodes, links);
	    // for (var i = 0; i < classNodes.length; i++) {
	    //     if (classNodes[i].setRectangularRepresentation)
	    //         classNodes[i].setRectangularRepresentation(graph.options().rectangularRepresentation());
	    // }
	  }
	  
	  function filterFunction( module, data, initializing ){
	    links = linkCreator.createLinks(data.properties);
	    storeLinksOnNodes(data.nodes, links);
	    
	    if ( initializing ) {
	      if ( module.initialize ) {
	        module.initialize(data.nodes, data.properties);
	      }
	    }
	    module.filter(data.nodes, data.properties);
	    return {
	      nodes: module.filteredNodes(),
	      properties: module.filteredProperties()
	    };
	  }
	  
	  
	  /** --------------------------------------------------------- **/
	  /** -- force-layout related functions                      -- **/
	  /** --------------------------------------------------------- **/
	  function storeLinksOnNodes( nodes, links ){
	    for ( var i = 0, nodesLength = nodes.length; i < nodesLength; i++ ) {
	      var node = nodes[i],
	        connectedLinks = [];
	      
	      // look for properties where this node is the domain or range
	      for ( var j = 0, linksLength = links.length; j < linksLength; j++ ) {
	        var link = links[j];
	        
	        if ( link.domain() === node || link.range() === node ) {
	          connectedLinks.push(link);
	        }
	      }
	      node.links(connectedLinks);
	    }
	  }
	  
	  function setForceLayoutData( classNodes, labelNodes, links ){
	    var d3Links = [];
	    links.forEach(function ( link ){
	      d3Links = d3Links.concat(link.linkParts());
	    });
	    
	    var d3Nodes = [].concat(classNodes).concat(labelNodes);
	    setPositionOfOldLabelsOnNewLabels(force.nodes(), labelNodes);
	    
	    force.nodes(d3Nodes)
	      .links(d3Links);
	  }
	  
	  // The label nodes are positioned randomly, because they are created from scratch if the data changes and lose
	  // their position information. With this hack the position of old labels is copied to the new labels.
	  function setPositionOfOldLabelsOnNewLabels( oldLabelNodes, labelNodes ){
	    labelNodes.forEach(function ( labelNode ){
	      for ( var i = 0; i < oldLabelNodes.length; i++ ) {
	        var oldNode = oldLabelNodes[i];
	        if ( oldNode.equals(labelNode) ) {
	          labelNode.x = oldNode.x;
	          labelNode.y = oldNode.y;
	          labelNode.px = oldNode.px;
	          labelNode.py = oldNode.py;
	          break;
	        }
	      }
	    });
	  }
	  
	  // Applies all options that don't change the graph data.
	  function refreshGraphStyle(){
	    zoom = zoom.scaleExtent([options.minMagnification(), options.maxMagnification()]);
	    if ( graphContainer ) {
	      zoom.event(graphContainer);
	    }
	    
	    force.charge(function ( element ){
	      var charge = options.charge();
	      if ( elementTools.isLabel(element) ) {
	        charge *= 0.8;
	      }
	      return charge;
	    })
	      .size([options.width(), options.height()])
	      .linkDistance(calculateLinkPartDistance)
	      .gravity(options.gravity())
	      .linkStrength(options.linkStrength()); // Flexibility of links
	    
	    force.nodes().forEach(function ( n ){
	      n.frozen(paused);
	    });
	  }
	  
	  function calculateLinkPartDistance( linkPart ){
	    var link = linkPart.link();
	    
	    if ( link.isLoop() ) {
	      return options.loopDistance();
	    }
	    
	    // divide by 2 to receive the length for a single link part
	    var linkPartDistance = getVisibleLinkDistance(link) / 2;
	    linkPartDistance += linkPart.domain().actualRadius();
	    linkPartDistance += linkPart.range().actualRadius();
	    return linkPartDistance;
	  }
	  
	  function getVisibleLinkDistance( link ){
	    if ( elementTools.isDatatype(link.domain()) || elementTools.isDatatype(link.range()) ) {
	      return options.datatypeDistance();
	    } else {
	      return options.classDistance();
	    }
	  }
	  
	  /** --------------------------------------------------------- **/
	  /** -- animation functions for the nodes --                   **/
	  /** --------------------------------------------------------- **/
	  
	  graph.animateDynamicLabelWidth = function (){
	    var wantedWidth = options.dynamicLabelWidth();
	    var i;
	    for ( i = 0; i < classNodes.length; i++ ) {
	      var nodeElement = classNodes[i];
	      if ( elementTools.isDatatype(nodeElement) ) {
	        nodeElement.animateDynamicLabelWidth(wantedWidth);
	      }
	    }
	    for ( i = 0; i < properties.length; i++ ) {
	      properties[i].animateDynamicLabelWidth(wantedWidth);
	    }
	  };
	  
	  
	  /** --------------------------------------------------------- **/
	  /** -- halo and localization functions --                     **/
	  /** --------------------------------------------------------- **/
	  function updateHaloRadius(){
	    if ( pulseNodeIds && pulseNodeIds.length > 0 ) {
	      var forceNodes = force.nodes();
	      for ( var i = 0; i < pulseNodeIds.length; i++ ) {
	        var node = forceNodes[pulseNodeIds[i]];
	        if ( node ) {
	          if ( node.property ) {
	            // match search strings with property label
	            if ( node.property().inverse ) {
	              var searchString = graph.options().searchMenu().getSearchString().toLowerCase();
	              var name = node.property().labelForCurrentLanguage().toLowerCase();
	              if ( name === searchString ) computeDistanceToCenter(node);
	              else {
	                node.property().removeHalo();
	                if ( node.property().inverse() ) {
	                  if ( !node.property().inverse().getHalos() )
	                    node.property().inverse().drawHalo();
	                  computeDistanceToCenter(node, true);
	                }
	                if ( node.property().equivalents() ) {
	                  var eq = node.property().equivalents();
	                  for ( var e = 0; e < eq.length; e++ ) {
	                    if ( !eq[e].getHalos() )
	                      eq[e].drawHalo();
	                  }
	                  if ( !node.property().getHalos() )
	                    node.property().drawHalo();
	                  computeDistanceToCenter(node, false);
	                  
	                }
	              }
	            }
	          }
	          computeDistanceToCenter(node);
	        }
	      }
	    }
	  }
	  
	  function getScreenCoords( x, y, translate, scale ){
	    var xn = translate[0] + x * scale;
	    var yn = translate[1] + y * scale;
	    return { x: xn, y: yn };
	  }
	  
	  function getClickedScreenCoords( x, y, translate, scale ){
	    var xn = (x - translate[0]) / scale;
	    var yn = (y - translate[1]) / scale;
	    return { x: xn, y: yn };
	  }
	  
	  
	  function computeDistanceToCenter( node, inverse ){
	    var container = node;
	    var w = graph.options().width();
	    var h = graph.options().height();
	    var posXY = getScreenCoords(node.x, node.y, graphTranslation, zoomFactor);
	    
	    var highlightOfInv = false;
	    
	    if ( inverse && inverse === true ) {
	      highlightOfInv = true;
	      posXY = getScreenCoords(node.x, node.y + 20, graphTranslation, zoomFactor);
	    }
	    var x = posXY.x;
	    var y = posXY.y;
	    var nodeIsRect = false;
	    var halo;
	    var roundHalo;
	    var rectHalo;
	    var borderPoint_x = 0;
	    var borderPoint_y = 0;
	    var defaultRadius;
	    var offset = 15;
	    var radius;
	    
	    if ( node.property && highlightOfInv === true ) {
	      if ( node.property().inverse() ) {
	        rectHalo = node.property().inverse().getHalos().select("rect");
	        
	      } else {
	        if ( node.property().getHalos() )
	          rectHalo = node.property().getHalos().select("rect");
	        else {
	          node.property().drawHalo();
	          rectHalo = node.property().getHalos().select("rect");
	        }
	      }
	      rectHalo.classed("hidden", true);
	      if ( node.property().inverse() ) {
	        if ( node.property().inverse().getHalos() ) {
	          roundHalo = node.property().inverse().getHalos().select("circle");
	        }
	      } else {
	        roundHalo = node.property().getHalos().select("circle");
	      }
	      if ( roundHalo.node() === null ) {
	        radius = node.property().inverse().width() + 15;
	        
	        roundHalo = node.property().inverse().getHalos().append("circle")
	          .classed("searchResultB", true)
	          .classed("searchResultA", false)
	          .attr("r", radius + 15);
	        
	      }
	      halo = roundHalo; // swap the halo to be round
	      nodeIsRect = true;
	      container = node.property().inverse();
	    }
	    
	    if ( node.id ) {
	      if ( !node.getHalos() ) return; // something went wrong before
	      halo = node.getHalos().select("rect");
	      if ( halo.node() === null ) {
	        // this is a round node
	        nodeIsRect = false;
	        roundHalo = node.getHalos().select("circle");
	        defaultRadius = node.actualRadius();
	        roundHalo.attr("r", defaultRadius + offset);
	        halo = roundHalo;
	      } else { // this is a rect node
	        nodeIsRect = true;
	        rectHalo = node.getHalos().select("rect");
	        rectHalo.classed("hidden", true);
	        roundHalo = node.getHalos().select("circle");
	        if ( roundHalo.node() === null ) {
	          radius = node.width();
	          roundHalo = node.getHalos().append("circle")
	            .classed("searchResultB", true)
	            .classed("searchResultA", false)
	            .attr("r", radius + offset);
	        }
	        halo = roundHalo;
	      }
	    }
	    if ( node.property && !inverse ) {
	      if ( !node.property().getHalos() ) return; // something went wrong before
	      rectHalo = node.property().getHalos().select("rect");
	      rectHalo.classed("hidden", true);
	      
	      roundHalo = node.property().getHalos().select("circle");
	      if ( roundHalo.node() === null ) {
	        radius = node.property().width();
	        
	        roundHalo = node.property().getHalos().append("circle")
	          .classed("searchResultB", true)
	          .classed("searchResultA", false)
	          .attr("r", radius + 15);
	        
	      }
	      halo = roundHalo; // swap the halo to be round
	      nodeIsRect = true;
	      container = node.property();
	    }
	    
	    if ( x < 0 || x > w || y < 0 || y > h ) {
	      // node outside viewport;
	      // check for quadrant and get the correct boarder point (intersection with viewport)
	      if ( x < 0 && y < 0 ) {
	        borderPoint_x = 0;
	        borderPoint_y = 0;
	      } else if ( x > 0 && x < w && y < 0 ) {
	        borderPoint_x = x;
	        borderPoint_y = 0;
	      } else if ( x > w && y < 0 ) {
	        borderPoint_x = w;
	        borderPoint_y = 0;
	      } else if ( x > w && y > 0 && y < h ) {
	        borderPoint_x = w;
	        borderPoint_y = y;
	      } else if ( x > w && y > h ) {
	        borderPoint_x = w;
	        borderPoint_y = h;
	      } else if ( x > 0 && x < w && y > h ) {
	        borderPoint_x = x;
	        borderPoint_y = h;
	      } else if ( x < 0 && y > h ) {
	        borderPoint_x = 0;
	        borderPoint_y = h;
	      } else if ( x < 0 && y > 0 && y < h ) {
	        borderPoint_x = 0;
	        borderPoint_y = y;
	      }
	      // kill all pulses of nodes that are outside the viewport
	      container.getHalos().select("rect").classed("searchResultA", false);
	      container.getHalos().select("circle").classed("searchResultA", false);
	      container.getHalos().select("rect").classed("searchResultB", true);
	      container.getHalos().select("circle").classed("searchResultB", true);
	      halo.classed("hidden", false);
	      // compute in pixel coordinates length of difference vector
	      var borderRadius_x = borderPoint_x - x;
	      var borderRadius_y = borderPoint_y - y;
	      
	      var len = borderRadius_x * borderRadius_x + borderRadius_y * borderRadius_y;
	      len = Math.sqrt(len);
	      
	      var normedX = borderRadius_x / len;
	      var normedY = borderRadius_y / len;
	      
	      len = len + 20; // add 20 px;
	      
	      // re-normalized vector
	      var newVectorX = normedX * len + x;
	      var newVectorY = normedY * len + y;
	      // compute world coordinates of this point
	      var wX = (newVectorX - graphTranslation[0]) / zoomFactor;
	      var wY = (newVectorY - graphTranslation[1]) / zoomFactor;
	      
	      // compute distance in world coordinates
	      var dx = wX - node.x;
	      var dy = wY - node.y;
	      if ( highlightOfInv === true )
	        dy = wY - node.y - 20;
	      
	      if ( highlightOfInv === false && node.property && node.property().inverse() )
	        dy = wY - node.y + 20;
	      
	      var newRadius = Math.sqrt(dx * dx + dy * dy);
	      halo = container.getHalos().select("circle");
	      // sanity checks and setting new halo radius
	      if ( !nodeIsRect ) {
	        defaultRadius = node.actualRadius() + offset;
	        if ( newRadius < defaultRadius ) {
	          newRadius = defaultRadius;
	        }
	        halo.attr("r", newRadius);
	      } else {
	        defaultRadius = 0.5 * container.width();
	        if ( newRadius < defaultRadius )
	          newRadius = defaultRadius;
	        halo.attr("r", newRadius);
	      }
	    } else { // node is in viewport , render original;
	      // reset the halo to original radius
	      defaultRadius = node.actualRadius() + 15;
	      if ( !nodeIsRect ) {
	        halo.attr("r", defaultRadius);
	      } else { // this is rectangular node render as such
	        halo = container.getHalos().select("rect");
	        halo.classed("hidden", false);
	        //halo.classed("searchResultB", true);
	        //halo.classed("searchResultA", false);
	        var aCircHalo = container.getHalos().select("circle");
	        aCircHalo.classed("hidden", true);
	        
	        container.getHalos().select("rect").classed("hidden", false);
	        container.getHalos().select("circle").classed("hidden", true);
	      }
	    }
	  }
	  
	  function transform( p, cx, cy ){
	    // one iteration step for the locate target animation
	    zoomFactor = graph.options().height() / p[2];
	    graphTranslation = [(cx - p[0] * zoomFactor), (cy - p[1] * zoomFactor)];
	    updateHaloRadius();
	    // update the values in case the user wants to break the animation
	    zoom.translate(graphTranslation);
	    zoom.scale(zoomFactor);
	    graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	    return "translate(" + graphTranslation[0] + "," + graphTranslation[1] + ")scale(" + zoomFactor + ")";
	  }
	  
	  graph.zoomToElementInGraph = function ( element ){
	    targetLocationZoom(element);
	  };
	  graph.updateHaloRadius = function ( element ){
	    computeDistanceToCenter(element);
	  };
	  
	  function targetLocationZoom( target ){
	    // store the original information
	    var cx = 0.5 * graph.options().width();
	    var cy = 0.5 * graph.options().height();
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    var sP = [cp.x, cp.y, graph.options().height() / zoomFactor];
	    
	    var zoomLevel = Math.max(defaultZoom + 0.5 * defaultZoom, defaultTargetZoom);
	    var eP = [target.x, target.y, graph.options().height() / zoomLevel];
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    
	    var lenAnimation = pos_intp.duration;
	    if ( lenAnimation > 2500 ) {
	      lenAnimation = 2500;
	    }
	    
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(lenAnimation)
	      .attrTween("transform", function (){
	        return function ( t ){
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        updateHaloRadius();
	      });
	  }
	  
	  function getWorldPosFromScreen( x, y, translate, scale ){
	    var temp = scale[0], xn, yn;
	    if ( temp ) {
	      xn = (x - translate[0]) / temp;
	      yn = (y - translate[1]) / temp;
	    } else {
	      xn = (x - translate[0]) / scale;
	      yn = (y - translate[1]) / scale;
	    }
	    return { x: xn, y: yn };
	  }
	  
	  graph.locateSearchResult = function (){
	    if ( pulseNodeIds && pulseNodeIds.length > 0 ) {
	      // move the center of the viewport to this location
	      if ( transformAnimation === true ) return; // << prevents incrementing the location id if we are in an animation
	      var node = force.nodes()[pulseNodeIds[locationId]];
	      locationId++;
	      locationId = locationId % pulseNodeIds.length;
	      if ( node.id ) node.foreground();
	      if ( node.property ) node.property().foreground();
	      
	      targetLocationZoom(node);
	    }
	  };
	  
	  graph.resetSearchHighlight = function (){
	    // get all nodes (handle also already filtered nodes )
	    pulseNodeIds = [];
	    nodeArrayForPulse = [];
	    // clear from stored nodes
	    var nodes = unfilteredData.nodes;
	    var props = unfilteredData.properties;
	    var j;
	    for ( j = 0; j < nodes.length; j++ ) {
	      var node = nodes[j];
	      if ( node.removeHalo )
	        node.removeHalo();
	    }
	    for ( j = 0; j < props.length; j++ ) {
	      var prop = props[j];
	      if ( prop.removeHalo )
	        prop.removeHalo();
	    }
	  };
	  
	  graph.updatePulseIds = function ( nodeIdArray ){
	    pulseNodeIds = [];
	    for ( var i = 0; i < nodeIdArray.length; i++ ) {
	      var selectedId = nodeIdArray[i];
	      var forceId = nodeMap[selectedId];
	      if ( forceId !== undefined ) {
	        var le_node = force.nodes()[forceId];
	        if ( le_node.id ) {
	          if ( pulseNodeIds.indexOf(forceId) === -1 ) {
	            pulseNodeIds.push(forceId);
	          }
	        }
	        if ( le_node.property ) {
	          if ( pulseNodeIds.indexOf(forceId) === -1 ) {
	            pulseNodeIds.push(forceId);
	          }
	        }
	      }
	    }
	    locationId = 0;
	    if ( pulseNodeIds.length > 0 ) {
	      d3.select("#locateSearchResult").classed("highlighted", true);
	      d3.select("#locateSearchResult").node().title = "Locate search term";
	    }
	    else {
	      d3.select("#locateSearchResult").classed("highlighted", false);
	      d3.select("#locateSearchResult").node().title = "Nothing to locate";
	    }
	    
	  };
	  
	  graph.highLightNodes = function ( nodeIdArray ){
	    if ( nodeIdArray.length === 0 ) {
	      return; // nothing to highlight
	    }
	    pulseNodeIds = [];
	    nodeArrayForPulse = nodeIdArray;
	    var missedIds = [];
	    
	    // identify the force id to highlight
	    for ( var i = 0; i < nodeIdArray.length; i++ ) {
	      var selectedId = nodeIdArray[i];
	      var forceId = nodeMap[selectedId];
	      if ( forceId !== undefined ) {
	        var le_node = force.nodes()[forceId];
	        if ( le_node.id ) {
	          if ( pulseNodeIds.indexOf(forceId) === -1 ) {
	            pulseNodeIds.push(forceId);
	            le_node.foreground();
	            le_node.drawHalo();
	          }
	        }
	        if ( le_node.property ) {
	          if ( pulseNodeIds.indexOf(forceId) === -1 ) {
	            pulseNodeIds.push(forceId);
	            le_node.property().foreground();
	            le_node.property().drawHalo();
	          }
	        }
	      }
	      else {
	        missedIds.push(selectedId);
	      }
	    }
	    
	    if ( missedIds.length === nodeIdArray.length ) {
	      
	    }
	    // store the highlight on the missed nodes;
	    var s_nodes = unfilteredData.nodes;
	    var s_props = unfilteredData.properties;
	    for ( i = 0; i < missedIds.length; i++ ) {
	      var missedId = missedIds[i];
	      // search for this in the nodes;
	      for ( var n = 0; n < s_nodes.length; n++ ) {
	        var nodeId = s_nodes[n].id();
	        if ( nodeId === missedId ) {
	          s_nodes[n].drawHalo();
	        }
	      }
	      for ( var p = 0; p < s_props.length; p++ ) {
	        var propId = s_props[p].id();
	        if ( propId === missedId ) {
	          s_props[p].drawHalo();
	        }
	      }
	    }
	    if ( missedIds.length === nodeIdArray.length ) {
	      d3.select("#locateSearchResult").classed("highlighted", false);
	    }
	    else {
	      d3.select("#locateSearchResult").classed("highlighted", true);
	    }
	    locationId = 0;
	    updateHaloRadius();
	  };
	  
	  graph.hideHalos = function (){
	    var haloElements = d3.selectAll(".searchResultA,.searchResultB");
	    haloElements.classed("hidden", true);
	    return haloElements;
	  };
	  
	  function nodeInViewport( node, property ){
	    
	    var w = graph.options().width();
	    var h = graph.options().height();
	    var posXY = getScreenCoords(node.x, node.y, graphTranslation, zoomFactor);
	    var x = posXY.x;
	    var y = posXY.y;
	    
	    var retVal = !(x < 0 || x > w || y < 0 || y > h);
	    return retVal;
	  }
	  
	  graph.getBoundingBoxForTex = function (){
	    var halos = graph.hideHalos();
	    var bbox = graphContainer.node().getBoundingClientRect();
	    halos.classed("hidden", false);
	    var w = graph.options().width();
	    var h = graph.options().height();
	    
	    // get the graph coordinates
	    var topLeft = getWorldPosFromScreen(0, 0, graphTranslation, zoomFactor);
	    var botRight = getWorldPosFromScreen(w, h, graphTranslation, zoomFactor);
	    
	    
	    var t_topLeft = getWorldPosFromScreen(bbox.left, bbox.top, graphTranslation, zoomFactor);
	    var t_botRight = getWorldPosFromScreen(bbox.right, bbox.bottom, graphTranslation, zoomFactor);
	    
	    // tighten up the bounding box;
	    
	    var tX = Math.max(t_topLeft.x, topLeft.x);
	    var tY = Math.max(t_topLeft.y, topLeft.y);
	    
	    var bX = Math.min(t_botRight.x, botRight.x);
	    var bY = Math.min(t_botRight.y, botRight.y);
	    
	    
	    // tighten further;
	    var allForceNodes = force.nodes();
	    var numNodes = allForceNodes.length;
	    var visibleNodes = [];
	    var bbx;
	    
	    
	    var contentBBox = { tx: 1000000000000, ty: 1000000000000, bx: -1000000000000, by: -1000000000000 };
	    
	    for ( var i = 0; i < numNodes; i++ ) {
	      var node = allForceNodes[i];
	      if ( node ) {
	        if ( node.property ) {
	          if ( nodeInViewport(node, true) ) {
	            if ( node.property().labelElement() === undefined ) continue;
	            bbx = node.property().labelElement().node().getBoundingClientRect();
	            if ( bbx ) {
	              contentBBox.tx = Math.min(contentBBox.tx, bbx.left);
	              contentBBox.bx = Math.max(contentBBox.bx, bbx.right);
	              contentBBox.ty = Math.min(contentBBox.ty, bbx.top);
	              contentBBox.by = Math.max(contentBBox.by, bbx.bottom);
	            }
	          }
	        } else {
	          if ( nodeInViewport(node, false) ) {
	            bbx = node.nodeElement().node().getBoundingClientRect();
	            if ( bbx ) {
	              contentBBox.tx = Math.min(contentBBox.tx, bbx.left);
	              contentBBox.bx = Math.max(contentBBox.bx, bbx.right);
	              contentBBox.ty = Math.min(contentBBox.ty, bbx.top);
	              contentBBox.by = Math.max(contentBBox.by, bbx.bottom);
	            }
	          }
	        }
	      }
	    }
	    
	    var tt_topLeft = getWorldPosFromScreen(contentBBox.tx, contentBBox.ty, graphTranslation, zoomFactor);
	    var tt_botRight = getWorldPosFromScreen(contentBBox.bx, contentBBox.by, graphTranslation, zoomFactor);
	    
	    tX = Math.max(tX, tt_topLeft.x);
	    tY = Math.max(tY, tt_topLeft.y);
	    
	    bX = Math.min(bX, tt_botRight.x);
	    bY = Math.min(bY, tt_botRight.y);
	    // y axis flip for tex
	    return [tX, -tY, bX, -bY];
	    
	  };
	  
	  var updateTargetElement = function (){
	    var bbox = graphContainer.node().getBoundingClientRect();
	    
	    
	    // get the graph coordinates
	    var bboxOffset = 50; // default radius of a node;
	    var topLeft = getWorldPosFromScreen(bbox.left, bbox.top, graphTranslation, zoomFactor);
	    var botRight = getWorldPosFromScreen(bbox.right, bbox.bottom, graphTranslation, zoomFactor);
	    
	    var w = graph.options().width();
	    if ( graph.options().leftSidebar().isSidebarVisible() === true )
	      w -= 200;
	    var h = graph.options().height();
	    topLeft.x += bboxOffset;
	    topLeft.y -= bboxOffset;
	    botRight.x -= bboxOffset;
	    botRight.y += bboxOffset;
	    
	    var g_w = botRight.x - topLeft.x;
	    var g_h = botRight.y - topLeft.y;
	    
	    // endpoint position calculations
	    var posX = 0.5 * (topLeft.x + botRight.x);
	    var posY = 0.5 * (topLeft.y + botRight.y);
	    var cx = 0.5 * w,
	      cy = 0.5 * h;
	    
	    if ( graph.options().leftSidebar().isSidebarVisible() === true )
	      cx += 200;
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    
	    // zoom factor calculations and fail safes;
	    var newZoomFactor = 1.0; // fail save if graph and window are squares
	    //get the smaller one
	    var a = w / g_w;
	    var b = h / g_h;
	    if ( a < b ) newZoomFactor = a;
	    else      newZoomFactor = b;
	    
	    
	    // fail saves
	    if ( newZoomFactor > zoom.scaleExtent()[1] ) {
	      newZoomFactor = zoom.scaleExtent()[1];
	    }
	    if ( newZoomFactor < zoom.scaleExtent()[0] ) {
	      newZoomFactor = zoom.scaleExtent()[0];
	    }
	    
	    // apply Zooming
	    var sP = [cp.x, cp.y, h / zoomFactor];
	    var eP = [posX, posY, h / newZoomFactor];
	    
	    
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    return [pos_intp, cx, cy];
	    
	  };
	  
	  graph.forceRelocationEvent = function ( dynamic ){
	    // we need to kill the halo to determine the bounding box;
	    var halos = graph.hideHalos();
	    var bbox = graphContainer.node().getBoundingClientRect();
	    halos.classed("hidden", false);
	    
	    // get the graph coordinates
	    var bboxOffset = 50; // default radius of a node;
	    var topLeft = getWorldPosFromScreen(bbox.left, bbox.top, graphTranslation, zoomFactor);
	    var botRight = getWorldPosFromScreen(bbox.right, bbox.bottom, graphTranslation, zoomFactor);
	    
	    var w = graph.options().width();
	    if ( graph.options().leftSidebar().isSidebarVisible() === true )
	      w -= 200;
	    var h = graph.options().height();
	    topLeft.x += bboxOffset;
	    topLeft.y -= bboxOffset;
	    botRight.x -= bboxOffset;
	    botRight.y += bboxOffset;
	    
	    var g_w = botRight.x - topLeft.x;
	    var g_h = botRight.y - topLeft.y;
	    
	    // endpoint position calculations
	    var posX = 0.5 * (topLeft.x + botRight.x);
	    var posY = 0.5 * (topLeft.y + botRight.y);
	    var cx = 0.5 * w,
	      cy = 0.5 * h;
	    
	    if ( graph.options().leftSidebar().isSidebarVisible() === true )
	      cx += 200;
	    var cp = getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);
	    
	    // zoom factor calculations and fail safes;
	    var newZoomFactor = 1.0; // fail save if graph and window are squares
	    //get the smaller one
	    var a = w / g_w;
	    var b = h / g_h;
	    if ( a < b ) newZoomFactor = a;
	    else      newZoomFactor = b;
	    
	    
	    // fail saves
	    if ( newZoomFactor > zoom.scaleExtent()[1] ) {
	      newZoomFactor = zoom.scaleExtent()[1];
	    }
	    if ( newZoomFactor < zoom.scaleExtent()[0] ) {
	      newZoomFactor = zoom.scaleExtent()[0];
	    }
	    
	    // apply Zooming
	    var sP = [cp.x, cp.y, h / zoomFactor];
	    var eP = [posX, posY, h / newZoomFactor];
	    
	    
	    var pos_intp = d3.interpolateZoom(sP, eP);
	    var lenAnimation = pos_intp.duration;
	    if ( lenAnimation > 2500 ) {
	      lenAnimation = 2500;
	    }
	    graphContainer.attr("transform", transform(sP, cx, cy))
	      .transition()
	      .duration(lenAnimation)
	      .attrTween("transform", function (){
	        return function ( t ){
	          if ( dynamic ) {
	            var param = updateTargetElement();
	            var nV = param[0](t);
	            return transform(nV, cx, cy);
	          }
	          return transform(pos_intp(t), cx, cy);
	        };
	      })
	      .each("end", function (){
	        if ( dynamic ) {
	          return;
	        }
	        
	        graphContainer.attr("transform", "translate(" + graphTranslation + ")scale(" + zoomFactor + ")");
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        graph.options().zoomSlider().updateZoomSliderValue(zoomFactor);
	        
	        
	      });
	  };
	  
	  
	  graph.isADraggerActive = function (){
	    if ( classDragger.mouseButtonPressed === true ||
	      domainDragger.mouseButtonPressed === true ||
	      rangeDragger.mouseButtonPressed === true ) {
	      return true;
	    }
	    return false;
	  };
	  
	  /** --------------------------------------------------------- **/
	  /** -- VOWL EDITOR  create/ edit /delete functions --         **/
	  /** --------------------------------------------------------- **/
	  
	  graph.changeNodeType = function ( element ){
	    
	    var typeString = d3.select("#typeEditor").node().value;
	    
	    if ( graph.classesSanityCheck(element, typeString) === false ) {
	      // call reselection to restore previous type selection
	      graph.options().editSidebar().updateSelectionInformation(element);
	      return;
	    }
	    
	    var prototype = NodePrototypeMap.get(typeString.toLowerCase());
	    var aNode = new prototype(graph);
	    
	    aNode.x = element.x;
	    aNode.y = element.y;
	    aNode.px = element.x;
	    aNode.py = element.y;
	    aNode.id(element.id());
	    aNode.copyInformation(element);
	    
	    if ( typeString === "owl:Thing" ) {
	      aNode.label("Thing");
	    }
	    else if ( elementTools.isDatatype(element) === false ) {
	      if ( element.backupLabel() !== undefined ) {
	        aNode.label(element.backupLabel());
	      } else if ( aNode.backupLabel() !== undefined ) {
	        aNode.label(aNode.backupLabel());
	      } else {
	        aNode.label("NewClass");
	      }
	    }
	    
	    if ( typeString === "rdfs:Datatype" ) {
	      if ( aNode.dType() === "undefined" )
	        aNode.label("undefined");
	      else {
	        var identifier = aNode.dType().split(":")[1];
	        aNode.label(identifier);
	      }
	    }
	    var i;
	    // updates the property domain and range
	    for ( i = 0; i < unfilteredData.properties.length; i++ ) {
	      if ( unfilteredData.properties[i].domain() === element ) {
	        //  unfilteredData.properties[i].toString();
	        unfilteredData.properties[i].domain(aNode);
	      }
	      if ( unfilteredData.properties[i].range() === element ) {
	        unfilteredData.properties[i].range(aNode);
	        //  unfilteredData.properties[i].toString();
	      }
	    }
	    
	    // update for fastUpdate:
	    for ( i = 0; i < properties.length; i++ ) {
	      if ( properties[i].domain() === element ) {
	        //  unfilteredData.properties[i].toString();
	        properties[i].domain(aNode);
	      }
	      if ( properties[i].range() === element ) {
	        properties[i].range(aNode);
	        //  unfilteredData.properties[i].toString();
	      }
	    }
	    
	    var remId = unfilteredData.nodes.indexOf(element);
	    if ( remId !== -1 )
	      unfilteredData.nodes.splice(remId, 1);
	    remId = classNodes.indexOf(element);
	    if ( remId !== -1 )
	      classNodes.splice(remId, 1);
	    // very important thing for selection!;
	    addNewNodeElement(aNode);
	    // handle focuser!
	    options.focuserModule().handle(aNode);
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    element = null;
	  };
	  
	  
	  graph.changePropertyType = function ( element ){
	    var typeString = d3.select("#typeEditor").node().value;
	    
	    // create warning
	    if ( graph.sanityCheckProperty(element.domain(), element.range(), typeString) === false ) return false;
	    
	    var propPrototype = PropertyPrototypeMap.get(typeString.toLowerCase());
	    var aProp = new propPrototype(graph);
	    aProp.copyInformation(element);
	    aProp.id(element.id());
	    
	    element.domain().removePropertyElement(element);
	    element.range().removePropertyElement(element);
	    aProp.domain(element.domain());
	    aProp.range(element.range());
	    
	    if ( element.backupLabel() !== undefined ) {
	      aProp.label(element.backupLabel());
	    } else {
	      aProp.label("newObjectProperty");
	    }
	    
	    if ( aProp.type() === "rdfs:subClassOf" ) {
	      aProp.iri("http://www.w3.org/2000/01/rdf-schema#subClassOf");
	    } else {
	      if ( element.iri() === "http://www.w3.org/2000/01/rdf-schema#subClassOf" )
	        aProp.iri(graph.options().getGeneralMetaObjectProperty('iri') + aProp.id());
	      
	    }
	    
	    
	    if ( graph.propertyCheckExistenceChecker(aProp, element.domain(), element.range()) === false ) {
	      graph.options().editSidebar().updateSelectionInformation(element);
	      return;
	    }
	    // // TODO: change its base IRI to proper value
	    // var ontoIRI="http://someTest.de";
	    // aProp.baseIri(ontoIRI);
	    // aProp.iri(aProp.baseIri()+aProp.id());
	    
	    
	    // add this to the data;
	    unfilteredData.properties.push(aProp);
	    if ( properties.indexOf(aProp) === -1 )
	      properties.push(aProp);
	    var remId = unfilteredData.properties.indexOf(element);
	    if ( remId !== -1 )
	      unfilteredData.properties.splice(remId, 1);
	    if ( properties.indexOf(aProp) === -1 )
	      properties.push(aProp);
	    remId = properties.indexOf(element);
	    if ( remId !== -1 )
	      properties.splice(remId, 1);
	    graph.fastUpdate();
	    aProp.domain().addProperty(aProp);
	    aProp.range().addProperty(aProp);
	    if ( element.labelObject() && aProp.labelObject() ) {
	      aProp.labelObject().x = element.labelObject().x;
	      aProp.labelObject().px = element.labelObject().px;
	      aProp.labelObject().y = element.labelObject().y;
	      aProp.labelObject().py = element.labelObject().py;
	    }
	    
	    options.focuserModule().handle(aProp);
	    element = null;
	  };
	  
	  graph.removeEditElements = function (){
	    // just added to be called form outside
	    removeEditElements();
	  };
	  
	  function removeEditElements(){
	    rangeDragger.hideDragger(true);
	    domainDragger.hideDragger(true);
	    shadowClone.hideClone(true);
	    
	    classDragger.hideDragger(true);
	    if ( addDataPropertyGroupElement )
	      addDataPropertyGroupElement.classed("hidden", true);
	    if ( deleteGroupElement )
	      deleteGroupElement.classed("hidden", true);
	    
	    
	    if ( hoveredNodeElement ) {
	      if ( hoveredNodeElement.pinned() === false ) {
	        hoveredNodeElement.locked(graph.paused());
	        hoveredNodeElement.frozen(graph.paused());
	      }
	    }
	    if ( hoveredPropertyElement ) {
	      if ( hoveredPropertyElement.pinned() === false ) {
	        hoveredPropertyElement.locked(graph.paused());
	        hoveredPropertyElement.frozen(graph.paused());
	      }
	    }
	    
	    
	  }
	  
	  graph.editorMode = function ( val ){
	    var create_entry = d3.select("#empty");
	    var create_container = d3.select("#emptyContainer");
	    
	    var modeOfOpString = d3.select("#modeOfOperationString").node();
	    if ( !arguments.length ) {
	      create_entry.node().checked = editMode;
	      if ( editMode === false ) {
	        create_container.node().title = "Enable editing in modes menu to create a new ontology";
	        create_entry.node().title = "Enable editing in modes menu to create a new ontology";
	        create_entry.style("pointer-events", "none");
	      } else {
	        create_container.node().title = "Creates a new empty ontology";
	        create_entry.node().title = "Creates a new empty ontology";
	        d3.select("#useAccuracyHelper").style("color", "#2980b9");
	        d3.select("#useAccuracyHelper").style("pointer-events", "auto");
	        create_entry.node().disabled = false;
	        create_entry.style("pointer-events", "auto");
	      }
	      
	      return editMode;
	    }
	    graph.options().setEditorModeForDefaultObject(val);
	    
	    // if (seenEditorHint===false  && val===true){
	    //     seenEditorHint=true;
	    //     graph.options().warningModule().showEditorHint();
	    // }
	    editMode = val;
	    
	    if ( create_entry ) {
	      create_entry.classed("disabled", !editMode);
	      if ( !editMode ) {
	        create_container.node().title = "Enable editing in modes menu to create a new ontology";
	        create_entry.node().title = "Enable editing in modes menu to create a new ontology";
	        create_entry.node().disabled = true;
	        d3.select("#useAccuracyHelper").style("color", "#979797");
	        d3.select("#useAccuracyHelper").style("pointer-events", "none");
	        create_entry.style("pointer-events", "none");
	      } else {
	        create_container.node().title = "Creates a new empty ontology";
	        create_entry.node().title = "Creates a new empty ontology";
	        d3.select("#useAccuracyHelper").style("color", "#2980b9");
	        d3.select("#useAccuracyHelper").style("pointer-events", "auto");
	        create_entry.style("pointer-events", "auto");
	      }
	    }
	    
	    // adjust compact notation
	    // selector = compactNotationOption;
	    // box =ModuleCheckbox
	    var compactNotationContainer = d3.select("#compactnotationModuleCheckbox");
	    if ( compactNotationContainer ) {
	      compactNotationContainer.classed("disabled", !editMode);
	      if ( !editMode ) {
	        compactNotationContainer.node().title = "";
	        compactNotationContainer.node().disabled = false;
	        compactNotationContainer.style("pointer-events", "auto");
	        d3.select("#compactNotationOption").style("color", "");
	        d3.select("#compactNotationOption").node().title = "";
	        options.literalFilter().enabled(true);
	        graph.update();
	      } else {
	        // if editor Mode
	        //1) uncheck the element
	        d3.select("#compactNotationOption").node().title = "Compact notation can only be used in view mode";
	        compactNotationContainer.node().disabled = true;
	        compactNotationContainer.node().checked = false;
	        options.compactNotationModule().enabled(false);
	        options.literalFilter().enabled(false);
	        graph.executeCompactNotationModule();
	        graph.executeEmptyLiteralFilter();
	        graph.lazyRefresh();
	        compactNotationContainer.style("pointer-events", "none");
	        d3.select("#compactNotationOption").style("color", "#979797");
	      }
	    }
	    
	    if ( modeOfOpString ) {
	      if ( touchDevice === true ) {
	        modeOfOpString.innerHTML = "touch able device detected";
	      } else {
	        modeOfOpString.innerHTML = "point & click device detected";
	      }
	    }
	    var svgGraph = d3.selectAll(".vowlGraph");
	    
	    if ( editMode === true ) {
	      options.leftSidebar().showSidebar(options.leftSidebar().getSidebarVisibility(), true);
	      options.leftSidebar().hideCollapseButton(false);
	      graph.options().editSidebar().updatePrefixUi();
	      graph.options().editSidebar().updateElementWidth();
	      svgGraph.on("dblclick.zoom", graph.modified_dblClickFunction);
	      
	    } else {
	      svgGraph.on("dblclick.zoom", originalD3_dblClickFunction);
	      options.leftSidebar().showSidebar(0);
	      options.leftSidebar().hideCollapseButton(true);
	      // hide hovered edit elements
	      removeEditElements();
	    }
	    options.sidebar().updateShowedInformation();
	    options.editSidebar().updateElementWidth();
	    
	  };
	  
	  function createLowerCasePrototypeMap( prototypeMap ){
	    return d3.map(prototypeMap.values(), function ( Prototype ){
	      return new Prototype().type().toLowerCase();
	    });
	  }
	  
	  function createNewNodeAtPosition( pos ){
	    var aNode, prototype;
	    var forceUpdate = true;
	    // create a node of that id;
	    
	    var typeToCreate = d3.select("#defaultClass").node().title;
	    prototype = NodePrototypeMap.get(typeToCreate.toLowerCase());
	    aNode = new prototype(graph);
	    var autoEditElement = false;
	    if ( typeToCreate === "owl:Thing" ) {
	      aNode.label("Thing");
	    }
	    else {
	      aNode.label("NewClass");
	      autoEditElement = true;
	    }
	    aNode.x = pos.x;
	    aNode.y = pos.y;
	    aNode.px = aNode.x;
	    aNode.py = aNode.y;
	    aNode.id("Class" + eN++);
	    // aNode.paused(true);
	    
	    aNode.baseIri(d3.select("#iriEditor").node().value);
	    aNode.iri(aNode.baseIri() + aNode.id());
	    addNewNodeElement(aNode, forceUpdate);
	    options.focuserModule().handle(aNode, true);
	    aNode.frozen(graph.paused());
	    aNode.locked(graph.paused());
	    aNode.enableEditing(autoEditElement);
	  }
	  
	  
	  function addNewNodeElement( element ){
	    unfilteredData.nodes.push(element);
	    if ( classNodes.indexOf(element) === -1 )
	      classNodes.push(element);
	    
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    graph.fastUpdate();
	  }
	  
	  graph.getTargetNode = function ( position ){
	    var dx = position[0];
	    var dy = position[1];
	    var tN = null;
	    var minDist = 1000000000000;
	    // This is a bit OVERKILL for the computation of one node >> TODO: KD-TREE SEARCH
	    unfilteredData.nodes.forEach(function ( el ){
	      var cDist = Math.sqrt((el.x - dx) * (el.x - dx) + (el.y - dy) * (el.y - dy));
	      if ( cDist < minDist ) {
	        minDist = cDist;
	        tN = el;
	      }
	    });
	    if ( hoveredNodeElement ) {
	      var offsetDist = hoveredNodeElement.actualRadius() + 30;
	      if ( minDist > offsetDist ) return null;
	      if ( tN.renderType() === "rect" ) return null;
	      if ( tN === hoveredNodeElement && minDist <= hoveredNodeElement.actualRadius() ) {
	        return tN;
	      } else if ( tN === hoveredNodeElement && minDist > hoveredNodeElement.actualRadius() ) {
	        return null;
	      }
	      return tN;
	    }
	    else {
	      
	      if ( minDist > (tN.actualRadius() + 30) )
	        return null;
	      else return tN;
	      
	    }
	  };
	  
	  graph.genericPropertySanityCheck = function ( domain, range, typeString, header, action ){
	    if ( domain === range && typeString === "rdfs:subClassOf" ) {
	      graph.options().warningModule().showWarning(header,
	        "rdfs:subClassOf can not be created as loops (domain == range)",
	        action, 1, false);
	      return false;
	    }
	    if ( domain === range && typeString === "owl:disjointWith" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:disjointWith  can not be created as loops (domain == range)",
	        action, 1, false);
	      return false;
	    }
	    // allProps[i].type()==="owl:allValuesFrom"  ||
	    // allProps[i].type()==="owl:someValuesFrom"
	    if ( domain.type() === "owl:Thing" && typeString === "owl:allValuesFrom" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:allValuesFrom can not originate from owl:Thing",
	        action, 1, false);
	      return false;
	    }
	    if ( domain.type() === "owl:Thing" && typeString === "owl:someValuesFrom" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:someValuesFrom can not originate from owl:Thing",
	        action, 1, false);
	      return false;
	    }
	    
	    if ( range.type() === "owl:Thing" && typeString === "owl:allValuesFrom" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:allValuesFrom can not be connected to owl:Thing",
	        action, 1, false);
	      return false;
	    }
	    if ( range.type() === "owl:Thing" && typeString === "owl:someValuesFrom" ) {
	      graph.options().warningModule().showWarning(header,
	        "owl:someValuesFrom can not be connected to owl:Thing",
	        action, 1, false);
	      return false;
	    }
	    
	    return true; // we can Change the domain or range
	  };
	  
	  graph.checkIfIriClassAlreadyExist = function ( url ){
	    // search for a class node with this url
	    var allNodes = unfilteredData.nodes;
	    for ( var i = 0; i < allNodes.length; i++ ) {
	      if ( elementTools.isDatatype(allNodes[i]) === true || allNodes[i].type() === "owl:Thing" )
	        continue;
	      
	      // now we are a real class;
	      //get class IRI
	      var classIRI = allNodes[i].iri();
	      
	      // this gives me the node for halo
	      if ( url === classIRI ) {
	        return allNodes[i];
	      }
	    }
	    return false;
	  };
	  
	  graph.classesSanityCheck = function ( classElement, targetType ){
	    // this is added due to someValuesFrom properties
	    // we should not be able to change a classElement to a owl:Thing
	    // when it has a property attached to it that uses these restrictions
	    //
	    
	    if ( targetType === "owl:Class" ) return true;
	    
	    else {
	      // collect all properties which have that one as a domain or range
	      var allProps = unfilteredData.properties;
	      for ( var i = 0; i < allProps.length; i++ ) {
	        if ( allProps[i].range() === classElement || allProps[i].domain() === classElement ) {
	          // check for the type of that property
	          if ( allProps[i].type() === "owl:someValuesFrom" ) {
	            graph.options().warningModule().showWarning("Can not change class type",
	              "The element has a property that is of type owl:someValuesFrom",
	              "Element type not changed!", 1, true);
	            return false;
	          }
	          if ( allProps[i].type() === "owl:allValuesFrom" ) {
	            graph.options().warningModule().showWarning("Can not change class type",
	              "The element has a property that is of type owl:allValuesFrom",
	              "Element type not changed!", 1, true);
	            return false;
	          }
	        }
	      }
	      
	      
	    }
	    return true;
	  };
	  
	  graph.propertyCheckExistenceChecker = function ( property, domain, range ){
	    var allProps = unfilteredData.properties;
	    var i;
	    if ( property.type() === "rdfs:subClassOf" || property.type() === "owl:disjointWith" ) {
	      
	      for ( i = 0; i < allProps.length; i++ ) {
	        if ( allProps[i] === property ) continue;
	        if ( allProps[i].domain() === domain && allProps[i].range() === range && allProps[i].type() === property.type() ) {
	          graph.options().warningModule().showWarning("Warning",
	            "This triple already exist!",
	            "Element not created!", 1, false);
	          return false;
	        }
	        if ( allProps[i].domain() === range && allProps[i].range() === domain && allProps[i].type() === property.type() ) {
	          graph.options().warningModule().showWarning("Warning",
	            "Inverse assignment already exist! ",
	            "Element not created!", 1, false);
	          return false;
	        }
	      }
	      return true;
	    }
	    return true;
	  };
	  
	  // graph.checkForTripleDuplicate=function(property){
	  //     var domain=property.domain();
	  //     var range=property.range();
	  //     console.log("checking for duplicates");
	  //     var b1= domain.isPropertyAssignedToThisElement(property);
	  //     var b2= range.isPropertyAssignedToThisElement(property);
	  //
	  //     console.log("test domain results in "+ b1);
	  //     console.log("test range results in "+ b1);
	  //
	  //     if (b1  && b2 ){
	  //         graph.options().warningModule().showWarning("Warning",
	  //             "This triple already exist!",
	  //             "Element not created!",1,false);
	  //         return false;
	  //     }
	  //     return true;
	  // };
	  
	  graph.sanityCheckProperty = function ( domain, range, typeString ){
	    
	    // check for duplicate triple in the element;
	    
	    
	    if ( typeString === "owl:objectProperty" && graph.options().objectPropertyFilter().enabled() === true ) {
	      graph.options().warningModule().showWarning("Warning",
	        "Object properties are filtered out in the visualization!",
	        "Element not created!", 1, false);
	      return false;
	    }
	    
	    if ( typeString === "owl:disjointWith" && graph.options().disjointPropertyFilter().enabled() === true ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:disjointWith properties are filtered out in the visualization!",
	        "Element not created!", 1, false);
	      return false;
	    }
	    
	    
	    if ( domain === range && typeString === "rdfs:subClassOf" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "rdfs:subClassOf can not be created as loops (domain == range)",
	        "Element not created!", 1, false);
	      return false;
	    }
	    if ( domain === range && typeString === "owl:disjointWith" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:disjointWith  can not be created as loops (domain == range)",
	        "Element not created!", 1, false);
	      return false;
	    }
	    
	    if ( domain.type() === "owl:Thing" && typeString === "owl:someValuesFrom" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:someValuesFrom can not originate from owl:Thing",
	        "Element not created!", 1, false);
	      return false;
	    }
	    if ( domain.type() === "owl:Thing" && typeString === "owl:allValuesFrom" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:allValuesFrom can not originate from owl:Thing",
	        "Element not created!", 1, false);
	      return false;
	    }
	    
	    if ( range.type() === "owl:Thing" && typeString === "owl:allValuesFrom" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:allValuesFrom can not be connected to owl:Thing",
	        "Element not created!", 1, false);
	      return false;
	    }
	    if ( range.type() === "owl:Thing" && typeString === "owl:someValuesFrom" ) {
	      graph.options().warningModule().showWarning("Warning",
	        "owl:someValuesFrom can not be connected to owl:Thing",
	        "Element not created!", 1, false);
	      return false;
	    }
	    return true; // we can create a property
	  };
	  
	  function createNewObjectProperty( domain, range, draggerEndposition ){
	    // check type of the property that we want to create;
	    
	    var defaultPropertyName = d3.select("#defaultProperty").node().title;
	    
	    // check if we are allow to create that property
	    if ( graph.sanityCheckProperty(domain, range, defaultPropertyName) === false ) return false;
	    
	    
	    var propPrototype = PropertyPrototypeMap.get(defaultPropertyName.toLowerCase());
	    var aProp = new propPrototype(graph);
	    aProp.id("objectProperty" + eP++);
	    aProp.domain(domain);
	    aProp.range(range);
	    aProp.label("newObjectProperty");
	    aProp.baseIri(d3.select("#iriEditor").node().value);
	    aProp.iri(aProp.baseIri() + aProp.id());
	    
	    // check for duplicate;
	    if ( graph.propertyCheckExistenceChecker(aProp, domain, range) === false ) {
	      // delete aProp;
	      // hope for garbage collection here -.-
	      return false;
	    }
	    
	    var autoEditElement = false;
	    
	    if ( defaultPropertyName === "owl:objectProperty" ) {
	      autoEditElement = true;
	    }
	    var pX = 0.49 * (domain.x + range.x);
	    var pY = 0.49 * (domain.y + range.y);
	    
	    if ( domain === range ) {
	      // we use the dragger endposition to determine an angle to put the loop there;
	      var dirD_x = draggerEndposition[0] - domain.x;
	      var dirD_y = draggerEndposition[1] - domain.y;
	      
	      // normalize;
	      var len = Math.sqrt(dirD_x * dirD_x + dirD_y * dirD_y);
	      // it should be very hard to set the position on the same sport but why not handling this
	      var nx = dirD_x / len;
	      var ny = dirD_y / len;
	      // is Nan in javascript like in c len==len returns false when it is not a number?
	      if ( isNaN(len) ) {
	        nx = 0;
	        ny = -1;
	      }
	      
	      // get domain actual raidus
	      var offset = 2 * domain.actualRadius() + 50;
	      pX = domain.x + offset * nx;
	      pY = domain.y + offset * ny;
	    }
	    
	    // add this property to domain and range;
	    domain.addProperty(aProp);
	    range.addProperty(aProp);
	    
	    
	    // add this to the data;
	    unfilteredData.properties.push(aProp);
	    if ( properties.indexOf(aProp) === -1 )
	      properties.push(aProp);
	    graph.fastUpdate();
	    aProp.labelObject().x = pX;
	    aProp.labelObject().px = pX;
	    aProp.labelObject().y = pY;
	    aProp.labelObject().py = pY;
	    
	    aProp.frozen(graph.paused());
	    aProp.locked(graph.paused());
	    domain.frozen(graph.paused());
	    domain.locked(graph.paused());
	    range.frozen(graph.paused());
	    range.locked(graph.paused());
	    
	    
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    
	    options.focuserModule().handle(aProp);
	    graph.activateHoverElementsForProperties(true, aProp, false, touchDevice);
	    aProp.labelObject().increasedLoopAngle = true;
	    aProp.enableEditing(autoEditElement);
	  }
	  
	  graph.createDataTypeProperty = function ( node ){
	    // random postion issues;
	    clearTimeout(nodeFreezer);
	    // tells user when element is filtered out
	    if ( graph.options().datatypeFilter().enabled() === true ) {
	      graph.options().warningModule().showWarning("Warning",
	        "Datatype properties are filtered out in the visualization!",
	        "Element not created!", 1, false);
	      return;
	    }
	    
	    
	    var aNode, prototype;
	    
	    // create a default datatype Node >> HERE LITERAL;
	    var defaultDatatypeName = d3.select("#defaultDatatype").node().title;
	    if ( defaultDatatypeName === "rdfs:Literal" ) {
	      prototype = NodePrototypeMap.get("rdfs:literal");
	      aNode = new prototype(graph);
	      aNode.label("Literal");
	      aNode.iri("http://www.w3.org/2000/01/rdf-schema#Literal");
	      aNode.baseIri("http://www.w3.org/2000/01/rdf-schema#");
	    } else {
	      prototype = NodePrototypeMap.get("rdfs:datatype");
	      aNode = new prototype(graph);
	      var identifier = "";
	      if ( defaultDatatypeName === "undefined" ) {
	        identifier = "undefined";
	        
	        aNode.label(identifier);
	        // TODO : HANDLER FOR UNDEFINED DATATYPES!!<<<>>>>>>>>>>>..
	        aNode.iri("http://www.undefinedDatatype.org/#" + identifier);
	        aNode.baseIri("http://www.undefinedDatatype.org/#");
	        aNode.dType(defaultDatatypeName);
	      } else {
	        identifier = defaultDatatypeName.split(":")[1];
	        aNode.label(identifier);
	        aNode.dType(defaultDatatypeName);
	        aNode.iri("http://www.w3.org/2001/XMLSchema#" + identifier);
	        aNode.baseIri("http://www.w3.org/2001/XMLSchema#");
	      }
	    }
	    
	    
	    var nX = node.x - node.actualRadius() - 100;
	    var nY = node.y + node.actualRadius() + 100;
	    
	    aNode.x = nX;
	    aNode.y = nY;
	    aNode.px = aNode.x;
	    aNode.py = aNode.y;
	    aNode.id("NodeId" + eN++);
	    // add this property to the nodes;
	    unfilteredData.nodes.push(aNode);
	    if ( classNodes.indexOf(aNode) === -1 )
	      classNodes.push(aNode);
	    
	    
	    // add also the datatype Property to it
	    var propPrototype = PropertyPrototypeMap.get("owl:datatypeproperty");
	    var aProp = new propPrototype(graph);
	    aProp.id("datatypeProperty" + eP++);
	    
	    // create the connection
	    aProp.domain(node);
	    aProp.range(aNode);
	    aProp.label("newDatatypeProperty");
	    
	    
	    // TODO: change its base IRI to proper value
	    var ontoIri = d3.select("#iriEditor").node().value;
	    aProp.baseIri(ontoIri);
	    aProp.iri(ontoIri + aProp.id());
	    // add this to the data;
	    unfilteredData.properties.push(aProp);
	    if ( properties.indexOf(aProp) === -1 )
	      properties.push(aProp);
	    graph.fastUpdate();
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    
	    nodeFreezer = setTimeout(function (){
	      if ( node && node.frozen() === true && node.pinned() === false && graph.paused() === false ) {
	        node.frozen(graph.paused());
	        node.locked(graph.paused());
	      }
	    }, 1000);
	    options.focuserModule().handle(undefined);
	    if ( node ) {
	      node.frozen(true);
	      node.locked(true);
	    }
	  };
	  
	  graph.removeNodesViaResponse = function ( nodesToRemove, propsToRemove ){
	    var i, remId;
	    // splice them;
	    for ( i = 0; i < propsToRemove.length; i++ ) {
	      remId = unfilteredData.properties.indexOf(propsToRemove[i]);
	      if ( remId !== -1 )
	        unfilteredData.properties.splice(remId, 1);
	      remId = properties.indexOf(propsToRemove[i]);
	      if ( remId !== -1 )
	        properties.splice(remId, 1);
	      propsToRemove[i] = null;
	    }
	    for ( i = 0; i < nodesToRemove.length; i++ ) {
	      remId = unfilteredData.nodes.indexOf(nodesToRemove[i]);
	      if ( remId !== -1 ) {
	        unfilteredData.nodes.splice(remId, 1);
	      }
	      remId = classNodes.indexOf(nodesToRemove[i]);
	      if ( remId !== -1 )
	        classNodes.splice(remId, 1);
	      nodesToRemove[i] = null;
	    }
	    graph.fastUpdate();
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    options.focuserModule().handle(undefined);
	    nodesToRemove = null;
	    propsToRemove = null;
	    
	  };
	  
	  graph.removeNodeViaEditor = function ( node ){
	    var propsToRemove = [];
	    var nodesToRemove = [];
	    var datatypes = 0;
	    
	    var remId;
	    
	    nodesToRemove.push(node);
	    for ( var i = 0; i < unfilteredData.properties.length; i++ ) {
	      if ( unfilteredData.properties[i].domain() === node || unfilteredData.properties[i].range() === node ) {
	        propsToRemove.push(unfilteredData.properties[i]);
	        if ( unfilteredData.properties[i].type().toLocaleLowerCase() === "owl:datatypeproperty" &&
	          unfilteredData.properties[i].range() !== node ) {
	          nodesToRemove.push(unfilteredData.properties[i].range());
	          datatypes++;
	        }
	      }
	    }
	    var removedItems = propsToRemove.length + nodesToRemove.length;
	    if ( removedItems > 2 ) {
	      var text = "You are about to delete 1 class and " + propsToRemove.length + " properties";
	      if ( datatypes !== 0 ) {
	        text = "You are about to delete 1 class, " + datatypes + " datatypes  and " + propsToRemove.length + " properties";
	      }
	      
	      
	      graph.options().warningModule().responseWarning(
	        "Removing elements",
	        text,
	        "Awaiting response!", graph.removeNodesViaResponse, [nodesToRemove, propsToRemove], false);
	      
	      
	      //
	      // if (confirm("Remove :\n"+propsToRemove.length + " properties\n"+nodesToRemove.length+" classes? ")===false){
	      //     return;
	      // }else{
	      //     // todo : store for undo delete button ;
	      // }
	    } else {
	      // splice them;
	      for ( i = 0; i < propsToRemove.length; i++ ) {
	        remId = unfilteredData.properties.indexOf(propsToRemove[i]);
	        if ( remId !== -1 )
	          unfilteredData.properties.splice(remId, 1);
	        remId = properties.indexOf(propsToRemove[i]);
	        if ( remId !== -1 )
	          properties.splice(remId, 1);
	        propsToRemove[i] = null;
	      }
	      for ( i = 0; i < nodesToRemove.length; i++ ) {
	        remId = unfilteredData.nodes.indexOf(nodesToRemove[i]);
	        if ( remId !== -1 )
	          unfilteredData.nodes.splice(remId, 1);
	        remId = classNodes.indexOf(nodesToRemove[i]);
	        if ( remId !== -1 )
	          classNodes.splice(remId, 1);
	        nodesToRemove[i] = null;
	      }
	      graph.fastUpdate();
	      generateDictionary(unfilteredData);
	      graph.getUpdateDictionary();
	      options.focuserModule().handle(undefined);
	      nodesToRemove = null;
	      propsToRemove = null;
	    }
	  };
	  
	  graph.removePropertyViaEditor = function ( property ){
	    property.domain().removePropertyElement(property);
	    property.range().removePropertyElement(property);
	    var remId;
	    
	    if ( property.type().toLocaleLowerCase() === "owl:datatypeproperty" ) {
	      var datatype = property.range();
	      remId = unfilteredData.nodes.indexOf(property.range());
	      if ( remId !== -1 )
	        unfilteredData.nodes.splice(remId, 1);
	      remId = classNodes.indexOf(property.range());
	      if ( remId !== -1 )
	        classNodes.splice(remId, 1);
	      datatype = null;
	    }
	    remId = unfilteredData.properties.indexOf(property);
	    if ( remId !== -1 )
	      unfilteredData.properties.splice(remId, 1);
	    remId = properties.indexOf(property);
	    if ( remId !== -1 )
	      properties.splice(remId, 1);
	    if ( property.inverse() ) {
	      // so we have inverse
	      property.inverse().inverse(0);
	      
	    }
	    
	    
	    hoveredPropertyElement = undefined;
	    graph.fastUpdate();
	    generateDictionary(unfilteredData);
	    graph.getUpdateDictionary();
	    options.focuserModule().handle(undefined);
	    property = null;
	  };
	  
	  graph.executeColorExternalsModule = function (){
	    options.colorExternalsModule().filter(unfilteredData.nodes, unfilteredData.properties);
	  };
	  
	  graph.executeCompactNotationModule = function (){
	    if ( unfilteredData ) {
	      options.compactNotationModule().filter(unfilteredData.nodes, unfilteredData.properties);
	    }
	    
	  };
	  graph.executeEmptyLiteralFilter = function (){
	    
	    if ( unfilteredData && unfilteredData.nodes.length > 1 ) {
	      options.literalFilter().filter(unfilteredData.nodes, unfilteredData.properties);
	      unfilteredData.nodes = options.literalFilter().filteredNodes();
	      unfilteredData.properties = options.literalFilter().filteredProperties();
	    }
	    
	  };
	  
	  
	  /** --------------------------------------------------------- **/
	  /** -- animation functions for the nodes --                   **/
	  /** --------------------------------------------------------- **/
	  
	  graph.animateDynamicLabelWidth = function (){
	    var wantedWidth = options.dynamicLabelWidth();
	    var i;
	    for ( i = 0; i < classNodes.length; i++ ) {
	      var nodeElement = classNodes[i];
	      if ( elementTools.isDatatype(nodeElement) ) {
	        nodeElement.animateDynamicLabelWidth(wantedWidth);
	      }
	    }
	    for ( i = 0; i < properties.length; i++ ) {
	      properties[i].animateDynamicLabelWidth(wantedWidth);
	    }
	  };
	  
	  
	  /** --------------------------------------------------------- **/
	  /** -- Touch behaviour functions --                   **/
	  /** --------------------------------------------------------- **/
	  
	  graph.setTouchDevice = function ( val ){
	    touchDevice = val;
	  };
	  
	  graph.isTouchDevice = function (){
	    return touchDevice;
	  };
	  
	  graph.modified_dblClickFunction = function (){
	    
	    d3.event.stopPropagation();
	    d3.event.preventDefault();
	    // get position where we want to add the node;
	    var grPos = getClickedScreenCoords(d3.event.clientX, d3.event.clientY, graph.translation(), graph.scaleFactor());
	    createNewNodeAtPosition(grPos);
	  };
	  
	  function doubletap(){
	    var touch_time = d3.event.timeStamp;
	    var numTouchers = 1;
	    if ( d3.event && d3.event.touches && d3.event.touches.length )
	      numTouchers = d3.event.touches.length;
	    
	    if ( touch_time - last_touch_time < 300 && numTouchers === 1 ) {
	      d3.event.stopPropagation();
	      if ( editMode === true ) {
	        //graph.modified_dblClickFunction();
	        d3.event.preventDefault();
	        d3.event.stopPropagation();
	        last_touch_time = touch_time;
	        return true;
	      }
	    }
	    last_touch_time = touch_time;
	    return false;
	  }
	  
	  
	  function touchzoomed(){
	    forceNotZooming = true;
	    
	    
	    var touch_time = d3.event.timeStamp;
	    if ( touch_time - last_touch_time < 300 && d3.event.touches.length === 1 ) {
	      d3.event.stopPropagation();
	      
	      if ( editMode === true ) {
	        //graph.modified_dblClickFunction();
	        d3.event.preventDefault();
	        d3.event.stopPropagation();
	        zoom.translate(graphTranslation);
	        zoom.scale(zoomFactor);
	        graph.modified_dblTouchFunction();
	      }
	      else {
	        forceNotZooming = false;
	        if ( originalD3_touchZoomFunction )
	          originalD3_touchZoomFunction();
	      }
	      return;
	    }
	    forceNotZooming = false;
	    last_touch_time = touch_time;
	    // TODO: WORK AROUND TO CHECK FOR ORIGINAL FUNCTION
	    if ( originalD3_touchZoomFunction )
	      originalD3_touchZoomFunction();
	  }
	  
	  graph.modified_dblTouchFunction = function ( d ){
	    d3.event.stopPropagation();
	    d3.event.preventDefault();
	    var xy;
	    if ( editMode === true ) {
	      xy = d3.touches(d3.selectAll(".vowlGraph").node());
	    }
	    var grPos = getClickedScreenCoords(xy[0][0], xy[0][1], graph.translation(), graph.scaleFactor());
	    createNewNodeAtPosition(grPos);
	  };
	  
	  /** --------------------------------------------------------- **/
	  /** -- Hover and Selection functions, adding edit elements --  **/
	  /** --------------------------------------------------------- **/
	  
	  graph.ignoreOtherHoverEvents = function ( val ){
	    if ( !arguments.length ) {
	      return ignoreOtherHoverEvents;
	    }
	    else  ignoreOtherHoverEvents = val;
	  };
	  
	  function delayedHiddingHoverElements( tbh ){
	    if ( tbh === true ) return;
	    if ( hoveredNodeElement ) {
	      if ( hoveredNodeElement.editingTextElement === true ) return;
	      delayedHider = setTimeout(function (){
	        deleteGroupElement.classed("hidden", true);
	        addDataPropertyGroupElement.classed("hidden", true);
	        classDragger.hideDragger(true);
	        if ( hoveredNodeElement && hoveredNodeElement.pinned() === false && graph.paused() === false && hoveredNodeElement.editingTextElement === false ) {
	          hoveredNodeElement.frozen(false);
	          hoveredNodeElement.locked(false);
	        }
	      }, 1000);
	    }
	    if ( hoveredPropertyElement ) {
	      if ( hoveredPropertyElement.editingTextElement === true ) return;
	      delayedHider = setTimeout(function (){
	        deleteGroupElement.classed("hidden", true);
	        addDataPropertyGroupElement.classed("hidden", true);
	        classDragger.hideDragger(true);
	        rangeDragger.hideDragger(true);
	        domainDragger.hideDragger(true);
	        shadowClone.hideClone(true);
	        if ( hoveredPropertyElement && hoveredPropertyElement.focused() === true && graph.options().drawPropertyDraggerOnHover() === true ) {
	          hoveredPropertyElement.labelObject().increasedLoopAngle = false;
	          // lazy update
	          recalculatePositions();
	        }
	        
	        if ( hoveredPropertyElement && hoveredPropertyElement.pinned() === false && graph.paused() === false && hoveredPropertyElement.editingTextElement === false ) {
	          hoveredPropertyElement.frozen(false);
	          hoveredPropertyElement.locked(false);
	        }
	      }, 1000);
	    }
	    
	  }
	  
	  
	  // TODO : experimental code for updating dynamic label with and its hover element
	  graph.hideHoverPropertyElementsForAnimation = function (){
	    deleteGroupElement.classed("hidden", true);
	  };
	  graph.showHoverElementsAfterAnimation = function ( property, inversed ){
	    setDeleteHoverElementPositionProperty(property, inversed);
	    deleteGroupElement.classed("hidden", false);
	    
	  };
	  
	  function editElementHoverOnHidden(){
	    classDragger.nodeElement.classed("classDraggerNodeHovered", true);
	    classDragger.nodeElement.classed("classDraggerNode", false);
	    editElementHoverOn();
	  }
	  
	  function editElementHoverOutHidden(){
	    classDragger.nodeElement.classed("classDraggerNodeHovered", false);
	    classDragger.nodeElement.classed("classDraggerNode", true);
	    editElementHoverOut();
	  }
	  
	  function editElementHoverOn( touch ){
	    if ( touch === true ) return;
	    clearTimeout(delayedHider); // ignore touch behaviour
	    
	  }
	  
	  graph.killDelayedTimer = function (){
	    clearTimeout(delayedHider);
	    clearTimeout(nodeFreezer);
	  };
	  
	  
	  function editElementHoverOut( tbh ){
	    if ( hoveredNodeElement ) {
	      if ( graph.ignoreOtherHoverEvents() === true || tbh === true || hoveredNodeElement.editingTextElement === true ) return;
	      delayedHider = setTimeout(function (){
	        if ( graph.isADraggerActive() === true ) return;
	        deleteGroupElement.classed("hidden", true);
	        addDataPropertyGroupElement.classed("hidden", true);
	        classDragger.hideDragger(true);
	        if ( hoveredNodeElement && hoveredNodeElement.pinned() === false && graph.paused() === false ) {
	          hoveredNodeElement.frozen(false);
	          hoveredNodeElement.locked(false);
	        }
	        
	      }, 1000);
	    }
	    if ( hoveredPropertyElement ) {
	      if ( graph.ignoreOtherHoverEvents() === true || tbh === true || hoveredPropertyElement.editingTextElement === true ) return;
	      delayedHider = setTimeout(function (){
	        if ( graph.isADraggerActive() === true ) return;
	        deleteGroupElement.classed("hidden", true);
	        addDataPropertyGroupElement.classed("hidden", true);
	        classDragger.hideDragger(true);
	        if ( hoveredPropertyElement && hoveredPropertyElement.pinned() === false && graph.paused() === false ) {
	          hoveredPropertyElement.frozen(false);
	          hoveredPropertyElement.locked(false);
	        }
	        
	      }, 1000);
	    }
	  }
	  
	  graph.activateHoverElementsForProperties = function ( val, property, inversed, touchBehaviour ){
	    if ( editMode === false ) return; // nothing to do;
	    
	    if ( touchBehaviour === undefined )
	      touchBehaviour = false;
	    
	    if ( val === true ) {
	      clearTimeout(delayedHider);
	      if ( hoveredPropertyElement ) {
	        if ( hoveredPropertyElement.domain() === hoveredPropertyElement.range() ) {
	          hoveredPropertyElement.labelObject().increasedLoopAngle = false;
	          recalculatePositions();
	        }
	      }
	      
	      hoveredPropertyElement = property;
	      if ( graph.options().drawPropertyDraggerOnHover() === true ) {
	        
	        
	        if ( property.type() !== "owl:DatatypeProperty" ) {
	          if ( property.domain() === property.range() ) {
	            property.labelObject().increasedLoopAngle = true;
	            recalculatePositions();
	          }
	          shadowClone.setParentProperty(property, inversed);
	          rangeDragger.setParentProperty(property, inversed);
	          rangeDragger.hideDragger(false);
	          rangeDragger.addMouseEvents();
	          domainDragger.setParentProperty(property, inversed);
	          domainDragger.hideDragger(false);
	          domainDragger.addMouseEvents();
	          
	          
	        } else if ( property.type() === "owl:DatatypeProperty" ) {
	          shadowClone.setParentProperty(property, inversed);
	          rangeDragger.setParentProperty(property, inversed);
	          rangeDragger.hideDragger(true);
	          rangeDragger.addMouseEvents();
	          domainDragger.setParentProperty(property, inversed);
	          domainDragger.hideDragger(false);
	          domainDragger.addMouseEvents();
	        }
	      }
	      else { // hide when we dont want that option
	        if ( graph.options().drawPropertyDraggerOnHover() === true ) {
	          rangeDragger.hideDragger(true);
	          domainDragger.hideDragger(true);
	          shadowClone.hideClone(true);
	          if ( property.domain() === property.range() ) {
	            property.labelObject().increasedLoopAngle = false;
	            recalculatePositions();
	          }
	        }
	      }
	      
	      if ( hoveredNodeElement ) {
	        if ( hoveredNodeElement && hoveredNodeElement.pinned() === false && graph.paused() === false ) {
	          hoveredNodeElement.frozen(false);
	          hoveredNodeElement.locked(false);
	        }
	      }
	      hoveredNodeElement = undefined;
	      deleteGroupElement.classed("hidden", false);
	      setDeleteHoverElementPositionProperty(property, inversed);
	      deleteGroupElement.selectAll("*").on("click", function (){
	        if ( touchBehaviour && property.focused() === false ) {
	          graph.options().focuserModule().handle(property);
	          return;
	        }
	        graph.removePropertyViaEditor(property);
	        d3.event.stopPropagation();
	      });
	      classDragger.hideDragger(true);
	      addDataPropertyGroupElement.classed("hidden", true);
	    } else {
	      delayedHiddingHoverElements();
	    }
	  };
	  
	  graph.updateDraggerElements = function (){
	    
	    // set opacity style for all elements
	    
	    rangeDragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    domainDragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    classDragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    
	    nodeContainer.selectAll(".superHiddenElement").classed("superOpacityElement", !graph.options().showDraggerObject());
	    labelContainer.selectAll(".superHiddenElement").classed("superOpacityElement", !graph.options().showDraggerObject());
	    
	    deleteGroupElement.selectAll(".superHiddenElement").classed("superOpacityElement", !graph.options().showDraggerObject());
	    addDataPropertyGroupElement.selectAll(".superHiddenElement").classed("superOpacityElement", !graph.options().showDraggerObject());
	    
	    
	  };
	  
	  function setAddDataPropertyHoverElementPosition( node ){
	    var delX, delY = 0;
	    if ( node.renderType() === "round" ) {
	      var scale = 0.5 * Math.sqrt(2.0);
	      var oX = scale * node.actualRadius();
	      var oY = scale * node.actualRadius();
	      delX = node.x - oX;
	      delY = node.y + oY;
	      addDataPropertyGroupElement.attr("transform", "translate(" + delX + "," + delY + ")");
	    }
	  }
	  
	  function setDeleteHoverElementPosition( node ){
	    var delX, delY = 0;
	    if ( node.renderType() === "round" ) {
	      var scale = 0.5 * Math.sqrt(2.0);
	      var oX = scale * node.actualRadius();
	      var oY = scale * node.actualRadius();
	      delX = node.x + oX;
	      delY = node.y - oY;
	    } else {
	      delX = node.x + 0.5 * node.width() + 6;
	      delY = node.y - 0.5 * node.height() - 6;
	    }
	    deleteGroupElement.attr("transform", "translate(" + delX + "," + delY + ")");
	  }
	  
	  function setDeleteHoverElementPositionProperty( property, inversed ){
	    if ( property && property.labelElement() ) {
	      var pos = [property.labelObject().x, property.labelObject().y];
	      var widthElement = parseFloat(property.getShapeElement().attr("width"));
	      var heightElement = parseFloat(property.getShapeElement().attr("height"));
	      var delX = pos[0] + 0.5 * widthElement + 6;
	      var delY = pos[1] - 0.5 * heightElement - 6;
	      // this is the lower element
	      if ( property.labelElement().attr("transform") === "translate(0,15)" )
	        delY += 15;
	      // this is upper element
	      if ( property.labelElement().attr("transform") === "translate(0,-15)" )
	        delY -= 15;
	      deleteGroupElement.attr("transform", "translate(" + delX + "," + delY + ")");
	    } else {
	      deleteGroupElement.classed("hidden", true);// hide when there is no property
	    }
	    
	    
	  }
	  
	  graph.activateHoverElements = function ( val, node, touchBehaviour ){
	    if ( editMode === false ) {
	      return; // nothing to do;
	    }
	    if ( touchBehaviour === undefined ) touchBehaviour = false;
	    if ( val === true ) {
	      if ( graph.options().drawPropertyDraggerOnHover() === true ) {
	        rangeDragger.hideDragger(true);
	        domainDragger.hideDragger(true);
	        shadowClone.hideClone(true);
	      }
	      // make them visible
	      clearTimeout(delayedHider);
	      clearTimeout(nodeFreezer);
	      if ( hoveredNodeElement && node.pinned() === false && graph.paused() === false ) {
	        hoveredNodeElement.frozen(false);
	        hoveredNodeElement.locked(false);
	      }
	      hoveredNodeElement = node;
	      if ( node && node.frozen() === false && node.pinned() === false ) {
	        node.frozen(true);
	        node.locked(false);
	      }
	      if ( hoveredPropertyElement && hoveredPropertyElement.focused() === false ) {
	        hoveredPropertyElement.labelObject().increasedLoopAngle = false;
	        recalculatePositions();
	        // update the loopAngles;
	        
	      }
	      hoveredPropertyElement = undefined;
	      deleteGroupElement.classed("hidden", false);
	      setDeleteHoverElementPosition(node);
	      
	      
	      deleteGroupElement.selectAll("*").on("click", function (){
	        if ( touchBehaviour && node.focused() === false ) {
	          graph.options().focuserModule().handle(node);
	          return;
	        }
	        graph.removeNodeViaEditor(node);
	        d3.event.stopPropagation();
	      })
	        .on("mouseover", function (){
	          editElementHoverOn(node, touchBehaviour);
	        })
	        .on("mouseout", function (){
	          editElementHoverOut(node, touchBehaviour);
	        });
	      
	      addDataPropertyGroupElement.classed("hidden", true);
	      classDragger.nodeElement.on("mouseover", editElementHoverOn)
	        .on("mouseout", editElementHoverOut);
	      classDragger.draggerObject.on("mouseover", editElementHoverOnHidden)
	        .on("mouseout", editElementHoverOutHidden);
	      
	      // add the dragger element;
	      if ( node.renderType() === "round" ) {
	        classDragger.svgRoot(draggerLayer);
	        classDragger.setParentNode(node);
	        classDragger.hideDragger(false);
	        addDataPropertyGroupElement.classed("hidden", false);
	        setAddDataPropertyHoverElementPosition(node);
	        addDataPropertyGroupElement.selectAll("*").on("click", function (){
	          if ( touchBehaviour && node.focused() === false ) {
	            graph.options().focuserModule().handle(node);
	            return;
	          }
	          graph.createDataTypeProperty(node);
	          d3.event.stopPropagation();
	        })
	          .on("mouseover", function (){
	            editElementHoverOn(node, touchBehaviour);
	          })
	          .on("mouseout", function (){
	            editElementHoverOut(node, touchBehaviour);
	          });
	      } else {
	        classDragger.hideDragger(true);
	        
	      }
	      
	    } else {
	      delayedHiddingHoverElements(node, touchBehaviour);
	      
	    }
	  };
	  
	  
	  return graph;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {/**
	 * @license
	 * Lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash core -o ./dist/lodash.core.js`
	 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	;(function() {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** Used as the semantic version number. */
	  var VERSION = '4.17.15';

	  /** Error message constants. */
	  var FUNC_ERROR_TEXT = 'Expected a function';

	  /** Used to compose bitmasks for value comparisons. */
	  var COMPARE_PARTIAL_FLAG = 1,
	      COMPARE_UNORDERED_FLAG = 2;

	  /** Used to compose bitmasks for function metadata. */
	  var WRAP_BIND_FLAG = 1,
	      WRAP_PARTIAL_FLAG = 32;

	  /** Used as references for various `Number` constants. */
	  var INFINITY = 1 / 0,
	      MAX_SAFE_INTEGER = 9007199254740991;

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      asyncTag = '[object AsyncFunction]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      genTag = '[object GeneratorFunction]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      proxyTag = '[object Proxy]',
	      regexpTag = '[object RegExp]',
	      stringTag = '[object String]';

	  /** Used to match HTML entities and HTML characters. */
	  var reUnescapedHtml = /[&<>"']/g,
	      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	  /** Used to detect unsigned integer values. */
	  var reIsUint = /^(?:0|[1-9]\d*)$/;

	  /** Used to map characters to HTML entities. */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;'
	  };

	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	  /** Detect free variable `self`. */
	  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	  /** Used as a reference to the global object. */
	  var root = freeGlobal || freeSelf || Function('return this')();

	  /** Detect free variable `exports`. */
	  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Appends the elements of `values` to `array`.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {Array} values The values to append.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayPush(array, values) {
	    array.push.apply(array, values);
	    return array;
	  }

	  /**
	   * The base implementation of `_.findIndex` and `_.findLastIndex` without
	   * support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {number} fromIndex The index to search from.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function baseFindIndex(array, predicate, fromIndex, fromRight) {
	    var length = array.length,
	        index = fromIndex + (fromRight ? 1 : -1);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (predicate(array[index], index, array)) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * The base implementation of `_.property` without support for deep paths.
	   *
	   * @private
	   * @param {string} key The key of the property to get.
	   * @returns {Function} Returns the new accessor function.
	   */
	  function baseProperty(key) {
	    return function(object) {
	      return object == null ? undefined : object[key];
	    };
	  }

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

	  /**
	   * The base implementation of `_.reduce` and `_.reduceRight`, without support
	   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} accumulator The initial value.
	   * @param {boolean} initAccum Specify using the first or last element of
	   *  `collection` as the initial value.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @returns {*} Returns the accumulated value.
	   */
	  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	    eachFunc(collection, function(value, index, collection) {
	      accumulator = initAccum
	        ? (initAccum = false, value)
	        : iteratee(accumulator, value, index, collection);
	    });
	    return accumulator;
	  }

	  /**
	   * The base implementation of `_.values` and `_.valuesIn` which creates an
	   * array of `object` property values corresponding to the property names
	   * of `props`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Array} props The property names to get values for.
	   * @returns {Object} Returns the array of property values.
	   */
	  function baseValues(object, props) {
	    return baseMap(props, function(key) {
	      return object[key];
	    });
	  }

	  /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  var escapeHtmlChar = basePropertyOf(htmlEscapes);

	  /**
	   * Creates a unary function that invokes `func` with its argument transformed.
	   *
	   * @private
	   * @param {Function} func The function to wrap.
	   * @param {Function} transform The argument transform.
	   * @returns {Function} Returns the new function.
	   */
	  function overArg(func, transform) {
	    return function(arg) {
	      return func(transform(arg));
	    };
	  }

	  /*--------------------------------------------------------------------------*/

	  /** Used for built-in method references. */
	  var arrayProto = Array.prototype,
	      objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /** Used to generate unique IDs. */
	  var idCounter = 0;

	  /**
	   * Used to resolve the
	   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	   * of values.
	   */
	  var nativeObjectToString = objectProto.toString;

	  /** Used to restore the original `_` reference in `_.noConflict`. */
	  var oldDash = root._;

	  /** Built-in value references. */
	  var objectCreate = Object.create,
	      propertyIsEnumerable = objectProto.propertyIsEnumerable;

	  /* Built-in method references for those with the same name as other `lodash` methods. */
	  var nativeIsFinite = root.isFinite,
	      nativeKeys = overArg(Object.keys, Object),
	      nativeMax = Math.max;

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a `lodash` object which wraps `value` to enable implicit method
	   * chain sequences. Methods that operate on and return arrays, collections,
	   * and functions can be chained together. Methods that retrieve a single value
	   * or may return a primitive value will automatically end the chain sequence
	   * and return the unwrapped value. Otherwise, the value must be unwrapped
	   * with `_#value`.
	   *
	   * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	   * enabled using `_.chain`.
	   *
	   * The execution of chained methods is lazy, that is, it's deferred until
	   * `_#value` is implicitly or explicitly called.
	   *
	   * Lazy evaluation allows several methods to support shortcut fusion.
	   * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	   * the creation of intermediate arrays and can greatly reduce the number of
	   * iteratee executions. Sections of a chain sequence qualify for shortcut
	   * fusion if the section is applied to an array and iteratees accept only
	   * one argument. The heuristic for whether a section qualifies for shortcut
	   * fusion is subject to change.
	   *
	   * Chaining is supported in custom builds as long as the `_#value` method is
	   * directly or indirectly included in the build.
	   *
	   * In addition to lodash methods, wrappers have `Array` and `String` methods.
	   *
	   * The wrapper `Array` methods are:
	   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	   *
	   * The wrapper `String` methods are:
	   * `replace` and `split`
	   *
	   * The wrapper methods that support shortcut fusion are:
	   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	   *
	   * The chainable wrapper methods are:
	   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	   * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	   * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	   * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	   * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	   * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	   * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	   * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	   * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	   * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	   * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	   * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	   * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	   * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	   * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	   * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	   * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	   * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	   * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	   * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	   * `zipObject`, `zipObjectDeep`, and `zipWith`
	   *
	   * The wrapper methods that are **not** chainable by default are:
	   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
	   * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
	   * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
	   * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
	   * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	   * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	   * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
	   * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
	   * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
	   * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
	   * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
	   * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
	   * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
	   * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
	   * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
	   * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	   * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
	   * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
	   * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
	   * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
	   * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
	   * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
	   * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
	   * `upperFirst`, `value`, and `words`
	   *
	   * @name _
	   * @constructor
	   * @category Seq
	   * @param {*} value The value to wrap in a `lodash` instance.
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * function square(n) {
	   *   return n * n;
	   * }
	   *
	   * var wrapped = _([1, 2, 3]);
	   *
	   * // Returns an unwrapped value.
	   * wrapped.reduce(_.add);
	   * // => 6
	   *
	   * // Returns a wrapped value.
	   * var squares = wrapped.map(square);
	   *
	   * _.isArray(squares);
	   * // => false
	   *
	   * _.isArray(squares.value());
	   * // => true
	   */
	  function lodash(value) {
	    return value instanceof LodashWrapper
	      ? value
	      : new LodashWrapper(value);
	  }

	  /**
	   * The base implementation of `_.create` without support for assigning
	   * properties to the created object.
	   *
	   * @private
	   * @param {Object} proto The object to inherit from.
	   * @returns {Object} Returns the new object.
	   */
	  var baseCreate = (function() {
	    function object() {}
	    return function(proto) {
	      if (!isObject(proto)) {
	        return {};
	      }
	      if (objectCreate) {
	        return objectCreate(proto);
	      }
	      object.prototype = proto;
	      var result = new object;
	      object.prototype = undefined;
	      return result;
	    };
	  }());

	  /**
	   * The base constructor for creating `lodash` wrapper objects.
	   *
	   * @private
	   * @param {*} value The value to wrap.
	   * @param {boolean} [chainAll] Enable explicit method chain sequences.
	   */
	  function LodashWrapper(value, chainAll) {
	    this.__wrapped__ = value;
	    this.__actions__ = [];
	    this.__chain__ = !!chainAll;
	  }

	  LodashWrapper.prototype = baseCreate(lodash.prototype);
	  LodashWrapper.prototype.constructor = LodashWrapper;

	  /*------------------------------------------------------------------------*/

	  /**
	   * Assigns `value` to `key` of `object` if the existing value is not equivalent
	   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	   * for equality comparisons.
	   *
	   * @private
	   * @param {Object} object The object to modify.
	   * @param {string} key The key of the property to assign.
	   * @param {*} value The value to assign.
	   */
	  function assignValue(object, key, value) {
	    var objValue = object[key];
	    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	        (value === undefined && !(key in object))) {
	      baseAssignValue(object, key, value);
	    }
	  }

	  /**
	   * The base implementation of `assignValue` and `assignMergeValue` without
	   * value checks.
	   *
	   * @private
	   * @param {Object} object The object to modify.
	   * @param {string} key The key of the property to assign.
	   * @param {*} value The value to assign.
	   */
	  function baseAssignValue(object, key, value) {
	    object[key] = value;
	  }

	  /**
	   * The base implementation of `_.delay` and `_.defer` which accepts `args`
	   * to provide to `func`.
	   *
	   * @private
	   * @param {Function} func The function to delay.
	   * @param {number} wait The number of milliseconds to delay invocation.
	   * @param {Array} args The arguments to provide to `func`.
	   * @returns {number|Object} Returns the timer id or timeout object.
	   */
	  function baseDelay(func, wait, args) {
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    return setTimeout(function() { func.apply(undefined, args); }, wait);
	  }

	  /**
	   * The base implementation of `_.forEach` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array|Object} Returns `collection`.
	   */
	  var baseEach = createBaseEach(baseForOwn);

	  /**
	   * The base implementation of `_.every` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if all elements pass the predicate check,
	   *  else `false`
	   */
	  function baseEvery(collection, predicate) {
	    var result = true;
	    baseEach(collection, function(value, index, collection) {
	      result = !!predicate(value, index, collection);
	      return result;
	    });
	    return result;
	  }

	  /**
	   * The base implementation of methods like `_.max` and `_.min` which accepts a
	   * `comparator` to determine the extremum value.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The iteratee invoked per iteration.
	   * @param {Function} comparator The comparator used to compare values.
	   * @returns {*} Returns the extremum value.
	   */
	  function baseExtremum(array, iteratee, comparator) {
	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      var value = array[index],
	          current = iteratee(value);

	      if (current != null && (computed === undefined
	            ? (current === current && !false)
	            : comparator(current, computed)
	          )) {
	        var computed = current,
	            result = value;
	      }
	    }
	    return result;
	  }

	  /**
	   * The base implementation of `_.filter` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   */
	  function baseFilter(collection, predicate) {
	    var result = [];
	    baseEach(collection, function(value, index, collection) {
	      if (predicate(value, index, collection)) {
	        result.push(value);
	      }
	    });
	    return result;
	  }

	  /**
	   * The base implementation of `_.flatten` with support for restricting flattening.
	   *
	   * @private
	   * @param {Array} array The array to flatten.
	   * @param {number} depth The maximum recursion depth.
	   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	   * @param {Array} [result=[]] The initial result value.
	   * @returns {Array} Returns the new flattened array.
	   */
	  function baseFlatten(array, depth, predicate, isStrict, result) {
	    var index = -1,
	        length = array.length;

	    predicate || (predicate = isFlattenable);
	    result || (result = []);

	    while (++index < length) {
	      var value = array[index];
	      if (depth > 0 && predicate(value)) {
	        if (depth > 1) {
	          // Recursively flatten arrays (susceptible to call stack limits).
	          baseFlatten(value, depth - 1, predicate, isStrict, result);
	        } else {
	          arrayPush(result, value);
	        }
	      } else if (!isStrict) {
	        result[result.length] = value;
	      }
	    }
	    return result;
	  }

	  /**
	   * The base implementation of `baseForOwn` which iterates over `object`
	   * properties returned by `keysFunc` and invokes `iteratee` for each property.
	   * Iteratee functions may exit iteration early by explicitly returning `false`.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {Function} keysFunc The function to get the keys of `object`.
	   * @returns {Object} Returns `object`.
	   */
	  var baseFor = createBaseFor();

	  /**
	   * The base implementation of `_.forOwn` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Object} Returns `object`.
	   */
	  function baseForOwn(object, iteratee) {
	    return object && baseFor(object, iteratee, keys);
	  }

	  /**
	   * The base implementation of `_.functions` which creates an array of
	   * `object` function property names filtered from `props`.
	   *
	   * @private
	   * @param {Object} object The object to inspect.
	   * @param {Array} props The property names to filter.
	   * @returns {Array} Returns the function names.
	   */
	  function baseFunctions(object, props) {
	    return baseFilter(props, function(key) {
	      return isFunction(object[key]);
	    });
	  }

	  /**
	   * The base implementation of `getTag` without fallbacks for buggy environments.
	   *
	   * @private
	   * @param {*} value The value to query.
	   * @returns {string} Returns the `toStringTag`.
	   */
	  function baseGetTag(value) {
	    return objectToString(value);
	  }

	  /**
	   * The base implementation of `_.gt` which doesn't coerce arguments.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if `value` is greater than `other`,
	   *  else `false`.
	   */
	  function baseGt(value, other) {
	    return value > other;
	  }

	  /**
	   * The base implementation of `_.isArguments`.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	   */
	  var baseIsArguments = noop;

	  /**
	   * The base implementation of `_.isDate` without Node.js optimizations.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
	   */
	  function baseIsDate(value) {
	    return isObjectLike(value) && baseGetTag(value) == dateTag;
	  }

	  /**
	   * The base implementation of `_.isEqual` which supports partial comparisons
	   * and tracks traversed objects.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @param {boolean} bitmask The bitmask flags.
	   *  1 - Unordered comparison
	   *  2 - Partial comparison
	   * @param {Function} [customizer] The function to customize comparisons.
	   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	   */
	  function baseIsEqual(value, other, bitmask, customizer, stack) {
	    if (value === other) {
	      return true;
	    }
	    if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	      return value !== value && other !== other;
	    }
	    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	  }

	  /**
	   * A specialized version of `baseIsEqual` for arrays and objects which performs
	   * deep comparisons and tracks traversed objects enabling objects with circular
	   * references to be compared.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	   * @param {Function} customizer The function to customize comparisons.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	    var objIsArr = isArray(object),
	        othIsArr = isArray(other),
	        objTag = objIsArr ? arrayTag : baseGetTag(object),
	        othTag = othIsArr ? arrayTag : baseGetTag(other);

	    objTag = objTag == argsTag ? objectTag : objTag;
	    othTag = othTag == argsTag ? objectTag : othTag;

	    var objIsObj = objTag == objectTag,
	        othIsObj = othTag == objectTag,
	        isSameTag = objTag == othTag;

	    stack || (stack = []);
	    var objStack = find(stack, function(entry) {
	      return entry[0] == object;
	    });
	    var othStack = find(stack, function(entry) {
	      return entry[0] == other;
	    });
	    if (objStack && othStack) {
	      return objStack[1] == other;
	    }
	    stack.push([object, other]);
	    stack.push([other, object]);
	    if (isSameTag && !objIsObj) {
	      var result = (objIsArr)
	        ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	        : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	      stack.pop();
	      return result;
	    }
	    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	      if (objIsWrapped || othIsWrapped) {
	        var objUnwrapped = objIsWrapped ? object.value() : object,
	            othUnwrapped = othIsWrapped ? other.value() : other;

	        var result = equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	        stack.pop();
	        return result;
	      }
	    }
	    if (!isSameTag) {
	      return false;
	    }
	    var result = equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	    stack.pop();
	    return result;
	  }

	  /**
	   * The base implementation of `_.isRegExp` without Node.js optimizations.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
	   */
	  function baseIsRegExp(value) {
	    return isObjectLike(value) && baseGetTag(value) == regexpTag;
	  }

	  /**
	   * The base implementation of `_.iteratee`.
	   *
	   * @private
	   * @param {*} [value=_.identity] The value to convert to an iteratee.
	   * @returns {Function} Returns the iteratee.
	   */
	  function baseIteratee(func) {
	    if (typeof func == 'function') {
	      return func;
	    }
	    if (func == null) {
	      return identity;
	    }
	    return (typeof func == 'object' ? baseMatches : baseProperty)(func);
	  }

	  /**
	   * The base implementation of `_.lt` which doesn't coerce arguments.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if `value` is less than `other`,
	   *  else `false`.
	   */
	  function baseLt(value, other) {
	    return value < other;
	  }

	  /**
	   * The base implementation of `_.map` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   */
	  function baseMap(collection, iteratee) {
	    var index = -1,
	        result = isArrayLike(collection) ? Array(collection.length) : [];

	    baseEach(collection, function(value, key, collection) {
	      result[++index] = iteratee(value, key, collection);
	    });
	    return result;
	  }

	  /**
	   * The base implementation of `_.matches` which doesn't clone `source`.
	   *
	   * @private
	   * @param {Object} source The object of property values to match.
	   * @returns {Function} Returns the new spec function.
	   */
	  function baseMatches(source) {
	    var props = nativeKeys(source);
	    return function(object) {
	      var length = props.length;
	      if (object == null) {
	        return !length;
	      }
	      object = Object(object);
	      while (length--) {
	        var key = props[length];
	        if (!(key in object &&
	              baseIsEqual(source[key], object[key], COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG)
	            )) {
	          return false;
	        }
	      }
	      return true;
	    };
	  }

	  /**
	   * The base implementation of `_.pick` without support for individual
	   * property identifiers.
	   *
	   * @private
	   * @param {Object} object The source object.
	   * @param {string[]} paths The property paths to pick.
	   * @returns {Object} Returns the new object.
	   */
	  function basePick(object, props) {
	    object = Object(object);
	    return reduce(props, function(result, key) {
	      if (key in object) {
	        result[key] = object[key];
	      }
	      return result;
	    }, {});
	  }

	  /**
	   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	   *
	   * @private
	   * @param {Function} func The function to apply a rest parameter to.
	   * @param {number} [start=func.length-1] The start position of the rest parameter.
	   * @returns {Function} Returns the new function.
	   */
	  function baseRest(func, start) {
	    return setToString(overRest(func, start, identity), func + '');
	  }

	  /**
	   * The base implementation of `_.slice` without an iteratee call guard.
	   *
	   * @private
	   * @param {Array} array The array to slice.
	   * @param {number} [start=0] The start position.
	   * @param {number} [end=array.length] The end position.
	   * @returns {Array} Returns the slice of `array`.
	   */
	  function baseSlice(array, start, end) {
	    var index = -1,
	        length = array.length;

	    if (start < 0) {
	      start = -start > length ? 0 : (length + start);
	    }
	    end = end > length ? length : end;
	    if (end < 0) {
	      end += length;
	    }
	    length = start > end ? 0 : ((end - start) >>> 0);
	    start >>>= 0;

	    var result = Array(length);
	    while (++index < length) {
	      result[index] = array[index + start];
	    }
	    return result;
	  }

	  /**
	   * Copies the values of `source` to `array`.
	   *
	   * @private
	   * @param {Array} source The array to copy values from.
	   * @param {Array} [array=[]] The array to copy values to.
	   * @returns {Array} Returns `array`.
	   */
	  function copyArray(source) {
	    return baseSlice(source, 0, source.length);
	  }

	  /**
	   * The base implementation of `_.some` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if any element passes the predicate check,
	   *  else `false`.
	   */
	  function baseSome(collection, predicate) {
	    var result;

	    baseEach(collection, function(value, index, collection) {
	      result = predicate(value, index, collection);
	      return !result;
	    });
	    return !!result;
	  }

	  /**
	   * The base implementation of `wrapperValue` which returns the result of
	   * performing a sequence of actions on the unwrapped `value`, where each
	   * successive action is supplied the return value of the previous.
	   *
	   * @private
	   * @param {*} value The unwrapped value.
	   * @param {Array} actions Actions to perform to resolve the unwrapped value.
	   * @returns {*} Returns the resolved value.
	   */
	  function baseWrapperValue(value, actions) {
	    var result = value;
	    return reduce(actions, function(result, action) {
	      return action.func.apply(action.thisArg, arrayPush([result], action.args));
	    }, result);
	  }

	  /**
	   * Compares values to sort them in ascending order.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {number} Returns the sort order indicator for `value`.
	   */
	  function compareAscending(value, other) {
	    if (value !== other) {
	      var valIsDefined = value !== undefined,
	          valIsNull = value === null,
	          valIsReflexive = value === value,
	          valIsSymbol = false;

	      var othIsDefined = other !== undefined,
	          othIsNull = other === null,
	          othIsReflexive = other === other,
	          othIsSymbol = false;

	      if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
	          (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
	          (valIsNull && othIsDefined && othIsReflexive) ||
	          (!valIsDefined && othIsReflexive) ||
	          !valIsReflexive) {
	        return 1;
	      }
	      if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
	          (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
	          (othIsNull && valIsDefined && valIsReflexive) ||
	          (!othIsDefined && valIsReflexive) ||
	          !othIsReflexive) {
	        return -1;
	      }
	    }
	    return 0;
	  }

	  /**
	   * Copies properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Array} props The property identifiers to copy.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @param {Function} [customizer] The function to customize copied values.
	   * @returns {Object} Returns `object`.
	   */
	  function copyObject(source, props, object, customizer) {
	    var isNew = !object;
	    object || (object = {});

	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];

	      var newValue = customizer
	        ? customizer(object[key], source[key], key, object, source)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = source[key];
	      }
	      if (isNew) {
	        baseAssignValue(object, key, newValue);
	      } else {
	        assignValue(object, key, newValue);
	      }
	    }
	    return object;
	  }

	  /**
	   * Creates a function like `_.assign`.
	   *
	   * @private
	   * @param {Function} assigner The function to assign values.
	   * @returns {Function} Returns the new assigner function.
	   */
	  function createAssigner(assigner) {
	    return baseRest(function(object, sources) {
	      var index = -1,
	          length = sources.length,
	          customizer = length > 1 ? sources[length - 1] : undefined;

	      customizer = (assigner.length > 3 && typeof customizer == 'function')
	        ? (length--, customizer)
	        : undefined;

	      object = Object(object);
	      while (++index < length) {
	        var source = sources[index];
	        if (source) {
	          assigner(object, source, index, customizer);
	        }
	      }
	      return object;
	    });
	  }

	  /**
	   * Creates a `baseEach` or `baseEachRight` function.
	   *
	   * @private
	   * @param {Function} eachFunc The function to iterate over a collection.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {Function} Returns the new base function.
	   */
	  function createBaseEach(eachFunc, fromRight) {
	    return function(collection, iteratee) {
	      if (collection == null) {
	        return collection;
	      }
	      if (!isArrayLike(collection)) {
	        return eachFunc(collection, iteratee);
	      }
	      var length = collection.length,
	          index = fromRight ? length : -1,
	          iterable = Object(collection);

	      while ((fromRight ? index-- : ++index < length)) {
	        if (iteratee(iterable[index], index, iterable) === false) {
	          break;
	        }
	      }
	      return collection;
	    };
	  }

	  /**
	   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	   *
	   * @private
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {Function} Returns the new base function.
	   */
	  function createBaseFor(fromRight) {
	    return function(object, iteratee, keysFunc) {
	      var index = -1,
	          iterable = Object(object),
	          props = keysFunc(object),
	          length = props.length;

	      while (length--) {
	        var key = props[fromRight ? length : ++index];
	        if (iteratee(iterable[key], key, iterable) === false) {
	          break;
	        }
	      }
	      return object;
	    };
	  }

	  /**
	   * Creates a function that produces an instance of `Ctor` regardless of
	   * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	   *
	   * @private
	   * @param {Function} Ctor The constructor to wrap.
	   * @returns {Function} Returns the new wrapped function.
	   */
	  function createCtor(Ctor) {
	    return function() {
	      // Use a `switch` statement to work with class constructors. See
	      // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	      // for more details.
	      var args = arguments;
	      var thisBinding = baseCreate(Ctor.prototype),
	          result = Ctor.apply(thisBinding, args);

	      // Mimic the constructor's `return` behavior.
	      // See https://es5.github.io/#x13.2.2 for more details.
	      return isObject(result) ? result : thisBinding;
	    };
	  }

	  /**
	   * Creates a `_.find` or `_.findLast` function.
	   *
	   * @private
	   * @param {Function} findIndexFunc The function to find the collection index.
	   * @returns {Function} Returns the new find function.
	   */
	  function createFind(findIndexFunc) {
	    return function(collection, predicate, fromIndex) {
	      var iterable = Object(collection);
	      if (!isArrayLike(collection)) {
	        var iteratee = baseIteratee(predicate, 3);
	        collection = keys(collection);
	        predicate = function(key) { return iteratee(iterable[key], key, iterable); };
	      }
	      var index = findIndexFunc(collection, predicate, fromIndex);
	      return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	    };
	  }

	  /**
	   * Creates a function that wraps `func` to invoke it with the `this` binding
	   * of `thisArg` and `partials` prepended to the arguments it receives.
	   *
	   * @private
	   * @param {Function} func The function to wrap.
	   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {Array} partials The arguments to prepend to those provided to
	   *  the new function.
	   * @returns {Function} Returns the new wrapped function.
	   */
	  function createPartial(func, bitmask, thisArg, partials) {
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    var isBind = bitmask & WRAP_BIND_FLAG,
	        Ctor = createCtor(func);

	    function wrapper() {
	      var argsIndex = -1,
	          argsLength = arguments.length,
	          leftIndex = -1,
	          leftLength = partials.length,
	          args = Array(leftLength + argsLength),
	          fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

	      while (++leftIndex < leftLength) {
	        args[leftIndex] = partials[leftIndex];
	      }
	      while (argsLength--) {
	        args[leftIndex++] = arguments[++argsIndex];
	      }
	      return fn.apply(isBind ? thisArg : this, args);
	    }
	    return wrapper;
	  }

	  /**
	   * A specialized version of `baseIsEqualDeep` for arrays with support for
	   * partial deep comparisons.
	   *
	   * @private
	   * @param {Array} array The array to compare.
	   * @param {Array} other The other array to compare.
	   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	   * @param {Function} customizer The function to customize comparisons.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Object} stack Tracks traversed `array` and `other` objects.
	   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	   */
	  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	        arrLength = array.length,
	        othLength = other.length;

	    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	      return false;
	    }
	    var index = -1,
	        result = true,
	        seen = (bitmask & COMPARE_UNORDERED_FLAG) ? [] : undefined;

	    // Ignore non-index properties.
	    while (++index < arrLength) {
	      var arrValue = array[index],
	          othValue = other[index];

	      var compared;
	      if (compared !== undefined) {
	        if (compared) {
	          continue;
	        }
	        result = false;
	        break;
	      }
	      // Recursively compare arrays (susceptible to call stack limits).
	      if (seen) {
	        if (!baseSome(other, function(othValue, othIndex) {
	              if (!indexOf(seen, othIndex) &&
	                  (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	                return seen.push(othIndex);
	              }
	            })) {
	          result = false;
	          break;
	        }
	      } else if (!(
	            arrValue === othValue ||
	              equalFunc(arrValue, othValue, bitmask, customizer, stack)
	          )) {
	        result = false;
	        break;
	      }
	    }
	    return result;
	  }

	  /**
	   * A specialized version of `baseIsEqualDeep` for comparing objects of
	   * the same `toStringTag`.
	   *
	   * **Note:** This function only supports comparing values with tags of
	   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {string} tag The `toStringTag` of the objects to compare.
	   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	   * @param {Function} customizer The function to customize comparisons.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Object} stack Tracks traversed `object` and `other` objects.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	    switch (tag) {

	      case boolTag:
	      case dateTag:
	      case numberTag:
	        // Coerce booleans to `1` or `0` and dates to milliseconds.
	        // Invalid dates are coerced to `NaN`.
	        return eq(+object, +other);

	      case errorTag:
	        return object.name == other.name && object.message == other.message;

	      case regexpTag:
	      case stringTag:
	        // Coerce regexes to strings and treat strings, primitives and objects,
	        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	        // for more details.
	        return object == (other + '');

	    }
	    return false;
	  }

	  /**
	   * A specialized version of `baseIsEqualDeep` for objects with support for
	   * partial deep comparisons.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	   * @param {Function} customizer The function to customize comparisons.
	   * @param {Function} equalFunc The function to determine equivalents of values.
	   * @param {Object} stack Tracks traversed `object` and `other` objects.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	        objProps = keys(object),
	        objLength = objProps.length,
	        othProps = keys(other),
	        othLength = othProps.length;

	    if (objLength != othLength && !isPartial) {
	      return false;
	    }
	    var index = objLength;
	    while (index--) {
	      var key = objProps[index];
	      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	        return false;
	      }
	    }
	    var result = true;

	    var skipCtor = isPartial;
	    while (++index < objLength) {
	      key = objProps[index];
	      var objValue = object[key],
	          othValue = other[key];

	      var compared;
	      // Recursively compare objects (susceptible to call stack limits).
	      if (!(compared === undefined
	            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	            : compared
	          )) {
	        result = false;
	        break;
	      }
	      skipCtor || (skipCtor = key == 'constructor');
	    }
	    if (result && !skipCtor) {
	      var objCtor = object.constructor,
	          othCtor = other.constructor;

	      // Non `Object` object instances with different constructors are not equal.
	      if (objCtor != othCtor &&
	          ('constructor' in object && 'constructor' in other) &&
	          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	        result = false;
	      }
	    }
	    return result;
	  }

	  /**
	   * A specialized version of `baseRest` which flattens the rest array.
	   *
	   * @private
	   * @param {Function} func The function to apply a rest parameter to.
	   * @returns {Function} Returns the new function.
	   */
	  function flatRest(func) {
	    return setToString(overRest(func, undefined, flatten), func + '');
	  }

	  /**
	   * Checks if `value` is a flattenable `arguments` object or array.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	   */
	  function isFlattenable(value) {
	    return isArray(value) || isArguments(value);
	  }

	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    var type = typeof value;
	    length = length == null ? MAX_SAFE_INTEGER : length;

	    return !!length &&
	      (type == 'number' ||
	        (type != 'symbol' && reIsUint.test(value))) &&
	          (value > -1 && value % 1 == 0 && value < length);
	  }

	  /**
	   * Checks if the given arguments are from an iteratee call.
	   *
	   * @private
	   * @param {*} value The potential iteratee value argument.
	   * @param {*} index The potential iteratee index or key argument.
	   * @param {*} object The potential iteratee object argument.
	   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	   *  else `false`.
	   */
	  function isIterateeCall(value, index, object) {
	    if (!isObject(object)) {
	      return false;
	    }
	    var type = typeof index;
	    if (type == 'number'
	          ? (isArrayLike(object) && isIndex(index, object.length))
	          : (type == 'string' && index in object)
	        ) {
	      return eq(object[index], value);
	    }
	    return false;
	  }

	  /**
	   * This function is like
	   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	   * except that it includes inherited enumerable properties.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   */
	  function nativeKeysIn(object) {
	    var result = [];
	    if (object != null) {
	      for (var key in Object(object)) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

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

	  /**
	   * A specialized version of `baseRest` which transforms the rest array.
	   *
	   * @private
	   * @param {Function} func The function to apply a rest parameter to.
	   * @param {number} [start=func.length-1] The start position of the rest parameter.
	   * @param {Function} transform The rest array transform.
	   * @returns {Function} Returns the new function.
	   */
	  function overRest(func, start, transform) {
	    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	    return function() {
	      var args = arguments,
	          index = -1,
	          length = nativeMax(args.length - start, 0),
	          array = Array(length);

	      while (++index < length) {
	        array[index] = args[start + index];
	      }
	      index = -1;
	      var otherArgs = Array(start + 1);
	      while (++index < start) {
	        otherArgs[index] = args[index];
	      }
	      otherArgs[start] = transform(array);
	      return func.apply(this, otherArgs);
	    };
	  }

	  /**
	   * Sets the `toString` method of `func` to return `string`.
	   *
	   * @private
	   * @param {Function} func The function to modify.
	   * @param {Function} string The `toString` result.
	   * @returns {Function} Returns `func`.
	   */
	  var setToString = identity;

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates an array with all falsey values removed. The values `false`, `null`,
	   * `0`, `""`, `undefined`, and `NaN` are falsey.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Array
	   * @param {Array} array The array to compact.
	   * @returns {Array} Returns the new array of filtered values.
	   * @example
	   *
	   * _.compact([0, 1, false, 2, '', 3]);
	   * // => [1, 2, 3]
	   */
	  function compact(array) {
	    return baseFilter(array, Boolean);
	  }

	  /**
	   * Creates a new array concatenating `array` with any additional arrays
	   * and/or values.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Array
	   * @param {Array} array The array to concatenate.
	   * @param {...*} [values] The values to concatenate.
	   * @returns {Array} Returns the new concatenated array.
	   * @example
	   *
	   * var array = [1];
	   * var other = _.concat(array, 2, [3], [[4]]);
	   *
	   * console.log(other);
	   * // => [1, 2, 3, [4]]
	   *
	   * console.log(array);
	   * // => [1]
	   */
	  function concat() {
	    var length = arguments.length;
	    if (!length) {
	      return [];
	    }
	    var args = Array(length - 1),
	        array = arguments[0],
	        index = length;

	    while (index--) {
	      args[index - 1] = arguments[index];
	    }
	    return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
	  }

	  /**
	   * This method is like `_.find` except that it returns the index of the first
	   * element `predicate` returns truthy for instead of the element itself.
	   *
	   * @static
	   * @memberOf _
	   * @since 1.1.0
	   * @category Array
	   * @param {Array} array The array to inspect.
	   * @param {Function} [predicate=_.identity] The function invoked per iteration.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {number} Returns the index of the found element, else `-1`.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney',  'active': false },
	   *   { 'user': 'fred',    'active': false },
	   *   { 'user': 'pebbles', 'active': true }
	   * ];
	   *
	   * _.findIndex(users, function(o) { return o.user == 'barney'; });
	   * // => 0
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.findIndex(users, { 'user': 'fred', 'active': false });
	   * // => 1
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.findIndex(users, ['active', false]);
	   * // => 0
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.findIndex(users, 'active');
	   * // => 2
	   */
	  function findIndex(array, predicate, fromIndex) {
	    var length = array == null ? 0 : array.length;
	    if (!length) {
	      return -1;
	    }
	    var index = fromIndex == null ? 0 : toInteger(fromIndex);
	    if (index < 0) {
	      index = nativeMax(length + index, 0);
	    }
	    return baseFindIndex(array, baseIteratee(predicate, 3), index);
	  }

	  /**
	   * Flattens `array` a single level deep.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Array
	   * @param {Array} array The array to flatten.
	   * @returns {Array} Returns the new flattened array.
	   * @example
	   *
	   * _.flatten([1, [2, [3, [4]], 5]]);
	   * // => [1, 2, [3, [4]], 5]
	   */
	  function flatten(array) {
	    var length = array == null ? 0 : array.length;
	    return length ? baseFlatten(array, 1) : [];
	  }

	  /**
	   * Recursively flattens `array`.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Array
	   * @param {Array} array The array to flatten.
	   * @returns {Array} Returns the new flattened array.
	   * @example
	   *
	   * _.flattenDeep([1, [2, [3, [4]], 5]]);
	   * // => [1, 2, 3, 4, 5]
	   */
	  function flattenDeep(array) {
	    var length = array == null ? 0 : array.length;
	    return length ? baseFlatten(array, INFINITY) : [];
	  }

	  /**
	   * Gets the first element of `array`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @alias first
	   * @category Array
	   * @param {Array} array The array to query.
	   * @returns {*} Returns the first element of `array`.
	   * @example
	   *
	   * _.head([1, 2, 3]);
	   * // => 1
	   *
	   * _.head([]);
	   * // => undefined
	   */
	  function head(array) {
	    return (array && array.length) ? array[0] : undefined;
	  }

	  /**
	   * Gets the index at which the first occurrence of `value` is found in `array`
	   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	   * for equality comparisons. If `fromIndex` is negative, it's used as the
	   * offset from the end of `array`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Array
	   * @param {Array} array The array to inspect.
	   * @param {*} value The value to search for.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   * @example
	   *
	   * _.indexOf([1, 2, 1, 2], 2);
	   * // => 1
	   *
	   * // Search from the `fromIndex`.
	   * _.indexOf([1, 2, 1, 2], 2, 2);
	   * // => 3
	   */
	  function indexOf(array, value, fromIndex) {
	    var length = array == null ? 0 : array.length;
	    if (typeof fromIndex == 'number') {
	      fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
	    } else {
	      fromIndex = 0;
	    }
	    var index = (fromIndex || 0) - 1,
	        isReflexive = value === value;

	    while (++index < length) {
	      var other = array[index];
	      if ((isReflexive ? other === value : other !== other)) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * Gets the last element of `array`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Array
	   * @param {Array} array The array to query.
	   * @returns {*} Returns the last element of `array`.
	   * @example
	   *
	   * _.last([1, 2, 3]);
	   * // => 3
	   */
	  function last(array) {
	    var length = array == null ? 0 : array.length;
	    return length ? array[length - 1] : undefined;
	  }

	  /**
	   * Creates a slice of `array` from `start` up to, but not including, `end`.
	   *
	   * **Note:** This method is used instead of
	   * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
	   * returned.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Array
	   * @param {Array} array The array to slice.
	   * @param {number} [start=0] The start position.
	   * @param {number} [end=array.length] The end position.
	   * @returns {Array} Returns the slice of `array`.
	   */
	  function slice(array, start, end) {
	    var length = array == null ? 0 : array.length;
	    start = start == null ? 0 : +start;
	    end = end === undefined ? length : +end;
	    return length ? baseSlice(array, start, end) : [];
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a `lodash` wrapper instance that wraps `value` with explicit method
	   * chain sequences enabled. The result of such sequences must be unwrapped
	   * with `_#value`.
	   *
	   * @static
	   * @memberOf _
	   * @since 1.3.0
	   * @category Seq
	   * @param {*} value The value to wrap.
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney',  'age': 36 },
	   *   { 'user': 'fred',    'age': 40 },
	   *   { 'user': 'pebbles', 'age': 1 }
	   * ];
	   *
	   * var youngest = _
	   *   .chain(users)
	   *   .sortBy('age')
	   *   .map(function(o) {
	   *     return o.user + ' is ' + o.age;
	   *   })
	   *   .head()
	   *   .value();
	   * // => 'pebbles is 1'
	   */
	  function chain(value) {
	    var result = lodash(value);
	    result.__chain__ = true;
	    return result;
	  }

	  /**
	   * This method invokes `interceptor` and returns `value`. The interceptor
	   * is invoked with one argument; (value). The purpose of this method is to
	   * "tap into" a method chain sequence in order to modify intermediate results.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Seq
	   * @param {*} value The value to provide to `interceptor`.
	   * @param {Function} interceptor The function to invoke.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * _([1, 2, 3])
	   *  .tap(function(array) {
	   *    // Mutate input array.
	   *    array.pop();
	   *  })
	   *  .reverse()
	   *  .value();
	   * // => [2, 1]
	   */
	  function tap(value, interceptor) {
	    interceptor(value);
	    return value;
	  }

	  /**
	   * This method is like `_.tap` except that it returns the result of `interceptor`.
	   * The purpose of this method is to "pass thru" values replacing intermediate
	   * results in a method chain sequence.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Seq
	   * @param {*} value The value to provide to `interceptor`.
	   * @param {Function} interceptor The function to invoke.
	   * @returns {*} Returns the result of `interceptor`.
	   * @example
	   *
	   * _('  abc  ')
	   *  .chain()
	   *  .trim()
	   *  .thru(function(value) {
	   *    return [value];
	   *  })
	   *  .value();
	   * // => ['abc']
	   */
	  function thru(value, interceptor) {
	    return interceptor(value);
	  }

	  /**
	   * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
	   *
	   * @name chain
	   * @memberOf _
	   * @since 0.1.0
	   * @category Seq
	   * @returns {Object} Returns the new `lodash` wrapper instance.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36 },
	   *   { 'user': 'fred',   'age': 40 }
	   * ];
	   *
	   * // A sequence without explicit chaining.
	   * _(users).head();
	   * // => { 'user': 'barney', 'age': 36 }
	   *
	   * // A sequence with explicit chaining.
	   * _(users)
	   *   .chain()
	   *   .head()
	   *   .pick('user')
	   *   .value();
	   * // => { 'user': 'barney' }
	   */
	  function wrapperChain() {
	    return chain(this);
	  }

	  /**
	   * Executes the chain sequence to resolve the unwrapped value.
	   *
	   * @name value
	   * @memberOf _
	   * @since 0.1.0
	   * @alias toJSON, valueOf
	   * @category Seq
	   * @returns {*} Returns the resolved unwrapped value.
	   * @example
	   *
	   * _([1, 2, 3]).value();
	   * // => [1, 2, 3]
	   */
	  function wrapperValue() {
	    return baseWrapperValue(this.__wrapped__, this.__actions__);
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Checks if `predicate` returns truthy for **all** elements of `collection`.
	   * Iteration is stopped once `predicate` returns falsey. The predicate is
	   * invoked with three arguments: (value, index|key, collection).
	   *
	   * **Note:** This method returns `true` for
	   * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
	   * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
	   * elements of empty collections.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [predicate=_.identity] The function invoked per iteration.
	   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	   * @returns {boolean} Returns `true` if all elements pass the predicate check,
	   *  else `false`.
	   * @example
	   *
	   * _.every([true, 1, null, 'yes'], Boolean);
	   * // => false
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36, 'active': false },
	   *   { 'user': 'fred',   'age': 40, 'active': false }
	   * ];
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.every(users, { 'user': 'barney', 'active': false });
	   * // => false
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.every(users, ['active', false]);
	   * // => true
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.every(users, 'active');
	   * // => false
	   */
	  function every(collection, predicate, guard) {
	    predicate = guard ? undefined : predicate;
	    return baseEvery(collection, baseIteratee(predicate));
	  }

	  /**
	   * Iterates over elements of `collection`, returning an array of all elements
	   * `predicate` returns truthy for. The predicate is invoked with three
	   * arguments: (value, index|key, collection).
	   *
	   * **Note:** Unlike `_.remove`, this method returns a new array.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [predicate=_.identity] The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   * @see _.reject
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36, 'active': true },
	   *   { 'user': 'fred',   'age': 40, 'active': false }
	   * ];
	   *
	   * _.filter(users, function(o) { return !o.active; });
	   * // => objects for ['fred']
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.filter(users, { 'age': 36, 'active': true });
	   * // => objects for ['barney']
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.filter(users, ['active', false]);
	   * // => objects for ['fred']
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.filter(users, 'active');
	   * // => objects for ['barney']
	   */
	  function filter(collection, predicate) {
	    return baseFilter(collection, baseIteratee(predicate));
	  }

	  /**
	   * Iterates over elements of `collection`, returning the first element
	   * `predicate` returns truthy for. The predicate is invoked with three
	   * arguments: (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to inspect.
	   * @param {Function} [predicate=_.identity] The function invoked per iteration.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {*} Returns the matched element, else `undefined`.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney',  'age': 36, 'active': true },
	   *   { 'user': 'fred',    'age': 40, 'active': false },
	   *   { 'user': 'pebbles', 'age': 1,  'active': true }
	   * ];
	   *
	   * _.find(users, function(o) { return o.age < 40; });
	   * // => object for 'barney'
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.find(users, { 'age': 1, 'active': true });
	   * // => object for 'pebbles'
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.find(users, ['active', false]);
	   * // => object for 'fred'
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.find(users, 'active');
	   * // => object for 'barney'
	   */
	  var find = createFind(findIndex);

	  /**
	   * Iterates over elements of `collection` and invokes `iteratee` for each element.
	   * The iteratee is invoked with three arguments: (value, index|key, collection).
	   * Iteratee functions may exit iteration early by explicitly returning `false`.
	   *
	   * **Note:** As with other "Collections" methods, objects with a "length"
	   * property are iterated like arrays. To avoid this behavior use `_.forIn`
	   * or `_.forOwn` for object iteration.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @alias each
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	   * @returns {Array|Object} Returns `collection`.
	   * @see _.forEachRight
	   * @example
	   *
	   * _.forEach([1, 2], function(value) {
	   *   console.log(value);
	   * });
	   * // => Logs `1` then `2`.
	   *
	   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	   *   console.log(key);
	   * });
	   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	   */
	  function forEach(collection, iteratee) {
	    return baseEach(collection, baseIteratee(iteratee));
	  }

	  /**
	   * Creates an array of values by running each element in `collection` thru
	   * `iteratee`. The iteratee is invoked with three arguments:
	   * (value, index|key, collection).
	   *
	   * Many lodash methods are guarded to work as iteratees for methods like
	   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	   *
	   * The guarded methods are:
	   * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	   * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	   * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	   * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   * @example
	   *
	   * function square(n) {
	   *   return n * n;
	   * }
	   *
	   * _.map([4, 8], square);
	   * // => [16, 64]
	   *
	   * _.map({ 'a': 4, 'b': 8 }, square);
	   * // => [16, 64] (iteration order is not guaranteed)
	   *
	   * var users = [
	   *   { 'user': 'barney' },
	   *   { 'user': 'fred' }
	   * ];
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.map(users, 'user');
	   * // => ['barney', 'fred']
	   */
	  function map(collection, iteratee) {
	    return baseMap(collection, baseIteratee(iteratee));
	  }

	  /**
	   * Reduces `collection` to a value which is the accumulated result of running
	   * each element in `collection` thru `iteratee`, where each successive
	   * invocation is supplied the return value of the previous. If `accumulator`
	   * is not given, the first element of `collection` is used as the initial
	   * value. The iteratee is invoked with four arguments:
	   * (accumulator, value, index|key, collection).
	   *
	   * Many lodash methods are guarded to work as iteratees for methods like
	   * `_.reduce`, `_.reduceRight`, and `_.transform`.
	   *
	   * The guarded methods are:
	   * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	   * and `sortBy`
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @returns {*} Returns the accumulated value.
	   * @see _.reduceRight
	   * @example
	   *
	   * _.reduce([1, 2], function(sum, n) {
	   *   return sum + n;
	   * }, 0);
	   * // => 3
	   *
	   * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	   *   (result[value] || (result[value] = [])).push(key);
	   *   return result;
	   * }, {});
	   * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	   */
	  function reduce(collection, iteratee, accumulator) {
	    return baseReduce(collection, baseIteratee(iteratee), accumulator, arguments.length < 3, baseEach);
	  }

	  /**
	   * Gets the size of `collection` by returning its length for array-like
	   * values or the number of own enumerable string keyed properties for objects.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object|string} collection The collection to inspect.
	   * @returns {number} Returns the collection size.
	   * @example
	   *
	   * _.size([1, 2, 3]);
	   * // => 3
	   *
	   * _.size({ 'a': 1, 'b': 2 });
	   * // => 2
	   *
	   * _.size('pebbles');
	   * // => 7
	   */
	  function size(collection) {
	    if (collection == null) {
	      return 0;
	    }
	    collection = isArrayLike(collection) ? collection : nativeKeys(collection);
	    return collection.length;
	  }

	  /**
	   * Checks if `predicate` returns truthy for **any** element of `collection`.
	   * Iteration is stopped once `predicate` returns truthy. The predicate is
	   * invoked with three arguments: (value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} [predicate=_.identity] The function invoked per iteration.
	   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	   * @returns {boolean} Returns `true` if any element passes the predicate check,
	   *  else `false`.
	   * @example
	   *
	   * _.some([null, 0, 'yes', false], Boolean);
	   * // => true
	   *
	   * var users = [
	   *   { 'user': 'barney', 'active': true },
	   *   { 'user': 'fred',   'active': false }
	   * ];
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.some(users, { 'user': 'barney', 'active': false });
	   * // => false
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.some(users, ['active', false]);
	   * // => true
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.some(users, 'active');
	   * // => true
	   */
	  function some(collection, predicate, guard) {
	    predicate = guard ? undefined : predicate;
	    return baseSome(collection, baseIteratee(predicate));
	  }

	  /**
	   * Creates an array of elements, sorted in ascending order by the results of
	   * running each element in a collection thru each iteratee. This method
	   * performs a stable sort, that is, it preserves the original sort order of
	   * equal elements. The iteratees are invoked with one argument: (value).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Collection
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {...(Function|Function[])} [iteratees=[_.identity]]
	   *  The iteratees to sort by.
	   * @returns {Array} Returns the new sorted array.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'fred',   'age': 48 },
	   *   { 'user': 'barney', 'age': 36 },
	   *   { 'user': 'fred',   'age': 40 },
	   *   { 'user': 'barney', 'age': 34 }
	   * ];
	   *
	   * _.sortBy(users, [function(o) { return o.user; }]);
	   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	   *
	   * _.sortBy(users, ['user', 'age']);
	   * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
	   */
	  function sortBy(collection, iteratee) {
	    var index = 0;
	    iteratee = baseIteratee(iteratee);

	    return baseMap(baseMap(collection, function(value, key, collection) {
	      return { 'value': value, 'index': index++, 'criteria': iteratee(value, key, collection) };
	    }).sort(function(object, other) {
	      return compareAscending(object.criteria, other.criteria) || (object.index - other.index);
	    }), baseProperty('value'));
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a function that invokes `func`, with the `this` binding and arguments
	   * of the created function, while it's called less than `n` times. Subsequent
	   * calls to the created function return the result of the last `func` invocation.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Function
	   * @param {number} n The number of calls at which `func` is no longer invoked.
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * jQuery(element).on('click', _.before(5, addContactToList));
	   * // => Allows adding up to 4 contacts to the list.
	   */
	  function before(n, func) {
	    var result;
	    if (typeof func != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    n = toInteger(n);
	    return function() {
	      if (--n > 0) {
	        result = func.apply(this, arguments);
	      }
	      if (n <= 1) {
	        func = undefined;
	      }
	      return result;
	    };
	  }

	  /**
	   * Creates a function that invokes `func` with the `this` binding of `thisArg`
	   * and `partials` prepended to the arguments it receives.
	   *
	   * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	   * may be used as a placeholder for partially applied arguments.
	   *
	   * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
	   * property of bound functions.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Function
	   * @param {Function} func The function to bind.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {...*} [partials] The arguments to be partially applied.
	   * @returns {Function} Returns the new bound function.
	   * @example
	   *
	   * function greet(greeting, punctuation) {
	   *   return greeting + ' ' + this.user + punctuation;
	   * }
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * var bound = _.bind(greet, object, 'hi');
	   * bound('!');
	   * // => 'hi fred!'
	   *
	   * // Bound with placeholders.
	   * var bound = _.bind(greet, object, _, '!');
	   * bound('hi');
	   * // => 'hi fred!'
	   */
	  var bind = baseRest(function(func, thisArg, partials) {
	    return createPartial(func, WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG, thisArg, partials);
	  });

	  /**
	   * Defers invoking the `func` until the current call stack has cleared. Any
	   * additional arguments are provided to `func` when it's invoked.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Function
	   * @param {Function} func The function to defer.
	   * @param {...*} [args] The arguments to invoke `func` with.
	   * @returns {number} Returns the timer id.
	   * @example
	   *
	   * _.defer(function(text) {
	   *   console.log(text);
	   * }, 'deferred');
	   * // => Logs 'deferred' after one millisecond.
	   */
	  var defer = baseRest(function(func, args) {
	    return baseDelay(func, 1, args);
	  });

	  /**
	   * Invokes `func` after `wait` milliseconds. Any additional arguments are
	   * provided to `func` when it's invoked.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Function
	   * @param {Function} func The function to delay.
	   * @param {number} wait The number of milliseconds to delay invocation.
	   * @param {...*} [args] The arguments to invoke `func` with.
	   * @returns {number} Returns the timer id.
	   * @example
	   *
	   * _.delay(function(text) {
	   *   console.log(text);
	   * }, 1000, 'later');
	   * // => Logs 'later' after one second.
	   */
	  var delay = baseRest(function(func, wait, args) {
	    return baseDelay(func, toNumber(wait) || 0, args);
	  });

	  /**
	   * Creates a function that negates the result of the predicate `func`. The
	   * `func` predicate is invoked with the `this` binding and arguments of the
	   * created function.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Function
	   * @param {Function} predicate The predicate to negate.
	   * @returns {Function} Returns the new negated function.
	   * @example
	   *
	   * function isEven(n) {
	   *   return n % 2 == 0;
	   * }
	   *
	   * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	   * // => [1, 3, 5]
	   */
	  function negate(predicate) {
	    if (typeof predicate != 'function') {
	      throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    return function() {
	      var args = arguments;
	      return !predicate.apply(this, args);
	    };
	  }

	  /**
	   * Creates a function that is restricted to invoking `func` once. Repeat calls
	   * to the function return the value of the first invocation. The `func` is
	   * invoked with the `this` binding and arguments of the created function.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Function
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * var initialize = _.once(createApplication);
	   * initialize();
	   * initialize();
	   * // => `createApplication` is invoked once
	   */
	  function once(func) {
	    return before(2, func);
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Creates a shallow clone of `value`.
	   *
	   * **Note:** This method is loosely based on the
	   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	   * and supports cloning arrays, array buffers, booleans, date objects, maps,
	   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	   * arrays. The own enumerable properties of `arguments` objects are cloned
	   * as plain objects. An empty object is returned for uncloneable values such
	   * as error objects, functions, DOM nodes, and WeakMaps.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to clone.
	   * @returns {*} Returns the cloned value.
	   * @see _.cloneDeep
	   * @example
	   *
	   * var objects = [{ 'a': 1 }, { 'b': 2 }];
	   *
	   * var shallow = _.clone(objects);
	   * console.log(shallow[0] === objects[0]);
	   * // => true
	   */
	  function clone(value) {
	    if (!isObject(value)) {
	      return value;
	    }
	    return isArray(value) ? copyArray(value) : copyObject(value, nativeKeys(value));
	  }

	  /**
	   * Performs a
	   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	   * comparison between two values to determine if they are equivalent.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	   * @example
	   *
	   * var object = { 'a': 1 };
	   * var other = { 'a': 1 };
	   *
	   * _.eq(object, object);
	   * // => true
	   *
	   * _.eq(object, other);
	   * // => false
	   *
	   * _.eq('a', 'a');
	   * // => true
	   *
	   * _.eq('a', Object('a'));
	   * // => false
	   *
	   * _.eq(NaN, NaN);
	   * // => true
	   */
	  function eq(value, other) {
	    return value === other || (value !== value && other !== other);
	  }

	  /**
	   * Checks if `value` is likely an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	   *  else `false`.
	   * @example
	   *
	   * _.isArguments(function() { return arguments; }());
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	      !propertyIsEnumerable.call(value, 'callee');
	  };

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

	  /**
	   * Checks if `value` is array-like. A value is considered array-like if it's
	   * not a function and has a `value.length` that's an integer greater than or
	   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	   * @example
	   *
	   * _.isArrayLike([1, 2, 3]);
	   * // => true
	   *
	   * _.isArrayLike(document.body.children);
	   * // => true
	   *
	   * _.isArrayLike('abc');
	   * // => true
	   *
	   * _.isArrayLike(_.noop);
	   * // => false
	   */
	  function isArrayLike(value) {
	    return value != null && isLength(value.length) && !isFunction(value);
	  }

	  /**
	   * Checks if `value` is classified as a boolean primitive or object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	   * @example
	   *
	   * _.isBoolean(false);
	   * // => true
	   *
	   * _.isBoolean(null);
	   * // => false
	   */
	  function isBoolean(value) {
	    return value === true || value === false ||
	      (isObjectLike(value) && baseGetTag(value) == boolTag);
	  }

	  /**
	   * Checks if `value` is classified as a `Date` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
	   * @example
	   *
	   * _.isDate(new Date);
	   * // => true
	   *
	   * _.isDate('Mon April 23 2012');
	   * // => false
	   */
	  var isDate = baseIsDate;

	  /**
	   * Checks if `value` is an empty object, collection, map, or set.
	   *
	   * Objects are considered empty if they have no own enumerable string keyed
	   * properties.
	   *
	   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	   * jQuery-like collections are considered empty if they have a `length` of `0`.
	   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	   * @example
	   *
	   * _.isEmpty(null);
	   * // => true
	   *
	   * _.isEmpty(true);
	   * // => true
	   *
	   * _.isEmpty(1);
	   * // => true
	   *
	   * _.isEmpty([1, 2, 3]);
	   * // => false
	   *
	   * _.isEmpty({ 'a': 1 });
	   * // => false
	   */
	  function isEmpty(value) {
	    if (isArrayLike(value) &&
	        (isArray(value) || isString(value) ||
	          isFunction(value.splice) || isArguments(value))) {
	      return !value.length;
	    }
	    return !nativeKeys(value).length;
	  }

	  /**
	   * Performs a deep comparison between two values to determine if they are
	   * equivalent.
	   *
	   * **Note:** This method supports comparing arrays, array buffers, booleans,
	   * date objects, error objects, maps, numbers, `Object` objects, regexes,
	   * sets, strings, symbols, and typed arrays. `Object` objects are compared
	   * by their own, not inherited, enumerable properties. Functions and DOM
	   * nodes are compared by strict equality, i.e. `===`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	   * @example
	   *
	   * var object = { 'a': 1 };
	   * var other = { 'a': 1 };
	   *
	   * _.isEqual(object, other);
	   * // => true
	   *
	   * object === other;
	   * // => false
	   */
	  function isEqual(value, other) {
	    return baseIsEqual(value, other);
	  }

	  /**
	   * Checks if `value` is a finite primitive number.
	   *
	   * **Note:** This method is based on
	   * [`Number.isFinite`](https://mdn.io/Number/isFinite).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	   * @example
	   *
	   * _.isFinite(3);
	   * // => true
	   *
	   * _.isFinite(Number.MIN_VALUE);
	   * // => true
	   *
	   * _.isFinite(Infinity);
	   * // => false
	   *
	   * _.isFinite('3');
	   * // => false
	   */
	  function isFinite(value) {
	    return typeof value == 'number' && nativeIsFinite(value);
	  }

	  /**
	   * Checks if `value` is classified as a `Function` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	   * @example
	   *
	   * _.isFunction(_);
	   * // => true
	   *
	   * _.isFunction(/abc/);
	   * // => false
	   */
	  function isFunction(value) {
	    if (!isObject(value)) {
	      return false;
	    }
	    // The use of `Object#toString` avoids issues with the `typeof` operator
	    // in Safari 9 which returns 'object' for typed arrays and other constructors.
	    var tag = baseGetTag(value);
	    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	  }

	  /**
	   * Checks if `value` is a valid array-like length.
	   *
	   * **Note:** This method is loosely based on
	   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	   * @example
	   *
	   * _.isLength(3);
	   * // => true
	   *
	   * _.isLength(Number.MIN_VALUE);
	   * // => false
	   *
	   * _.isLength(Infinity);
	   * // => false
	   *
	   * _.isLength('3');
	   * // => false
	   */
	  function isLength(value) {
	    return typeof value == 'number' &&
	      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	  }

	  /**
	   * Checks if `value` is the
	   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	   * @example
	   *
	   * _.isObject({});
	   * // => true
	   *
	   * _.isObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isObject(_.noop);
	   * // => true
	   *
	   * _.isObject(null);
	   * // => false
	   */
	  function isObject(value) {
	    var type = typeof value;
	    return value != null && (type == 'object' || type == 'function');
	  }

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

	  /**
	   * Checks if `value` is `NaN`.
	   *
	   * **Note:** This method is based on
	   * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
	   * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
	   * `undefined` and other non-number values.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	   * @example
	   *
	   * _.isNaN(NaN);
	   * // => true
	   *
	   * _.isNaN(new Number(NaN));
	   * // => true
	   *
	   * isNaN(undefined);
	   * // => true
	   *
	   * _.isNaN(undefined);
	   * // => false
	   */
	  function isNaN(value) {
	    // An `NaN` primitive is the only value that is not equal to itself.
	    // Perform the `toStringTag` check first to avoid errors with some
	    // ActiveX objects in IE.
	    return isNumber(value) && value != +value;
	  }

	  /**
	   * Checks if `value` is `null`.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	   * @example
	   *
	   * _.isNull(null);
	   * // => true
	   *
	   * _.isNull(void 0);
	   * // => false
	   */
	  function isNull(value) {
	    return value === null;
	  }

	  /**
	   * Checks if `value` is classified as a `Number` primitive or object.
	   *
	   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	   * classified as numbers, use the `_.isFinite` method.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	   * @example
	   *
	   * _.isNumber(3);
	   * // => true
	   *
	   * _.isNumber(Number.MIN_VALUE);
	   * // => true
	   *
	   * _.isNumber(Infinity);
	   * // => true
	   *
	   * _.isNumber('3');
	   * // => false
	   */
	  function isNumber(value) {
	    return typeof value == 'number' ||
	      (isObjectLike(value) && baseGetTag(value) == numberTag);
	  }

	  /**
	   * Checks if `value` is classified as a `RegExp` object.
	   *
	   * @static
	   * @memberOf _
	   * @since 0.1.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
	   * @example
	   *
	   * _.isRegExp(/abc/);
	   * // => true
	   *
	   * _.isRegExp('/abc/');
	   * // => false
	   */
	  var isRegExp = baseIsRegExp;

	  /**
	   * Checks if `value` is classified as a `String` primitive or object.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	   * @example
	   *
	   * _.isString('abc');
	   * // => true
	   *
	   * _.isString(1);
	   * // => false
	   */
	  function isString(value) {
	    return typeof value == 'string' ||
	      (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	  }

	  /**
	   * Checks if `value` is `undefined`.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	   * @example
	   *
	   * _.isUndefined(void 0);
	   * // => true
	   *
	   * _.isUndefined(null);
	   * // => false
	   */
	  function isUndefined(value) {
	    return value === undefined;
	  }

	  /**
	   * Converts `value` to an array.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to convert.
	   * @returns {Array} Returns the converted array.
	   * @example
	   *
	   * _.toArray({ 'a': 1, 'b': 2 });
	   * // => [1, 2]
	   *
	   * _.toArray('abc');
	   * // => ['a', 'b', 'c']
	   *
	   * _.toArray(1);
	   * // => []
	   *
	   * _.toArray(null);
	   * // => []
	   */
	  function toArray(value) {
	    if (!isArrayLike(value)) {
	      return values(value);
	    }
	    return value.length ? copyArray(value) : [];
	  }

	  /**
	   * Converts `value` to an integer.
	   *
	   * **Note:** This method is loosely based on
	   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to convert.
	   * @returns {number} Returns the converted integer.
	   * @example
	   *
	   * _.toInteger(3.2);
	   * // => 3
	   *
	   * _.toInteger(Number.MIN_VALUE);
	   * // => 0
	   *
	   * _.toInteger(Infinity);
	   * // => 1.7976931348623157e+308
	   *
	   * _.toInteger('3.2');
	   * // => 3
	   */
	  var toInteger = Number;

	  /**
	   * Converts `value` to a number.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @category Lang
	   * @param {*} value The value to process.
	   * @returns {number} Returns the number.
	   * @example
	   *
	   * _.toNumber(3.2);
	   * // => 3.2
	   *
	   * _.toNumber(Number.MIN_VALUE);
	   * // => 5e-324
	   *
	   * _.toNumber(Infinity);
	   * // => Infinity
	   *
	   * _.toNumber('3.2');
	   * // => 3.2
	   */
	  var toNumber = Number;

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
	    if (typeof value == 'string') {
	      return value;
	    }
	    return value == null ? '' : (value + '');
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Assigns own enumerable string keyed properties of source objects to the
	   * destination object. Source objects are applied from left to right.
	   * Subsequent sources overwrite property assignments of previous sources.
	   *
	   * **Note:** This method mutates `object` and is loosely based on
	   * [`Object.assign`](https://mdn.io/Object/assign).
	   *
	   * @static
	   * @memberOf _
	   * @since 0.10.0
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @see _.assignIn
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   * }
	   *
	   * function Bar() {
	   *   this.c = 3;
	   * }
	   *
	   * Foo.prototype.b = 2;
	   * Bar.prototype.d = 4;
	   *
	   * _.assign({ 'a': 0 }, new Foo, new Bar);
	   * // => { 'a': 1, 'c': 3 }
	   */
	  var assign = createAssigner(function(object, source) {
	    copyObject(source, nativeKeys(source), object);
	  });

	  /**
	   * This method is like `_.assign` except that it iterates over own and
	   * inherited source properties.
	   *
	   * **Note:** This method mutates `object`.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.0.0
	   * @alias extend
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @see _.assign
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   * }
	   *
	   * function Bar() {
	   *   this.c = 3;
	   * }
	   *
	   * Foo.prototype.b = 2;
	   * Bar.prototype.d = 4;
	   *
	   * _.assignIn({ 'a': 0 }, new Foo, new Bar);
	   * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
	   */
	  var assignIn = createAssigner(function(object, source) {
	    copyObject(source, nativeKeysIn(source), object);
	  });

	  /**
	   * Creates an object that inherits from the `prototype` object. If a
	   * `properties` object is given, its own enumerable string keyed properties
	   * are assigned to the created object.
	   *
	   * @static
	   * @memberOf _
	   * @since 2.3.0
	   * @category Object
	   * @param {Object} prototype The object to inherit from.
	   * @param {Object} [properties] The properties to assign to the object.
	   * @returns {Object} Returns the new object.
	   * @example
	   *
	   * function Shape() {
	   *   this.x = 0;
	   *   this.y = 0;
	   * }
	   *
	   * function Circle() {
	   *   Shape.call(this);
	   * }
	   *
	   * Circle.prototype = _.create(Shape.prototype, {
	   *   'constructor': Circle
	   * });
	   *
	   * var circle = new Circle;
	   * circle instanceof Circle;
	   * // => true
	   *
	   * circle instanceof Shape;
	   * // => true
	   */
	  function create(prototype, properties) {
	    var result = baseCreate(prototype);
	    return properties == null ? result : assign(result, properties);
	  }

	  /**
	   * Assigns own and inherited enumerable string keyed properties of source
	   * objects to the destination object for all destination properties that
	   * resolve to `undefined`. Source objects are applied from left to right.
	   * Once a property is set, additional values of the same property are ignored.
	   *
	   * **Note:** This method mutates `object`.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @see _.defaultsDeep
	   * @example
	   *
	   * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	   * // => { 'a': 1, 'b': 2 }
	   */
	  var defaults = baseRest(function(object, sources) {
	    object = Object(object);

	    var index = -1;
	    var length = sources.length;
	    var guard = length > 2 ? sources[2] : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      length = 1;
	    }

	    while (++index < length) {
	      var source = sources[index];
	      var props = keysIn(source);
	      var propsIndex = -1;
	      var propsLength = props.length;

	      while (++propsIndex < propsLength) {
	        var key = props[propsIndex];
	        var value = object[key];

	        if (value === undefined ||
	            (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	          object[key] = source[key];
	        }
	      }
	    }

	    return object;
	  });

	  /**
	   * Checks if `path` is a direct property of `object`.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @param {Array|string} path The path to check.
	   * @returns {boolean} Returns `true` if `path` exists, else `false`.
	   * @example
	   *
	   * var object = { 'a': { 'b': 2 } };
	   * var other = _.create({ 'a': _.create({ 'b': 2 }) });
	   *
	   * _.has(object, 'a');
	   * // => true
	   *
	   * _.has(object, 'a.b');
	   * // => true
	   *
	   * _.has(object, ['a', 'b']);
	   * // => true
	   *
	   * _.has(other, 'a');
	   * // => false
	   */
	  function has(object, path) {
	    return object != null && hasOwnProperty.call(object, path);
	  }

	  /**
	   * Creates an array of the own enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects. See the
	   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	   * for more details.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keys(new Foo);
	   * // => ['a', 'b'] (iteration order is not guaranteed)
	   *
	   * _.keys('hi');
	   * // => ['0', '1']
	   */
	  var keys = nativeKeys;

	  /**
	   * Creates an array of the own and inherited enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keysIn(new Foo);
	   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	   */
	  var keysIn = nativeKeysIn;

	  /**
	   * Creates an object composed of the picked `object` properties.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The source object.
	   * @param {...(string|string[])} [paths] The property paths to pick.
	   * @returns {Object} Returns the new object.
	   * @example
	   *
	   * var object = { 'a': 1, 'b': '2', 'c': 3 };
	   *
	   * _.pick(object, ['a', 'c']);
	   * // => { 'a': 1, 'c': 3 }
	   */
	  var pick = flatRest(function(object, paths) {
	    return object == null ? {} : basePick(object, paths);
	  });

	  /**
	   * This method is like `_.get` except that if the resolved value is a
	   * function it's invoked with the `this` binding of its parent object and
	   * its result is returned.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @param {Array|string} path The path of the property to resolve.
	   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	   * @returns {*} Returns the resolved value.
	   * @example
	   *
	   * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	   *
	   * _.result(object, 'a[0].b.c1');
	   * // => 3
	   *
	   * _.result(object, 'a[0].b.c2');
	   * // => 4
	   *
	   * _.result(object, 'a[0].b.c3', 'default');
	   * // => 'default'
	   *
	   * _.result(object, 'a[0].b.c3', _.constant('default'));
	   * // => 'default'
	   */
	  function result(object, path, defaultValue) {
	    var value = object == null ? undefined : object[path];
	    if (value === undefined) {
	      value = defaultValue;
	    }
	    return isFunction(value) ? value.call(object) : value;
	  }

	  /**
	   * Creates an array of the own enumerable string keyed property values of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to query.
	   * @returns {Array} Returns the array of property values.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.values(new Foo);
	   * // => [1, 2] (iteration order is not guaranteed)
	   *
	   * _.values('hi');
	   * // => ['h', 'i']
	   */
	  function values(object) {
	    return object == null ? [] : baseValues(object, keys(object));
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
	   * corresponding HTML entities.
	   *
	   * **Note:** No other characters are escaped. To escape additional
	   * characters use a third-party library like [_he_](https://mths.be/he).
	   *
	   * Though the ">" character is escaped for symmetry, characters like
	   * ">" and "/" don't need escaping in HTML and have no special meaning
	   * unless they're part of a tag or unquoted attribute value. See
	   * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	   * (under "semi-related fun fact") for more details.
	   *
	   * When working with HTML you should always
	   * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
	   * XSS vectors.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category String
	   * @param {string} [string=''] The string to escape.
	   * @returns {string} Returns the escaped string.
	   * @example
	   *
	   * _.escape('fred, barney, & pebbles');
	   * // => 'fred, barney, &amp; pebbles'
	   */
	  function escape(string) {
	    string = toString(string);
	    return (string && reHasUnescapedHtml.test(string))
	      ? string.replace(reUnescapedHtml, escapeHtmlChar)
	      : string;
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * This method returns the first argument it receives.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Util
	   * @param {*} value Any value.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * var object = { 'a': 1 };
	   *
	   * console.log(_.identity(object) === object);
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }

	  /**
	   * Creates a function that invokes `func` with the arguments of the created
	   * function. If `func` is a property name, the created function returns the
	   * property value for a given element. If `func` is an array or object, the
	   * created function returns `true` for elements that contain the equivalent
	   * source properties, otherwise it returns `false`.
	   *
	   * @static
	   * @since 4.0.0
	   * @memberOf _
	   * @category Util
	   * @param {*} [func=_.identity] The value to convert to a callback.
	   * @returns {Function} Returns the callback.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney', 'age': 36, 'active': true },
	   *   { 'user': 'fred',   'age': 40, 'active': false }
	   * ];
	   *
	   * // The `_.matches` iteratee shorthand.
	   * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
	   * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
	   *
	   * // The `_.matchesProperty` iteratee shorthand.
	   * _.filter(users, _.iteratee(['user', 'fred']));
	   * // => [{ 'user': 'fred', 'age': 40 }]
	   *
	   * // The `_.property` iteratee shorthand.
	   * _.map(users, _.iteratee('user'));
	   * // => ['barney', 'fred']
	   *
	   * // Create custom iteratee shorthands.
	   * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
	   *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
	   *     return func.test(string);
	   *   };
	   * });
	   *
	   * _.filter(['abc', 'def'], /ef/);
	   * // => ['def']
	   */
	  var iteratee = baseIteratee;

	  /**
	   * Creates a function that performs a partial deep comparison between a given
	   * object and `source`, returning `true` if the given object has equivalent
	   * property values, else `false`.
	   *
	   * **Note:** The created function is equivalent to `_.isMatch` with `source`
	   * partially applied.
	   *
	   * Partial comparisons will match empty array and empty object `source`
	   * values against any array or object value, respectively. See `_.isEqual`
	   * for a list of supported value comparisons.
	   *
	   * @static
	   * @memberOf _
	   * @since 3.0.0
	   * @category Util
	   * @param {Object} source The object of property values to match.
	   * @returns {Function} Returns the new spec function.
	   * @example
	   *
	   * var objects = [
	   *   { 'a': 1, 'b': 2, 'c': 3 },
	   *   { 'a': 4, 'b': 5, 'c': 6 }
	   * ];
	   *
	   * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
	   * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
	   */
	  function matches(source) {
	    return baseMatches(assign({}, source));
	  }

	  /**
	   * Adds all own enumerable string keyed function properties of a source
	   * object to the destination object. If `object` is a function, then methods
	   * are added to its prototype as well.
	   *
	   * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	   * avoid conflicts caused by modifying the original.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Util
	   * @param {Function|Object} [object=lodash] The destination object.
	   * @param {Object} source The object of functions to add.
	   * @param {Object} [options={}] The options object.
	   * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
	   * @returns {Function|Object} Returns `object`.
	   * @example
	   *
	   * function vowels(string) {
	   *   return _.filter(string, function(v) {
	   *     return /[aeiou]/i.test(v);
	   *   });
	   * }
	   *
	   * _.mixin({ 'vowels': vowels });
	   * _.vowels('fred');
	   * // => ['e']
	   *
	   * _('fred').vowels().value();
	   * // => ['e']
	   *
	   * _.mixin({ 'vowels': vowels }, { 'chain': false });
	   * _('fred').vowels();
	   * // => ['e']
	   */
	  function mixin(object, source, options) {
	    var props = keys(source),
	        methodNames = baseFunctions(source, props);

	    if (options == null &&
	        !(isObject(source) && (methodNames.length || !props.length))) {
	      options = source;
	      source = object;
	      object = this;
	      methodNames = baseFunctions(source, keys(source));
	    }
	    var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
	        isFunc = isFunction(object);

	    baseEach(methodNames, function(methodName) {
	      var func = source[methodName];
	      object[methodName] = func;
	      if (isFunc) {
	        object.prototype[methodName] = function() {
	          var chainAll = this.__chain__;
	          if (chain || chainAll) {
	            var result = object(this.__wrapped__),
	                actions = result.__actions__ = copyArray(this.__actions__);

	            actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
	            result.__chain__ = chainAll;
	            return result;
	          }
	          return func.apply(object, arrayPush([this.value()], arguments));
	        };
	      }
	    });

	    return object;
	  }

	  /**
	   * Reverts the `_` variable to its previous value and returns a reference to
	   * the `lodash` function.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Util
	   * @returns {Function} Returns the `lodash` function.
	   * @example
	   *
	   * var lodash = _.noConflict();
	   */
	  function noConflict() {
	    if (root._ === this) {
	      root._ = oldDash;
	    }
	    return this;
	  }

	  /**
	   * This method returns `undefined`.
	   *
	   * @static
	   * @memberOf _
	   * @since 2.3.0
	   * @category Util
	   * @example
	   *
	   * _.times(2, _.noop);
	   * // => [undefined, undefined]
	   */
	  function noop() {
	    // No operation performed.
	  }

	  /**
	   * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Util
	   * @param {string} [prefix=''] The value to prefix the ID with.
	   * @returns {string} Returns the unique ID.
	   * @example
	   *
	   * _.uniqueId('contact_');
	   * // => 'contact_104'
	   *
	   * _.uniqueId();
	   * // => '105'
	   */
	  function uniqueId(prefix) {
	    var id = ++idCounter;
	    return toString(prefix) + id;
	  }

	  /*------------------------------------------------------------------------*/

	  /**
	   * Computes the maximum value of `array`. If `array` is empty or falsey,
	   * `undefined` is returned.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Math
	   * @param {Array} array The array to iterate over.
	   * @returns {*} Returns the maximum value.
	   * @example
	   *
	   * _.max([4, 2, 8, 6]);
	   * // => 8
	   *
	   * _.max([]);
	   * // => undefined
	   */
	  function max(array) {
	    return (array && array.length)
	      ? baseExtremum(array, identity, baseGt)
	      : undefined;
	  }

	  /**
	   * Computes the minimum value of `array`. If `array` is empty or falsey,
	   * `undefined` is returned.
	   *
	   * @static
	   * @since 0.1.0
	   * @memberOf _
	   * @category Math
	   * @param {Array} array The array to iterate over.
	   * @returns {*} Returns the minimum value.
	   * @example
	   *
	   * _.min([4, 2, 8, 6]);
	   * // => 2
	   *
	   * _.min([]);
	   * // => undefined
	   */
	  function min(array) {
	    return (array && array.length)
	      ? baseExtremum(array, identity, baseLt)
	      : undefined;
	  }

	  /*------------------------------------------------------------------------*/

	  // Add methods that return wrapped values in chain sequences.
	  lodash.assignIn = assignIn;
	  lodash.before = before;
	  lodash.bind = bind;
	  lodash.chain = chain;
	  lodash.compact = compact;
	  lodash.concat = concat;
	  lodash.create = create;
	  lodash.defaults = defaults;
	  lodash.defer = defer;
	  lodash.delay = delay;
	  lodash.filter = filter;
	  lodash.flatten = flatten;
	  lodash.flattenDeep = flattenDeep;
	  lodash.iteratee = iteratee;
	  lodash.keys = keys;
	  lodash.map = map;
	  lodash.matches = matches;
	  lodash.mixin = mixin;
	  lodash.negate = negate;
	  lodash.once = once;
	  lodash.pick = pick;
	  lodash.slice = slice;
	  lodash.sortBy = sortBy;
	  lodash.tap = tap;
	  lodash.thru = thru;
	  lodash.toArray = toArray;
	  lodash.values = values;

	  // Add aliases.
	  lodash.extend = assignIn;

	  // Add methods to `lodash.prototype`.
	  mixin(lodash, lodash);

	  /*------------------------------------------------------------------------*/

	  // Add methods that return unwrapped values in chain sequences.
	  lodash.clone = clone;
	  lodash.escape = escape;
	  lodash.every = every;
	  lodash.find = find;
	  lodash.forEach = forEach;
	  lodash.has = has;
	  lodash.head = head;
	  lodash.identity = identity;
	  lodash.indexOf = indexOf;
	  lodash.isArguments = isArguments;
	  lodash.isArray = isArray;
	  lodash.isBoolean = isBoolean;
	  lodash.isDate = isDate;
	  lodash.isEmpty = isEmpty;
	  lodash.isEqual = isEqual;
	  lodash.isFinite = isFinite;
	  lodash.isFunction = isFunction;
	  lodash.isNaN = isNaN;
	  lodash.isNull = isNull;
	  lodash.isNumber = isNumber;
	  lodash.isObject = isObject;
	  lodash.isRegExp = isRegExp;
	  lodash.isString = isString;
	  lodash.isUndefined = isUndefined;
	  lodash.last = last;
	  lodash.max = max;
	  lodash.min = min;
	  lodash.noConflict = noConflict;
	  lodash.noop = noop;
	  lodash.reduce = reduce;
	  lodash.result = result;
	  lodash.size = size;
	  lodash.some = some;
	  lodash.uniqueId = uniqueId;

	  // Add aliases.
	  lodash.each = forEach;
	  lodash.first = head;

	  mixin(lodash, (function() {
	    var source = {};
	    baseForOwn(lodash, function(func, methodName) {
	      if (!hasOwnProperty.call(lodash.prototype, methodName)) {
	        source[methodName] = func;
	      }
	    });
	    return source;
	  }()), { 'chain': false });

	  /*------------------------------------------------------------------------*/

	  /**
	   * The semantic version number.
	   *
	   * @static
	   * @memberOf _
	   * @type {string}
	   */
	  lodash.VERSION = VERSION;

	  // Add `Array` methods to `lodash.prototype`.
	  baseEach(['pop', 'join', 'replace', 'reverse', 'split', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
	    var func = (/^(?:replace|split)$/.test(methodName) ? String.prototype : arrayProto)[methodName],
	        chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
	        retUnwrapped = /^(?:pop|join|replace|shift)$/.test(methodName);

	    lodash.prototype[methodName] = function() {
	      var args = arguments;
	      if (retUnwrapped && !this.__chain__) {
	        var value = this.value();
	        return func.apply(isArray(value) ? value : [], args);
	      }
	      return this[chainName](function(value) {
	        return func.apply(isArray(value) ? value : [], args);
	      });
	    };
	  });

	  // Add chain sequence methods to the `lodash` wrapper.
	  lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

	  /*--------------------------------------------------------------------------*/

	  // Some AMD build optimizers, like r.js, check for condition patterns like:
	  if (true) {
	    // Expose Lodash on the global object to prevent errors when Lodash is
	    // loaded by a script tag in the presence of an AMD loader.
	    // See http://requirejs.org/docs/errors.html#mismatch for more details.
	    // Use `_.noConflict` to remove Lodash from the global object.
	    root._ = lodash;

	    // Define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return lodash;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // Check for `exports` after `define` in case a build optimizer adds it.
	  else if (freeModule) {
	    // Export for Node.js.
	    (freeModule.exports = lodash)._ = lodash;
	    // Export for CommonJS support.
	    freeExports._ = lodash;
	  }
	  else {
	    // Export to the global object.
	    root._ = lodash;
	  }
	}.call(this));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(59)(module)))

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var ArrowLink = __webpack_require__(61);
	var BoxArrowLink = __webpack_require__(22);
	var PlainLink = __webpack_require__(23);
	var OwlDisjointWith = __webpack_require__(46);
	var SetOperatorProperty = __webpack_require__(56);

	/**
	 * Stores the passed properties in links.
	 * @returns {Function}
	 */
	module.exports = (function (){
	  var linkCreator = {};
	  
	  /**
	   * Creates links from the passed properties.
	   * @param properties
	   */
	  linkCreator.createLinks = function ( properties ){
	    var links = groupPropertiesToLinks(properties);
	    
	    for ( var i = 0, l = links.length; i < l; i++ ) {
	      var link = links[i];
	      
	      countAndSetLayers(link, links);
	      countAndSetLoops(link, links);
	    }
	    
	    return links;
	  };
	  
	  /**
	   * Creates links of properties and - if existing - their inverses.
	   * @param properties the properties
	   * @returns {Array}
	   */
	  function groupPropertiesToLinks( properties ){
	    var links = [],
	      property,
	      addedProperties = __webpack_require__(62)();
	    
	    for ( var i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      
	      if ( !addedProperties.has(property) ) {
	        var link = createLink(property);
	        
	        property.link(link);
	        if ( property.inverse() ) {
	          property.inverse().link(link);
	        }
	        
	        links.push(link);
	        
	        addedProperties.add(property);
	        if ( property.inverse() ) {
	          addedProperties.add(property.inverse());
	        }
	      }
	    }
	    
	    return links;
	  }
	  
	  function countAndSetLayers( link, allLinks ){
	    var layer,
	      layers,
	      i, l;
	    
	    if ( typeof link.layers() === "undefined" ) {
	      layers = [];
	      
	      // Search for other links that are another layer
	      for ( i = 0, l = allLinks.length; i < l; i++ ) {
	        var otherLink = allLinks[i];
	        if ( link.domain() === otherLink.domain() && link.range() === otherLink.range() ||
	          link.domain() === otherLink.range() && link.range() === otherLink.domain() ) {
	          layers.push(otherLink);
	        }
	      }
	      
	      // Set the results on each of the layers
	      for ( i = 0, l = layers.length; i < l; ++i ) {
	        layer = layers[i];
	        
	        layer.layerIndex(i);
	        layer.layers(layers);
	      }
	    }
	  }
	  
	  function countAndSetLoops( link, allLinks ){
	    var loop,
	      loops,
	      i, l;
	    
	    if ( typeof link.loops() === "undefined" ) {
	      loops = [];
	      
	      // Search for other links that are also loops of the same node
	      for ( i = 0, l = allLinks.length; i < l; i++ ) {
	        var otherLink = allLinks[i];
	        if ( link.domain() === otherLink.domain() && link.domain() === otherLink.range() ) {
	          loops.push(otherLink);
	        }
	      }
	      
	      // Set the results on each of the loops
	      for ( i = 0, l = loops.length; i < l; ++i ) {
	        loop = loops[i];
	        
	        loop.loopIndex(i);
	        loop.loops(loops);
	      }
	    }
	  }
	  
	  function createLink( property ){
	    var domain = property.domain();
	    var range = property.range();
	    
	    if ( property instanceof OwlDisjointWith ) {
	      return new PlainLink(domain, range, property);
	    } else if ( property instanceof SetOperatorProperty ) {
	      return new BoxArrowLink(domain, range, property);
	    }
	    return new ArrowLink(domain, range, property);
	  }
	  
	  return function (){
	    // Return a function to keep module interfaces consistent
	    return linkCreator;
	  };
	})();


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var PlainLink = __webpack_require__(23);


	module.exports = ArrowLink;

	function ArrowLink( domain, range, property ){
	  PlainLink.apply(this, arguments);
	}

	ArrowLink.prototype = Object.create(PlainLink.prototype);
	ArrowLink.prototype.constructor = ArrowLink;


	ArrowLink.prototype.draw = function ( linkGroup, markerContainer ){
	  var property = this.label().property();
	  var inverse = this.label().inverse();
	  
	  createPropertyMarker(markerContainer, property);
	  if ( inverse ) {
	    createInverseMarker(markerContainer, inverse);
	  }
	  
	  PlainLink.prototype.draw.apply(this, arguments);
	  
	  // attach the markers to the link
	  linkGroup.attr("marker-end", "url(#" + property.markerId() + ")");
	  if ( inverse ) {
	    linkGroup.attr("marker-start", "url(#" + inverse.markerId() + ")");
	  }
	};

	function createPropertyMarker( markerContainer, property ){
	  var marker = appendBasicMarker(markerContainer, property);
	  //marker.attr("refX", 12);
	  var m1X = -12;
	  var m1Y = 8;
	  var m2X = -12;
	  var m2Y = -8;
	  marker.append("path")
	  //.attr("d", "M0,-8L12,0L0,8Z")
	    .attr("d", "M0,0L " + m1X + "," + m1Y + "L" + m2X + "," + m2Y + "L" + 0 + "," + 0)
	    .classed(property.markerType(), true);
	  
	  property.markerElement(marker);
	}

	function createInverseMarker( markerContainer, inverse ){
	  var m1X = -12;
	  var m1Y = 8;
	  var m2X = -12;
	  var m2Y = -8;
	  var inverseMarker = appendBasicMarker(markerContainer, inverse);
	  inverseMarker.append("path")
	  //.attr("d", "M12,-8L0,0L12,8Z")
	    .attr("d", "M0,0L " + -m1X + "," + -m1Y + "L" + -m2X + "," + -m2Y + "L" + 0 + "," + 0)
	    .classed(inverse.markerType(), true);
	  
	  inverse.markerElement(inverseMarker);
	}

	function appendBasicMarker( markerContainer, property ){
	  return markerContainer.append("marker")
	    .datum(property)
	    .attr("id", property.markerId())
	    
	    .attr("viewBox", "-14 -10 28 20")
	    .attr("markerWidth", 10)
	    .attr("markerHeight", 10)
	    //.attr("markerUnits", "userSpaceOnUse")
	    .attr("orient", "auto");
	}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {/**
	 * A simple incomplete encapsulation of the d3 set, which is able to store webvowl
	 * elements by using their id.
	 */
	module.exports = function ( array ){
	  
	  var set = {},
	    d3Set = d3.set(array);
	  
	  set.has = function ( webvowlElement ){
	    return d3Set.has(webvowlElement.id());
	  };
	  
	  set.add = function ( webvowlElement ){
	    return d3Set.add(webvowlElement.id());
	  };
	  
	  set.remove = function ( webvowlElement ){
	    return d3Set.remove(webvowlElement.id());
	  };
	  
	  set.empty = function (){
	    return d3Set.empty();
	  };
	  
	  set.size = function (){
	    return d3Set.size();
	  };
	  
	  return set;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var BaseProperty = __webpack_require__(42);
	var BaseNode = __webpack_require__(9);
	var DatatypeNode = __webpack_require__(35);
	var Thing = __webpack_require__(31);
	var ObjectProperty = __webpack_require__(50);
	var DatatypeProperty = __webpack_require__(44);
	var RdfsSubClassOf = __webpack_require__(55);
	var Label = __webpack_require__(24);


	var tools = {};
	module.exports = function (){
	  return tools;
	};

	tools.isLabel = function ( element ){
	  return element instanceof Label;
	};

	tools.isNode = function ( element ){
	  return element instanceof BaseNode;
	};

	tools.isDatatype = function ( node ){
	  return node instanceof DatatypeNode;
	};

	tools.isThing = function ( node ){
	  return node instanceof Thing;
	};

	tools.isProperty = function ( element ){
	  return element instanceof BaseProperty;
	};

	tools.isObjectProperty = function ( element ){
	  return element instanceof ObjectProperty;
	};

	tools.isDatatypeProperty = function ( element ){
	  return element instanceof DatatypeProperty;
	};

	tools.isRdfsSubClassOf = function ( property ){
	  return property instanceof RdfsSubClassOf;
	};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function (){
	  var options = {},
	    data,
	    graphContainerSelector,
	    classDistance = 200,
	    datatypeDistance = 120,
	    loopDistance = 150,
	    charge = -500,
	    gravity = 0.025,
	    linkStrength = 1,
	    height = 600,
	    width = 800,
	    selectionModules = [],
	    filterModules = [],
	    minMagnification = 0.01,
	    maxMagnification = 4,
	    compactNotation = false,
	    dynamicLabelWidth = true,
	    // some filters
	    literalFilter,
	    // menus
	    gravityMenu,
	    filterMenu,
	    loadingModule,
	    modeMenu,
	    pausedMenu,
	    pickAndPinModule,
	    resetMenu,
	    searchMenu,
	    ontologyMenu,
	    sidebar,
	    leftSidebar,
	    editSidebar,
	    navigationMenu,
	    exportMenu,
	    graphObject,
	    zoomSlider,
	    datatypeFilter,
	    focuserModule,
	    colorExternalsModule,
	    compactNotationModule,
	    objectPropertyFilter,
	    subclassFilter,
	    setOperatorFilter,
	    maxLabelWidth = 120,
	    metadataObject = {},
	    generalOntologyMetaData = {},
	    disjointPropertyFilter,
	    rectangularRep = false,
	    warningModule,
	    prefixModule,
	    drawPropertyDraggerOnHover = true,
	    showDraggerObject = false,
	    directInputModule,
	    scaleNodesByIndividuals = true,
	    useAccuracyHelper = true,
	    showRenderingStatistic = true,
	    showInputModality = false,
	    hideDebugOptions = true,
	    nodeDegreeFilter,
	    debugMenu,
	    
	    supportedDatatypes = ["rdfs:Literal", "xsd:boolean", "xsd:double", "xsd:integer", "xsd:string", "undefined"],
	    supportedClasses = ["owl:Thing", "owl:Class", "owl:DeprecatedClass"],
	    supportedProperties = ["owl:objectProperty",
	      "rdfs:subClassOf",
	      "owl:disjointWith",
	      "owl:allValuesFrom",
	      "owl:someValuesFrom"
	    ],
	    prefixList = {
	      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
	      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
	      owl: 'http://www.w3.org/2002/07/owl#',
	      xsd: 'http://www.w3.org/2001/XMLSchema#',
	      dc: 'http://purl.org/dc/elements/1.1/#',
	      xml: 'http://www.w3.org/XML/1998/namespace'
	    };
	  
	  options.clearMetaObject = function (){
	    generalOntologyMetaData = {};
	  };
	  options.clearGeneralMetaObject = function (){
	    generalOntologyMetaData = {};
	  };
	  
	  options.debugMenu = function ( val ){
	    if ( !arguments.length ) return debugMenu;
	    debugMenu = val;
	  };
	  
	  options.getHideDebugFeatures = function (){
	    return hideDebugOptions;
	  };
	  options.executeHiddenDebugFeatuers = function (){
	    hideDebugOptions = !hideDebugOptions;
	    d3.selectAll(".debugOption").classed("hidden", hideDebugOptions);
	    if ( hideDebugOptions === false ) {
	      graphObject.setForceTickFunctionWithFPS();
	    }
	    else {
	      graphObject.setDefaultForceTickFunction();
	    }
	    if ( debugMenu ) {
	      debugMenu.updateSettings();
	    }
	    options.setHideDebugFeaturesForDefaultObject(hideDebugOptions);
	  };
	  
	  
	  options.addOrUpdateGeneralObjectEntry = function ( property, value ){
	    if ( generalOntologyMetaData.hasOwnProperty(property) ) {
	      //console.log("Updating Property:"+ property);
	      if ( property === "iri" ) {
	        if ( validURL(value) === false ) {
	          warningModule.showWarning("Invalid Ontology IRI", "Input IRI does not represent an URL", "Restoring previous IRI for ontology", 1, false);
	          return false;
	        }
	      }
	      generalOntologyMetaData[property] = value;
	    } else {
	      generalOntologyMetaData[property] = value;
	    }
	    return true;
	  };
	  
	  options.getGeneralMetaObjectProperty = function ( property ){
	    if ( generalOntologyMetaData.hasOwnProperty(property) ) {
	      return generalOntologyMetaData[property];
	    }
	  };
	  
	  options.getGeneralMetaObject = function (){
	    return generalOntologyMetaData;
	  };
	  
	  options.addOrUpdateMetaObjectEntry = function ( property, value ){
	    
	    if ( metadataObject.hasOwnProperty(property) ) {
	      metadataObject[property] = value;
	    } else {
	      metadataObject[property] = value;
	    }
	  };
	  
	  options.getMetaObjectProperty = function ( property ){
	    if ( metadataObject.hasOwnProperty(property) ) {
	      return metadataObject[property];
	    }
	  };
	  options.getMetaObject = function (){
	    return metadataObject;
	  };
	  
	  
	  options.prefixList = function (){
	    return prefixList;
	  };
	  options.addPrefix = function ( prefix, url ){
	    prefixList[prefix] = url;
	  };
	  
	  function validURL( str ){
	    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	    return urlregex.test(str);
	  }
	  
	  options.updatePrefix = function ( oldPrefix, newPrefix, oldURL, newURL ){
	    if ( oldPrefix === newPrefix && oldURL === newURL ) {
	      //	console.log("Nothing to update");
	      return true;
	    }
	    if ( oldPrefix === newPrefix && oldURL !== newURL && validURL(newURL) === true ) {
	      //  console.log("Update URL");
	      prefixList[oldPrefix] = newURL;
	    } else if ( oldPrefix === newPrefix && oldURL !== newURL && validURL(newURL) === false ) {
	      if ( validURL(newURL) === false ) {
	        warningModule.showWarning("Invalid Prefix IRI", "Input IRI does not represent an IRI", "You should enter a valid IRI in form of a URL", 1, false);
	        return false;
	      }
	      
	      return false;
	    }
	    if ( oldPrefix !== newPrefix && validURL(newURL) === true ) {
	      
	      // sanity check
	      if ( prefixList.hasOwnProperty(newPrefix) ) {
	        //  console.log("Already have this prefix!");
	        warningModule.showWarning("Prefix Already Exist", "Prefix: " + newPrefix + " is already defined", "You should use an other one", 1, false);
	        return false;
	      }
	      options.removePrefix(oldPrefix);
	      options.addPrefix(newPrefix, newURL);
	      editSidebar.updateEditDeleteButtonIds(oldPrefix, newPrefix);
	      return true;
	    }
	    
	    //	console.log("Is new URL ("+newURL+") valid?  >> "+validURL(newURL));
	    if ( validURL(newURL) === false ) {
	      warningModule.showWarning("Invalid Prefix IRI", "Input IRI does not represent an URL", "You should enter a valid URL", 1, false);
	      
	    }
	    return false;
	  };
	  
	  options.removePrefix = function ( prefix ){
	    delete prefixList[prefix];
	  };
	  
	  
	  options.supportedDatatypes = function (){
	    return supportedDatatypes;
	  };
	  options.supportedClasses = function (){
	    return supportedClasses;
	  };
	  options.supportedProperties = function (){
	    return supportedProperties;
	  };
	  
	  options.datatypeFilter = function ( val ){
	    if ( !arguments.length ) return datatypeFilter;
	    datatypeFilter = val;
	  };
	  
	  options.showDraggerObject = function ( val ){
	    if ( !arguments.length ) {
	      return showDraggerObject;
	    }
	    showDraggerObject = val;
	  };
	  options.useAccuracyHelper = function ( val ){
	    if ( !arguments.length ) {
	      return useAccuracyHelper;
	    }
	    useAccuracyHelper = val;
	  };
	  options.showAccuracyHelper = function ( val ){
	    if ( !arguments.length ) {
	      return options.showDraggerObject();
	    }
	    options.showDraggerObject(val);
	  };
	  options.showRenderingStatistic = function ( val ){
	    if ( !arguments.length ) {
	      return showRenderingStatistic;
	    }
	    showRenderingStatistic = val;
	  };
	  options.showInputModality = function ( val ){
	    if ( !arguments.length ) {
	      return showInputModality;
	    }
	    showInputModality = val;
	  };
	  
	  options.drawPropertyDraggerOnHover = function ( val ){
	    if ( !arguments.length ) return drawPropertyDraggerOnHover;
	    drawPropertyDraggerOnHover = val;
	  };
	  
	  options.warningModule = function ( val ){
	    if ( !arguments.length ) return warningModule;
	    warningModule = val;
	  };
	  options.directInputModule = function ( val ){
	    if ( !arguments.length ) return directInputModule;
	    directInputModule = val;
	  };
	  options.prefixModule = function ( val ){
	    if ( !arguments.length ) return prefixModule;
	    prefixModule = val;
	  };
	  
	  options.focuserModule = function ( val ){
	    if ( !arguments.length ) return focuserModule;
	    focuserModule = val;
	  };
	  options.colorExternalsModule = function ( val ){
	    if ( !arguments.length ) return colorExternalsModule;
	    colorExternalsModule = val;
	  };
	  options.compactNotationModule = function ( val ){
	    if ( !arguments.length ) return compactNotationModule;
	    compactNotationModule = val;
	  };
	  
	  options.maxLabelWidth = function ( val ){
	    if ( !arguments.length ) return maxLabelWidth;
	    maxLabelWidth = val;
	  };
	  options.objectPropertyFilter = function ( val ){
	    if ( !arguments.length ) return objectPropertyFilter;
	    objectPropertyFilter = val;
	  };
	  options.disjointPropertyFilter = function ( val ){
	    if ( !arguments.length ) return disjointPropertyFilter;
	    disjointPropertyFilter = val;
	  };
	  options.subclassFilter = function ( val ){
	    if ( !arguments.length ) return subclassFilter;
	    subclassFilter = val;
	  };
	  options.setOperatorFilter = function ( val ){
	    if ( !arguments.length ) return setOperatorFilter;
	    setOperatorFilter = val;
	  };
	  options.leftSidebar = function ( val ){
	    if ( !arguments.length ) return leftSidebar;
	    leftSidebar = val;
	  };
	  options.editSidebar = function ( val ){
	    if ( !arguments.length ) return editSidebar;
	    editSidebar = val;
	  };
	  
	  options.zoomSlider = function ( val ){
	    if ( !arguments.length ) return zoomSlider;
	    zoomSlider = val;
	  };
	  
	  options.graphObject = function ( val ){
	    if ( !arguments.length ) return graphObject;
	    graphObject = val;
	  };
	  
	  
	  var defaultOptionsConfig = {};
	  defaultOptionsConfig.sidebar = "1";
	  defaultOptionsConfig.doc = -1;
	  defaultOptionsConfig.cd = 200;
	  defaultOptionsConfig.dd = 120;
	  defaultOptionsConfig.editorMode = "false";
	  defaultOptionsConfig.filter_datatypes = "false";
	  defaultOptionsConfig.filter_objectProperties = "false";
	  defaultOptionsConfig.filter_sco = "false";
	  defaultOptionsConfig.filter_disjoint = "true";
	  defaultOptionsConfig.filter_setOperator = "false";
	  defaultOptionsConfig.mode_dynamic = "true";
	  defaultOptionsConfig.mode_scaling = "true";
	  defaultOptionsConfig.mode_compact = "false";
	  defaultOptionsConfig.mode_colorExt = "true";
	  defaultOptionsConfig.mode_multiColor = "false";
	  defaultOptionsConfig.debugFeatures = "false";
	  defaultOptionsConfig.rect = 0;
	  
	  
	  options.initialConfig = function (){
	    var initCfg = {};
	    initCfg.sidebar = "1";
	    initCfg.doc = -1;
	    initCfg.cd = 200;
	    initCfg.dd = 120;
	    initCfg.editorMode = "false";
	    initCfg.filter_datatypes = "false";
	    initCfg.filter_objectProperties = "false";
	    initCfg.filter_sco = "false";
	    initCfg.filter_disjoint = "true";
	    initCfg.filter_setOperator = "false";
	    initCfg.mode_dynamic = "true";
	    initCfg.mode_scaling = "true";
	    initCfg.mode_compact = "false";
	    initCfg.mode_colorExt = "true";
	    initCfg.mode_multiColor = "false";
	    initCfg.mode_pnp = "false";
	    initCfg.debugFeatures = "false";
	    initCfg.rect = 0;
	    return initCfg;
	  };
	  
	  options.setEditorModeForDefaultObject = function ( val ){
	    defaultOptionsConfig.editorMode = String(val);
	  };
	  options.setHideDebugFeaturesForDefaultObject = function ( val ){
	    defaultOptionsConfig.debugFeatures = String(!val);
	  };
	  
	  function updateConfigObject(){
	    defaultOptionsConfig.sidebar = options.sidebar().getSidebarVisibility();
	    defaultOptionsConfig.cd = options.classDistance();
	    defaultOptionsConfig.dd = options.datatypeDistance();
	    defaultOptionsConfig.filter_datatypes = String(options.filterMenu().getCheckBoxValue("datatypeFilterCheckbox"));
	    defaultOptionsConfig.filter_sco = String(options.filterMenu().getCheckBoxValue("subclassFilterCheckbox"));
	    defaultOptionsConfig.filter_disjoint = String(options.filterMenu().getCheckBoxValue("disjointFilterCheckbox"));
	    defaultOptionsConfig.filter_setOperator = String(options.filterMenu().getCheckBoxValue("setoperatorFilterCheckbox"));
	    defaultOptionsConfig.filter_objectProperties = String(options.filterMenu().getCheckBoxValue("objectPropertyFilterCheckbox"));
	    defaultOptionsConfig.mode_dynamic = String(options.dynamicLabelWidth());
	    defaultOptionsConfig.mode_scaling = String(options.modeMenu().getCheckBoxValue("nodescalingModuleCheckbox"));
	    defaultOptionsConfig.mode_compact = String(options.modeMenu().getCheckBoxValue("compactnotationModuleCheckbox"));
	    defaultOptionsConfig.mode_colorExt = String(options.modeMenu().getCheckBoxValue("colorexternalsModuleCheckbox"));
	    defaultOptionsConfig.mode_multiColor = String(options.modeMenu().colorModeState());
	    defaultOptionsConfig.mode_pnp = String(options.modeMenu().getCheckBoxValue("pickandpinModuleCheckbox"));
	    defaultOptionsConfig.rect = 0;
	  }
	  
	  options.defaultConfig = function (){
	    updateConfigObject();
	    return defaultOptionsConfig;
	  };
	  
	  options.exportMenu = function ( val ){
	    if ( !arguments.length ) return exportMenu;
	    exportMenu = val;
	  };
	  
	  options.rectangularRepresentation = function ( val ){
	    if ( !arguments.length ) {
	      return rectangularRep;
	    } else {
	      var intVal = parseInt(val);
	      if ( intVal === 0 ) {
	        rectangularRep = false;
	      } else {
	        rectangularRep = true;
	      }
	    }
	  };
	  
	  options.dynamicLabelWidth = function ( val ){
	    if ( !arguments.length )
	      return dynamicLabelWidth;
	    else {
	      dynamicLabelWidth = val;
	    }
	  };
	  options.sidebar = function ( s ){
	    if ( !arguments.length ) return sidebar;
	    sidebar = s;
	    return options;
	    
	  };
	  
	  options.navigationMenu = function ( m ){
	    if ( !arguments.length ) return navigationMenu;
	    navigationMenu = m;
	    return options;
	    
	  };
	  
	  options.ontologyMenu = function ( m ){
	    if ( !arguments.length ) return ontologyMenu;
	    ontologyMenu = m;
	    return options;
	  };
	  
	  options.searchMenu = function ( m ){
	    if ( !arguments.length ) return searchMenu;
	    searchMenu = m;
	    return options;
	  };
	  
	  options.resetMenu = function ( m ){
	    if ( !arguments.length ) return resetMenu;
	    resetMenu = m;
	    return options;
	  };
	  
	  options.pausedMenu = function ( m ){
	    if ( !arguments.length ) return pausedMenu;
	    pausedMenu = m;
	    return options;
	  };
	  
	  options.pickAndPinModule = function ( m ){
	    if ( !arguments.length ) return pickAndPinModule;
	    pickAndPinModule = m;
	    return options;
	  };
	  
	  options.gravityMenu = function ( m ){
	    if ( !arguments.length ) return gravityMenu;
	    gravityMenu = m;
	    return options;
	  };
	  
	  options.filterMenu = function ( m ){
	    if ( !arguments.length ) return filterMenu;
	    filterMenu = m;
	    return options;
	  };
	  
	  options.modeMenu = function ( m ){
	    if ( !arguments.length ) return modeMenu;
	    modeMenu = m;
	    return options;
	  };
	  
	  options.charge = function ( p ){
	    if ( !arguments.length ) return charge;
	    charge = +p;
	    return options;
	  };
	  
	  options.classDistance = function ( p ){
	    if ( !arguments.length ) return classDistance;
	    classDistance = +p;
	    return options;
	  };
	  
	  options.compactNotation = function ( p ){
	    
	    if ( !arguments.length ) return compactNotation;
	    compactNotation = p;
	    return options;
	  };
	  
	  options.data = function ( p ){
	    if ( !arguments.length ) return data;
	    data = p;
	    return options;
	  };
	  
	  options.datatypeDistance = function ( p ){
	    if ( !arguments.length ) return datatypeDistance;
	    datatypeDistance = +p;
	    return options;
	  };
	  
	  options.filterModules = function ( p ){
	    if ( !arguments.length ) return filterModules;
	    filterModules = p;
	    return options;
	  };
	  
	  options.graphContainerSelector = function ( p ){
	    if ( !arguments.length ) return graphContainerSelector;
	    graphContainerSelector = p;
	    return options;
	  };
	  
	  options.gravity = function ( p ){
	    if ( !arguments.length ) return gravity;
	    gravity = +p;
	    return options;
	  };
	  
	  options.height = function ( p ){
	    if ( !arguments.length ) return height;
	    height = +p;
	    return options;
	  };
	  
	  options.linkStrength = function ( p ){
	    if ( !arguments.length ) return linkStrength;
	    linkStrength = +p;
	    return options;
	  };
	  
	  options.loopDistance = function ( p ){
	    if ( !arguments.length ) return loopDistance;
	    loopDistance = p;
	    return options;
	  };
	  
	  options.minMagnification = function ( p ){
	    if ( !arguments.length ) return minMagnification;
	    minMagnification = +p;
	    return options;
	  };
	  
	  options.maxMagnification = function ( p ){
	    if ( !arguments.length ) return maxMagnification;
	    maxMagnification = +p;
	    return options;
	  };
	  
	  options.scaleNodesByIndividuals = function ( p ){
	    if ( !arguments.length ) return scaleNodesByIndividuals;
	    scaleNodesByIndividuals = p;
	    return options;
	  };
	  
	  options.selectionModules = function ( p ){
	    if ( !arguments.length ) return selectionModules;
	    selectionModules = p;
	    return options;
	  };
	  
	  options.width = function ( p ){
	    if ( !arguments.length ) return width;
	    width = +p;
	    return options;
	  };
	  
	  options.literalFilter = function ( p ){
	    if ( !arguments.length ) return literalFilter;
	    literalFilter = p;
	    return options;
	  };
	  options.nodeDegreeFilter = function ( p ){
	    if ( !arguments.length ) return nodeDegreeFilter;
	    nodeDegreeFilter = p;
	    return options;
	  };
	  
	  options.loadingModule = function ( p ){
	    if ( !arguments.length ) return loadingModule;
	    loadingModule = p;
	    return options;
	  };
	  
	  // define url loadable options;
	  // update all set values in the default object
	  options.setOptionsFromURL = function ( opts, changeEditFlag ){
	    if ( opts.sidebar !== undefined ) sidebar.showSidebar(parseInt(opts.sidebar), true);
	    if ( opts.doc ) {
	      var asInt = parseInt(opts.doc);
	      filterMenu.setDegreeSliderValue(asInt);
	      graphObject.setGlobalDOF(asInt);
	      // reset the value to be -1;
	      defaultOptionsConfig.doc = -1;
	    }
	    var settingFlag = false;
	    if ( opts.editorMode ) {
	      if ( opts.editorMode === "true" ) settingFlag = true;
	      d3.select("#editorModeModuleCheckbox").node().checked = settingFlag;
	      
	      if ( changeEditFlag && changeEditFlag === true ) {
	        graphObject.editorMode(settingFlag);
	      }
	      
	      // update config object
	      defaultOptionsConfig.editorMode = opts.editorMode;
	      
	    }
	    if ( opts.cd ) { // class distance
	      options.classDistance(opts.cd); // class distance
	      defaultOptionsConfig.cd = opts.cd;
	    }
	    if ( opts.dd ) { // data distance
	      options.datatypeDistance(opts.dd);
	      defaultOptionsConfig.cd = opts.cd;
	    }
	    if ( opts.cd || opts.dd ) options.gravityMenu().reset(); // reset the values so the slider is updated;
	    
	    
	    settingFlag = false;
	    if ( opts.filter_datatypes ) {
	      if ( opts.filter_datatypes === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("datatypeFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_datatypes = opts.filter_datatypes;
	    }
	    if ( opts.debugFeatures ) {
	      if ( opts.debugFeatures === "true" ) settingFlag = true;
	      hideDebugOptions = settingFlag;
	      if ( options.getHideDebugFeatures() === false ) {
	        options.executeHiddenDebugFeatuers();
	      }
	      defaultOptionsConfig.debugFeatures = opts.debugFeatures;
	    }
	    
	    settingFlag = false;
	    if ( opts.filter_objectProperties ) {
	      if ( opts.filter_objectProperties === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("objectPropertyFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_objectProperties = opts.filter_objectProperties;
	    }
	    settingFlag = false;
	    if ( opts.filter_sco ) {
	      if ( opts.filter_sco === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("subclassFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_sco = opts.filter_sco;
	    }
	    settingFlag = false;
	    if ( opts.filter_disjoint ) {
	      if ( opts.filter_disjoint === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("disjointFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_disjoint = opts.filter_disjoint;
	    }
	    settingFlag = false;
	    if ( opts.filter_setOperator ) {
	      if ( opts.filter_setOperator === "true" ) settingFlag = true;
	      filterMenu.setCheckBoxValue("setoperatorFilterCheckbox", settingFlag);
	      defaultOptionsConfig.filter_setOperator = opts.filter_setOperator;
	    }
	    filterMenu.updateSettings();
	    
	    // modesMenu
	    settingFlag = false;
	    if ( opts.mode_dynamic ) {
	      if ( opts.mode_dynamic === "true" ) settingFlag = true;
	      modeMenu.setDynamicLabelWidth(settingFlag);
	      dynamicLabelWidth = settingFlag;
	      defaultOptionsConfig.mode_dynamic = opts.mode_dynamic;
	    }
	    // settingFlag=false;
	    // THIS SHOULD NOT BE SET USING THE OPTIONS ON THE URL
	    // if (opts.mode_picnpin) {
	    //     graph.options().filterMenu().setCheckBoxValue("pickandpin ModuleCheckbox", settingFlag);
	    // }
	    
	    settingFlag = false;
	    if ( opts.mode_pnp ) {
	      if ( opts.mode_pnp === "true" ) settingFlag = true;
	      modeMenu.setCheckBoxValue("pickandpinModuleCheckbox", settingFlag);
	      defaultOptionsConfig.mode_pnp = opts.mode_pnp;
	    }
	    
	    settingFlag = false;
	    if ( opts.mode_scaling ) {
	      if ( opts.mode_scaling === "true" ) settingFlag = true;
	      modeMenu.setCheckBoxValue("nodescalingModuleCheckbox", settingFlag);
	      defaultOptionsConfig.mode_scaling = opts.mode_scaling;
	    }
	    
	    settingFlag = false;
	    if ( opts.mode_compact ) {
	      if ( opts.mode_compact === "true" ) settingFlag = true;
	      modeMenu.setCheckBoxValue("compactnotationModuleCheckbox", settingFlag);
	      defaultOptionsConfig.mode_compact = opts.mode_compact;
	    }
	    
	    settingFlag = false;
	    if ( opts.mode_colorExt ) {
	      if ( opts.mode_colorExt === "true" ) settingFlag = true;
	      modeMenu.setCheckBoxValue("colorexternalsModuleCheckbox", settingFlag);
	      defaultOptionsConfig.mode_colorExt = opts.mode_colorExt;
	    }
	    
	    settingFlag = false;
	    if ( opts.mode_multiColor ) {
	      if ( opts.mode_multiColor === "true" ) settingFlag = true;
	      modeMenu.setColorSwitchStateUsingURL(settingFlag);
	      defaultOptionsConfig.mode_multiColor = opts.mode_multiColor;
	    }
	    modeMenu.updateSettingsUsingURL();
	    options.rectangularRepresentation(opts.rect);
	  };
	  
	  return options;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var OwlDisjointWith = __webpack_require__(46);
	var attributeParser = __webpack_require__(66)();
	var equivalentPropertyMerger = __webpack_require__(67)();
	var nodePrototypeMap = __webpack_require__(5)();
	var propertyPrototypeMap = __webpack_require__(40)();

	/**
	 * Encapsulates the parsing and preparation logic of the input data.
	 * @param graph the graph object that will be passed to the elements
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  var parser = {},
	    nodes,
	    properties,
	    classMap,
	    settingsData,
	    settingsImported = false,
	    settingsImportGraphZoomAndTranslation = false,
	    dictionary = [],
	    propertyMap;
	  
	  parser.getDictionary = function (){
	    return dictionary;
	  };
	  
	  parser.setDictionary = function ( d ){
	    dictionary = d;
	  };
	  
	  parser.settingsImported = function (){
	    return settingsImported;
	  };
	  parser.settingsImportGraphZoomAndTranslation = function (){
	    return settingsImportGraphZoomAndTranslation;
	  };
	  
	  parser.parseSettings = function (){
	    settingsImported = true;
	    settingsImportGraphZoomAndTranslation = false;
	    
	    if ( !settingsData ) {
	      settingsImported = false;
	      return;
	    }
	    /** global settings **********************************************************/
	    if ( settingsData.global ) {
	      if ( settingsData.global.zoom ) {
	        var zoomFactor = settingsData.global.zoom;
	        graph.setZoom(zoomFactor);
	        settingsImportGraphZoomAndTranslation = true;
	      }
	      
	      if ( settingsData.global.translation ) {
	        var translation = settingsData.global.translation;
	        graph.setTranslation(translation);
	        settingsImportGraphZoomAndTranslation = true;
	      }
	      
	      if ( settingsData.global.paused ) {
	        var paused = settingsData.global.paused;
	        graph.options().pausedMenu().setPauseValue(paused);
	      }
	    }
	    /** Gravity Settings  **********************************************************/
	    if ( settingsData.gravity ) {
	      if ( settingsData.gravity.classDistance ) {
	        var classDistance = settingsData.gravity.classDistance;
	        graph.options().classDistance(classDistance);
	      }
	      if ( settingsData.gravity.datatypeDistance ) {
	        var datatypeDistance = settingsData.gravity.datatypeDistance;
	        graph.options().datatypeDistance(datatypeDistance);
	      }
	      graph.options().gravityMenu().reset(); // reads the options values and sets the gui values
	    }
	    
	    
	    // shared variable declaration
	    
	    var i;
	    var id;
	    var checked;
	    /** Filter Settings **********************************************************/
	    if ( settingsData.filter ) {
	      // checkbox settings
	      if ( settingsData.filter.checkBox ) {
	        var filter_cb = settingsData.filter.checkBox;
	        for ( i = 0; i < filter_cb.length; i++ ) {
	          id = filter_cb[i].id;
	          checked = filter_cb[i].checked;
	          graph.options().filterMenu().setCheckBoxValue(id, checked);
	        }
	      }
	      // node degree filter settings
	      if ( settingsData.filter.degreeSliderValue ) {
	        var degreeSliderValue = settingsData.filter.degreeSliderValue;
	        graph.options().filterMenu().setDegreeSliderValue(degreeSliderValue);
	      }
	      graph.options().filterMenu().updateSettings();
	    }
	    
	    /** Modes Setting **********************************************************/
	    if ( settingsData.modes ) {
	      // checkbox settings
	      if ( settingsData.modes.checkBox ) {
	        var modes_cb = settingsData.modes.checkBox;
	        for ( i = 0; i < modes_cb.length; i++ ) {
	          id = modes_cb[i].id;
	          checked = modes_cb[i].checked;
	          graph.options().modeMenu().setCheckBoxValue(id, checked);
	        }
	      }
	      // color switch settings
	      var state = settingsData.modes.colorSwitchState;
	      // state could be undefined
	      if ( state === true || state === false ) {
	        graph.options().modeMenu().setColorSwitchState(state);
	      }
	      graph.options().modeMenu().updateSettings();
	    }
	    graph.updateStyle(); // updates graph representation(setting charges and distances)
	  };
	  
	  
	  /**
	   * Parses the ontology data and preprocesses it (e.g. connecting inverse properties and so on).
	   * @param ontologyData the loaded ontology json file
	   */
	  parser.parse = function ( ontologyData ){
	    if ( !ontologyData ) {
	      nodes = [];
	      properties = [];
	      dictionary = [];
	      return;
	    }
	    dictionary = [];
	    if ( ontologyData.settings ) settingsData = ontologyData.settings;
	    else settingsData = undefined;
	    
	    var classes = combineClasses(ontologyData.class, ontologyData.classAttribute),
	      datatypes = combineClasses(ontologyData.datatype, ontologyData.datatypeAttribute),
	      combinedClassesAndDatatypes = classes.concat(datatypes),
	      unparsedProperties = ontologyData.property || [],
	      combinedProperties;
	    
	    // Inject properties for unions, intersections, ...
	    addSetOperatorProperties(combinedClassesAndDatatypes, unparsedProperties);
	    combinedProperties = combineProperties(unparsedProperties, ontologyData.propertyAttribute);
	    classMap = mapElements(combinedClassesAndDatatypes);
	    propertyMap = mapElements(combinedProperties);
	    mergeRangesOfEquivalentProperties(combinedProperties, combinedClassesAndDatatypes);
	    
	    // Process the graph data
	    convertTypesToIris(combinedClassesAndDatatypes, ontologyData.namespace);
	    convertTypesToIris(combinedProperties, ontologyData.namespace);
	    nodes = createNodeStructure(combinedClassesAndDatatypes, classMap);
	    properties = createPropertyStructure(combinedProperties, classMap, propertyMap);
	  };
	  
	  /**
	   * @return {Array} the preprocessed nodes
	   */
	  parser.nodes = function (){
	    return nodes;
	  };
	  
	  /**
	   * @returns {Array} the preprocessed properties
	   */
	  parser.properties = function (){
	    return properties;
	  };
	  
	  /**
	   * Combines the passed objects with its attributes and prototypes. This also applies
	   * attributes defined in the base of the prototype.
	   */
	  function combineClasses( baseObjects, attributes ){
	    var combinations = [];
	    var prototypeMap = createLowerCasePrototypeMap(nodePrototypeMap);
	    
	    if ( baseObjects ) {
	      baseObjects.forEach(function ( element ){
	        var matchingAttribute;
	        
	        if ( attributes ) {
	          // Look for an attribute with the same id and merge them
	          for ( var i = 0; i < attributes.length; i++ ) {
	            var attribute = attributes[i];
	            if ( element.id === attribute.id ) {
	              matchingAttribute = attribute;
	              break;
	            }
	          }
	          addAdditionalAttributes(element, matchingAttribute);
	        }
	        
	        // Then look for a prototype to add its properties
	        var Prototype = prototypeMap.get(element.type.toLowerCase());
	        
	        if ( Prototype ) {
	          addAdditionalAttributes(element, Prototype); // TODO might be unnecessary
	          
	          var node = new Prototype(graph);
	          node.annotations(element.annotations)
	            .baseIri(element.baseIri)
	            .comment(element.comment)
	            .complement(element.complement)
	            .disjointUnion(element.disjointUnion)
	            .description(element.description)
	            .equivalents(element.equivalent)
	            .id(element.id)
	            .intersection(element.intersection)
	            .label(element.label)
	            // .type(element.type) Ignore, because we predefined it
	            .union(element.union)
	            .iri(element.iri);
	          if ( element.pos ) {
	            node.x = element.pos[0];
	            node.y = element.pos[1];
	            node.px = node.x;
	            node.py = node.y;
	          }
	          //class element pin
	          var elementPinned = element.pinned;
	          if ( elementPinned === true ) {
	            node.pinned(true);
	            graph.options().pickAndPinModule().addPinnedElement(node);
	          }
	          // Create node objects for all individuals
	          if ( element.individuals ) {
	            element.individuals.forEach(function ( individual ){
	              var individualNode = new Prototype(graph);
	              individualNode.label(individual.labels)
	                .iri(individual.iri);
	              
	              node.individuals().push(individualNode);
	            });
	          }
	          
	          if ( element.attributes ) {
	            var deduplicatedAttributes = d3.set(element.attributes.concat(node.attributes()));
	            node.attributes(deduplicatedAttributes.values());
	          }
	          combinations.push(node);
	        } else {
	          console.error("Unknown element type: " + element.type);
	        }
	      });
	    }
	    
	    return combinations;
	  }
	  
	  function combineProperties( baseObjects, attributes ){
	    var combinations = [];
	    var prototypeMap = createLowerCasePrototypeMap(propertyPrototypeMap);
	    
	    if ( baseObjects ) {
	      baseObjects.forEach(function ( element ){
	        var matchingAttribute;
	        
	        if ( attributes ) {
	          // Look for an attribute with the same id and merge them
	          for ( var i = 0; i < attributes.length; i++ ) {
	            var attribute = attributes[i];
	            if ( element.id === attribute.id ) {
	              matchingAttribute = attribute;
	              break;
	            }
	          }
	          addAdditionalAttributes(element, matchingAttribute);
	        }
	        
	        // Then look for a prototype to add its properties
	        var Prototype = prototypeMap.get(element.type.toLowerCase());
	        
	        if ( Prototype ) {
	          // Create the matching object and set the properties
	          var property = new Prototype(graph);
	          property.annotations(element.annotations)
	            .baseIri(element.baseIri)
	            .cardinality(element.cardinality)
	            .comment(element.comment)
	            .domain(element.domain)
	            .description(element.description)
	            .equivalents(element.equivalent)
	            .id(element.id)
	            .inverse(element.inverse)
	            .label(element.label)
	            .minCardinality(element.minCardinality)
	            .maxCardinality(element.maxCardinality)
	            .range(element.range)
	            .subproperties(element.subproperty)
	            .superproperties(element.superproperty)
	            // .type(element.type) Ignore, because we predefined it
	            .iri(element.iri);
	          
	          // adding property position
	          if ( element.pos ) {
	            property.x = element.pos[0];
	            property.y = element.pos[1];
	            property.px = element.pos[0];
	            property.py = element.pos[1];
	          }
	          var elementPinned = element.pinned;
	          if ( elementPinned === true ) {
	            property.pinned(true);
	            graph.options().pickAndPinModule().addPinnedElement(property);
	          }
	          
	          
	          if ( element.attributes ) {
	            var deduplicatedAttributes = d3.set(element.attributes.concat(property.attributes()));
	            property.attributes(deduplicatedAttributes.values());
	          }
	          combinations.push(property);
	        } else {
	          console.error("Unknown element type: " + element.type);
	        }
	        
	      });
	    }
	    
	    return combinations;
	  }
	  
	  function createLowerCasePrototypeMap( prototypeMap ){
	    return d3.map(prototypeMap.values(), function ( Prototype ){
	      return new Prototype().type().toLowerCase();
	    });
	  }
	  
	  function mergeRangesOfEquivalentProperties( properties, nodes ){
	    // pass clones of arrays into the merger to keep the current functionality of this module
	    var newNodes = equivalentPropertyMerger.merge(properties.slice(), nodes.slice(), propertyMap, classMap, graph);
	    
	    // replace all the existing nodes and map the nodes again
	    nodes.length = 0;
	    Array.prototype.push.apply(nodes, newNodes);
	    classMap = mapElements(nodes);
	  }
	  
	  /**
	   * Checks all attributes which have to be rewritten.
	   * For example:
	   * <b>equivalent</b> is filled with only ID's of the corresponding nodes. It would be better to used the
	   * object instead of the ID so we swap the ID's with the correct object reference and can delete it from drawing
	   * because it is not necessary.
	   */
	  function createNodeStructure( rawNodes, classMap ){
	    var nodes = [];
	    
	    // Set the default values
	    var maxIndividualCount = 0;
	    rawNodes.forEach(function ( node ){
	      maxIndividualCount = Math.max(maxIndividualCount, node.individuals().length);
	      node.visible(true);
	    });
	    
	    rawNodes.forEach(function ( node ){
	      // Merge and connect the equivalent nodes
	      processEquivalentIds(node, classMap);
	      
	      attributeParser.parseClassAttributes(node);
	      
	      node.maxIndividualCount(maxIndividualCount);
	    });
	    
	    // Collect all nodes that should be displayed
	    rawNodes.forEach(function ( node ){
	      if ( node.visible() ) {
	        nodes.push(node);
	      }
	    });
	    
	    return nodes;
	  }
	  
	  /**
	   * Sets the disjoint attribute of the nodes if a disjoint label is found.
	   * @param property
	   */
	  function processDisjoints( property ){
	    if ( property instanceof OwlDisjointWith === false ) {
	      return;
	    }
	    
	    var domain = property.domain(),
	      range = property.range();
	    
	    // Check the domain.
	    if ( !domain.disjointWith() ) {
	      domain.disjointWith([]);
	    }
	    
	    // Check the range.
	    if ( !range.disjointWith() ) {
	      range.disjointWith([]);
	    }
	    
	    domain.disjointWith().push(property.range());
	    range.disjointWith().push(property.domain());
	  }
	  
	  /**
	   * Connect all properties and also their sub- and superproperties.
	   * We iterate over the rawProperties array because it is way faster than iterating
	   * over an object and its attributes.
	   *
	   * @param rawProperties the properties
	   * @param classMap a map of all classes
	   * @param propertyMap the properties in a map
	   */
	  function createPropertyStructure( rawProperties, classMap, propertyMap ){
	    var properties = [];
	    // Set default values
	    rawProperties.forEach(function ( property ){
	      property.visible(true);
	    });
	    
	    // Connect properties
	    rawProperties.forEach(function ( property ){
	      var domain,
	        range,
	        domainObject,
	        rangeObject,
	        inverse;
	      
	      /* Skip properties that have no information about their domain and range, like
	       inverse properties with optional inverse and optional domain and range attributes */
	      if ( (property.domain() && property.range()) || property.inverse() ) {
	        
	        var inversePropertyId = findId(property.inverse());
	        // Look if an inverse property exists
	        if ( inversePropertyId ) {
	          inverse = propertyMap[inversePropertyId];
	          if ( !inverse ) {
	            console.warn("No inverse property was found for id: " + inversePropertyId);
	            property.inverse(undefined);
	          }
	        }
	        
	        // Either domain and range are set on this property or at the inverse
	        if ( typeof property.domain() !== "undefined" && typeof property.range() !== "undefined" ) {
	          domain = findId(property.domain());
	          range = findId(property.range());
	          
	          domainObject = classMap[domain];
	          rangeObject = classMap[range];
	        } else if ( inverse ) {
	          // Domain and range need to be switched
	          domain = findId(inverse.range());
	          range = findId(inverse.domain());
	          
	          domainObject = classMap[domain];
	          rangeObject = classMap[range];
	        } else {
	          console.warn("Domain and range not found for property: " + property.id());
	        }
	        
	        // Set the references on this property
	        property.domain(domainObject);
	        property.range(rangeObject);
	        
	        // Also set the attributes of the inverse property
	        if ( inverse ) {
	          property.inverse(inverse);
	          inverse.inverse(property);
	          
	          // Switch domain and range
	          inverse.domain(rangeObject);
	          inverse.range(domainObject);
	        }
	      }
	      // Reference sub- and superproperties
	      referenceSubOrSuperProperties(property.subproperties());
	      referenceSubOrSuperProperties(property.superproperties());
	    });
	    
	    // Merge equivalent properties and process disjoints.
	    rawProperties.forEach(function ( property ){
	      processEquivalentIds(property, propertyMap);
	      processDisjoints(property);
	      
	      attributeParser.parsePropertyAttributes(property);
	    });
	    // Add additional information to the properties
	    rawProperties.forEach(function ( property ){
	      // Properties of merged classes should point to/from the visible equivalent class
	      var propertyWasRerouted = false;
	      
	      if ( property.domain() === undefined ) {
	        console.warn("No Domain was found for id:" + property.id());
	        return;
	      }
	      
	      if ( wasNodeMerged(property.domain()) ) {
	        property.domain(property.domain().equivalentBase());
	        propertyWasRerouted = true;
	      }
	      if ( property.range() === undefined ) {
	        console.warn("No range was found for id:" + property.id());
	        return;
	      }
	      if ( wasNodeMerged(property.range()) ) {
	        property.range(property.range().equivalentBase());
	        propertyWasRerouted = true;
	      }
	      // But there should not be two equal properties between the same domain and range
	      var equalProperty = getOtherEqualProperty(rawProperties, property);
	      
	      if ( propertyWasRerouted && equalProperty ) {
	        property.visible(false);
	        
	        equalProperty.redundantProperties().push(property);
	      }
	      
	      // Hide property if source or target node is hidden
	      if ( !property.domain().visible() || !property.range().visible() ) {
	        property.visible(false);
	      }
	      
	      // Collect all properties that should be displayed
	      if ( property.visible() ) {
	        properties.push(property);
	      }
	    });
	    return properties;
	  }
	  
	  function referenceSubOrSuperProperties( subOrSuperPropertiesArray ){
	    var i, l;
	    
	    if ( !subOrSuperPropertiesArray ) {
	      return;
	    }
	    
	    for ( i = 0, l = subOrSuperPropertiesArray.length; i < l; ++i ) {
	      var subOrSuperPropertyId = findId(subOrSuperPropertiesArray[i]);
	      var subOrSuperProperty = propertyMap[subOrSuperPropertyId];
	      
	      if ( subOrSuperProperty ) {
	        // Replace id with object
	        subOrSuperPropertiesArray[i] = subOrSuperProperty;
	      } else {
	        console.warn("No sub-/superproperty was found for id: " + subOrSuperPropertyId);
	      }
	    }
	  }
	  
	  function wasNodeMerged( node ){
	    return !node.visible() && node.equivalentBase();
	  }
	  
	  function getOtherEqualProperty( properties, referenceProperty ){
	    var i, l, property;
	    
	    for ( i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      
	      if ( referenceProperty === property ) {
	        continue;
	      }
	      if ( referenceProperty.domain() !== property.domain() ||
	        referenceProperty.range() !== property.range() ) {
	        continue;
	      }
	      
	      // Check for an equal IRI, if non existent compare label and type
	      if ( referenceProperty.iri() && property.iri() ) {
	        if ( referenceProperty.iri() === property.iri() ) {
	          return property;
	        }
	      } else if ( referenceProperty.type() === property.type() &&
	        referenceProperty.defaultLabel() === property.defaultLabel() ) {
	        return property;
	      }
	    }
	    
	    return undefined;
	  }
	  
	  /**
	   * Generates and adds properties for links to set operators.
	   * @param classes unprocessed classes
	   * @param properties unprocessed properties
	   */
	  function addSetOperatorProperties( classes, properties ){
	    function addProperties( domainId, rangeIds, operatorType ){
	      if ( !rangeIds ) {
	        return;
	      }
	      
	      rangeIds.forEach(function ( rangeId, index ){
	        var property = {
	          id: "GENERATED-" + operatorType + "-" + domainId + "-" + rangeId + "-" + index,
	          type: "setOperatorProperty",
	          domain: domainId,
	          range: rangeId
	        };
	        
	        properties.push(property);
	      });
	    }
	    
	    classes.forEach(function ( clss ){
	      addProperties(clss.id(), clss.complement(), "COMPLEMENT");
	      addProperties(clss.id(), clss.intersection(), "INTERSECTION");
	      addProperties(clss.id(), clss.union(), "UNION");
	      addProperties(clss.id(), clss.disjointUnion(), "DISJOINTUNION");
	    });
	  }
	  
	  /**
	   * Replaces the ids of equivalent nodes/properties with the matching objects, cross references them
	   * and tags them as processed.
	   * @param element a node or a property
	   * @param elementMap a map where nodes/properties can be looked up
	   */
	  function processEquivalentIds( element, elementMap ){
	    var eqIds = element.equivalents();
	    
	    if ( !eqIds || element.equivalentBase() ) {
	      return;
	    }
	    
	    // Replace ids with the corresponding objects
	    for ( var i = 0, l = eqIds.length; i < l; ++i ) {
	      var eqId = findId(eqIds[i]);
	      var eqObject = elementMap[eqId];
	      
	      if ( eqObject ) {
	        // Cross reference both objects
	        eqObject.equivalents(eqObject.equivalents());
	        eqObject.equivalents().push(element);
	        eqObject.equivalentBase(element);
	        eqIds[i] = eqObject;
	        
	        // Hide other equivalent nodes
	        eqObject.visible(false);
	      } else {
	        console.warn("No class/property was found for equivalent id: " + eqId);
	      }
	    }
	  }
	  
	  /**
	   * Tries to convert the type to an iri and sets it.
	   * @param elements classes or properties
	   * @param namespaces an array of namespaces
	   */
	  function convertTypesToIris( elements, namespaces ){
	    elements.forEach(function ( element ){
	      if ( typeof element.iri() === "string" ) {
	        element.iri(replaceNamespace(element.iri(), namespaces));
	      }
	    });
	  }
	  
	  /**
	   * Creates a map by mapping the array with the passed function.
	   * @param array the array
	   * @returns {{}}
	   */
	  function mapElements( array ){
	    var map = {};
	    for ( var i = 0, length = array.length; i < length; i++ ) {
	      var element = array[i];
	      map[element.id()] = element;
	    }
	    return map;
	  }
	  
	  /**
	   * Adds the attributes of the additional object to the base object, but doesn't
	   * overwrite existing ones.
	   *
	   * @param base the base object
	   * @param addition the object with additional data
	   * @returns the combination is also returned
	   */
	  function addAdditionalAttributes( base, addition ){
	    // Check for an undefined value
	    addition = addition || {};
	    
	    for ( var addAttribute in addition ) {
	      // Add the attribute if it doesn't exist
	      if ( !(addAttribute in base) && addition.hasOwnProperty(addAttribute) ) {
	        base[addAttribute] = addition[addAttribute];
	      }
	    }
	    return base;
	  }
	  
	  /**
	   * Replaces the namespace (and the separator) if one exists and returns the new value.
	   * @param address the address with a namespace in it
	   * @param namespaces an array of namespaces
	   * @returns {string} the processed address with the (possibly) replaced namespace
	   */
	  function replaceNamespace( address, namespaces ){
	    var separatorIndex = address.indexOf(":");
	    if ( separatorIndex === -1 ) {
	      return address;
	    }
	    var namespaceName = address.substring(0, separatorIndex);
	    
	    for ( var i = 0, length = namespaces.length; i < length; ++i ) {
	      var namespace = namespaces[i];
	      if ( namespaceName === namespace.name ) {
	        return namespace.iri + address.substring(separatorIndex + 1);
	      }
	    }
	    
	    return address;
	  }
	  
	  /**
	   * Looks whether the passed object is already the id or if it was replaced
	   * with the object that belongs to the id.
	   * @param object an id, a class or a property
	   * @returns {string} the id of the passed object or undefined
	   */
	  function findId( object ){
	    if ( !object ) {
	      return undefined;
	    } else if ( typeof object === "string" ) {
	      return object;
	    } else if ( "id" in object ) {
	      return object.id();
	    } else {
	      console.warn("No Id was found for this object: " + object);
	      return undefined;
	    }
	  }
	  
	  return parser;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	/**
	 * Parses the attributes an element has and sets the corresponding attributes.
	 * @returns {Function}
	 */
	module.exports = (function (){
	  var attributeParser = {},
	    // Style
	    ANONYMOUS = "anonymous",
	    DATATYPE = "datatype",
	    DEPRECATED = "deprecated",
	    EXTERNAL = "external",
	    OBJECT = "object",
	    RDF = "rdf",
	    // Representations
	    ASYMMETRIC = "asymmetric",
	    FUNCTIONAL = "functional",
	    INVERSE_FUNCTIONAL = "inverse functional",
	    IRREFLEXIVE = "irreflexive",
	    KEY = "key",
	    REFLEXIVE = "reflexive",
	    SYMMETRIC = "symmetric",
	    TRANSITIVE = "transitive",
	    // Attribute groups
	    VISUAL_ATTRIBUTE_GROUPS = [
	      [DEPRECATED, DATATYPE, OBJECT, RDF],
	      [ANONYMOUS]
	    ],
	    CLASS_INDICATIONS = [DEPRECATED, EXTERNAL],
	    PROPERTY_INDICATIONS = [ASYMMETRIC, FUNCTIONAL, INVERSE_FUNCTIONAL, IRREFLEXIVE, KEY, REFLEXIVE, SYMMETRIC,
	      TRANSITIVE];
	  
	  /**
	   * Parses and sets the attributes of a class.
	   * @param clazz
	   */
	  attributeParser.parseClassAttributes = function ( clazz ){
	    if ( !(clazz.attributes() instanceof Array) ) {
	      return;
	    }
	    
	    parseVisualAttributes(clazz);
	    parseClassIndications(clazz);
	  };
	  
	  function parseVisualAttributes( element ){
	    VISUAL_ATTRIBUTE_GROUPS.forEach(function ( attributeGroup ){
	      setVisualAttributeOfGroup(element, attributeGroup);
	    });
	  }
	  
	  function setVisualAttributeOfGroup( element, group ){
	    var i, l, attribute;
	    
	    for ( i = 0, l = group.length; i < l; i++ ) {
	      attribute = group[i];
	      if ( element.attributes().indexOf(attribute) >= 0 ) {
	        element.visualAttributes().push(attribute);
	        
	        // Just a single attribute is possible
	        break;
	      }
	    }
	  }
	  
	  function parseClassIndications( clazz ){
	    var i, l, indication;
	    
	    for ( i = 0, l = CLASS_INDICATIONS.length; i < l; i++ ) {
	      indication = CLASS_INDICATIONS[i];
	      
	      if ( clazz.attributes().indexOf(indication) >= 0 ) {
	        clazz.indications().push(indication);
	      }
	    }
	  }
	  
	  /**
	   * Parses and sets the attributes of a property.
	   * @param property
	   */
	  attributeParser.parsePropertyAttributes = function ( property ){
	    if ( !(property.attributes() instanceof Array) ) {
	      return;
	    }
	    
	    parseVisualAttributes(property);
	    parsePropertyIndications(property);
	  };
	  
	  function parsePropertyIndications( property ){
	    var i, l, indication;
	    
	    for ( i = 0, l = PROPERTY_INDICATIONS.length; i < l; i++ ) {
	      indication = PROPERTY_INDICATIONS[i];
	      
	      if ( property.attributes().indexOf(indication) >= 0 ) {
	        property.indications().push(indication);
	      }
	    }
	  }
	  
	  
	  return function (){
	    // Return a function to keep module interfaces consistent
	    return attributeParser;
	  };
	})();


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var OwlThing = __webpack_require__(31);
	var RdfsLiteral = __webpack_require__(38);
	var elementTools = __webpack_require__(63)();

	var equivalentPropertyMerger = {};
	module.exports = function (){
	  return equivalentPropertyMerger;
	};

	var PREFIX = "GENERATED-MERGED_RANGE-";
	var OBJECT_PROPERTY_DEFAULT_RANGE_TYPE = "owl:Thing";
	var DATA_PROPERTY_DEFAULT_RANGE_TYPE = "rdfs:Literal";


	equivalentPropertyMerger.merge = function ( properties, nodes, propertyMap, nodeMap, graph ){
	  var totalNodeIdsToHide = d3.set();
	  var processedPropertyIds = d3.set();
	  var mergeNodes = [];
	  
	  for ( var i = 0; i < properties.length; i++ ) {
	    var property = properties[i];
	    var equivalents = property.equivalents().map(createIdToPropertyMapper(propertyMap));
	    
	    if ( equivalents.length === 0 || processedPropertyIds.has(property.id()) ) {
	      continue;
	    }
	    
	    var propertyWithEquivalents = equivalents.concat(property);
	    
	    var mergeNode = findMergeNode(propertyWithEquivalents, nodeMap);
	    if ( !mergeNode ) {
	      if ( mergeNode !== undefined ) {
	        mergeNode = createDefaultMergeNode(property, graph);
	        mergeNodes.push(mergeNode);
	      }
	    }
	    
	    var nodeIdsToHide = replaceRangesAndCollectNodesToHide(propertyWithEquivalents, mergeNode, properties,
	      processedPropertyIds);
	    for ( var j = 0; j < nodeIdsToHide.length; j++ ) {
	      totalNodeIdsToHide.add(nodeIdsToHide[j]);
	    }
	  }
	  
	  return filterVisibleNodes(nodes.concat(mergeNodes), totalNodeIdsToHide);
	};


	function createIdToPropertyMapper( propertyMap ){
	  return function ( id ){
	    return propertyMap[id];
	  };
	}

	function findMergeNode( propertyWithEquivalents, nodeMap ){
	  var typeMap = mapPropertiesRangesToType(propertyWithEquivalents, nodeMap);
	  var typeSet = d3.set(typeMap.keys());
	  
	  // default types are the fallback values and should be ignored for the type determination
	  typeSet.remove(OBJECT_PROPERTY_DEFAULT_RANGE_TYPE);
	  typeSet.remove(DATA_PROPERTY_DEFAULT_RANGE_TYPE);
	  
	  // exactly one type to chose from -> take the node of this type as range
	  if ( typeSet.size() === 1 ) {
	    var type = typeSet.values()[0];
	    var ranges = typeMap.get(type);
	    
	    if ( ranges.length === 1 ) {
	      return ranges[0];
	    }
	  }
	}

	function mapPropertiesRangesToType( properties, nodeMap ){
	  var typeMap = d3.map();
	  
	  properties.forEach(function ( property ){
	    if ( property === undefined ) //@ WORKAROUND
	      return;
	    
	    var range = nodeMap[property.range()];
	    var type = range.type();
	    
	    if ( !typeMap.has(type) ) {
	      typeMap.set(type, []);
	    }
	    
	    typeMap.get(type).push(range);
	  });
	  
	  return typeMap;
	}

	function createDefaultMergeNode( property, graph ){
	  var range;
	  
	  if ( elementTools.isDatatypeProperty(property) ) {
	    range = new RdfsLiteral(graph);
	  } else {
	    range = new OwlThing(graph);
	  }
	  range.id(PREFIX + property.id());
	  
	  return range;
	}

	function replaceRangesAndCollectNodesToHide( propertyWithEquivalents, mergeNode, properties, processedPropertyIds ){
	  var nodesToHide = [];
	  
	  propertyWithEquivalents.forEach(function ( property ){
	    
	    if ( property === undefined || mergeNode === undefined ) // @ WORKAROUND
	      return;
	    var oldRangeId = property.range();
	    property.range(mergeNode.id());
	    if ( !isDomainOrRangeOfOtherProperty(oldRangeId, properties) ) {
	      nodesToHide.push(oldRangeId);
	    }
	    
	    processedPropertyIds.add(property.id());
	  });
	  
	  return nodesToHide;
	}

	function isDomainOrRangeOfOtherProperty( nodeId, properties ){
	  for ( var i = 0; i < properties.length; i++ ) {
	    var property = properties[i];
	    if ( property.domain() === nodeId || property.range() === nodeId ) {
	      return true;
	    }
	  }
	  
	  return false;
	}

	function filterVisibleNodes( nodes, nodeIdsToHide ){
	  var filteredNodes = [];
	  
	  nodes.forEach(function ( node ){
	    if ( !nodeIdsToHide.has(node.id()) ) {
	      filteredNodes.push(node);
	    }
	  });
	  
	  return filteredNodes;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  /** variable defs **/
	  var Class_dragger = {};
	  Class_dragger.nodeId = 10001;
	  Class_dragger.parent = undefined;
	  Class_dragger.x = 0;
	  Class_dragger.y = 0;
	  Class_dragger.rootElement = undefined;
	  Class_dragger.rootNodeLayer = undefined;
	  Class_dragger.pathLayer = undefined;
	  Class_dragger.mouseEnteredVar = false;
	  Class_dragger.mouseButtonPressed = false;
	  Class_dragger.nodeElement = undefined;
	  Class_dragger.draggerObject = undefined;
	  Class_dragger.pathElement = undefined;
	  Class_dragger.typus = "Class_dragger";
	  
	  Class_dragger.type = function (){
	    return Class_dragger.typus;
	  };
	  
	  Class_dragger.parentNode = function (){
	    return Class_dragger.parent;
	  };
	  
	  Class_dragger.hideClass_dragger = function ( val ){
	    Class_dragger.pathElement.classed("hidden", val);
	    Class_dragger.nodeElement.classed("hidden", val);
	    Class_dragger.draggerObject.classed("hidden", val);
	  };
	  
	  Class_dragger.setParentNode = function ( parentNode ){
	    Class_dragger.parent = parentNode;
	    
	    if ( Class_dragger.mouseButtonPressed === false ) {
	      if ( Class_dragger.parent.actualRadius && Class_dragger.parent.actualRadius() ) {
	        Class_dragger.x = Class_dragger.parent.x + 10 + Class_dragger.parent.actualRadius();
	        Class_dragger.y = Class_dragger.parent.y + 10 + Class_dragger.parent.actualRadius();
	      } else {
	        Class_dragger.x = Class_dragger.parent.x + 60;
	        Class_dragger.y = Class_dragger.parent.y + 60;
	      }
	    }
	    Class_dragger.updateElement();
	  };
	  
	  Class_dragger.hideDragger = function ( val ){
	    if ( Class_dragger.pathElement ) Class_dragger.pathElement.classed("hidden", val);
	    if ( Class_dragger.nodeElement ) Class_dragger.nodeElement.classed("hidden", val);
	    if ( Class_dragger.draggerObject ) Class_dragger.draggerObject.classed("hidden", val);
	    
	  };
	  /** BASE HANDLING FUNCTIONS ------------------------------------------------- **/
	  Class_dragger.id = function ( index ){
	    if ( !arguments.length ) {
	      return Class_dragger.nodeId;
	    }
	    Class_dragger.nodeId = index;
	  };
	  
	  Class_dragger.svgPathLayer = function ( layer ){
	    Class_dragger.pathLayer = layer.append('g');
	  };
	  
	  Class_dragger.svgRoot = function ( root ){
	    if ( !arguments.length )
	      return Class_dragger.rootElement;
	    Class_dragger.rootElement = root;
	    Class_dragger.rootNodeLayer = Class_dragger.rootElement.append('g');
	    Class_dragger.addMouseEvents();
	  };
	  
	  /** DRAWING FUNCTIONS ------------------------------------------------- **/
	  Class_dragger.drawNode = function (){
	    Class_dragger.pathElement = Class_dragger.pathLayer.append('line')
	      .classed("classNodeDragPath", true);
	    Class_dragger.pathElement.attr("x1", 0)
	      .attr("y1", 0)
	      .attr("x2", 0)
	      .attr("y2", 0);
	    
	    // var lineData = [
	    //     {"x": 0, "y": 0},
	    //     {"x": 0, "y": 40},
	    //     {"x": -40, "y": 0},
	    //     {"x": 0, "y": -40},
	    //     {"x": 0, "y": 0}
	    // ];
	    
	    var lineData = [
	      { "x": -40, "y": 0 }, // start
	      { "x": -20, "y": -10 },
	      { "x": 20, "y": -50 },
	      { "x": -10, "y": 0 }, // center
	      { "x": 20, "y": 50 },
	      { "x": -20, "y": 10 },
	      { "x": -40, "y": 0 }
	    ];
	    
	    
	    var lineFunction = d3.svg.line()
	      .x(function ( d ){
	        return d.x;
	      })
	      .y(function ( d ){
	        return d.y;
	      })
	      .interpolate("basis-closed");
	    var pathData = "M 20,40 C 0,15 0,-15 20,-40 L -40,0 Z";
	    // var pathData="M 20,40 C 0,15 0,-15 20,-40 20,-40 -35.22907,-23.905556 -45.113897,0.06313453 -35.22907,20.095453 20,40 20,40 Z";
	    // var pathData="M 39.107144,51.25 C 0,17.362169 0,-13.75 39.285715,-49.821429 c 0,0 -69.58321,34.511175 -100.714286,50.35714329 C -22.96643,20.324376 39.107144,51.25 39.107144,51.25 Z";
	    
	    Class_dragger.nodeElement = Class_dragger.rootNodeLayer.append('path').attr("d", pathData);
	    Class_dragger.nodeElement.classed("classDraggerNode", true);
	    Class_dragger.draggerObject = Class_dragger.rootNodeLayer.append("circle");
	    if ( graph.options().useAccuracyHelper() ) {
	      Class_dragger.draggerObject.attr("r", 40)
	        .attr("cx", 0)
	        .attr("cy", 0)
	        .classed("superHiddenElement", true);
	      Class_dragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	  };
	  
	  Class_dragger.updateElement = function (){
	    
	    // Class_dragger.pathLayer.attr("transform", "translate(" + Class_dragger.x + "," + Class_dragger.y + ")");
	    // Class_dragger.rootElement.attr("transform", "translate(" + Class_dragger.x + "," + Class_dragger.y + ")");
	    if ( Class_dragger.pathElement ) {
	      
	      // compute start point ;
	      
	      
	      var sX = Class_dragger.parent.x,
	        sY = Class_dragger.parent.y,
	        eX = Class_dragger.x,
	        eY = Class_dragger.y;
	      
	      
	      // this is used only when you dont have a proper layout ordering;
	      var dirX = eX - sX;
	      var dirY = eY - sY;
	      var len = Math.sqrt((dirX * dirX) + (dirY * dirY));
	      
	      var nX = dirX / len;
	      var nY = dirY / len;
	      
	      var ppX = sX + nX * Class_dragger.parent.actualRadius();
	      var ppY = sY + nY * Class_dragger.parent.actualRadius();
	      
	      var ncx = nX * 15;
	      var ncy = nY * 15;
	      Class_dragger.draggerObject.attr("cx", ncx)
	        .attr("cy", ncy);
	      
	      Class_dragger.pathElement.attr("x1", ppX)
	        .attr("y1", ppY)
	        .attr("x2", eX)
	        .attr("y2", eY);
	    }
	    var angle = Math.atan2(Class_dragger.parent.y - Class_dragger.y, Class_dragger.parent.x - Class_dragger.x) * 180 / Math.PI;
	    
	    Class_dragger.nodeElement.attr("transform", "translate(" + Class_dragger.x + "," + Class_dragger.y + ")" + "rotate(" + angle + ")");
	    Class_dragger.draggerObject.attr("transform", "translate(" + Class_dragger.x + "," + Class_dragger.y + ")");
	    // console.log("update Elmenent root element"+Class_dragger.x + "," + Class_dragger.y );
	    //
	    // Class_dragger.nodeElement.attr("transform", function (d) {
	    //     return "rotate(" + angle + ")";
	    // });
	  };
	  
	  /** MOUSE HANDLING FUNCTIONS ------------------------------------------------- **/
	  
	  Class_dragger.addMouseEvents = function (){
	    // console.log("adding mouse events");
	    Class_dragger.rootNodeLayer.selectAll("*").on("mouseover", Class_dragger.onMouseOver)
	      .on("mouseout", Class_dragger.onMouseOut)
	      .on("click", function (){
	      })
	      .on("dblclick", function (){
	      })
	      .on("mousedown", Class_dragger.mouseDown)
	      .on("mouseup", Class_dragger.mouseUp);
	  };
	  
	  Class_dragger.mouseDown = function (){
	    Class_dragger.nodeElement.style("cursor", "move");
	    Class_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    Class_dragger.mouseButtonPressed = true;
	    console.log("Mouse DOWN from Dragger");
	  };
	  
	  Class_dragger.mouseUp = function (){
	    Class_dragger.nodeElement.style("cursor", "auto");
	    Class_dragger.mouseButtonPressed = false;
	    console.log("Mouse UP from Dragger");
	  };
	  
	  
	  Class_dragger.mouseEntered = function ( p ){
	    if ( !arguments.length ) return Class_dragger.mouseEnteredVar;
	    Class_dragger.mouseEnteredVar = p;
	    return Class_dragger;
	  };
	  
	  Class_dragger.selectedViaTouch = function ( val ){
	    Class_dragger.nodeElement.classed("classDraggerNode", !val);
	    Class_dragger.nodeElement.classed("classDraggerNodeHovered", val);
	    
	  };
	  
	  Class_dragger.onMouseOver = function (){
	    if ( Class_dragger.mouseEntered() ) {
	      return;
	    }
	    Class_dragger.nodeElement.classed("classDraggerNode", false);
	    Class_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    var selectedNode = Class_dragger.rootElement.node(),
	      nodeContainer = selectedNode.parentNode;
	    nodeContainer.appendChild(selectedNode);
	    
	    Class_dragger.mouseEntered(true);
	    
	  };
	  Class_dragger.onMouseOut = function (){
	    if ( Class_dragger.mouseButtonPressed === true )
	      return;
	    Class_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Class_dragger.nodeElement.classed("classDraggerNode", true);
	    Class_dragger.mouseEntered(false);
	  };
	  
	  Class_dragger.setPosition = function ( x, y ){
	    
	    Class_dragger.x = x;
	    Class_dragger.y = y;
	    Class_dragger.updateElement();
	  };
	  
	  Class_dragger.setAdditionalClassForClass_dragger = function ( name, val ){
	    // console.log("Class_dragger should sett the class here")
	    // Class_dragger.nodeElement.classed(name,val);
	    
	  };
	  return Class_dragger;
	};



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  /** variable defs **/
	  var Range_dragger = {};
	  Range_dragger.nodeId = 10002;
	  Range_dragger.parent = undefined;
	  Range_dragger.x = 0;
	  Range_dragger.y = 0;
	  Range_dragger.rootElement = undefined;
	  Range_dragger.rootNodeLayer = undefined;
	  Range_dragger.pathLayer = undefined;
	  Range_dragger.mouseEnteredVar = false;
	  Range_dragger.mouseButtonPressed = false;
	  Range_dragger.nodeElement = undefined;
	  Range_dragger.draggerObject = undefined;
	  
	  Range_dragger.pathElement = undefined;
	  Range_dragger.typus = "Range_dragger";
	  
	  Range_dragger.type = function (){
	    return Range_dragger.typus;
	  };
	  
	  // TODO: We need the endPoint of the Link here!
	  Range_dragger.parentNode = function (){
	    return Range_dragger.parent;
	  };
	  
	  Range_dragger.hide_dragger = function ( val ){
	    Range_dragger.pathElement.classed("hidden", val);
	    Range_dragger.nodeElement.classed("hidden", val);
	    Range_dragger.draggerObject.classed("hidden", val);
	  };
	  Range_dragger.hideDragger = function ( val ){
	    if ( Range_dragger.pathElement ) Range_dragger.pathElement.classed("hidden", val);
	    if ( Range_dragger.nodeElement ) Range_dragger.nodeElement.classed("hidden", val);
	    if ( Range_dragger.draggerObject ) Range_dragger.draggerObject.classed("hidden", val);
	    
	    
	  };
	  
	  Range_dragger.reDrawEverthing = function (){
	    Range_dragger.setParentProperty(Range_dragger.parent);
	  };
	  Range_dragger.updateRange = function ( newRange ){
	    
	    if ( graph.genericPropertySanityCheck(Range_dragger.parent.domain(), newRange,
	        Range_dragger.parent.type(),
	        "Could not update range", "Restoring previous range") === false ) return;
	    
	    // check for triple duplicates!
	    
	    if ( graph.propertyCheckExistenceChecker(Range_dragger.parent, Range_dragger.parent.domain(), newRange) === false )
	      return;
	    if ( Range_dragger.parent.labelElement() === undefined ) return;
	    if ( Range_dragger.parent.labelElement().attr("transform") === "translate(0,15)" ||
	      Range_dragger.parent.labelElement().attr("transform") === "translate(0,-15)" ) {
	      var prop = Range_dragger.parent;
	      Range_dragger.parent.inverse().inverse(null);
	      Range_dragger.parent.inverse(null);
	      prop.range(newRange);
	    }
	    
	    else {
	      Range_dragger.parent.range(newRange);
	    }
	    // update the position of the new range
	    var rX = newRange.x;
	    var rY = newRange.y;
	    
	    var dX = Range_dragger.parent.domain().x;
	    var dY = Range_dragger.parent.domain().y;
	    
	    
	    // center
	    var cX = 0.49 * (dX + rX);
	    var cY = 0.49 * (dY + rY);
	    // put position there;
	    Range_dragger.parent.labelElement().x = cX;
	    Range_dragger.parent.labelElement().px = cX;
	    Range_dragger.parent.labelElement().y = cY;
	    Range_dragger.parent.labelElement().py = cY;
	    
	  };
	  
	  Range_dragger.setParentProperty = function ( parentProperty, inversed ){
	    Range_dragger.parent = parentProperty;
	    var iP;
	    var renElem;
	    Range_dragger.isLoopProperty = false;
	    if ( parentProperty.domain() === parentProperty.range() ) Range_dragger.isLoopProperty = true;
	    Range_dragger.parent = parentProperty;
	    renElem = parentProperty.labelObject();
	    if ( inversed === true ) {
	      if ( parentProperty.labelElement() && parentProperty.labelElement().attr("transform") === "translate(0,15)" ) {
	        iP = renElem.linkDomainIntersection;
	        if ( renElem.linkDomainIntersection ) {
	          Range_dragger.x = iP.x;
	          Range_dragger.y = iP.y;
	        }
	      } else {
	        iP = renElem.linkRangeIntersection;
	        if ( renElem.linkRangeIntersection ) {
	          Range_dragger.x = iP.x;
	          Range_dragger.y = iP.y;
	        }
	      }
	    }
	    else {
	      iP = renElem.linkRangeIntersection;
	      if ( renElem.linkRangeIntersection ) {
	        Range_dragger.x = iP.x;
	        Range_dragger.y = iP.y;
	      }
	    }
	    
	    Range_dragger.updateElement();
	  };
	  
	  
	  /** BASE HANDLING FUNCTIONS ------------------------------------------------- **/
	  Range_dragger.id = function ( index ){
	    if ( !arguments.length ) {
	      return Range_dragger.nodeId;
	    }
	    Range_dragger.nodeId = index;
	  };
	  
	  Range_dragger.svgPathLayer = function ( layer ){
	    Range_dragger.pathLayer = layer.append('g');
	  };
	  
	  Range_dragger.svgRoot = function ( root ){
	    if ( !arguments.length )
	      return Range_dragger.rootElement;
	    Range_dragger.rootElement = root;
	    Range_dragger.rootNodeLayer = Range_dragger.rootElement.append('g');
	    Range_dragger.addMouseEvents();
	  };
	  
	  /** DRAWING FUNCTIONS ------------------------------------------------- **/
	  Range_dragger.drawNode = function (){
	    Range_dragger.pathElement = Range_dragger.pathLayer.append('line')
	      .classed("classNodeDragPath", true);
	    Range_dragger.pathElement.attr("x1", 0)
	      .attr("y1", 0)
	      .attr("x2", 0)
	      .attr("y2", 0);
	    
	    // var lineData = [
	    //     {"x": 0, "y": 0},
	    //     {"x": 0, "y": 40},
	    //     {"x": -40, "y": 0},
	    //     {"x": 0, "y": -40},
	    //     {"x": 0, "y": 0}
	    // ];
	    
	    var lineData = [
	      { "x": -40, "y": 0 }, // start
	      { "x": -20, "y": -10 },
	      { "x": 20, "y": -50 },
	      { "x": -10, "y": 0 }, // center
	      { "x": 20, "y": 50 },
	      { "x": -20, "y": 10 },
	      { "x": -40, "y": 0 }
	    ];
	    
	    
	    var lineFunction = d3.svg.line()
	      .x(function ( d ){
	        return d.x;
	      })
	      .y(function ( d ){
	        return d.y;
	      })
	      .interpolate("basis-closed");
	    var pathData = "M 61,40 C 41,15 41,-15 61,-40 L 1,0 Z";
	    
	    Range_dragger.nodeElement = Range_dragger.rootNodeLayer.append('path').attr("d", pathData);
	    Range_dragger.nodeElement.classed("classDraggerNode", true);
	    if ( graph.options().useAccuracyHelper() ) {
	      Range_dragger.draggerObject = Range_dragger.rootNodeLayer.append("circle");
	      Range_dragger.draggerObject.attr("r", 40)
	        .attr("cx", 0)
	        .attr("cy", 0)
	        .classed("superHiddenElement", true);
	      Range_dragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	  };
	  
	  Range_dragger.updateElementViaDomainDragger = function ( x, y ){
	    
	    var range_x = x;
	    var range_y = y;
	    
	    var dex = Range_dragger.parent.range().x;
	    var dey = Range_dragger.parent.range().y;
	    
	    var dir_X = x - dex;
	    var dir_Y = y - dey;
	    
	    var len = Math.sqrt(dir_X * dir_X + dir_Y * dir_Y);
	    
	    var nX = dir_X / len;
	    var nY = dir_Y / len;
	    
	    
	    var ep_range_x = dex + nX * Range_dragger.parent.range().actualRadius();
	    var ep_range_y = dey + nY * Range_dragger.parent.range().actualRadius();
	    
	    
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    len = Math.sqrt(dx * dx + dy * dy);
	    nX = dx / len;
	    nY = dy / len;
	    
	    var angle = Math.atan2(ep_range_y - range_y, ep_range_x - range_x) * 180 / Math.PI + 180;
	    Range_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    var doX = ep_range_x + nX * 40;
	    var doY = ep_range_y + nY * 40;
	    Range_dragger.draggerObject.attr("transform", "translate(" + doX + "," + doY + ")");
	    
	  };
	  
	  
	  Range_dragger.updateElement = function (){
	    if ( Range_dragger.mouseButtonPressed === true || Range_dragger.parent === undefined ) return;
	    
	    var range = Range_dragger.parent.range();
	    var iP = Range_dragger.parent.labelObject().linkRangeIntersection;
	    if ( Range_dragger.parent.labelElement() === undefined ) return;
	    var offsetForLoop = 48;
	    if ( Range_dragger.parent.labelElement().attr("transform") === "translate(0,15)" ) {
	      range = Range_dragger.parent.inverse().domain();
	      iP = Range_dragger.parent.labelObject().linkDomainIntersection;
	      offsetForLoop = -48;
	    }
	    
	    if ( iP === undefined ) return;
	    var range_x = range.x;
	    var range_y = range.y;
	    
	    var ep_range_x = iP.x;
	    var ep_range_y = iP.y;
	    // offset for dragger object
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    var len = Math.sqrt(dx * dx + dy * dy);
	    var nX = dx / len;
	    var nY = dy / len;
	    var angle = Math.atan2(ep_range_y - range_y, ep_range_x - range_x) * 180 / Math.PI;
	    
	    var doX = ep_range_x - nX * 40;
	    var doY = ep_range_y - nY * 40;
	    
	    if ( Range_dragger.isLoopProperty === true )
	      angle -= offsetForLoop;
	    
	    
	    Range_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    Range_dragger.draggerObject.attr("transform", "translate(" + doX + "," + doY + ")");
	    
	    
	  };
	  
	  /** MOUSE HANDLING FUNCTIONS ------------------------------------------------- **/
	  
	  Range_dragger.addMouseEvents = function (){
	    var rootLayer = Range_dragger.rootNodeLayer.selectAll("*");
	    rootLayer.on("mouseover", Range_dragger.onMouseOver)
	      .on("mouseout", Range_dragger.onMouseOut)
	      .on("click", function (){
	      })
	      .on("dblclick", function (){
	      })
	      .on("mousedown", Range_dragger.mouseDown)
	      .on("mouseup", Range_dragger.mouseUp);
	  };
	  
	  Range_dragger.mouseDown = function (){
	    Range_dragger.nodeElement.style("cursor", "move");
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    Range_dragger.mouseButtonPressed = true;
	  };
	  
	  Range_dragger.mouseUp = function (){
	    Range_dragger.nodeElement.style("cursor", "auto");
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Range_dragger.mouseButtonPressed = false;
	  };
	  
	  
	  Range_dragger.mouseEntered = function ( p ){
	    if ( !arguments.length ) return Range_dragger.mouseEnteredVar;
	    Range_dragger.mouseEnteredVar = p;
	    return Range_dragger;
	  };
	  
	  Range_dragger.selectedViaTouch = function ( val ){
	    Range_dragger.nodeElement.classed("classDraggerNode", !val);
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", val);
	    
	  };
	  
	  Range_dragger.onMouseOver = function (){
	    if ( Range_dragger.mouseEntered() ) {
	      return;
	    }
	    Range_dragger.nodeElement.classed("classDraggerNode", false);
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    var selectedNode = Range_dragger.rootElement.node(),
	      nodeContainer = selectedNode.parentNode;
	    nodeContainer.appendChild(selectedNode);
	    
	    Range_dragger.mouseEntered(true);
	    
	  };
	  Range_dragger.onMouseOut = function (){
	    if ( Range_dragger.mouseButtonPressed === true )
	      return;
	    Range_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Range_dragger.nodeElement.classed("classDraggerNode", true);
	    Range_dragger.mouseEntered(false);
	  };
	  
	  Range_dragger.setPosition = function ( x, y ){
	    var range_x = Range_dragger.parent.domain().x;
	    var range_y = Range_dragger.parent.domain().y;
	    
	    // var position of the rangeEndPoint
	    var ep_range_x = x;
	    var ep_range_y = y;
	    
	    // offset for dragger object
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    
	    var len = Math.sqrt(dx * dx + dy * dy);
	    
	    var nX = dx / len;
	    var nY = dy / len;
	    
	    
	    var angle = Math.atan2(dy, dx) * 180 / Math.PI;
	    var doX = ep_range_x + nX * 40;
	    var doY = ep_range_y + nY * 40;
	    Range_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    Range_dragger.draggerObject.attr("transform", "translate(" + doX + "," + doY + ")");
	    Range_dragger.x = x;
	    Range_dragger.y = y;
	    
	  };
	  
	  Range_dragger.setAdditionalClassForClass_dragger = function ( name, val ){
	    
	  };
	  return Range_dragger;
	};



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	module.exports = function ( graph ){
	  /** variable defs **/
	  var Domain_dragger = {};
	  Domain_dragger.nodeId = 10002;
	  Domain_dragger.parent = undefined;
	  Domain_dragger.x = 0;
	  Domain_dragger.y = 0;
	  Domain_dragger.rootElement = undefined;
	  Domain_dragger.rootNodeLayer = undefined;
	  Domain_dragger.pathLayer = undefined;
	  Domain_dragger.mouseEnteredVar = false;
	  Domain_dragger.mouseButtonPressed = false;
	  Domain_dragger.nodeElement = undefined;
	  Domain_dragger.draggerObject = undefined;
	  
	  Domain_dragger.pathElement = undefined;
	  Domain_dragger.typus = "Domain_dragger";
	  
	  Domain_dragger.type = function (){
	    return Domain_dragger.typus;
	  };
	  
	  
	  // TODO: We need the endPoint of the Link here!
	  Domain_dragger.parentNode = function (){
	    return Domain_dragger.parent;
	  };
	  
	  Domain_dragger.hide_dragger = function ( val ){
	    Domain_dragger.pathElement.classed("hidden", val);
	    Domain_dragger.nodeElement.classed("hidden", val);
	    Domain_dragger.draggerObject.classed("hidden", val);
	  };
	  
	  Domain_dragger.reDrawEverthing = function (){
	    Domain_dragger.setParentProperty(Domain_dragger.parent);
	  };
	  Domain_dragger.updateDomain = function ( newDomain ){
	    
	    if ( graph.genericPropertySanityCheck(Domain_dragger.parent.range(), newDomain, Domain_dragger.parent.type(),
	        "Could not update domain", "Restoring previous domain") === false ) {
	      Domain_dragger.updateElement();
	      return;
	    }
	    
	    if ( graph.propertyCheckExistenceChecker(Domain_dragger.parent, newDomain, Domain_dragger.parent.range()) === false )
	      return;
	    
	    
	    if ( Domain_dragger.parent.labelElement() === undefined ) {
	      Domain_dragger.updateElement();
	      return;
	    }
	    if ( Domain_dragger.parent.labelElement().attr("transform") === "translate(0,15)" ||
	      Domain_dragger.parent.labelElement().attr("transform") === "translate(0,-15)" ) {
	      var prop = Domain_dragger.parent;
	      Domain_dragger.parent.inverse().inverse(null);
	      Domain_dragger.parent.inverse(null);
	      console.log("SPLITTING ITEMS!");
	      prop.domain(newDomain);
	    }
	    else {
	      Domain_dragger.parent.domain(newDomain);
	    }
	    
	    // update the position of the new range
	    var rX = Domain_dragger.parent.range().x;
	    var rY = Domain_dragger.parent.range().y;
	    var dX = newDomain.x;
	    var dY = newDomain.y;
	    
	    // center
	    var cX = 0.49 * (dX + rX);
	    var cY = 0.49 * (dY + rY);
	    // put position there;
	    Domain_dragger.parent.labelObject().x = cX;
	    Domain_dragger.parent.labelObject().px = cX;
	    Domain_dragger.parent.labelObject().y = cY;
	    Domain_dragger.parent.labelObject().py = cY;
	    Domain_dragger.updateElement();
	    
	  };
	  
	  Domain_dragger.setParentProperty = function ( parentProperty, inverted ){
	    Domain_dragger.invertedProperty = inverted;
	    var renElem;
	    var iP;
	    Domain_dragger.isLoopProperty = false;
	    if ( parentProperty.domain() === parentProperty.range() )
	      Domain_dragger.isLoopProperty = true;
	    
	    Domain_dragger.parent = parentProperty;
	    renElem = parentProperty.labelObject();
	    if ( inverted === true ) {
	      
	      // this is the lower element
	      if ( parentProperty.labelElement() && parentProperty.labelElement().attr("transform") === "translate(0,15)" ) {
	        // console.log("This is the lower element!");
	        iP = renElem.linkRangeIntersection;
	        if ( renElem.linkRangeIntersection ) {
	          Domain_dragger.x = iP.x;
	          Domain_dragger.y = iP.y;
	        }
	      }
	      else {
	        // console.log("This is the upper  element");
	        iP = renElem.linkDomainIntersection;
	        if ( renElem.linkDomainIntersection ) {
	          Domain_dragger.x = iP.x;
	          Domain_dragger.y = iP.y;
	        }
	      }
	    }
	    else {
	      // console.log("This is single element");
	      iP = renElem.linkDomainIntersection;
	      if ( renElem.linkDomainIntersection ) {
	        Domain_dragger.x = iP.x;
	        Domain_dragger.y = iP.y;
	      }
	    }
	    Domain_dragger.updateElement();
	    
	  };
	  
	  Domain_dragger.hideDragger = function ( val ){
	    if ( Domain_dragger.pathElement ) Domain_dragger.pathElement.classed("hidden", val);
	    if ( Domain_dragger.nodeElement ) Domain_dragger.nodeElement.classed("hidden", val);
	    if ( Domain_dragger.draggerObject ) Domain_dragger.draggerObject.classed("hidden", val);
	    
	    
	  };
	  /** BASE HANDLING FUNCTIONS ------------------------------------------------- **/
	  Domain_dragger.id = function ( index ){
	    if ( !arguments.length ) {
	      return Domain_dragger.nodeId;
	    }
	    Domain_dragger.nodeId = index;
	  };
	  
	  Domain_dragger.svgPathLayer = function ( layer ){
	    Domain_dragger.pathLayer = layer.append('g');
	  };
	  
	  Domain_dragger.svgRoot = function ( root ){
	    if ( !arguments.length )
	      return Domain_dragger.rootElement;
	    Domain_dragger.rootElement = root;
	    Domain_dragger.rootNodeLayer = Domain_dragger.rootElement.append('g');
	    Domain_dragger.addMouseEvents();
	  };
	  
	  /** DRAWING FUNCTIONS ------------------------------------------------- **/
	  Domain_dragger.drawNode = function (){
	    Domain_dragger.pathElement = Domain_dragger.pathLayer.append('line')
	      .classed("classNodeDragPath", true);
	    Domain_dragger.pathElement.attr("x1", 0)
	      .attr("y1", 0)
	      .attr("x2", 0)
	      .attr("y2", 0);
	    
	    var pathData = "M 10,40 C -10,15 -10,-15 10,-40 -8.8233455,-13.641384 -36.711107,-5.1228436 -50,0 -36.696429,4.9079017 -8.6403157,13.745728 10,40 Z";
	    Domain_dragger.nodeElement = Domain_dragger.rootNodeLayer.append('path').attr("d", pathData);
	    Domain_dragger.nodeElement.classed("classDraggerNode", true);
	    if ( graph.options().useAccuracyHelper() ) {
	      Domain_dragger.draggerObject = Domain_dragger.rootNodeLayer.append("circle");
	      Domain_dragger.draggerObject.attr("r", 40)
	        .attr("cx", 0)
	        .attr("cy", 0)
	        .classed("superHiddenElement", true);
	      Domain_dragger.draggerObject.classed("superOpacityElement", !graph.options().showDraggerObject());
	    }
	    
	    
	  };
	  Domain_dragger.updateElementViaRangeDragger = function ( x, y ){
	    var range_x = x;
	    var range_y = y;
	    
	    var dex = Domain_dragger.parent.domain().x;
	    var dey = Domain_dragger.parent.domain().y;
	    
	    var dir_X = x - dex;
	    var dir_Y = y - dey;
	    
	    var len = Math.sqrt(dir_X * dir_X + dir_Y * dir_Y);
	    
	    var nX = dir_X / len;
	    var nY = dir_Y / len;
	    
	    
	    var ep_range_x = dex + nX * Domain_dragger.parent.domain().actualRadius();
	    var ep_range_y = dey + nY * Domain_dragger.parent.domain().actualRadius();
	    
	    var angle = Math.atan2(ep_range_y - range_y, ep_range_x - range_x) * 180 / Math.PI;
	    
	    Domain_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    var dox = ep_range_x + nX * 20;
	    var doy = ep_range_y + nY * 20;
	    Domain_dragger.draggerObject.attr("transform", "translate(" + dox + "," + doy + ")");
	  };
	  
	  
	  Domain_dragger.updateElement = function (){
	    if ( Domain_dragger.mouseButtonPressed === true || Domain_dragger.parent === undefined ) return;
	    
	    var domain = Domain_dragger.parent.domain();
	    var iP = Domain_dragger.parent.labelObject().linkDomainIntersection;
	    if ( Domain_dragger.parent.labelElement() === undefined ) return;
	    if ( Domain_dragger.parent.labelElement().attr("transform") === "translate(0,15)" ) {
	      Domain_dragger.parent.inverse().domain();
	      iP = Domain_dragger.parent.labelObject().linkRangeIntersection;
	      
	    }
	    var range_x = domain.x;
	    var range_y = domain.y;
	    
	    
	    if ( iP === undefined ) return;
	    var ep_range_x = iP.x;
	    var ep_range_y = iP.y;
	    
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    var len = Math.sqrt(dx * dx + dy * dy);
	    
	    var nX = dx / len;
	    var nY = dy / len;
	    
	    var dox = ep_range_x - nX * 20;
	    var doy = ep_range_y - nY * 20;
	    var angle = Math.atan2(ep_range_y - range_y, ep_range_x - range_x) * 180 / Math.PI + 180;
	    
	    Domain_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    Domain_dragger.draggerObject.attr("transform", "translate(" + dox + "," + doy + ")");
	  };
	  
	  /** MOUSE HANDLING FUNCTIONS ------------------------------------------------- **/
	  
	  Domain_dragger.addMouseEvents = function (){
	    var rootLayer = Domain_dragger.rootNodeLayer.selectAll("*");
	    rootLayer.on("mouseover", Domain_dragger.onMouseOver)
	      .on("mouseout", Domain_dragger.onMouseOut)
	      .on("click", function (){
	      })
	      .on("dblclick", function (){
	      })
	      .on("mousedown", Domain_dragger.mouseDown)
	      .on("mouseup", Domain_dragger.mouseUp);
	  };
	  
	  Domain_dragger.mouseDown = function (){
	    Domain_dragger.nodeElement.style("cursor", "move");
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    Domain_dragger.mouseButtonPressed = true;
	  };
	  
	  Domain_dragger.mouseUp = function (){
	    Domain_dragger.nodeElement.style("cursor", "auto");
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Domain_dragger.mouseButtonPressed = false;
	  };
	  
	  
	  Domain_dragger.mouseEntered = function ( p ){
	    if ( !arguments.length ) return Domain_dragger.mouseEnteredVar;
	    Domain_dragger.mouseEnteredVar = p;
	    return Domain_dragger;
	  };
	  
	  Domain_dragger.selectedViaTouch = function ( val ){
	    Domain_dragger.nodeElement.classed("classDraggerNode", !val);
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", val);
	    
	  };
	  
	  Domain_dragger.onMouseOver = function (){
	    if ( Domain_dragger.mouseEntered() ) {
	      return;
	    }
	    Domain_dragger.nodeElement.classed("classDraggerNode", false);
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", true);
	    var selectedNode = Domain_dragger.rootElement.node(),
	      nodeContainer = selectedNode.parentNode;
	    nodeContainer.appendChild(selectedNode);
	    
	    Domain_dragger.mouseEntered(true);
	    
	  };
	  Domain_dragger.onMouseOut = function (){
	    if ( Domain_dragger.mouseButtonPressed === true )
	      return;
	    Domain_dragger.nodeElement.classed("classDraggerNodeHovered", false);
	    Domain_dragger.nodeElement.classed("classDraggerNode", true);
	    Domain_dragger.mouseEntered(false);
	  };
	  
	  Domain_dragger.setPosition = function ( x, y ){
	    var range_x = Domain_dragger.parent.range().x;
	    var range_y = Domain_dragger.parent.range().y;
	    
	    // var position of the rangeEndPoint
	    var ep_range_x = x;
	    var ep_range_y = y;
	    
	    // offset for dragger object
	    var dx = range_x - ep_range_x;
	    var dy = range_y - ep_range_y;
	    
	    var len = Math.sqrt(dx * dx + dy * dy);
	    
	    var nX = dx / len;
	    var nY = dy / len;
	    var dox = ep_range_x + nX * 20;
	    var doy = ep_range_y + nY * 20;
	    
	    var angle = Math.atan2(range_y - ep_range_y, range_x - ep_range_x) * 180 / Math.PI + 180;
	    
	    Domain_dragger.nodeElement.attr("transform", "translate(" + ep_range_x + "," + ep_range_y + ")" + "rotate(" + angle + ")");
	    Domain_dragger.draggerObject.attr("transform", "translate(" + dox + "," + doy + ")");
	    
	    Domain_dragger.x = x;
	    Domain_dragger.y = y;
	    
	  };
	  
	  Domain_dragger.setAdditionalClassForClass_dragger = function ( name, val ){
	    // console.log("Class_dragger should sett the class here")
	    // Class_dragger.nodeElement.classed(name,val);
	    
	  };
	  return Domain_dragger;
	};




/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var CenteringTextElement = __webpack_require__(14);
	var elementTools = __webpack_require__(63)();
	var math = __webpack_require__(43)();
	module.exports = function ( graph ){
	  /** variable defs **/
	  var ShadowClone = {};
	  ShadowClone.nodeId = 10003;
	  ShadowClone.parent = undefined;
	  ShadowClone.s_x = 0;
	  ShadowClone.s_y = 0;
	  ShadowClone.e_x = 0;
	  ShadowClone.e_y = 0;
	  ShadowClone.rootElement = undefined;
	  ShadowClone.rootNodeLayer = undefined;
	  ShadowClone.pathLayer = undefined;
	  ShadowClone.nodeElement = undefined;
	  ShadowClone.pathElement = undefined;
	  ShadowClone.typus = "shadowClone";
	  
	  
	  ShadowClone.type = function (){
	    return ShadowClone.typus;
	  };
	  
	  // TODO: We need the endPoint of the Link here!
	  ShadowClone.parentNode = function (){
	    return ShadowClone.parent;
	  };
	  
	  ShadowClone.setParentProperty = function ( parentProperty, inverted ){
	    ShadowClone.invertedProperty = inverted;
	    ShadowClone.parent = parentProperty;
	    var renElment;
	    if ( inverted === true ) {
	      renElment = parentProperty.inverse().labelObject();
	      if ( renElment.linkRangeIntersection && renElment.linkDomainIntersection ) {
	        var iiP_range = renElment.linkDomainIntersection;
	        var iiP_domain = renElment.linkRangeIntersection;
	        ShadowClone.s_x = iiP_domain.x;
	        ShadowClone.s_y = iiP_domain.y;
	        ShadowClone.e_x = iiP_range.x;
	        ShadowClone.e_y = iiP_range.y;
	      }
	    }
	    else {
	      renElment = parentProperty.labelObject();
	      
	      if ( renElment.linkRangeIntersection && renElment.linkDomainIntersection ) {
	        var iP_range = renElment.linkRangeIntersection;
	        var iP_domain = renElment.linkDomainIntersection;
	        ShadowClone.s_x = iP_domain.x;
	        ShadowClone.s_y = iP_domain.y;
	        ShadowClone.e_x = iP_range.x;
	        ShadowClone.e_y = iP_range.y;
	      }
	      
	    }
	    
	    ShadowClone.rootNodeLayer.remove();
	    ShadowClone.rootNodeLayer = ShadowClone.rootElement.append('g');
	    ShadowClone.rootNodeLayer.datum(parentProperty);
	    
	    // ShadowClone.pathElement.remove();
	    // ShadowClone.pathElement = ShadowClone.pathLayer.append('line');
	    //
	    // ShadowClone.pathElement.attr("x1", ShadowClone.s_x)
	    //     .attr("y1", ShadowClone.s_y)
	    //     .attr("x2", ShadowClone.e_x)
	    //     .attr("y2", ShadowClone.e_y);
	    ShadowClone.pathElement.remove();
	    ShadowClone.pathElement = ShadowClone.pathLayer.append('line');
	    ShadowClone.markerElement = ShadowClone.pathLayer.append("marker");
	    ShadowClone.markerElement.attr("id", "shadowCloneMarker");
	    ShadowClone.pathElement.attr("x1", ShadowClone.e_x)
	      .attr("y1", ShadowClone.e_y)
	      .attr("x2", ShadowClone.s_x)
	      .attr("y2", ShadowClone.s_y);
	    ShadowClone.pathElement.classed(parentProperty.linkType(), true);
	    
	    if ( parentProperty.markerElement() ) {
	      ShadowClone.markerElement.attr("viewBox", parentProperty.markerElement().attr("viewBox"))
	        .attr("markerWidth", parentProperty.markerElement().attr("markerWidth"))
	        .attr("markerHeight", parentProperty.markerElement().attr("markerHeight"))
	        .attr("orient", parentProperty.markerElement().attr("orient"));
	      
	      var markerPath = parentProperty.markerElement().select("path");
	      ShadowClone.markerElement.append("path")
	        .attr("d", markerPath.attr("d"))
	        .classed(parentProperty.markerType(), true);
	      
	      ShadowClone.pathElement.attr("marker-end", "url(#" + "shadowCloneMarker" + ")");
	      ShadowClone.markerElement.classed("hidden", !elementTools.isDatatypeProperty(parentProperty));
	    }
	    var rect = ShadowClone.rootNodeLayer.append("rect")
	      .classed(parentProperty.styleClass(), true)
	      .classed("property", true)
	      .attr("x", -parentProperty.width() / 2)
	      .attr("y", -parentProperty.height() / 2)
	      .attr("width", parentProperty.width())
	      .attr("height", parentProperty.height());
	    
	    if ( parentProperty.visualAttributes() ) {
	      rect.classed(parentProperty.visualAttributes(), true);
	    }
	    rect.classed("datatype", false);
	    var bgColor = parentProperty.backgroundColor();
	    
	    if ( parentProperty.attributes().indexOf("deprecated") > -1 ) {
	      bgColor = undefined;
	      rect.classed("deprecatedproperty", true);
	    } else {
	      rect.classed("deprecatedproperty", false);
	    }
	    rect.style("fill", bgColor);
	    
	    // add Text;
	    var equivalentsString = parentProperty.equivalentsString();
	    var suffixForFollowingEquivalents = equivalentsString ? "," : "";
	    
	    
	    var textElement = new CenteringTextElement(ShadowClone.rootNodeLayer, bgColor);
	    textElement.addText(parentProperty.labelForCurrentLanguage(), "", suffixForFollowingEquivalents);
	    textElement.addEquivalents(equivalentsString);
	    textElement.addSubText(parentProperty.indicationString());
	    
	    
	    var cx = 0.5 * (ShadowClone.s_x + ShadowClone.e_x);
	    var cy = 0.5 * (ShadowClone.s_y + ShadowClone.e_y);
	    ShadowClone.rootNodeLayer.attr("transform", "translate(" + cx + "," + cy + ")");
	    ShadowClone.rootNodeLayer.classed("hidden", true);
	    ShadowClone.pathElement.classed("hidden", true);
	    
	    
	  };
	  
	  ShadowClone.hideClone = function ( val ){
	    if ( ShadowClone.rootNodeLayer ) ShadowClone.rootNodeLayer.classed("hidden", val);
	    if ( ShadowClone.pathElement ) ShadowClone.pathElement.classed("hidden", val);
	  };
	  
	  ShadowClone.hideParentProperty = function ( val ){
	    
	    var labelObj = ShadowClone.parent.labelObject();
	    if ( labelObj ) {
	      if ( ShadowClone.parent.labelElement().attr("transform") === "translate(0,15)" ||
	        ShadowClone.parent.labelElement().attr("transform") === "translate(0,-15)" )
	        ShadowClone.parent.inverse().hide(val);
	      
	      
	    }
	    ShadowClone.parent.hide(val);
	    
	    
	  };
	  
	  /** BASE HANDLING FUNCTIONS ------------------------------------------------- **/
	  ShadowClone.id = function ( index ){
	    if ( !arguments.length ) {
	      return ShadowClone.nodeId;
	    }
	    ShadowClone.nodeId = index;
	  };
	  
	  ShadowClone.svgPathLayer = function ( layer ){
	    ShadowClone.pathLayer = layer.append('g');
	  };
	  
	  ShadowClone.svgRoot = function ( root ){
	    if ( !arguments.length )
	      return ShadowClone.rootElement;
	    ShadowClone.rootElement = root;
	    ShadowClone.rootNodeLayer = ShadowClone.rootElement.append('g');
	    
	  };
	  
	  /** DRAWING FUNCTIONS ------------------------------------------------- **/
	  ShadowClone.drawClone = function (){
	    ShadowClone.pathElement = ShadowClone.pathLayer.append('line');
	    
	    ShadowClone.pathElement.attr("x1", 0)
	      .attr("y1", 0)
	      .attr("x2", 0)
	      .attr("y2", 0);
	    
	  };
	  
	  
	  ShadowClone.updateElement = function (){
	    ShadowClone.pathElement.attr("x1", ShadowClone.e_x)
	      .attr("y1", ShadowClone.e_y)
	      .attr("x2", ShadowClone.s_x)
	      .attr("y2", ShadowClone.s_y);
	    
	    var cx = 0.5 * (ShadowClone.s_x + ShadowClone.e_x);
	    var cy = 0.5 * (ShadowClone.s_y + ShadowClone.e_y);
	    ShadowClone.rootNodeLayer.attr("transform", "translate(" + cx + "," + cy + ")");
	  };
	  
	  ShadowClone.setInitialPosition = function (){
	    
	    var renElment = ShadowClone.parent.labelObject();
	    if ( renElment.linkRangeIntersection && renElment.linkDomainIntersection ) {
	      var iP_range = renElment.linkRangeIntersection;
	      var iP_domain = renElment.linkDomainIntersection;
	      ShadowClone.e_x = iP_domain.x;
	      ShadowClone.e_y = iP_domain.y;
	      ShadowClone.s_x = iP_range.x;
	      ShadowClone.s_y = iP_range.y;
	    }
	    ShadowClone.updateElement();
	    return;
	    //
	    // var rex=ShadowClone.parent.range().x;
	    // var rey=ShadowClone.parent.range().y;
	    //
	    //
	    // var dex=ShadowClone.parent.domain().x;
	    // var dey=ShadowClone.parent.domain().y;
	    //
	    //
	    // var dir_X= rex-dex;
	    // var dir_Y= rey-dey;
	    //
	    // var len=Math.sqrt(dir_X*dir_X+dir_Y*dir_Y);
	    // var nX=dir_X/len;
	    // var nY=dir_Y/len;
	    // ShadowClone.s_x=rex-nX*ShadowClone.parent.range().actualRadius();
	    // ShadowClone.s_y=rey-nY*ShadowClone.parent.range().actualRadius();
	    //
	    // ShadowClone.e_x=dex+nX*ShadowClone.parent.domain().actualRadius();
	    // ShadowClone.e_y=dey+nY*ShadowClone.parent.domain().actualRadius();
	    // ShadowClone.updateElement();
	    
	  };
	  ShadowClone.setPositionDomain = function ( e_x, e_y ){
	    
	    var rex = ShadowClone.parent.range().x;
	    var rey = ShadowClone.parent.range().y;
	    
	    
	    if ( elementTools.isDatatype(ShadowClone.parent.range()) === true ) {
	      var intersection = math.calculateIntersection({ x: e_x, y: e_y }, ShadowClone.parent.range(), 0);
	      ShadowClone.s_x = intersection.x;
	      ShadowClone.s_y = intersection.y;
	    } else {
	      var dir_X = rex - e_x;
	      var dir_Y = rey - e_y;
	      
	      var len = Math.sqrt(dir_X * dir_X + dir_Y * dir_Y);
	      
	      var nX = dir_X / len;
	      var nY = dir_Y / len;
	      ShadowClone.s_x = rex - nX * ShadowClone.parent.range().actualRadius();
	      ShadowClone.s_y = rey - nY * ShadowClone.parent.range().actualRadius();
	      
	    }
	    
	    
	    ShadowClone.e_x = e_x;
	    ShadowClone.e_y = e_y;
	    ShadowClone.updateElement();
	  };
	  
	  ShadowClone.setPosition = function ( s_x, s_y ){
	    ShadowClone.s_x = s_x;
	    ShadowClone.s_y = s_y;
	    
	    // add normalized dir;
	    
	    var dex = ShadowClone.parent.domain().x;
	    var dey = ShadowClone.parent.domain().y;
	    
	    var dir_X = s_x - dex;
	    var dir_Y = s_y - dey;
	    
	    var len = Math.sqrt(dir_X * dir_X + dir_Y * dir_Y);
	    
	    var nX = dir_X / len;
	    var nY = dir_Y / len;
	    
	    
	    ShadowClone.e_x = dex + nX * ShadowClone.parent.domain().actualRadius();
	    ShadowClone.e_y = dey + nY * ShadowClone.parent.domain().actualRadius();
	    
	    
	    ShadowClone.updateElement();
	    
	    
	  };
	  
	  
	  /** MOUSE HANDLING FUNCTIONS ------------------------------------------------- **/
	  
	  return ShadowClone;
	};




/***/ }),
/* 72 */
/***/ (function(module, exports) {

	module.exports = function ( graph ){
	  /** variable defs **/
	  var prefixRepresentationModule = {};
	  
	  var currentPrefixModel;
	  
	  prefixRepresentationModule.updatePrefixModel = function (){
	    currentPrefixModel = graph.options().prefixList();
	  };
	  
	  
	  prefixRepresentationModule.validURL = function ( url ){
	    return validURL(url);
	  };
	  function validURL( str ){
	    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	    return urlregex.test(str);
	  }
	  
	  function splitURLIntoBaseAndResource( fullURL ){
	    var splitedURL = { base: "", resource: "" };
	    if ( fullURL === undefined ) {
	      splitedURL = { base: "ERROR", resource: "NOT FOUND" };
	      return splitedURL;
	    }
	    
	    var resource, base;
	    // check if there is a last hashTag
	    if ( fullURL.indexOf("#") > -1 ) {
	      resource = fullURL.substring(fullURL.lastIndexOf('#') + 1);
	      base = fullURL.substring(0, fullURL.length - resource.length);
	      // overwrite base if it is ontologyIri;
	      if ( base === graph.options().getGeneralMetaObjectProperty('iri') ) {
	        base = ":";
	      }
	      splitedURL.base = base;
	      splitedURL.resource = resource;
	    } else {
	      resource = fullURL.substring(fullURL.lastIndexOf('/') + 1);
	      base = fullURL.substring(0, fullURL.length - resource.length);
	      // overwrite base if it is ontologyIri;
	      if ( base === graph.options().getGeneralMetaObjectProperty('iri') ) {
	        base = ":";
	      }
	      splitedURL.base = base;
	      splitedURL.resource = resource;
	    }
	    return splitedURL;
	  }
	  
	  prefixRepresentationModule.getPrefixRepresentationForFullURI = function ( fullURL ){
	    prefixRepresentationModule.updatePrefixModel();
	    var splittedURL = splitURLIntoBaseAndResource(fullURL);
	    
	    // lazy approach , for
	    // loop over prefix model
	    for ( var name in currentPrefixModel ) {
	      if ( currentPrefixModel.hasOwnProperty(name) ) {
	        // THIS IS CASE SENSITIVE!
	        if ( currentPrefixModel[name] === splittedURL.base ) {
	          return name + ":" + splittedURL.resource;
	        }
	      }
	    }
	    
	    if ( splittedURL.base === ":" ) {
	      return ":" + splittedURL.resource;
	    }
	    
	    return fullURL;
	  };
	  
	  
	  return prefixRepresentationModule;
	};




/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var _ = __webpack_require__(58);

	module.exports = function (){
	  
	  var DEFAULT_STATE = true;
	  var COLOR_MODES = [
	    { type: "same", range: [d3.rgb("#36C"), d3.rgb("#36C")] },
	    { type: "gradient", range: [d3.rgb("#36C"), d3.rgb("#EE2867")] } // taken from LD-VOWL
	  ];
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = DEFAULT_STATE,
	    filteredNodes,
	    filteredProperties,
	    colorModeType = "same";
	  
	  
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    var externalElements = filterExternalElements(nodes.concat(properties));
	    
	    if ( enabled ) {
	      setColorsForExternals(externalElements);
	    } else {
	      resetBackgroundColors(externalElements);
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function filterExternalElements( elements ){
	    return elements.filter(function ( element ){
	      if ( element.visualAttributes().indexOf("deprecated") >= 0 ) {
	        // deprecated is the only attribute which has preference over external
	        return false;
	      }
	      
	      return element.attributes().indexOf("external") >= 0;
	    });
	  }
	  
	  function setColorsForExternals( elements ){
	    var iriMap = mapExternalsToBaseUri(elements);
	    var entries = iriMap.entries();
	    
	    var colorScale = d3.scale.linear()
	      .domain([0, entries.length - 1])
	      .range(_.find(COLOR_MODES, { type: colorModeType }).range)
	      .interpolate(d3.interpolateHsl);
	    
	    for ( var i = 0; i < entries.length; i++ ) {
	      var groupedElements = entries[i].value;
	      setBackgroundColorForElements(groupedElements, colorScale(i));
	    }
	  }
	  
	  function mapExternalsToBaseUri( elements ){
	    var map = d3.map();
	    
	    elements.forEach(function ( element ){
	      var baseIri = element.baseIri();
	      
	      if ( !map.has(baseIri) ) {
	        map.set(baseIri, []);
	      }
	      map.get(baseIri).push(element);
	    });
	    
	    return map;
	  }
	  
	  function setBackgroundColorForElements( elements, backgroundColor ){
	    elements.forEach(function ( element ){
	      element.backgroundColor(backgroundColor);
	    });
	  }
	  
	  function resetBackgroundColors( elements ){
	    console.log("Resetting color");
	    elements.forEach(function ( element ){
	      element.backgroundColor(null);
	    });
	  }
	  
	  filter.colorModeType = function ( p ){
	    if ( !arguments.length ) return colorModeType;
	    colorModeType = p;
	    return filter;
	  };
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  filter.reset = function (){
	    enabled = DEFAULT_STATE;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 74 */
/***/ (function(module, exports) {

	/**
	 * This module abuses the filter function a bit like the statistics module. Nothing is filtered.
	 *
	 * @returns {{}}
	 */


	module.exports = function ( graph ){
	  
	  var DEFAULT_STATE = false;
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = DEFAULT_STATE,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, redundant details won't be drawn anymore.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    graph.options().compactNotation(enabled);
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  filter.reset = function (){
	    enabled = DEFAULT_STATE;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();
	var filterTools = __webpack_require__(76)();

	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = false,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, all datatypes and literals including connected properties are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      removeDatatypesAndLiterals();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function removeDatatypesAndLiterals(){
	    var filteredData = filterTools.filterNodesAndTidy(nodes, properties, isNoDatatypeOrLiteral);
	    
	    nodes = filteredData.nodes;
	    properties = filteredData.properties;
	  }
	  
	  function isNoDatatypeOrLiteral( node ){
	    return !elementTools.isDatatype(node);
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();

	module.exports = (function (){
	  
	  var tools = {};
	  
	  /**
	   * Filters the passed nodes and removes dangling properties.
	   * @param nodes
	   * @param properties
	   * @param shouldKeepNode function that returns true if the node should be kept
	   * @returns {{nodes: Array, properties: Array}} the filtered nodes and properties
	   */
	  tools.filterNodesAndTidy = function ( nodes, properties, shouldKeepNode ){
	    var removedNodes = __webpack_require__(62)(),
	      cleanedNodes = [],
	      cleanedProperties = [];
	    
	    nodes.forEach(function ( node ){
	      if ( shouldKeepNode(node) ) {
	        cleanedNodes.push(node);
	      } else {
	        removedNodes.add(node);
	      }
	    });
	    
	    properties.forEach(function ( property ){
	      if ( propertyHasVisibleNodes(removedNodes, property) ) {
	        cleanedProperties.push(property);
	      } else if ( elementTools.isDatatypeProperty(property) ) {
	        // Remove floating datatypes/literals, because they belong to their datatype property
	        var index = cleanedNodes.indexOf(property.range());
	        if ( index >= 0 ) {
	          cleanedNodes.splice(index, 1);
	        }
	      }
	    });
	    
	    return {
	      nodes: cleanedNodes,
	      properties: cleanedProperties
	    };
	  };
	  
	  /**
	   * Returns true, if the domain and the range of this property have not been removed.
	   * @param removedNodes
	   * @param property
	   * @returns {boolean} true if property isn't dangling
	   */
	  function propertyHasVisibleNodes( removedNodes, property ){
	    return !removedNodes.has(property.domain()) && !removedNodes.has(property.range());
	  }
	  
	  
	  return function (){
	    return tools;
	  };
	})();


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var OwlDisjointWith = __webpack_require__(46);

	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    // According to the specification enabled by default
	    enabled = true,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, all disjoint with properties are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      removeDisjointWithProperties();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function removeDisjointWithProperties(){
	    var cleanedProperties = [],
	      i, l, property;
	    
	    for ( i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      
	      if ( !(property instanceof OwlDisjointWith) ) {
	        cleanedProperties.push(property);
	      }
	    }
	    
	    properties = cleanedProperties;
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( graph ){
	  var focuser = {},
	    focusedElement;
	  var elementTools = webvowl.util.elementTools();
	  focuser.handle = function ( selectedElement, forced ){
	    // Don't display details on a drag event, which will be prevented
	    if ( d3.event && d3.event.defaultPrevented && forced === undefined ) {
	      return;
	    }
	    
	    if ( focusedElement !== undefined ) {
	      focusedElement.toggleFocus();
	    }
	    
	    if ( focusedElement !== selectedElement && selectedElement ) {
	      selectedElement.toggleFocus();
	      focusedElement = selectedElement;
	    } else {
	      focusedElement = undefined;
	    }
	    if ( focusedElement && focusedElement.focused() ) {
	      graph.options().editSidebar().updateSelectionInformation(focusedElement);
	      if ( elementTools.isProperty(selectedElement) === true ) {
	        var inversed = false;
	        if ( selectedElement.inverse() ) {
	          inversed = true;
	        }
	        graph.activateHoverElementsForProperties(true, selectedElement, inversed, graph.isTouchDevice());
	      }
	      else {
	        graph.activateHoverElements(true, selectedElement, graph.isTouchDevice());
	      }
	    }
	    else {
	      graph.options().editSidebar().updateSelectionInformation(undefined);
	      graph.removeEditElements();
	    }
	  };
	  
	  /**
	   * Removes the focus if an element is focussed.
	   */
	  focuser.reset = function (){
	    if ( focusedElement ) {
	      focusedElement.toggleFocus();
	      focusedElement = undefined;
	    }
	  };
	  
	  return focuser;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	/** @WORKAROUND CODE:
	 * clears empty literals that are provided by owl2vowl: 0.2.2x*/


	module.exports = function (){
	  
	  var filter = {},
	    enabled = true,
	    filteredNodes,
	    removedNodes,
	    filteredProperties;
	  
	  filter.enabled = function ( val ){
	    if ( !arguments.length ) {
	      return enabled;
	    }
	    enabled = val;
	  };
	  
	  filter.filter = function ( nodes, properties ){
	    if ( enabled === false ) {
	      filteredNodes = nodes;
	      filteredProperties = properties;
	      removedNodes = [];
	      return;
	    }
	    var literalUsageMap = [];
	    var thingUsageMap = [];
	    var node;
	    for ( var i = 0; i < properties.length; i++ ) {
	      // get property range;
	      var prop = properties[i];
	      
	      // checking for literals
	      if ( prop.range() ) {
	        node = prop.range();
	        if ( node.type() === "rdfs:Literal" ) {
	          literalUsageMap[node.id()] = 1;
	        }
	      }
	      // checking for thing
	      if ( prop.range() ) {
	        node = prop.range();
	        if ( node.type() === "owl:Thing" ) {
	          thingUsageMap[node.id()] = 1;
	        }
	      }
	      if ( prop.domain() ) {
	        node = prop.domain();
	        if ( node.type() === "owl:Thing" ) {
	          thingUsageMap[node.id()] = 1;
	        }
	      }
	      
	    }
	    var nodesToRemove = [];
	    var newNodes = [];
	    // todo: test and make it faster
	    for ( i = 0; i < nodes.length; i++ ) {
	      var nodeId = nodes[i].id();
	      if ( nodes[i].type() === "rdfs:Literal" ) {
	        if ( literalUsageMap[nodeId] === undefined ) {
	          nodesToRemove.push(nodeId);
	        }
	        else {
	          newNodes.push(nodes[i]);
	        }
	        // check for node type == OWL:THING
	      } else if ( nodes[i].type() === "owl:Thing" ) {
	        if ( thingUsageMap[nodeId] === undefined ) {
	          nodesToRemove.push(nodeId);
	        }
	        else {
	          newNodes.push(nodes[i]);
	        }
	      } else {
	        newNodes.push(nodes[i]);
	      }
	    }
	    
	    filteredNodes = newNodes;
	    filteredProperties = properties;
	    removedNodes = nodesToRemove;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.removedNodes = function (){
	    return removedNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();
	var filterTools = __webpack_require__(76)();

	module.exports = function ( menu ){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = true,
	    filteredNodes,
	    filteredProperties,
	    maxDegreeSetter,
	    degreeGetter,
	    lastFiltedDegree,
	    degreeSetter;
	  
	  
	  var NODE_COUNT_LIMIT_FOR_AUTO_ENABLING = 50;
	  
	  
	  filter.initialize = function ( nodes, properties ){
	    lastFiltedDegree = -1;
	    var maxLinkCount = findMaxLinkCount(nodes);
	    if ( maxDegreeSetter instanceof Function ) {
	      maxDegreeSetter(maxLinkCount);
	    }
	    
	    menu.setDefaultDegreeValue(findAutoDefaultDegree(nodes, properties, maxLinkCount));
	    var defaultDegree = findDefaultDegree(maxLinkCount);
	    if ( degreeSetter instanceof Function ) {
	      degreeSetter(defaultDegree);
	      if ( defaultDegree > 0 ) {
	        menu.highlightForDegreeSlider(true);
	        menu.getGraphObject().setFilterWarning(true);
	        
	      }
	    } else {
	      console.error("No degree setter function set.");
	    }
	  };
	  
	  function findAutoDefaultDegree( nodes, properties, maxDegree ){
	    for ( var degree = 0; degree < maxDegree; degree++ ) {
	      var filteredData = filterByNodeDegree(nodes, properties, degree);
	      
	      if ( filteredData.nodes.length <= NODE_COUNT_LIMIT_FOR_AUTO_ENABLING ) {
	        return degree;
	      }
	    }
	    return 0;
	  }
	  
	  function findDefaultDegree( maxDegree ){
	    var globalDegOfFilter = menu.getGraphObject().getGlobalDOF();
	    if ( globalDegOfFilter >= 0 ) {
	      if ( globalDegOfFilter <= maxDegree ) {
	        return globalDegOfFilter;
	      } else {
	        menu.getGraphObject().setGlobalDOF(maxDegree);
	        return maxDegree;
	      }
	    }
	    return menu.getDefaultDegreeValue();
	  }
	  
	  /**
	   * If enabled, all nodes are filter by their node degree.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      if ( degreeGetter instanceof Function ) {
	        filterByNodeDegreeAndApply(degreeGetter());
	      } else {
	        console.error("No degree query function set.");
	      }
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	    
	    if ( filteredNodes.length === 0 ) {
	      degreeSetter(0);
	      filteredNodes = untouchedNodes;
	      filteredProperties = untouchedProperties;
	    }
	    lastFiltedDegree = degreeGetter();
	  };
	  
	  function findMaxLinkCount( nodes ){
	    var maxLinkCount = 0;
	    for ( var i = 0, l = nodes.length; i < l; i++ ) {
	      var linksWithoutDatatypes = filterOutDatatypes(nodes[i].links());
	      
	      maxLinkCount = Math.max(maxLinkCount, linksWithoutDatatypes.length);
	    }
	    return maxLinkCount;
	  }
	  
	  function filterOutDatatypes( links ){
	    return links.filter(function ( link ){
	      return !elementTools.isDatatypeProperty(link.property());
	    });
	  }
	  
	  function filterByNodeDegreeAndApply( minDegree ){
	    var filteredData = filterByNodeDegree(nodes, properties, minDegree);
	    nodes = filteredData.nodes;
	    properties = filteredData.properties;
	  }
	  
	  function filterByNodeDegree( nodes, properties, minDegree ){
	    return filterTools.filterNodesAndTidy(nodes, properties, hasRequiredDegree(minDegree));
	  }
	  
	  function hasRequiredDegree( minDegree ){
	    return function ( node ){
	      return filterOutDatatypes(node.links()).length >= minDegree;
	    };
	  }
	  
	  filter.setMaxDegreeSetter = function ( _maxDegreeSetter ){
	    maxDegreeSetter = _maxDegreeSetter;
	  };
	  
	  filter.setDegreeGetter = function ( _degreeGetter ){
	    degreeGetter = _degreeGetter;
	  };
	  
	  filter.setDegreeSetter = function ( _degreeSetter ){
	    degreeSetter = _degreeSetter;
	  };
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

	/**
	 * This module abuses the filter function a bit like the statistics module. Nothing is filtered.
	 *
	 * @returns {{}}
	 */
	module.exports = function ( graph ){
	  
	  var DEFAULT_STATE = true;
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = DEFAULT_STATE,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, the scaling of nodes according to individuals will be enabled.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    graph.options().scaleNodesByIndividuals(enabled);
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  filter.reset = function (){
	    enabled = DEFAULT_STATE;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();


	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = false,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled, all object properties and things without any other property are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      removeObjectProperties();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function removeObjectProperties(){
	    properties = properties.filter(isNoObjectProperty);
	    nodes = nodes.filter(isNoFloatingThing);
	  }
	  
	  function isNoObjectProperty( property ){
	    return !elementTools.isObjectProperty(property);
	  }
	  
	  function isNoFloatingThing( node ){
	    var isNoThing = !elementTools.isThing(node);
	    var hasNonFilteredProperties = hasPropertiesOtherThanObjectProperties(node, properties);
	    return isNoThing || hasNonFilteredProperties;
	  }
	  
	  function hasPropertiesOtherThanObjectProperties( node, properties ){
	    for ( var i = 0; i < properties.length; i++ ) {
	      var property = properties[i];
	      if ( property.domain() !== node && property.range() !== node ) {
	        continue;
	      }
	      
	      if ( isNoObjectProperty(property) ) {
	        return true;
	      }
	    }
	    
	    return false;
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var _ = __webpack_require__(84);
	var elementTools = __webpack_require__(63)();

	module.exports = function (){
	  var pap = {},
	    enabled = false,
	    pinnedElements = [];
	  
	  pap.addPinnedElement = function ( element ){
	    // check if element is already in list
	    var indexInArray = pinnedElements.indexOf(element);
	    if ( indexInArray === -1 ) {
	      pinnedElements.push(element);
	    }
	  };
	  
	  pap.handle = function ( selection, forced ){
	    if ( !enabled ) {
	      return;
	    }
	    
	    if ( !forced ) {
	      if ( wasNotDragged() ) {
	        return;
	      }
	    }
	    if ( elementTools.isProperty(selection) ) {
	      if ( selection.inverse() && selection.inverse().pinned() ) {
	        return;
	      } else if ( hasNoParallelProperties(selection) ) {
	        return;
	      }
	    }
	    
	    if ( !selection.pinned() ) {
	      selection.drawPin();
	      pap.addPinnedElement(selection);
	    }
	  };
	  
	  function wasNotDragged(){
	    return !d3.event.defaultPrevented;
	  }
	  
	  function hasNoParallelProperties( property ){
	    return _.intersection(property.domain().links(), property.range().links()).length === 1;
	  }
	  
	  pap.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return pap;
	  };
	  
	  pap.reset = function (){
	    pinnedElements.forEach(function ( element ){
	      element.removePin();
	    });
	    // Clear the array of stored nodes
	    pinnedElements.length = 0;
	  };
	  
	  return pap;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = {
	  'chunk': __webpack_require__(85),
	  'compact': __webpack_require__(105),
	  'concat': __webpack_require__(106),
	  'difference': __webpack_require__(114),
	  'differenceBy': __webpack_require__(167),
	  'differenceWith': __webpack_require__(229),
	  'drop': __webpack_require__(230),
	  'dropRight': __webpack_require__(231),
	  'dropRightWhile': __webpack_require__(232),
	  'dropWhile': __webpack_require__(234),
	  'fill': __webpack_require__(235),
	  'findIndex': __webpack_require__(239),
	  'findLastIndex': __webpack_require__(240),
	  'first': __webpack_require__(241),
	  'flatten': __webpack_require__(243),
	  'flattenDeep': __webpack_require__(244),
	  'flattenDepth': __webpack_require__(245),
	  'fromPairs': __webpack_require__(246),
	  'head': __webpack_require__(242),
	  'indexOf': __webpack_require__(247),
	  'initial': __webpack_require__(248),
	  'intersection': __webpack_require__(249),
	  'intersectionBy': __webpack_require__(252),
	  'intersectionWith': __webpack_require__(253),
	  'join': __webpack_require__(254),
	  'last': __webpack_require__(228),
	  'lastIndexOf': __webpack_require__(255),
	  'nth': __webpack_require__(257),
	  'pull': __webpack_require__(259),
	  'pullAll': __webpack_require__(260),
	  'pullAllBy': __webpack_require__(263),
	  'pullAllWith': __webpack_require__(264),
	  'pullAt': __webpack_require__(265),
	  'remove': __webpack_require__(272),
	  'reverse': __webpack_require__(273),
	  'slice': __webpack_require__(274),
	  'sortedIndex': __webpack_require__(275),
	  'sortedIndexBy': __webpack_require__(278),
	  'sortedIndexOf': __webpack_require__(279),
	  'sortedLastIndex': __webpack_require__(280),
	  'sortedLastIndexBy': __webpack_require__(281),
	  'sortedLastIndexOf': __webpack_require__(282),
	  'sortedUniq': __webpack_require__(283),
	  'sortedUniqBy': __webpack_require__(285),
	  'tail': __webpack_require__(286),
	  'take': __webpack_require__(287),
	  'takeRight': __webpack_require__(288),
	  'takeRightWhile': __webpack_require__(289),
	  'takeWhile': __webpack_require__(290),
	  'union': __webpack_require__(291),
	  'unionBy': __webpack_require__(295),
	  'unionWith': __webpack_require__(296),
	  'uniq': __webpack_require__(297),
	  'uniqBy': __webpack_require__(298),
	  'uniqWith': __webpack_require__(299),
	  'unzip': __webpack_require__(300),
	  'unzipWith': __webpack_require__(301),
	  'without': __webpack_require__(302),
	  'xor': __webpack_require__(303),
	  'xorBy': __webpack_require__(305),
	  'xorWith': __webpack_require__(306),
	  'zip': __webpack_require__(307),
	  'zipObject': __webpack_require__(308),
	  'zipObjectDeep': __webpack_require__(312),
	  'zipWith': __webpack_require__(314)
	};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(86),
	    isIterateeCall = __webpack_require__(87),
	    toInteger = __webpack_require__(100);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;

	/**
	 * Creates an array of elements split into groups the length of `size`.
	 * If `array` can't be split evenly, the final chunk will be the remaining
	 * elements.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to process.
	 * @param {number} [size=1] The length of each chunk
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the new array of chunks.
	 * @example
	 *
	 * _.chunk(['a', 'b', 'c', 'd'], 2);
	 * // => [['a', 'b'], ['c', 'd']]
	 *
	 * _.chunk(['a', 'b', 'c', 'd'], 3);
	 * // => [['a', 'b', 'c'], ['d']]
	 */
	function chunk(array, size, guard) {
	  if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
	    size = 1;
	  } else {
	    size = nativeMax(toInteger(size), 0);
	  }
	  var length = array == null ? 0 : array.length;
	  if (!length || size < 1) {
	    return [];
	  }
	  var index = 0,
	      resIndex = 0,
	      result = Array(nativeCeil(length / size));

	  while (index < length) {
	    result[resIndex++] = baseSlice(array, index, (index += size));
	  }
	  return result;
	}

	module.exports = chunk;


/***/ }),
/* 86 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(88),
	    isArrayLike = __webpack_require__(89),
	    isIndex = __webpack_require__(99),
	    isObject = __webpack_require__(97);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ }),
/* 88 */
/***/ (function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(90),
	    isLength = __webpack_require__(98);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(91),
	    isObject = __webpack_require__(97);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ }),
/* 91 */
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(93);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(94);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 95 */
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
/* 96 */
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
/* 97 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ }),
/* 99 */
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(101);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(102);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(97),
	    isSymbol = __webpack_require__(103);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ }),
/* 103 */
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
/* 104 */
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
/* 105 */
/***/ (function(module, exports) {

	/**
	 * Creates an array with all falsey values removed. The values `false`, `null`,
	 * `0`, `""`, `undefined`, and `NaN` are falsey.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to compact.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * _.compact([0, 1, false, 2, '', 3]);
	 * // => [1, 2, 3]
	 */
	function compact(array) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (value) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = compact;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(107),
	    baseFlatten = __webpack_require__(108),
	    copyArray = __webpack_require__(113),
	    isArray = __webpack_require__(112);

	/**
	 * Creates a new array concatenating `array` with any additional arrays
	 * and/or values.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to concatenate.
	 * @param {...*} [values] The values to concatenate.
	 * @returns {Array} Returns the new concatenated array.
	 * @example
	 *
	 * var array = [1];
	 * var other = _.concat(array, 2, [3], [[4]]);
	 *
	 * console.log(other);
	 * // => [1, 2, 3, [4]]
	 *
	 * console.log(array);
	 * // => [1]
	 */
	function concat() {
	  var length = arguments.length;
	  if (!length) {
	    return [];
	  }
	  var args = Array(length - 1),
	      array = arguments[0],
	      index = length;

	  while (index--) {
	    args[index - 1] = arguments[index];
	  }
	  return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
	}

	module.exports = concat;


/***/ }),
/* 107 */
/***/ (function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(107),
	    isFlattenable = __webpack_require__(109);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(92),
	    isArguments = __webpack_require__(110),
	    isArray = __webpack_require__(112);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(111),
	    isObjectLike = __webpack_require__(104);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(91),
	    isObjectLike = __webpack_require__(104);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ }),
/* 112 */
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
/* 113 */
/***/ (function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(115),
	    baseFlatten = __webpack_require__(108),
	    baseRest = __webpack_require__(157),
	    isArrayLikeObject = __webpack_require__(166);

	/**
	 * Creates an array of `array` values not included in the other given arrays
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. The order and references of result values are
	 * determined by the first array.
	 *
	 * **Note:** Unlike `_.pullAll`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.without, _.xor
	 * @example
	 *
	 * _.difference([2, 1], [2, 3]);
	 * // => [1]
	 */
	var difference = baseRest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
	    : [];
	});

	module.exports = difference;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(116),
	    arrayIncludes = __webpack_require__(148),
	    arrayIncludesWith = __webpack_require__(153),
	    arrayMap = __webpack_require__(154),
	    baseUnary = __webpack_require__(155),
	    cacheHas = __webpack_require__(156);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee == null ? value : iteratee(value);

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(117),
	    setCacheAdd = __webpack_require__(146),
	    setCacheHas = __webpack_require__(147);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(118),
	    mapCacheDelete = __webpack_require__(140),
	    mapCacheGet = __webpack_require__(143),
	    mapCacheHas = __webpack_require__(144),
	    mapCacheSet = __webpack_require__(145);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(119),
	    ListCache = __webpack_require__(132),
	    Map = __webpack_require__(139);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(120),
	    hashDelete = __webpack_require__(128),
	    hashGet = __webpack_require__(129),
	    hashHas = __webpack_require__(130),
	    hashSet = __webpack_require__(131);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(121);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(122);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(123),
	    getValue = __webpack_require__(127);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(90),
	    isMasked = __webpack_require__(124),
	    isObject = __webpack_require__(97),
	    toSource = __webpack_require__(126);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(125);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(93);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ }),
/* 126 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ }),
/* 127 */
/***/ (function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ }),
/* 128 */
/***/ (function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(121);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(121);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(121);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(133),
	    listCacheDelete = __webpack_require__(134),
	    listCacheGet = __webpack_require__(136),
	    listCacheHas = __webpack_require__(137),
	    listCacheSet = __webpack_require__(138);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ }),
/* 133 */
/***/ (function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(135);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(88);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(135);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(135);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(135);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(122),
	    root = __webpack_require__(93);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(141);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(142);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ }),
/* 142 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(141);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(141);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(141);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ }),
/* 146 */
/***/ (function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ }),
/* 147 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(149);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(150),
	    baseIsNaN = __webpack_require__(151),
	    strictIndexOf = __webpack_require__(152);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ }),
/* 150 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ }),
/* 151 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ }),
/* 152 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ }),
/* 153 */
/***/ (function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ }),
/* 154 */
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
/* 155 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ }),
/* 156 */
/***/ (function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(158),
	    overRest = __webpack_require__(159),
	    setToString = __webpack_require__(161);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ }),
/* 158 */
/***/ (function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(160);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ }),
/* 160 */
/***/ (function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(162),
	    shortOut = __webpack_require__(165);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(163),
	    defineProperty = __webpack_require__(164),
	    identity = __webpack_require__(158);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ }),
/* 163 */
/***/ (function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(122);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ }),
/* 165 */
/***/ (function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(89),
	    isObjectLike = __webpack_require__(104);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(115),
	    baseFlatten = __webpack_require__(108),
	    baseIteratee = __webpack_require__(168),
	    baseRest = __webpack_require__(157),
	    isArrayLikeObject = __webpack_require__(166),
	    last = __webpack_require__(228);

	/**
	 * This method is like `_.difference` except that it accepts `iteratee` which
	 * is invoked for each element of `array` and `values` to generate the criterion
	 * by which they're compared. The order and references of result values are
	 * determined by the first array. The iteratee is invoked with one argument:
	 * (value).
	 *
	 * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
	 * // => [1.2]
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
	 * // => [{ 'x': 2 }]
	 */
	var differenceBy = baseRest(function(array, values) {
	  var iteratee = last(values);
	  if (isArrayLikeObject(iteratee)) {
	    iteratee = undefined;
	  }
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), baseIteratee(iteratee, 2))
	    : [];
	});

	module.exports = differenceBy;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(169),
	    baseMatchesProperty = __webpack_require__(211),
	    identity = __webpack_require__(158),
	    isArray = __webpack_require__(112),
	    property = __webpack_require__(225);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(170),
	    getMatchData = __webpack_require__(208),
	    matchesStrictComparable = __webpack_require__(210);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(171),
	    baseIsEqual = __webpack_require__(177);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(132),
	    stackClear = __webpack_require__(172),
	    stackDelete = __webpack_require__(173),
	    stackGet = __webpack_require__(174),
	    stackHas = __webpack_require__(175),
	    stackSet = __webpack_require__(176);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(132);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ }),
/* 173 */
/***/ (function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ }),
/* 174 */
/***/ (function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ }),
/* 175 */
/***/ (function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(132),
	    Map = __webpack_require__(139),
	    MapCache = __webpack_require__(117);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(178),
	    isObjectLike = __webpack_require__(104);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(171),
	    equalArrays = __webpack_require__(179),
	    equalByTag = __webpack_require__(181),
	    equalObjects = __webpack_require__(185),
	    getTag = __webpack_require__(203),
	    isArray = __webpack_require__(112),
	    isBuffer = __webpack_require__(194),
	    isTypedArray = __webpack_require__(196);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);

	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;

	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(116),
	    arraySome = __webpack_require__(180),
	    cacheHas = __webpack_require__(156);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ }),
/* 180 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(92),
	    Uint8Array = __webpack_require__(182),
	    eq = __webpack_require__(88),
	    equalArrays = __webpack_require__(179),
	    mapToArray = __webpack_require__(183),
	    setToArray = __webpack_require__(184);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(93);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ }),
/* 183 */
/***/ (function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ }),
/* 184 */
/***/ (function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	var getAllKeys = __webpack_require__(186);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(187),
	    getSymbols = __webpack_require__(188),
	    keys = __webpack_require__(191);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(107),
	    isArray = __webpack_require__(112);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(189),
	    stubArray = __webpack_require__(190);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	module.exports = getSymbols;


/***/ }),
/* 189 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ }),
/* 190 */
/***/ (function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(192),
	    baseKeys = __webpack_require__(199),
	    isArrayLike = __webpack_require__(89);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(193),
	    isArguments = __webpack_require__(110),
	    isArray = __webpack_require__(112),
	    isBuffer = __webpack_require__(194),
	    isIndex = __webpack_require__(99),
	    isTypedArray = __webpack_require__(196);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ }),
/* 193 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(93),
	    stubFalse = __webpack_require__(195);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ }),
/* 195 */
/***/ (function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(197),
	    baseUnary = __webpack_require__(155),
	    nodeUtil = __webpack_require__(198);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(91),
	    isLength = __webpack_require__(98),
	    isObjectLike = __webpack_require__(104);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(94);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(200),
	    nativeKeys = __webpack_require__(201);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ }),
/* 200 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(202);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ }),
/* 202 */
/***/ (function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(204),
	    Map = __webpack_require__(139),
	    Promise = __webpack_require__(205),
	    Set = __webpack_require__(206),
	    WeakMap = __webpack_require__(207),
	    baseGetTag = __webpack_require__(91),
	    toSource = __webpack_require__(126);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(122),
	    root = __webpack_require__(93);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(122),
	    root = __webpack_require__(93);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(122),
	    root = __webpack_require__(93);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(122),
	    root = __webpack_require__(93);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(209),
	    keys = __webpack_require__(191);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(97);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ }),
/* 210 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(177),
	    get = __webpack_require__(212),
	    hasIn = __webpack_require__(222),
	    isKey = __webpack_require__(215),
	    isStrictComparable = __webpack_require__(209),
	    matchesStrictComparable = __webpack_require__(210),
	    toKey = __webpack_require__(221);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(213);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(214),
	    toKey = __webpack_require__(221);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(112),
	    isKey = __webpack_require__(215),
	    stringToPath = __webpack_require__(216),
	    toString = __webpack_require__(219);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(112),
	    isSymbol = __webpack_require__(103);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(217);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (string.charCodeAt(0) === 46 /* . */) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, subString) {
	    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(218);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(117);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ }),
/* 219 */
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
/* 220 */
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
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(103);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(223),
	    hasPath = __webpack_require__(224);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ }),
/* 223 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(214),
	    isArguments = __webpack_require__(110),
	    isArray = __webpack_require__(112),
	    isIndex = __webpack_require__(99),
	    isLength = __webpack_require__(98),
	    toKey = __webpack_require__(221);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(226),
	    basePropertyDeep = __webpack_require__(227),
	    isKey = __webpack_require__(215),
	    toKey = __webpack_require__(221);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ }),
/* 226 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(213);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ }),
/* 228 */
/***/ (function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(115),
	    baseFlatten = __webpack_require__(108),
	    baseRest = __webpack_require__(157),
	    isArrayLikeObject = __webpack_require__(166),
	    last = __webpack_require__(228);

	/**
	 * This method is like `_.difference` except that it accepts `comparator`
	 * which is invoked to compare elements of `array` to `values`. The order and
	 * references of result values are determined by the first array. The comparator
	 * is invoked with two arguments: (arrVal, othVal).
	 *
	 * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	 *
	 * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
	 * // => [{ 'x': 2, 'y': 1 }]
	 */
	var differenceWith = baseRest(function(array, values) {
	  var comparator = last(values);
	  if (isArrayLikeObject(comparator)) {
	    comparator = undefined;
	  }
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
	    : [];
	});

	module.exports = differenceWith;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(86),
	    toInteger = __webpack_require__(100);

	/**
	 * Creates a slice of `array` with `n` elements dropped from the beginning.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {number} [n=1] The number of elements to drop.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.drop([1, 2, 3]);
	 * // => [2, 3]
	 *
	 * _.drop([1, 2, 3], 2);
	 * // => [3]
	 *
	 * _.drop([1, 2, 3], 5);
	 * // => []
	 *
	 * _.drop([1, 2, 3], 0);
	 * // => [1, 2, 3]
	 */
	function drop(array, n, guard) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return [];
	  }
	  n = (guard || n === undefined) ? 1 : toInteger(n);
	  return baseSlice(array, n < 0 ? 0 : n, length);
	}

	module.exports = drop;


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(86),
	    toInteger = __webpack_require__(100);

	/**
	 * Creates a slice of `array` with `n` elements dropped from the end.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {number} [n=1] The number of elements to drop.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.dropRight([1, 2, 3]);
	 * // => [1, 2]
	 *
	 * _.dropRight([1, 2, 3], 2);
	 * // => [1]
	 *
	 * _.dropRight([1, 2, 3], 5);
	 * // => []
	 *
	 * _.dropRight([1, 2, 3], 0);
	 * // => [1, 2, 3]
	 */
	function dropRight(array, n, guard) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return [];
	  }
	  n = (guard || n === undefined) ? 1 : toInteger(n);
	  n = length - n;
	  return baseSlice(array, 0, n < 0 ? 0 : n);
	}

	module.exports = dropRight;


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    baseWhile = __webpack_require__(233);

	/**
	 * Creates a slice of `array` excluding elements dropped from the end.
	 * Elements are dropped until `predicate` returns falsey. The predicate is
	 * invoked with three arguments: (value, index, array).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': true },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': false }
	 * ];
	 *
	 * _.dropRightWhile(users, function(o) { return !o.active; });
	 * // => objects for ['barney']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
	 * // => objects for ['barney', 'fred']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.dropRightWhile(users, ['active', false]);
	 * // => objects for ['barney']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.dropRightWhile(users, 'active');
	 * // => objects for ['barney', 'fred', 'pebbles']
	 */
	function dropRightWhile(array, predicate) {
	  return (array && array.length)
	    ? baseWhile(array, baseIteratee(predicate, 3), true, true)
	    : [];
	}

	module.exports = dropRightWhile;


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(86);

	/**
	 * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
	 * without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseWhile(array, predicate, isDrop, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;

	  while ((fromRight ? index-- : ++index < length) &&
	    predicate(array[index], index, array)) {}

	  return isDrop
	    ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
	    : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
	}

	module.exports = baseWhile;


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    baseWhile = __webpack_require__(233);

	/**
	 * Creates a slice of `array` excluding elements dropped from the beginning.
	 * Elements are dropped until `predicate` returns falsey. The predicate is
	 * invoked with three arguments: (value, index, array).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.dropWhile(users, function(o) { return !o.active; });
	 * // => objects for ['pebbles']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.dropWhile(users, { 'user': 'barney', 'active': false });
	 * // => objects for ['fred', 'pebbles']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.dropWhile(users, ['active', false]);
	 * // => objects for ['pebbles']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.dropWhile(users, 'active');
	 * // => objects for ['barney', 'fred', 'pebbles']
	 */
	function dropWhile(array, predicate) {
	  return (array && array.length)
	    ? baseWhile(array, baseIteratee(predicate, 3), true)
	    : [];
	}

	module.exports = dropWhile;


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFill = __webpack_require__(236),
	    isIterateeCall = __webpack_require__(87);

	/**
	 * Fills elements of `array` with `value` from `start` up to, but not
	 * including, `end`.
	 *
	 * **Note:** This method mutates `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.2.0
	 * @category Array
	 * @param {Array} array The array to fill.
	 * @param {*} value The value to fill `array` with.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns `array`.
	 * @example
	 *
	 * var array = [1, 2, 3];
	 *
	 * _.fill(array, 'a');
	 * console.log(array);
	 * // => ['a', 'a', 'a']
	 *
	 * _.fill(Array(3), 2);
	 * // => [2, 2, 2]
	 *
	 * _.fill([4, 6, 8, 10], '*', 1, 3);
	 * // => [4, '*', '*', 10]
	 */
	function fill(array, value, start, end) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return [];
	  }
	  if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
	    start = 0;
	    end = length;
	  }
	  return baseFill(array, value, start, end);
	}

	module.exports = fill;


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(100),
	    toLength = __webpack_require__(237);

	/**
	 * The base implementation of `_.fill` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to fill.
	 * @param {*} value The value to fill `array` with.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns `array`.
	 */
	function baseFill(array, value, start, end) {
	  var length = array.length;

	  start = toInteger(start);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : toInteger(end);
	  if (end < 0) {
	    end += length;
	  }
	  end = start > end ? 0 : toLength(end);
	  while (start < end) {
	    array[start++] = value;
	  }
	  return array;
	}

	module.exports = baseFill;


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

	var baseClamp = __webpack_require__(238),
	    toInteger = __webpack_require__(100);

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/**
	 * Converts `value` to an integer suitable for use as the length of an
	 * array-like object.
	 *
	 * **Note:** This method is based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toLength(3.2);
	 * // => 3
	 *
	 * _.toLength(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toLength(Infinity);
	 * // => 4294967295
	 *
	 * _.toLength('3.2');
	 * // => 3
	 */
	function toLength(value) {
	  return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
	}

	module.exports = toLength;


/***/ }),
/* 238 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.clamp` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {number} number The number to clamp.
	 * @param {number} [lower] The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the clamped number.
	 */
	function baseClamp(number, lower, upper) {
	  if (number === number) {
	    if (upper !== undefined) {
	      number = number <= upper ? number : upper;
	    }
	    if (lower !== undefined) {
	      number = number >= lower ? number : lower;
	    }
	  }
	  return number;
	}

	module.exports = baseClamp;


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(150),
	    baseIteratee = __webpack_require__(168),
	    toInteger = __webpack_require__(100);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate, fromIndex) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}

	module.exports = findIndex;


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(150),
	    baseIteratee = __webpack_require__(168),
	    toInteger = __webpack_require__(100);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * This method is like `_.findIndex` except that it iterates over elements
	 * of `collection` from right to left.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param {number} [fromIndex=array.length-1] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': true },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': false }
	 * ];
	 *
	 * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
	 * // => 2
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findLastIndex(users, { 'user': 'barney', 'active': true });
	 * // => 0
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findLastIndex(users, ['active', false]);
	 * // => 2
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findLastIndex(users, 'active');
	 * // => 0
	 */
	function findLastIndex(array, predicate, fromIndex) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return -1;
	  }
	  var index = length - 1;
	  if (fromIndex !== undefined) {
	    index = toInteger(fromIndex);
	    index = fromIndex < 0
	      ? nativeMax(length + index, 0)
	      : nativeMin(index, length - 1);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index, true);
	}

	module.exports = findLastIndex;


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(242);


/***/ }),
/* 242 */
/***/ (function(module, exports) {

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias first
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the first element of `array`.
	 * @example
	 *
	 * _.head([1, 2, 3]);
	 * // => 1
	 *
	 * _.head([]);
	 * // => undefined
	 */
	function head(array) {
	  return (array && array.length) ? array[0] : undefined;
	}

	module.exports = head;


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(108);

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? baseFlatten(array, 1) : [];
	}

	module.exports = flatten;


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(108);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Recursively flattens `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flattenDeep([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, 3, 4, 5]
	 */
	function flattenDeep(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? baseFlatten(array, INFINITY) : [];
	}

	module.exports = flattenDeep;


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(108),
	    toInteger = __webpack_require__(100);

	/**
	 * Recursively flatten `array` up to `depth` times.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.4.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @param {number} [depth=1] The maximum recursion depth.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * var array = [1, [2, [3, [4]], 5]];
	 *
	 * _.flattenDepth(array, 1);
	 * // => [1, 2, [3, [4]], 5]
	 *
	 * _.flattenDepth(array, 2);
	 * // => [1, 2, 3, [4], 5]
	 */
	function flattenDepth(array, depth) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return [];
	  }
	  depth = depth === undefined ? 1 : toInteger(depth);
	  return baseFlatten(array, depth);
	}

	module.exports = flattenDepth;


/***/ }),
/* 246 */
/***/ (function(module, exports) {

	/**
	 * The inverse of `_.toPairs`; this method returns an object composed
	 * from key-value `pairs`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} pairs The key-value pairs.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * _.fromPairs([['a', 1], ['b', 2]]);
	 * // => { 'a': 1, 'b': 2 }
	 */
	function fromPairs(pairs) {
	  var index = -1,
	      length = pairs == null ? 0 : pairs.length,
	      result = {};

	  while (++index < length) {
	    var pair = pairs[index];
	    result[pair[0]] = pair[1];
	  }
	  return result;
	}

	module.exports = fromPairs;


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(149),
	    toInteger = __webpack_require__(100);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Gets the index at which the first occurrence of `value` is found in `array`
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. If `fromIndex` is negative, it's used as the
	 * offset from the end of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 * @example
	 *
	 * _.indexOf([1, 2, 1, 2], 2);
	 * // => 1
	 *
	 * // Search from the `fromIndex`.
	 * _.indexOf([1, 2, 1, 2], 2, 2);
	 * // => 3
	 */
	function indexOf(array, value, fromIndex) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseIndexOf(array, value, index);
	}

	module.exports = indexOf;


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(86);

	/**
	 * Gets all but the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.initial([1, 2, 3]);
	 * // => [1, 2]
	 */
	function initial(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? baseSlice(array, 0, -1) : [];
	}

	module.exports = initial;


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(154),
	    baseIntersection = __webpack_require__(250),
	    baseRest = __webpack_require__(157),
	    castArrayLikeObject = __webpack_require__(251);

	/**
	 * Creates an array of unique values that are included in all given arrays
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. The order and references of result values are
	 * determined by the first array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of intersecting values.
	 * @example
	 *
	 * _.intersection([2, 1], [2, 3]);
	 * // => [2]
	 */
	var intersection = baseRest(function(arrays) {
	  var mapped = arrayMap(arrays, castArrayLikeObject);
	  return (mapped.length && mapped[0] === arrays[0])
	    ? baseIntersection(mapped)
	    : [];
	});

	module.exports = intersection;


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(116),
	    arrayIncludes = __webpack_require__(148),
	    arrayIncludesWith = __webpack_require__(153),
	    arrayMap = __webpack_require__(154),
	    baseUnary = __webpack_require__(155),
	    cacheHas = __webpack_require__(156);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * The base implementation of methods like `_.intersection`, without support
	 * for iteratee shorthands, that accepts an array of arrays to inspect.
	 *
	 * @private
	 * @param {Array} arrays The arrays to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of shared values.
	 */
	function baseIntersection(arrays, iteratee, comparator) {
	  var includes = comparator ? arrayIncludesWith : arrayIncludes,
	      length = arrays[0].length,
	      othLength = arrays.length,
	      othIndex = othLength,
	      caches = Array(othLength),
	      maxLength = Infinity,
	      result = [];

	  while (othIndex--) {
	    var array = arrays[othIndex];
	    if (othIndex && iteratee) {
	      array = arrayMap(array, baseUnary(iteratee));
	    }
	    maxLength = nativeMin(array.length, maxLength);
	    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
	      ? new SetCache(othIndex && array)
	      : undefined;
	  }
	  array = arrays[0];

	  var index = -1,
	      seen = caches[0];

	  outer:
	  while (++index < length && result.length < maxLength) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (!(seen
	          ? cacheHas(seen, computed)
	          : includes(result, computed, comparator)
	        )) {
	      othIndex = othLength;
	      while (--othIndex) {
	        var cache = caches[othIndex];
	        if (!(cache
	              ? cacheHas(cache, computed)
	              : includes(arrays[othIndex], computed, comparator))
	            ) {
	          continue outer;
	        }
	      }
	      if (seen) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseIntersection;


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(166);

	/**
	 * Casts `value` to an empty array if it's not an array like object.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array|Object} Returns the cast array-like object.
	 */
	function castArrayLikeObject(value) {
	  return isArrayLikeObject(value) ? value : [];
	}

	module.exports = castArrayLikeObject;


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(154),
	    baseIntersection = __webpack_require__(250),
	    baseIteratee = __webpack_require__(168),
	    baseRest = __webpack_require__(157),
	    castArrayLikeObject = __webpack_require__(251),
	    last = __webpack_require__(228);

	/**
	 * This method is like `_.intersection` except that it accepts `iteratee`
	 * which is invoked for each element of each `arrays` to generate the criterion
	 * by which they're compared. The order and references of result values are
	 * determined by the first array. The iteratee is invoked with one argument:
	 * (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {Array} Returns the new array of intersecting values.
	 * @example
	 *
	 * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
	 * // => [2.1]
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
	 * // => [{ 'x': 1 }]
	 */
	var intersectionBy = baseRest(function(arrays) {
	  var iteratee = last(arrays),
	      mapped = arrayMap(arrays, castArrayLikeObject);

	  if (iteratee === last(mapped)) {
	    iteratee = undefined;
	  } else {
	    mapped.pop();
	  }
	  return (mapped.length && mapped[0] === arrays[0])
	    ? baseIntersection(mapped, baseIteratee(iteratee, 2))
	    : [];
	});

	module.exports = intersectionBy;


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(154),
	    baseIntersection = __webpack_require__(250),
	    baseRest = __webpack_require__(157),
	    castArrayLikeObject = __webpack_require__(251),
	    last = __webpack_require__(228);

	/**
	 * This method is like `_.intersection` except that it accepts `comparator`
	 * which is invoked to compare elements of `arrays`. The order and references
	 * of result values are determined by the first array. The comparator is
	 * invoked with two arguments: (arrVal, othVal).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of intersecting values.
	 * @example
	 *
	 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	 * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	 *
	 * _.intersectionWith(objects, others, _.isEqual);
	 * // => [{ 'x': 1, 'y': 2 }]
	 */
	var intersectionWith = baseRest(function(arrays) {
	  var comparator = last(arrays),
	      mapped = arrayMap(arrays, castArrayLikeObject);

	  comparator = typeof comparator == 'function' ? comparator : undefined;
	  if (comparator) {
	    mapped.pop();
	  }
	  return (mapped.length && mapped[0] === arrays[0])
	    ? baseIntersection(mapped, undefined, comparator)
	    : [];
	});

	module.exports = intersectionWith;


/***/ }),
/* 254 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeJoin = arrayProto.join;

	/**
	 * Converts all elements in `array` into a string separated by `separator`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to convert.
	 * @param {string} [separator=','] The element separator.
	 * @returns {string} Returns the joined string.
	 * @example
	 *
	 * _.join(['a', 'b', 'c'], '~');
	 * // => 'a~b~c'
	 */
	function join(array, separator) {
	  return array == null ? '' : nativeJoin.call(array, separator);
	}

	module.exports = join;


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(150),
	    baseIsNaN = __webpack_require__(151),
	    strictLastIndexOf = __webpack_require__(256),
	    toInteger = __webpack_require__(100);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * This method is like `_.indexOf` except that it iterates over elements of
	 * `array` from right to left.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=array.length-1] The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 * @example
	 *
	 * _.lastIndexOf([1, 2, 1, 2], 2);
	 * // => 3
	 *
	 * // Search from the `fromIndex`.
	 * _.lastIndexOf([1, 2, 1, 2], 2, 2);
	 * // => 1
	 */
	function lastIndexOf(array, value, fromIndex) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return -1;
	  }
	  var index = length;
	  if (fromIndex !== undefined) {
	    index = toInteger(fromIndex);
	    index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
	  }
	  return value === value
	    ? strictLastIndexOf(array, value, index)
	    : baseFindIndex(array, baseIsNaN, index, true);
	}

	module.exports = lastIndexOf;


/***/ }),
/* 256 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.lastIndexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictLastIndexOf(array, value, fromIndex) {
	  var index = fromIndex + 1;
	  while (index--) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return index;
	}

	module.exports = strictLastIndexOf;


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

	var baseNth = __webpack_require__(258),
	    toInteger = __webpack_require__(100);

	/**
	 * Gets the element at index `n` of `array`. If `n` is negative, the nth
	 * element from the end is returned.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.11.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {number} [n=0] The index of the element to return.
	 * @returns {*} Returns the nth element of `array`.
	 * @example
	 *
	 * var array = ['a', 'b', 'c', 'd'];
	 *
	 * _.nth(array, 1);
	 * // => 'b'
	 *
	 * _.nth(array, -2);
	 * // => 'c';
	 */
	function nth(array, n) {
	  return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
	}

	module.exports = nth;


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

	var isIndex = __webpack_require__(99);

	/**
	 * The base implementation of `_.nth` which doesn't coerce arguments.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {number} n The index of the element to return.
	 * @returns {*} Returns the nth element of `array`.
	 */
	function baseNth(array, n) {
	  var length = array.length;
	  if (!length) {
	    return;
	  }
	  n += n < 0 ? length : 0;
	  return isIndex(n, length) ? array[n] : undefined;
	}

	module.exports = baseNth;


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(157),
	    pullAll = __webpack_require__(260);

	/**
	 * Removes all given values from `array` using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
	 * to remove elements from an array by predicate.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {...*} [values] The values to remove.
	 * @returns {Array} Returns `array`.
	 * @example
	 *
	 * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
	 *
	 * _.pull(array, 'a', 'c');
	 * console.log(array);
	 * // => ['b', 'b']
	 */
	var pull = baseRest(pullAll);

	module.exports = pull;


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

	var basePullAll = __webpack_require__(261);

	/**
	 * This method is like `_.pull` except that it accepts an array of values to remove.
	 *
	 * **Note:** Unlike `_.difference`, this method mutates `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to remove.
	 * @returns {Array} Returns `array`.
	 * @example
	 *
	 * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
	 *
	 * _.pullAll(array, ['a', 'c']);
	 * console.log(array);
	 * // => ['b', 'b']
	 */
	function pullAll(array, values) {
	  return (array && array.length && values && values.length)
	    ? basePullAll(array, values)
	    : array;
	}

	module.exports = pullAll;


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(154),
	    baseIndexOf = __webpack_require__(149),
	    baseIndexOfWith = __webpack_require__(262),
	    baseUnary = __webpack_require__(155),
	    copyArray = __webpack_require__(113);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * The base implementation of `_.pullAllBy` without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to remove.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns `array`.
	 */
	function basePullAll(array, values, iteratee, comparator) {
	  var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
	      index = -1,
	      length = values.length,
	      seen = array;

	  if (array === values) {
	    values = copyArray(values);
	  }
	  if (iteratee) {
	    seen = arrayMap(array, baseUnary(iteratee));
	  }
	  while (++index < length) {
	    var fromIndex = 0,
	        value = values[index],
	        computed = iteratee ? iteratee(value) : value;

	    while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
	      if (seen !== array) {
	        splice.call(seen, fromIndex, 1);
	      }
	      splice.call(array, fromIndex, 1);
	    }
	  }
	  return array;
	}

	module.exports = basePullAll;


/***/ }),
/* 262 */
/***/ (function(module, exports) {

	/**
	 * This function is like `baseIndexOf` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOfWith(array, value, fromIndex, comparator) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (comparator(array[index], value)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOfWith;


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    basePullAll = __webpack_require__(261);

	/**
	 * This method is like `_.pullAll` except that it accepts `iteratee` which is
	 * invoked for each element of `array` and `values` to generate the criterion
	 * by which they're compared. The iteratee is invoked with one argument: (value).
	 *
	 * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to remove.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {Array} Returns `array`.
	 * @example
	 *
	 * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
	 *
	 * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
	 * console.log(array);
	 * // => [{ 'x': 2 }]
	 */
	function pullAllBy(array, values, iteratee) {
	  return (array && array.length && values && values.length)
	    ? basePullAll(array, values, baseIteratee(iteratee, 2))
	    : array;
	}

	module.exports = pullAllBy;


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

	var basePullAll = __webpack_require__(261);

	/**
	 * This method is like `_.pullAll` except that it accepts `comparator` which
	 * is invoked to compare elements of `array` to `values`. The comparator is
	 * invoked with two arguments: (arrVal, othVal).
	 *
	 * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.6.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to remove.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns `array`.
	 * @example
	 *
	 * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
	 *
	 * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
	 * console.log(array);
	 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
	 */
	function pullAllWith(array, values, comparator) {
	  return (array && array.length && values && values.length)
	    ? basePullAll(array, values, undefined, comparator)
	    : array;
	}

	module.exports = pullAllWith;


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(154),
	    baseAt = __webpack_require__(266),
	    basePullAt = __webpack_require__(267),
	    compareAscending = __webpack_require__(270),
	    flatRest = __webpack_require__(271),
	    isIndex = __webpack_require__(99);

	/**
	 * Removes elements from `array` corresponding to `indexes` and returns an
	 * array of removed elements.
	 *
	 * **Note:** Unlike `_.at`, this method mutates `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
	 * @returns {Array} Returns the new array of removed elements.
	 * @example
	 *
	 * var array = ['a', 'b', 'c', 'd'];
	 * var pulled = _.pullAt(array, [1, 3]);
	 *
	 * console.log(array);
	 * // => ['a', 'c']
	 *
	 * console.log(pulled);
	 * // => ['b', 'd']
	 */
	var pullAt = flatRest(function(array, indexes) {
	  var length = array == null ? 0 : array.length,
	      result = baseAt(array, indexes);

	  basePullAt(array, arrayMap(indexes, function(index) {
	    return isIndex(index, length) ? +index : index;
	  }).sort(compareAscending));

	  return result;
	});

	module.exports = pullAt;


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

	var get = __webpack_require__(212);

	/**
	 * The base implementation of `_.at` without support for individual paths.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {string[]} paths The property paths to pick.
	 * @returns {Array} Returns the picked elements.
	 */
	function baseAt(object, paths) {
	  var index = -1,
	      length = paths.length,
	      result = Array(length),
	      skip = object == null;

	  while (++index < length) {
	    result[index] = skip ? undefined : get(object, paths[index]);
	  }
	  return result;
	}

	module.exports = baseAt;


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

	var baseUnset = __webpack_require__(268),
	    isIndex = __webpack_require__(99);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * The base implementation of `_.pullAt` without support for individual
	 * indexes or capturing the removed elements.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {number[]} indexes The indexes of elements to remove.
	 * @returns {Array} Returns `array`.
	 */
	function basePullAt(array, indexes) {
	  var length = array ? indexes.length : 0,
	      lastIndex = length - 1;

	  while (length--) {
	    var index = indexes[length];
	    if (length == lastIndex || index !== previous) {
	      var previous = index;
	      if (isIndex(index)) {
	        splice.call(array, index, 1);
	      } else {
	        baseUnset(array, index);
	      }
	    }
	  }
	  return array;
	}

	module.exports = basePullAt;


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(214),
	    last = __webpack_require__(228),
	    parent = __webpack_require__(269),
	    toKey = __webpack_require__(221);

	/**
	 * The base implementation of `_.unset`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The property path to unset.
	 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	 */
	function baseUnset(object, path) {
	  path = castPath(path, object);
	  object = parent(object, path);
	  return object == null || delete object[toKey(last(path))];
	}

	module.exports = baseUnset;


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(213),
	    baseSlice = __webpack_require__(86);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(103);

	/**
	 * Compares values to sort them in ascending order.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {number} Returns the sort order indicator for `value`.
	 */
	function compareAscending(value, other) {
	  if (value !== other) {
	    var valIsDefined = value !== undefined,
	        valIsNull = value === null,
	        valIsReflexive = value === value,
	        valIsSymbol = isSymbol(value);

	    var othIsDefined = other !== undefined,
	        othIsNull = other === null,
	        othIsReflexive = other === other,
	        othIsSymbol = isSymbol(other);

	    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
	        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
	        (valIsNull && othIsDefined && othIsReflexive) ||
	        (!valIsDefined && othIsReflexive) ||
	        !valIsReflexive) {
	      return 1;
	    }
	    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
	        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
	        (othIsNull && valIsDefined && valIsReflexive) ||
	        (!othIsDefined && valIsReflexive) ||
	        !othIsReflexive) {
	      return -1;
	    }
	  }
	  return 0;
	}

	module.exports = compareAscending;


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

	var flatten = __webpack_require__(243),
	    overRest = __webpack_require__(159),
	    setToString = __webpack_require__(161);

	/**
	 * A specialized version of `baseRest` which flattens the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @returns {Function} Returns the new function.
	 */
	function flatRest(func) {
	  return setToString(overRest(func, undefined, flatten), func + '');
	}

	module.exports = flatRest;


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    basePullAt = __webpack_require__(267);

	/**
	 * Removes all elements from `array` that `predicate` returns truthy for
	 * and returns an array of the removed elements. The predicate is invoked
	 * with three arguments: (value, index, array).
	 *
	 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
	 * to pull elements from an array by value.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.0.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new array of removed elements.
	 * @example
	 *
	 * var array = [1, 2, 3, 4];
	 * var evens = _.remove(array, function(n) {
	 *   return n % 2 == 0;
	 * });
	 *
	 * console.log(array);
	 * // => [1, 3]
	 *
	 * console.log(evens);
	 * // => [2, 4]
	 */
	function remove(array, predicate) {
	  var result = [];
	  if (!(array && array.length)) {
	    return result;
	  }
	  var index = -1,
	      indexes = [],
	      length = array.length;

	  predicate = baseIteratee(predicate, 3);
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result.push(value);
	      indexes.push(index);
	    }
	  }
	  basePullAt(array, indexes);
	  return result;
	}

	module.exports = remove;


/***/ }),
/* 273 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeReverse = arrayProto.reverse;

	/**
	 * Reverses `array` so that the first element becomes the last, the second
	 * element becomes the second to last, and so on.
	 *
	 * **Note:** This method mutates `array` and is based on
	 * [`Array#reverse`](https://mdn.io/Array/reverse).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @returns {Array} Returns `array`.
	 * @example
	 *
	 * var array = [1, 2, 3];
	 *
	 * _.reverse(array);
	 * // => [3, 2, 1]
	 *
	 * console.log(array);
	 * // => [3, 2, 1]
	 */
	function reverse(array) {
	  return array == null ? array : nativeReverse.call(array);
	}

	module.exports = reverse;


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(86),
	    isIterateeCall = __webpack_require__(87),
	    toInteger = __webpack_require__(100);

	/**
	 * Creates a slice of `array` from `start` up to, but not including, `end`.
	 *
	 * **Note:** This method is used instead of
	 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
	 * returned.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function slice(array, start, end) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return [];
	  }
	  if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
	    start = 0;
	    end = length;
	  }
	  else {
	    start = start == null ? 0 : toInteger(start);
	    end = end === undefined ? length : toInteger(end);
	  }
	  return baseSlice(array, start, end);
	}

	module.exports = slice;


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSortedIndex = __webpack_require__(276);

	/**
	 * Uses a binary search to determine the lowest index at which `value`
	 * should be inserted into `array` in order to maintain its sort order.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The sorted array to inspect.
	 * @param {*} value The value to evaluate.
	 * @returns {number} Returns the index at which `value` should be inserted
	 *  into `array`.
	 * @example
	 *
	 * _.sortedIndex([30, 50], 40);
	 * // => 1
	 */
	function sortedIndex(array, value) {
	  return baseSortedIndex(array, value);
	}

	module.exports = sortedIndex;


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSortedIndexBy = __webpack_require__(277),
	    identity = __webpack_require__(158),
	    isSymbol = __webpack_require__(103);

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295,
	    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

	/**
	 * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
	 * performs a binary search of `array` to determine the index at which `value`
	 * should be inserted into `array` in order to maintain its sort order.
	 *
	 * @private
	 * @param {Array} array The sorted array to inspect.
	 * @param {*} value The value to evaluate.
	 * @param {boolean} [retHighest] Specify returning the highest qualified index.
	 * @returns {number} Returns the index at which `value` should be inserted
	 *  into `array`.
	 */
	function baseSortedIndex(array, value, retHighest) {
	  var low = 0,
	      high = array == null ? low : array.length;

	  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
	    while (low < high) {
	      var mid = (low + high) >>> 1,
	          computed = array[mid];

	      if (computed !== null && !isSymbol(computed) &&
	          (retHighest ? (computed <= value) : (computed < value))) {
	        low = mid + 1;
	      } else {
	        high = mid;
	      }
	    }
	    return high;
	  }
	  return baseSortedIndexBy(array, value, identity, retHighest);
	}

	module.exports = baseSortedIndex;


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(103);

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295,
	    MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeMin = Math.min;

	/**
	 * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
	 * which invokes `iteratee` for `value` and each element of `array` to compute
	 * their sort ranking. The iteratee is invoked with one argument; (value).
	 *
	 * @private
	 * @param {Array} array The sorted array to inspect.
	 * @param {*} value The value to evaluate.
	 * @param {Function} iteratee The iteratee invoked per element.
	 * @param {boolean} [retHighest] Specify returning the highest qualified index.
	 * @returns {number} Returns the index at which `value` should be inserted
	 *  into `array`.
	 */
	function baseSortedIndexBy(array, value, iteratee, retHighest) {
	  value = iteratee(value);

	  var low = 0,
	      high = array == null ? 0 : array.length,
	      valIsNaN = value !== value,
	      valIsNull = value === null,
	      valIsSymbol = isSymbol(value),
	      valIsUndefined = value === undefined;

	  while (low < high) {
	    var mid = nativeFloor((low + high) / 2),
	        computed = iteratee(array[mid]),
	        othIsDefined = computed !== undefined,
	        othIsNull = computed === null,
	        othIsReflexive = computed === computed,
	        othIsSymbol = isSymbol(computed);

	    if (valIsNaN) {
	      var setLow = retHighest || othIsReflexive;
	    } else if (valIsUndefined) {
	      setLow = othIsReflexive && (retHighest || othIsDefined);
	    } else if (valIsNull) {
	      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
	    } else if (valIsSymbol) {
	      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
	    } else if (othIsNull || othIsSymbol) {
	      setLow = false;
	    } else {
	      setLow = retHighest ? (computed <= value) : (computed < value);
	    }
	    if (setLow) {
	      low = mid + 1;
	    } else {
	      high = mid;
	    }
	  }
	  return nativeMin(high, MAX_ARRAY_INDEX);
	}

	module.exports = baseSortedIndexBy;


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    baseSortedIndexBy = __webpack_require__(277);

	/**
	 * This method is like `_.sortedIndex` except that it accepts `iteratee`
	 * which is invoked for `value` and each element of `array` to compute their
	 * sort ranking. The iteratee is invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The sorted array to inspect.
	 * @param {*} value The value to evaluate.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {number} Returns the index at which `value` should be inserted
	 *  into `array`.
	 * @example
	 *
	 * var objects = [{ 'x': 4 }, { 'x': 5 }];
	 *
	 * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
	 * // => 0
	 */
	function sortedIndexBy(array, value, iteratee) {
	  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2));
	}

	module.exports = sortedIndexBy;


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSortedIndex = __webpack_require__(276),
	    eq = __webpack_require__(88);

	/**
	 * This method is like `_.indexOf` except that it performs a binary
	 * search on a sorted `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 * @example
	 *
	 * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
	 * // => 1
	 */
	function sortedIndexOf(array, value) {
	  var length = array == null ? 0 : array.length;
	  if (length) {
	    var index = baseSortedIndex(array, value);
	    if (index < length && eq(array[index], value)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = sortedIndexOf;


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSortedIndex = __webpack_require__(276);

	/**
	 * This method is like `_.sortedIndex` except that it returns the highest
	 * index at which `value` should be inserted into `array` in order to
	 * maintain its sort order.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The sorted array to inspect.
	 * @param {*} value The value to evaluate.
	 * @returns {number} Returns the index at which `value` should be inserted
	 *  into `array`.
	 * @example
	 *
	 * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
	 * // => 4
	 */
	function sortedLastIndex(array, value) {
	  return baseSortedIndex(array, value, true);
	}

	module.exports = sortedLastIndex;


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    baseSortedIndexBy = __webpack_require__(277);

	/**
	 * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
	 * which is invoked for `value` and each element of `array` to compute their
	 * sort ranking. The iteratee is invoked with one argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The sorted array to inspect.
	 * @param {*} value The value to evaluate.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {number} Returns the index at which `value` should be inserted
	 *  into `array`.
	 * @example
	 *
	 * var objects = [{ 'x': 4 }, { 'x': 5 }];
	 *
	 * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
	 * // => 1
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
	 * // => 1
	 */
	function sortedLastIndexBy(array, value, iteratee) {
	  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2), true);
	}

	module.exports = sortedLastIndexBy;


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSortedIndex = __webpack_require__(276),
	    eq = __webpack_require__(88);

	/**
	 * This method is like `_.lastIndexOf` except that it performs a binary
	 * search on a sorted `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 * @example
	 *
	 * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
	 * // => 3
	 */
	function sortedLastIndexOf(array, value) {
	  var length = array == null ? 0 : array.length;
	  if (length) {
	    var index = baseSortedIndex(array, value, true) - 1;
	    if (eq(array[index], value)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = sortedLastIndexOf;


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSortedUniq = __webpack_require__(284);

	/**
	 * This method is like `_.uniq` except that it's designed and optimized
	 * for sorted arrays.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.sortedUniq([1, 1, 2]);
	 * // => [1, 2]
	 */
	function sortedUniq(array) {
	  return (array && array.length)
	    ? baseSortedUniq(array)
	    : [];
	}

	module.exports = sortedUniq;


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(88);

	/**
	 * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseSortedUniq(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    if (!index || !eq(computed, seen)) {
	      var seen = computed;
	      result[resIndex++] = value === 0 ? 0 : value;
	    }
	  }
	  return result;
	}

	module.exports = baseSortedUniq;


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    baseSortedUniq = __webpack_require__(284);

	/**
	 * This method is like `_.uniqBy` except that it's designed and optimized
	 * for sorted arrays.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
	 * // => [1.1, 2.3]
	 */
	function sortedUniqBy(array, iteratee) {
	  return (array && array.length)
	    ? baseSortedUniq(array, baseIteratee(iteratee, 2))
	    : [];
	}

	module.exports = sortedUniqBy;


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(86);

	/**
	 * Gets all but the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.tail([1, 2, 3]);
	 * // => [2, 3]
	 */
	function tail(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? baseSlice(array, 1, length) : [];
	}

	module.exports = tail;


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(86),
	    toInteger = __webpack_require__(100);

	/**
	 * Creates a slice of `array` with `n` elements taken from the beginning.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {number} [n=1] The number of elements to take.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.take([1, 2, 3]);
	 * // => [1]
	 *
	 * _.take([1, 2, 3], 2);
	 * // => [1, 2]
	 *
	 * _.take([1, 2, 3], 5);
	 * // => [1, 2, 3]
	 *
	 * _.take([1, 2, 3], 0);
	 * // => []
	 */
	function take(array, n, guard) {
	  if (!(array && array.length)) {
	    return [];
	  }
	  n = (guard || n === undefined) ? 1 : toInteger(n);
	  return baseSlice(array, 0, n < 0 ? 0 : n);
	}

	module.exports = take;


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(86),
	    toInteger = __webpack_require__(100);

	/**
	 * Creates a slice of `array` with `n` elements taken from the end.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {number} [n=1] The number of elements to take.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * _.takeRight([1, 2, 3]);
	 * // => [3]
	 *
	 * _.takeRight([1, 2, 3], 2);
	 * // => [2, 3]
	 *
	 * _.takeRight([1, 2, 3], 5);
	 * // => [1, 2, 3]
	 *
	 * _.takeRight([1, 2, 3], 0);
	 * // => []
	 */
	function takeRight(array, n, guard) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return [];
	  }
	  n = (guard || n === undefined) ? 1 : toInteger(n);
	  n = length - n;
	  return baseSlice(array, n < 0 ? 0 : n, length);
	}

	module.exports = takeRight;


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    baseWhile = __webpack_require__(233);

	/**
	 * Creates a slice of `array` with elements taken from the end. Elements are
	 * taken until `predicate` returns falsey. The predicate is invoked with
	 * three arguments: (value, index, array).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': true },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': false }
	 * ];
	 *
	 * _.takeRightWhile(users, function(o) { return !o.active; });
	 * // => objects for ['fred', 'pebbles']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
	 * // => objects for ['pebbles']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.takeRightWhile(users, ['active', false]);
	 * // => objects for ['fred', 'pebbles']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.takeRightWhile(users, 'active');
	 * // => []
	 */
	function takeRightWhile(array, predicate) {
	  return (array && array.length)
	    ? baseWhile(array, baseIteratee(predicate, 3), false, true)
	    : [];
	}

	module.exports = takeRightWhile;


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    baseWhile = __webpack_require__(233);

	/**
	 * Creates a slice of `array` with elements taken from the beginning. Elements
	 * are taken until `predicate` returns falsey. The predicate is invoked with
	 * three arguments: (value, index, array).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the slice of `array`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.takeWhile(users, function(o) { return !o.active; });
	 * // => objects for ['barney', 'fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.takeWhile(users, { 'user': 'barney', 'active': false });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.takeWhile(users, ['active', false]);
	 * // => objects for ['barney', 'fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.takeWhile(users, 'active');
	 * // => []
	 */
	function takeWhile(array, predicate) {
	  return (array && array.length)
	    ? baseWhile(array, baseIteratee(predicate, 3))
	    : [];
	}

	module.exports = takeWhile;


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(108),
	    baseRest = __webpack_require__(157),
	    baseUniq = __webpack_require__(292),
	    isArrayLikeObject = __webpack_require__(166);

	/**
	 * Creates an array of unique values, in order, from all given arrays using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.union([2], [1, 2]);
	 * // => [2, 1]
	 */
	var union = baseRest(function(arrays) {
	  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
	});

	module.exports = union;


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(116),
	    arrayIncludes = __webpack_require__(148),
	    arrayIncludesWith = __webpack_require__(153),
	    cacheHas = __webpack_require__(156),
	    createSet = __webpack_require__(293),
	    setToArray = __webpack_require__(184);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;

	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseUniq;


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

	var Set = __webpack_require__(206),
	    noop = __webpack_require__(294),
	    setToArray = __webpack_require__(184);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Creates a set object of `values`.
	 *
	 * @private
	 * @param {Array} values The values to add to the set.
	 * @returns {Object} Returns the new set.
	 */
	var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
	  return new Set(values);
	};

	module.exports = createSet;


/***/ }),
/* 294 */
/***/ (function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(108),
	    baseIteratee = __webpack_require__(168),
	    baseRest = __webpack_require__(157),
	    baseUniq = __webpack_require__(292),
	    isArrayLikeObject = __webpack_require__(166),
	    last = __webpack_require__(228);

	/**
	 * This method is like `_.union` except that it accepts `iteratee` which is
	 * invoked for each element of each `arrays` to generate the criterion by
	 * which uniqueness is computed. Result values are chosen from the first
	 * array in which the value occurs. The iteratee is invoked with one argument:
	 * (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.unionBy([2.1], [1.2, 2.3], Math.floor);
	 * // => [2.1, 1.2]
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
	 * // => [{ 'x': 1 }, { 'x': 2 }]
	 */
	var unionBy = baseRest(function(arrays) {
	  var iteratee = last(arrays);
	  if (isArrayLikeObject(iteratee)) {
	    iteratee = undefined;
	  }
	  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), baseIteratee(iteratee, 2));
	});

	module.exports = unionBy;


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(108),
	    baseRest = __webpack_require__(157),
	    baseUniq = __webpack_require__(292),
	    isArrayLikeObject = __webpack_require__(166),
	    last = __webpack_require__(228);

	/**
	 * This method is like `_.union` except that it accepts `comparator` which
	 * is invoked to compare elements of `arrays`. Result values are chosen from
	 * the first array in which the value occurs. The comparator is invoked
	 * with two arguments: (arrVal, othVal).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	 * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	 *
	 * _.unionWith(objects, others, _.isEqual);
	 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
	 */
	var unionWith = baseRest(function(arrays) {
	  var comparator = last(arrays);
	  comparator = typeof comparator == 'function' ? comparator : undefined;
	  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
	});

	module.exports = unionWith;


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

	var baseUniq = __webpack_require__(292);

	/**
	 * Creates a duplicate-free version of an array, using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons, in which only the first occurrence of each element
	 * is kept. The order of result values is determined by the order they occur
	 * in the array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.uniq([2, 1, 2]);
	 * // => [2, 1]
	 */
	function uniq(array) {
	  return (array && array.length) ? baseUniq(array) : [];
	}

	module.exports = uniq;


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(168),
	    baseUniq = __webpack_require__(292);

	/**
	 * This method is like `_.uniq` except that it accepts `iteratee` which is
	 * invoked for each element in `array` to generate the criterion by which
	 * uniqueness is computed. The order of result values is determined by the
	 * order they occur in the array. The iteratee is invoked with one argument:
	 * (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
	 * // => [2.1, 1.2]
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	 * // => [{ 'x': 1 }, { 'x': 2 }]
	 */
	function uniqBy(array, iteratee) {
	  return (array && array.length) ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
	}

	module.exports = uniqBy;


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

	var baseUniq = __webpack_require__(292);

	/**
	 * This method is like `_.uniq` except that it accepts `comparator` which
	 * is invoked to compare elements of `array`. The order of result values is
	 * determined by the order they occur in the array.The comparator is invoked
	 * with two arguments: (arrVal, othVal).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 * @example
	 *
	 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
	 *
	 * _.uniqWith(objects, _.isEqual);
	 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
	 */
	function uniqWith(array, comparator) {
	  comparator = typeof comparator == 'function' ? comparator : undefined;
	  return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
	}

	module.exports = uniqWith;


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(189),
	    arrayMap = __webpack_require__(154),
	    baseProperty = __webpack_require__(226),
	    baseTimes = __webpack_require__(193),
	    isArrayLikeObject = __webpack_require__(166);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This method is like `_.zip` except that it accepts an array of grouped
	 * elements and creates an array regrouping the elements to their pre-zip
	 * configuration.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.2.0
	 * @category Array
	 * @param {Array} array The array of grouped elements to process.
	 * @returns {Array} Returns the new array of regrouped elements.
	 * @example
	 *
	 * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
	 * // => [['a', 1, true], ['b', 2, false]]
	 *
	 * _.unzip(zipped);
	 * // => [['a', 'b'], [1, 2], [true, false]]
	 */
	function unzip(array) {
	  if (!(array && array.length)) {
	    return [];
	  }
	  var length = 0;
	  array = arrayFilter(array, function(group) {
	    if (isArrayLikeObject(group)) {
	      length = nativeMax(group.length, length);
	      return true;
	    }
	  });
	  return baseTimes(length, function(index) {
	    return arrayMap(array, baseProperty(index));
	  });
	}

	module.exports = unzip;


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(160),
	    arrayMap = __webpack_require__(154),
	    unzip = __webpack_require__(300);

	/**
	 * This method is like `_.unzip` except that it accepts `iteratee` to specify
	 * how regrouped values should be combined. The iteratee is invoked with the
	 * elements of each group: (...group).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.8.0
	 * @category Array
	 * @param {Array} array The array of grouped elements to process.
	 * @param {Function} [iteratee=_.identity] The function to combine
	 *  regrouped values.
	 * @returns {Array} Returns the new array of regrouped elements.
	 * @example
	 *
	 * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
	 * // => [[1, 10, 100], [2, 20, 200]]
	 *
	 * _.unzipWith(zipped, _.add);
	 * // => [3, 30, 300]
	 */
	function unzipWith(array, iteratee) {
	  if (!(array && array.length)) {
	    return [];
	  }
	  var result = unzip(array);
	  if (iteratee == null) {
	    return result;
	  }
	  return arrayMap(result, function(group) {
	    return apply(iteratee, undefined, group);
	  });
	}

	module.exports = unzipWith;


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(115),
	    baseRest = __webpack_require__(157),
	    isArrayLikeObject = __webpack_require__(166);

	/**
	 * Creates an array excluding all given values using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * **Note:** Unlike `_.pull`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...*} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.difference, _.xor
	 * @example
	 *
	 * _.without([2, 1, 2, 3], 1, 2);
	 * // => [3]
	 */
	var without = baseRest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, values)
	    : [];
	});

	module.exports = without;


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(189),
	    baseRest = __webpack_require__(157),
	    baseXor = __webpack_require__(304),
	    isArrayLikeObject = __webpack_require__(166);

	/**
	 * Creates an array of unique values that is the
	 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
	 * of the given arrays. The order of result values is determined by the order
	 * they occur in the arrays.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.difference, _.without
	 * @example
	 *
	 * _.xor([2, 1], [2, 3]);
	 * // => [1, 3]
	 */
	var xor = baseRest(function(arrays) {
	  return baseXor(arrayFilter(arrays, isArrayLikeObject));
	});

	module.exports = xor;


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(115),
	    baseFlatten = __webpack_require__(108),
	    baseUniq = __webpack_require__(292);

	/**
	 * The base implementation of methods like `_.xor`, without support for
	 * iteratee shorthands, that accepts an array of arrays to inspect.
	 *
	 * @private
	 * @param {Array} arrays The arrays to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of values.
	 */
	function baseXor(arrays, iteratee, comparator) {
	  var length = arrays.length;
	  if (length < 2) {
	    return length ? baseUniq(arrays[0]) : [];
	  }
	  var index = -1,
	      result = Array(length);

	  while (++index < length) {
	    var array = arrays[index],
	        othIndex = -1;

	    while (++othIndex < length) {
	      if (othIndex != index) {
	        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
	      }
	    }
	  }
	  return baseUniq(baseFlatten(result, 1), iteratee, comparator);
	}

	module.exports = baseXor;


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(189),
	    baseIteratee = __webpack_require__(168),
	    baseRest = __webpack_require__(157),
	    baseXor = __webpack_require__(304),
	    isArrayLikeObject = __webpack_require__(166),
	    last = __webpack_require__(228);

	/**
	 * This method is like `_.xor` except that it accepts `iteratee` which is
	 * invoked for each element of each `arrays` to generate the criterion by
	 * which by which they're compared. The order of result values is determined
	 * by the order they occur in the arrays. The iteratee is invoked with one
	 * argument: (value).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
	 * // => [1.2, 3.4]
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
	 * // => [{ 'x': 2 }]
	 */
	var xorBy = baseRest(function(arrays) {
	  var iteratee = last(arrays);
	  if (isArrayLikeObject(iteratee)) {
	    iteratee = undefined;
	  }
	  return baseXor(arrayFilter(arrays, isArrayLikeObject), baseIteratee(iteratee, 2));
	});

	module.exports = xorBy;


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(189),
	    baseRest = __webpack_require__(157),
	    baseXor = __webpack_require__(304),
	    isArrayLikeObject = __webpack_require__(166),
	    last = __webpack_require__(228);

	/**
	 * This method is like `_.xor` except that it accepts `comparator` which is
	 * invoked to compare elements of `arrays`. The order of result values is
	 * determined by the order they occur in the arrays. The comparator is invoked
	 * with two arguments: (arrVal, othVal).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	 * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	 *
	 * _.xorWith(objects, others, _.isEqual);
	 * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
	 */
	var xorWith = baseRest(function(arrays) {
	  var comparator = last(arrays);
	  comparator = typeof comparator == 'function' ? comparator : undefined;
	  return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
	});

	module.exports = xorWith;


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(157),
	    unzip = __webpack_require__(300);

	/**
	 * Creates an array of grouped elements, the first of which contains the
	 * first elements of the given arrays, the second of which contains the
	 * second elements of the given arrays, and so on.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to process.
	 * @returns {Array} Returns the new array of grouped elements.
	 * @example
	 *
	 * _.zip(['a', 'b'], [1, 2], [true, false]);
	 * // => [['a', 1, true], ['b', 2, false]]
	 */
	var zip = baseRest(unzip);

	module.exports = zip;


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(309),
	    baseZipObject = __webpack_require__(311);

	/**
	 * This method is like `_.fromPairs` except that it accepts two arrays,
	 * one of property identifiers and one of corresponding values.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.4.0
	 * @category Array
	 * @param {Array} [props=[]] The property identifiers.
	 * @param {Array} [values=[]] The property values.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * _.zipObject(['a', 'b'], [1, 2]);
	 * // => { 'a': 1, 'b': 2 }
	 */
	function zipObject(props, values) {
	  return baseZipObject(props || [], values || [], assignValue);
	}

	module.exports = zipObject;


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(310),
	    eq = __webpack_require__(88);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(164);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ }),
/* 311 */
/***/ (function(module, exports) {

	/**
	 * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
	 *
	 * @private
	 * @param {Array} props The property identifiers.
	 * @param {Array} values The property values.
	 * @param {Function} assignFunc The function to assign values.
	 * @returns {Object} Returns the new object.
	 */
	function baseZipObject(props, values, assignFunc) {
	  var index = -1,
	      length = props.length,
	      valsLength = values.length,
	      result = {};

	  while (++index < length) {
	    var value = index < valsLength ? values[index] : undefined;
	    assignFunc(result, props[index], value);
	  }
	  return result;
	}

	module.exports = baseZipObject;


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSet = __webpack_require__(313),
	    baseZipObject = __webpack_require__(311);

	/**
	 * This method is like `_.zipObject` except that it supports property paths.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.1.0
	 * @category Array
	 * @param {Array} [props=[]] The property identifiers.
	 * @param {Array} [values=[]] The property values.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
	 * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
	 */
	function zipObjectDeep(props, values) {
	  return baseZipObject(props || [], values || [], baseSet);
	}

	module.exports = zipObjectDeep;


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(309),
	    castPath = __webpack_require__(214),
	    isIndex = __webpack_require__(99),
	    isObject = __webpack_require__(97),
	    toKey = __webpack_require__(221);

	/**
	 * The base implementation of `_.set`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @param {Function} [customizer] The function to customize path creation.
	 * @returns {Object} Returns `object`.
	 */
	function baseSet(object, path, value, customizer) {
	  if (!isObject(object)) {
	    return object;
	  }
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      lastIndex = length - 1,
	      nested = object;

	  while (nested != null && ++index < length) {
	    var key = toKey(path[index]),
	        newValue = value;

	    if (index != lastIndex) {
	      var objValue = nested[key];
	      newValue = customizer ? customizer(objValue, key, nested) : undefined;
	      if (newValue === undefined) {
	        newValue = isObject(objValue)
	          ? objValue
	          : (isIndex(path[index + 1]) ? [] : {});
	      }
	    }
	    assignValue(nested, key, newValue);
	    nested = nested[key];
	  }
	  return object;
	}

	module.exports = baseSet;


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(157),
	    unzipWith = __webpack_require__(301);

	/**
	 * This method is like `_.zip` except that it accepts `iteratee` to specify
	 * how grouped values should be combined. The iteratee is invoked with the
	 * elements of each group: (...group).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.8.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to process.
	 * @param {Function} [iteratee=_.identity] The function to combine
	 *  grouped values.
	 * @returns {Array} Returns the new array of grouped elements.
	 * @example
	 *
	 * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
	 *   return a + b + c;
	 * });
	 * // => [111, 222]
	 */
	var zipWith = baseRest(function(arrays) {
	  var length = arrays.length,
	      iteratee = length > 1 ? arrays[length - 1] : undefined;

	  iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
	  return unzipWith(arrays, iteratee);
	});

	module.exports = zipWith;


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {module.exports = function ( handlerFunction ){
	  var viewer = {},
	    lastSelectedElement;
	  
	  viewer.handle = function ( selectedElement ){
	    // Don't display details on a drag event, which will be prevented
	    if ( d3.event.defaultPrevented ) {
	      return;
	    }
	    
	    var isSelection = true;
	    
	    // Deselection of the focused element
	    if ( lastSelectedElement === selectedElement ) {
	      isSelection = false;
	    }
	    
	    if ( handlerFunction instanceof Function ) {
	      if ( isSelection ) {
	        handlerFunction(selectedElement);
	      } else {
	        handlerFunction(undefined);
	      }
	    }
	    
	    if ( isSelection ) {
	      lastSelectedElement = selectedElement;
	    } else {
	      lastSelectedElement = undefined;
	    }
	  };
	  
	  /**
	   * Resets the displayed information to its default.
	   */
	  viewer.reset = function (){
	    if ( lastSelectedElement ) {
	      handlerFunction(undefined);
	      lastSelectedElement = undefined;
	    }
	  };
	  
	  return viewer;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

	var SetOperatorNode = __webpack_require__(20);

	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = false,
	    filteredNodes,
	    filteredProperties,
	    filterTools = __webpack_require__(76)();
	  
	  
	  /**
	   * If enabled, all set operators including connected properties are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      removeSetOperators();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function removeSetOperators(){
	    var filteredData = filterTools.filterNodesAndTidy(nodes, properties, isNoSetOperator);
	    
	    nodes = filteredData.nodes;
	    properties = filteredData.properties;
	  }
	  
	  function isNoSetOperator( node ){
	    return !(node instanceof SetOperatorNode);
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(d3) {var SetOperatorNode = __webpack_require__(20);
	var OwlThing = __webpack_require__(31);
	var OwlNothing = __webpack_require__(30);
	var elementTools = __webpack_require__(63)();

	module.exports = function (){
	  
	  var statistics = {},
	    nodeCount,
	    occurencesOfClassAndDatatypeTypes = {},
	    edgeCount,
	    occurencesOfPropertyTypes = {},
	    classCount,
	    datatypeCount,
	    datatypePropertyCount,
	    objectPropertyCount,
	    propertyCount,
	    totalIndividualCount,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  statistics.filter = function ( classesAndDatatypes, properties ){
	    resetStoredData();
	    
	    storeTotalCounts(classesAndDatatypes, properties);
	    storeClassAndDatatypeCount(classesAndDatatypes);
	    storePropertyCount(properties);
	    
	    storeOccurencesOfTypes(classesAndDatatypes, occurencesOfClassAndDatatypeTypes);
	    storeOccurencesOfTypes(properties, occurencesOfPropertyTypes);
	    
	    storeTotalIndividualCount(classesAndDatatypes);
	    
	    filteredNodes = classesAndDatatypes;
	    filteredProperties = properties;
	  };
	  
	  function resetStoredData(){
	    nodeCount = 0;
	    edgeCount = 0;
	    classCount = 0;
	    datatypeCount = 0;
	    datatypePropertyCount = 0;
	    objectPropertyCount = 0;
	    propertyCount = 0;
	    totalIndividualCount = 0;
	  }
	  
	  function storeTotalCounts( classesAndDatatypes, properties ){
	    nodeCount = classesAndDatatypes.length;
	    
	    var seenProperties = __webpack_require__(62)(), i, l, property;
	    for ( i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      if ( !seenProperties.has(property) ) {
	        edgeCount += 1;
	      }
	      
	      seenProperties.add(property);
	      if ( property.inverse() ) {
	        seenProperties.add(property.inverse());
	      }
	    }
	  }
	  
	  function storeClassAndDatatypeCount( classesAndDatatypes ){
	    // Each datatype should be counted just a single time
	    var datatypeSet = d3.set(),
	      hasThing = false,
	      hasNothing = false;
	    classCount = 0;
	    var old = 0, newcc = 0;
	    classesAndDatatypes.forEach(function ( node ){
	      if ( elementTools.isDatatype(node) ) {
	        datatypeSet.add(node.defaultLabel());
	      } else if ( !(node instanceof SetOperatorNode) ) {
	        if ( node instanceof OwlThing ) {
	          hasThing = true;
	        } else if ( node instanceof OwlNothing ) {
	          hasNothing = true;
	        } else {
	          old = classCount;
	          var adds = 1 + countElementArray(node.equivalents());
	          classCount += adds;
	          newcc = classCount;
	        }
	      } else if ( node instanceof SetOperatorNode ) {
	        old = classCount;
	        classCount += 1;
	        newcc = classCount;
	      }
	    });
	    
	    // count things and nothings just a single time
	    // classCount += hasThing ? 1 : 0;
	    // classCount += hasNothing ? 1 : 0;
	    
	    datatypeCount = datatypeSet.size();
	  }
	  
	  function storePropertyCount( properties ){
	    for ( var i = 0, l = properties.length; i < l; i++ ) {
	      var property = properties[i];
	      var attr;
	      var result = false;
	      if ( property.attributes ) {
	        attr = property.attributes();
	        if ( attr && attr.indexOf("datatype") !== -1 ) {
	          result = true;
	        }
	      }
	      if ( result === true ) {
	        datatypePropertyCount += getExtendedPropertyCount(property);
	      } else if ( elementTools.isObjectProperty(property) ) {
	        objectPropertyCount += getExtendedPropertyCount(property);
	      }
	    }
	    propertyCount = objectPropertyCount + datatypePropertyCount;
	  }
	  
	  function getExtendedPropertyCount( property ){
	    // count the property itself
	    var count = 1;
	    
	    // and count properties this property represents
	    count += countElementArray(property.equivalents());
	    count += countElementArray(property.redundantProperties());
	    
	    return count;
	  }
	  
	  function countElementArray( properties ){
	    if ( properties ) {
	      return properties.length;
	    }
	    return 0;
	  }
	  
	  function storeOccurencesOfTypes( elements, storage ){
	    elements.forEach(function ( element ){
	      var type = element.type(),
	        typeCount = storage[type];
	      
	      if ( typeof typeCount === "undefined" ) {
	        typeCount = 0;
	      } else {
	        typeCount += 1;
	      }
	      storage[type] = typeCount;
	    });
	  }
	  
	  function storeTotalIndividualCount( nodes ){
	    var sawIndividuals = {};
	    var totalCount = 0;
	    for ( var i = 0, l = nodes.length; i < l; i++ ) {
	      var individuals = nodes[i].individuals();
	      
	      var tempCount = 0;
	      for ( var iA = 0; iA < individuals.length; iA++ ) {
	        if ( sawIndividuals[individuals[iA].iri()] === undefined ) {
	          sawIndividuals[individuals[iA].iri()] = 1; // this iri for that individual is now set to 1 >> seen it
	          tempCount++;
	        }
	      }
	      totalCount += tempCount;
	    }
	    totalIndividualCount = totalCount;
	    sawIndividuals = {}; // clear the object
	    
	  }
	  
	  
	  statistics.nodeCount = function (){
	    return nodeCount;
	  };
	  
	  statistics.occurencesOfClassAndDatatypeTypes = function (){
	    return occurencesOfClassAndDatatypeTypes;
	  };
	  
	  statistics.edgeCount = function (){
	    return edgeCount;
	  };
	  
	  statistics.occurencesOfPropertyTypes = function (){
	    return occurencesOfPropertyTypes;
	  };
	  
	  statistics.classCount = function (){
	    return classCount;
	  };
	  
	  statistics.datatypeCount = function (){
	    return datatypeCount;
	  };
	  
	  statistics.datatypePropertyCount = function (){
	    return datatypePropertyCount;
	  };
	  
	  statistics.objectPropertyCount = function (){
	    return objectPropertyCount;
	  };
	  
	  statistics.propertyCount = function (){
	    return propertyCount;
	  };
	  
	  statistics.totalIndividualCount = function (){
	    return totalIndividualCount;
	  };
	  
	  
	  // Functions a filter must have
	  statistics.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  statistics.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return statistics;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

	var elementTools = __webpack_require__(63)();

	module.exports = function (){
	  
	  var filter = {},
	    nodes,
	    properties,
	    enabled = false,
	    filteredNodes,
	    filteredProperties;
	  
	  
	  /**
	   * If enabled subclasses that have only subclass properties are filtered.
	   * @param untouchedNodes
	   * @param untouchedProperties
	   */
	  filter.filter = function ( untouchedNodes, untouchedProperties ){
	    nodes = untouchedNodes;
	    properties = untouchedProperties;
	    
	    if ( this.enabled() ) {
	      hideSubclassesWithoutOwnProperties();
	    }
	    
	    filteredNodes = nodes;
	    filteredProperties = properties;
	  };
	  
	  function hideSubclassesWithoutOwnProperties(){
	    var unneededProperties = [],
	      unneededClasses = [],
	      subclasses = [],
	      connectedProperties,
	      subclass,
	      property,
	      i, // index,
	      l; // length
	    
	    
	    for ( i = 0, l = properties.length; i < l; i++ ) {
	      property = properties[i];
	      if ( elementTools.isRdfsSubClassOf(property) ) {
	        subclasses.push(property.domain());
	      }
	    }
	    
	    for ( i = 0, l = subclasses.length; i < l; i++ ) {
	      subclass = subclasses[i];
	      connectedProperties = findRelevantConnectedProperties(subclass, properties);
	      
	      // Only remove the node and its properties, if they're all subclassOf properties
	      if ( areOnlySubclassProperties(connectedProperties) &&
	        doesNotInheritFromMultipleClasses(subclass, connectedProperties) ) {
	        
	        unneededProperties = unneededProperties.concat(connectedProperties);
	        unneededClasses.push(subclass);
	      }
	    }
	    
	    nodes = removeUnneededElements(nodes, unneededClasses);
	    properties = removeUnneededElements(properties, unneededProperties);
	  }
	  
	  /**
	   * Looks recursively for connected properties. Because just subclasses are relevant,
	   * we just look recursively for their properties.
	   *
	   * @param node
	   * @param allProperties
	   * @param visitedNodes a visited nodes which is used on recursive invocation
	   * @returns {Array}
	   */
	  function findRelevantConnectedProperties( node, allProperties, visitedNodes ){
	    var connectedProperties = [],
	      property,
	      i,
	      l;
	    
	    for ( i = 0, l = allProperties.length; i < l; i++ ) {
	      property = allProperties[i];
	      if ( property.domain() === node ||
	        property.range() === node ) {
	        
	        connectedProperties.push(property);
	        
	        
	        /* Special case: SuperClass <-(1) Subclass <-(2) Subclass ->(3) e.g. Datatype
	         * We need to find the last property recursively. Otherwise, we would remove the subClassOf
	         * property (1) because we didn't see the datatype property (3).
	         */
	        
	        // Look only for subclass properties, because these are the relevant properties
	        if ( elementTools.isRdfsSubClassOf(property) ) {
	          var domain = property.domain();
	          visitedNodes = visitedNodes || __webpack_require__(62)();
	          
	          // If we have the range, there might be a nested property on the domain
	          if ( node === property.range() && !visitedNodes.has(domain) ) {
	            visitedNodes.add(domain);
	            var nestedConnectedProperties = findRelevantConnectedProperties(domain, allProperties, visitedNodes);
	            connectedProperties = connectedProperties.concat(nestedConnectedProperties);
	          }
	        }
	      }
	    }
	    
	    return connectedProperties;
	  }
	  
	  function areOnlySubclassProperties( connectedProperties ){
	    var onlySubclassProperties = true,
	      property,
	      i,
	      l;
	    
	    for ( i = 0, l = connectedProperties.length; i < l; i++ ) {
	      property = connectedProperties[i];
	      
	      if ( !elementTools.isRdfsSubClassOf(property) ) {
	        onlySubclassProperties = false;
	        break;
	      }
	    }
	    
	    return onlySubclassProperties;
	  }
	  
	  function doesNotInheritFromMultipleClasses( subclass, connectedProperties ){
	    var superClassCount = 0;
	    
	    for ( var i = 0, l = connectedProperties.length; i < l; i++ ) {
	      var property = connectedProperties[i];
	      
	      if ( property.domain() === subclass ) {
	        superClassCount += 1;
	      }
	      
	      if ( superClassCount > 1 ) {
	        return false;
	      }
	    }
	    
	    return true;
	  }
	  
	  function removeUnneededElements( array, removableElements ){
	    var disjoint = [],
	      element,
	      i,
	      l;
	    
	    for ( i = 0, l = array.length; i < l; i++ ) {
	      element = array[i];
	      if ( removableElements.indexOf(element) === -1 ) {
	        disjoint.push(element);
	      }
	    }
	    return disjoint;
	  }
	  
	  filter.enabled = function ( p ){
	    if ( !arguments.length ) return enabled;
	    enabled = p;
	    return filter;
	  };
	  
	  
	  // Functions a filter must have
	  filter.filteredNodes = function (){
	    return filteredNodes;
	  };
	  
	  filter.filteredProperties = function (){
	    return filteredProperties;
	  };
	  
	  
	  return filter;
	};


/***/ })
/******/ ]);