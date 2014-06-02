set :css_dir, "stylesheets"
set :js_dir, "javascripts"
set :images_dir, "images"

# Build-specific configuration
configure :build do
  ignore "templates/*.haml"
  ignore "images/sprites/*.png"

  activate :minify_css
  activate :minify_javascript
end
