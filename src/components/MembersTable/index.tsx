'use client'

import { Fragment } from 'react'

import { Member } from '@/types'
import { Delete, Edit } from '@mui/icons-material'
import {
  IconButton,
  Table as MuiTable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material'
import dayjs from 'dayjs'

interface MembersTableProps {
  data: Member[]
  onlyBiggerScreens?: boolean
  handleDelete: (id: number) => void
  handleEdit?: (id: number) => void
}

export function MembersTable({
  data,
  onlyBiggerScreens = true,
  handleEdit,
  handleDelete,
}: MembersTableProps) {
  const theme = useTheme()

  return (
    <TableContainer component={Paper} elevation={0} sx={{ width: '100%' }}>
      <MuiTable aria-label="Tabela com os dados dos membros cadastrados na aula.">
        <TableHead>
          <TableRow>
            <TableCell>Aluno</TableCell>
            {onlyBiggerScreens && (
              <Fragment>
                <TableCell>Documento</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Data de Nascimento</TableCell>
                <TableCell>Tipo de Plano</TableCell>
                <TableCell>CEP</TableCell>
              </Fragment>
            )}
            <TableCell align={handleEdit ? 'center' : 'right'}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {onlyBiggerScreens && (
                <Fragment>
                  <TableCell>{row.document}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {dayjs(row.birthDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{row.paymentPlan}</TableCell>
                  <TableCell>{row.address?.zipCode}</TableCell>
                </Fragment>
              )}
              <TableCell align={handleEdit ? 'center' : 'right'}>
                {handleEdit && (
                  <IconButton
                    sx={{
                      color: theme.palette.grey[600],
                    }}
                    onClick={() => handleEdit(row.id)}
                    aria-label="Editar aluno"
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                )}
                <IconButton
                  color="error"
                  onClick={() => handleDelete(row.id)}
                  aria-label="Excluir aluno"
                  size="small"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}
