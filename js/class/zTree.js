sinoZtree.ztree = {
  // 暂存数据
  storage: [],
  // 已选数据
  selecteds: [],
  funcs: {
    // 递归
    sieve: (treeNode) => {
      if (treeNode.children) {
        treeNode.children.map((item, index) => {
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
      url: () => {
        const url = sinoZtree.publicEvt.configure.url;
        const rootId = sinoZtree.publicEvt.configure.rootId;
        return url + '?rootId=' + rootId;
      },
      autoParam: ['id'],
    },
    callback: {
      // 当选中或取消时
      beforeCheck: (treeId, treeNode) => {
        const max = sinoZtree.publicEvt.configure.max;
        // 如果限制选择数量
        if (max) {
          if (treeNode.checked) {
            return true;
          }

          const sTreeObj = $.fn.zTree.getZTreeObj('sTree');
          const sNodes = sTreeObj.getNodes();

          // 暂存
          sinoZtree.ztree.storage.length = 0;
          if (sinoZtree.publicEvt.configure.type === 'user') {
            sinoZtree.ztree.funcs.sieve(treeNode);
          } else {
            sinoZtree.ztree.storage.push(treeNode);
          }

          // 判断是否超过最大可选数量
          const sLength = sNodes ? sNodes.length : 0;
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
      onCheck: (event, treeId, treeNode) => {
        const sTreeObj = $.fn.zTree.getZTreeObj('sTree');
        sinoZtree.ztree.storage.length = 0;

        // 暂存
        if (sinoZtree.publicEvt.configure.type === 'user') {
          sinoZtree.ztree.funcs.sieve(treeNode);
        } else {
          sinoZtree.ztree.storage.push(treeNode);
        }

        // 处理暂存数据
        sinoZtree.ztree.storage.map((item, index) => {
          if (item.checked) {
            // 添加节点
            sTreeObj.addNodes(null, {
              id: item.id,
              parentId: item.parentId,
              name: item.name,
              iconSkin: sinoZtree.publicEvt.configure.type
            });
          } else {
            const sNode = sTreeObj.getNodeByParam('id', item.id);
            // 移除节点
            sTreeObj.removeNode(sNode);
          }
        });

        // 如果已选不为空，则显示已选列表数据
        const sLength = sTreeObj.getNodes() ? sTreeObj.getNodes().length : 0;
        if (sLength) {
          $('#sTree').show();
          $('#sTree-loading').hide();
        } else {
          $('#sTree').hide();
          $('#sTree-loading').show();
        }
        
        $('#header-extra').text(`（合计：${sLength}）`);
      },
      onAsyncSuccess: (event, treeId, treeNode, msg) => {
        const zTreeObj = $.fn.zTree.getZTreeObj('zTree');
        const zNodes = zTreeObj.transformToArray(zTreeObj.getNodes());

        for (let i = 0; i < zNodes.length; i++) {
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
        for (let key in sinoZtree.publicEvt.configure.result) {
          const val = $('#' + sinoZtree.publicEvt.configure.result[key]).val();
          if (val) {
            const valArr = val.split(',');
            for (let i = 0; i < valArr.length; i++) {
              if (!sinoZtree.ztree.selecteds[i]) {
                sinoZtree.ztree.selecteds[i] = {};
              }
              sinoZtree.ztree.selecteds[i][key] = valArr[i];
              sinoZtree.ztree.selecteds[i].iconSkin = sinoZtree.publicEvt.configure.type;
            }
          }
        }

        // 根据输入框的值勾选对应树结构中的节点
        for (let i = 0; i < sinoZtree.ztree.selecteds.length; i++) {
          const node = zTreeObj.getNodeByParam('id', sinoZtree.ztree.selecteds[i].id);
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
          const zNodes = zTreeObj.getNodesByParamFuzzy('isZhc', '3');
          if (zNodes) {
            zTreeObj.hideNodes(zNodes);
          }
        }

        // 不显示公司下属子公司
        if (!sinoZtree.publicEvt.configure.showCompany) {
          const zNodes = zTreeObj.getNodesByParam('parentId', sinoZtree.publicEvt.configure.rootId);
          for (let i = 0; i < zNodes.length; i++) {
            const childrenZNodes = zTreeObj.getNodesByParam('parentId', zNodes[i].id);
            for (let j = 0; j < childrenZNodes.length; j++) {
              if (childrenZNodes[j].fromUnit === '0') {
                zTreeObj.hideNode(childrenZNodes[j]);
              }
            }
          }
        }

        // 隐藏节点名称模糊匹配的节点，节点名称间使用 `,` 分割
        const hideNodeArr = sinoZtree.publicEvt.configure.hideNodes.split(',');
        for (let i = 0; i < hideNodeArr.length; i++) {
          const zNodes = zTreeObj.getNodesByParamFuzzy('name', hideNodeArr[i]);
          if (zNodes) {
            zTreeObj.hideNodes(zNodes);
          }
        }
       
        $('#zTree').show();
        $('#zTree-loading').hide();
      },
      onAsyncError: (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) => {
        $('#zTree-loading').text('获取数据失败');
        alert('获取数据失败');
      }
    }
  },
  // 已选列表树设置
  sSettings: {
    view: {
      showLine: false, // 设置 zTree 是否显示节点之间的连线
    },
    callback: {
      // 双击取消
      onDblClick: function (event, treeId, treeNode) {
        if (treeNode) {
          const zTreeObj = $.fn.zTree.getZTreeObj('zTree');
          const cTreeObj = $.fn.zTree.getZTreeObj('cTree');
          const sTreeObj = $.fn.zTree.getZTreeObj('sTree');
          const zNode = zTreeObj.getNodeByParam('id', treeNode.id);
          zTreeObj.checkNode(zNode, false, true);
          sTreeObj.removeNode(treeNode, false);
          if (cTreeObj) {
            const cNodes = cTreeObj.getNodesByParam('id', treeNode.id);
            for (let i = 0; i < cNodes.length; i++) {
              cTreeObj.checkNode(cNodes[i], false, true);
            }
          }

          var sNodes = sTreeObj.getNodes();
          if (!sNodes || sNodes.length === 0) {
            $('#sTree').hide();
            $('#sTree-loading').show();
          }
          $('#header-extra').text(`（合计：${sNodes.length}）`);
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
      showLine: false, // 设置 zTree 是否显示节点之间的连线
    },
    callback: {
      // 当选中或取消时
      beforeCheck: (treeId, treeNode) => {
        const max = sinoZtree.publicEvt.configure.max;
        if (max) {
          if (treeNode.checked) {
            return true;
          }

          const sTreeObj = $.fn.zTree.getZTreeObj('sTree');
          const sNodes = sTreeObj.getNodes();

          sinoZtree.ztree.storage.length = 0;
          if (sinoZtree.publicEvt.configure.type === 'user') {
            sinoZtree.ztree.funcs.sieve(treeNode);
          } else {
            sinoZtree.ztree.storage.push(treeNode);
          }

          const sLength = sNodes ? sNodes.length : 0;
          if (sLength + sinoZtree.ztree.storage.length > max) {
            alert('当前最大可选数量：' + max);
            return false;
          }
        }
      },
      onCheck: (event, treeId, treeNode) => {
        const sTreeObj = $.fn.zTree.getZTreeObj('sTree');
        const zTreeObj = $.fn.zTree.getZTreeObj('zTree');
        sinoZtree.ztree.storage.length = 0;
        if (sinoZtree.publicEvt.configure.type === 'user') {
          sinoZtree.ztree.funcs.sieve(treeNode);
        } else {
          sinoZtree.ztree.storage.push(treeNode);
        }
        sinoZtree.ztree.storage.map((item, index) => {
          if (item.checked) {
            // 添加节点
            sTreeObj.addNodes(null, {
              id: item.id,
              parentId: item.parentId,
              name: item.name,
              iconSkin: sinoZtree.publicEvt.configure.type
            });
            // 勾选 zTree 树节点
            const zNode = zTreeObj.getNodeByParam('id', item.id);
            if (zNode) {
              zTreeObj.checkNode(zNode, true, sinoZtree.publicEvt.configure.type === 'user' ? true : false);
            }
          } else {
            const sNode = sTreeObj.getNodeByParam('id', item.id);
            // 移除节点
            sTreeObj.removeNode(sNode);

            // 取消 zTree 树节点
            const zNode = zTreeObj.getNodeByParam('id', item.id);
            if (zNode) {
              zTreeObj.checkNode(zNode, false, sinoZtree.publicEvt.configure.type === 'user' ? true : false);
            }
          }
        });

        const sLength = sTreeObj.getNodes() ? sTreeObj.getNodes().length : 0;
        if (sLength) {
          $('#sTree').show();
          $('#sTree-loading').hide();
        } else {
          $('#sTree').hide();
          $('#sTree-loading').show();
        }
        $('#header-extra').text(`（合计：${sLength}）`);
      }
    }
  }
};
