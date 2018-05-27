var MyBundle = (function () {
    'use strict';

    function extend(target, source) {
        for (var key in source) {
            target[key] = source[key];
        }
    }

    function trim(x) {
        return x.replace(/^[\r\n]+/, '').replace(/[\r\n]+$/, '');
    }

    function isContains(str, substr) {
        return new RegExp(substr).test(str);
    }

    // dom

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    // import data from './data'
    var Find = function () {
        function Find(wrapper, scroller, options) {
            _classCallCheck(this, Find);

            this.$wrapper = typeof wrapper === 'string' ? $(wrapper) : wrapper;
            this.$scroller = typeof scroller === 'string' ? $(scroller) : scroller;
            this.options = {
                form: '#formFind',
                text: '#textFind'
            };
            extend(this.options, options);

            var formFind = this.options.form;
            this.$formFind = typeof formFind === 'string' ? $(formFind) : formFind;
            var textFind = this.options.text;
            this.$textFind = typeof textFind === 'string' ? $(textFind) : textFind;

            this._init();
        }

        Find.prototype._init = function _init() {
            self = this;

            this.stack = [];
            this.stackIndex = 0;

            this.$treeTitle = $('#advisorTreeVendorPanel .tree-title');

            this._addEvents();
        };

        Find.prototype._addEvents = function _addEvents() {
            this.$textFind.on('change', this._handleEvent);
            this.$formFind.on('submit', this._handleEvent);
        };

        Find.prototype._handleEvent = function _handleEvent(event) {
            switch (event.type) {
                case 'change':
                    self.onSearch(event);
                    break;
                case 'submit':
                    event.preventDefault();
                    self.move(event);
                    break;
            }
        };

        Find.prototype.onSearch = function onSearch() {
            // reset
            this.stack = [];
            this.stackIndex = -1;

            var val = this.$textFind.val();
            console.log(val);

            if (val != '') {
                this.$treeTitle.each(function (index, domEle) {
                    var str = trim($(domEle).text()).toLowerCase();
                    var substr = trim(val).toLowerCase();
                    if (isContains(str, substr)) {
                        self.stack.push(domEle);
                    }
                });
            }

            this.render();
            this.move();
        };

        Find.prototype.render = function render(event) {
            $('.find-item').removeClass('find-item');
            $('.find-item-active').removeClass('find-item-active');

            $.each(this.stack, function (index, item) {
                $(item).addClass('find-item');
            });
        };

        Find.prototype.move = function move(event) {

            if (!this.stack[0]) {
                return;
            }

            this.stackIndex < this.stack.length - 1 ? ++this.stackIndex : this.stackIndex = 0;

            $('.find-item-active').removeClass('find-item-active');
            $(this.stack[this.stackIndex]).addClass('find-item-active');

            var deltaTop = $(this.stack[this.stackIndex]).offset().top - this.$wrapper.offset().top;
            if (deltaTop < 0 || deltaTop >= this.$wrapper.height()) {
                console.log(deltaTop);
                this.$wrapper.scrollTop($(this.stack[this.stackIndex]).position().top);
            }
        };

        return Find;
    }();

    window.Find = Find;

    return Find;

}());
//# sourceMappingURL=find.js.map