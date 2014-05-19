(window.JST || (window.JST = {}))['errors'] = 
(function(data) {
  return (function() {
    var __runtime;
    __runtime = Runtime(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("div"));
    __runtime.classes("error-container");
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
(window.JST || (window.JST = {}))['todo'] = 
(function(data) {
  return (function() {
    var __runtime;
    __runtime = Runtime(this);
    __runtime.push(document.createDocumentFragment());
    __runtime.push(document.createElement("div"));
    __runtime.classes("todo-example");
    __runtime.push(document.createElement("textarea"));
    __runtime.classes("code");
    __runtime.attribute("placeholder", "TODO example template");
    __runtime.attribute("value", this.sourceTemplate);
    __runtime.pop();
    __runtime.push(document.createElement("textarea"));
    __runtime.classes("code");
    __runtime.attribute("placeholder", "TODO example JavaScript");
    __runtime.attribute("value", this.sourceCode);
    __runtime.pop();
    __runtime.push(document.createElement("div"));
    __runtime.id("todo-output");
    __runtime.pop();
    __runtime.pop();
    return __runtime.pop();
  }).call(data);
});
