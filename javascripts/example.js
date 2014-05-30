(function() {
  window.Example = function(I) {
    var build, compileCode, compileTemplate, compiledCode, compiledTemplate, deactivate, originalCode, originalTemplate, self, sourceCode, sourceTemplate;
    if (I == null) {
      I = {};
    }
    originalTemplate = I.template;
    originalCode = I.code;
    sourceTemplate = Observable(I.template);
    sourceCode = Observable(I.code);
    compiledCode = Observable("");
    compiledTemplate = Observable("");
    compileTemplate = function(str) {
      var e;
      try {
        compiledTemplate(HamletCompiler.compile(str, {
          runtime: "Runtime"
        }));
        return templateErrors("");
      } catch (_error) {
        e = _error;
        return templateErrors(e.message);
      }
    };
    compileCode = function(str) {
      var e;
      try {
        compiledCode(CoffeeScript.compile(str, {
          bare: true
        }));
        return codeErrors("");
      } catch (_error) {
        e = _error;
        return codeErrors(e.message);
      }
    };
    build = function() {
      var fragment, templateData, templateFn;
      templateFn = eval(compiledTemplate());
      templateData = eval(compiledCode());
      fragment = templateFn(templateData);
      return $("" + I.selector + " .output").html(fragment);
    };
    compileTemplate(sourceTemplate(), compiledTemplate);
    compileCode(sourceCode(), compiledCode);
    sourceTemplate.observe(compileTemplate);
    sourceCode.observe(compileCode);
    compiledCode.observe(build);
    compiledTemplate.observe(build);
    deactivate = function(example) {
      return example.active(false);
    };
    self = {
      active: Observable(false),
      activate: function() {
        examples.forEach(deactivate);
        return self.active(true);
      },
      build: build,
      "class": function() {
        if (self.active()) {
          return "active";
        }
      },
      competitorName: I.competitorName,
      competitorUrl: I.competitorUrl,
      description: I.description,
      header: I.header,
      hideInactive: function() {
        if (!self.active()) {
          return "hidden";
        }
      },
      selector: I.selector,
      sourceTemplate: sourceTemplate,
      sourceCode: sourceCode,
      reset: function() {
        sourceTemplate(originalTemplate);
        return sourceCode(originalCode);
      }
    };
    return self;
  };

}).call(this);
