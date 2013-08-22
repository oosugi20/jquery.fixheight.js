/*!
 * jquery.fixheight.js (https://github.com/oosugi20/jquery.fixheight.js)
 * フロートしたカラムの高さを揃える。
 * Author: Makoto OOSUGI (oosugi20@gmail.com)
 * License: MIT
 * Copyright (c) 2013 Makoto OOSUGI
 */
;(function ($, window, undefined) {
'use script';

var MODULE_NAME = 'Fixheight';
var PLUGIN_NAME = 'fixheight';
var Module;

/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
		unitSelector: null,
		targetSelector: null,
		isParentDivided: false // 親カラムを横並びにしている場合にtrue
	}, options);
};

(function (fn) {
	/**
	 * fn.init
	 */
	fn.init = function () {
		this._prepareElms();
		this.refresh();
		return this;
	};

	/**
	 * fn._prepareElms
	 */
	fn._prepareElms = function () {
		var unitSelector = this.options.unitSelector;
		var targetSelector = this.options.targetSelector;
		this.$unit = this.$el.find(unitSelector);
		this.$target = this.$el.find(targetSelector);
		return this;
	};

	/**
	 * fn._colLength
	 * コンテナの幅といちユニットの幅から、
	 * 一段のカラム数を割り出し、返す。
	 * @return {Number} 一段のカラム数
	 */
	fn._colLength = function () {
		var containerW = this.$el.outerWidth(); // minus margin があるときに outerWidth(true) だと合わなくなる
		var unitW = this.$unit.outerWidth(true);
		return Math.floor(containerW / unitW);
	};

	/**
	 * fn._setRows
	 * ユニットを一行ごとのまとまりにする。
	 */
	fn._setRows = function () {
		var isParentDivided = this.options.isParentDivided;
		var i, l, ii, ll, start, end;
		this.rows = [];
		if (isParentDivided) {
			for (i = 0, l = this.rowLength; i < l; i += 1) {
				this.rows[i] = $([]);
				for (ii = 0, ll = this.rowLength * this.colLength; ii < ll; ii += this.rowLength) {
					this.rows[i] = this.rows[i].add(this.$unit.eq(i + ii));
				}
			}
		} else {
			for (i = 0, l = this.rowLength; i < l; i += 1) {
				start = this.colLength * i;
				end = start + this.colLength;
				this.rows[i] = this.$unit.slice(start, end);
			}
		}
		return this;
	};

	/**
	 * fn._maxHeight
	 * 一行の一番大きいターゲット要素の高さを返す。
	 * @param {jQuery Object} 一行のjQuery Object
	 * @return {Number} 最大の高さ
	 */
	fn._maxHeight = function ($row) {
		var targetSelector = this.options.targetSelector;
		var r = 0, i, $r;
		for (i = 0; i < this.colLength; i += 1) {
			r = Math.max(r, $row.eq(i).find(targetSelector).height());
		}
		return r;
	}

	/**
	 * fn.refresh
	 */
	fn.refresh = function () {
		var targetSelector = this.options.targetSelector;
		var i;
		this.colLength = this._colLength();
		if (!this.colLength) {
			// 非表示等でcolLengthが取れない場合は抜ける
			return;
		}
		this.rowLength = Math.ceil(this.$unit.length / this.colLength);
		this._setRows();
		this.$target.height('auto');
		for (i = 0; i < this.rows.length; i += 1) {
			this.rows[i].find(targetSelector).height(this._maxHeight(this.rows[i]));
		}
		return this;
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	return this.each(function () {
		var module;
		module = new Module(this, options);
		$.data(this, PLUGIN_NAME, module);
		module.init();
	});
};

// set global
$[MODULE_NAME] = Module;

})(jQuery, this);
