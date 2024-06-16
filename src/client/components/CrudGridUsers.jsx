import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { fetchAllUsers } from "../api";
import axios from "axios";
/* END OF IMPORTS */

/* editToolbar COMPONENT - This component is responsible for the toolbar icons and functionality */

function EditToolbar(props) {
  const { setRows, setRowModesModel, idCounter, setIdCounter } = props;

  const handleClick = () => {
    const id = idCounter + 1;
    setRows((oldRows) => [
      ...oldRows,
      { id: id, name: "", email: "", password: "", isadmin: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
    setIdCounter(id);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add User
      </Button>
    </GridToolbarContainer>
  );
}

/* GRID COMPONENT */

export const CrudGridUsers = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [idCounter, setIdCounter] = useState(8);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetchAllUsers();
        const result = await response.json();
        if (response.status === 200) {
          setRows(result.users);
          // Update idCounter based on the maximum id in the fetched users
          const maxId = result.users.reduce((max, user) => (user.id > max ? user.id : max), 0);
          setIdCounter(maxId);
        } else {
          console.error("Error fetching users");
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    const row = rows.find((row) => row.id === id);
    if (row && row.name && row.email && row.password && row.isadmin !== "") {
      try {
        console.log('user update called!!')
        const response = await axios.post("http://localhost:3000/api/users/register", {
          name: row.name,
          email: row.email,
          password: row.password,
          isAdmin: row.isadmin,
        }, {
          headers: { 'Content-Type': 'application/json' },
        }
      );
        if (response.status === 201) {
          console.log("User saved:", response.data);
          setRows((oldRows) =>
            oldRows.map((row) => (row.id === id ? { ...row, isNew: false } : row))
          );
        }
      } catch (error) {
        console.error("Error saving user:", error);
      }
    } else {
      console.log("All fields are required");
    }
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  //column width is set below for each column, numbers are in px
  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "string",
      width: 90,
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      width: 220,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 220,
      editable: true,
    },
    {
      field: "password",
      headerName: "Password",
      type: "string",
      width: 220,
      editable: true,
    },
    {
      field: "isadmin",
      headerName: "Admin",
      type: "string",
      width: 220,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: (props) => <EditToolbar {...props} idCounter={idCounter} />,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, idCounter, setIdCounter },
        }}
      />
    </Box>
  );
};
