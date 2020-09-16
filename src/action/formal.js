import * as core from "../core";
import vector from "./vector";

const formalBase = {
  action(f, v) { // Empty values need to be handled in another layer.
    let w;

    if (f instanceof Function)
      w = this.append(f, v);
    else {
      const p = this.prepare(f);

      if (p instanceof Function)
        w = p(v);
      else
        w = this.append(f, v);
    }

    return w;
  },
  prepare: vector.prepare,
  append(f, v) {
    return [...v, f];
  }
};

const formal = {
  ...formalBase,
  prepare: formalBase.prepare.bind(formalBase),
  append(f, v) {
    v.push(f);
    return v;
  }
};

export default formal;