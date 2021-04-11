import styles from './index.module.scss';
import Link from 'next/link';

export default function Navbar() {

    return (
      <>
    <div className={styles.navbar}>
    <div className={styles.left}>
        <Link href="/">
          <a>Hacker News</a>
        </Link>
      </div>        
      <div className={styles.link}>
        <Link href="/threads">
          <a>Threads</a>
        </Link>
      </div>
      <div className={styles.link}>
        <Link href="/ask">
          <a>Ask HN</a>
        </Link>
      </div>      
      <div className={styles.link}>
        <Link href="/jobs">
          <a>Jobs</a>
        </Link>
      </div>      
    </div>      
      </>
    )
  }
  