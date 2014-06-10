# this assumes you're attaching the template
# to an element using an id selector
$.fn.template = (data) ->
  name = @selector.replace /#/g, ""
  $(this).append(JST[name](data))

window.templateErrors = Observable ""
window.codeErrors = Observable ""