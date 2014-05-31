Editor = (I={}) ->
  editor = ace.edit(I.element)

  # editor settings
  editor.setTheme "ace/theme/tomorrow"
  editor.setShowPrintMargin(false)
  editor.setHighlightActiveLine(false)
  editor.setDisplayIndentGuides(false)
  editor.renderer.setShowGutter(false)
  editor.renderer.setPadding(10)

  session = editor.session
  session.setMode "ace/mode/#{I.mode}"
  session.setTabSize(2)
  session.setUseSoftTabs(true)
  session.setUseWrapMode(false)
  session.setWrapLimitRange(null, null)
  session.setUseWorker(false)

  setEditorValue = ->
    I.sourceCodeObservable editor.getValue()

  # initialize
  editor.removeListener "change", setEditorValue
  editor.setValue(I.sourceCodeObservable(), 1)
  editor.getSession().setUndoManager(new ace.UndoManager)
  editor.on "change", setEditorValue

  editor

window.Example = (I={}) ->
  templateEditor = null
  codeEditor = null

  originalTemplate = I.template
  originalCode = I.code

  sourceTemplate = Observable(I.template)
  sourceCode = Observable(I.code)

  compiledCode = Observable("")
  compiledTemplate = Observable("")

  compileTemplate = (str) ->
    try
      compiledTemplate(HamletCompiler.compile(str, runtime: "Runtime"))
      templateErrors ""
    catch e
      templateErrors "Template Error: #{e.message}"

  compileCode = (str) ->
    try
      compiledCode(CoffeeScript.compile str, bare: true)
      codeErrors ""
    catch e
      codeErrors "Model Error: #{e.message}"

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
      templateEditor = Editor
        element: $(I.selector).find(".code.template").get(0)
        mode: "haml"
        sourceCodeObservable: self.sourceTemplate

      codeEditor = Editor
        element: $(I.selector).find(".code.javascript").get(0)
        mode: "haml"
        sourceCodeObservable: self.sourceCode

    description: I.description
    header: I.header
    hideInactive: ->
      "hidden" unless self.active()
    selector: I.selector
    sourceTemplate: sourceTemplate
    sourceCode: sourceCode
    reset: ->
      # HACK set the template and code to empty before you
      # reset them to the original code in case the editor
      # value hasn't changed
      sourceTemplate("")
      sourceCode("")

      sourceTemplate(originalTemplate)
      sourceCode(originalCode)

  self
