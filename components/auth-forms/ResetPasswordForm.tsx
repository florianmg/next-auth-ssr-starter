import React, { useState } from 'react';

interface IResetPasswordFormProps {
  onSubmit: (email: string) => void;
  onBack: () => void;
}

const ResetPasswordForm: React.FC<IResetPasswordFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Votre adresse email</label>
        <input
          id="email"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </div>
      <button type="submit">Envoyer un mail de réinitialisation</button>
      <p onClick={onBack}>Finalement je me souviens de mon mot de passe</p>
    </form>
  );
};

export default ResetPasswordForm;
