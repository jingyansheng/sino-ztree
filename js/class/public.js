sinoZtree.publicEvt = {
  configure: {},
  // 显示树
  appear: (model, treeTitle) => {
    // 遮罩层
    const _masker = sinoZtree.creator.create(sinoZtree.garage.masker);
    $('body').append(_masker);
    $('#sino-masker').hide().fadeIn('fast');

    // 树结构
    const body = sinoZtree.creator.create(sinoZtree.garage.body(model));
    $('body').append(body);
    $('#sino-transfer').prepend(sinoZtree.creator.create(sinoZtree.garage.panel('left', treeTitle)));
    $('#sino-transfer').append(sinoZtree.creator.create(sinoZtree.garage.panel('right')));
    $('#sino-ztree').hide().fadeIn('fast');
  },
  // 隐藏树
  disappear: () => {
    $('#sino-ztree').fadeOut('fast', function () {
      $(this).remove();
    });

    $('#sino-masker').fadeOut('fast', function () {
      $(this).remove();
    });
  },
  // 初始化
  init: (cfs, callback) => {
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

    let treeTitle = '';
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

    const showParent = sinoZtree.publicEvt.configure.showParent;
    // 如果显示公司 / 部门所属父公司，rootId 需减少 3 位
    if (cfs.config.rootId && cfs.config.rootId !== sinoZtree.rootId && showParent) {
      cfs.config.rootId = cfs.config.rootId.substring(0, cfs.config.rootId.length - 3);
    } else {
      cfs.config.rootId = sinoZtree.rootId;
    }

    const max = parseInt(cfs.config.max, 10) || 0;
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
  onSearch: () => {
    // 输入框内容不为空
    if ($('#sino-search').val() !== '') {
      const zTreeObj = $.fn.zTree.getZTreeObj('zTree');
      const zNodes = zTreeObj.getNodesByParamFuzzy('name', $('#sino-search').val());

      // 这块写的屎一样，但是不知道该怎么办，就先这样吧！
      for (let i = 0; i < zNodes.length; i++) {
        if (i > 0) {
          for (let j = 0; j < i; j++) {
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
  onConfirm: () => {
    const sTreeObj = $.fn.zTree.getZTreeObj('sTree');
    const sNodes = sTreeObj.getNodes();

    const callbackData = {};
    // 如果内容不为空
    if (sNodes) {
      const result = {};
      for (let i = 0; i < sNodes.length; i++) {
        for (let key in sinoZtree.publicEvt.configure.result) {
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
      for (let key in sinoZtree.publicEvt.configure.result) {
        // 如果 callback 回调函数不存在则回写属性值
        if (!sinoZtree.publicEvt.configure.callback) {
          $('#' + sinoZtree.publicEvt.configure.result[key]).val(result[key].toString());
        } else {
          callbackData[key] = result[key].toString();
        }
      }
    } else {
      for (let key in sinoZtree.publicEvt.configure.result) {
        // 如果 callback 回调函数不存在则回写属性值
        if (!sinoZtree.publicEvt.configure.callback) {
          $('#' + sinoZtree.publicEvt.configure.result[key]).val('');
        } else {
          callbackData[key] = '';
        }
      }
    }

    // 回调函数
    if (sinoZtree.publicEvt.configure.callback) {
      sinoZtree.publicEvt.configure.callback(callbackData);
    }
    
    // 隐藏树
    sinoZtree.publicEvt.disappear();
  },
};
