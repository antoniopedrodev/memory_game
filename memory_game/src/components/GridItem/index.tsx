import { Container, Icon } from "./styles";
import { GridItemType } from "../../types/GridItemType";
import back from '../../assets/media/b7.svg';
import {Items} from '../../data/items'

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <Container
            showBackground={item.permanentShow || item.show}
            onClick={onClick}
        >
            {!item.permanentShow && !item.show && 
                <Icon src={back} alt="Verso da carta do jogo da memória" opacity={.1} />
            }
            {(item.permanentShow || item.show) && item.item !== null && 
                <Icon src={Items[item.item].icon} alt="Conteúdo da carta do jogo da memória" />
            }
        </Container>
    );
}