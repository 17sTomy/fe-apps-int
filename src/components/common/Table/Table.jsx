import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useTheme } from '../../../hooks/useTheme';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Key } from '@mui/icons-material';

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

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const { theme } = useTheme();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ color: theme.secondary }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{ color: theme.accent, ':hover': { color: theme.accent } }}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <p style={{ color: theme.accent }}>{headCell.label}</p>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const {
    numSelected,
    handleDeletion,
    handleAdminStatus,
    selected,
    filterQuery,
    applyFilterQuery,
    toggleAdminFilter,
  } = props;

  const cTheme = useTheme();

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} seleccionadas
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Filtrar por email"
            variant="outlined"
            value={filterQuery}
            onChange={(e) => {
              applyFilterQuery(e);
            }}
            sx={{
              width: 300,
              '& .MuiOutlinedInput-root': {
                color: cTheme.theme.secondary,
                // Class for the border around the input field
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: cTheme.theme.secondary,
                },
              },
              // Class for the label of the input field
              '& .MuiInputLabel-outlined': {
                color: cTheme.theme.secondary,
              },
            }}
          />
          <Tooltip title="Mostrar solo administradores">
            <Key fontSize="large" sx={{ cursor: 'pointer' }} onClick={toggleAdminFilter} />
          </Tooltip>
        </Box>
      )}
      {numSelected > 0 && (
        <>
          {handleAdminStatus && (
            <Tooltip title="Toggle admin privileges" onClick={() => handleAdminStatus(selected)}>
              <IconButton>
                <Key sx={{ color: cTheme.theme.secondary }} />
              </IconButton>
            </Tooltip>
          )}

          {handleDeletion && (
            <Tooltip title="Delete" onClick={() => handleDeletion(selected)}>
              <IconButton>
                <DeleteIcon sx={{ color: cTheme.theme.secondary }} />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDeletion: PropTypes.func,
  handleAdminStatus: PropTypes.func,
  selected: PropTypes.array.isRequired,
  filterQuery: PropTypes.string,
  applyFilterQuery: PropTypes.func.isRequired,
  toggleAdminFilter: PropTypes.func.isRequired,
};

EnhancedTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  handleDeletion: PropTypes.func,
  handleAdminStatus: PropTypes.func,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const [filterQuery, setFilterQuery] = useState('');
  const [useAdminFilter, setUseAdminFilter] = useState(false);

  const filteredVisibleRows = React.useMemo(
    () =>
      [...props.rows].filter((row) => {
        const queryCondition = row[Object.keys(row)[1]]
          .toLowerCase()
          .includes(filterQuery.toLowerCase());

        const adminCondition = useAdminFilter ? row['isAdmin'] === 'true' : true;
        return queryCondition && adminCondition;
      }),
    [filterQuery, useAdminFilter, props.rows]
  );

  const visibleRows = React.useMemo(
    () =>
      [...filteredVisibleRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, page, rowsPerPage, filteredVisibleRows]
  );

  const { theme } = useTheme();

  const applyFilterQuery = (e) => {
    setFilterQuery(e.target.value);
  };

  const handleAdminFilter = () => {
    setUseAdminFilter((prevState) => !prevState);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, background: theme.primary, color: theme.secondary }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeletion={props.handleDeletion}
          handleAdminStatus={props.handleAdminStatus}
          selected={selected}
          filterQuery={filterQuery}
          applyFilterQuery={applyFilterQuery}
          toggleAdminFilter={handleAdminFilter}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              headCells={props.headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{ color: theme.secondary }}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ color: theme.secondary }}
                    >
                      {row[Object.keys(row)[1]]}
                    </TableCell>
                    {Object.keys(row)
                      .slice(2)
                      .map((key, index) => (
                        <TableCell align="right" key={index} sx={{ color: theme.secondary }}>
                          {row[key]}
                        </TableCell>
                      ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: theme.secondary }}
        />
      </Paper>
    </Box>
  );
}
