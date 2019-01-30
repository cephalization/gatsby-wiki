import React, { Component } from 'react';
import { Link } from 'gatsby';
import { TreeView } from '@progress/kendo-react-treeview';

import {
  persistToLocalStorage,
  restoreFromLocalStorage,
} from '../utils/local-storage-helper';

const ITEMS_IN_STORAGE = ['expandedItems'];

/**
 * Generate page link or directory title based on tree item
 *
 * @param {object} props
 */
const NavItem = ({ item }) => {
  if (!item.directory) {
    return (
      <Link className="nav nav-link" to={item.path}>
        {item.title}
      </Link>
    );
  }

  return <p className="nav nav-directory">{item.directory}</p>;
};

/**
 * Generate list structure representing file structure
 *
 * @param {array} tree structure generated from markdown frontmatter
 * e.g.
 * [
 *  {
 *    directory: '/',
 *    links: [
 *      {
 *        path: '/about',
 *        title: 'About'
 *      },
 *      {
 *        directory: 'sub-topic',
 *        links: [
 *          {
 *            path: '/sub-topic/sub-topic',
 *            title: 'Sub Topic Post'
 *          }
 *        ]
 *      }
 *    ]
 *  }
 * ]
 */
class NavTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: [],
      expandedItems: [],
    };

    this.kendoConvert = this.kendoConvert.bind(this);
    this.convertTreeToKendoTree = this.convertTreeToKendoTree.bind(this);
    this.collapseChildrenItems = this.collapseChildrenItems.bind(this);
    this.updateTree = this.updateTree.bind(this);
    this.toggleItemExpansion = this.toggleItemExpansion.bind(this);
  }

  async componentDidMount() {
    try {
      await this.restoreStateKeysFromStorage();
    } catch (e) {
      console.warn('Could not restore localstorage', e);
    }
    this.updateTree();
  }

  /**
   * Retrieve desired state keys from storage, apply them to state
   */
  async restoreStateKeysFromStorage() {
    return await Promise.all(
      ITEMS_IN_STORAGE.map(key => {
        const data = restoreFromLocalStorage(key);

        return new Promise(async (resolve, reject) => {
          if (data) {
            this.setState(
              {
                [key]: data,
              },
              resolve
            );
          } else if (data === null) {
            // There was no data to retrieve
            resolve();
          } else {
            // Some error has occurred
            reject();
          }
        });
      })
    );
  }

  /**
   * Put desired state keys into storage
   */
  storeStateKeysInStorage() {
    ITEMS_IN_STORAGE.forEach(key =>
      persistToLocalStorage(key, this.state[key])
    );
  }

  /**
   * Update the tree of navigation links, triggering re-render
   *
   * @param {array} actions functions to be applied to each node of the tree
   */
  updateTree(actions = []) {
    this.setState(
      { tree: this.kendoConvert(actions) },
      this.storeStateKeysInStorage
    );
  }

  /**
   * Collapse all children of a particular item in the tree, then update the tree
   *
   * @param {object} item {directory} field destructured from an item in the tree
   */
  collapseChildrenItems({ directory }) {
    if (directory) {
      this.setState(
        state => ({
          expandedItems: state.expandedItems.filter(
            item => !item.ancestors.includes(directory)
          ),
        }),
        this.updateTree
      );
    }
  }

  /**
   * Expand/Collapse a directory item in the tree, then update the tree. If the item has expanded children, they will also be collapsed when the parent is.
   *
   * @param {object} event {item} field destructured from event triggered by clicking item in the rendered tree
   */
  toggleItemExpansion({ item }) {
    if (item.directory) {
      const { expandedItems } = this.state;
      const key = item.directory;
      const included = !!expandedItems.find(
        ({ directory }) => directory === key
      );

      this.setState(
        {
          expandedItems: included
            ? expandedItems.filter(({ directory }) => directory !== key)
            : [...expandedItems, { directory: key, ancestors: item.ancestors }],
        },
        () => {
          if (included) {
            // The item is being collapsed, collapse its children and then update the tree
            this.collapseChildrenItems(item);
          } else {
            // The item has been expanded, update the tree
            this.updateTree();
          }
        }
      );
    }
  }

  /**
   * Start converting tree structure to a kendo parseable structure
   *
   * @param {array} tree structure generated from markdown frontmatter
   * e.g.
   * [
   *  {
   *    directory: '/',
   *    links: [
   *      {
   *        path: '/about',
   *        title: 'About'
   *      },
   *      {
   *        directory: 'sub-topic',
   *        links: [
   *          {
   *            path: '/sub-topic/sub-topic',
   *            title: 'Sub Topic Post'
   *          }
   *        ]
   *      }
   *    ]
   *  }
   * ]
   */
  kendoConvert(actions = []) {
    const { tree } = this.props;

    return tree[0]
      ? tree[0].links.map(item =>
          this.convertTreeToKendoTree(item, [], actions)
        )
      : [];
  }

  /**
   * Recursively converts tree of page link data (markdown frontmatter) into structure that kendo can parse
   * https://www.telerik.com/kendo-react-ui/components/treeview/data-binding/
   *
   * @param {object} item tree item to be converted into kendo-parseable structure
   * @param {array} parentAncestors collection of directory names that are ancestor to this item
   * @param {array} actions functions to be applied to each node of the tree
   */
  convertTreeToKendoTree(item, parentAncestors = [], actions = []) {
    const { expandedItems } = this.state;
    const opened = !!expandedItems.find(
      ({ directory }) => directory === item.directory
    );
    const childAncestors = !!item.directory
      ? [...parentAncestors, item.directory]
      : parentAncestors;

    const node = {
      text: item.directory ? item.directory : item.title,
      opened,
      items: Array.isArray(item.links)
        ? item.links.map(childItem =>
            this.convertTreeToKendoTree(childItem, childAncestors, actions)
          )
        : [],
      ancestors: parentAncestors,
      ...item,
    };

    return actions.reduce((mutatedNode, fn) => fn(mutatedNode), node);
  }

  render() {
    const { tree } = this.state;

    return (
      <div className={this.props.className}>
        <h4
          style={{
            marginLeft: '1.45rem',
          }}
        >
          Articles
        </h4>
        <TreeView
          data={tree}
          textField="text"
          expandField="opened"
          itemRender={NavItem}
          onExpandChange={this.toggleItemExpansion}
          onItemClick={this.toggleItemExpansion}
        />
      </div>
    );
  }
}

NavTree.defaultProps = {
  tree: [],
};

export { NavTree };
