(window.JST || (window.JST = {}))['navigation'] = 
(function(data) {
  return (function() {
    var __runtime;
    __runtime = Runtime(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("div"));
    __runtime.classes("container");
    __runtime.push(document.createElement("h3"));
    __runtime.text("How about some live examples?\n");
    __runtime.pop();
    __runtime.push(document.createElement("nav"));
    __runtime.classes("menu");
    __runtime.each(this.items, function() {
      __runtime.push(document.createElement("div"));
      __runtime.classes("button", this["class"]);
      __runtime.attribute("click", this.activate);
      __runtime.attribute("mousedown", this.loadIFrame);
      __runtime.text(this.header);
      return __runtime.pop();
    });
    __runtime.pop();
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
});
