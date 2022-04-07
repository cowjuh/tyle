import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "disabled";
  disabled?: boolean;
}

const SECONDARY_VARIANT = `
  border: 2px solid #50b6ff;
  color: #50b6ff;
  background: none;

  :hover {
    opacity: 0.8;
    border: 2px solid white;
    color: white;
  }
`;

const ButtonStyled = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  padding: 0 10px;
  background: #50b6ff;
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
  ${(p) => p.variant === "secondary" && SECONDARY_VARIANT}
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
