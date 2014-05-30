window.Example = (I={}) ->
  originalTemplate = I.template
  originalCode = I.code

  sourceTemplate = Observable(I.template)
  sourceCode = Observable(I.code)

  compiledCode = Observable("")
  compiledTemplate = Observable("")

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
