/**
 * @author Ali Sarmadi <mr.snaros@gmail.com>
 * 
 *material-table.com/#/docs/all-props
 */
import React, { useRef,useState } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable, {MTableToolbar} from 'material-table'
import EditIcon from '@material-ui/icons/Edit'
import FilterListIcon from '@material-ui/icons/FilterList'
import TablePagination from "@material-ui/core/TablePagination";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { CSVLink, CSVDownload } from "react-csv";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"
function InlineTable(props) {
  let { columns, title, data,grouping,loading,exportButton,editHandler,modalHandler,count,hideEdit,hideDetail,showDelete,deleteHandler,excelData,excelFileName} = props
  const [tableFiltering,setTableFiltering]=React.useState(false);
  const myInput = useRef();

  return (
      <MaterialTable
        isLoading={loading}
        title={title}
        columns={columns}
        data={data}
        actions={[
         {
              icon:CloudDownloadIcon,
              position:"toolbar",
              hidden:!exportButton,
              tooltip:"خروجی اکسل",
              onClick:()=>{myInput.current.click()}
            },
          {
            icon: FilterListIcon,
            tooltip: "فیلترها",
            position: "toolbar",
            onClick:()=>setTableFiltering(!tableFiltering)
          },
          rowData => ({
            hidden:hideEdit,
            icon: EditIcon,
            tooltip: 'ویرایش',
            onClick: (event, rowData) => editHandler(rowData),
          }),
          rowData=>({
            hidden:hideDetail,
            icon: RemoveRedEyeIcon,
            tooltip: 'جزییات',
            onClick: (event, rowData) => modalHandler(rowData),
          }),
          rowData=>({
            hidden:!showDelete,
            icon: DeleteRoundedIcon,
            tooltip: 'حذف',
            onClick: (event, rowData) => deleteHandler(rowData),
          })
        ]}
        icons={{
          Add: "library_add",
        }}
        components={{
            Toolbar:(props)=>(
                <div>
                    <MTableToolbar {...props} />
                    <div hidden>
                        <CSVLink data={excelData?excelData:[]} filename={excelFileName+".csv"}>
                            <div ref={myInput}>
                            <CloudDownloadIcon></CloudDownloadIcon>
                            </div>
                        </CSVLink>
                    </div>
                </div>
            ),
            Pagination: (props) => (
              <TablePagination
                  {...props}
                  component="div"
              />
          ),
                   }}
        localization={{
          header: {
            actions: ' ',
          },
          toolbar:{
            exportTitle:"خروجی اکسل",
            exportAriaLabel:"خروجی اکسل",
            exportName:"خروجی اکسل",
            exportCSVName:"خروجی اکسل",
          },
          pagination:{
            labelRowsSelect:"میزان نمایش در هر صفحه ",
            labelDisplayedRows:'{from}-{to} از {count}',
            nextAriaLabel:"صفحه بعدی",
            nextTooltip:"صفحه بعدی",
            previousTooltip:"صفحه قبلی",
            firstAriaLabel:"صفحه اول",
            firstTooltip:"صفحه اول",
            lastTooltip:"صفحه آخر",
            lastAriaLabel:"صفحه آخر",
          },
          grouping:{
            placeholder:"برای گروه بندی سرستون را اینجا بکشید."
          },
          body: {
            editRow: {
              deleteText: "  ایا مایل به حذف میباشید؟ ",
              cancelTooltip: "لغو",
              saveTooltip: "ثبت"
            },
            addTooltip: "افزودن به سطر",
            emptyDataSourceMessage: "رکوردی وجود ندارد",
          },
        }}
        options={{
          exportButton:false,
          showFirstLastPageButtons:false,
          actionsColumnIndex: columns.length,
          search: false,
          pageSizeOptions:[5,10,15],
          filtering: tableFiltering,
          grouping: grouping,
          addRowPosition:"0",
          headerStyle: {
            background: "rgba(60,66,81,1)",
            color: 'white',
            '&:hover': {
              color: "#ffffff"
            }
          },
          actionsCellStyle: {
            color: "black"
          },
        }}

      />
  )
}


export default InlineTable;
