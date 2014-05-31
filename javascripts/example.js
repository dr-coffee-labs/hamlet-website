(function() {
  var Editor;

  Editor = function(I) {
    var editor, session, setEditorValue;
    if (I == null) {
      I = {};
    }
    editor = ace.edit(I.element);
    editor.setTheme("ace/theme/tomorrow");
    editor.setShowPrintMargin(false);
    editor.setHighlightActiveLine(false);
    editor.setDisplayIndentGuides(false);
    editor.renderer.setShowGutter(false);
    editor.renderer.setPadding(10);
    session = editor.session;
    session.setMode("ace/mode/" + I.mode);
    session.setTabSize(2);
    session.setUseSoftTabs(true);
    session.setUseWrapMode(false);
    session.setWrapLimitRange(null, null);
    session.setUseWorker(false);
    setEditorValue = function() {
      return I.sourceCodeObservable(editor.getValue());
    };
    editor.removeListener("change", setEditorValue);
    editor.setValue(I.sourceCodeObservable(), 1);
    editor.getSession().setUndoManager(new ace.UndoManager);
    editor.on("change", setEditorValue);
    return editor;
  };

  window.Example = function(I) {
    var build, codeEditor, compileCode, compileTemplate, compiledCode, compiledTemplate, deactivate, originalCode, originalTemplate, self, sourceCode, sourceTemplate, templateEditor;
    if (I == null) {
      I = {};
    }
    templateEditor = null;
    codeEditor = null;
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
      configureEditors: function() {
        templateEditor = Editor({
          element: $(I.selector).find(".code.template").get(0),
          mode: "haml",
          sourceCodeObservable: self.sourceTemplate
        });
        return codeEditor = Editor({
          element: $(I.selector).find(".code.javascript").get(0),
          mode: "haml",
          sourceCodeObservable: self.sourceCode
        });
      },
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
