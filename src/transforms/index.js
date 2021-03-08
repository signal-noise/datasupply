import groupBy from './groupBy.js';
import utils from './utils.js';

const transformers = { groupBy };

// apply a list of transforms 
// -- tuple specified [function, arg1, arg2, arg3 etc] -- 
// in order, to a some data, usually an array
// NOTE specifying order will matter as the transformations may be destructive 
// and are applied "in place" 
function transformList(data, list){
  let transformedData = utils.clone(data);
  utils.clone(list).map(suppliedArgs=>{
    const args = [...suppliedArgs];
    const func = args.shift();
    return {func, args};
  })
  .forEach(({func, args})=>{
    if(transformers[func]!=undefined){
      console.warn(`\ttransform: ${func}, ${args.join(' ')}`);
      transformedData = transformers[func](transformedData, ...args);
    }
  })
  return transformedData;
}

export default { ...transformers, transformList };