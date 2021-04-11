import styles from './index.module.scss';
import PropTypes from 'prop-types';

export default function AskForm({handleChange,handleSubmit}) {
    return(
    <>
      <div className={styles.formContainer}>
          <div className={styles.postTitle}>Submit a AskPost</div>
         <label>
          Title
          <input className={styles.inputBox} name="name" onChange={handleChange} autoComplete="off"/>
          </label>
          <br />
         <br/>
         <label>
          Text
          <textarea className={styles.inputBox} name="text" onChange={handleChange} autoComplete="off"/>
         </label>         
         <label>
          Tags
          <textarea className={styles.inputBox} name="tags" onChange={handleChange} autoComplete="off"/>
         </label>        
         <button className={styles.submit + ' bg-blue-500 hover:bg-blue-700 text-white font-bold rounded'} onClick={handleSubmit}>Submit</button>    
      </div>
    </>
    );
}

AskForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };