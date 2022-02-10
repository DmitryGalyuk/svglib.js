# svglib.js
JavaScript library to dynamically load the content of SVG graphics without bloating the html page

Example

```html
  <script src="svglib.js"></script>
  <svg src="icons/myIcon.svg" class="iconClass"></svg>
```

Use **src** attribure to point the location of svg file.
All the attributes specified in **svg** tag will override the values in referenced file.
Library scans all **svg** tags of the document on load to add the content and registers observer to populate all the svg tags added by scripts.
