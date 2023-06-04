import React from 'react'
import './SideBar.css';
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../../dashBoard.png';
import {Link} from 'react-router-dom';
import {TreeItem,TreeView} from '@material-ui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
export default function SideBar() {
  return (
    <div className='sidebar'>
      <Link to='/'>
        <p><HomeIcon/> Home</p>
      </Link>
      <Link to='/admin/dashboard'>
        <p><DashboardIcon/> Dashboard</p>
      </Link>
      <Link>
        <TreeView defaultCollapseIcon={<ExpandMoreIcon/>} defaultExpandIcon={<ImportExportIcon/>}>
          <TreeItem nodeId='1' label="Products">
            <Link to='/admin/products'>
              <TreeItem nodeId='2' label="All" icon={<PostAddIcon/>}/>
            </Link>
            <Link to='/admin/product'>
            <TreeItem nodeId='3' label="Create" icon={<AddIcon/>}/>
          </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p><ListAltIcon/> Orders</p>
      </Link>
      <Link to="/admin/users">
        <p><PeopleIcon/> Users</p>
      </Link>
      
    </div>
  )
}
