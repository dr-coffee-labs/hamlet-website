TEMPLATE_DEFAULT = """
%h2 todos
%ul
  - each @items, ->
    %li
      %label
        %span.item(@class)= @description
        %input(type="checkbox" @checked)
%input(@value @placeholder)
%button(@click) Add Item
"""

CODE_DEFAULT = """
model =
  value: Observable ""
  items: Observable []
  placeholder: "What needs to be done?"
  click: ->
    item =
      description: @value()
      checked: Observable false
      class: ->
        "completed" if item.checked()

    @items.push(item)
    @value("")
"""

# this assumes you're attaching the template
# to an element using an id selector
$.fn.template = (data) ->
  name = @selector.replace /#/g, ""
  $(this).append(JST[name](data))

sourceTemplate = Observable(TEMPLATE_DEFAULT)
sourceCode = Observable(CODE_DEFAULT)

build = ->
  templateFn = eval(compiledTemplate())
  templateData = eval(compiledCode())

  fragment = templateFn(templateData)
  $("#todo-output").html(fragment)

templateErrors = Observable("")
codeErrors = Observable("")

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

compileTemplate(sourceTemplate())
compileCode(sourceCode())

sourceTemplate.observe(compileTemplate)
sourceCode.observe(compileCode)

compiledCode.observe(build)
compiledTemplate.observe(build)

$("#errors").template
  templateErrors: templateErrors
  codeErrors: codeErrors

$("#todo").template
  sourceTemplate: sourceTemplate
  sourceCode: sourceCode
  reset: ->
    sourceTemplate(TEMPLATE_DEFAULT)
    sourceCode(CODE_DEFAULT)
