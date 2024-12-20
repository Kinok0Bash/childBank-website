import {observer} from "mobx-react-lite";
import './OperationHistory.scss';
import {useEffect} from "react";
import AccountStore from "../../store/AccountStore..js";
import HistoryItem from "./HistoryItem.jsx";
import LoaderStore from "../../store/LoaderStore.js";
import AuthStore from "../../store/AuthStore.js";

const OperationHistory = ({type = 'LAST'}) => {
    useEffect(() => {
        if (AuthStore.userData.role === 'PARENT' && AuthStore.userData.isGetKid !== true) {
            AccountStore.transactions = []
        } else {
            var res;
            async function fetch() {
                LoaderStore.showLocalLoader();
                await AccountStore.getAllOperations()
                LoaderStore.hideLocalLoader()
            }
            fetch();
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