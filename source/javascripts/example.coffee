window.Example = (I={}) ->
  templateEditor = null
  codeEditor = null

  originalTemplate = I.template
  originalCode = I.code

  sourceTemplate = Observable(I.template)
  sourceCode = Observable(I.code)

  compiledCode = Observable("")
  compiledTemplate = Observable("")

  resetEditorTemplate = (template, editor) ->
    editor.removeListener "change", setEditorTemplate

    editor.setValue(template, 1)
    editor.getSession().setUndoManager(new ace.UndoManager)

    editor.on("change", setEditorTemplate)

  setEditorTemplate = ->
    sourceTemplate(templateEditor.getValue())

  resetEditorJavascript = (javascript, editor) ->
    editor.removeListener "change", setEditorJavascript

    editor.setValue(javascript, 1)
    editor.getSession().setUndoManager(new ace.UndoManager)

    editor.on("change", setEditorJavascript)

  setEditorJavascript = ->
    sourceCode(codeEditor.getValue())

  configureEditor = (element, mode) ->
    editor = ace.edit(element)

    editor.setTheme "ace/theme/tomorrow"
    editor.setShowPrintMargin(false)
    editor.setHighlightActiveLine(false)
    editor.setDisplayIndentGuides(false)
    editor.renderer.setShowGutter(false)

    session = editor.session
    session.setMode "ace/mode/#{mode}"
    session.setTabSize(2)
    session.setUseSoftTabs(true)
    session.setUseWrapMode(false)
    session.setWrapLimitRange(null, null)
    session.setUseWorker(false)

    editor

  compileTemplate = (str) ->
    try
      compiledTemplate(HamletCompiler.compile(str, runtime: "Runtime"))
      templateErrors("")
    catch e
      templateErrors(e.message)

  compileCode = (str) ->
    try
      compiledCode(CoffeeScript.compile str, bare: true)
      codeErrors("")
    catch e
      codeErrors(e.message)

  build = ->
    templateFn = eval(compiledTemplate())
    templateData = eval(compiledCode())

    fragment = templateFn(templateData)
    $("#{I.selector} .output").html(fragment)

  compileTemplate(sourceTemplate(), compiledTemplate)
  compileCode(sourceCode(), compiledCode)

  sourceTemplate.observe(compileTemplate)
  sourceCode.observe(compileCode)

  compiledCode.observe(build)
  compiledTemplate.observe(build)

  deactivate = (example) ->
    example.active(false)

  self =
    active: Observable(false)
    activate: ->
      examples.forEach(deactivate)

      self.active(true)
    build: build
    class: ->
      "active" if self.active()
    competitorName: I.competitorName
    competitorUrl: I.competitorUrl
    configureEditors: ->
      template = $(I.selector).find(".code.template").get(0)
      javascript = $(I.selector).find(".code.javascript").get(0)

      templateEditor = configureEditor(template, "haml")
      resetEditorTemplate(self.sourceTemplate(), templateEditor)

      codeEditor = configureEditor(javascript, "coffee")
      resetEditorTemplate(self.sourceCode(), codeEditor)
    description: I.description
    header: I.header
    hideInactive: ->
      "hidden" unless self.active()
    selector: I.selector
    sourceTemplate: sourceTemplate
    sourceCode: sourceCode
    reset: ->
      sourceTemplate(originalTemplate)
      sourceCode(originalCode)

  self
