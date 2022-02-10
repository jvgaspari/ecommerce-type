import { ExitToApp } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";
// import { useState } from "react"
import { Link } from "react-router-dom"
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const Dashboard = () => {

    // const [data, setData] = useState({} as any)

    // const getData = (key:string) => {
    //     var storedArray = localStorage.getItem(key);
    //     // var stored = JSON.parse(`${storedArray}`);
    //     setData(JSON.parse(`${storedArray}`))
    //     // console.log('stored', stored)
    //     // return stored;
    // }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        {
          field: 'cpf',
          headerName: 'Cpf',
          type: 'string',
          width: 130,
        },
        {
          field: 'address',
          headerName: 'Address',
          description: 'Just your city',
          sortable: false,
          width: 160,
        },
      ];
    
    const rows = [
        { id: 1, cpf: '123.145.789-80', firstName: 'Jon', address: 'Sao Paulo',  },
        { id: 2, cpf: '654.645.789-80', firstName: 'Cersei', address: 'Rio Janeiro',},
        { id: 3, cpf: '123.465.789-12', firstName: 'Jaime', address: 'Salvador',},
        { id: 4, cpf: '410.654.038-79', firstName: 'Arya', address: 'Curitiba',},
    ];

    return (
        <Container maxWidth="md">
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <p>Dashboard</p>
                <Link to='/'><ExitToApp /></Link>
            </Box>
            <Box height='350px' width='100%' marginTop='24px'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={4}
                    rowsPerPageOptions={[1]}
                    checkboxSelection
                />
            </Box>
            <Box display='flex' justifyContent='flex-start' marginTop='24px'>
                <Button 
                    variant="contained"
                    type='button'
                >
                    Show Cart!
                </Button>
            </Box>
        </Container>
    )
}