import {
  require_leaflet_src
} from "./chunk-SO3RD5QP.js";
import {
  __commonJS
} from "./chunk-AUZ3RYOM.js";

// node_modules/leaflet-geosearch/dist/geosearch.js
var require_geosearch = __commonJS({
  "node_modules/leaflet-geosearch/dist/geosearch.js"(exports) {
    function e(e2) {
      if (e2 && e2.__esModule)
        return e2;
      var t2 = /* @__PURE__ */ Object.create(null);
      return e2 && Object.keys(e2).forEach(function(r2) {
        if ("default" !== r2) {
          var n2 = Object.getOwnPropertyDescriptor(e2, r2);
          Object.defineProperty(t2, r2, n2.get ? n2 : { enumerable: true, get: function() {
            return e2[r2];
          } });
        }
      }), t2.default = e2, t2;
    }
    var t = e(require_leaflet_src());
    function r() {
      return r = Object.assign ? Object.assign.bind() : function(e2) {
        for (var t2 = 1; t2 < arguments.length; t2++) {
          var r2 = arguments[t2];
          for (var n2 in r2)
            Object.prototype.hasOwnProperty.call(r2, n2) && (e2[n2] = r2[n2]);
        }
        return e2;
      }, r.apply(this, arguments);
    }
    function n(e2, t2) {
      e2.prototype = Object.create(t2.prototype), e2.prototype.constructor = e2, o(e2, t2);
    }
    function o(e2, t2) {
      return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t3) {
        return e3.__proto__ = t3, e3;
      }, o(e2, t2);
    }
    function i() {
      if ("undefined" == typeof Reflect || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if ("function" == typeof Proxy)
        return true;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        })), true;
      } catch (e2) {
        return false;
      }
    }
    function s(e2, t2, r2) {
      return s = i() ? Reflect.construct.bind() : function(e3, t3, r3) {
        var n2 = [null];
        n2.push.apply(n2, t3);
        var i2 = new (Function.bind.apply(e3, n2))();
        return r3 && o(i2, r3.prototype), i2;
      }, s.apply(null, arguments);
    }
    function a(e2, t2, r2, n2) {
      void 0 === t2 && (t2 = ""), void 0 === n2 && (n2 = {});
      var o2 = document.createElement(e2);
      return t2 && (o2.className = t2), Object.keys(n2).forEach(function(e3) {
        if ("function" == typeof n2[e3]) {
          var t3 = 0 === e3.indexOf("on") ? e3.substr(2).toLowerCase() : e3;
          o2.addEventListener(t3, n2[e3]);
        } else
          "html" === e3 ? o2.innerHTML = n2[e3] : "text" === e3 ? o2.innerText = n2[e3] : o2.setAttribute(e3, n2[e3]);
      }), r2 && r2.appendChild(o2), o2;
    }
    function l(e2) {
      e2.preventDefault(), e2.stopPropagation();
    }
    var c = function() {
      return [].slice.call(arguments).filter(Boolean).join(" ").trim();
    };
    function u(e2, t2) {
      e2 && e2.classList && (Array.isArray(t2) ? t2 : [t2]).forEach(function(t3) {
        e2.classList.contains(t3) || e2.classList.add(t3);
      });
    }
    function h(e2, t2) {
      e2 && e2.classList && (Array.isArray(t2) ? t2 : [t2]).forEach(function(t3) {
        e2.classList.contains(t3) && e2.classList.remove(t3);
      });
    }
    var p;
    var d = 13;
    var f = 40;
    var v = 38;
    var m = [d, 27, f, v, 37, 39];
    var g = function() {
      function e2(e3) {
        var t3 = this, r2 = e3.handleSubmit, n2 = e3.searchLabel, o2 = e3.classNames, i2 = void 0 === o2 ? {} : o2;
        this.container = void 0, this.form = void 0, this.input = void 0, this.handleSubmit = void 0, this.hasError = false, this.container = a("div", c("geosearch", i2.container)), this.form = a("form", ["", i2.form].join(" "), this.container, { autocomplete: "none", onClick: l, onDblClick: l, touchStart: l, touchEnd: l }), this.input = a("input", ["glass", i2.input].join(" "), this.form, { type: "text", placeholder: n2 || "search", onInput: this.onInput, onKeyUp: function(e4) {
          return t3.onKeyUp(e4);
        }, onKeyPress: function(e4) {
          return t3.onKeyPress(e4);
        }, onFocus: this.onFocus, onBlur: this.onBlur, onClick: function() {
          t3.input.focus(), t3.input.dispatchEvent(new Event("focus"));
        } }), this.handleSubmit = r2;
      }
      var t2 = e2.prototype;
      return t2.onFocus = function() {
        u(this.form, "active");
      }, t2.onBlur = function() {
        h(this.form, "active");
      }, t2.onSubmit = function(e3) {
        try {
          var t3 = this;
          return l(e3), h(r2 = t3.container, "error"), u(r2, "pending"), Promise.resolve(t3.handleSubmit({ query: t3.input.value })).then(function() {
            h(t3.container, "pending");
          });
        } catch (e4) {
          return Promise.reject(e4);
        }
        var r2;
      }, t2.onInput = function() {
        this.hasError && (h(this.container, "error"), this.hasError = false);
      }, t2.onKeyUp = function(e3) {
        27 === e3.keyCode && (h(this.container, ["pending", "active"]), this.input.value = "", document.body.focus(), document.body.blur());
      }, t2.onKeyPress = function(e3) {
        e3.keyCode === d && this.onSubmit(e3);
      }, t2.setQuery = function(e3) {
        this.input.value = e3;
      }, e2;
    }();
    var y = function() {
      function e2(e3) {
        var t3 = this, r2 = e3.handleClick, n2 = e3.classNames, o2 = void 0 === n2 ? {} : n2, i2 = e3.notFoundMessage;
        this.handleClick = void 0, this.selected = -1, this.results = [], this.container = void 0, this.resultItem = void 0, this.notFoundMessage = void 0, this.onClick = function(e4) {
          if ("function" == typeof t3.handleClick) {
            var r3 = e4.target;
            if (r3 && t3.container.contains(r3) && r3.hasAttribute("data-key")) {
              var n3 = Number(r3.getAttribute("data-key"));
              t3.handleClick({ result: t3.results[n3] });
            }
          }
        }, this.handleClick = r2, this.notFoundMessage = i2 ? a("div", c(o2.notfound), void 0, { html: i2 }) : void 0, this.container = a("div", c("results", o2.resultlist)), this.container.addEventListener("click", this.onClick, true), this.resultItem = a("div", c(o2.item));
      }
      var t2 = e2.prototype;
      return t2.render = function(e3, t3) {
        var r2 = this;
        void 0 === e3 && (e3 = []), this.clear(), e3.forEach(function(e4, n2) {
          var o2 = r2.resultItem.cloneNode(true);
          o2.setAttribute("data-key", "" + n2), o2.innerHTML = t3({ result: e4 }), r2.container.appendChild(o2);
        }), e3.length > 0 ? (u(this.container.parentElement, "open"), u(this.container, "active")) : this.notFoundMessage && (this.container.appendChild(this.notFoundMessage), u(this.container.parentElement, "open")), this.results = e3;
      }, t2.select = function(e3) {
        return Array.from(this.container.children).forEach(function(t3, r2) {
          return r2 === e3 ? u(t3, "active") : h(t3, "active");
        }), this.selected = e3, this.results[e3];
      }, t2.count = function() {
        return this.results ? this.results.length : 0;
      }, t2.clear = function() {
        for (this.selected = -1; this.container.lastChild; )
          this.container.removeChild(this.container.lastChild);
        h(this.container.parentElement, "open"), h(this.container, "active");
      }, e2;
    }();
    var b = { position: "topleft", style: "button", showMarker: true, showPopup: false, popupFormat: function(e2) {
      return "" + e2.result.label;
    }, resultFormat: function(e2) {
      return "" + e2.result.label;
    }, marker: { icon: t && t.Icon ? new t.Icon.Default() : void 0, draggable: false }, maxMarkers: 1, maxSuggestions: 5, retainZoomLevel: false, animateZoom: true, searchLabel: "Enter address", clearSearchLabel: "Clear search", notFoundMessage: "", messageHideDelay: 3e3, zoomLevel: 18, classNames: { container: "leaflet-bar leaflet-control leaflet-control-geosearch", button: "leaflet-bar-part leaflet-bar-part-single", resetButton: "reset", msgbox: "leaflet-bar message", form: "", input: "", resultlist: "", item: "", notfound: "leaflet-bar-notfound" }, autoComplete: true, autoCompleteDelay: 250, autoClose: false, keepResult: false, updateMap: true };
    var E = "Leaflet must be loaded before instantiating the GeoSearch control";
    var x = { options: r({}, b), classNames: r({}, b.classNames), initialize: function(e2) {
      var n2, o2, i2, s2, l2 = this;
      if (!t)
        throw new Error(E);
      if (!e2.provider)
        throw new Error("Provider is missing from options");
      this.options = r({}, b, e2), this.classNames = r({}, this.classNames, e2.classNames), this.markers = new t.FeatureGroup(), this.classNames.container += " leaflet-geosearch-" + this.options.style, this.searchElement = new g({ searchLabel: this.options.searchLabel, classNames: { container: this.classNames.container, form: this.classNames.form, input: this.classNames.input }, handleSubmit: function(e3) {
        return l2.onSubmit(e3);
      } }), this.button = a("a", this.classNames.button, this.searchElement.container, { title: this.options.searchLabel, href: "#", onClick: function(e3) {
        return l2.onClick(e3);
      } }), t.DomEvent.disableClickPropagation(this.button), this.resetButton = a("button", this.classNames.resetButton, this.searchElement.form, { text: "×", "aria-label": this.options.clearSearchLabel, onClick: function() {
        "" === l2.searchElement.input.value ? l2.close() : l2.clearResults(null, true);
      } }), t.DomEvent.disableClickPropagation(this.resetButton), this.options.autoComplete && (this.resultList = new y({ handleClick: function(e3) {
        var t2 = e3.result;
        l2.searchElement.input.value = t2.label, l2.onSubmit({ query: t2.label, data: t2 });
      }, classNames: { resultlist: this.classNames.resultlist, item: this.classNames.item, notfound: this.classNames.notfound }, notFoundMessage: this.options.notFoundMessage }), this.searchElement.form.appendChild(this.resultList.container), this.searchElement.input.addEventListener("keyup", (n2 = function(e3) {
        return l2.autoSearch(e3);
      }, void 0 === (o2 = this.options.autoCompleteDelay) && (o2 = 250), void 0 === i2 && (i2 = false), function() {
        var e3 = [].slice.call(arguments);
        s2 && clearTimeout(s2), s2 = setTimeout(function() {
          s2 = null, i2 || n2.apply(void 0, e3);
        }, o2), i2 && !s2 && n2.apply(void 0, e3);
      }), true), this.searchElement.input.addEventListener("keydown", function(e3) {
        return l2.selectResult(e3);
      }, true), this.searchElement.input.addEventListener("keydown", function(e3) {
        return l2.clearResults(e3, true);
      }, true)), this.searchElement.form.addEventListener("click", function(e3) {
        e3.preventDefault();
      }, false);
    }, onAdd: function(e2) {
      var r2 = this.options, n2 = r2.showMarker, o2 = r2.style;
      if (this.map = e2, n2 && this.markers.addTo(e2), "bar" === o2) {
        var i2 = e2.getContainer().querySelector(".leaflet-control-container");
        this.container = a("div", "leaflet-control-geosearch leaflet-geosearch-bar"), this.container.appendChild(this.searchElement.form), i2.appendChild(this.container);
      }
      return t.DomEvent.disableClickPropagation(this.searchElement.form), this.searchElement.container;
    }, onRemove: function() {
      var e2;
      return null == (e2 = this.container) || e2.remove(), this;
    }, open: function() {
      var e2 = this.searchElement, t2 = e2.input;
      u(e2.container, "active"), t2.focus();
    }, close: function() {
      h(this.searchElement.container, "active"), this.clearResults();
    }, onClick: function(e2) {
      e2.preventDefault(), e2.stopPropagation(), this.searchElement.container.classList.contains("active") ? this.close() : this.open();
    }, selectResult: function(e2) {
      if (-1 !== [d, f, v].indexOf(e2.keyCode))
        if (e2.preventDefault(), e2.keyCode !== d) {
          var t2 = this.resultList.count() - 1;
          if (!(t2 < 0)) {
            var r2 = this.resultList.selected, n2 = e2.keyCode === f ? r2 + 1 : r2 - 1, o2 = this.resultList.select(n2 < 0 ? t2 : n2 > t2 ? 0 : n2);
            this.searchElement.input.value = o2.label;
          }
        } else {
          var i2 = this.resultList.select(this.resultList.selected);
          this.onSubmit({ query: this.searchElement.input.value, data: i2 });
        }
    }, clearResults: function(e2, t2) {
      if (void 0 === t2 && (t2 = false), !e2 || 27 === e2.keyCode) {
        var r2 = this.options, n2 = r2.autoComplete;
        !t2 && r2.keepResult || (this.searchElement.input.value = "", this.markers.clearLayers()), n2 && this.resultList.clear();
      }
    }, autoSearch: function(e2) {
      try {
        var t2 = this;
        if (m.indexOf(e2.keyCode) > -1)
          return Promise.resolve();
        var r2 = e2.target.value, n2 = t2.options.provider, o2 = function() {
          if (r2.length)
            return Promise.resolve(n2.search({ query: r2 })).then(function(e3) {
              e3 = e3.slice(0, t2.options.maxSuggestions), t2.resultList.render(e3, t2.options.resultFormat);
            });
          t2.resultList.clear();
        }();
        return Promise.resolve(o2 && o2.then ? o2.then(function() {
        }) : void 0);
      } catch (e3) {
        return Promise.reject(e3);
      }
    }, onSubmit: function(e2) {
      try {
        var t2 = this;
        return t2.resultList.clear(), Promise.resolve(t2.options.provider.search(e2)).then(function(r2) {
          r2 && r2.length > 0 && t2.showResult(r2[0], e2);
        });
      } catch (e3) {
        return Promise.reject(e3);
      }
    }, showResult: function(e2, t2) {
      var r2 = this.options, n2 = r2.autoClose, o2 = r2.updateMap, i2 = this.markers.getLayers();
      i2.length >= this.options.maxMarkers && this.markers.removeLayer(i2[0]);
      var s2 = this.addMarker(e2, t2);
      o2 && this.centerMap(e2), this.map.fireEvent("geosearch/showlocation", { location: e2, marker: s2 }), n2 && this.closeResults();
    }, closeResults: function() {
      var e2 = this.searchElement.container;
      e2.classList.contains("active") && h(e2, "active"), this.clearResults();
    }, addMarker: function(e2, r2) {
      var n2 = this, o2 = this.options, i2 = o2.marker, s2 = o2.showPopup, a2 = o2.popupFormat, l2 = new t.Marker([e2.y, e2.x], i2), c2 = e2.label;
      return "function" == typeof a2 && (c2 = a2({ query: r2, result: e2 })), l2.bindPopup(c2), this.markers.addLayer(l2), s2 && l2.openPopup(), i2.draggable && l2.on("dragend", function(e3) {
        n2.map.fireEvent("geosearch/marker/dragend", { location: l2.getLatLng(), event: e3 });
      }), l2;
    }, centerMap: function(e2) {
      var r2 = this.options, n2 = r2.retainZoomLevel, o2 = r2.animateZoom, i2 = e2.bounds ? new t.LatLngBounds(e2.bounds) : new t.LatLng(e2.y, e2.x).toBounds(10), s2 = i2.isValid() ? i2 : this.markers.getBounds();
      !n2 && i2.isValid() && !e2.bounds || n2 || !i2.isValid() ? this.map.setView(s2.getCenter(), this.getZoom(), { animate: o2 }) : this.map.fitBounds(s2, { animate: o2 });
    }, getZoom: function() {
      var e2 = this.options, t2 = e2.zoomLevel;
      return e2.retainZoomLevel ? this.map.getZoom() : t2;
    } };
    function w() {
      if (!t)
        throw new Error(E);
      var e2 = t.Control.extend(x);
      return s(e2, [].slice.call(arguments));
    }
    !function(e2) {
      e2[e2.SEARCH = 0] = "SEARCH", e2[e2.REVERSE = 1] = "REVERSE";
    }(p || (p = {}));
    var k;
    var L = function() {
      function e2(e3) {
        void 0 === e3 && (e3 = {}), this.options = void 0, this.options = e3;
      }
      var t2 = e2.prototype;
      return t2.getParamString = function(e3) {
        void 0 === e3 && (e3 = {});
        var t3 = r({}, this.options.params, e3);
        return Object.keys(t3).map(function(e4) {
          return encodeURIComponent(e4) + "=" + encodeURIComponent(t3[e4]);
        }).join("&");
      }, t2.getUrl = function(e3, t3) {
        return e3 + "?" + this.getParamString(t3);
      }, t2.search = function(e3) {
        try {
          var t3 = this, r2 = t3.endpoint({ query: e3.query, type: p.SEARCH });
          return Promise.resolve(fetch(r2)).then(function(e4) {
            return Promise.resolve(e4.json()).then(function(e5) {
              return t3.parse({ data: e5 });
            });
          });
        } catch (e4) {
          return Promise.reject(e4);
        }
      }, e2;
    }();
    var C = function(e2) {
      function t2() {
        return e2.apply(this, arguments) || this;
      }
      n(t2, e2);
      var o2 = t2.prototype;
      return o2.endpoint = function() {
        return "https://places-dsn.algolia.net/1/places/query";
      }, o2.findBestMatchLevelIndex = function(e3) {
        var t3 = e3.find(function(e4) {
          return "full" === e4.matchLevel;
        }) || e3.find(function(e4) {
          return "partial" === e4.matchLevel;
        });
        return t3 ? e3.indexOf(t3) : 0;
      }, o2.getLabel = function(e3) {
        var t3, r2, n2, o3;
        return [null == (t3 = e3.locale_names) ? void 0 : t3.default[this.findBestMatchLevelIndex(e3._highlightResult.locale_names.default)], null == (r2 = e3.city) ? void 0 : r2.default[this.findBestMatchLevelIndex(e3._highlightResult.city.default)], e3.administrative[this.findBestMatchLevelIndex(e3._highlightResult.administrative)], null == (n2 = e3.postcode) ? void 0 : n2[this.findBestMatchLevelIndex(e3._highlightResult.postcode)], null == (o3 = e3.country) ? void 0 : o3.default].filter(Boolean).join(", ");
      }, o2.parse = function(e3) {
        var t3 = this;
        return e3.data.hits.map(function(e4) {
          return { x: e4._geoloc.lng, y: e4._geoloc.lat, label: t3.getLabel(e4), bounds: null, raw: e4 };
        });
      }, o2.search = function(e3) {
        var t3 = e3.query;
        try {
          var n2 = this, o3 = "string" == typeof t3 ? { query: t3 } : t3;
          return Promise.resolve(fetch(n2.endpoint(), { method: "POST", body: JSON.stringify(r({}, n2.options.params, o3)) })).then(function(e4) {
            return Promise.resolve(e4.json()).then(function(e5) {
              return n2.parse({ data: e5 });
            });
          });
        } catch (e4) {
          return Promise.reject(e4);
        }
      }, t2;
    }(L);
    var U = function(e2) {
      function t2() {
        for (var t3, r3 = arguments.length, n2 = new Array(r3), o2 = 0; o2 < r3; o2++)
          n2[o2] = arguments[o2];
        return (t3 = e2.call.apply(e2, [this].concat(n2)) || this).searchUrl = "https://dev.virtualearth.net/REST/v1/Locations", t3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query, r3 = "string" == typeof t3 ? { q: t3 } : t3;
        return r3.jsonp = e3.jsonp, this.getUrl(this.searchUrl, r3);
      }, r2.parse = function(e3) {
        return 0 === e3.data.resourceSets.length ? [] : e3.data.resourceSets[0].resources.map(function(e4) {
          return { x: e4.point.coordinates[1], y: e4.point.coordinates[0], label: e4.address.formattedAddress, bounds: [[e4.bbox[0], e4.bbox[1]], [e4.bbox[2], e4.bbox[3]]], raw: e4 };
        });
      }, r2.search = function(e3) {
        var t3, r3, n2, o2 = e3.query;
        try {
          var i2 = this, s2 = "BING_JSONP_CB_" + Date.now();
          return Promise.resolve((t3 = i2.endpoint({ query: o2, jsonp: s2 }), r3 = s2, n2 = a("script", null, document.body), n2.setAttribute("type", "text/javascript"), new Promise(function(e4) {
            window[r3] = function(t4) {
              n2.remove(), delete window[r3], e4(t4);
            }, n2.setAttribute("src", t3);
          }))).then(function(e4) {
            return i2.parse({ data: e4 });
          });
        } catch (e4) {
          return Promise.reject(e4);
        }
      }, t2;
    }(L);
    var P = function(e2) {
      function t2() {
        for (var t3, r3 = arguments.length, n2 = new Array(r3), o2 = 0; o2 < r3; o2++)
          n2[o2] = arguments[o2];
        return (t3 = e2.call.apply(e2, [this].concat(n2)) || this).searchUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find", t3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query, r3 = "string" == typeof t3 ? { text: t3 } : t3;
        return r3.f = "json", this.getUrl(this.searchUrl, r3);
      }, r2.parse = function(e3) {
        return e3.data.locations.map(function(e4) {
          return { x: e4.feature.geometry.x, y: e4.feature.geometry.y, label: e4.name, bounds: [[e4.extent.ymin, e4.extent.xmin], [e4.extent.ymax, e4.extent.xmax]], raw: e4 };
        });
      }, t2;
    }(L);
    var S = function(e2) {
      function t2(t3) {
        var r3;
        return void 0 === t3 && (t3 = {}), (r3 = e2.call(this, t3) || this).host = void 0, r3.host = t3.host || "http://localhost:4000", r3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query;
        return e3.type === p.REVERSE ? this.getUrl(this.host + "/v1/reverse", "string" == typeof t3 ? {} : t3) : this.getUrl(this.host + "/v1/autocomplete", "string" == typeof t3 ? { text: t3 } : t3);
      }, r2.parse = function(e3) {
        return e3.data.features.map(function(e4) {
          var t3 = { x: e4.geometry.coordinates[0], y: e4.geometry.coordinates[1], label: e4.properties.label, bounds: null, raw: e4 };
          return Array.isArray(e4.bbox) && 4 === e4.bbox.length && (t3.bounds = [[e4.bbox[1], e4.bbox[0]], [e4.bbox[3], e4.bbox[2]]]), t3;
        });
      }, t2;
    }(L);
    var R = function(e2) {
      function t2(t3) {
        return void 0 === t3 && (t3 = {}), t3.host = "https://api.geocode.earth", e2.call(this, t3) || this;
      }
      return n(t2, e2), t2;
    }(S);
    var j = function e2(t2, r2) {
      if (t2 === r2)
        return true;
      if (t2 && r2 && "object" == typeof t2 && "object" == typeof r2) {
        if (t2.constructor !== r2.constructor)
          return false;
        var n2, o2, i2;
        if (Array.isArray(t2)) {
          if ((n2 = t2.length) != r2.length)
            return false;
          for (o2 = n2; 0 != o2--; )
            if (!e2(t2[o2], r2[o2]))
              return false;
          return true;
        }
        if (t2.constructor === RegExp)
          return t2.source === r2.source && t2.flags === r2.flags;
        if (t2.valueOf !== Object.prototype.valueOf)
          return t2.valueOf() === r2.valueOf();
        if (t2.toString !== Object.prototype.toString)
          return t2.toString() === r2.toString();
        if ((n2 = (i2 = Object.keys(t2)).length) !== Object.keys(r2).length)
          return false;
        for (o2 = n2; 0 != o2--; )
          if (!Object.prototype.hasOwnProperty.call(r2, i2[o2]))
            return false;
        for (o2 = n2; 0 != o2--; ) {
          var s2 = i2[o2];
          if (!e2(t2[s2], r2[s2]))
            return false;
        }
        return true;
      }
      return t2 != t2 && r2 != r2;
    };
    !function(e2) {
      e2[e2.INITIALIZED = 0] = "INITIALIZED", e2[e2.LOADING = 1] = "LOADING", e2[e2.SUCCESS = 2] = "SUCCESS", e2[e2.FAILURE = 3] = "FAILURE";
    }(k || (k = {}));
    var A = class _A {
      constructor({ apiKey: e2, authReferrerPolicy: t2, channel: r2, client: n2, id: o2 = "__googleMapsScriptId", language: i2, libraries: s2 = [], mapIds: a2, nonce: l2, region: c2, retries: u2 = 3, url: h2 = "https://maps.googleapis.com/maps/api/js", version: p2 }) {
        if (this.CALLBACK = "__googleMapsCallback", this.callbacks = [], this.done = false, this.loading = false, this.errors = [], this.apiKey = e2, this.authReferrerPolicy = t2, this.channel = r2, this.client = n2, this.id = o2 || "__googleMapsScriptId", this.language = i2, this.libraries = s2, this.mapIds = a2, this.nonce = l2, this.region = c2, this.retries = u2, this.url = h2, this.version = p2, _A.instance) {
          if (!j(this.options, _A.instance.options))
            throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(_A.instance.options)}`);
          return _A.instance;
        }
        _A.instance = this;
      }
      get options() {
        return { version: this.version, apiKey: this.apiKey, channel: this.channel, client: this.client, id: this.id, libraries: this.libraries, language: this.language, region: this.region, mapIds: this.mapIds, nonce: this.nonce, url: this.url, authReferrerPolicy: this.authReferrerPolicy };
      }
      get status() {
        return this.errors.length ? k.FAILURE : this.done ? k.SUCCESS : this.loading ? k.LOADING : k.INITIALIZED;
      }
      get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
      }
      createUrl() {
        let e2 = this.url;
        return e2 += `?callback=${this.CALLBACK}`, this.apiKey && (e2 += `&key=${this.apiKey}`), this.channel && (e2 += `&channel=${this.channel}`), this.client && (e2 += `&client=${this.client}`), this.libraries.length > 0 && (e2 += `&libraries=${this.libraries.join(",")}`), this.language && (e2 += `&language=${this.language}`), this.region && (e2 += `&region=${this.region}`), this.version && (e2 += `&v=${this.version}`), this.mapIds && (e2 += `&map_ids=${this.mapIds.join(",")}`), this.authReferrerPolicy && (e2 += `&auth_referrer_policy=${this.authReferrerPolicy}`), e2;
      }
      deleteScript() {
        const e2 = document.getElementById(this.id);
        e2 && e2.remove();
      }
      load() {
        return this.loadPromise();
      }
      loadPromise() {
        return new Promise((e2, t2) => {
          this.loadCallback((r2) => {
            r2 ? t2(r2.error) : e2(window.google);
          });
        });
      }
      loadCallback(e2) {
        this.callbacks.push(e2), this.execute();
      }
      setScript() {
        if (document.getElementById(this.id))
          return void this.callback();
        const e2 = this.createUrl(), t2 = document.createElement("script");
        t2.id = this.id, t2.type = "text/javascript", t2.src = e2, t2.onerror = this.loadErrorCallback.bind(this), t2.defer = true, t2.async = true, this.nonce && (t2.nonce = this.nonce), document.head.appendChild(t2);
      }
      reset() {
        this.deleteScript(), this.done = false, this.loading = false, this.errors = [], this.onerrorEvent = null;
      }
      resetIfRetryingFailed() {
        this.failed && this.reset();
      }
      loadErrorCallback(e2) {
        if (this.errors.push(e2), this.errors.length <= this.retries) {
          const e3 = this.errors.length * Math.pow(2, this.errors.length);
          console.log(`Failed to load Google Maps script, retrying in ${e3} ms.`), setTimeout(() => {
            this.deleteScript(), this.setScript();
          }, e3);
        } else
          this.onerrorEvent = e2, this.callback();
      }
      setCallback() {
        window.__googleMapsCallback = this.callback.bind(this);
      }
      callback() {
        this.done = true, this.loading = false, this.callbacks.forEach((e2) => {
          e2(this.onerrorEvent);
        }), this.callbacks = [];
      }
      execute() {
        if (this.resetIfRetryingFailed(), this.done)
          this.callback();
        else {
          if (window.google && window.google.maps && window.google.maps.version)
            return console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."), void this.callback();
          this.loading || (this.loading = true, this.setCallback(), this.setScript());
        }
      }
    };
    var I = function(e2) {
      function t2(t3) {
        var r3;
        return (r3 = e2.call(this, t3) || this).loader = null, r3.geocoder = null, "undefined" != typeof window && (r3.loader = new A(t3).load().then(function(e3) {
          var t4 = new e3.maps.Geocoder();
          return r3.geocoder = t4, t4;
        })), r3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        throw new Error("Method not implemented.");
      }, r2.parse = function(e3) {
        return e3.data.results.map(function(e4) {
          var t3 = e4.geometry.location.toJSON(), r3 = t3.lat, n2 = t3.lng, o2 = e4.geometry.viewport.toJSON();
          return { x: n2, y: r3, label: e4.formatted_address, bounds: [[o2.south, o2.west], [o2.north, o2.east]], raw: e4 };
        });
      }, r2.search = function(e3) {
        try {
          var t3 = function(t4) {
            if (!t4)
              throw new Error("GoogleMaps GeoCoder is not loaded. Are you trying to run this server side?");
            return Promise.resolve(t4.geocode({ address: e3.query }, function(e4) {
              return { results: e4 };
            }).catch(function(e4) {
              return "ZERO_RESULTS" !== e4.code && console.error(e4.code + ": " + e4.message), { results: [] };
            })).then(function(e4) {
              return r3.parse({ data: e4 });
            });
          }, r3 = this, n2 = r3.geocoder;
          return Promise.resolve(n2 ? t3(n2) : Promise.resolve(r3.loader).then(t3));
        } catch (e4) {
          return Promise.reject(e4);
        }
      }, t2;
    }(L);
    var O = function(e2) {
      function t2() {
        for (var t3, r3 = arguments.length, n2 = new Array(r3), o2 = 0; o2 < r3; o2++)
          n2[o2] = arguments[o2];
        return (t3 = e2.call.apply(e2, [this].concat(n2)) || this).searchUrl = "https://maps.googleapis.com/maps/api/geocode/json", t3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query;
        return this.getUrl(this.searchUrl, "string" == typeof t3 ? { address: t3 } : t3);
      }, r2.parse = function(e3) {
        return e3.data.results.map(function(e4) {
          return { x: e4.geometry.location.lng, y: e4.geometry.location.lat, label: e4.formatted_address, bounds: [[e4.geometry.viewport.southwest.lat, e4.geometry.viewport.southwest.lng], [e4.geometry.viewport.northeast.lat, e4.geometry.viewport.northeast.lng]], raw: e4 };
        });
      }, t2;
    }(L);
    var N = function(e2) {
      function t2() {
        for (var t3, r3 = arguments.length, n2 = new Array(r3), o2 = 0; o2 < r3; o2++)
          n2[o2] = arguments[o2];
        return (t3 = e2.call.apply(e2, [this].concat(n2)) || this).searchUrl = "https://geocode.search.hereapi.com/v1/autosuggest", t3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query;
        return this.getUrl(this.searchUrl, "string" == typeof t3 ? { q: t3 } : t3);
      }, r2.parse = function(e3) {
        return e3.data.items.filter(function(e4) {
          return void 0 !== e4.position;
        }).map(function(e4) {
          return { x: e4.position.lng, y: e4.position.lat, label: e4.address.label, bounds: null, raw: e4 };
        });
      }, t2;
    }(L);
    var F = function(e2) {
      function t2(t3) {
        var r3;
        void 0 === t3 && (t3 = {}), (r3 = e2.call(this, t3) || this).searchUrl = void 0, r3.reverseUrl = void 0;
        var n2 = "https://nominatim.openstreetmap.org";
        return r3.searchUrl = t3.searchUrl || n2 + "/search", r3.reverseUrl = t3.reverseUrl || n2 + "/reverse", r3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query, r3 = e3.type, n2 = "string" == typeof t3 ? { q: t3 } : t3;
        return n2.format = "json", this.getUrl(r3 === p.REVERSE ? this.reverseUrl : this.searchUrl, n2);
      }, r2.parse = function(e3) {
        return (Array.isArray(e3.data) ? e3.data : [e3.data]).map(function(e4) {
          return { x: Number(e4.lon), y: Number(e4.lat), label: e4.display_name, bounds: [[parseFloat(e4.boundingbox[0]), parseFloat(e4.boundingbox[2])], [parseFloat(e4.boundingbox[1]), parseFloat(e4.boundingbox[3])]], raw: e4 };
        });
      }, t2;
    }(L);
    var M = function(e2) {
      function t2(t3) {
        return e2.call(this, r({}, t3, { searchUrl: "https://locationiq.org/v1/search.php", reverseUrl: "https://locationiq.org/v1/reverse.php" })) || this;
      }
      return n(t2, e2), t2.prototype.parse = function(t3) {
        return t3.data.error ? [] : e2.prototype.parse.call(this, t3);
      }, t2;
    }(F);
    var q = function(e2) {
      function t2() {
        for (var t3, r3 = arguments.length, n2 = new Array(r3), o2 = 0; o2 < r3; o2++)
          n2[o2] = arguments[o2];
        return (t3 = e2.call.apply(e2, [this].concat(n2)) || this).searchUrl = "https://api.opencagedata.com/geocode/v1/json", t3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query, r3 = "string" == typeof t3 ? { q: t3 } : t3;
        return r3.format = "json", this.getUrl(this.searchUrl, r3);
      }, r2.parse = function(e3) {
        return e3.data.results.map(function(e4) {
          return { x: e4.geometry.lng, y: e4.geometry.lat, label: e4.formatted, bounds: [[e4.bounds.southwest.lat, e4.bounds.southwest.lng], [e4.bounds.northeast.lat, e4.bounds.northeast.lng]], raw: e4 };
        });
      }, r2.search = function(t3) {
        try {
          return Promise.resolve(t3.query.length < 2 ? [] : e2.prototype.search.call(this, t3));
        } catch (e3) {
          return Promise.reject(e3);
        }
      }, t2;
    }(L);
    var _ = function(e2) {
      function t2(t3) {
        var r3;
        void 0 === t3 && (t3 = {}), (r3 = e2.call(this, t3) || this).searchUrl = void 0, r3.reverseUrl = void 0;
        var n2 = "https://civildefense.fit.vutbr.cz";
        return r3.searchUrl = t3.searchUrl || n2 + "/search", r3.reverseUrl = t3.reverseUrl || n2 + "/reverse", r3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query, r3 = e3.type, n2 = "string" == typeof t3 ? { q: t3 } : t3;
        return n2.format = "json", this.getUrl(r3 === p.REVERSE ? this.reverseUrl : this.searchUrl, n2);
      }, r2.parse = function(e3) {
        return (Array.isArray(e3.data) ? e3.data : [e3.data]).map(function(e4) {
          return { x: Number(e4.lon), y: Number(e4.lat), label: e4.display_name, bounds: [[parseFloat(e4.boundingbox[0]), parseFloat(e4.boundingbox[2])], [parseFloat(e4.boundingbox[1]), parseFloat(e4.boundingbox[3])]], raw: e4 };
        });
      }, t2;
    }(L);
    var B = function(e2) {
      function t2(t3) {
        var r3;
        return void 0 === t3 && (t3 = {}), (r3 = e2.call(this, t3) || this).searchUrl = void 0, r3.searchUrl = t3.searchUrl || "https://a.tiles.mapbox.com/v4/geocode/mapbox.places/", r3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        return this.getUrl("" + this.searchUrl + e3.query + ".json");
      }, r2.parse = function(e3) {
        return (Array.isArray(e3.data.features) ? e3.data.features : []).map(function(e4) {
          var t3 = null;
          return e4.bbox && (t3 = [[parseFloat(e4.bbox[1]), parseFloat(e4.bbox[0])], [parseFloat(e4.bbox[3]), parseFloat(e4.bbox[2])]]), { x: Number(e4.center[0]), y: Number(e4.center[1]), label: e4.place_name ? e4.place_name : e4.text, bounds: t3, raw: e4 };
        });
      }, t2;
    }(L);
    var D = function(e2) {
      function t2(t3) {
        var r3;
        void 0 === t3 && (t3 = {}), (r3 = e2.call(this, t3) || this).searchUrl = void 0, r3.reverseUrl = void 0;
        var n2 = "https://api-adresse.data.gouv.fr";
        return r3.searchUrl = t3.searchUrl || n2 + "/search", r3.reverseUrl = t3.reverseUrl || n2 + "/reverse", r3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query;
        return this.getUrl(e3.type === p.REVERSE ? this.reverseUrl : this.searchUrl, "string" == typeof t3 ? { q: t3 } : t3);
      }, r2.parse = function(e3) {
        return e3.data.features.map(function(e4) {
          return { x: e4.geometry.coordinates[0], y: e4.geometry.coordinates[1], label: e4.properties.label, bounds: null, raw: e4 };
        });
      }, t2;
    }(L);
    var G = function(e2) {
      function t2(t3) {
        var r3;
        void 0 === t3 && (t3 = {}), (r3 = e2.call(this, t3) || this).searchUrl = void 0, r3.reverseUrl = void 0;
        var n2 = "https://api.geoapify.com/v1/geocode";
        return r3.searchUrl = t3.searchUrl || n2 + "/search", r3.reverseUrl = t3.reverseUrl || n2 + "/reverse", r3;
      }
      n(t2, e2);
      var r2 = t2.prototype;
      return r2.endpoint = function(e3) {
        var t3 = e3.query, r3 = e3.type, n2 = "string" == typeof t3 ? { text: t3 } : t3;
        return n2.format = "json", this.getUrl(r3 === p.REVERSE ? this.reverseUrl : this.searchUrl, n2);
      }, r2.parse = function(e3) {
        return (Array.isArray(e3.data.results) ? e3.data.results : [e3.data.results]).map(function(e4) {
          return { x: Number(e4.lon), y: Number(e4.lat), label: e4.formatted, bounds: [[parseFloat(e4.bbox.lat1), parseFloat(e4.bbox.lon1)], [parseFloat(e4.bbox.lat2), parseFloat(e4.bbox.lon2)]], raw: e4 };
        });
      }, t2;
    }(L);
    exports.AlgoliaProvider = C, exports.BingProvider = U, exports.CivilDefenseMapProvider = _, exports.EsriProvider = P, exports.GeoApiFrProvider = D, exports.GeoSearchControl = w, exports.GeoapifyProvider = G, exports.GeocodeEarthProvider = R, exports.GoogleProvider = I, exports.HereProvider = N, exports.JsonProvider = L, exports.LegacyGoogleProvider = O, exports.LocationIQProvider = M, exports.MapBoxProvider = B, exports.OpenCageProvider = q, exports.OpenStreetMapProvider = F, exports.PeliasProvider = S, exports.SearchControl = w, exports.SearchElement = g;
  }
});
export default require_geosearch();
//# sourceMappingURL=leaflet-geosearch_dist_geosearch.js.map
