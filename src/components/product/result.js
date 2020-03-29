import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '../button/button'
import AddEditProduct from '../modal/add-edit-product'
import DeleteConfirmation from '../modal/delete-confirmation-modal';
import { DELETE_CONFIRMATION_MSG, LIST_OF_PRODUCTS } from '../constants/productconst'
const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.divider,
      color: theme.palette.secondary.main,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'prod_name', numeric: false, disablePadding: true, label: 'Product Name (unique)' },
  { id: 'prod_desc', numeric: false, disablePadding: false, label: 'Product Description' },
  { id: 'is_active', numeric: false, disablePadding: false, label: 'Is Active' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price($)' },
  { id: 'offer_price', numeric: true, disablePadding: false, label: 'Offer Price($)' },
  { id: 'offer_starts_at', numeric: false, disablePadding: false, label: 'Offer Starts At' },
  { id: 'offer_ends_at', numeric: false, disablePadding: false, label: 'Offer Ends At' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created At' },
  { id: 'updated_at', numeric: false, disablePadding: false, label: 'Updated At' },
  { id: 'action', label: 'Action'}
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </StyledTableCell>
        {headCells.map(headCell => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, handleDeleteProduct} = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="subtitle1" id="tableTitle">
          {LIST_OF_PRODUCTS}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={handleDeleteProduct}>
          <IconButton aria-label="delete">
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop:'60px',
    textAlign:'left'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  btnStyle:{
    color: theme.palette.text.primary
  }
}));

export default function Result(props) {
  let products = props.products;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [editRow, setEditRow] = React.useState([])
  const [tcin, setTcin] = React.useState(0)
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = products.map(n => n.prod_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, prod_name, row) => {
    setTcin(row.tcin)
    setEditRow(row)
    const selectedIndex = selected.indexOf(prod_name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, prod_name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };
  const handleEditButton = (index) => {
    setSelectedIndex(index)
    toggleEditProductModal()
  };
  const toggleEditProductModal = () => {
    setShowEditModal(!showEditModal)
  }
  const toggleDeleteConfirmModal =() => {
    setDeleteConfirmModal(!deleteConfirmModal)
  }
  const showUpdateProductModal = ()=> {
    if(showEditModal){
      return(
      <div>
         <AddEditProduct
         toggleModal={toggleEditProductModal}
         updateProduct={props.updateProduct}
         editIndex={selectedIndex}
         data={editRow}
         tcin={tcin}
         />
      </div>
      )
    }
  }
  const showDeleteConfirmationModal = () =>{
    if(deleteConfirmModal){
      return(
        <div>
          <DeleteConfirmation
          message={DELETE_CONFIRMATION_MSG}
          title="Confirmation"
          onConfirmed= {props.deleteProducts}
          selected = {selected}
          toggleDeleteConfirmModal = {toggleDeleteConfirmModal}/>
        </div>
      )
    }
  }
  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {showUpdateProductModal()}
        {showDeleteConfirmationModal()}
        <EnhancedTableToolbar numSelected={selected.length} handleDeleteProduct={toggleDeleteConfirmModal} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
            />
            <TableBody>
              {stableSort(products, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.prod_name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.prod_name, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.prod_name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.prod_name}
                      </TableCell>
                      <TableCell align="left">{row.prod_desc}</TableCell>
                      <TableCell align="left">{row.is_active}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.offer_price}</TableCell>
                      <TableCell align="left">{row.offer_starts_at}</TableCell>
                      <TableCell align="left">{row.offer_ends_at}</TableCell>
                      <TableCell align="left">{row.created_at}</TableCell>
                      <TableCell align="left">{row.updated_at}</TableCell>
                      <TableCell align="center">
                        <Button text="edit" 
                        buttonTextStyle={classes.btnStyle}
                        buttonClickCallback={() => handleEditButton(index)} 
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}