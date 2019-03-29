sinoZtree.garage = {
  masker: {
    tagName: 'div',
    id: 'sino-masker',
    class: 'sino-masker'
  },
  panel: (type, title) => {
    return {
      tagName: 'div',
      class: 'sino-transfer-panel',
      children: [
        {
          tagName: 'div',
          class: 'sino-transfer-panel__header',
          children: [
            {
              tagName: 'span',
              text: title ? title : type === 'left' ? '数据列表' : '已选列表'
            },
            {
              tagName: 'span',
              class: 'sino-transfer-panel__header--extra',
              id: title ? '' : type === 'left' ? '' : 'header-extra',
              text: title ? '' : type === 'left' ? '' : '（合计：0）'
            }
          ]
        }, {
          tagName: type === 'left' ? 'div' : '',
          class: 'sino-transfer-panel__search',
          children: [
            {
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
              children: [
                {
                  tagName: 'span',
                  class: 'iconfont icon-sousuo'
                }
              ],
            },  {
              tagName: 'span',
              class: 'sino-search__close',
              id: 'sino-search-close',
              children: [
                {
                  tagName: 'span',
                  class: 'iconfont icon-quxiao'
                }
              ],
              event: {
                click: () => {
                  $('#sino-search').val('');
                  sinoZtree.publicEvt.onSearch();
                }
              }
            }
          ]
        }, {
          tagName: 'div',
          class: 'sino-transfer-panel__body',
          children: [
            {
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
            }
          ]
        }
      ]
    };
  },
  body: (model) => {
    return {
      tagName: 'div',
      class: 'sino-ztree__wrapper',
      id: 'sino-ztree',
      children: [
        {
          tagName: 'div',
          class: 'sino-ztree',
          children: [
            {
              tagName: 'div',
              class: 'sino-ztree__header',
              children: [
                {
                  tagName: 'div',
                  class: 'sino-ztree__title',
                  children: [
                    {
                      tagName: 'span',
                      id: 'sino-header-title',
                      text: model.title
                    }
                  ]
                }, {
                  tagName: 'div',
                  class: 'sino-ztree__headerbtn',
                  children: [
                    {
                      tagName: 'div',
                      class: 'sino-ztree__close',
                      children: [
                        {
                          tagName: 'span',
                          class: 'iconfont icon-guanbi'
                        }
                      ],
                      event: {
                        click: () => {
                          sinoZtree.publicEvt.disappear();
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              tagName: 'div',
              class: 'sino-ztree__content',
              children: [
                {
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
                }
              ]
            }, {
              tagName: 'div',
              class: 'sino-ztree__footer',
              children: [
                {
                  tagName: 'div',
                  class: 'sino-ztree__content',
                  children: [
                    {
                      tagName: 'div',
                      class: 'sino-left',
                      children: [
                        {
                          tagName: 'span',
                          class: 'sino-text',
                          // text: '提示：按住 Ctrl 键 即可多选'
                          text: '提示：双击即可取消已选'
                        }
                      ]
                    }, {
                      tagName: 'div',
                      class: 'sino-right',
                      children: [
                        {
                          tagName: 'button',
                          class: 'sino-button sino-button--primary sino-button--small',
                          text: '确定',
                          event: {
                            click: () => {
                              sinoZtree.publicEvt.onConfirm();
                            }
                          }
                        }, {
                          tagName: 'button',
                          class: 'sino-button sino-button--small',
                          text: '关闭',
                          event: {
                            click: () => {
                              sinoZtree.publicEvt.disappear();
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }
};