window.garden =
  inlineEvents: Example
    code: """
      model =
        hello: ->
          alert "hello"
    """
    template: """
      %button(click=@hello) Hello!
    """
    header: "Inline Events"
    description: "Set up a click handler. Referenced it as the value of the button 'click' attribute."
    selector: "#inline-events"
  dependentFunctions: Example
    code: """
      model =
        name: ->
          @first() + ' ' + @last()
        first: Observable "Prince"
        last: Observable "Hamlet"
    """
    template: """
      %h2= @name
      %input(value=@first)
      %input(value=@last)
    """
    header: "Dependent Functions"
    description: "Functions declared that reference Observables will automatically be updated when any of the dependencies are changed."
    selector: "#dependent-functions"
  checkbox: Example
    code: """
      model =
        checked: Observable true
    """
    template: """
      %label
        %input(type="checkbox" @checked)
        = @checked
    """
    header: "Checkbox"
    description: "Toggles a Boolean Observable. If the backing model property is named the same as the DOM attr, you can omit the attr in your template. Note: Clicking the label triggers the change one the input. Don't set a click handler for the label or things will get weird."
    selector: "#checkbox"
  disable: Example
    code: """
      model =
        hello: ->
          alert "hello"
        disabled: Observable true
        toggle: ->
          @disabled.toggle()
    """
    template: """
      %button(click=@hello @disabled) A Button
      %button(click=@toggle) Toggle
    """
    header: "Disable Inputs"
    description: "Use Observable#toggle to flip a Boolean Observable."
    selector: "#disable"
  html: Example
    code: """
      model =
        item: (text) ->
          $("<li>", text: text).get(0)
    """
    template: """
      %ul
        = @item("Hey")
        = @item("There")
        = @item("Dude")
    """
    header: "HTML elements"
    description: "Hamlet won't insert unescaped HTML into a page by itself. A workaround if you really want unsafe HTML content is to create a document fragment or use the `get` method on a jQuery element."
    selector: "#html"
  flights: Example
    code: """
      model =
        tickets: [
          {name: "Choose...", price: ""}
          {name: "Economy", price: 199.95}
          {name: "Business", price: 449.22}
          {name: "First Class", price: 1199.99}
        ]
        chosenTicket: Observable()
        reset: ->
          @chosenTicket(@tickets[0])
        disabled: ->
          @chosenTicket() is @tickets[0] or !@chosenTicket()?
    """
    template: """
      %select(value=@chosenTicket options=@tickets)
      %button(@disabled click=@reset) Clear
      .choice
        - each @chosenTicket, ->
          .ticket
            - if @price
              You have chosen!
              %b= @name
              = @price
    """
    header: "Knockout style flight purchase widget"
    description: "Build a simple flight selector, taking advantage of the simplicity of working with select boxes in Hamlet."
    selector: "#flights"