import {observer} from "mobx-react-lite";
import Title from "../../components/Title/Title.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import LoaderStore from "../../store/LoaderStore.js";
import AuthStore from "../../store/AuthStore.js";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import {useInput} from "../../hooks/inputHooks.js";
import Paragraph from "../../components/Paragraph/Paragraph.jsx";
import AccountStore from "../../store/AccountStore..js";
const RegistrationPage = ({type = 'PARENT'}) => {
    const navigate = useNavigate();
    const [serverResponse,setServerResponse] = useState(null);
    console.log(type);

    const fcs = useInput('',{isEmpty: true,maxLength: 40,isFcs: true});
    const birthDate = useInput('',{isEmpty: true,maxLength: 20,isDate: true});
    const city = useInput('',{isEmpty: true,maxLength: 20});
    const username = useInput('',{isEmpty: true,maxLength: 20});
    const password = useInput('',{isEmpty: true, minLength: 8, maxLength: 20});

    const submitHandler = async (e,inputs) => {
        LoaderStore.showLocalLoader();
        var res, res1;

        e.preventDefault();
        let correctFlag = true;
        for(let input in inputs) {
            inputs[input].onBlur();
            correctFlag = inputs[input].correct ? correctFlag && true : false;
        }
        if(!correctFlag) return;
        const fcsSplit = inputs.fcs.value.split(' ');

        const data = {
            username: inputs.username.value,
            password: inputs.password.value,
            name: fcsSplit[1],
            lastname: fcsSplit[0],
            fatherName: fcsSplit[2] || '',
            city: inputs.city.value
        }
        if(type === 'PARENT') {
            res = await AuthStore.registration(data);
            res1 = await AccountStore.getBalanceParent()
        } else {
            res = await AuthStore.registrationChild(data);
        }
        setServerResponse(res);

        LoaderStore.hideLocalLoader();
    }

    return (
        <form
            method="POST"
            className="authTemplate__form authTemplate-form"
            onSubmit={e => submitHandler(e,{username,password,city,birthDate,fcs})}
        >
            <Title type={'default'} level={1}>Регистрация</Title>
            <div className="authTemplate-form__fields">
                <Input name="lastname" type='text' input={fcs}>ФИО</Input>
                <Input name="birtthDate" type='text' input={birthDate}>Дата рождения</Input>
                <Input name="city" type='text' input={city}>Город</Input>
                <Input name="login" type='text' input={username}>Логин</Input>
                <Input name="pass" type='password' input={password}>Пароль</Input>
            </div>
            <Button type={'dark'}>
                <Title type={'bright'} level={4}>Зарегистрировать</Title>
            </Button>
            { type === 'PARENT' ?
                (
                    <Link to={'/auth/login'}>
                        <Paragraph type={'default'} level={5}>Есть аккаунт ? Войти</Paragraph>
                    </Link>
                ) : (
                    <Link to={'/profile'}>
                        <Paragraph type={'default'} level={5}>Вернуться в профиль</Paragraph>
                    </Link>
                )
            }
        </form>
    )
}

export default observer(RegistrationPage);