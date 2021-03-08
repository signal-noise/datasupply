import { groupBy } from 'lodash-es';

// this is just a wrapper around a lodash function, 
// infact it does less than the lodash version as it only deals 
// you can't group by arbitrary functions
export default function(data, property){
  if(typeof property === 'string'){
    return groupBy( data, property );
  }
  console.warn(`groupBy: property ${property} is not of type string`);
  return data;
}
