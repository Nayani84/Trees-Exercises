/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    let queue = [{ node: this.root, depth: 1 }];

    while (queue.length > 0) {
      let { node, depth } = queue.shift();

      if (!node.left && !node.right) {
        return depth;
      }

      if (node.left) {
        queue.push({ node: node.left, depth: depth + 1 });
      }
      if (node.right) {
        queue.push({ node: node.right, depth: depth + 1 });
      }

    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    let stack = [{ node: this.root, depth: 1 }];
    let maxDepth = 0;

    while (stack.length > 0) {
      let { node, depth } = stack.pop();

      if (node) {
        maxDepth = Math.max(maxDepth, depth);
        stack.push({ node: node.left, depth: depth + 1 });
        stack.push({ node: node.right, depth: depth + 1 });
      }
    }
    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxPathSum = 0;

    function maxSumHelper(node) {
      if (!node) return 0;

      const leftMax = Math.max(maxSumHelper(node.left), 0);
      const rightMax = Math.max(maxSumHelper(node.right), 0);

      const currentPathSum = node.val + leftMax + rightMax;

      maxPathSum = Math.max(maxPathSum, currentPathSum);
      return node.val + Math.max(leftMax, rightMax);
    }
    maxSumHelper(this.root);
    return maxPathSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let result = null;

    function dfs(node) {
      if (!node) return null;

      if (node.val > lowerBound && (result === null || result > node.val)) {
        result = node.val;
      }
      dfs(node.left);
      dfs(node.right);
    }
    dfs(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root) return false;
    if (node1 === this.root || node2 === this.root) return false;

    let queue = [{ node: this.root, parent: null }];

    while (queue.length > 0) {
      let depth = queue.length;
      let foundNode1 = null, foundNode2 = null;
      for (let i = 0; i < depth; i++) {
        let { node, parent } = queue.shift();

        if (node === node1) foundNode1 = parent;
        if (node === node2) foundNode2 = parent;

        if (node.left) queue.push({ node: node.left, parent: node });
        if (node.right) queue.push({ node: node.right, parent: node });
      }

      if (foundNode1 && foundNode2) {
        return foundNode1 !== foundNode2;
      }

      if ((!foundNode1 && foundNode2) || (foundNode1 && !foundNode2)) {
        return false;
      }
    }
    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
