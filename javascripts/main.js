(function() {
  var emailClient, filteredList, markdownEditor, shoppingCart, todo;

  $.fn.template = function(data) {
    var name;
    name = this.selector.replace(/#/g, "");
    return $(this).append(JST[name](data));
  };

  window.templateErrors = Observable("");

  window.codeErrors = Observable("");

  $("#errors").template({
    templateErrors: templateErrors,
    codeErrors: codeErrors,
    "class": function() {
      if (!(templateErrors().length || codeErrors().length)) {
        return "hidden";
      }
    }
  });

  window.examples = Observable([]);

  todo = Example({
    code: "completeAll = Observable(false)\ncompleteAll.observe (val) ->\n  # something\n\nmodel =\n  removeFinished: ->\n    items = @items\n    toDelete = items.filter (i) ->\n      i.checked()\n    toDelete.forEach (i) ->\n      items.remove(i)\n  completeAll: completeAll\n  hideMarkComplete: ->\n    \"hidden\" unless @items().length\n  value: Observable \"\"\n  items: Observable []\n  finished: ->\n    @items().filter (item) ->\n      item.checked()\n    .length\n  unfinished: ->\n    @items().filter (item) ->\n      !item.checked()\n    .length\n  add: (e) ->\n    return unless e.keyCode is 13\n    item =\n      description: @value()\n      checked: Observable false\n      class: ->\n        \"completed\" if item.checked()\n\n    @items.push(item)\n    @value(\"\")",
    template: "%h2 todos\n%input(type=\"text\" @value placeholder=\"What needs to be done?\" onkeydown=@add)\n%label(class=@hideMarkComplete)\n  %input(type=\"checkbox\" checked=@completeAll)\n  %span Mark all as complete\n%ul\n  - each @items, ->\n    %li\n      %label\n        %input(type=\"checkbox\" @checked)\n        %span.item(@class)= @description\n.totals(class=@hideMarkComplete)\n  .unfinished\n    %span.count= @unfinished\n    left\n  .clear(click=@removeFinished)\n    Clear\n    %span.count= @finished\n    items",
    competitorName: "Backbone",
    competitorUrl: "http://jsfiddle.net/mdiebolt/2fkLY",
    header: "Just JavaScript",
    description: "JavaScript with zero dependencies. Write template backing objects with clean public APIs using the style of JavaScript you love the most. Don't mess with a model system or learn the differences between a Backbone Collection and a native Array. Take a look at how easy it is to create a TODO list.",
    selector: "#todo"
  });

  markdownEditor = Example({
    code: "converter = new Showdown.converter()\n\nmodel =\n  value: Observable \"Type some *markdown* here!\"\n  output: ->\n    html = converter.makeHtml(model.value())\n    $('<div>' + html + '</div>').get(0)",
    template: "%h3 Input\n%textarea(@value)\n%h3 Output\n.content= @output",
    competitorName: "React JS",
    competitorUrl: "http://jsfiddle.net/mdiebolt/xCpxy",
    header: "Small Footprint",
    description: "Hamlet weighs in at roughly 2% the size of Angular JS and React JS, but is no less powerful than these large frameworks.",
    selector: "#markdown-editor"
  });

  emailClient = Example({
    code: "months = [\n  \"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\"\n  \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"\n]\n\nMessage = (I={}) ->\n  self =\n    date: Observable(I.date)\n    formattedDate: ->\n      date = self.date()\n      months[date.getMonth()] + ' ' + date.getDate()\n    subject: Observable(I.subject)\n    to: Observable(I.to)\n    from: Observable(I.from)\n\n  self\n\nMailbox = (I={}) ->\n  messages = Observable(I.messages.map(Message))\n\n  self =\n    class: ->\n      \"active\" if activeMailbox() is self\n    click: ->\n      activeMailbox(self)\n    name: Observable(I.name)\n    count: ->\n      messages().length\n    messages: messages\n\n  self\n\nmailboxes = data.email.map(Mailbox)\nactiveMailbox = Observable(mailboxes[0])\n\nmodel =\n  mailboxes: mailboxes\n  activeMailbox: activeMailbox",
    template: ".left\n  %h4 Mailboxes\n  %nav\n    - each @mailboxes, ->\n      .mailbox(@class @click)\n        %span= @name\n        %span.count= @count\n\n-th = [\"Date\", \"Subject\", \"From\", \"To\"]\n%main\n  %h2 Tomstermail\n  %table\n    %tr\n      - each th, (name) ->\n        %th= name\n    - each @activeMailbox().messages, ->\n      %tr\n        %td= @formattedDate\n        %td= @subject\n        %td= @from\n        %td= @to",
    competitorName: "Ember JS",
    competitorUrl: "http://jsfiddle.net/mdiebolt/9mN48",
    header: "Not a framework",
    description: "Hamlet is a way to drastically simplify your templating logic. For many applications you won’t need to use a full blown MVC framework. This reduces complexity and allows your team to iterate quickly, without the overhead of learning a whole framework",
    selector: "#email-client"
  });

  shoppingCart = Example({
    code: "nullCategory = {name: \"Select...\", value: -1, products: []}\nnullProduct = {name: \"Select...\", value: -1, price: 0}\n\ncategories = Observable [nullCategory].concat data.categories\n\nLine = ->\n  self =\n    categories: categories\n    selectedCategory: Observable(categories()[0])\n    quantity: Observable(1)\n    subtotal: Observable(0)\n    price: ->\n      self.selectedProduct().price\n    products: ->\n      [nullProduct].concat(@selectedCategory().products)\n    selectedProduct: Observable(nullProduct)\n    subtotal: ->\n      (self.price() * self.quantity()).toFixed(2)\n    toJSON: ->\n      if self.selectedProduct()\n        {\n          productName: self.selectedProduct()\n          quantity: self.quantity()\n        }\n    click: (e) ->\n      e.preventDefault()\n      lines.remove(self)\n\n  self.selectedCategory.observe (category) ->\n    self.selectedProduct(nullProduct)\n\n  self\n\nlines = Observable([Line()])\n\nmodel =\n  addLine: ->\n    lines.push(Line())\n  lines: lines\n  submitOrder: ->\n    json = JSON.stringify lines.map (l) ->\n      l.toJSON()\n\n    alert(\"Could now send this to server: \" + json)\n  total: ->\n    lines().reduce (total, line) ->\n      total + line.price()\n    , 0",
    template: "-th = [\"Category\", \"Product\", \"Price\", \"Quantity\", \"Subtotal\", \"\"]\n%table\n  %thead\n    %tr\n      - each th, (name) ->\n        %th= name\n  %tbody\n    - each @lines, ->\n      %tr\n        %td\n          %select(options=@categories value=@selectedCategory)\n        %td\n          %select(options=@products value=@selectedProduct)\n        %td= @price\n        %td\n          %input(value=@quantity)\n        %td= @subtotal\n        %td\n          %a(href=\"#\" @click) Remove\n%hr\n.sum\n  Total value:\n  %span.total= @total\n%button(click=@addLine) Add product\n%button(click=@submitOrder) Submit order",
    competitorName: "Knockout JS",
    competitorUrl: "http://jsfiddle.net/mdiebolt/h2MaW",
    header: "Simple templates",
    description: "Intuitive, readable templates with sensible error messages",
    selector: "#shopping-cart"
  });

  filteredList = Example({
    code: "search = Observable \"\"\nsortOptions = [\n  {name: \"Alphabetical\", value: \"name\"}\n  {name: \"Newest\", value: \"age\"}\n]\nsortBy = Observable(sortOptions[1])\n\ncompareAge = (a, b) ->\n  a.age() - b.age()\n\ncompareName = (a, b) ->\n  aName = a.name().toLowerCase()\n  bName = b.name().toLowerCase()\n\n  if aName < bName\n     return -1\n  else if aName > bName\n    return 1\n\n  return 0\n\nincludes = (a, b) ->\n  a.toLowerCase().indexOf(b.toLowerCase()) >= 0\n\nPhone = (I={}) ->\n  self =\n    age: Observable(I.age)\n    imageUrl: Observable(I.imageUrl)\n    name: Observable(I.name)\n    snippet: Observable(I.snippet)\n    matchSearch: ->\n      \"hidden\" unless includes(self.name(), search())\n\nphones = Observable(data.phones.map(Phone))\n\nmodel =\n  sortBy: sortBy\n  sortOptions: sortOptions\n  search: search\n  phones: phones\n  sorted: ->\n    val = @sortBy()?.value\n\n    if val is \"name\"\n      @phones().sort(compareName)\n    else if val is \"age\"\n      @phones().sort(compareAge)\n    else\n      @phones()",
    template: "%label\n  Search:\n  %input(type=\"text\" value=@search)\n%label\n  Sort by:\n  %select(value=@sortBy options=@sortOptions)\n%ul\n  -each @sorted, ->\n    %li.phone(class=@matchSearch)\n      %img(src=@imageUrl)\n      .name= @name\n      .description= @snippet",
    competitorName: "Angular JS",
    competitorUrl: "",
    header: "Kill Complexity",
    description: "Don't bother with overly complicated frameworks and still create robust interactive experiences. Compare the Hamlet version with a 12 part Angular JS tutorial for filtered lists.",
    selector: "#filtered-list"
  });

  examples.push(markdownEditor, todo, shoppingCart, emailClient, filteredList);

  examples()[4].active(true);

  $("#navigation").template({
    items: examples
  });

  examples.forEach(function(e) {
    $(e.selector).html(JST.example(e));
    e.configureEditors();
    return e.build();
  });

}).call(this);
