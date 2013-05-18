# ASP.NET AutoPostBack Fix

Fixes keyboard usability issues with the ASP.NET DropDown control when the AutoPostBack property is set to true

## Getting Started

AutoPostBack Fix supports both Vanilla JS and jQuery.

### Vanilla JS
Download the [production version][vanilla-min] or the [development version][vanilla-max].

[vanilla-min]: https://raw.github.com/bstruthers/AutoPostBack-Fix/master/dist/autopostback-fix.min.js
[vanilla-max]: https://raw.github.com/bstruthers/AutoPostBack-Fix/master/dist/autopostback-fix.js

In your web page:

```html
<script src="dist/autopostback-fix.min.js"></script>
<script>
    var list = document.getElementById('ddlList'),
        listHander = new bstruthers.AutoPostBackFix(list);
</script>
```

### jQuery Plugin
Download the [production version][jquery-min] or the [development version][jquery-max].

[jquery-min]: https://raw.github.com/bstruthers/AutoPostBack-Fix/master/dist/jquery.autopostback-fix.min.js
[jquery-max]: https://raw.github.com/bstruthers/AutoPostBack-Fix/master/dist/jquery.autopostback-fix.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.autopostback-fix.min.js"></script>
<script>
jQuery(function($) {
    $('#ddlList').autoPostBackFix();
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
