import { Link, LinkProps } from 'react-router';
import styles from './CustomLink.module.css';

const CustomLink = ({
  children,
  ...props
}: LinkProps & React.RefAttributes<HTMLAnchorElement>) => {
  return (
    <Link {...props} className={styles.link}>
      {children}
    </Link>
  );
};

export default CustomLink;
