"use strict"

class CollectivePreference {
  constructor(items_iterable) {
    this.itemsByName_ = new Map();
    this.itemsByIndex_ = [];
    let index = 0;
    for (let item of items_iterable) {
      let trimmed = item.trim();
      if (trimmed == "") {
        continue;
      }
      this.itemsByName_.set(trimmed, index++);
      this.itemsByIndex_.push(trimmed);
    }
    this.numItems_ = this.itemsByName_.size;
    console.log(`${this.numItems_}: ${this.itemsByIndex_}`);
    this.votes_ = math.zeros(this.itemsByName_.size, this.itemsByName_.size);
    this.numVotes_ = 0;
  }

  getItemAndWeight(entry) {
    let elems = entry.split(":");
    let item = elems[0].trim();
    let weight = (elems.length == 2 ? parseFloat(elems[1]) : -1);
    return [item, weight];
  }

  addVote(...entries) {
    console.log(`addVote(${entries})`);
    if (entries.length < 2) {
      return;
    }
    let vote = math.zeros(this.numItems_, this.numItems_);
    for (let i = 0; i < (entries.length - 1); ++i) {
      let [item1, weight1] = this.getItemAndWeight(entries[i]);
      for (let j = i + 1; j < entries.length; ++j) {
        let [item2, weight2] = this.getItemAndWeight(entries[j]);
        let row, col, deltaWeight;
        if (weight1 > weight2) {
          row = this.itemsByName_.get(item1);
          col = this.itemsByName_.get(item2);
          deltaWeight = weight1 - weight2;
        } else if (weight2 > weight1) {
          row = this.itemsByName_.get(item2);
          col = this.itemsByName_.get(item1);
          deltaWeight = weight2 - weight1;
        } else if (weight1 == -1) {
          row = this.itemsByName_.get(item1);
          col = this.itemsByName_.get(item2);
          deltaWeight = 1;
        } else {
          continue;
        }
        vote.subset(math.index(row, col), deltaWeight);
      }
    }
    this.votes_ = math.add(this.votes_, vote);
    this.numVotes_++;
  }

  getPreference(eps) {
    // Add self-edges to votes.
    for (let i = 0; i < this.numItems_; ++i) {
      let sum = 0;
      for (let j = 0; j < this.numItems_; ++j) {
        if (i == j) continue;
        let value = this.votes_.subset(math.index(i, j));
        sum += value;
      }
      this.votes_.subset(math.index(i, i), sum);
    }

    // Normalize weights.
    for (let j = 0; j < this.numItems_; ++j) {
      let sum = 0;
      for (let i = 0; i < this.numItems_; ++i) {
        let value = this.votes_.subset(math.index(i, j));
        sum += value;
      }
      for (let i = 0; i < this.numItems_; ++i) {
        let value = this.votes_.subset(math.index(i, j));
        this.votes_.subset(math.index(i, j), value / sum);
      }
    }
    console.log(this.votes_);

    // Iterate to find stable state.
    let v = math.ones(this.numItems_, 1.0);
    v = math.divide(v, this.numItems_);
    let i = 0;
    while (true) {
      console.log(`${i}: ${v}`);
      let newV = math.multiply(this.votes_, v);
      let diff = math.subtract(newV, v);
      if (math.sqrt(math.dot(diff, diff)) < eps) {
        for (let k = 0; k < this.numItems_; ++k) {
          let value = newV.subset(math.index(k, 0));
          newV.subset(math.index(k, 0), value.toFixed(3));
        }
        return newV;
      }
      v = newV;
      i++;
    }
  }

  getNumVotes() {
    return this.numVotes_;
  }

  getItems() {
    return this.itemsByIndex_;
  }

  getVotesDigraph() {
    let result = `digraph {\n`;
    result += "  layout = circo;\n";
    result += `  {rank = max "${this.itemsByIndex_[0]}"};\n`;
    result += `  {rank = min "${this.itemsByIndex_[this.numItems_ - 1]}"};\n`;
    for (let i = 0; i < this.numItems_; ++i) {
      if (i == (this.numItems_ - 1)) {
        result += `  "${this.itemsByIndex_[i]}" -> "${this.itemsByIndex_[0]}"`;
      } else {
        result +=
          `  "${this.itemsByIndex_[i]}" -> "${this.itemsByIndex_[i + 1]}"`;
      }
      result += `[style = "invis"];\n`;
    }
    for (let c = 0; c < this.numItems_; ++c) {
      for (let r = 0; r < this.numItems_; ++r) {
        let weight = this.votes_.subset(math.index(r, c));
        if (weight != 0) {
          let from = this.itemsByIndex_[c];
          let to = this.itemsByIndex_[r];
          result += `  "${from}" -> "${to}" [label = ${weight.toFixed(2)}];\n`
        }
      }
    }
    result += "}\n";
    return result;
  }
}
