import { useNavigate } from "react-router-dom";
import AuthForm, { Auth } from "../../components/AuthForm";
import api from '../../services/api';
import jwtDecode from 'jwt-decode';

interface UserToken {
    userId: string;
    email: string
}

function Login() {
    const navigate = useNavigate();

    async function handleLogin(auth: Auth) {
        try {
            const { data } = await api.post("/authentication", auth);
            const decodedToken = jwtDecode(data.token) as UserToken;
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("email", auth.email);
            localStorage.setItem("accessToken", data.token);

            if (data.token != null) {
                const { data } = await api.get("/user/get", {params: {email: auth.email}});
                localStorage.setItem("name", data.name);
            }
            navigate("/home");
        } catch(err) {
            alert("Erro no login do usuário.");
        }
    }
    return (
        <AuthForm
            authFormTitle="Faça o login e comece a usar!"
            submitFormButtonText="Entrar"
            routeName="/signup"
            submitFormButtonAction={handleLogin}
        />
    );
}

export default Login;