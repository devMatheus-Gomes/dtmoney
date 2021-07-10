import {
	useCallback, useContext, useState,
} from "react";
import { toast } from "react-toastify";
import {
	useHistory,
} from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

// container
import { ToastNotification } from "../../../container/Toast"

// Detabase
import { authConfig } from "../../../services/firebase";

// images
import logo from "../../../assets/images/logo.svg";
import alertImg from "../../../assets/images/alert-circle.svg"
import banner from "../../../assets/images/banner.svg";
import checkImg from "../../../assets/images/check.svg"

/// style
import {
	Container, Wrapper, ContainerSideBar, LogoWrapper, Form, StyledInput, ContainerInput,
} from "../style";

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export function Create() {
	const history = useHistory()
	const { setDataCreate } = useContext(AuthContext)

	// State
	const [nameUser, setNameUser] = useState("")
	const [emailUser, setEmailUser] = useState("")
	const [passwordUser, setPasswordUser] = useState("")

	const signUpHandler = useCallback(
		async (event) => {
			event.preventDefault();
			try {
				const valuesFiledsCreateAccount = nameUser.length && emailUser.length && passwordUser.length
				if (valuesFiledsCreateAccount > 0) {
					await authConfig
						.auth()
						.createUserWithEmailAndPassword(emailUser, passwordUser)
						.then(() => {
							toast.success(
								<ToastNotification
									type={checkImg}
									content="Conta criada com sucesso!"
								/>, {
									position: "top-right",
									autoClose: 3000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
								},
							);
							setDataCreate({
								name: nameUser,
								email: emailUser,
								password: passwordUser,
							})
							history.push("/")
						})
				} else {
					toast.warn(
						<ToastNotification
							type={alertImg}
							content="Preencha todos os campos"
						/>, {
							position: "top-right",
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						},
					);
				}
			} catch (errors) {
				await toast.error(
					<ToastNotification
						type={alertImg}
						content="Já possui uma conta com estes dados"
					/>, {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					},
				);
			}
		},
		[emailUser, history, nameUser, passwordUser, setDataCreate],
	);

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<>
			<Container>
				<Wrapper>
					<ContainerSideBar>
						<LogoWrapper>
							<img src={logo} alt="" />
						</LogoWrapper>
						<Form onSubmit={signUpHandler}>
							<h3>Criar Conta</h3>
							<ContainerInput>
								<StyledInput
									placeholder="Digite seu nome..."
									type="text"
									onChange={(event) => setNameUser(event.target.value)}
								/>
								<StyledInput
									placeholder="Digite seu email..."
									type="email"
									onChange={(event) => setEmailUser(event.target.value)}
								/>

								<StyledInput
									placeholder="Digite sua senha..."
									type="password"
									onChange={(event) => setPasswordUser(event.target.value)}
								/>
							</ContainerInput>
							<button type="submit">Criar</button>
						</Form>
						<div>
							<h4>
								Já possui uma conta?
								{" "}
								<a href="/"><span>Fazer Login</span></a>
							</h4>
						</div>
					</ContainerSideBar>
					<img src={banner} alt="" />

				</Wrapper>
			</Container>
		</>
	)
}
