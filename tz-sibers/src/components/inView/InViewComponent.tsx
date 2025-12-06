import { InView } from 'react-intersection-observer';
import styles from '../aside/aside.module.css';

interface InViewProps {
  visibleCount: number;
  totalUsersCount: number;
  setVisibleCount: (value: number | ((prev: number) => number)) => void;
}

const InViewComponent: React.FC<InViewProps> = ({ visibleCount, totalUsersCount, setVisibleCount }) => {
  
  if (visibleCount >= totalUsersCount) {
    return null; //if all users are visible, we don`t need to show InView component
  }
  
  return ( 
        <InView as="span" //here we use InView component to implement infinite scroll
          onChange={(inView: boolean) => {
            if (inView) {
              setVisibleCount((prevCount) => Math.min(prevCount + 10, totalUsersCount));
            }
          }}
          threshold={0.1}
        >
          <span className={styles.aside__loading}></span>
        </InView> //it let us load users by parts (10 users per load)
  );
}

export default InViewComponent;