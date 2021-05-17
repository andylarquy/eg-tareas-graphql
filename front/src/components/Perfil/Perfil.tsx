import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Box, Button, Fab, FilledInput, FormControl, InputLabel } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import './Perfil.css'
import { UserService } from '../../services/user.service'

//TODO: Hacer un editar perfil y un ver perfil para evitar editar perfiles ajenos

export default function Perfil(props: any) {
  const router = useHistory()
  const [newUsuario, setNewUsuario] = useState({ _id: '', name: '', email: '' })

  useEffect(() => {
    const fetchData = async () => {
      const result = await UserService.getFullUserProfile(props.match.params.idUsuario)
      setNewUsuario(result)
    }

    fetchData()
  }, [props.match.params.idUsuario])

  const handleBackClick = () => router.push('/tareas')

  const handleChangeUsuario = (newValue: any, field: string) => {
    setNewUsuario({ ...newUsuario, [field]: newValue })
  }

  const handleConfirm = () => alert('TODO: Manejar esta request')

  return (
    <div className="container-center" >
      <h1 className="Perfil-title">Perfil</h1>

      <FormControl variant="filled" className="Perfil-input-field">
        <InputLabel htmlFor="input-name">Nombre</InputLabel>
        <FilledInput
          value={newUsuario.name}
          onChange={(e: any) => handleChangeUsuario(e.target.value, 'name')}
        />
      </FormControl>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="5%"
        my={2}
        width="100%">
        <FormControl variant="filled" className="Perfil-input-field">
          <InputLabel htmlFor="input-email">Email</InputLabel>
          <FilledInput
            value={newUsuario.email}
            onChange={(e: any) => handleChangeUsuario(e.target.value, 'email')}
          />
        </FormControl>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="5%"
        width="75%"
        my={2}>
        <Button
          variant="contained"
          className="CrearTarea-input-field"
          size="large"
          color="primary"
          onClick={handleConfirm}>
          Confirmar
          </Button>
      </Box>

      <Fab
        id="App-back-float-button"
        onClick={handleBackClick}>
        <ArrowBack style={{ marginRight: "5%" }} />
      </Fab>
    </div>
  )
}
