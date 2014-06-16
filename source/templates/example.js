(window.JST || (window.JST = {}))['example'] = 
(function(data) {
  return (function() {
    var __runtime;
    __runtime = Runtime(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("div"));
    __runtime.classes("example", this.hideInactive);
    if (this.header.length) {
      __runtime.push(document.createElement("h4"));
      __runtime.classes("title");
      __runtime.push(document.createElement("span"));
      __runtime.classes("icon");
      __runtime.pop();
      __runtime.push(document.createElement("span"));
      __runtime.text(this.header);
      __runtime.pop();
      __runtime.pop();
    }
    if (this.description.length) {
      __runtime.push(document.createElement("hr"));
      __runtime.classes("divider");
      __runtime.pop();
      __runtime.push(document.createElement("div"));
      __runtime.classes("description");
      __runtime.push(document.createElement("p"));
      __runtime.text(this.description);
      __runtime.pop();
      if (this.comparison.length) {
        __runtime.push(document.createElement("p"));
        __runtime.text(this.comparison);
        __runtime.pop();
      }
      __runtime.pop();
    }
    __runtime.push(document.createElement("div"));
    __runtime.classes("left-column");
    __runtime.push(document.createElement("div"));
    __runtime.classes("code", "template");
    __runtime.attribute("value", this.sourceTemplate);
    __runtime.pop();
    __runtime.push(document.createElement("div"));
    __runtime.classes("code", "javascript");
    __runtime.attribute("value", this.sourceCode);
    __runtime.pop();
    __runtime.pop();
    __runtime.push(document.createElement("div"));
    __runtime.classes("right-column");
    __runtime.push(document.createElement("button"));
    __runtime.classes("reset");
    __runtime.attribute("click", this.reset);
    __runtime.text("Reset this example\n");
    __runtime.pop();
    __runtime.push(document.createElement("div"));
    __runtime.classes("output");
    __runtime.pop();
    __runtime.pop();
    if (this.competitorUrl) {
      __runtime.push(document.createElement("div"));
      __runtime.classes("competing-example");
      __runtime.push(document.createElement("h3"));
      __runtime.text("Compared to\n");
      __runtime.text(this.competitorName);
      __runtime.pop();
      __runtime.push(document.createElement("div"));
      __runtime.classes("left-column");
      __runtime.push(document.createElement("div"));
      __runtime.classes("html", "scroll");
      __runtime.pop();
      __runtime.push(document.createElement("div"));
      __runtime.classes("javascript", "scroll");
      __runtime.pop();
      __runtime.pop();
      __runtime.push(document.createElement("div"));
      __runtime.classes("right-column");
      __runtime.push(document.createElement("div"));
      __runtime.classes("result", "scroll");
      __runtime.pop();
      __runtime.pop();
      __runtime.pop();
    }
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
});
