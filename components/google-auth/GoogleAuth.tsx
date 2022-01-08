interface IGoogleAuthProps {
  onClick: () => void;
}

const GoogleAuth: React.FC<IGoogleAuthProps> = ({ onClick }) => {
  return (
    <div role="button" onClick={onClick}>
      Continuer avec Google
    </div>
  );
};

export default GoogleAuth;
