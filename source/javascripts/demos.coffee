window.multiInput = Example
  code: """
    model =
      min: 1
      max: 10
      value: Observable 5
  """
  template: """
    %input(type="text" @value)
    %select(@value options=[@min..@max])
    %input(type="range" @value @min @max)
    %progress(@value @max)
  """
  header: ""
  description: ""
  selector: "#multi-input"

window.demos =
  markdownEditor: Example
    code: """
      converter = new Showdown.converter()

      model =
        value: Observable "Type some *markdown* here!"
        output: ->
          html = converter.makeHtml @value()
          $(html).get()
    """
    template: """
      %h4 Input
      %textarea(@value)
      %h4 Output
      .content= @output
    """
    competitorName: "React JS"
    competitorUrl: "http://jsfiddle.net/mdiebolt/ahpCA"
    header: "Small footprint"
    description: "Hamlet weighs in at a fraction the size of Angular JS and React JS, but is no less powerful than these large frameworks. Writing maintainable, understandable code for JavaScript applications has never been easier."
    comparison: "Like React, Hamlet has a compile step. However, a compiled Hamlet template requires no initialization, change, or teardown code for bindings to work."
    selector: "#markdown-editor"

  todo: Example
    code: """
      items = Observable []

      completeAll = Observable(false)
      completeAll.observe (val) ->
        items.forEach (i) ->
          i.checked(val)

      model =
        removeFinished: ->
          @finished().forEach items.remove
          @completeAll(false)
        completeAll: completeAll
        hideMarkComplete: ->
          "hidden" unless @items().length
        value: Observable ""
        items: items
        finished: ->
          @items.filter (item) ->
            item.checked()
        finishedCount: ->
          @finished().length
        unfinished: ->
          @items.filter (item) ->
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
          @value ""
      """
    template: """
      - item = ->
        %li
          %label
            %input(type="checkbox" @checked)
            %span.item(@class)= @description

      %h2 Todos by Hamlet
      %input(type="text" @value placeholder="What needs to be done?" onkeydown=@add)
      %label(class=@hideMarkComplete)
        %input(type="checkbox" checked=@completeAll)
        %span Mark all as complete
      %ul
        - each @items, item
      .totals(class=@hideMarkComplete)
        .unfinished
          %span.count= @unfinished
          left
        .clear(click=@removeFinished)
          Clear
          %span.count= @finishedCount
          items
    """
    competitorName: "Backbone"
    competitorUrl: "http://jsfiddle.net/mdiebolt/2fkLY"
    header: "CoffeeScript"
    description: "Take full advantage of CoffeeScript in your templates. Hamlet doesn't use a crippled templating language and supports embedding arbitrary CoffeeScript expressions. Write expressive, intuitive templates that can be understood at a glance."
    comparison: "Compared to Backbone, Hamlet is much less verbose. Using Hamlet, you'll never have to set up handlers or manually sync state between your model and the DOM. Eliminating this entire class of application code reduces complexity and improves maintainability."
    selector: "#todo"

  shoppingCart: Example
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
            @selectedProduct().price
          products: ->
            [nullProduct].concat(@selectedCategory().products)
          selectedProduct: Observable(nullProduct)
          subtotal: ->
            @price() * @quantity()
          formattedSubtotal: ->
            "$" + @subtotal().toFixed(2)
          toJSON: ->
            if @selectedProduct()
              { productName: @selectedProduct(), quantity: @quantity() }
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
          sum = lines.reduce (total, line) ->
            total + line.subtotal()
          , 0
        formattedTotal: ->
          "$" + @total().toFixed(2)
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
              %td.category
                %select(options=@categories value=@selectedCategory)
              %td.product
                %select(options=@products value=@selectedProduct)
              %td.price= @price
              %td.quantity
                %input(type="number" value=@quantity)
              %td.subtotal= @formattedSubtotal
              %td.remove
                %a(href="#" @click) Remove
      %hr
      .sum
        Total value:
        %span.total= @formattedTotal
      %button(click=@addLine) Add product
      %button(click=@submitOrder) Submit order
    """
    competitorName: "Knockout JS"
    competitorUrl: "http://jsfiddle.net/mdiebolt/h2MaW"
    header: "Powerful bindings"
    description: "Create impressive applications in minutes. Coding a cascading select box is quite simple with Hamlet."
    comparison: "Knockout is most similar to Hamlet. However, Hamlet templates take Knockout style data bindings to their logical conclusion, omitting any attributes and binding directives that Knockout requires."
    selector: "#shopping-cart"

  filteredList: Example
    code: """
      search = Observable ""
      options = [
        {name: "Alphabetical", value: "name"}
        {name: "Newest", value: "age"}
      ]

      compareAge = (a, b) ->
        a.age() - b.age()

      compareName = (a, b) ->
        aName = a.name().toLowerCase()
        bName = b.name().toLowerCase()

        if aName < bName
          return -1
        else if aName > bName
          return 1
        else
          return 0

      includes = (a, b) ->
        a.toLowerCase().indexOf(b.toLowerCase()) >= 0

      Phone = (I={}) ->
        self =
          age: Observable(I.age)
          src: Observable(I.imageUrl)
          name: Observable(I.name)
          snippet: Observable(I.snippet)
          class: ->
            "hidden" unless includes(self.name(), search())

      model =
        sortBy: Observable options[1]
        options: options
        search: search
        phones: Observable data.phones.map(Phone)
        sorted: ->
          val = @sortBy().value

          if val is "name"
            @phones().sort(compareName)
          else if val is "age"
            @phones().sort(compareAge)
    """
    template: """
      %label
        Search:
        %input(value=@search type="text")
      %label
        Sort by:
        %select(value=@sortBy @options)
      %ul
        -each @sorted, ->
          %li.phone(@class)
            %img(@src)
            .name= @name
            .description= @snippet
    """
    competitorName: "Angular JS"
    competitorUrl: "http://jsfiddle.net/mdiebolt/BChyV"
    header: "Kill Complexity"
    description: "Avoid working with over-engineered frameworks without sacrificing a great interactive experience. Compare the Hamlet version with an Angular JS tutorial that is 12 steps long."
    comparison: "Angular JS is a very large and complex framework that does much more than templating. Hamlet focuses on making it dead simple to create powerful, understandable templates with a minimal amount of time to get up and running."
    selector: "#filtered-list"

  emailClient: Example
    code: """
      months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun"
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ]

      humanDate = (date) ->
        months[date.getMonth()] + ' ' + date.getDate()

      Message = (I={}) ->
        self =
          class: ->
            "active" if activeMessage() is self
          click: ->
            activeMessage(self)
          date: Observable(I.date)
          formattedDate: ->
            humanDate(self.date())
          to: Observable(I.to)
          from: Observable(I.from)
          subject: Observable(I.subject)
          body: Observable(I.body)

      Mailbox = (I={}) ->
        self =
          class: ->
            "active" if activeMailbox() is self
          click: ->
            activeMailbox(self)
            activeMessage(nullMessage)
          count: ->
            @messages().length
          messages: Observable I.messages.map(Message)
          name: Observable(I.name)

      nullMailbox = Mailbox
        name: ""
        messages: []

      nullMessage = Message
        subject: ""
        to: ""
        from: ""
        date: new Date
        body: ""

      activeMailbox = Observable(nullMailbox)
      activeMessage = Observable(nullMessage)

      mailboxes = data.email.map(Mailbox)

      model =
        mailboxes: mailboxes
        activeMailbox: activeMailbox
        messageClass: ->
          "hidden" unless @body().length
        tableHeaders: ["Date", "Subject", "From", "To"]
        messages: ->
          @activeMailbox().messages()
        showMail: ->
          "hidden" unless @activeMailbox().count()
        hideMail: ->
          "hidden" if @activeMailbox().count()

      ["subject", "to", "from", "formattedDate", "body"].forEach (method) ->
        model[method] = ->
          activeMessage()[method]()

      model
    """
    template: """
      .email-client
        .left
          %h4 Mailboxes
          %nav
            - each @mailboxes, ->
              .mailbox(@class @click)
                =@name
                %span.count= @count
        %main
          %h2(class=@hideMail) Hamstermail
          %table(class=@showMail)
            %tr
              - each @tableHeaders, (name) ->
                %th= name
            - each @messages, ->
              %tr(@click @class)
                %td= @formattedDate
                %td= @subject
                %td= @from
                %td= @to
          .email(class=@messageClass)
            %strong From
            %div= @from
            %strong To
            %div= @to
            %strong Date
            %div= @formattedDate
            %hr
            %h3= @subject
            %div= @body
    """
    competitorName: "Ember JS"
    competitorUrl: "http://jsfiddle.net/mdiebolt/9mN48"
    header: "Not a framework"
    description: "Hamlet simplifies your templating complexity by an order of magnitude and eliminates the need for a view abstraction in addition to a template. For many applications you won’t need to use a full blown MVC framework at all. This allows your team to iterate quickly without the overhead of learning a whole framework."
    comparison: "Unlike Ember, Hamlet doesn't start with the assumption that you'll be building a large single page JavaScript application. This makes it a great fit for small, encapsulated, reusable widgets. However, since Hamlet focuses on templating, it's a perfect fit for the presentation layer when your application grows large enough to warrant that organization."
    selector: "#email-client"
