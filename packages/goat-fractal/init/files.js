module.exports = {
  files: [
    {
      name: 'baseStyling.css',
      destination: '.goat/styleguide/', 
      data: `.goat-swatches__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
}

.goat-swatches__list-item {
  flex-basis: 20%;
  min-width: 80px;
  flex-grow: 0;
  flex-shrink: 1;
  height: 220px;
  padding: 20px;
}

.goat-swatches__item-content {
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  box-shadow: 0 0 10px #ccc;
}

.goat-swatches__info {
  background-color: white;
  padding: 15px;
  width: 100%;
}`,
    },
    {
      name: 'imports.twig',
      destination: '.goat/styleguide/',
      data: `<link media="all" rel="stylesheet" href="{{ '../../.goat/styleguide/baseStyling.css' | path }}">`,
    },
    {
      name: 'fractalOverrides.css',
      destination: '.goat/styleguide/',
      data: ``,
    },
    {
      name: 'swatch.twig',
      destination: '.goat/styleguide/goatComponents',
      data: `<div
  class="goat-swatches__item-content"
  style="background-color: {{color}};"
> 
  <div class="goat-swatches__info">
    <span class="sg-swatch-hex">{{color}}</span> <br/>
    <code class="sg-swatch-variable">{{name}}</code>
  </div>
</div>`,
    },
    {
      name: 'colors.twig',
      destination: '.goat/styleguide/goatComponents',
      data: `<div class="goat-swatches">
  <ul class="goat-swatches__list goat-swatches__list--colors">
    {% for item in colors %}
      <li class="goat-swatches__list-item">
        {% include '@goat/swatch.twig' with {
          color: item.value,
          name: item.name,
        }%}
      </li>
    {% endfor %}
  </ul>
</div>
`,
    }
  ]
}