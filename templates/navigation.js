(window.JST||(window.JST={})).navigation=function(e){return function(){var e;return e=Runtime(this),e.push(document.createDocumentFragment()),e.push(document.createElement("div")),e.classes("container"),e.push(document.createElement("h3")),e.text("How about some live examples?\n"),e.pop(),e.push(document.createElement("nav")),e.classes("menu"),e.each(this.items,function(){return e.push(document.createElement("div")),e.classes("button",this["class"]),e.attribute("click",this.activate),e.attribute("mousedown",this.loadIFrame),e.text(this.header),e.pop()}),e.pop(),e.pop(),e.pop()}.call(e)};