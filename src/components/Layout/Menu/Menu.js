import styles from './Menu.module.css';
import MenuLink from './MenuLink/MenuLink';
import { homeIcon, contractorsIcon, settingsIcon } from './Icons';

export default function Menu() {
  return (
    <div
      className={`d-none d-md-flex row ps-3 pe-3 ${styles.main} align-items-center`}
    >
      <div className='col-4 col-lg-2'>Navbar</div>
      <div className='col-4 col-lg-3'>
        <MenuLink color='#9747FF' label='Strona główna' to='/'>
          {homeIcon}
        </MenuLink>
      </div>
      <div className='col-4 col-lg-2'>
        <MenuLink color='#4ECB71' label='Logowanie' to='/login'>
          {contractorsIcon}
        </MenuLink>
      </div>
      <div className='col-4 col-lg-2'>
        <MenuLink color='#4ECB71' label='Rejestracja' to='/register'>
          {contractorsIcon}
        </MenuLink>
      </div>
      <div className='d-none d-lg-block col-3 col-lg-2'>
        <MenuLink color='#EE9C22' label='Admin' to='/admin'>
          {settingsIcon}
        </MenuLink>
      </div>
    </div>
  );
}
