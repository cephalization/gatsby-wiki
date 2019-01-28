import React, { Component } from 'react';
import { Link } from 'gatsby';
import { TreeView } from '@progress/kendo-react-treeview';

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
    this.updateTree = this.updateTree.bind(this);
    this.expandItem = this.expandItem.bind(this);
  }

  componentDidMount() {
    this.updateTree();
  }

  updateTree() {
    this.setState({ tree: this.kendoConvert() }, () => console.log(this.state));
  }

  expandItem({ item }) {
    const { expandedItems } = this.state;
    const key = !!item.directory ? item.directory : item.path;
    const included = expandedItems.includes(key);

    this.setState(
      {
        expandedItems: included
          ? expandedItems.filter(i => i !== key)
          : [...expandedItems, key],
      },
      this.updateTree
    );
  }

  /**
   * Start converting tree structure to a kendo-parseable structure
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
  kendoConvert({ tree } = this.props) {
    return tree[0] ? tree[0].links.map(this.convertTreeToKendoTree) : [];
  }

  /**
   * Recursively converts tree of page link data (markdown frontmatter) into structure that kendo can parse
   * https://www.telerik.com/kendo-react-ui/components/treeview/data-binding/
   *
   * @param {object} item tree item to be converted into kendo-parseable structure
   */
  convertTreeToKendoTree(item, parent) {
    const { expandedItems } = this.state;
    const opened = expandedItems.includes(
      !!item.directory ? item.directory : item.path
    );

    return {
      text: item.directory ? item.directory : item.title,
      opened,
      items: Array.isArray(item.links)
        ? item.links.map(this.convertTreeToKendoTree)
        : [],
      parent,
      ...item,
    };
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
          onExpandChange={this.expandItem}
          onItemClick={this.expandItem}
        />
      </div>
    );
  }
}

NavTree.defaultProps = {
  tree: [],
};

export { NavTree };
