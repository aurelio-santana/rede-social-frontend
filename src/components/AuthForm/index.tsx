import logo from "../../assets/logo.svg";

import Heading from "../Heading";
import Text from "../Text";
import { TextInput } from "../TextInput";
import Button from "../Button";

import { Envelope, Lock } from '@phosphor-icons/react';
import { Link } from "react-router-dom";
import { FormEvent } from "react";

interface AuthFormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
}
interface AuthFormElement extends HTMLFormElement {
    readonly elements: AuthFormElements;
}

export interface Auth {
    name?: string;
    email: string;
    password: string;
}

interface AuthFormProps {
    authFormTitle: string;
    submitFormButtonText: string;
    routeName: string;
    submitFormButtonAction: (auth: Auth) => void;
}

function AuthForm(props: AuthFormProps) {
    function handleSubmit(event: FormEvent<AuthFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;

        let auth;

        if (props.routeName == "/signup") {
          auth = {        
            email: form.elements.email.value,
            password: form.elements.password.value,
          };
        } else {
          auth = {
            name: form.elements.name.value,
            email: form.elements.email.value,
            password: form.elements.password.value,
          };
        }

        props.submitFormButtonAction(auth);
        
    }
  return (
    <div className="flex flex-col items items-center mt-16 justify-center">
      <header className="flex flex-col items-center">
      <img src={logo} alt="Logo Sysmap" />  

      <Heading className="mt-4" size="lg" >Sysmap Parrot</Heading>
      <Text className="mt-2 opacity-50">{props.authFormTitle}</Text>
      </header>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch gap-4 w-full max-w-sm mt-12"
        >
          {props.routeName == "/signup" ? ("") : (
            <div>
              <Text>Nome</Text>
              <TextInput.Root>
                <TextInput.Icon>
                <Envelope />
                </TextInput.Icon>
                <TextInput.Input 
                    id="name"
                    placeholder="Digite seu nome" type="text"
                ></TextInput.Input>
              </TextInput.Root>
            </div>
          )}

        <Text>Endereço de e-mail</Text>
        <TextInput.Root>
            <TextInput.Icon>
            <Envelope />
            </TextInput.Icon>
            <TextInput.Input 
                id="email"
                placeholder="Digite seu e-mail" type="text"
            ></TextInput.Input>
        </TextInput.Root>
        

        <Text>Senha</Text>
        <TextInput.Root>
            <TextInput.Icon>
            <Envelope />
            </TextInput.Icon>
            <TextInput.Input 
                id="password"
                placeholder="********" type="password"
            ></TextInput.Input>
        </TextInput.Root>

        <Button type="submit" className="mt-6 my-4 bg-[#81D8F7]">{props.submitFormButtonText}</Button>

      </form>
      <footer className="flex flex-col items-center gap-4">
        <Text asChild size="sm">
          <Link
            to={props.routeName}
            className="text-gray-400 underline hover:text-gray-200">
              {props.routeName == "/signup" ? (
                "Não possui conta? Crie uma agora!"
              ) : ( 
                "Já possui uma conta? Faça o login aqui!"
              )}
          </Link>
        </Text>
      </footer>
    </div>
  );
}

export default AuthForm;