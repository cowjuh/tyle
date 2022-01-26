import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "disabled";
  disabled?: boolean;
}

const ButtonStyled = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  padding: 0 10px;
  background: #4f47aa;
  border-radius: 3px;
  color: white;
  height: 36px;
  ${(p) =>
    p.disabled &&
    `
    pointer-events: none;
    background: gray;
  `}
  :hover {
    opacity: 0.8;
  }
`;

const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({
  children,
  onClick,
  variant,
  disabled,
}) => {
  return (
    <ButtonStyled onClick={onClick} variant={variant} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
