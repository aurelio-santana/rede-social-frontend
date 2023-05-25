import AuthForm, { Auth } from "../../components/AuthForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    async function handleRegister(auth: Auth) {
        try {
            await api.post("/user/create", auth);
            navigate("/");

        } catch(err) {
            alert("Erro na criação do usuário.");
        }
    }


    return (
        <AuthForm 
            authFormTitle="Faça o cadastro e comece a usar!"
            submitFormButtonText="Cadastrar" 
            routeName="/"
            submitFormButtonAction={handleRegister}
            
        />
    );
}

export default SignUp;