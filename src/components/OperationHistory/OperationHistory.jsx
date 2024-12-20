import {observer} from "mobx-react-lite";
import './OperationHistory.scss';
import {useEffect} from "react";
import AccountStore from "../../store/AccountStore..js";
import HistoryItem from "./HistoryItem.jsx";
import LoaderStore from "../../store/LoaderStore.js";
import AuthStore from "../../store/AuthStore.js";

const OperationHistory = ({type = 'LAST'}) => {
    useEffect(() => {
        if (AuthStore.userData.isGetKid === true) {
        async function fetch() {
            LoaderStore.showLocalLoader();
            if(type === 'LAST') await AccountStore.getLastOperations();
            else await AccountStore.getAllOperations();
            LoaderStore.hideLocalLoader();
        }
        fetch();
        } else {
            AccountStore.transactions = []
        }
    }, [type])

    const transactionsToDisplay = 
        type === 'LAST' 
            ? [...AccountStore.transactions].slice(0, 4) 
            : [...AccountStore.transactions];

    return (
        <ul className={'operationHistory'}>
                {transactionsToDisplay.map((item) => (
                    <HistoryItem {...item} />
                ))}
        </ul>
    )
}

export default observer(OperationHistory);