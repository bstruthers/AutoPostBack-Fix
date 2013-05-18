/*! ASP.NET AutoPostBack Fix - v0.1.0 - 2013-05-17
* https://github.com/bstruthers/AutoPostBack-Fix
* Copyright (c) 2013 Ben Struthers; Licensed MIT */
// Ensure namespace
if (typeof bstruthers === 'undefined') { var bstruthers = {}; }

(function (document, namespace) {
    'use strict';
    namespace = namespace || window;

    namespace.AutoPostBackFix = (function (document) {
        var // Private
            form, // Let form be shared across all instances
            
            BLUR     = 'blur',
            CLICK    = 'click',
            KEYPRESS = 'keypress',
            ONCHANGE = 'onchange',

            addEventListener,
            addEventListeners,
            removeEventListener,
            removeEventListeners,
            destroy,

            // Shared Event handlers
            keypress,

            // Public
            autoPostBackFix;

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
            if (!this.listening) {
                addEventListener(this.element, BLUR, this.blurOrClick);
                addEventListener(this.element, CLICK, this.blurOrClick);
                addEventListener(this.element, KEYPRESS, keypress);

                this.listening = true;
            }
        };

        removeEventListeners = function () {
            if (this.listening) {
                removeEventListener(this.element, BLUR, this.blurOrClick);
                removeEventListener(this.element, CLICK, this.blurOrClick);
                removeEventListener(this.element, KEYPRESS, keypress);

                this.listening = false;
            }
        };

        destroy = function () {
            if (this.element.setAttribute) {
                this.element.setAttribute(ONCHANGE, this.originalOnChange);
            } else {
                this.element[ONCHANGE] = this.originalOnChange.value;
            }
            removeEventListeners.apply(this);
        };


        // Global Event handlers
        // ================================
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
        autoPostBackFix = function (elem) {
            var that = this;

            form = document.forms[0]; // Assumed 1 form, this is for ASP.NET after all

            that.element = elem;
            
            // Store the current value
            that.originalValue = that.element.value;

            // Remove the ASP.NET onchange
            that.originalOnChange = that.element.getAttribute(ONCHANGE);
            that.element.removeAttribute(ONCHANGE);
            
            if (typeof that.element.getAttribute(ONCHANGE) === 'function') {
                that.element[ONCHANGE] = null; // IE7 cannot remove event handlers http://www.quirksmode.org/dom/w3c_core.html#t118
            }

            // Private Event handler
            this.blurOrClick = function () {
                if (that.element.value !== that.originalValue && form) {
                    form.submit();
                }
            };

            // Add our own event listeners
            that.listening = false;
            addEventListeners.apply(that);
        };

        autoPostBackFix.prototype = {
            disable: removeEventListeners,
            enable: addEventListeners,
            destroy: destroy
        };

        return autoPostBackFix;
    } (document));
} (document, bstruthers));
