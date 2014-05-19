template = (selector, data) ->
  name = selector.replace /#/g, ""
  fragment = JST[name](data)
  document.querySelector(selector).appendChild fragment

sourceTemplate = Observable """
%h2 TODO List
%ul
  - each @items, (item) ->
    %li
      %label
        = item
        %input(type="checkbox")
%input(@value)
%button(@click) Add Item
"""

sourceCode = Observable """
model =
  value: Observable ""
  items: Observable []
  click: ->
    @items.push @value()
    @value("")
"""

build = ->
  templateFn = eval(compiledTemplate())
  templateData = eval(compiledCode())

  fragment = templateFn(templateData)
  # TODO jQuery to remove the element from the DOM
  document.querySelector("#todo-output").appendChild fragment

templateErrors = Observable("")
codeErrors = Observable("")

compiledCode = Observable("")
compiledTemplate = Observable("")

compileTemplate = (str) ->
  try
    compiledTemplate(HamletCompiler.compile(str, runtime: "Runtime"))
  catch e
    templateErrors(e.message)

compileCode = (str) ->
  try
    compiledCode(CoffeeScript.compile str, bare: true)
  catch e
    codeErrors(e.message)

compileTemplate(sourceTemplate())
compileCode(sourceCode())

sourceTemplate.observe(compileTemplate)
sourceCode.observe(compileCode)

compiledCode.observe(build)
compiledTemplate.observe(build)

template "#errors",
  templateErrors: templateErrors
  codeErrors: codeErrors

template "#todo",
  sourceTemplate: sourceTemplate
  sourceCode: sourceCode
