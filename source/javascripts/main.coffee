# this assumes you're attaching the template
# to an element using an id selector
$.fn.template = (data) ->
  name = @selector.replace /#/g, ""
  $(this).append(JST[name](data))

window.templateErrors = Observable("")
window.codeErrors = Observable("")

$("#errors").template
  templateErrors: templateErrors
  codeErrors: codeErrors
  class: ->
    "hidden" unless templateErrors().length || codeErrors().length

window.examples = Observable []

todo = Example
  code: """
    completeAll = Observable(false)
    completeAll.observe (val) ->
      # something

    model =
      removeFinished: ->
        items = @items
        toDelete = items.filter (i) ->
          i.checked()
        toDelete.forEach (i) ->
          items.remove(i)
      completeAll: completeAll
      hideMarkComplete: ->
        "hidden" unless @items().length
      value: Observable ""
      items: Observable []
      finished: ->
        @items().filter (item) ->
          item.checked()
        .length
      unfinished: ->
        @items().filter (item) ->
          !item.checked()
        .length
      add: (e) ->
        return unless e.keyCode is 13
        item =
          description: @value()
          checked: Observable false
          class: ->
            "completed" if item.checked()

        @items.push(item)
        @value("")
    """
  template: """
    %h2 todos
    %input(type="text" @value placeholder="What needs to be done?" onkeydown=@add)
    %label(class=@hideMarkComplete)
      %input(type="checkbox" checked=@completeAll)
      %span Mark all as complete
    %ul
      - each @items, ->
        %li
          %label
            %input(type="checkbox" @checked)
            %span.item(@class)= @description
    .totals(class=@hideMarkComplete)
      .unfinished
        %span.count= @unfinished
        left
      .clear(click=@removeFinished)
        Clear
        %span.count= @finished
        items
  """
  competitorName: "Backbone"
  competitorUrl: "http://jsfiddle.net/mdiebolt/2fkLY"
  header: "Just JavaScript"
  description: "JavaScript with zero dependencies. Write template backing objects with clean public APIs using the style of JavaScript you love the most. Don't mess with a model system or learn the differences between a Backbone Collection and a native Array. Take a look at how easy it is to create a TODO list."
  selector: "#todo"

markdownEditor = Example
  code: """
    converter = new Showdown.converter()

    model =
      value: Observable "Type some *markdown* here!"
      output: ->
        html = converter.makeHtml(model.value())
        $('<div>' + html + '</div>').get(0)
  """
  template: """
    %h3 Input
    %textarea(@value)
    %h3 Output
    .content= @output
  """
  competitorName: "React JS"
  competitorUrl: "http://jsfiddle.net/mdiebolt/xCpxy"
  header: "Small Footprint"
  description: "Hamlet weighs in at roughly 2% the size of Angular JS and React JS, but is no less powerful than these large frameworks."
  selector: "#markdown-editor"

emailClient = Example
  code: """
    months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun"
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    Message = (I={}) ->
      self =
        date: Observable(I.date)
        formattedDate: ->
          date = self.date()
          months[date.getMonth()] + ' ' + date.getDate()
        subject: Observable(I.subject)
        to: Observable(I.to)
        from: Observable(I.from)

      self

    Mailbox = (I={}) ->
      messages = Observable(I.messages.map(Message))

      self =
        class: ->
          "active" if activeMailbox() is self
        click: ->
          activeMailbox(self)
        name: Observable(I.name)
        count: ->
          messages().length
        messages: messages

      self

    mailboxes = data.email.map(Mailbox)
    activeMailbox = Observable(mailboxes[0])

    model =
      mailboxes: mailboxes
      activeMailbox: activeMailbox
  """
  template: """
    .left
      %h4 Mailboxes
      %nav
        - each @mailboxes, ->
          .mailbox(@class @click)
            %span= @name
            %span.count= @count

    -th = ["Date", "Subject", "From", "To"]
    %main
      %h2 Tomstermail
      %table
        %tr
          - each th, (name) ->
            %th= name
        - each @activeMailbox().messages, ->
          %tr
            %td= @formattedDate
            %td= @subject
            %td= @from
            %td= @to
  """
  competitorName: "Ember JS"
  competitorUrl: "http://jsfiddle.net/mdiebolt/9mN48"
  header: "Not a framework"
  description: "Hamlet is a way to drastically simplify your templating logic. For many applications you won’t need to use a full blown MVC framework. This reduces complexity and allows your team to iterate quickly, without the overhead of learning a whole framework"
  selector: "#email-client"

shoppingCart = Example
  code: """
    nullCategory = {name: "Select...", value: -1, products: []}
    nullProduct = {name: "Select...", value: -1, price: 0}

    categories = Observable [nullCategory].concat data.categories

    Line = ->
      self =
        categories: categories
        selectedCategory: Observable(categories()[0])
        quantity: Observable(1)
        subtotal: Observable(0)
        price: ->
          self.selectedProduct().price
        products: ->
          [nullProduct].concat(@selectedCategory().products)
        selectedProduct: Observable(nullProduct)
        subtotal: ->
          (self.price() * self.quantity()).toFixed(2)
        toJSON: ->
          if self.selectedProduct()
            {
              productName: self.selectedProduct()
              quantity: self.quantity()
            }
        click: (e) ->
          e.preventDefault()
          lines.remove(self)

      self.selectedCategory.observe (category) ->
        self.selectedProduct(nullProduct)

      self

    lines = Observable([Line()])

    model =
      addLine: ->
        lines.push(Line())
      lines: lines
      submitOrder: ->
        json = JSON.stringify lines.map (l) ->
          l.toJSON()

        alert("Could now send this to server: " + json)
      total: ->
        lines().reduce (total, line) ->
          total + line.price()
        , 0
  """
  template: """
    -th = ["Category", "Product", "Price", "Quantity", "Subtotal", ""]
    %table
      %thead
        %tr
          - each th, (name) ->
            %th= name
      %tbody
        - each @lines, ->
          %tr
            %td
              %select(options=@categories value=@selectedCategory)
            %td
              %select(options=@products value=@selectedProduct)
            %td= @price
            %td
              %input(value=@quantity)
            %td= @subtotal
            %td
              %a(href="#" @click) Remove
    %hr
    .sum
      Total value:
      %span.total= @total
    %button(click=@addLine) Add product
    %button(click=@submitOrder) Submit order
  """
  competitorName: "Knockout JS"
  competitorUrl: "http://jsfiddle.net/mdiebolt/h2MaW"
  header: "Simple templates"
  description: "Intuitive, readable templates with sensible error messages"
  selector: "#shopping-cart"

filteredList = Example
  code: """
    search = Observable ""
    sortOptions = [
      {name: "Alphabetical", value: "name"}
      {name: "Newest", value: "age"}
    ]
    sortBy = Observable(sortOptions[1])

    compareAge = (a, b) ->
      a.age() - b.age()

    compareName = (a, b) ->
      aName = a.name().toLowerCase()
      bName = b.name().toLowerCase()

      if aName < bName
         return -1
      else if aName > bName
        return 1

      return 0

    includes = (a, b) ->
      a.toLowerCase().indexOf(b.toLowerCase()) >= 0

    Phone = (I={}) ->
      self =
        age: Observable(I.age)
        imageUrl: Observable(I.imageUrl)
        name: Observable(I.name)
        snippet: Observable(I.snippet)
        matchSearch: ->
          "hidden" unless includes(self.name(), search())

    phones = Observable(data.phones.map(Phone))

    model =
      sortBy: sortBy
      sortOptions: sortOptions
      search: search
      phones: phones
      sorted: ->
        val = @sortBy()?.value

        if val is "name"
          @phones().sort(compareName)
        else if val is "age"
          @phones().sort(compareAge)
        else
          @phones()
  """
  template: """
    %label
      Search:
      %input(type="text" value=@search)
    %label
      Sort by:
      %select(value=@sortBy options=@sortOptions)
    %ul
      -each @sorted, ->
        %li.phone(class=@matchSearch)
          %img(src=@imageUrl)
          .name= @name
          .description= @snippet
  """
  competitorName: "Angular JS"
  competitorUrl: ""
  header: "Kill Complexity"
  description: "Don't bother with overly complicated frameworks and still create robust interactive experiences. Compare the Hamlet version with a 12 part Angular JS tutorial for filtered lists."
  selector: "#filtered-list"

examples.push(markdownEditor, todo, shoppingCart, emailClient, filteredList)
examples()[4].active(true)

$("#navigation").template
  items: examples

examples.forEach (e) ->
  $(e.selector).html(JST.example(e))
  e.configureEditors()
  e.build()
