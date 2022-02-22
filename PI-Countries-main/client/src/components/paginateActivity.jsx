import styles from '../styles/paginateActivity.module.css'


const PaginateActivity = ({ activitiesPerPage, totalActivities, nextPage }) => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalActivities/activitiesPerPage); i++) {
        pageNumbers.push(i)
    };

    return (
        <nav className={styles.nav}>
                {pageNumbers.map(number => (
                    <div key={number} className={styles.numbers}>
                        <button onClick={() => nextPage(number)} className={styles.button}>
                            {number}
                        </button>
                    </div>
                ))}
        </nav>
    )
};



export default PaginateActivity;