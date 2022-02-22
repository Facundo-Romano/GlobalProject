import styles from '../styles/paginate.module.css';


const Paginate = ({ pageNumbers, setCurrentPage, currentPage, loading }) => {
    if (loading) {
        return <div></div>
    };

    const pageMap = () => {
        let elements = [];
        if (pageNumbers.length < 5) {
            for (let i=1; i <= pageNumbers.length; i++) {
                elements.push(
                    <div key={i} className={styles.li}>
                        <button onClick={() => setCurrentPage(i)} className={styles.button}>
                            {i}
                        </button>
                    </div>
                )
            }
        } else {
            if (currentPage < pageNumbers.length - 3 && currentPage > 2) {
                for (let i=currentPage - 2; i < currentPage + 3; i++) {
                    elements.push(
                        <div key={i} className={styles.li}>
                            <button onClick={() => setCurrentPage(i)} className={styles.button}>
                                {i}
                            </button>
                        </div>
                    )
                }
            } else if (currentPage <= 2){
                for (let i=1; i < 6; i++) {
                    elements.push(
                        <div key={i} className={styles.li}>
                            <button onClick={() => setCurrentPage(i)} className={styles.button}>
                                {i}
                            </button>
                        </div>
                    )
                }
            } else {
                for (let i=pageNumbers.length - 4; i <= pageNumbers.length; i++) {
                    elements.push(
                        <div key={i} className={styles.li}>
                            <button onClick={() => setCurrentPage(i)} className={styles.button}>
                                {i}
                            </button>
                        </div>
                    )
                }
            };
        }
        return elements
    };

    const letPage = (data) => {
        if (data === 'First') {
            setCurrentPage(1)
        } else if (data === 'Last') {
            setCurrentPage(pageNumbers.length)
        }
    };

    if (pageNumbers.length < 5) {
        if (pageNumbers.length < 2) {
            return null
        }; 

        return ( 
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <div className={styles.numbers}>
                        {pageMap()}
                    </div>
                </div>
            </nav>
        )
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <button name='first' className={styles.bigButton} onClick={() => letPage('First')}>First Page</button>
                <div className={styles.numbers}>
                    {pageMap()}
                </div>
                <button name='last' className={styles.bigButton} onClick={() => letPage('Last')}>Last Page</button>
            </div>
        </nav>
    )
};



export default Paginate;