sinoZtree.creator = {
  archives: {
    excluder: ['tagName', 'children', 'text', 'event']
  },
  create: seed => {
    if (seed.tagName) {
      let bud = document.createElement(seed.tagName);
      for (let key in seed) {
        if(-1 != sinoZtree.creator.archives.excluder.indexOf(key))
          continue;
        bud.setAttribute(key, seed[key]);
      }
      /* The following code, temporarily stacked here */
      if(seed.children) {
        for(let child of seed.children) {
          let curChild = sinoZtree.creator.create(child);
          if(curChild)
            bud.appendChild(curChild);
        }
      }
      if(seed.text) {
        bud.innerText = seed.text;
      }
      if(seed.event) {
        for(let evt in seed.event) {
          bud.addEventListener(evt, seed.event[evt]);
        }
      }
      /* The above code, temporarily stacked here */
      return bud;
    }
  }
};