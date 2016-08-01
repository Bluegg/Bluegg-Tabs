'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Tabs
 * * * * * * * * * * * * * * * * * * * * *
 */

var Tabs = function () {
	function Tabs(el, selectedIndex) {
		_classCallCheck(this, Tabs);

		if (!el) {
			return;
		}

		this.el = el;
		this.tabTriggers = this.el.getElementsByClassName('js-tab-trigger');
		this.tabPanels = this.el.getElementsByClassName('js-tab-panel');

		if (this.tabTriggers.length === 0 || this.tabTriggers.length !== this.tabPanels.length) {
			return;
		}

		this._init(selectedIndex);
	}

	_createClass(Tabs, [{
		key: '_init',
		value: function _init(selectedIndex) {

			this.tabTriggersLength = this.tabTriggers.length;
			this.selectedTab = 0;
			this.prevSelectedTab = null;
			this.clickListener = this._clickEvent.bind(this);
			this.keydownListener = this._keydownEvent.bind(this);
			this.keys = {
				prev: 37,
				next: 39
			};

			for (var i = 0; i < this.tabTriggersLength; i++) {
				this.tabTriggers[i].index = i;
				this.tabTriggers[i].addEventListener('click', this.clickListener, false);
				this.tabTriggers[i].addEventListener('keydown', this.keydownListener, false);

				if (this.tabTriggers[i].classList.contains('is-selected')) {
					this.selectedTab = i;
				}
			}

			if (!isNaN(selectedIndex)) {
				this.selectedTab = selectedIndex < this.tabTriggersLength ? selectedIndex : this.tabTriggersLength - 1;
			}

			this.selectTab(this.selectedTab);
			this.el.classList.add('is-initialized');
		}
	}, {
		key: '_clickEvent',
		value: function _clickEvent(e) {

			e.preventDefault();

			if (e.target.index === this.selectedTab) {
				return;
			}

			this.selectTab(e.target.index, true);
		}
	}, {
		key: '_keydownEvent',
		value: function _keydownEvent(e) {

			var targetIndex;

			if (e.keyCode === this.keys.prev || e.keyCode === this.keys.next) {
				e.preventDefault();
			} else {
				return;
			}

			if (e.keyCode === this.keys.prev && e.target.index > 0) {
				targetIndex = e.target.index - 1;
			} else if (e.keyCode === this.keys.next && e.target.index < this.tabTriggersLength - 1) {
				targetIndex = e.target.index + 1;
			} else {
				return;
			}

			this.selectTab(targetIndex, true);
		}
	}, {
		key: '_show',
		value: function _show(index, userInvoked) {

			this.tabTriggers[index].classList.add('is-selected');
			this.tabTriggers[index].setAttribute('aria-selected', true);
			this.tabTriggers[index].setAttribute('tabindex', 0);

			this.tabPanels[index].classList.remove('is-hidden');
			this.tabPanels[index].setAttribute('aria-hidden', false);
			this.tabPanels[index].setAttribute('tabindex', 0);

			if (userInvoked) {
				this.tabTriggers[index].focus();
			}
		}
	}, {
		key: '_hide',
		value: function _hide(index) {

			this.tabTriggers[index].classList.remove('is-selected');
			this.tabTriggers[index].setAttribute('aria-selected', false);
			this.tabTriggers[index].setAttribute('tabindex', -1);

			this.tabPanels[index].classList.add('is-hidden');
			this.tabPanels[index].setAttribute('aria-hidden', true);
			this.tabPanels[index].setAttribute('tabindex', -1);
		}
	}, {
		key: 'selectTab',
		value: function selectTab(index, userInvoked) {

			if (this.prevSelectedTab === null) {
				for (var i = 0; i < this.tabTriggersLength; i++) {
					if (i !== index) {
						this._hide(i);
					}
				}
			} else {
				this._hide(this.selectedTab);
			}

			this.prevSelectedTab = this.selectedTab;
			this.selectedTab = index;

			this._show(this.selectedTab, userInvoked);
		}
	}, {
		key: 'destroy',
		value: function destroy() {

			for (var i = 0; i < this.tabTriggersLength; i++) {
				this.tabTriggers[i].classList.remove('is-selected');
				this.tabTriggers[i].removeAttribute('aria-selected');
				this.tabTriggers[i].removeAttribute('tabindex');

				this.tabPanels[i].classList.remove('is-hidden');
				this.tabPanels[i].removeAttribute('aria-hidden');
				this.tabPanels[i].removeAttribute('tabindex');

				this.tabTriggers[i].removeEventListener('click', this.clickListener, false);
				this.tabTriggers[i].removeEventListener('keydown', this.keydownListener, false);

				delete this.tabTriggers[i].index;
			}

			this.el.classList.remove('is-initialized');
		}
	}]);

	return Tabs;
}();

exports.default = Tabs;