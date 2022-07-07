import styles from './loading.module.css';

export default function Loading(): JSX.Element {
  return (
    <div className={styles.loading}>
      <img src="/favicon.png" alt="" />
    </div>
  );
}
