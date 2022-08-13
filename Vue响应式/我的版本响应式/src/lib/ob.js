// 除基本类型外的，都加上数据劫持
import { Observer } from "./Observer";
export function ob(data) {
  if (!data || typeof data != 'object') return
  
  if (typeof data.__ob__ !== 'undefined') {
    return data>__ob__
  }
  return new Observer(data);
}