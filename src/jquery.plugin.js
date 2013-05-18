/*
 * autopostback-fix
 * https://github.com/bstruthers/AutoPostBack-Fix
 *
 * Copyright (c) 2013 Ben Struthers
 * Licensed under the MIT license.
 */
 
(function ($, AutoPostBackFix) {
    'use strict';
    
    $.widget('bstruthers.autoPostBackFix', {
        _create: function () {
            // Create the handler
            this.handler = new AutoPostBackFix(this.element[0]);
        },

        _destroy: function () {
            this.handler.destroy();
        },
        
        enable: function () {
            this.handler.enable();
        },
        
        disable: function () {
            this.handler.disable();
        }
    });
} (jQuery, bstruthers.AutoPostBackFix));
