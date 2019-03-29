"use strict";

/**
 * Sino Ztree
 *
 * Version: v1.0.2
 * Date: 2019-03-29
 */

var sinoZtree = { rootId: "137406" };document.onkeydown = function () {
  27 == event.keyCode && sinoZtree.publicEvt.disappear();
}, sinoZtree.garage = { masker: { tagName: "div", id: "sino-masker", class: "sino-masker" }, panel: function panel(e, t) {
    return { tagName: "div", class: "sino-transfer-panel", children: [{ tagName: "div", class: "sino-transfer-panel__header", children: [{ tagName: "span", text: t || ("left" === e ? "数据列表" : "已选列表") }, { tagName: "span", class: "sino-transfer-panel__header--extra", id: t ? "" : "left" === e ? "" : "header-extra", text: t ? "" : "left" === e ? "" : "（合计：0）" }] }, { tagName: "left" === e ? "div" : "", class: "sino-transfer-panel__search", children: [{ tagName: "input", class: "sino-search", id: "sino-search", type: "text", placeholder: "请输入搜索内容", autocomplete: "off", onkeyup: "sinoZtree.publicEvt.onSearch()" }, { tagName: "span", class: "sino-search__icon", children: [{ tagName: "span", class: "iconfont icon-sousuo" }] }, { tagName: "span", class: "sino-search__close", id: "sino-search-close", children: [{ tagName: "span", class: "iconfont icon-quxiao" }], event: { click: function click() {
              $("#sino-search").val(""), sinoZtree.publicEvt.onSearch();
            } } }] }, { tagName: "div", class: "sino-transfer-panel__body", children: [{ tagName: "div", class: "sino-loading", id: "left" === e ? "zTree-loading" : "sTree-loading", text: "暂无数据" }, { tagName: "ul", class: "ztree", id: "left" === e ? "zTree" : "sTree" }, { tagName: "left" === e ? "ul" : "", class: "ztree", id: "cTree" }] }] };
  }, body: function body(e) {
    return { tagName: "div", class: "sino-ztree__wrapper", id: "sino-ztree", children: [{ tagName: "div", class: "sino-ztree", children: [{ tagName: "div", class: "sino-ztree__header", children: [{ tagName: "div", class: "sino-ztree__title", children: [{ tagName: "span", id: "sino-header-title", text: e.title }] }, { tagName: "div", class: "sino-ztree__headerbtn", children: [{ tagName: "div", class: "sino-ztree__close", children: [{ tagName: "span", class: "iconfont icon-guanbi" }], event: { click: function click() {
                  sinoZtree.publicEvt.disappear();
                } } }] }] }, { tagName: "div", class: "sino-ztree__content", children: [{ tagName: "div", class: "sino-transfer", id: "sino-transfer", children: [] }] }, { tagName: "div", class: "sino-ztree__footer", children: [{ tagName: "div", class: "sino-ztree__content", children: [{ tagName: "div", class: "sino-left", children: [{ tagName: "span", class: "sino-text", text: "提示：双击即可取消已选" }] }, { tagName: "div", class: "sino-right", children: [{ tagName: "button", class: "sino-button sino-button--primary sino-button--small", text: "确定", event: { click: function click() {
                    sinoZtree.publicEvt.onConfirm();
                  } } }, { tagName: "button", class: "sino-button sino-button--small", text: "关闭", event: { click: function click() {
                    sinoZtree.publicEvt.disappear();
                  } } }] }] }] }] }] };
  } }, sinoZtree.creator = { archives: { excluder: ["tagName", "children", "text", "event"] }, create: function create(e) {
    if (e.tagName) {
      var t = document.createElement(e.tagName);for (var r in e) {
        -1 == sinoZtree.creator.archives.excluder.indexOf(r) && t.setAttribute(r, e[r]);
      }if (e.children) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = e.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _r = _step.value;
            var _e = sinoZtree.creator.create(_r);_e && t.appendChild(_e);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }if (e.text && (t.innerText = e.text), e.event) for (var _r2 in e.event) {
        t.addEventListener(_r2, e.event[_r2]);
      }return t;
    }
  } }, sinoZtree.publicEvt = { configure: {}, appear: function appear(e, t) {
    var r = sinoZtree.creator.create(sinoZtree.garage.masker);$("body").append(r), $("#sino-masker").hide().fadeIn("fast");var n = sinoZtree.creator.create(sinoZtree.garage.body(e));$("body").append(n), $("#sino-transfer").prepend(sinoZtree.creator.create(sinoZtree.garage.panel("left", t))), $("#sino-transfer").append(sinoZtree.creator.create(sinoZtree.garage.panel("right"))), $("#sino-ztree").hide().fadeIn("fast");
  }, disappear: function disappear() {
    $("#sino-ztree").fadeOut("fast", function () {
      $(this).remove();
    }), $("#sino-masker").fadeOut("fast", function () {
      $(this).remove();
    });
  }, init: function init(e, t) {
    if (!e) return void alert("cfs 参数错误");if (!e.result) return void alert("cfs.result 参数错误");if (!e.config) return void alert("cfs.config 参数错误");if (!e.config.url) return void alert("cfs.config.url 参数错误");var r = "";if ("dept" === e.config.type) r = "公司部门列表", sinoZtree.ztree.zSettings.check.chkboxType = { N: "", Y: "" }, sinoZtree.ztree.cSettings.check.chkboxType = { N: "", Y: "" };else {
      if ("user" !== e.config.type) return void alert("cfs.config.type 参数错误");r = "用户列表", sinoZtree.ztree.zSettings.check.chkboxType = { N: "ps", Y: "ps" }, sinoZtree.ztree.cSettings.check.chkboxType = { N: "ps", Y: "ps" };
    }e.model && e.model.title || (e.model.title = "dept" === e.config.type ? "选择部门" : "选择用户");var n = sinoZtree.publicEvt.configure.showParent;e.config.rootId && e.config.rootId !== sinoZtree.rootId && n ? e.config.rootId = e.config.rootId.substring(0, e.config.rootId.length - 3) : e.config.rootId = sinoZtree.rootId;var i = parseInt(e.config.max, 10) || 0;(0 === i || i > 500) && (e.config.max = 500), sinoZtree.publicEvt.appear(e.model, r), sinoZtree.publicEvt.configure = { result: e.result, url: e.config.url, type: e.config.type, rootId: e.config.rootId, max: e.config.max, showLeader: !1 !== e.config.showLeader, showCompany: !1 !== e.config.showCompany, showParent: !1 !== e.config.showParent, hideNodes: e.config.hideNodes || "", callback: t }, $.fn.zTree.init($("#zTree"), sinoZtree.ztree.zSettings, null);
  }, onSearch: function onSearch() {
    if ("" !== $("#sino-search").val()) {
      var e = $.fn.zTree.getZTreeObj("zTree").getNodesByParamFuzzy("name", $("#sino-search").val());for (var t = 0; t < e.length; t++) {
        if (t > 0) for (var r = 0; r < t; r++) {
          e[r] && JSON.stringify(e[r]).indexOf(JSON.stringify(e[t])) > 0 && delete e[t];
        }
      }$.fn.zTree.init($("#cTree"), sinoZtree.ztree.cSettings, e), $("#cTree").show(), $("#zTree").hide(), $("#sino-search-close").show();
    } else $("#cTree").hide(), $("#zTree").show(), $("#sino-search-close").hide();
  }, onConfirm: function onConfirm() {
    var e = $.fn.zTree.getZTreeObj("sTree").getNodes(),
        t = {};if (e) {
      var r = {};for (var _t = 0; _t < e.length; _t++) {
        for (var n in sinoZtree.publicEvt.configure.result) {
          r[n] || (r[n] = []), e[_t].hasOwnProperty(n) && r[n].push(e[_t][n].toString());
        }
      }for (var _e2 in sinoZtree.publicEvt.configure.result) {
        sinoZtree.publicEvt.configure.callback ? t[_e2] = r[_e2].toString() : $("#" + sinoZtree.publicEvt.configure.result[_e2]).val(r[_e2].toString());
      }
    } else for (var _e3 in sinoZtree.publicEvt.configure.result) {
      sinoZtree.publicEvt.configure.callback ? t[_e3] = "" : $("#" + sinoZtree.publicEvt.configure.result[_e3]).val("");
    }sinoZtree.publicEvt.configure.callback && sinoZtree.publicEvt.configure.callback(t), sinoZtree.publicEvt.disappear();
  } }, sinoZtree.ztree = { storage: [], selecteds: [], funcs: { sieve: function sieve(e) {
      e.children ? e.children.map(function (e, t) {
        sinoZtree.ztree.funcs.sieve(e);
      }) : sinoZtree.ztree.storage.push(e);
    } }, zSettings: { check: { enable: !0 }, data: { simpleData: { enable: !0, idKey: "id", pIdKey: "parentId", rootPId: sinoZtree.publicEvt.configure.rootId } }, async: { enable: !0, url: function url() {
        return sinoZtree.publicEvt.configure.url + "?rootId=" + sinoZtree.publicEvt.configure.rootId;
      }, autoParam: ["id"] }, callback: { beforeCheck: function beforeCheck(e, t) {
        var r = sinoZtree.publicEvt.configure.max;if (r) {
          if (t.checked) return !0;var _e4 = $.fn.zTree.getZTreeObj("sTree").getNodes();if (sinoZtree.ztree.storage.length = 0, "user" === sinoZtree.publicEvt.configure.type ? sinoZtree.ztree.funcs.sieve(t) : sinoZtree.ztree.storage.push(t), (_e4 ? _e4.length : 0) + sinoZtree.ztree.storage.length > r) return alert("当前最大可选数量：" + r), !1;
        }
      }, onCheck: function onCheck(e, t, r) {
        var n = $.fn.zTree.getZTreeObj("sTree");sinoZtree.ztree.storage.length = 0, "user" === sinoZtree.publicEvt.configure.type ? sinoZtree.ztree.funcs.sieve(r) : sinoZtree.ztree.storage.push(r), sinoZtree.ztree.storage.map(function (e, t) {
          if (e.checked) n.addNodes(null, { id: e.id, parentId: e.parentId, name: e.name, iconSkin: sinoZtree.publicEvt.configure.type });else {
            var _t2 = n.getNodeByParam("id", e.id);n.removeNode(_t2);
          }
        });var i = n.getNodes() ? n.getNodes().length : 0;i ? ($("#sTree").show(), $("#sTree-loading").hide()) : ($("#sTree").hide(), $("#sTree-loading").show()), $("#header-extra").text("\uFF08\u5408\u8BA1\uFF1A" + i + "\uFF09");
      }, onAsyncSuccess: function onAsyncSuccess(e, t, r, n) {
        var i = $.fn.zTree.getZTreeObj("zTree"),
            o = i.transformToArray(i.getNodes());for (var _e5 = 0; _e5 < o.length; _e5++) {
          o[_e5].iconSkin || ("user" === sinoZtree.publicEvt.configure.type ? o[_e5].isParent ? o[_e5].iconSkin = "deptu" : o[_e5].iconSkin = "user" : "0" === o[_e5].fromUnit ? o[_e5].iconSkin = "depts" : "1" === o[_e5].fromUnit && (o[_e5].iconSkin = "dept"), o[_e5].id === sinoZtree.rootId && (o[_e5].iconSkin = "root"), i.updateNode(o[_e5]));
        }sinoZtree.ztree.selecteds = [];for (var _e6 in sinoZtree.publicEvt.configure.result) {
          var _t3 = $("#" + sinoZtree.publicEvt.configure.result[_e6]).val();if (_t3) {
            var _r3 = _t3.split(",");for (var _t4 = 0; _t4 < _r3.length; _t4++) {
              sinoZtree.ztree.selecteds[_t4] || (sinoZtree.ztree.selecteds[_t4] = {}), sinoZtree.ztree.selecteds[_t4][_e6] = _r3[_t4], sinoZtree.ztree.selecteds[_t4].iconSkin = sinoZtree.publicEvt.configure.type;
            }
          }
        }for (var _e7 = 0; _e7 < sinoZtree.ztree.selecteds.length; _e7++) {
          var _t5 = i.getNodeByParam("id", sinoZtree.ztree.selecteds[_e7].id);_t5 && i.checkNode(_t5, !0, "user" === sinoZtree.publicEvt.configure.type);
        }if ($.fn.zTree.init($("#sTree"), sinoZtree.ztree.sSettings, sinoZtree.ztree.selecteds), sinoZtree.ztree.selecteds.length > 0 && ($("#sTree").show(), $("#sTree-loading").hide()), !sinoZtree.publicEvt.configure.showLeader) {
          var _e8 = i.getNodesByParamFuzzy("isZhc", "3");_e8 && i.hideNodes(_e8);
        }if (!sinoZtree.publicEvt.configure.showCompany) {
          var _e9 = i.getNodesByParam("parentId", sinoZtree.publicEvt.configure.rootId);for (var _t6 = 0; _t6 < _e9.length; _t6++) {
            var _r4 = i.getNodesByParam("parentId", _e9[_t6].id);for (var _e10 = 0; _e10 < _r4.length; _e10++) {
              "0" === _r4[_e10].fromUnit && i.hideNode(_r4[_e10]);
            }
          }
        }var s = sinoZtree.publicEvt.configure.hideNodes.split(",");for (var _e11 = 0; _e11 < s.length; _e11++) {
          var _t7 = i.getNodesByParamFuzzy("name", s[_e11]);_t7 && i.hideNodes(_t7);
        }$("#zTree").show(), $("#zTree-loading").hide();
      }, onAsyncError: function onAsyncError(e, t, r, n, i, o) {
        $("#zTree-loading").text("获取数据失败"), alert("获取数据失败");
      } } }, sSettings: { view: { showLine: !1 }, callback: { onDblClick: function onDblClick(e, t, r) {
        if (r) {
          var _e12 = $.fn.zTree.getZTreeObj("zTree"),
              _t8 = $.fn.zTree.getZTreeObj("cTree"),
              i = $.fn.zTree.getZTreeObj("sTree"),
              o = _e12.getNodeByParam("id", r.id);if (_e12.checkNode(o, !1, !0), i.removeNode(r, !1), _t8) {
            var _e13 = _t8.getNodesByParam("id", r.id);for (var _r5 = 0; _r5 < _e13.length; _r5++) {
              _t8.checkNode(_e13[_r5], !1, !0);
            }
          }var n = i.getNodes();n && 0 !== n.length || ($("#sTree").hide(), $("#sTree-loading").show()), $("#header-extra").text("\uFF08\u5408\u8BA1\uFF1A" + n.length + "\uFF09");
        }
      } } }, cSettings: { check: { enable: !0 }, view: { showLine: !1 }, callback: { beforeCheck: function beforeCheck(e, t) {
        var r = sinoZtree.publicEvt.configure.max;if (r) {
          if (t.checked) return !0;var _e14 = $.fn.zTree.getZTreeObj("sTree").getNodes();if (sinoZtree.ztree.storage.length = 0, "user" === sinoZtree.publicEvt.configure.type ? sinoZtree.ztree.funcs.sieve(t) : sinoZtree.ztree.storage.push(t), (_e14 ? _e14.length : 0) + sinoZtree.ztree.storage.length > r) return alert("当前最大可选数量：" + r), !1;
        }
      }, onCheck: function onCheck(e, t, r) {
        var n = $.fn.zTree.getZTreeObj("sTree"),
            i = $.fn.zTree.getZTreeObj("zTree");sinoZtree.ztree.storage.length = 0, "user" === sinoZtree.publicEvt.configure.type ? sinoZtree.ztree.funcs.sieve(r) : sinoZtree.ztree.storage.push(r), sinoZtree.ztree.storage.map(function (e, t) {
          if (e.checked) {
            n.addNodes(null, { id: e.id, parentId: e.parentId, name: e.name, iconSkin: sinoZtree.publicEvt.configure.type });var _t9 = i.getNodeByParam("id", e.id);_t9 && i.checkNode(_t9, !0, "user" === sinoZtree.publicEvt.configure.type);
          } else {
            var _t10 = n.getNodeByParam("id", e.id);n.removeNode(_t10);var _r6 = i.getNodeByParam("id", e.id);_r6 && i.checkNode(_r6, !1, "user" === sinoZtree.publicEvt.configure.type);
          }
        });var o = n.getNodes() ? n.getNodes().length : 0;o ? ($("#sTree").show(), $("#sTree-loading").hide()) : ($("#sTree").hide(), $("#sTree-loading").show()), $("#header-extra").text("\uFF08\u5408\u8BA1\uFF1A" + o + "\uFF09");
      } } } };
