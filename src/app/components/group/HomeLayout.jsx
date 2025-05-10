'use client'
import {React, useState} from 'react';
import styles from "./group.module.css";
import GroupIcon from 'app/components/group/groupIcon';
import Group from './group';
import Image from 'next/image';

const Layout = () => {
  const [group, setGroup] = useState(null)

  const groups =  [
    {
      title : "Math Study Group",
      describtion: "Study Group for math"
    },
    {
      title: "Science Enthusiasts",
      describtion: "Science group for math"
    },
    {
      title: "History buffs",
      describtion: "Study Group for History"
    }
  ];

  const selectGroup = (id)=>{
    setGroup(groups[id].describtion)
  }
  return (
    <>
    <header className={styles.header}>
    <button className={styles.buttons} style={{borderRadius: 50}}> 
      <Image src={"/image/dark mode.svg"}
      width={35}
      height={35}
      alt='dark mode icon' ></Image>
    </button>
    <h2>Study App</h2>
    <button type="button" style={{borderRadius: 50}} className={styles.buttons} >
    <Image src={"/image/profile_green.svg"}
    width={35}
    height={35}
    alt='profile icon'></Image>
    </button>
    </header>
    <div className={styles.container}>
      
      {/* Sidebar */}
      <div className={styles.groupList}>
        <h2>Study Groups</h2>
        <ul className={styles.groupListItems}>
          {groups.map((group, index) => (
            <li key={index} className={styles.studyGroups} onClick={()=>selectGroup(index)}>
              <GroupIcon props={{
                title: group.title
              }}/>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <Group props={group}/>
      </div>
    </div>
    </>
  );
};

export default Layout;