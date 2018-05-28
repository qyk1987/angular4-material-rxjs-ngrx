export const covertArrToObj = (arr) => {
  return arr.reduce((entities, obj) => ({...entities, [obj.id]: obj}), {});
};

export const buildObjFromArr = (arr, dict) => {
  return arr.reduce((entities, id) => ({...entities, [id]: dict[id]}), {});
};
export const getError=(data)=>{
  const error=JSON.parse(data);
  const message=JSON.parse(error._body).Message;
  const info=JSON.parse(message);
  return info;
};


export const loadCollection = (state, collection) => {
  const newItems = collection.filter(item => !state.entities[item.Id]);
  const newIds = newItems.map(item => item.Id);
  const newEntities = covertArrToObj(newItems);
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities}
  };
};

export const updateOne = (state, updated) => {
  const entities = {...state.entities, [updated.Id]: updated};
  return {...state, entities: entities};
};

export const deleteOne = (state, deleted) => {
  const newIds = state.ids.filter(id => id !== deleted.Id);
  const newEntities = buildObjFromArr(newIds, state.entities);
  return {ids: newIds, entities: newEntities}
};

export const addOne = (state, added) => {
  const newIds = [...state.ids, added.Id];
  const newEntities = {...state.entities, [added.Id]: added};
  return {ids: newIds, entities: newEntities};
};

export const unique= (arr)=>{
  let a= [];
  let b=[];
  arr.forEach((item,index) => {
    if(a.indexOf(item.id) ===-1 ){
      a.push(item.id);
      b.push(item);
    }
  })
  return b;
}

export const sortBy=(attr,rev)=>{
  //第二个参数没有传递 默认升序排列
  if(rev ==  undefined){
      rev = 1;
  }else{
      rev = (rev) ? 1 : -1;
  }
  return function(a,b){
      a = a[attr];
      b = b[attr];
      if(a < b){
          return rev * -1;
      }
      if(a > b){
          return rev * 1;
      }
      return 0;
  }
}

export const chinaDate=(date)=>{
  return new Date(new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,''))
}
