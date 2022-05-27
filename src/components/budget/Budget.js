import SectionTitle from '../section/SectionTitle'
import InputCell from '../input/InputCell'
import ColumnHeader from '../section/ColumnHeader'
import styles from './Budget.module.css'


export default function Budget() {
  return (
    <div className={styles.budgetContainer}>
      <SectionTitle title='Budget categories:'/>
      <div className={styles.budgets}>
        <ColumnHeader text='Category' />
        <ColumnHeader text='Share' />
        <ColumnHeader text='Starting balance' />
        <ColumnHeader text='Total expenses' />
        <ColumnHeader text='Final balance' />
        <InputCell type='text' />
        <InputCell type='text' />
        <InputCell type='text' />
        <InputCell type='text' />
        <InputCell type='text' />
      </div>
      <div className={styles.expensesContainer}>
        <SectionTitle title='expenses' isExpandable={true} size='small'/>
        <div className={styles.expensesDetails}>
          <ColumnHeader text='Name' size='small' />
          <ColumnHeader text='Amount' size='small' style={{gridColumn: '4/-1'}} />
          <InputCell type='text' size='small' style={{gridColumn: '1/4'}}/>
          <InputCell type='text' size='small' style={{gridColumn: '4/-1', width: '50%'}} />
        </div>
      </div>
    </div>
  )
}
