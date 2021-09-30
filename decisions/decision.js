 "use strict"

class Node {
  constructor(name, valueFn, parentNode = null, percentFn = null) {
    this.name_ = name;
    this.valueFn_ = valueFn;
    this.parentNode_ = parentNode;
    this.percentFn_ = percentFn;
    this.childrenNodes_ = new Set();
    if (parentNode != null) {
      parentNode.addChild(this);
    }
    this.stats_ = null;
    this.totalSiblingsPercent_ = 0.0;
  }

  addChild(childNode) {
    this.childrenNodes_.add(childNode);
  }

  getName() {
    return this.name_;
  }

  getFQName() {
    if (this.parentNode_ == null) {
      return this.getName();
    }
    return `${this.parentNode_.getFQName()}/${this.getName()}`;
  }

  getNodeValue() {
    return this.valueFn_();
  }

  getPercent() {
    if (this.totalSiblingsPercent_ == 0 && this.parentNode_ != null) {
      for (let siblingNode of this.parentNode_.childrenNodes_.values()) {
        if (siblingNode.percentFn_ != null) {
          this.totalSiblingsPercent_ = this.totalSiblingsPercent_ + siblingNode.percentFn_();
        }
      }
    }
    if (this.percentFn_ != null) {
      let result = this.percentFn_() / this.totalSiblingsPercent_ * 100;
      if (result < 1) {
        return result;
      }
      return Math.round(result);
    }
    return null;
  }

  getStats() {
    if (this.stats_ == null) {
      this.stats_ = {};
      let valueToPercentMap = new Map();
      this.stats_.expectedValue = this.valueFn_();
      for (let childNode of this.childrenNodes_.values()) {
        if (childNode.percentFn_ != null) {
          let v = childNode.getStats().expectedValue;
          let p = childNode.getPercent();
          this.stats_.expectedValue += v * p / 100;
          let prevPercentForValue = valueToPercentMap.get(v);
          if (prevPercentForValue != null) {
            p += prevPercentForValue;
          }
          valueToPercentMap.set(v, p);
        }
      }
      this.stats_.expectedValue = Math.round(this.stats_.expectedValue);
      if (valueToPercentMap.size == 0) {
        valueToPercentMap.set(0, 100);
      }
      let cumulativePercent = 0;
      for (let value of Array.from(valueToPercentMap.keys()).sort((e1, e2) => e1 - e2)) {
        cumulativePercent += valueToPercentMap.get(value);
        value += this.valueFn_();
        if (!('minValue' in this.stats_) && 0 <= cumulativePercent) {
          this.stats_.minValue = value;
        }
        if (!('p90Value' in this.stats_) && 90 <= cumulativePercent) {
          this.stats_.p90Value = value;
        }
        if (!('maxValue' in this.stats_) && 100 <= cumulativePercent) {
          this.stats_.maxValue = value;
          break;
        }
      }
    }
    return this.stats_;
  }
}

class Decision {
  constructor(input) {
    this.percents_ = {};
    this.values_ = {};

    let nodes = new Map();
    for (let nodeInput of input) {
      nodeInput = nodeInput.split(',');
      let [fqName, valueExpr, percentExpr] = [null, null, null];
      if (nodeInput.length == 2) {
        [fqName, valueExpr] = nodeInput;
      } else if (nodeInput.length == 3) {
        [fqName, valueExpr, percentExpr] = nodeInput;
      } else {
        continue;
      }
      let valueFn = this.parseExpr(valueExpr, this.values_);
      let percentFn = null;
      if (percentExpr != null) {
        percentFn = this.parseExpr(percentExpr, this.percents_);
      }

      let i = fqName.lastIndexOf('/');
      let name = fqName.substring(i + 1);
      let parentName = fqName.substring(0, i);

      let parentNode = nodes.get(parentName);
      if (parentNode == null) {
        parentNode = new Node(parentName, function() {return 0});
        this.root_ = parentNode;
        nodes.set(parentName, parentNode);
      }
      let node = new Node(name, valueFn, parentNode, percentFn);
      nodes.set(fqName, node);
    }
  }

  parseExpr(expr, obj) {
    let fn = null;
    if (expr.indexOf(':') > 0) {
      // expr is '<var>: <num>'
      let i = expr.indexOf(':');
      let varName = expr.substring(0, i).trim();
      let valueExpr = expr.substring(i+1);
      let prefixedValueExpr = this.prefixedExpr(valueExpr, obj);
      obj[varName] = +eval(prefixedValueExpr);
      fn = new Function('obj', `return obj.${varName}`).bind(null, obj);
    } else {
      fn = new Function('obj', `return ${this.prefixedExpr(expr, obj)}`).bind(null, obj);
    }
    return fn;
  }

  prefixedExpr(expr, obj) {
    return expr.replace(/([a-zA-Z]+[a-zA-Z0-9_-]*)/g, 'obj.$1');
  }
}
