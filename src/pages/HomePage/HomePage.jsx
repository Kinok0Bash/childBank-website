import Header from "../../components/Header/Header.jsx";
import './HomePage.scss';
import {useEffect} from "react";
import AuthStore from "../../store/AuthStore.js";
import AccountStore from "../../store/AccountStore..js";
import Account from "../../components/Account/Account.jsx";
import OperationHistory from "../../components/OperationHistory/OperationHistory.jsx";
import Button from "../../components/Button/Button.jsx";
import Paragraph from "../../components/Paragraph/Paragraph.jsx";
import {useNavigate} from "react-router-dom";
import LoaderStore from "../../store/LoaderStore.js";
import Title from "../../components/Title/Title.jsx";
import RightArrow from "../../assets/icons/Base/RightArrow.jsx";
const HomePage = () => {
    const nav = useNavigate();
    const handlerSalary = async () => {
        LoaderStore.showLocalLoader();
        const res = await AccountStore.getSalary();
        console.log(res);
        if(res === 'OK') {
            await AccountStore.getBalanceParent();
        }
        await LoaderStore.hideLocalLoader();
    }

    useEffect(() => {
        const fetch = async () => {
            if(AuthStore.userData.role === 'PARENT') {
                await AccountStore.getBalanceParent();
            } else {
                await AccountStore.getBalanceChild();
            }
        }
        console.log(AccountStore.childBalance)
        fetch();
    }, [])

    return (
        <div className={'HomePage'}>
            <Header />
            <Account type={AuthStore.userData.role}/>
            <div className={"HomePage__history HomePage-history"}>
                <div className="HomePage-history__header" onClick={() => nav('/history')}>
                    <Title level={3} type={'default'}>
                        {AuthStore.userData.role === 'PARENT' ?
                            'История операций ребенка':
                            'История операций'
                        }
                    </Title>
                    <RightArrow/>
                </div>
                <OperationHistory/>
            </div>
                <div className={'HomePage__buttons'}>
                    {AuthStore.userData.role === 'PARENT' ?
                        (<>
                            {AuthStore.userData.isGetKid && 
                                <Button type={'main'} style={'dark'} className={'HomePage__button'} onClick={() => nav('/childAccount')}>
                                    <Paragraph type={'white'} level={2}>Перейти к счету ребенка</Paragraph>
                                </Button>
                            }
                            <Button type={'main'} style={'green'} className={'HomePage__button'} onClick={handlerSalary}>
                                <Paragraph type={'white'} level={2}>Получить зарплату</Paragraph>
                            </Button>
                        </>) : (
                            <Button type={'main'} style={'dark'} className={'HomePage__payment'} onClick={() => nav('/pay')}>
                                <Paragraph type={'white'} level={2}>Оплата</Paragraph>
                            </Button>)
                    }
                </div>
        </div>
    )
}

export default HomePage;