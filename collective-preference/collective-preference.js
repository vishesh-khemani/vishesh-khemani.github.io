"use strict"

class CollectivePreference {
  constructor(items_iterable) {
    this.itemsByName_ = new Map();
    this.itemsByIndex_ = [];
    let index = 0;
    for (let item of items_iterable) {
      this.itemsByName_.set(item.trim(), index++);
      this.itemsByIndex_.push(item.trim());
    }
    console.log(this.itemsByIndex_);
    this.votes_ = math.zeros(this.itemsByName_.size, this.itemsByName_.size);
  }

  addVote(...items_descending) {
    if (items_descending.length < 2) {
      throw new Error("At least 2 items are needed in a vote.");
    }
    let vote = math.zeros(this.itemsByName_.size, this.itemsByName_.size);
    for (let i = 0; i < (items_descending.length - 1); ++i) {
      for (let j = i + 1; j < items_descending.length; ++j) {
        let row = this.itemsByName_.get(items_descending[i].trim());
        let col = this.itemsByName_.get(items_descending[j].trim());
        vote.subset(math.index(row, col), 1);
      }
    }
    this.votes_ = math.add(this.votes_, vote);
    return vote;
  }

  getPreference(eps) {
    // Add self-edges to votes.
    for (let i = 0; i < this.itemsByName_.size; ++i) {
      let sum = 0;
      for (let j = 0; j < this.itemsByName_.size; ++j) {
        if (i == j) continue;
        let value = this.votes_.subset(math.index(i, j));
        sum += value;
      }
      this.votes_.subset(math.index(i, i), sum);
    }

    // Normalize weights.
    for (let j = 0; j < this.itemsByName_.size; ++j) {
      let sum = 0;
      for (let i = 0; i < this.itemsByName_.size; ++i) {
        let value = this.votes_.subset(math.index(i, j));
        sum += value;
      }
      for (let i = 0; i < this.itemsByName_.size; ++i) {
        let value = this.votes_.subset(math.index(i, j));
        this.votes_.subset(math.index(i, j), value / sum);
      }
    }
    console.log(this.votes_);

    // Iterate to find stable state.
    let v = math.ones(this.itemsByName_.size, 1.0);
    v = math.divide(v, this.itemsByName_.size);
    let i = 0;
    while (true) {
      console.log(`${i}: ${v}`);
      let newV = math.multiply(this.votes_, v);
      let diff = math.subtract(newV, v);
      if (math.sqrt(math.dot(diff, diff)) < eps) {
        for (let k = 0; k < this.itemsByName_.size; ++k) {
          let value = newV.subset(math.index(k, 0));
          newV.subset(math.index(k, 0), value.toFixed(3));
        }
        return newV;
      }
      v = newV;
      i++;
    }
  }
}
