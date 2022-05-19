import { FormEvent, useContext } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";

import { api } from "../../services/api";

import { AuthContext } from "../../contexts/auth";

import styles from "./styles.module.scss";

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);

  async function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const { value: message } = form.message;

    if (!message.trim()) return;

    await api.post("messages", { message });

    form.reset();
    form.message.focus();
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>

        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
