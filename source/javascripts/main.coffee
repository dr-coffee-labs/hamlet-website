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
  template: """
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
  header: "Just JavaScript"
  description: "JavaScript with zero dependencies. Write template backing objects with clean public APIs using the style of JavaScript you love the most. Don't mess with a model system or learn the differences between a Backbone Collection and a native Array. Take a look at how easy it is to create a TODO list."
  selector: "#todo"

markdownEditor = Example
  code: """
    converter = new Showdown.converter()

    model =
      value: Observable "Type some *markdown* here!"
      output: ->
        converter.makeHtml(model.value())
  """
  template: """
    %h3 Input
    %textarea.code(@value)
    %h3 Output
    .content= @output
  """
  header: "Small Footprint"
  description: "Hamlet weighs in at roughly 2% the size of Angular JS and React JS, but is no less powerful than these large frameworks."
  selector: "#markdown-editor"

emailClient = Example
  code: """
    model = {}
  """
  template: """
    %h2 Email client
  """
  header: "Not a framework"
  description: "Hamlet is a way to drastically simplify your templating logic. For many applications you won’t need to use a full blown MVC framework. This reduces complexity and allows your team to iterate quickly, without the overhead of learning a whole framework"
  selector: "#email-client"

shoppingCart = Example
  code: """
    model =
      categories: window.data.categories
      category: ->
        model.categories[0]
      quantity: Observable(1)
      products: ->
        model.category().products
      product: ->
        model.products()[0]
      price: ->
        model.product().price
      subtotal: ->
        model.product().price * model.quantity()
  """
  template: """
    /%select(value=@category options=@categories)
    /%select(value=@product options=@products)
    .price= @price
    %input(type="text" value=@quantity)
    .subtotal= @subtotal
    %a(href="#") Remove
    %hr
    .total
      Total value:
      %span.amount 0
    %button Add product
    %button Submit Order
  """
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
      if a.age() < b.age()
         return -1
      else if a.age() > b.age()
        return 1

      return 0

    compareName = (a, b) ->
      aName = a.name().toLowerCase()
      bName = b.name().toLowerCase()

      if aName < bName
         return -1
      else if aName > bName
        return 1

      return 0

    sortBy.observe (obj) ->
      val = obj.value

      if val is "name"
        phones.sort(compareName)
      else if val is "age"
        phones.sort(compareAge)

    Phone = (I={}) ->
      self =
        age: Observable(I.age)
        imageUrl: Observable(I.imageUrl)
        name: Observable(I.name)
        snippet: Observable(I.snippet)
        matchSearch: ->
          "hidden" unless self.name().toLowerCase().indexOf(search().toLowerCase()) >= 0

    phones = Observable(data.phones.map(Phone))

    model =
      sortBy: sortBy
      sortOptions: sortOptions
      search: search
      phones: phones
  """
  template: """
    %label
      Search:
      %input(type="text" value=@search)
    %label
      Sort by:
      %select(value=@sortBy options=@sortOptions)
    %ul
      -each @phones, ->
        %li(class=@matchSearch)
          %img(src="")
          .name= @name
          .description= @snippet
  """
  header: "Kill Complexity"
  description: "Don't bother with overly complicated frameworks and still create robust interactive experiences. Compare the Hamlet version with a 12 part Angular JS tutorial for filtered lists."
  selector: "#filtered-list"

examples.push(todo, markdownEditor, emailClient, shoppingCart, filteredList)
examples()[examples().length - 1].active(true)

$("#navigation").template
  items: examples

examples.forEach (e) ->
  $(e.selector).html(JST.example(e))
  e.build()
