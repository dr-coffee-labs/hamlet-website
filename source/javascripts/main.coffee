$("#errors").template
  templateErrors: templateErrors
  codeErrors: codeErrors
  class: ->
    "hidden" unless templateErrors().length || codeErrors().length

initialize = (ex) ->
  if $(ex.selector).length
    $(ex.selector).html(JST.example(ex))
    ex.configureEditors()
    ex.build()

# main page demos
window.examples = Observable []

for name, demo of window.demos
  examples.push(demo)

examples()[0].active(true)

$("#navigation").template
  items: examples

examples.forEach(initialize)
#

# garden demos
window.gardens = Observable []

for name, demo of window.garden
  gardens.push(demo)

gardens.forEach(initialize)
$("#garden .example").removeClass "hidden"
#