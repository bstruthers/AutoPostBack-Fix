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

        destroy: function () {
            // In jQuery UI 1.8, you must invoke the destroy method from the base widget
            $.Widget.prototype.destroy.call(this);
            // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method

            this._destroy();
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
