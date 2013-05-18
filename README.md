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
    var list       = document.getElementById('ddlList'),
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

### constructor

Removes the onchange attribute so keyboard navigation is possible and attaches event handlers that submit the form when the value has changed via clicking, blur, or the enter key is pressed.

__Vanilla JS__: ```listHander = new bstruthers.AutoPostBackFix(list);```

__jQuery:__ ```$('#ddlList').autoPostBackFix();```

### enable()

Attaches event handlers if they're not already attached.

__Vanilla JS__: ```listHander.enable();```

__jQuery:__ ```$('#ddlList').autoPostBackFix('enable');```

### disable()

Removes added event handlers.

__Vanilla JS__: ```listHander.disable();```

__jQuery:__ ```$('#ddlList').autoPostBackFix('disable');```

### destroy()

Removes added event handlers and restores original onclick attribute.

__Vanilla JS__: ```listHander.destroy();```

__jQuery:__ ```$('#ddlList').autoPostBackFix('destroy');```

## Examples
_(Coming soon)_

## Release History

### 0.1.0 (May 17, 2013)

- Initial version & commit to repository
