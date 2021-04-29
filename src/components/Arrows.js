import styled from "styled-components";
import ArrowUp from "../assets/icons/arrowUp.svg";

export const Arrows = ({ open }) => <Image src={ArrowUp} open={open} alt="arrow" />;

const Image = styled.img`
    transform: ${({ open }) => open ? "rotate(180deg)" : "rotate(0)"};
    transition: 0.3s ease-in;
`;

