import './OperationResultPage.scss';
import Button from "../../components/Button/Button.jsx";
import Paragraph from "../../components/Paragraph/Paragraph.jsx";
import {observer} from "mobx-react-lite";
import Title from "../../components/Title/Title.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import declinedImg from '/src/assets/img/declinedPay.png';
import successImg from '/src/assets/img/successPay.png';
import TransactionStore from "../../store/TransactionStore.js";

const OperationResultPage = () => {
    const nav = useNavigate();


    return (
        <div className={'OperationResultPage'}>
            <Paragraph level={3} type={'default'} className={'OperationResultPage__title'}>
                {TransactionStore.transactionStatus === 'OK' ? 'Успешно' : 'Что-то пошло не так'}
            </Paragraph>

            {TransactionStore.transactionStatus === 'OK' ?
                (
                    <>
                        <img src={successImg} alt="Успешно"/>
                        <Title type={'default'} level={2}>{`-${TransactionStore.transactionAmount} ₽`}</Title>
                        <Paragraph level={4} type={'default'}>
                            Операция прошла успешно
                        </Paragraph>
                    </>
                ) : TransactionStore.transactionStatus === 'FORBIDDEN' ?
                (
                    <>
                        <img src={declinedImg} alt="Отклонено"/>
                        <Title level={3} type={'default'}>Отклонено</Title>
                        <Paragraph level={4} type={'default'}>
                            Родители поставили тебе ограничение <br />на покупку. Ты не можешь оплатить покупку, <br/>пока они не уберут товар из запрещенных
                        </Paragraph>
                    </>

                ) : (
                    <>
                    <img src={declinedImg} alt="Отклонено"/>
                        <Title level={3} type={'default'}>Отклонено</Title>
                        <Paragraph level={4} type={'default'}>
                            У тебя на счету не достаточно средств <br />на покупку. Попроси родителей положить тебе <br/>денег на счет
                        </Paragraph>
                    </>
                )

            }

            <Button type={'main'} style={'dark'} className={'OperationResultPage__accept'} onClick={() => nav('/')}>
                <Paragraph type={'white'} level={2}>Хорошо</Paragraph>
            </Button>
        </div>
    )
}

export default observer(OperationResultPage);