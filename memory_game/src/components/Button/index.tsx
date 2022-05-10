import {Container, IconArea, Icon, Label} from './styles';

type Props = {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label, icon, onClick}: Props) => {
    return (
        <Container onClick={onClick}>
            {icon &&
                <IconArea>
                    <Icon src={icon} alt=""/>
                </IconArea>
            }
            <Label>{label}</Label>
        </Container>
    );
}