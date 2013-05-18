/*
 * autopostback-fix
 * https://github.com/bstruthers/AutoPostBack-Fix
 *
 * Copyright (c) 2013 Ben Struthers
 * Licensed under the MIT license.
 */
 
(function ($, AutoPostBackHandler) {
    'use strict';
    
    $.widget('bstruthers.autoPostBack', {
        _create: function () {
            // Create the handler
            this.handler = new AutoPostBackHandler(this.element[0]);
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
} (jQuery, bstruthers.AutoPostBackHandler));
