'use strict';

/**
 * Sino Ztree
 *
 * Version: v1.0.2
 * Date: 2019-03-29
 */
var sinoZtree = {};

// 顶级公司 / 部门 id
sinoZtree.rootId = '137406';

// 按 ESC 键关闭树窗口
document.onkeydown = function () {
  if (event.keyCode == 27) {
    sinoZtree.publicEvt.disappear();
  }
};
sinoZtree.garage = {
  masker: {
    tagName: 'div',
    id: 'sino-masker',
    class: 'sino-masker'
  },
  panel: function panel(type, title) {
    return {
      tagName: 'div',
      class: 'sino-transfer-panel',
      children: [{
        tagName: 'div',
        class: 'sino-transfer-panel__header',
        children: [{
          tagName: 'span',
          text: title ? title : type === 'left' ? '数据列表' : '已选列表'
        }, {
          tagName: 'span',
          class: 'sino-transfer-panel__header--extra',
          id: title ? '' : type === 'left' ? '' : 'header-extra',
          text: title ? '' : type === 'left' ? '' : '（合计：0）'
        }]
      }, {
        tagName: type === 'left' ? 'div' : '',
        class: 'sino-transfer-panel__search',
        children: [{
          tagName: 'input',
          class: 'sino-search',
          id: 'sino-search',
          type: 'text',
          placeholder: '请输入搜索内容',
          autocomplete: 'off',
          onkeyup: 'sinoZtree.publicEvt.onSearch()'
        }, {
          tagName: 'span',
          class: 'sino-search__icon',
          children: [{
            tagName: 'span',
            class: 'iconfont icon-sousuo'
          }]
        }, {
          tagName: 'span',
          class: 'sino-search__close',
          id: 'sino-search-close',
          children: [{
            tagName: 'span',
            class: 'iconfont icon-quxiao'
          }],
          event: {
            click: function click() {
              $('#sino-search').val('');
              sinoZtree.publicEvt.onSearch();
            }
          }
        }]
      }, {
        tagName: 'div',
        class: 'sino-transfer-panel__body',
        children: [{
          tagName: 'div',
          class: 'sino-loading',
          id: type === 'left' ? 'zTree-loading' : 'sTree-loading',
          text: '暂无数据'
        }, {
          tagName: 'ul',
          class: 'ztree',
          id: type === 'left' ? 'zTree' : 'sTree'
        }, {
          tagName: type === 'left' ? 'ul' : '',
          class: 'ztree',
          id: 'cTree'
        }]
      }]
    };
  },
  body: function body(model) {
    return {
      tagName: 'div',
      class: 'sino-ztree__wrapper',
      id: 'sino-ztree',
      children: [{
        tagName: 'div',
        class: 'sino-ztree',
        children: [{
          tagName: 'div',
          class: 'sino-ztree__header',
          children: [{
            tagName: 'div',
            class: 'sino-ztree__title',
            children: [{
              tagName: 'span',
              id: 'sino-header-title',
              text: model.title
            }]
          }, {
            tagName: 'div',
            class: 'sino-ztree__headerbtn',
            children: [{
              tagName: 'div',
              class: 'sino-ztree__close',
              children: [{
                tagName: 'span',
                class: 'iconfont icon-guanbi'
              }],
              event: {
                click: function click() {
                  sinoZtree.publicEvt.disappear();
                }
              }
            }]
          }]
        }, {
          tagName: 'div',
          class: 'sino-ztree__content',
          children: [{
            tagName: 'div',
            class: 'sino-transfer',
            id: 'sino-transfer',
            children: [
              // {
              //   tagName: 'div',
              //   class: 'sino-transfer-buttons',
              //   children: [
              //     {
              //       tagName: 'button',
              //       class: 'sino-button sino-button--primary sino-button--small sino-transfer__button',
              //       children: [
              //         {
              //           tagName: 'span',
              //           class: 'iconfont icon-xiayiyedanjiantou'
              //         }
              //       ],
              //       event: {
              //         click: () => {
              //           // sinoZtree.methods.onAdd();
              //         }
              //       }
              //     }, {
              //       tagName: 'button',
              //       class: 'sino-button sino-button--primary sino-button--small sino-transfer__button',
              //       children: [
              //         {
              //           tagName: 'span',
              //           class: 'iconfont icon-shangyiyedanjiantou'
              //         }
              //       ],
              //       event: {
              //         click: () => {
              //           // sinoZtree.methods.onCancel(0);
              //         }
              //       }
              //     }, {
              //       tagName: 'button',
              //       class: 'sino-button sino-button--primary sino-button--small sino-transfer__button',
              //       children: [
              //         {
              //           tagName: 'span',
              //           class: 'iconfont icon-shuangjiantouzuo'
              //         }
              //       ],
              //       event: {
              //         click: () => {
              //           // sinoZtree.methods.onCancel(1);
              //         }
              //       }
              //     }
              //   ]
              // }
            ]
          }]
        }, {
          tagName: 'div',
          class: 'sino-ztree__footer',
          children: [{
            tagName: 'div',
            class: 'sino-ztree__content',
            children: [{
              tagName: 'div',
              class: 'sino-left',
              children: [{
                tagName: 'span',
                class: 'sino-text',
                // text: '提示：按住 Ctrl 键 即可多选'
                text: '提示：双击即可取消已选'
              }]
            }, {
              tagName: 'div',
              class: 'sino-right',
              children: [{
                tagName: 'button',
                class: 'sino-button sino-button--primary sino-button--small',
                text: '确定',
                event: {
                  click: function click() {
                    sinoZtree.publicEvt.onConfirm();
                  }
                }
              }, {
                tagName: 'button',
                class: 'sino-button sino-button--small',
                text: '关闭',
                event: {
                  click: function click() {
                    sinoZtree.publicEvt.disappear();
                  }
                }
              }]
            }]
          }]
        }]
      }]
    };
  }
};
sinoZtree.creator = {
  archives: {
    excluder: ['tagName', 'children', 'text', 'event']
  },
  create: function create(seed) {
    if (seed.tagName) {
      var bud = document.createElement(seed.tagName);
      for (var key in seed) {
        if (-1 != sinoZtree.creator.archives.excluder.indexOf(key)) continue;
        bud.setAttribute(key, seed[key]);
      }
      /* The following code, temporarily stacked here */
      if (seed.children) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = seed.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;

            var curChild = sinoZtree.creator.create(child);
            if (curChild) bud.appendChild(curChild);
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
      }
      if (seed.text) {
        bud.innerText = seed.text;
      }
      if (seed.event) {
        for (var evt in seed.event) {
          bud.addEventListener(evt, seed.event[evt]);
        }
      }
      /* The above code, temporarily stacked here */
      return bud;
    }
  }
};
sinoZtree.publicEvt = {
  configure: {},
  // 显示树
  appear: function appear(model, treeTitle) {
    // 遮罩层
    var _masker = sinoZtree.creator.create(sinoZtree.garage.masker);
    $('body').append(_masker);
    $('#sino-masker').hide().fadeIn('fast');

    // 树结构
    var body = sinoZtree.creator.create(sinoZtree.garage.body(model));
    $('body').append(body);
    $('#sino-transfer').prepend(sinoZtree.creator.create(sinoZtree.garage.panel('left', treeTitle)));
    $('#sino-transfer').append(sinoZtree.creator.create(sinoZtree.garage.panel('right')));
    $('#sino-ztree').hide().fadeIn('fast');
  },
  // 隐藏树
  disappear: function disappear() {
    $('#sino-ztree').fadeOut('fast', function () {
      $(this).remove();
    });

    $('#sino-masker').fadeOut('fast', function () {
      $(this).remove();
    });
  },
  // 初始化
  init: function init(cfs, callback) {
    // 验证参数
    if (!cfs) {
      alert('cfs 参数错误');
      return;
    }
    if (!cfs.result) {
      alert('cfs.result 参数错误');
      return;
    }
    if (!cfs.config) {
      alert('cfs.config 参数错误');
      return;
    }
    if (!cfs.config.url) {
      alert('cfs.config.url 参数错误');
      return;
    }

    var treeTitle = '';
    if (cfs.config.type === 'dept') {
      treeTitle = '公司部门列表';
      // 如果选择部门，check 不联动父子节点
      sinoZtree.ztree.zSettings.check.chkboxType = { N: '', Y: '' };
      sinoZtree.ztree.cSettings.check.chkboxType = { N: '', Y: '' };
    } else if (cfs.config.type === 'user') {
      treeTitle = '用户列表';
      // 如果选择用户，check 联动父子节点
      sinoZtree.ztree.zSettings.check.chkboxType = { N: 'ps', Y: 'ps' };
      sinoZtree.ztree.cSettings.check.chkboxType = { N: 'ps', Y: 'ps' };
    } else {
      alert('cfs.config.type 参数错误');
      return;
    }

    // model.title 存在则显示，不存在显示默认标题
    if (!cfs.model || !cfs.model.title) {
      cfs.model.title = cfs.config.type === 'dept' ? '选择部门' : '选择用户';
    }

    var showParent = sinoZtree.publicEvt.configure.showParent;
    // 如果显示公司 / 部门所属父公司，rootId 需减少 3 位
    if (cfs.config.rootId && cfs.config.rootId !== sinoZtree.rootId && showParent) {
      cfs.config.rootId = cfs.config.rootId.substring(0, cfs.config.rootId.length - 3);
    } else {
      cfs.config.rootId = sinoZtree.rootId;
    }

    var max = parseInt(cfs.config.max, 10) || 0;
    // 如果无限制或超过 500，最大可选数设定为 500
    if (max === 0 || max > 500) {
      cfs.config.max = 500;
    }

    // 显示树
    sinoZtree.publicEvt.appear(cfs.model, treeTitle);

    sinoZtree.publicEvt.configure = {
      result: cfs.result, // 页面回写的标签 id 属性信息
      url: cfs.config.url, // 数据源接口地址（必填）
      type: cfs.config.type, // 类型（必填），可选值为 `dept` , `user`
      rootId: cfs.config.rootId, // 顶级部门 id ，只显示当前部门下的数据
      max: cfs.config.max, // 最大可选数，`0` 为无限制，最大可选数为 500
      showLeader: cfs.config.showLeader === false ? false : true, // 是否显示领导部门
      showCompany: cfs.config.showCompany === false ? false : true, // 是否显示公司下属子公司，`rootId = sinoZtree.rootId` 时不生效
      showParent: cfs.config.showParent === false ? false : true, // 是否显示公司 / 部门所属父公司
      hideNodes: cfs.config.hideNodes || '', // 隐藏节点名称模糊匹配的节点，节点名称间使用 `,` 分割
      callback: callback // 回调函数，如果存在此回调函数，将不会回写属性值，`data` 对象包含所有回显属性值
    };

    $.fn.zTree.init($('#zTree'), sinoZtree.ztree.zSettings, null);
  },
  // 搜索
  onSearch: function onSearch() {
    // 输入框内容不为空
    if ($('#sino-search').val() !== '') {
      var zTreeObj = $.fn.zTree.getZTreeObj('zTree');
      var zNodes = zTreeObj.getNodesByParamFuzzy('name', $('#sino-search').val());

      // 这块写的屎一样，但是不知道该怎么办，就先这样吧！
      for (var i = 0; i < zNodes.length; i++) {
        if (i > 0) {
          for (var j = 0; j < i; j++) {
            /**
             * 把所有数组转换为字符串，然后判断如果相同，则删除这个数组。
             * 例如搜索 “信托”，信托公司下有信托领导，还会单独查询出一个信托领导，为了隐藏这个多余的信托领导部门。
             */
            if (zNodes[j] && JSON.stringify(zNodes[j]).indexOf(JSON.stringify(zNodes[i])) > 0) {
              delete zNodes[i];
            }
          }
        }
      }

      $.fn.zTree.init($('#cTree'), sinoZtree.ztree.cSettings, zNodes);

      $('#cTree').show();
      $('#zTree').hide();
      $('#sino-search-close').show();
    } else {
      // 内容为空，则隐藏搜索树
      $('#cTree').hide();
      $('#zTree').show();
      $('#sino-search-close').hide();
    }
  },
  // 确认
  onConfirm: function onConfirm() {
    var sTreeObj = $.fn.zTree.getZTreeObj('sTree');
    var sNodes = sTreeObj.getNodes();

    var callbackData = {};
    // 如果内容不为空
    if (sNodes) {
      var result = {};
      for (var i = 0; i < sNodes.length; i++) {
        for (var key in sinoZtree.publicEvt.configure.result) {
          // 如果属性不存在
          if (!result[key]) {
            result[key] = [];
          }
          // 如果存在此节点属性
          if (sNodes[i].hasOwnProperty(key)) {
            result[key].push(sNodes[i][key].toString());
          }
        }
      }
      for (var _key in sinoZtree.publicEvt.configure.result) {
        // 如果 callback 回调函数不存在则回写属性值
        if (!sinoZtree.publicEvt.configure.callback) {
          $('#' + sinoZtree.publicEvt.configure.result[_key]).val(result[_key].toString());
        } else {
          callbackData[_key] = result[_key].toString();
        }
      }
    } else {
      for (var _key2 in sinoZtree.publicEvt.configure.result) {
        // 如果 callback 回调函数不存在则回写属性值
        if (!sinoZtree.publicEvt.configure.callback) {
          $('#' + sinoZtree.publicEvt.configure.result[_key2]).val('');
        } else {
          callbackData[_key2] = '';
        }
      }
    }

    // 回调函数
    if (sinoZtree.publicEvt.configure.callback) {
      sinoZtree.publicEvt.configure.callback(callbackData);
    }

    // 隐藏树
    sinoZtree.publicEvt.disappear();
  }
};

sinoZtree.ztree = {
  // 暂存数据
  storage: [],
  // 已选数据
  selecteds: [],
  funcs: {
    // 递归
    sieve: function sieve(treeNode) {
      if (treeNode.children) {
        treeNode.children.map(function (item, index) {
          sinoZtree.ztree.funcs.sieve(item);
        });
      } else {
        sinoZtree.ztree.storage.push(treeNode);
      }
    }
  },
  // 左侧树设置
  zSettings: {
    check: {
      enable: true
    },
    data: {
      simpleData: {
        enable: true,
        idKey: 'id',
        pIdKey: 'parentId',
        rootPId: sinoZtree.publicEvt.configure.rootId
      }
    },
    async: {
      enable: true,
      url: function url() {
        var url = sinoZtree.publicEvt.configure.url;
        var rootId = sinoZtree.publicEvt.configure.rootId;
        return url + '?rootId=' + rootId;
      },
      autoParam: ['id']
    },
    callback: {
      // 当选中或取消时
      beforeCheck: function beforeCheck(treeId, treeNode) {
        var max = sinoZtree.publicEvt.configure.max;
        // 如果限制选择数量
        if (max) {
          if (treeNode.checked) {
            return true;
          }

          var sTreeObj = $.fn.zTree.getZTreeObj('sTree');
          var sNodes = sTreeObj.getNodes();

          // 暂存
          sinoZtree.ztree.storage.length = 0;
          if (sinoZtree.publicEvt.configure.type === 'user') {
            sinoZtree.ztree.funcs.sieve(treeNode);
          } else {
            sinoZtree.ztree.storage.push(treeNode);
          }

          // 判断是否超过最大可选数量
          var sLength = sNodes ? sNodes.length : 0;
          if (sLength + sinoZtree.ztree.storage.length > max) {
            alert('当前最大可选数量：' + max);
            return false;
          }
        }

        // if (treeNode.children) {
        //   let operation = treeNode.checked ? '移除' : '选择';
        //   return confirm('确定' + operation + '部门下的所有人员吗?');
        // }
      },
      onCheck: function onCheck(event, treeId, treeNode) {
        var sTreeObj = $.fn.zTree.getZTreeObj('sTree');
        sinoZtree.ztree.storage.length = 0;

        // 暂存
        if (sinoZtree.publicEvt.configure.type === 'user') {
          sinoZtree.ztree.funcs.sieve(treeNode);
        } else {
          sinoZtree.ztree.storage.push(treeNode);
        }

        // 处理暂存数据
        sinoZtree.ztree.storage.map(function (item, index) {
          if (item.checked) {
            // 添加节点
            sTreeObj.addNodes(null, {
              id: item.id,
              parentId: item.parentId,
              name: item.name,
              iconSkin: sinoZtree.publicEvt.configure.type
            });
          } else {
            var sNode = sTreeObj.getNodeByParam('id', item.id);
            // 移除节点
            sTreeObj.removeNode(sNode);
          }
        });

        // 如果已选不为空，则显示已选列表数据
        var sLength = sTreeObj.getNodes() ? sTreeObj.getNodes().length : 0;
        if (sLength) {
          $('#sTree').show();
          $('#sTree-loading').hide();
        } else {
          $('#sTree').hide();
          $('#sTree-loading').show();
        }

        $('#header-extra').text('\uFF08\u5408\u8BA1\uFF1A' + sLength + '\uFF09');
      },
      onAsyncSuccess: function onAsyncSuccess(event, treeId, treeNode, msg) {
        var zTreeObj = $.fn.zTree.getZTreeObj('zTree');
        var zNodes = zTreeObj.transformToArray(zTreeObj.getNodes());

        for (var i = 0; i < zNodes.length; i++) {
          if (!zNodes[i].iconSkin) {
            if (sinoZtree.publicEvt.configure.type === 'user') {
              if (!zNodes[i].isParent) {
                zNodes[i].iconSkin = 'user';
              } else {
                zNodes[i].iconSkin = 'deptu';
              }
            } else {
              if (zNodes[i].fromUnit === '0') {
                zNodes[i].iconSkin = 'depts';
              } else if (zNodes[i].fromUnit === '1') {
                zNodes[i].iconSkin = 'dept';
              }
            }

            if (zNodes[i].id === sinoZtree.rootId) {
              zNodes[i].iconSkin = 'root';
            }

            zTreeObj.updateNode(zNodes[i]);
          }
        }

        // 获取页面回写输入框值
        sinoZtree.ztree.selecteds = [];
        for (var key in sinoZtree.publicEvt.configure.result) {
          var val = $('#' + sinoZtree.publicEvt.configure.result[key]).val();
          if (val) {
            var valArr = val.split(',');
            for (var _i = 0; _i < valArr.length; _i++) {
              if (!sinoZtree.ztree.selecteds[_i]) {
                sinoZtree.ztree.selecteds[_i] = {};
              }
              sinoZtree.ztree.selecteds[_i][key] = valArr[_i];
              sinoZtree.ztree.selecteds[_i].iconSkin = sinoZtree.publicEvt.configure.type;
            }
          }
        }

        // 根据输入框的值勾选对应树结构中的节点
        for (var _i2 = 0; _i2 < sinoZtree.ztree.selecteds.length; _i2++) {
          var node = zTreeObj.getNodeByParam('id', sinoZtree.ztree.selecteds[_i2].id);
          if (node) {
            zTreeObj.checkNode(node, true, sinoZtree.publicEvt.configure.type === 'user' ? true : false);
            // zTreeObj.expandNode(node, true, true, true);
          }
        }

        $.fn.zTree.init($('#sTree'), sinoZtree.ztree.sSettings, sinoZtree.ztree.selecteds);

        if (sinoZtree.ztree.selecteds.length > 0) {
          $('#sTree').show();
          $('#sTree-loading').hide();
        }

        // 不显示领导部门
        if (!sinoZtree.publicEvt.configure.showLeader) {
          var _zNodes = zTreeObj.getNodesByParamFuzzy('isZhc', '3');
          if (_zNodes) {
            zTreeObj.hideNodes(_zNodes);
          }
        }

        // 不显示公司下属子公司
        if (!sinoZtree.publicEvt.configure.showCompany) {
          var _zNodes2 = zTreeObj.getNodesByParam('parentId', sinoZtree.publicEvt.configure.rootId);
          for (var _i3 = 0; _i3 < _zNodes2.length; _i3++) {
            var childrenZNodes = zTreeObj.getNodesByParam('parentId', _zNodes2[_i3].id);
            for (var j = 0; j < childrenZNodes.length; j++) {
              if (childrenZNodes[j].fromUnit === '0') {
                zTreeObj.hideNode(childrenZNodes[j]);
              }
            }
          }
        }

        // 隐藏节点名称模糊匹配的节点，节点名称间使用 `,` 分割
        var hideNodeArr = sinoZtree.publicEvt.configure.hideNodes.split(',');
        for (var _i4 = 0; _i4 < hideNodeArr.length; _i4++) {
          var _zNodes3 = zTreeObj.getNodesByParamFuzzy('name', hideNodeArr[_i4]);
          if (_zNodes3) {
            zTreeObj.hideNodes(_zNodes3);
          }
        }

        $('#zTree').show();
        $('#zTree-loading').hide();
      },
      onAsyncError: function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
        $('#zTree-loading').text('获取数据失败');
        alert('获取数据失败');
      }
    }
  },
  // 已选列表树设置
  sSettings: {
    view: {
      showLine: false // 设置 zTree 是否显示节点之间的连线
    },
    callback: {
      // 双击取消
      onDblClick: function onDblClick(event, treeId, treeNode) {
        if (treeNode) {
          var zTreeObj = $.fn.zTree.getZTreeObj('zTree');
          var cTreeObj = $.fn.zTree.getZTreeObj('cTree');
          var sTreeObj = $.fn.zTree.getZTreeObj('sTree');
          var zNode = zTreeObj.getNodeByParam('id', treeNode.id);
          zTreeObj.checkNode(zNode, false, true);
          sTreeObj.removeNode(treeNode, false);
          if (cTreeObj) {
            var cNodes = cTreeObj.getNodesByParam('id', treeNode.id);
            for (var i = 0; i < cNodes.length; i++) {
              cTreeObj.checkNode(cNodes[i], false, true);
            }
          }

          var sNodes = sTreeObj.getNodes();
          if (!sNodes || sNodes.length === 0) {
            $('#sTree').hide();
            $('#sTree-loading').show();
          }
          $('#header-extra').text('\uFF08\u5408\u8BA1\uFF1A' + sNodes.length + '\uFF09');
        }
      }
    }
  },
  // 搜索树设置
  cSettings: {
    check: {
      enable: true
    },
    view: {
      showLine: false // 设置 zTree 是否显示节点之间的连线
    },
    callback: {
      // 当选中或取消时
      beforeCheck: function beforeCheck(treeId, treeNode) {
        var max = sinoZtree.publicEvt.configure.max;
        if (max) {
          if (treeNode.checked) {
            return true;
          }

          var sTreeObj = $.fn.zTree.getZTreeObj('sTree');
          var sNodes = sTreeObj.getNodes();

          sinoZtree.ztree.storage.length = 0;
          if (sinoZtree.publicEvt.configure.type === 'user') {
            sinoZtree.ztree.funcs.sieve(treeNode);
          } else {
            sinoZtree.ztree.storage.push(treeNode);
          }

          var sLength = sNodes ? sNodes.length : 0;
          if (sLength + sinoZtree.ztree.storage.length > max) {
            alert('当前最大可选数量：' + max);
            return false;
          }
        }
      },
      onCheck: function onCheck(event, treeId, treeNode) {
        var sTreeObj = $.fn.zTree.getZTreeObj('sTree');
        var zTreeObj = $.fn.zTree.getZTreeObj('zTree');
        sinoZtree.ztree.storage.length = 0;
        if (sinoZtree.publicEvt.configure.type === 'user') {
          sinoZtree.ztree.funcs.sieve(treeNode);
        } else {
          sinoZtree.ztree.storage.push(treeNode);
        }
        sinoZtree.ztree.storage.map(function (item, index) {
          if (item.checked) {
            // 添加节点
            sTreeObj.addNodes(null, {
              id: item.id,
              parentId: item.parentId,
              name: item.name,
              iconSkin: sinoZtree.publicEvt.configure.type
            });
            // 勾选 zTree 树节点
            var zNode = zTreeObj.getNodeByParam('id', item.id);
            if (zNode) {
              zTreeObj.checkNode(zNode, true, sinoZtree.publicEvt.configure.type === 'user' ? true : false);
            }
          } else {
            var sNode = sTreeObj.getNodeByParam('id', item.id);
            // 移除节点
            sTreeObj.removeNode(sNode);

            // 取消 zTree 树节点
            var _zNode = zTreeObj.getNodeByParam('id', item.id);
            if (_zNode) {
              zTreeObj.checkNode(_zNode, false, sinoZtree.publicEvt.configure.type === 'user' ? true : false);
            }
          }
        });

        var sLength = sTreeObj.getNodes() ? sTreeObj.getNodes().length : 0;
        if (sLength) {
          $('#sTree').show();
          $('#sTree-loading').hide();
        } else {
          $('#sTree').hide();
          $('#sTree-loading').show();
        }
        $('#header-extra').text('\uFF08\u5408\u8BA1\uFF1A' + sLength + '\uFF09');
      }
    }
  }
};
