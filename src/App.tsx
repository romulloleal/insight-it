import * as yup from 'yup';
import { useFormik } from 'formik';
import {
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DatePickerContainer } from './components/DatePickerContainer';

function App() {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			birth: null,
			phone: '',
		},
		validationSchema: yup.object({
			name: yup
				.string()
				.matches(/^[a-zA-Z\s]*$/, 'Utilize apenas letras')
				.required('O campo é obrigatório.'),
			email: yup
				.string()
				.email('E-mail inválido.')
				.required('O campo é obrigatório.'),
			phone: yup
				.string()
				.matches(/^[0-9]*$/, 'Utilize apenas números')
				.required('O campo é obrigatório.'),
			birth: yup.date().nullable().required('O campo é obrigatório.'),
		}),
		validateOnChange: false,
		onSubmit: () => {
			alert('Validação completa!');
		},
	});

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
					Insight IT
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={formik.handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								name="name"
								fullWidth
								label="Nome"
								value={formik.values.name}
								onChange={formik.handleChange}
								helperText={formik.errors.name}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<DatePickerContainer>
								<DatePicker
									disableFuture
									label="Data de nascimento"
									value={formik.values.birth}
									slotProps={{
										textField: {
											fullWidth: true,
											helperText: formik.errors.birth,
										},
									}}
									onChange={(e) => formik.setFieldValue('birth', e)}
								/>
							</DatePickerContainer>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name="email"
								fullWidth
								label="E-mail"
								onChange={formik.handleChange}
								helperText={formik.errors.email}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label="Telefone"
								name="phone"
								onChange={formik.handleChange}
								helperText={formik.errors.phone}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField fullWidth label="Endereço" />
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Enviar
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default App;
