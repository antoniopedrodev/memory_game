import { Container, Label, Value } from './styles';

type Props = {
    label: string;
    value: string;
}

export const InfoItem = ({label, value}: Props) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Value>{value}</Value>
        </Container>
    );
}