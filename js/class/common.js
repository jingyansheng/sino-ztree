let sinoZtree = {};

// 顶级公司 / 部门 id
sinoZtree.rootId = '137406';

// 按 ESC 键关闭树窗口
document.onkeydown = () => {
  if (event.keyCode == 27) {
    sinoZtree.publicEvt.disappear();
  }
};