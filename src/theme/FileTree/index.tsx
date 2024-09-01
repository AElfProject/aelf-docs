import FileItemWithFileIcon from "@sinm/react-file-tree/lib/FileItemWithFileIcon";
import "@sinm/react-file-tree/icons.css";
import "@sinm/react-file-tree/styles.css";
import { FileTree as FileTreeLib, TreeNode } from "@sinm/react-file-tree";
const itemRenderer = (treeNode: TreeNode) => (
  <FileItemWithFileIcon treeNode={treeNode} />
);

const FileTree = ({ tree }: { tree?: TreeNode }) => {
  return <FileTreeLib tree={tree} itemRenderer={itemRenderer} />;
};

export default FileTree;
