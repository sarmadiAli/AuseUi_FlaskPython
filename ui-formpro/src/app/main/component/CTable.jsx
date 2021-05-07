/**
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 * Use this component to render dataTables. arguments and the way you should use them are discribed below
 * @param rowsPerPage: determines how many rows should be rendered in each table page, default is 5
 * @param headers: holds table headers in an array of json objects. an example is mentioned bellow:
 * [{
 *     id: "An id for a cell in header" //used as tableCell key as it's required by react
 *     label: "Which is shown in header cell"
 * }, {
 *     id: "anotherId",
 *     label: "Another label"
 * }]
 * @param rows: holds table rows in an array of json object. required structure is shown below:
 * [{
 *     id: "The whole row Id",
 *     aCellId: "cell Content",
 *     anotherCellId: "cellContent"
 * }, {
 *     id: "another row Id",
 *     row2Cell1: "cell Content",
 *     row2Cell2: "cellContent"
 * }]
 * you can add components such as buttons or anything else instead of string in label key both in header and cells
 */

import React from 'react';
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Typography,
    makeStyles,
    TablePagination
} from "@material-ui/core";
import {Block} from "@material-ui/icons";
import {red} from "@material-ui/core/colors";
import translate from "../helpers/translate";

const styles = makeStyles(theme => ({
    noData: {
        textAlign: "center"
    },
    blockIcon: {
        verticalAlign: "middle",
        color: red[300],
        paddingRight: 10
    },
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "4px 4px 0 0",
        '& th': {
            color: "#fff"
        }
    }
}));

const CTable = (props) => {
    const classes = styles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage ?? 5);
    const rowsPerPageHandler = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }

    const getTableContent = () => (
        props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
            let arr = [];
            for(const[key, val] of Object.entries(row)) {
                if(key === "id") continue;
                arr.push(<TableCell key={key}>{translate(val)}</TableCell>);
            }
            return (
                <TableRow key={row.id}>
                    {arr}
                </TableRow>
            )
        })
    )
    return (
        <>
            <TableContainer style={{    marginTop: "-18px"}}>
                <Table className="mt-20">
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            {props.headers.map(item => (
                                <TableCell key={item.id}>{item.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows && props.rows.length > 0 ? getTableContent() : <TableRow>
                            <TableCell colSpan={props.headers.length}>
                                <Typography variant="h5" component="div" className={classes.noData}>
                                    <Block className={classes.blockIcon}/>
                                    داده‌ای وجود ندارد
                                </Typography>
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            {props.rows && props.rows.length > 0 && <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.rows?.length ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(e, page) => setPage(page)}
                onChangeRowsPerPage={rowsPerPageHandler}
                labelRowsPerPage="میزان نمایش در هر صفحه"
                labelDisplayedRows={({from, to, count}) => (` نمایش ${from} - ${to} از ${count} داده `)}
            />}
        </>
    );
}

export default CTable;
