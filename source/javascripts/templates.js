(window.JST || (window.JST = {}))['errors'] = 
(function(data) {
  return (function() {
    var __runtime;
    __runtime = Runtime(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("div"));
    __runtime.classes("error-container", this["class"]);
    __runtime.push(document.createElement("div"));
    __runtime.classes("template-errors");
    __runtime.text(this.templateErrors);
    __runtime.pop();
    __runtime.push(document.createElement("div"));
    __runtime.classes("code-errors");
    __runtime.text(this.codeErrors);
    __runtime.pop();
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
});
(window.JST || (window.JST = {}))['example'] = 
(function(data) {
  return (function() {
    var __runtime;
    __runtime = Runtime(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("div"));
    __runtime.classes("example", this.hideInactive);
    __runtime.push(document.createElement("h4"));
    __runtime.classes("title");
    __runtime.push(document.createElement("span"));
    __runtime.classes("icon");
    __runtime.pop();
    __runtime.push(document.createElement("span"));
    __runtime.text(this.header);
    __runtime.pop();
    __runtime.pop();
    __runtime.push(document.createElement("hr"));
    __runtime.classes("divider");
    __runtime.pop();
    __runtime.push(document.createElement("div"));
    __runtime.classes("description");
    __runtime.push(document.createElement("p"));
    __runtime.text(this.description);
    __runtime.pop();
    __runtime.pop();
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
      __runtime.push(document.createElement("iframe"));
      __runtime.classes("html");
      __runtime.attribute("src", "" + this.competitorUrl + "/embedded/html");
      __runtime.attribute("allowfullscreen", "allowfullscreen");
      __runtime.pop();
      __runtime.push(document.createElement("iframe"));
      __runtime.classes("javascript");
      __runtime.attribute("src", "" + this.competitorUrl + "/embedded/js");
      __runtime.attribute("allowfullscreen", "allowfullscreen");
      __runtime.pop();
      __runtime.pop();
      __runtime.push(document.createElement("div"));
      __runtime.classes("right-column");
      __runtime.push(document.createElement("iframe"));
      __runtime.classes("result");
      __runtime.attribute("src", "" + this.competitorUrl + "/show");
      __runtime.attribute("allowfullscreen", "allowfullscreen");
      __runtime.pop();
      __runtime.pop();
      __runtime.pop();
    }
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
});
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
      __runtime.text(this.header);
      return __runtime.pop();
    });
    __runtime.pop();
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
});
