import {API_URL} from "../../../constants/endpoints/endpointConst.js";
import {Link} from "react-router-dom";
import Paragraph from "../../../components/Paragraph/Paragraph.jsx";
import './Menu.scss';

const Menu = () => {
    const menuItems = [
        {
            name: "Пополнить счет",
            path: "/childTransfer"
        },
        {
            name: "История операций",
            path: "/history"
        },
        {
            name: "Ограничить категории",
            path: "/categories"
        },
        {
            name: "Отчет. Все транзакции",
            path: `${API_URL}/reports/transactions/download`,
            isDownload: true
        },
        {
            name: "Отчет. Суммы по магазинам",
            path: `${API_URL}/reports/shops/download`,
            isDownload: true
        },
        {
            name: "Отчет. Все ограничения",
            path: `${API_URL}/reports/limits/download`,
            isDownload: true
        },
    ]

    const handleDownload = async (path, name) => {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error("Ошибка при получении файла");
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Создаём временную ссылку для скачивания
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Освобождаем память
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
        }
    };

    return (
        <section className="menu">
            <ul className="menu__list">
                {menuItems.map((item) => (
                    <li className="menu__item" key={item.name}>
                        {item.isDownload ? (
                            <button className="menu__button" onClick={() => handleDownload(item.path, `${item.name}.txt`)}>
                                <Paragraph level={2} type={'default'}>{item.name}</Paragraph>
                            </button>
                        ) : (
                            <Paragraph level={2} type={'default'}>
                                {item.name}
                            </Paragraph>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )

}
export default Menu;