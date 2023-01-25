// import React, { useState } from 'react';
// import styles from './Admin.css';
// import DepartmentList from '../../components/Departments/Department/Department_list';
// import SubDepartmentList from '../../components/Departments/Department/SubDepartments/SubDepartment_list';
// import Categories from '../../components/Departments/Department/SubDepartments/Categories/Category_list';

// export default function Admin() {
//   return (
//     <div className={styles.admin}>
//       <h1 className={styles.title}>Panel Administratora</h1>
//       <div className="row">
//         <div className="col-3">
//           <ul>
//             <li>
//               <button onClick={() => handleChangeContent(DepartmentList)}>
//                 Edycja działów
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleChangeContent(SubDepartmentList)}>
//                 Edycja pod działu
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleChangeContent(Categories)}>
//                 Edycja kategorii
//               </button>
//             </li>
//             <li>
//               <button>Edycja Postów</button>
//             </li>
//             <li>
//               <button>Edycja Odpowiedzi</button>
//             </li>
//             <li>
//               <button>Edycja kont użytkowników</button>
//             </li>
//           </ul>
//         </div>
//         {/* <div className="col-9">{content()}</div> */}
//       </div>
//     </div>
//   );
// }
