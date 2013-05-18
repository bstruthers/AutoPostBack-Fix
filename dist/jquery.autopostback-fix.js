/*! ASP.NET AutoPostBack Fix - v0.1.0 - 2013-05-17
* https://github.com/bstruthers/AutoPostBack-Fix
* Copyright (c) 2013 Ben Struthers; Licensed MIT */
// Ensure namespace
if (typeof bstruthers === 'undefined') { var bstruthers = {}; }

(function (document, namespace) {
    'use strict';
    namespace = namespace || window;

    namespace.AutoPostBackHandler = (function (document) {
        var // Private
            element,
            form,
            originalOnChange,
            originalValue,
            
            BLUR     = 'blur',
            CLICK    = 'click',
            KEYPRESS = 'keypress',
            ONCHANGE = 'onchange',

            listening,
            addEventListener,
            addEventListeners,
            removeEventListener,
            removeEventListeners,
            destroy,

            // Event handlers
            blurOrClick,
            keypress,

            // Public
            autoPostBackHandler;


        // Private
        // ================================
        addEventListener = function (element, eventType, handler) {
            if (element.addEventListener) {
                element.addEventListener(eventType, handler, false);
            } else { // IE <=8
                element.attachEvent('on' + eventType, handler);
            }
        };

        removeEventListener = function (element, eventType, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(eventType, handler, false);
            } else { // IE <=8
                element.detachEvent('on' + eventType, handler);
            }
        };

        addEventListeners = function () {
            if (!listening) {
                addEventListener(element, BLUR, blurOrClick);
                addEventListener(element, CLICK, blurOrClick);
                addEventListener(element, KEYPRESS, keypress);

                listening = true;
            }
        };

        removeEventListeners = function () {
            if (listening) {
                removeEventListener(element, BLUR, blurOrClick);
                removeEventListener(element, CLICK, blurOrClick);
                removeEventListener(element, KEYPRESS, keypress);

                listening = false;
            }
        };

        destroy = function () {
            if (element.setAttribute) {
                element.setAttribute(ONCHANGE, originalOnChange);
            } else {
                element[ONCHANGE] = originalOnChange.value;
            }
            removeEventListeners();
        };


        // Event handlers
        // ================================
        blurOrClick = function () {
            if (element.value !== originalValue) {
                form.submit();
            }
        };

        keypress = function (event) {
            var ev  = event || window.event,
                key = ev.keyCode || ev.which || ev.charCode;

            if (key === 13 && form) {
                if (ev.preventDefault) {
                    ev.preventDefault();
                } else {
                    ev.returnValue = false;
                }

                form.submit();
            }
        };


        // Public
        // ================================
        autoPostBackHandler = function (elem) {
            element = elem;
            form = document.forms[0]; // Assumed 1 form, this is for ASP.NET after all

            // Store the current value
            originalValue = element.value;

            // Remove the ASP.NET onchange
            originalOnChange = element.getAttribute(ONCHANGE);
            element.removeAttribute(ONCHANGE);
            
            if (typeof element.getAttribute(ONCHANGE) === 'function') {
                element[ONCHANGE] = null; // IE7 cannot remove event handlers http://www.quirksmode.org/dom/w3c_core.html#t118
            }

            // Add our own event listeners
            addEventListeners();
        };

        autoPostBackHandler.prototype = {
            constructor: autoPostBackHandler,
            disable: removeEventListeners,
            enable: addEventListeners,
            destroy: destroy
        };

        return autoPostBackHandler;
    } (document));
} (document, bstruthers));

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
